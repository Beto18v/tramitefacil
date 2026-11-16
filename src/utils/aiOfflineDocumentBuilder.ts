import { DocumentoFormalData } from '../types/documents';
import { analyzeCaseDescription } from './aiDocumentSuggester';

/**
 * Motor heurístico local para preparar documentos formales y extraer datos
 * cuando el asistente en la nube no está disponible (sin internet, sin clave
 * configurada o ante una falla temporal del servicio).
 *
 * El objetivo es que la aplicación NUNCA se bloquee: si la nube falla,
 * se entrega un borrador utilizable o un mensaje cálido, jamás un error crudo.
 */

interface OfflineCustomDocPayload {
  caseDescription: string;
  selectedOptionTitle: string;
  answers?: Record<string, string>;
  userProfile?: any;
}

const ORDINALS = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO'];

const MONTHS_ES =
  'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre';

function todayFormatted(): string {
  return new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function cleanLine(text: string, maxLength: number): string {
  return (text || '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function splitSentences(text: string): string[] {
  const matches = text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+|[^.!?]{10,}/g);
  if (!matches) return [];
  return matches.map((s) => s.trim()).filter((s) => s.length >= 10);
}

/**
 * Construye un documento formal completo (DocumentoFormalData) con lenguaje
 * sobrio y estructura institucional, usando únicamente reglas locales.
 */
export function buildOfflineCustomDocument(
  payload: OfflineCustomDocPayload
): DocumentoFormalData {
  const caseText = cleanLine(payload.caseDescription || '', 2000);
  const optionTitle = cleanLine(payload.selectedOptionTitle || '', 150);
  const analysis = analyzeCaseDescription(caseText);
  const bestMatch = analysis.bestMatch;
  const profile = payload.userProfile || {};

  // --- Título ---
  const title =
    optionTitle && optionTitle.toUpperCase() !== 'DOCUMENTO FORMAL'
      ? `${optionTitle.toUpperCase()}`
      : 'OFICIO FORMAL DE PETICIÓN Y RECLAMACIÓN';

  // --- Asunto ---
  const firstSentence = splitSentences(caseText)[0] || caseText.slice(0, 180);
  const subjectBase = bestMatch
    ? `${bestMatch.reasoning} Solicitud o requerimiento derivado de: ${firstSentence}`
    : `Solicitud formal derivada de la situación descrita: ${firstSentence}`;
  const subject = cleanLine(subjectBase, 400);

  // --- Hechos numerados ---
  const facts: string[] = [];
  const sentences = splitSentences(caseText).slice(0, ORDINALS.length);
  sentences.forEach((sentence, index) => {
    facts.push(`${ORDINALS[index]}: ${cleanLine(sentence, 320)}`);
  });
  const answers = payload.answers || {};
  const answerValues = Object.values(answers)
    .map((v) => cleanLine(String(v || ''), 200))
    .filter((v) => v.length > 0);
  if (answerValues.length > 0 && facts.length < ORDINALS.length) {
    facts.push(
      `${ORDINALS[facts.length]}: Aclaraciones del ciudadano: ${answerValues.join('; ')}.`
    );
  }
  if (facts.length === 0) {
    facts.push('PRIMERO: Se presentó la situación descrita por el ciudadano en fecha reciente.');
  }

  // --- Fundamentos legales ---
  const legalBasis: string[] = [];
  if (bestMatch) {
    legalBasis.push(bestMatch.legalJustification);
  }
  legalBasis.push('Artículo 23 de la Constitución Política de Colombia (Derecho de Petición).');

  // --- Peticiones ---
  const petitions: string[] = [
    '1. Dar trámite y respuesta formal a la presente comunicación dentro de los términos legales vigentes.',
    '2. Adoptar las medidas necesarias para resolver la situación planteada de manera definitiva.',
    '3. En caso de no obtener respuesta oportuna, se informará que se acudirá a las autoridades de control competentes.',
  ];

  // --- Destinatario ---
  // Destinatario neutro y editable: la carta se dirige a la entidad competente,
  // no al nombre de la plantilla sugerida (el usuario lo ajusta si lo desea).
  const recipientName = 'A QUIEN CORRESPONDA / ENTIDAD DESTINATARIA';

  // --- Firmante con datos del perfil (si están disponibles) ---
  const signerName = cleanLine(String(profile.nombreCompleto || ''), 120);
  const signerId = cleanLine(String(profile.numeroDocumento || ''), 40);
  const signerPhone = cleanLine(String(profile.telefono || ''), 30);
  const signerEmail = cleanLine(String(profile.correo || ''), 80);
  const signerRole = cleanLine(String(profile.cargoOProfesion || 'SOLICITANTE'), 60);

  return {
    title,
    cityAndDate: `${cleanLine(String(profile.ciudad || ''), 60) || 'Bogotá D.C.'}, ${todayFormatted()}`,
    recipient: {
      name: recipientName,
      titleOrCompany: 'Dirección o Representación Legal',
      address:
        cleanLine(String(profile.direccion || ''), 120) ||
        'Ciudad / Dirección de Notificaciones',
    },
    subject,
    openingGreeting: 'Respetado(a) señor(a):',
    facts,
    legalBasis,
    petitions,
    closing: 'Atentamente,',
    signatures: [
      {
        role: signerRole || 'SOLICITANTE',
        name: signerName || 'Nombre Completo del Solicitante',
        idNumber: signerId
          ? `C.C. No. ${signerId}${profile.expedicionDocumento ? ` de ${profile.expedicionDocumento}` : ''}`
          : 'C.C. No. 00.000.000',
        phone: signerPhone || undefined,
        email: signerEmail || undefined,
      },
    ],
    signatureType: profile.signatureDataUrl ? 'draw' : 'text',
    signatureDataUrl: profile.signatureDataUrl || undefined,
  };
}

// ===========================================================================
// Extracción heurística de datos para autollenado sin conexión
// ===========================================================================

type FieldCategory =
  | 'cedula'
  | 'nombre'
  | 'correo'
  | 'telefono'
  | 'fecha'
  | 'valor'
  | 'direccion';

const KEY_HINTS: Record<FieldCategory, string[]> = {
  cedula: ['cedula', 'identificacion', 'numero de documento', 'nit', 'cc'],
  nombre: ['nombre'],
  correo: ['correo', 'email'],
  telefono: ['telefono', 'celular', 'movil', 'contacto'],
  fecha: ['fecha', 'vencimiento', 'inicio', 'termino', 'plazo', 'vigencia'],
  valor: ['valor', 'precio', 'canon', 'monto', 'salario', 'sueldo', 'honorarios', 'arriendo', 'tarifa'],
  direccion: ['direccion', 'domicilio', 'ubicacion', 'inmueble ubicado', 'residencia'],
};

function normalizeKey(key: string): string {
  return key
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function categorizeKey(key: string): FieldCategory | null {
  const norm = normalizeKey(key);
  for (const [category, hints] of Object.entries(KEY_HINTS) as [
    FieldCategory,
    string[]
  ][]) {
    if (hints.some((hint) => norm.includes(hint))) return category;
  }
  return null;
}

function extractCandidates(narrative: string): Partial<Record<FieldCategory, string>> {
  const found: Partial<Record<FieldCategory, string>> = {};

  // Cédula: "cédula 1.020.304.505", "C.C. 79.854.120", "identificada con 1020304505"
  const cedulaMatch = narrative.match(
    /(?:c[eé]dula(?:\s+de\s+ciudadan[ií]a)?|C\.?C\.?|identificaci[óo]n|documento\s+de\s+identidad)\s*(?:n[°ºúmero.:\s]*)?([\d.]{5,15})/i
  );
  if (cedulaMatch) {
    found.cedula = cedulaMatch[1].replace(/\./g, '').slice(0, 15);
  } else {
    // Respaldo sin palabra clave: número con formato de cédula (ej. 79.854.120),
    // evitando confundirlo con valores monetarios cercanos
    const fallbackCedula = narrative.match(/\b([1-9]\d{1,2}(?:\.\d{3}){2})\b/);
    if (fallbackCedula) {
      const matchIndex = fallbackCedula.index ?? 0;
      const before = narrative.slice(Math.max(0, matchIndex - 30), matchIndex);
      if (!/(valor|canon|monto|pesos|\$|precio|honorarios)/i.test(before)) {
        found.cedula = fallbackCedula[1].replace(/\./g, '');
      }
    }
  }

  // Correo
  const emailMatch = narrative.match(/[\w.+-]+@[\w-]+\.[\w.-]{2,}/);
  if (emailMatch) found.correo = emailMatch[0].slice(0, 80);

  // Teléfono / celular colombiano (10 dígitos empezando en 3, u +57)
  const phoneMatch = narrative.match(
    /(?:\+57[\s-]?)?\b(3\d{2}[\s.-]?\d{3}[\s.-]?\d{4})\b/
  );
  if (phoneMatch) found.telefono = phoneMatch[1].replace(/[\s.-]/g, '');

  // Fecha larga: "1 de diciembre de 2026"
  const longDateMatch = narrative.match(
    new RegExp(`(\\d{1,2})\\s+de\\s+(${MONTHS_ES})\\s+(?:de\\s+)?(\\d{4})`, 'i')
  );
  if (longDateMatch) {
    found.fecha = `${longDateMatch[1]} de ${longDateMatch[2].toLowerCase()} de ${longDateMatch[3]}`;
  } else {
    // Fecha corta: 12/05/2026 o 12-05-2026
    const shortDateMatch = narrative.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\b/);
    if (shortDateMatch) {
      found.fecha = `${shortDateMatch[1]}/${shortDateMatch[2]}/${shortDateMatch[3]}`;
    }
  }

  // Valor monetario: "$1.800.000", "valor mensual de 1.800.000", "canon de arrendamiento de 1.800.000 pesos"
  const amountMatch = narrative.match(
    /(?:\$|valor\s+(?:(?:mensual|total)\s+)?(?:de\s+)?|canon\s+(?:de\s+arrendamiento\s+)?(?:de\s+)?|monto\s+de\s+|precio\s+de\s+|honorarios\s+(?:de\s+)?)\s*([\d][\d.,]{2,14})/i
  );
  if (amountMatch) {
    const rawAmount = amountMatch[1].replace(/[.,\s]+$/, '');
    if (rawAmount.replace(/[.,]/g, '').length >= 3) {
      found.valor = rawAmount;
    }
  }

  // Nombre: secuencia de 2 a 4 palabras capitalizadas tras una fórmula de identificación
  const nameMatch = narrative.match(
    /(?:a\s+nombre\s+de|se[ñn]or(?:a)?|llamad[oa]|arrendador|arrendatario|solicitante|trabajador(?:a)?)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){1,3})/
  );
  if (nameMatch) found.nombre = cleanLine(nameMatch[1], 80);

  // Dirección: "Calle 123 # 45-67", "Carrera 7 con 45"
  const addressMatch = narrative.match(
    /((?:calle|carrera|cra|kr|k|transversal|transv|diagonal|diag|avenida|av)\.?\s+[^,;.\n]{1,40}?)(?=\s+(?:por|con|de|en|entre)\s|\s*[,;.]|\s*$)/i
  );
  if (addressMatch) found.direccion = cleanLine(addressMatch[1], 120);

  return found;
}

