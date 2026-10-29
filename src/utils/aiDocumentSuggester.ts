import { DOCUMENT_CATALOG, DocumentMeta, DocumentType } from '../types/documents';

export interface EntityGuidance {
  entityName: string;
  entityCategory: string;
  description: string;
  actionRequired: string;
  officialCanal: string;
  canUsePetitionAsFirstStep: boolean;
  legalBasis: string;
}

export interface SuggestedMatch {
  document: DocumentMeta;
  confidence: 'alta' | 'media';
  score: number;
  legalJustification: string;
  reasoning: string;
  keyPoints: string[];
}

export interface AlternativeMatch {
  document: DocumentMeta;
  score: number;
  reasoning: string;
}

export interface SuggestionResult {
  status: 'matched' | 'out_of_scope' | 'no_match' | 'empty';
  bestMatch?: SuggestedMatch;
  alternatives: AlternativeMatch[];
  entityGuidance?: EntityGuidance;
  queryAnalyzed: string;
}

/**
 * Normaliza cadenas de texto en español removiendo acentos, puntuación y convirtiendo a minúsculas
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quita tildes
    .replace(/[^a-z0-9\s]/g, ' ') // Quita puntuación
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Reglas de intenciones de entidades públicas / casos fuera de alcance contractual directo
 */
interface OutOfScopeRule {
  id: string;
  triggers: string[];
  entityGuidance: EntityGuidance;
}

const OUT_OF_SCOPE_RULES: OutOfScopeRule[] = [
  {
    id: 'penal_delitos',
    triggers: [
      'me robaron',
      'robo',
      'hurto',
      'estafa virtual',
      'estafaron',
      'clonaron tarjeta',
      'fraude informatico',
      'extorsion',
      'amenazas de muerte',
      'secuestro',
      'agresion fisica',
      'lesiones personales',
      'delito penal',
      'denuncia penal',
      'fiscalia',
    ],
    entityGuidance: {
      entityName: 'Fiscalía General de la Nación (Portal Adenunciar)',
      entityCategory: 'Justicia Penal & Seguridad',
      description: 'Los delitos penales (estafas, hurtos, fraudes electrónicos, agresiones o amenazas) no se tramitan mediante contratos privados; requieren investigación penal formal.',
      actionRequired: 'Debes formular una denuncia penal formal ante la Fiscalía o Policía Nacional. No requiere abogado para su radicación.',
      officialCanal: 'https://adenunciar.policia.gov.co o en una Unidad de Reacción Inmediata (URI) local.',
      canUsePetitionAsFirstStep: false,
      legalBasis: 'Ley 906 de 2004 (Código de Procedimiento Penal)',
    },
  },
  {
    id: 'familia_alimentos',
    triggers: [
      'cuota de alimentos',
      'demanda de alimentos',
      'manutencion',
      'custodia de mis hijos',
      'custodia compartida',
      'patria potestad',
      'divorcio contencioso',
      'violencia intrafamiliar',
      'maltrato a menores',
      'icbf',
      'comisaria de familia',
    ],
    entityGuidance: {
      entityName: 'Comisaría de Familia / ICBF / Centros de Conciliación',
      entityCategory: 'Derecho de Familia & Menores',
      description: 'Las disputas de alimentos para menores, régimen de visitas, patria potestad o violencia familiar están sujetas a medidas de protección judicial o audiencias de conciliación obligatorias.',
      actionRequired: 'Acude inmediatamente a la Comisaría de Familia de tu localidad o Centro Zonal del ICBF para una audiencia de fijación o medidas cautelares.',
      officialCanal: 'Comisaría de Familia de tu municipio / Línea Gratuita Nacional ICBF 141.',
      canUsePetitionAsFirstStep: false,
      legalBasis: 'Ley 1098 de 2006 (Código de la Infancia y la Adolescencia)',
    },
  },
  {
    id: 'convivencia_policia',
    triggers: [
      'vecino ruidoso',
      'musica a alto volumen',
      'fiestas todos los dias',
      'pelea entre vecinos',
      'excremento de perro vecino',
      'humedad del apartamento de arriba vecino',
      'codigo de policia',
      'querella policiva',
    ],
    entityGuidance: {
      entityName: 'Inspección de Policía & Comité de Convivencia',
      entityCategory: 'Convivencia Ciudadana',
      description: 'Los conflictos por ruidos excesivos, mascotas o perturbación a la tranquilidad no se resuelven con contratos privados; son competencia de las autoridades de policía local.',
      actionRequired: 'Llama al cuadrante de Policía en flagrancia (Línea 123) o instaura una querella de convivencia ante la Inspección de Policía de tu localidad.',
      officialCanal: 'Inspección de Policía Distrital o Municipal / Comité de Convivencia de tu edificio.',
      canUsePetitionAsFirstStep: false,
      legalBasis: 'Ley 1801 de 2016 (Código Nacional de Seguridad y Convivencia Ciudadana)',
    },
  },
  {
    id: 'salud_tutela_urgente',
    triggers: [
      'riesgo de muerte',
      'tratamiento oncologico negado',
      'cancer cirugia urgente negada',
      'salvar la vida',
      'peligro de muerte eps',
      'necesito tutela urgente',
    ],
    entityGuidance: {
      entityName: 'Personería Distrital / Defensoría del Pueblo (Acción de Tutela)',
      entityCategory: 'Derechos Fundamentales & Urgencias de Salud',
      description: 'Cuando la negación de un medicamento o procedimiento médico pone en riesgo inminente la vida o la integridad física, un derecho de petición ordinario (15 días) puede tardar demasiado.',
      actionRequired: 'Debes presentar de inmediato una Acción de Tutela con solicitud de Medida Cautelar Provisional ante los juzgados de turno. La Personería o Defensoría te redacta la tutela sin costo.',
      officialCanal: 'Personería Municipal de tu ciudad o Defensoría del Pueblo (portal web o presencial).',
      canUsePetitionAsFirstStep: true,
      legalBasis: 'Artículo 86 de la Constitución Política y Decreto 2591 de 1991',
    },
  },
  {
    id: 'acoso_laboral_mintrabajo',
    triggers: [
      'acoso laboral severo',
      'fuero sindical despido',
      'despido en estado de embarazo',
      'fuero de maternidad',
      'inspector de trabajo',
      'ministerio del trabajo denuncia',
    ],
    entityGuidance: {
      entityName: 'Ministerio del Trabajo (MinTrabajo)',
      entityCategory: 'Protección Laboral Reforzada',
      description: 'El despido de mujeres en estado de embarazo o trabajadores con estabilidad ocupacional reforzada (fuero de salud o sindical) es nulo sin previa autorización del Ministerio del Trabajo.',
      actionRequired: 'Radica una queja ante el Inspector de Trabajo para solicitar la ineficacia del despido, reintegro inmediato y pago de indemnizaciones legales.',
      officialCanal: 'https://www.mintrabajo.gov.co - Línea Gratuita Nacional 120.',
      canUsePetitionAsFirstStep: true,
      legalBasis: 'Artículo 239 y 240 del Código Sustantivo del Trabajo (CST)',
    },
  },
];

