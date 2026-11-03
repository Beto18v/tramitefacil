import { DocumentType, DocumentoFormalData } from '../types/documents';
import { DOCUMENT_CATALOG } from '../templates';
import {
  analyzeCaseDescription,
  SuggestionResult,
} from '../utils/aiDocumentSuggester';

export interface AiSuggestionResponse extends SuggestionResult {
  source: 'gemini_cloud' | 'offline_heuristic';
  rawAiAdvice?: string;
  extractedDraft?: Record<string, any>;
}

export interface AutofillResponse {
  success: boolean;
  source: 'gemini_cloud' | 'none';
  extractedFields?: Record<string, any>;
  error?: string;
}

export interface DiagnosticOption {
  id: string;
  title: string;
  badge: 'Recomendado' | 'Alternativo' | 'Conciliación' | string;
  purpose: string;
  legalBasisShort?: string;
  isStandardCatalogDoc?: boolean;
  standardDocId?: DocumentType | null;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface DiagnosticResult {
  plainSummary: string;
  isOutOfScope: boolean;
  entityAdvice?: string | null;
  options: DiagnosticOption[];
  clarificationQuestions?: ClarificationQuestion[];
  source: 'gemini_cloud' | 'offline_heuristic';
  cached?: boolean;
}

// ==========================================
// Helper de Caché de Cliente (sessionStorage)
// ==========================================
function getClientCacheKey(prefix: string, text: string): string {
  const norm = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 100);
  return `tf_cache_${prefix}_${norm}`;
}

function getFromClientCache<T>(prefix: string, text: string): T | null {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;
  try {
    const raw = sessionStorage.getItem(getClientCacheKey(prefix, text));
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return null;
}

function saveToClientCache<T>(prefix: string, text: string, data: T): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    sessionStorage.setItem(getClientCacheKey(prefix, text), JSON.stringify(data));
  } catch {}
}

/**
 * Realiza el diagnóstico jurídico en 2 pasos con lenguaje accesible.
 * Utiliza caché de cliente de 0 ms y fallback local si no hay red o cuota.
 */
export async function diagnoseLegalCase(
  caseDescription: string,
  abortSignal?: AbortSignal
): Promise<DiagnosticResult> {
  const trimmed = caseDescription.trim();
  if (!trimmed || trimmed.length < 5) {
    return {
      plainSummary: '',
      isOutOfScope: false,
      options: [],
      source: 'offline_heuristic',
    };
  }

  // 1. Verificación en Caché de Cliente (0 tokens, 0 ms)
  const cached = getFromClientCache<DiagnosticResult>('diag', trimmed);
  if (cached) {
    return { ...cached, cached: true };
  }

  // 2. Si el dispositivo está sin red, generamos opciones offline con el motor local
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return buildOfflineDiagnostic(trimmed);
  }

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'diagnose',
        payload: { caseDescription: trimmed },
      }),
      signal: abortSignal,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.result) {
        const result: DiagnosticResult = {
          plainSummary: data.result.plainSummary || 'Tienes varias alternativas documentales para este caso.',
          isOutOfScope: Boolean(data.result.isOutOfScope),
          entityAdvice: data.result.entityAdvice || null,
          options: data.result.options || [],
          clarificationQuestions: data.result.clarificationQuestions || [],
          source: 'gemini_cloud',
          cached: Boolean(data.cached),
        };

        saveToClientCache('diag', trimmed, result);
        return result;
      }
    }
  } catch (err: any) {
    if (err?.name === 'AbortError') throw err;
    console.warn('Fallback a diagnóstico offline:', err?.message || err);
  }

  return buildOfflineDiagnostic(trimmed);
}

/**
 * Sintetizador de diagnóstico offline para cuando no hay internet ni API
 */
function buildOfflineDiagnostic(trimmed: string): DiagnosticResult {
  const localAnalysis = analyzeCaseDescription(trimmed);

  if (localAnalysis.status === 'out_of_scope' && localAnalysis.entityGuidance) {
    return {
      plainSummary: localAnalysis.entityGuidance.description,
      isOutOfScope: true,
      entityAdvice: `${localAnalysis.entityGuidance.entityName} (${localAnalysis.entityGuidance.officialCanal})`,
      options: [],
      source: 'offline_heuristic',
    };
  }

  const options: DiagnosticOption[] = [];

  if (localAnalysis.bestMatch) {
    options.push({
      id: 'opt_1',
      title: localAnalysis.bestMatch.document.title,
      badge: 'Recomendado',
      purpose: localAnalysis.bestMatch.reasoning,
      legalBasisShort: localAnalysis.bestMatch.legalJustification,
      isStandardCatalogDoc: true,
      standardDocId: localAnalysis.bestMatch.document.id,
    });
  }

  // Siempre incluimos la opción de redactar un Oficio / Documento a Medida
  options.push({
    id: 'opt_custom',
    title: 'Carta Formal y Requerimiento a Medida',
    badge: 'Personalizado con IA',
    purpose: 'Redacción formal con membrete, hechos numerados y peticiones concretas para este caso.',
    legalBasisShort: 'Legislación Colombiana Aplicable',
    isStandardCatalogDoc: false,
    standardDocId: 'documento_formal',
  });

  return {
    plainSummary: localAnalysis.bestMatch
      ? `Para este trámite, el formato más adecuado en Colombia es ${localAnalysis.bestMatch.document.title}.`
      : 'Puedes generar un oficio formal personalizado o elegir una plantilla estándar.',
    isOutOfScope: false,
    options,
    clarificationQuestions: [],
    source: 'offline_heuristic',
  };
}