/**
 * Convierte un texto de valor numérico (posiblemente con separadores de miles
 * al estilo colombiano, ej. "1.800.000" o "1.800.000,50") en número real.
 * Devuelve null si el texto no representa un número interpretable.
 */
function parseNumericCandidate(raw: string): number | null {
  const text = (raw || '').replace(/\s/g, '');
  if (!text) return null;
  let normalized = text;
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(normalized)) {
    // Punto como separador de miles y coma decimal (formato colombiano)
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(normalized)) {
    // Coma como separador de miles y punto decimal
    normalized = normalized.replace(/,/g, '');
  } else {
    normalized = normalized.replace(/[.,]/g, '');
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Intenta reconocer datos comunes (nombres, fechas, cédulas, valores,
 * direcciones, correos y teléfonos) en la narración del usuario y mapearlos
 * a las casillas reales del formulario actual (claves de `currentData`).
 *
 * Devuelve un objeto con SOLO las casillas reconocidas; si no logra
 * reconocer nada útil, devuelve un objeto vacío.
 */
export function extractOfflineFields(
  narrative: string,
  currentData?: any
): Record<string, any> {
  if (!narrative || !currentData || typeof currentData !== 'object') return {};

  const candidates = extractCandidates(narrative);
  const result: Record<string, any> = {};

  for (const key of Object.keys(currentData)) {
    const value = (currentData as Record<string, any>)[key];
    if (typeof value !== 'string' && typeof value !== 'number') continue;
    const category = categorizeKey(key);
    if (!category) continue;
    const candidate = candidates[category];
    if (candidate && candidate.length > 0) {
      if (typeof value === 'number') {
        const numericValue = parseNumericCandidate(candidate);
        if (numericValue !== null) {
          result[key] = numericValue;
        }
      } else {
        result[key] = candidate;
      }
    }
  }

  return result;
}