/**
 * Reglas y pesos semánticos para cada uno de los 15 documentos
 */
interface DocumentRule {
  id: DocumentType;
  keyPhrases: { phrase: string; weight: number }[];
  keywords: { word: string; weight: number }[];
  contextEvaluator?: (normalized: string) => { extraScore: number; reasonCustom?: string };
  defaultLegalJustification: string;
  defaultReasoning: string;
  keyPoints: string[];
}

const DOCUMENT_RULES: DocumentRule[] = [
  // 1. DERECHO DE PETICIÓN
  {
    id: 'derecho_peticion',
    keyPhrases: [
      { phrase: 'derecho de peticion', weight: 45 },
      { phrase: 'peticion formal', weight: 35 },
      { phrase: 'garantia de producto', weight: 40 },
      { phrase: 'devolver el dinero', weight: 30 },
      { phrase: 'devolucion de dinero', weight: 30 },
      { phrase: 'no me quieren responder', weight: 28 },
      { phrase: 'no me quieren dar garantia', weight: 38 },
      { phrase: 'no responden por garantia', weight: 38 },
      { phrase: 'reclamo por garantia', weight: 35 },
      { phrase: 'producto defectuoso', weight: 30 },
      { phrase: 'cobro indebido', weight: 28 },
      { phrase: 'queja formal', weight: 25 },
      { phrase: 'solicitud de informacion', weight: 22 },
      { phrase: 'historia clinica', weight: 26 },
      { phrase: 'eps no responde', weight: 30 },
      { phrase: 'reclamo al banco', weight: 28 },
      { phrase: 'servicios publicos reclamo', weight: 26 },
      { phrase: 'alcaldia solicitud', weight: 22 },
      { phrase: '15 dias habiles', weight: 25 },
    ],
    keywords: [
      { word: 'peticion', weight: 14 },
      { word: 'pqrs', weight: 18 },
      { word: 'garantia', weight: 18 },
      { word: 'nevera', weight: 16 },
      { word: 'televisor', weight: 16 },
      { word: 'celular', weight: 12 },
      { word: 'electrodomestico', weight: 16 },
      { word: 'almacen', weight: 12 },
      { word: 'tienda', weight: 8 },
      { word: 'defecto', weight: 12 },
      { word: 'dano', weight: 10 },
      { word: 'reclamo', weight: 14 },
      { word: 'queja', weight: 12 },
      { word: 'eps', weight: 14 },
      { word: 'ips', weight: 12 },
      { word: 'banco', weight: 10 },
      { word: 'factura', weight: 8 },
      { word: 'cobro', weight: 8 },
      { word: 'superintendencia', weight: 12 },
      { word: 'sic', weight: 14 },
      { word: 'movistar', weight: 14 },
      { word: 'claro', weight: 14 },
      { word: 'tigo', weight: 14 },
    ],
    contextEvaluator: (norm) => {
      if (norm.includes('garantia') || norm.includes('nevera') || norm.includes('almacen') || norm.includes('devolver')) {
        return {
          extraScore: 20,
          reasonCustom: 'Para exigir ante el establecimiento o fabricante la efectividad de la garantía legal, reparación inmediata o la devolución del dinero conforme al Estatuto del Consumidor (Ley 1480 de 2011).',
        };
      }
      if (norm.includes('eps') || norm.includes('salud') || norm.includes('medicamento')) {
        return {
          extraScore: 18,
          reasonCustom: 'Para solicitar a la EPS la asignación de citas prioritarias, entrega de medicamentos pendientes o autorizaciones médicas en el plazo perentorio de ley.',
        };
      }
      if (norm.includes('banco') || norm.includes('tarjeta') || norm.includes('credito')) {
        return {
          extraScore: 16,
          reasonCustom: 'Para objetar cargos no autorizados, solicitar reliquidaciones de crédito o copia de pagarés ante la entidad financiera.',
        };
      }
      return { extraScore: 0 };
    },
    defaultLegalJustification: 'Artículo 23 de la Constitución Política de Colombia y Ley 1755 de 2015. Otorga plazo perentorio legal de 15 días hábiles a la entidad o empresa para emitir respuesta de fondo.',
    defaultReasoning: 'Es el mecanismo legal idóneo y de mayor fuerza vinculante en Colombia para formular peticiones, quejas y reclamos formales ante empresas o entidades públicas.',
    keyPoints: [
      'Respuesta obligatoria en máximo 15 días hábiles por ley',
      'Sirve como prueba formal previa si necesitas acudir a la SIC o presentar Tutela',
      'No requiere abogado ni gastos notariales',
    ],
  },

  // 2. CARTA DE RENUNCIA LABORAL
  {
    id: 'carta_renuncia',
    keyPhrases: [
      { phrase: 'carta de renuncia', weight: 45 },
      { phrase: 'renuncia de trabajo', weight: 42 },
      { phrase: 'renunciar a mi trabajo', weight: 42 },
      { phrase: 'renuncia laboral', weight: 40 },
      { phrase: 'dejar mi trabajo', weight: 35 },
      { phrase: 'dejar el empleo', weight: 35 },
      { phrase: 'terminar contrato laboral', weight: 30 },
      { phrase: 'exoneracion de preaviso', weight: 35 },
      { phrase: 'liquidacion laboral', weight: 25 },
      { phrase: 'retiro voluntario', weight: 32 },
      { phrase: 'renuncia con preaviso', weight: 38 },
      { phrase: 'renuncia irrevocable', weight: 35 },
    ],
    keywords: [
      { word: 'renuncia', weight: 20 },
      { word: 'renunciar', weight: 20 },
      { word: 'empleo', weight: 10 },
      { word: 'trabajo', weight: 10 },
      { word: 'jefe', weight: 8 },
      { word: 'empleador', weight: 10 },
      { word: 'preaviso', weight: 16 },
      { word: 'liquidacion', weight: 14 },
      { word: 'cesantias', weight: 12 },
      { word: 'dimitir', weight: 18 },
      { word: 'cargo', weight: 6 },
    ],
    defaultLegalJustification: 'Código Sustantivo del Trabajo (C.S.T.) y jurisprudencia de la Corte Suprema de Justicia en materia de libertad contractual y terminación unilateral voluntaria.',
    defaultReasoning: 'Comunica formalmente el fin voluntario de la relación laboral, permite solicitar la exoneración del preaviso y deja constancia escrita para la liquidación oportuna de tus cesantías y prestaciones.',
    keyPoints: [
      'Incluye switch de exoneración de preaviso legal',
      'Exige el pago de liquidación definitiva de salarios y prestaciones',
      'Asegura fecha cierta de desvinculación formal',
    ],
  },

  // 3. CUENTA DE COBRO
  {
    id: 'cuenta_cobro',
    keyPhrases: [
      { phrase: 'cuenta de cobro', weight: 48 },
      { phrase: 'cobro de honorarios', weight: 42 },
      { phrase: 'cobrar honorarios', weight: 40 },
      { phrase: 'cobrar servicios prestados', weight: 38 },
      { phrase: 'documento equivalente', weight: 32 },
      { phrase: 'retencion en la fuente', weight: 30 },
      { phrase: 'cobro freelance', weight: 35 },
      { phrase: 'honorarios pendientes', weight: 35 },
      { phrase: 'pago de cuenta', weight: 25 },
      { phrase: 'cuenta por cobrar', weight: 30 },
    ],
    keywords: [
      { word: 'honorarios', weight: 18 },
      { word: 'cobro', weight: 16 },
      { word: 'cobrar', weight: 16 },
      { word: 'freelance', weight: 14 },
      { word: 'retencion', weight: 14 },
      { word: 'retefuente', weight: 16 },
      { word: 'ica', weight: 12 },
      { word: 'facturar', weight: 10 },
      { word: 'factura', weight: 8 },
      { word: 'prestacion', weight: 8 },
      { word: 'contratista', weight: 12 },
      { word: 'pago', weight: 8 },
    ],
    defaultLegalJustification: 'Artículo 437 del Estatuto Tributario y Artículo 1.6.1.4.12 del Decreto Único Reglamentario 1625 de 2016.',
    defaultReasoning: 'Es el documento equivalente formal exigido en Colombia para que las personas naturales no responsables de IVA soliciten el desembolso de sus honorarios y servicios independientes.',
    keyPoints: [
      'Cálculo automático de Retención en la Fuente (10%, 11%, 4%) e ICA',
      'Desglose multilínea de conceptos y fechas de ejecución',
      'Cumple con los requisitos fiscales ante la DIAN',
    ],
  },

  // 4. AUTORIZACIÓN Y RETIRO DE PATIOS
  {
    id: 'autorizacion_patios',
    keyPhrases: [
      { phrase: 'retiro de patios', weight: 48 },
      { phrase: 'sacar de patios', weight: 45 },
      { phrase: 'patios de transito', weight: 45 },
      { phrase: 'vehiculo inmovilizado', weight: 40 },
      { phrase: 'inmovilizacion de moto', weight: 40 },
      { phrase: 'inmovilizacion de carro', weight: 40 },
      { phrase: 'secretaria de movilidad patios', weight: 38 },
      { phrase: 'poder para patios', weight: 42 },
      { phrase: 'autorizacion para patios', weight: 42 },
      { phrase: 'sacar moto de patios', weight: 45 },
      { phrase: 'sacar carro de patios', weight: 45 },
      { phrase: 'grua patios', weight: 35 },
    ],
    keywords: [
      { word: 'patios', weight: 24 },
      { word: 'inmovilizado', weight: 20 },
      { word: 'inmovilizada', weight: 20 },
      { word: 'inmovilizacion', weight: 20 },
      { word: 'transito', weight: 12 },
      { word: 'movilidad', weight: 10 },
      { word: 'grua', weight: 14 },
      { word: 'comparendo', weight: 12 },
      { word: 'placa', weight: 8 },
      { word: 'moto', weight: 8 },
      { word: 'automovil', weight: 8 },
    ],
    defaultLegalJustification: 'Ley 769 de 2002 (Código Nacional de Tránsito Terrestre) y resoluciones distritales/municipales de movilidad urbana.',
    defaultReasoning: 'Otorga autorización y poder especial expreso para que una persona de tu entera confianza retire un automotor retenido en los patios oficiales de tránsito cuando el propietario no puede asistir.',
    keyPoints: [
      'Formato estricto admitido por Secretarías de Movilidad y Tránsito',
      'Incluye datos de placa, chasis, inventario de entrega y huella dactilar',
      'Evita cobros adicionales por permanencia de días en parqueadero oficial',
    ],
  },

  // 5. NO RENOVACIÓN DE ARRENDAMIENTO
  {
    id: 'no_renovacion_arriendo',
    keyPhrases: [
      { phrase: 'no renovacion de arrendamiento', weight: 48 },
      { phrase: 'no renovar arriendo', weight: 45 },
      { phrase: 'terminacion de arriendo', weight: 40 },
      { phrase: 'terminar contrato de arriendo', weight: 40 },
      { phrase: 'pedir el inmueble', weight: 35 },
      { phrase: 'pedir la casa', weight: 35 },
      { phrase: 'pedir el apartamento', weight: 35 },
      { phrase: 'desocupar el inmueble', weight: 35 },
      { phrase: 'preaviso de arriendo', weight: 40 },
      { phrase: 'preaviso de 3 meses', weight: 42 },
      { phrase: 'no prorrogar arriendo', weight: 42 },
      { phrase: 'terminar arrendamiento sin multa', weight: 40 },
    ],
    keywords: [
      { word: 'arriendo', weight: 16 },
      { word: 'arrendamiento', weight: 16 },
      { word: 'inquilino', weight: 14 },
      { word: 'arrendatario', weight: 14 },
      { word: 'arrendador', weight: 14 },
      { word: 'desocupar', weight: 14 },
      { word: 'preaviso', weight: 14 },
      { word: 'vencimiento', weight: 12 },
      { word: 'renovar', weight: 12 },
      { word: 'prorroga', weight: 12 },
    ],
    defaultLegalJustification: 'Ley 820 de 2003 (Régimen de Arrendamiento de Vivienda Urbana), artículos 22, 23 y 24 sobre causales y preavisos de terminación.',
    defaultReasoning: 'Permite notificar al arrendatario o arrendador con la antelación de 3 meses exigida por la ley para dar por finalizado el contrato al vencer el periodo, evitando renovaciones automáticas o indemnizaciones.',
    keyPoints: [
      'Cumple con los 3 meses mínimos de preaviso legal de la Ley 820',
      'Evita prórrogas automáticas indeseadas y sanciones económicas',
      'Deja constancia formal para el proceso de restitución del inmueble',
    ],
  },

  // 6. CONTRATO DE ARRENDAMIENTO
  {
    id: 'contrato_arrendamiento',
    keyPhrases: [
      { phrase: 'contrato de arrendamiento', weight: 48 },
      { phrase: 'contrato de arriendo', weight: 45 },
      { phrase: 'alquilar apartamento', weight: 40 },
      { phrase: 'alquilar casa', weight: 40 },
      { phrase: 'arrendar apartamento', weight: 40 },
      { phrase: 'arrendar casa', weight: 40 },
      { phrase: 'canon de arrendamiento', weight: 35 },
      { phrase: 'fiador solidario', weight: 35 },
      { phrase: 'codeudor solidario', weight: 35 },
      { phrase: 'contrato de alquiler', weight: 38 },
      { phrase: 'vivienda urbana arriendo', weight: 36 },
    ],
    keywords: [
      { word: 'arrendamiento', weight: 18 },
      { word: 'arriendo', weight: 16 },
      { word: 'alquiler', weight: 14 },
      { word: 'alquilar', weight: 14 },
      { word: 'canon', weight: 14 },
      { word: 'inmueble', weight: 10 },
      { word: 'apartamento', weight: 12 },
      { word: 'casa', weight: 8 },
      { word: 'inquilino', weight: 10 },
      { word: 'codeudor', weight: 14 },
      { word: 'fiador', weight: 14 },
    ],
    defaultLegalJustification: 'Ley 820 de 2003 y Código Civil Colombiano.',
    defaultReasoning: 'Establece de manera formal las condiciones del alquiler de vivienda urbana: valor del canon mensual, fecha de corte, cláusula de codeudor solidario y prohibiciones contractuales.',
    keyPoints: [
      'Soporte completo para fiador / codeudor solidario con finca raíz',
      'Cláusulas actualizadas de incremento anual según IPC y Ley 820',
      'Protege los derechos de ambas partes y fija inventario inicial',
    ],
  },

  // 7. ACTA DE ENTREGA DE INMUEBLE
  {
    id: 'acta_entrega',
    keyPhrases: [
      { phrase: 'acta de entrega', weight: 48 },
      { phrase: 'entrega de inmueble', weight: 42 },
      { phrase: 'entrega de llaves', weight: 40 },
      { phrase: 'recibir apartamento', weight: 38 },
      { phrase: 'recibir casa', weight: 38 },
      { phrase: 'devolucion de llaves', weight: 40 },
      { phrase: 'inventario de entrega', weight: 42 },
      { phrase: 'estado del inmueble', weight: 35 },
      { phrase: 'paz y salvo arriendo', weight: 35 },
      { phrase: 'lectura de contadores', weight: 35 },
      { phrase: 'restitucion de inmueble', weight: 35 },
    ],
    keywords: [
      { word: 'llaves', weight: 18 },
      { word: 'inventario', weight: 16 },
      { word: 'entrega', weight: 14 },
      { word: 'inmueble', weight: 10 },
      { word: 'paredes', weight: 10 },
      { word: 'pintura', weight: 10 },
      { word: 'servicios', weight: 8 },
      { word: 'contadores', weight: 14 },
      { word: 'danos', weight: 8 },
    ],
    defaultLegalJustification: 'Ley 820 de 2003 y régimen probatorio general del Código General del Proceso (C.G.P.).',
    defaultReasoning: 'Deja constancia física probatoria del estado de conservación, pintura, llaves recibidas y lectura final de contadores de servicios públicos al momento de recibir o devolver un inmueble.',
    keyPoints: [
      'Inventario detallado de estado de muros, pisos y llaves de acceso',
      'Registro de lecturas de agua, luz y gas para liquidación de servicios',
      'Exonera de responsabilidades futuras por daños sobrevinientes',
    ],
  },

  // 8. HABEAS DATA / ELIMINACIÓN REPORTES
  {
    id: 'habeas_data',
    keyPhrases: [
      { phrase: 'habeas data', weight: 48 },
      { phrase: 'borron y cuenta nueva', weight: 46 },
      { phrase: 'reporte negativo', weight: 42 },
      { phrase: 'datacredito reporte', weight: 45 },
      { phrase: 'eliminar reporte', weight: 42 },
      { phrase: 'quitar reporte de datacredito', weight: 45 },
      { phrase: 'cifin reporte', weight: 42 },
      { phrase: 'transunion reporte', weight: 42 },
      { phrase: 'centrales de riesgo', weight: 38 },
      { phrase: 'caducidad de reporte', weight: 40 },
      { phrase: 'score crediticio', weight: 30 },
      { phrase: 'historial de credito', weight: 30 },
    ],
    keywords: [
      { word: 'datacredito', weight: 22 },
      { word: 'cifin', weight: 20 },
      { word: 'transunion', weight: 18 },
      { word: 'procredito', weight: 16 },
      { word: 'reporte', weight: 16 },
      { word: 'reportado', weight: 16 },
      { word: 'moroso', weight: 12 },
      { word: 'caducidad', weight: 14 },
      { word: 'prescripcion', weight: 12 },
      { word: 'deuda', weight: 8 },
    ],
    defaultLegalJustification: 'Ley Estatutaria 1266 de 2008 y Ley 2157 de 2021 (Ley de Borrón y Cuenta Nueva).',
    defaultReasoning: 'Exige formalmente ante las centrales de riesgo y fuentes financieras la eliminación inmediata o actualización de reportes negativos cuando la obligación ya caducó, prescribió o no fue notificada.',
    keyPoints: [
      'Amparado en los beneficios de la Ley de Borrón y Cuenta Nueva',
      'Obliga a rectificar o eliminar el dato negativo caducado',
      'Restaura tu historial financiero para volver a acceder a créditos',
    ],
  },

  // 9. PODER ESPECIAL / AUTORIZACIÓN A TERCEROS
  {
    id: 'poder_autorizacion',
    keyPhrases: [
      { phrase: 'poder especial', weight: 48 },
      { phrase: 'autorizacion a terceros', weight: 42 },
      { phrase: 'autorizar a un familiar', weight: 40 },
      { phrase: 'autorizar a otra persona', weight: 40 },
      { phrase: 'reclamar documentos por mi', weight: 38 },
      { phrase: 'tramite en mi nombre', weight: 38 },
      { phrase: 'hacer diligencia por mi', weight: 38 },
      { phrase: 'poder para tramite', weight: 40 },
      { phrase: 'poder con huella', weight: 35 },
      { phrase: 'mandato especial', weight: 38 },
    ],
    keywords: [
      { word: 'poder', weight: 16 },
      { word: 'autorizacion', weight: 16 },
      { word: 'autorizo', weight: 14 },
      { word: 'autorizar', weight: 14 },
      { word: 'tercero', weight: 10 },
      { word: 'apoderado', weight: 12 },
      { word: 'diligencia', weight: 10 },
      { word: 'huella', weight: 12 },
      { word: 'radicar', weight: 8 },
    ],
    defaultLegalJustification: 'Artículos 2142 y ss. del Código Civil Colombiano y Artículo 84 del Código General del Proceso.',
    defaultReasoning: 'Otorga facultades legales expresas a un tercero de confianza para que realice trámites, radique documentos o reclame certificados en tu nombre con recuadro de huella dactilar.',
    keyPoints: [
      'Facultades puntuales y delimitadas para evitar extralimitaciones',
      'Espacio formal para firma y huella dactilar requerida por entidades',
      'Válido ante bancos, notarías, empresas y entidades públicas',
    ],
  },

  // 10. COMPRAVENTA DE VEHÍCULO
  {
    id: 'compraventa_vehiculo',
    keyPhrases: [
      { phrase: 'compraventa de vehiculo', weight: 48 },
      { phrase: 'compraventa de carro', weight: 46 },
      { phrase: 'compraventa de moto', weight: 46 },
      { phrase: 'vender carro', weight: 40 },
      { phrase: 'comprar carro', weight: 40 },
      { phrase: 'vender moto', weight: 40 },
      { phrase: 'comprar moto', weight: 40 },
      { phrase: 'traspaso de vehiculo', weight: 42 },
      { phrase: 'traspaso de placas', weight: 40 },
      { phrase: 'contrato de venta carro', weight: 42 },
    ],
    keywords: [
      { word: 'carro', weight: 16 },
      { word: 'moto', weight: 16 },
      { word: 'automovil', weight: 14 },
      { word: 'motocicleta', weight: 14 },
      { word: 'vehiculo', weight: 14 },
      { word: 'placas', weight: 12 },
      { word: 'chasis', weight: 12 },
      { word: 'motor', weight: 10 },
      { word: 'soat', weight: 12 },
      { word: 'tecnomecanica', weight: 12 },
      { word: 'traspaso', weight: 16 },
    ],
    defaultLegalJustification: 'Artículo 905 y ss. del Código de Comercio y Ley 769 de 2002 (Código Nacional de Tránsito).',
    defaultReasoning: 'Formaliza la venta de un vehículo automotor o motocicleta, especificando placas, números de serie, saneamiento de multas y acuerdos sobre quién asume los gastos de traspaso ante tránsito.',
    keyPoints: [
      'Cláusula de paz y salvo de multas, comparendos e impuestos de rodamiento',
      'Compromiso vinculante de radicación de traspaso con fecha límite',
      'Garantía de saneamiento por vicios ocultos y titularidad legal',
    ],
  },

  // 11. CONTRATO DE PRESTACIÓN DE SERVICIOS
  {
    id: 'contrato_prestacion',
    keyPhrases: [
      { phrase: 'contrato de prestacion de servicios', weight: 48 },
      { phrase: 'prestacion de servicios profesionales', weight: 45 },
      { phrase: 'contratista independiente', weight: 38 },
      { phrase: 'servicios profesionales independientes', weight: 38 },
      { phrase: 'sin subordinacion', weight: 35 },
      { phrase: 'autonomia tecnica', weight: 35 },
      { phrase: 'contratar un programador', weight: 32 },
      { phrase: 'contratar disenador', weight: 32 },
      { phrase: 'contratar consultor', weight: 32 },
    ],
    keywords: [
      { word: 'prestacion', weight: 14 },
      { word: 'servicios', weight: 12 },
      { word: 'independiente', weight: 14 },
      { word: 'contratista', weight: 14 },
      { word: 'entregables', weight: 12 },
      { word: 'autonomia', weight: 14 },
      { word: 'penalidad', weight: 10 },
      { word: 'subordinacion', weight: 12 },
    ],
    defaultLegalJustification: 'Artículo 1495 y ss. del Código Civil y normas pertinentes del Código de Comercio.',
    defaultReasoning: 'Regula la contratación de servicios especializados con autonomía técnica y directiva del contratista, evitando riesgos de presunción o demandas de contrato laboral realidad.',
    keyPoints: [
      'Blindaje jurídico de autonomía e independencia sin subordinación',
      'Definición clara de entregables, cronograma y cláusula penal de incumplimiento',
      'Cláusulas accesorias de confidencialidad y cesión de derechos de autor',
    ],
  },

  // 12. ACUERDO DE CONFIDENCIALIDAD (NDA)
  {
    id: 'acuerdo_nda',
    keyPhrases: [
      { phrase: 'acuerdo de confidencialidad', weight: 48 },
      { phrase: 'acuerdo nda', weight: 48 },
      { phrase: 'no divulgacion', weight: 45 },
      { phrase: 'secreto comercial', weight: 42 },
      { phrase: 'proteger mi idea', weight: 38 },
      { phrase: 'proteger informacion confidencial', weight: 42 },
      { phrase: 'secreto empresarial', weight: 40 },
      { phrase: 'evitar que copien mi producto', weight: 35 },
      { phrase: 'proteger codigo de software', weight: 35 },
    ],
    keywords: [
      { word: 'nda', weight: 24 },
      { word: 'confidencialidad', weight: 22 },
      { word: 'divulgacion', weight: 18 },
      { word: 'secreto', weight: 18 },
      { word: 'privacidad', weight: 10 },
      { word: 'intelectual', weight: 12 },
      { word: 'inversionista', weight: 10 },
    ],
    defaultLegalJustification: 'Decisión 486 de la Comunidad Andina de Naciones (Régimen Común de Propiedad Industrial) y Ley 256 de 1996 (Competencia Desleal).',
    defaultReasoning: 'Protege legalmente información confidencial, know-how, código fuente o planes de negocio compartidos con posibles socios, contratistas o inversionistas.',
    keyPoints: [
      'Válido para esquemas unilaterales (una vía) o bilaterales (mutuo)',
      'Cláusula penal pecuniaria cuantificable por violación de reserva',
      'Vigencia definida para resguardar la propiedad intelectual',
    ],
  },

  // 13. PROPUESTA COMERCIAL / COTIZACIÓN
  {
    id: 'propuesta_servicios',
    keyPhrases: [
      { phrase: 'propuesta comercial', weight: 48 },
      { phrase: 'cotizacion de servicios', weight: 46 },
      { phrase: 'presentar propuesta', weight: 40 },
      { phrase: 'cotizar un proyecto', weight: 40 },
      { phrase: 'enviar presupuesto a cliente', weight: 38 },
      { phrase: 'fases del proyecto cotizacion', weight: 38 },
      { phrase: 'hitos de pago propuesta', weight: 38 },
      { phrase: 'oferta mercantil de servicios', weight: 42 },
    ],
    keywords: [
      { word: 'cotizacion', weight: 20 },
      { word: 'cotizar', weight: 20 },
      { word: 'propuesta', weight: 18 },
      { word: 'presupuesto', weight: 16 },
      { word: 'alcance', weight: 12 },
      { word: 'hitos', weight: 14 },
      { word: 'cronograma', weight: 12 },
      { word: 'fases', weight: 12 },
    ],
    defaultLegalJustification: 'Artículo 845 del Código de Comercio (Oferta o Propuesta de Negocio Mercantil).',
    defaultReasoning: 'Estructura una oferta formal de servicios profesionales detallando fases de ejecución, entregables técnicos, presupuesto y cronograma con validez jurídica mercantil.',
    keyPoints: [
      'Desglose estructurado de fases, semanas de entrega e hitos de pago',
      'Términos claros de validez de la oferta y exclusiones de alcance',
      'Proyecta una imagen altamente corporativa y profesional ante clientes',
    ],
  },

  // 14. CERTIFICADO LABORAL
  {
    id: 'certificado_laboral',
    keyPhrases: [
      { phrase: 'certificado laboral', weight: 48 },
      { phrase: 'constancia laboral', weight: 46 },
      { phrase: 'constancia de trabajo', weight: 45 },
      { phrase: 'solicitud de certificado laboral', weight: 48 },
      { phrase: 'carta laboral para banco', weight: 42 },
      { phrase: 'carta laboral para credito', weight: 42 },
      { phrase: 'tiempo de servicio y salario', weight: 38 },
      { phrase: 'certificar tiempo laborado', weight: 40 },
    ],
    keywords: [
      { word: 'constancia', weight: 18 },
      { word: 'certificado', weight: 18 },
      { word: 'laboral', weight: 12 },
      { word: 'salario', weight: 10 },
      { word: 'antiguedad', weight: 12 },
      { word: 'recursos', weight: 8 },
      { word: 'humanos', weight: 8 },
    ],
    defaultLegalJustification: 'Artículo 57 Numeral 7 del Código Sustantivo del Trabajo (C.S.T.).',
    defaultReasoning: 'Formaliza la solicitud del trabajador ante el empleador para la expedición obligatoria de la constancia que acredite tiempo de servicio, cargo desempeñado y sueldo devengado.',
    keyPoints: [
      'Obligación legal indelegable del empleador bajo el CST',
      'Incluye campos para constancia salarial y funciones desempeñadas',
      'Indispensable para aprobación de créditos, arriendos o trámites consulares',
    ],
  },

  // 15. PERMISO O LICENCIA LABORAL
  {
    id: 'permiso_laboral',
    keyPhrases: [
      { phrase: 'permiso laboral', weight: 48 },
      { phrase: 'licencia laboral', weight: 46 },
      { phrase: 'calamidad domestica', weight: 45 },
      { phrase: 'cita medica en horas laborales', weight: 42 },
      { phrase: 'permiso para estudiar', weight: 40 },
      { phrase: 'licencia no remunerada', weight: 42 },
      { phrase: 'permiso remunerado', weight: 40 },
      { phrase: 'ausentarme del trabajo', weight: 38 },
      { phrase: 'permiso por luto', weight: 42 },
      { phrase: 'permiso para votar', weight: 38 },
    ],
    keywords: [
      { word: 'permiso', weight: 20 },
      { word: 'licencia', weight: 18 },
      { word: 'calamidad', weight: 18 },
      { word: 'ausencia', weight: 14 },
      { word: 'medica', weight: 10 },
      { word: 'luto', weight: 14 },
      { word: 'remunerada', weight: 10 },
      { word: 'estudio', weight: 10 },
    ],
    defaultLegalJustification: 'Artículo 57 Numeral 6 del Código Sustantivo del Trabajo (C.S.T.) y Ley 1280 de 2009 (Licencia por Luto).',
    defaultReasoning: 'Sustenta la solicitud formal de permiso remunerado o no remunerado ante el empleador con base en las causales legales admitidas por la legislación laboral colombiana.',
    keyPoints: [
      'Ampara ausencias por calamidad doméstica, citas médicas o deberes cívicos',
      'Adjunta soportes probatorios para evitar sanciones disciplinarias',
      'Garantiza trazabilidad y consentimiento formal de la jefatura',
    ],
  },
];

