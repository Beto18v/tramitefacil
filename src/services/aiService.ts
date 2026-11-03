import { DocumentType } from '../types/documents';
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

/**
 * Cliente para el enrutador y sugeridor inteligente de trámites.
 * Intenta invocar la Serverless Function con Gemini Flash y realiza
 * fallback transparente al motor heurístico offline si no hay red o cuota.
 */
export async function suggestDocument(
  caseDescription: string,
  abortSignal?: AbortSignal
): Promise<AiSuggestionResponse> {
  const trimmed = caseDescription.trim();

  if (!trimmed || trimmed.length < 5) {
    const emptyResult = analyzeCaseDescription(trimmed);
    return {
      ...emptyResult,
      source: 'offline_heuristic',
    };
  }

  // Si el navegador reporta estar offline, usamos directamente el motor local
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const localResult = analyzeCaseDescription(trimmed);
    return {
      ...localResult,
      source: 'offline_heuristic',
    };
  }

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

        // Caso 1: La IA detecta un caso fuera de alcance privado (delito penal, violencia, etc.)
        if (r.isOutOfScope && r.entityAdvice) {
          return {
            status: 'out_of_scope',
            alternatives: [],
            queryAnalyzed: trimmed,
            source: 'gemini_cloud',
            rawAiAdvice: r.reasoning,
            entityGuidance: {
              entityName: r.entityAdvice,
              entityCategory: 'Competencia Institucional',
              description: r.reasoning,
              actionRequired:
                'Este trámite requiere atención ante entidades judiciales o administrativas del Estado colombiano.',
              officialCanal: 'Consulte con la entidad oficial correspondiente o Personería Distrital.',
              canUsePetitionAsFirstStep: r.recommendedDocId === 'derecho_peticion',
              legalBasis: r.legalJustification || 'Constitución Política de Colombia',
            },
          };
        }

        // Caso 2: Documento recomendado del catálogo
        const matchedDoc = DOCUMENT_CATALOG.find((d) => d.id === r.recommendedDocId);

        if (matchedDoc) {
          // Buscamos alternativas en el catálogo que compartan categoría
          const altDocs = DOCUMENT_CATALOG.filter(
            (d) => d.category === matchedDoc.category && d.id !== matchedDoc.id
          ).slice(0, 2);

          return {
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
            alternatives: altDocs.map((doc) => ({
              document: doc,
              score: 75,
              reasoning: `Alternativa complementaria dentro del área de ${doc.categoryName}.`,
            })),
          };
        }
      }
    }
  } catch (err: any) {
    // Si fue abortado por un nuevo keystroke, dejamos fluir o silenciamos
    if (err.name === 'AbortError') {
      throw err;
    }
    console.warn('Fallback al motor heurístico offline debido a:', err?.message || err);
  }

  // Fallback 100% garantizado: Motor heurístico local en cliente
  const localFallback = analyzeCaseDescription(trimmed);
  return {
    ...localFallback,
    source: 'offline_heuristic',
  };
}

/**
 * Cliente para autollenado guiado (Prompt-to-Document).
 * Envía el caso del usuario para extraer campos estructurados según el documento.
 */
export async function autofillDocumentWithAi(
  docType: DocumentType,
  narrative: string,
  currentData?: any
): Promise<AutofillResponse> {
  const trimmed = narrative.trim();
  if (!trimmed || trimmed.length < 5) {
    return {
      success: false,
      source: 'none',
      error: 'La narración debe tener al menos 5 caracteres.',
    };
  }

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'autofill',
        payload: {
          docType,
          narrative: trimmed,
          currentData,
        },
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        source: 'none',
        error:
          errJson.error ||
          'No se pudo completar el autollenado con IA en este momento.',
      };
    }

    const data = await res.json();
    if (data.success && data.extractedFields) {
      return {
        success: true,
        source: 'gemini_cloud',
        extractedFields: data.extractedFields,
      };
    }

    return {
      success: false,
      source: 'none',
      error: 'La IA no devolvió campos reconocibles.',
    };
  } catch (err: any) {
    return {
      success: false,
      source: 'none',
      error: err?.message || 'Error de conexión con el servicio de IA.',
    };
  }
}