/**
 * Redacta el documento formal completo en base al caso y opciones elegidas.
 */
export async function generateCustomDocument(payload: {
  caseDescription: string;
  selectedOptionTitle: string;
  answers?: Record<string, string>;
  userProfile?: any;
}): Promise<{ success: boolean; document?: DocumentoFormalData; error?: string }> {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'generate_custom_document',
        payload,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.error || 'No se pudo generar el documento con IA.' };
    }

    const data = await res.json();
    if (data.success && data.document) {
      return { success: true, document: data.document };
    }

    return { success: false, error: 'La IA no devolvió el documento estructurado.' };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error de conexión al generar el documento.' };
  }
}

/**
 * Cliente legado para compatibilidad con sugerencias
 */
export async function suggestDocument(
  caseDescription: string,
  abortSignal?: AbortSignal
): Promise<AiSuggestionResponse> {
  const trimmed = caseDescription.trim();
  if (!trimmed || trimmed.length < 5) {
    return { ...analyzeCaseDescription(trimmed), source: 'offline_heuristic' };
  }

  const cached = getFromClientCache<AiSuggestionResponse>('sugg', trimmed);
  if (cached) return { ...cached };

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { ...analyzeCaseDescription(trimmed), source: 'offline_heuristic' };
  }

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'suggest',
        payload: { caseDescription: trimmed },
      }),
      signal: abortSignal,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.result) {
        const r = data.result;
        if (r.isOutOfScope && r.entityAdvice) {
          const resp: AiSuggestionResponse = {
            status: 'out_of_scope',
            alternatives: [],
            queryAnalyzed: trimmed,
            source: 'gemini_cloud',
            rawAiAdvice: r.reasoning,
            entityGuidance: {
              entityName: r.entityAdvice,
              entityCategory: 'Competencia Institucional',
              description: r.reasoning,
              actionRequired: 'Este trámite requiere atención ante entidades judiciales o administrativas.',
              officialCanal: 'Consulte con la entidad oficial correspondiente o Personería Distrital.',
              canUsePetitionAsFirstStep: r.recommendedDocId === 'derecho_peticion',
              legalBasis: r.legalJustification || 'Constitución Política de Colombia',
            },
          };
          saveToClientCache('sugg', trimmed, resp);
          return resp;
        }

        const matchedDoc = DOCUMENT_CATALOG.find((d) => d.id === r.recommendedDocId);
        if (matchedDoc) {
          const resp: AiSuggestionResponse = {
            status: 'matched',
            source: 'gemini_cloud',
            queryAnalyzed: trimmed,
            extractedDraft: r.extractedFields,
            bestMatch: {
              document: matchedDoc,
              confidence: r.confidence === 'alta' ? 'alta' : 'media',
              score: 98,
              legalJustification: r.legalJustification || matchedDoc.lawReference,
              reasoning: r.reasoning || matchedDoc.description,
              keyPoints: Array.isArray(r.keyPoints) && r.keyPoints.length > 0
                ? r.keyPoints
                : [matchedDoc.lawReference, matchedDoc.categoryName],
            },
            alternatives: [],
          };
          saveToClientCache('sugg', trimmed, resp);
          return resp;
        }
      }
    }
  } catch (err: any) {
    if (err?.name === 'AbortError') throw err;
  }

  return { ...analyzeCaseDescription(trimmed), source: 'offline_heuristic' };
}

/**
 * Cliente para autollenado guiado (Prompt-to-Document)
 */
export async function autofillDocumentWithAi(
  docType: DocumentType,
  narrative: string,
  currentData?: any
): Promise<AutofillResponse> {
  const trimmed = narrative.trim();
  if (!trimmed || trimmed.length < 5) {
    return { success: false, source: 'none', error: 'La narración es muy corta.' };
  }

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'autofill',
        payload: { docType, narrative: trimmed, currentData },
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        source: 'none',
        error: errJson.error || 'No se pudo completar el autollenado con IA.',
      };
    }

    const data = await res.json();
    if (data.success && data.extractedFields) {
      return { success: true, source: 'gemini_cloud', extractedFields: data.extractedFields };
    }

    return { success: false, source: 'none', error: 'La IA no devolvió campos reconocibles.' };
  } catch (err: any) {
    return { success: false, source: 'none', error: err?.message || 'Error de conexión.' };
  }
}