/**
 * Analiza el texto descriptivo del usuario para sugerir el documento óptimo o la entidad competente
 */
export function analyzeCaseDescription(rawText: string): SuggestionResult {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return {
      status: 'empty',
      alternatives: [],
      queryAnalyzed: '',
    };
  }

  const normalized = normalizeText(trimmed);

  // 1. Verificar si coincide directamente con situaciones especializadas fuera de alcance (delitos, familia, policía, etc.)
  for (const outRule of OUT_OF_SCOPE_RULES) {
    const matchedTrigger = outRule.triggers.find((trigger) => normalized.includes(normalizeText(trigger)));
    if (matchedTrigger) {
      return {
        status: 'out_of_scope',
        alternatives: [],
        entityGuidance: outRule.entityGuidance,
        queryAnalyzed: trimmed,
      };
    }
  }

  // 2. Evaluar puntuación para cada uno de los 15 documentos
  const scores: {
    docId: DocumentType;
    score: number;
    rule: DocumentRule;
    customReason?: string;
  }[] = [];

  for (const rule of DOCUMENT_RULES) {
    let score = 0;

    // A. Frases clave (multi-palabra)
    for (const kp of rule.keyPhrases) {
      const normPhrase = normalizeText(kp.phrase);
      if (normalized.includes(normPhrase)) {
        score += kp.weight;
      }
    }

    // B. Palabras clave individuales con límites para evitar falsos positivos
    let wordHitCount = 0;
    for (const kw of rule.keywords) {
      const normWord = normalizeText(kw.word);
      // Comprobar coincidencia como palabra completa
      const regex = new RegExp(`\\b${normWord}\\b`, 'i');
      if (regex.test(normalized)) {
        score += kw.weight;
        wordHitCount++;
      }
    }

    // C. Evaluador de contexto específico
    let customReason: string | undefined;
    if (rule.contextEvaluator) {
      const contextEval = rule.contextEvaluator(normalized);
      score += contextEval.extraScore;
      if (contextEval.reasonCustom) {
        customReason = contextEval.reasonCustom;
      }
    }

    // Bonificación si hubo múltiples palabras clave
    if (wordHitCount >= 3) {
      score += 10;
    }

    scores.push({
      docId: rule.id,
      score,
      rule,
      customReason,
    });
  }

  // Ordenar documentos de mayor a menor puntuación
  scores.sort((a, b) => b.score - a.score);

  const top = scores[0];

  // Si la puntuación máxima es menor a un umbral mínimo, se considera sin coincidencia suficiente
  const MIN_MATCH_SCORE = 18;
  if (!top || top.score < MIN_MATCH_SCORE) {
    return {
      status: 'no_match',
      alternatives: [],
      queryAnalyzed: trimmed,
      entityGuidance: {
        entityName: 'Entidades de Asesoría Ciudadana & Defensoría',
        entityCategory: 'Orientación Legal General',
        description: 'No identificamos una plantilla contractual específica para la descripción ingresada. Si tu caso corresponde a una controversia con entidades públicas, almacenes o empleadores, un Derecho de Petición suele ser el punto de partida.',
        actionRequired: 'Prueba detallando más tu situación (ej: si se trata de un contrato, cobro, garantía, arriendo o reclamo) o acude a los canales de orientación ciudadana.',
        officialCanal: 'Consultorios Jurídicos Universitarios gratuitos o Personería Municipal.',
        canUsePetitionAsFirstStep: true,
        legalBasis: 'Artículo 23 de la Constitución Política de Colombia',
      },
    };
  }

  const topMeta = DOCUMENT_CATALOG.find((d) => d.id === top.docId);
  if (!topMeta) {
    return {
      status: 'no_match',
      alternatives: [],
      queryAnalyzed: trimmed,
    };
  }

  const confidence: 'alta' | 'media' = top.score >= 40 ? 'alta' : 'media';

  const bestMatch: SuggestedMatch = {
    document: topMeta,
    confidence,
    score: top.score,
    legalJustification: top.rule.defaultLegalJustification,
    reasoning: top.customReason || top.rule.defaultReasoning,
    keyPoints: top.rule.keyPoints,
  };

  // Buscar alternativas relevantes (score >= 20 y >= 35% del score del primero)
  const alternatives: AlternativeMatch[] = [];
  for (let i = 1; i < scores.length; i++) {
    const alt = scores[i];
    if (alt.score >= 20 && alt.score >= top.score * 0.35) {
      const altMeta = DOCUMENT_CATALOG.find((d) => d.id === alt.docId);
      if (altMeta) {
        alternatives.push({
          document: altMeta,
          score: alt.score,
          reasoning: alt.customReason || alt.rule.defaultReasoning,
        });
      }
    }
    if (alternatives.length >= 2) break; // Máximo 2 alternativas para no saturar
  }

  return {
    status: 'matched',
    bestMatch,
    alternatives,
    queryAnalyzed: trimmed,
  };
}

