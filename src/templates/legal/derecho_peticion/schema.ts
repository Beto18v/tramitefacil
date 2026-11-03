import { DerechoPeticionData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'derecho_peticion',
  title: 'Derecho de Petición Estándar Multilínea',
  shortTitle: 'Derecho de Petición',
  category: 'legal',
  categoryName: 'Trámites Ciudadanos & Legales',
  categoryIcon: 'Scale',
  description:
    'Petición formal basada en el Art. 23 de la Constitución con lista dinámica de hechos y pretensiones numeradas para salud, bancos o servicios.',
  iconName: 'FileText',
  lawReference: 'Artículo 23 Constitución Política y Ley 1755 de 2015',
  tags: ['petición', 'reclamo', 'eps', 'banco', 'salud', 'pqrs', 'ley 1755', 'hechos'],
  estimatedMinutes: '3 min',
  featuredTags: ['Hechos dinámicos', 'Término 15 días', 'Art. 23 C.P.'],
  subfilter: 'Peticiones',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: DerechoPeticionData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  tipoEntidad: 'Salud / EPS',
  entidadDestinataria: '',
  dependenciaDestinataria: 'Oficina de Atención al Usuario / PQRS',
  cargoDestinatario: 'Director o Representante Legal',
  direccionEntidad: '',
  correoEntidad: '',
  nombrePeticionario: '',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '',
  lugarExpedicion: 'Bogotá D.C.',
  telefono: '',
  correo: '',
  direccionNotificacion: '',
  ciudadNotificacion: 'Bogotá D.C.',
  asunto: 'Derecho de Petición en interés particular (Artículo 23 Constitución Política)',
  referencia: '',
  hechos: [
    'Me encuentro formalmente afiliado a la entidad destinataria en calidad de usuario / titular.',
    'En fecha reciente presenté solicitud previa o requerimiento formal sin haber recibido respuesta de fondo.',
  ],
  pretensiones: [
    'PRIMERA: Se dé respuesta clara, precisa, congruente y de fondo a la presente solicitud dentro del término legal improrrogable.',
    'SEGUNDA: Se me remita copia digital de los soportes y resoluciones adoptadas al correo electrónico de notificación.',
  ],
  fundamentosDerecho:
    'Fundamento la presente petición en el Artículo 23 de la Constitución Política de Colombia, los artículos 13 y siguientes de la Ley 1755 de 2015, y la jurisprudencia unificada de la Corte Constitucional sobre el derecho fundamental de petición.',
  anexos: ['Copia de la Cédula de Ciudadanía del peticionario.', 'Copia de soportes médicos o recibos de pago.'],
  plazoRespuestaDias: 15,
  signatureType: 'text',
};
export const sampleData: DerechoPeticionData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  tipoEntidad: 'Salud / EPS',
  entidadDestinataria: 'NUEVA EPS S.A. / DIRECCIÓN NACIONAL DE AUTORIZACIONES',
  dependenciaDestinataria: 'Gerencia Médica y Comité Técnico-Científico',
  cargoDestinatario: 'Director de Prestación de Servicios de Salud',
  direccionEntidad: 'Carrera 85K # 46A-66, Bogotá D.C.',
  correoEntidad: 'notificacionesjudiciales@nuevaeps.com.co',
  nombrePeticionario: 'Esperanza Duarte de Martínez',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '41.567.890',
  lugarExpedicion: 'Bogotá D.C.',
  telefono: '+57 316 456 7812',
  correo: 'esperanza.duarte@email.com',
  direccionNotificacion: 'Diagonal 45 Sur # 16C-22, Bogotá D.C.',
  ciudadNotificacion: 'Bogotá D.C.',
  asunto: 'DERECHO DE PETICIÓN URGENTE - AUTORIZACIÓN Y ENTREGA INMEDIATA DE MEDICAMENTO VITAL NO POS',
  referencia: 'Afiliada N° 41567890 / Historia Clínica N° 2026-HC-441',
  hechos: [
    'Soy una persona de 68 años de edad, diagnosticada con Hipertensión Pulmonar Severa Grado III, condición médica que compromete directamente mi función cardiorrespiratoria.',
    'Con fecha 12 de septiembre de 2026, mi médico tratante adscrito a su red hospitalaria prescribió con carácter urgente el medicamento Bosentán 125mg para tratamiento continuo.',
    'Habiendo transcurrido más de cuarenta y cinco (45) días calendario desde la radicación de la orden médica, la farmacia dispensadora adscrita manifiesta no tener disponibilidad de inventario.',
    'La suspensión del suministro médico pone en riesgo inminente mi integridad física y viola de manera directa mi derecho fundamental a la salud y a la vida digna.',
  ],
  pretensiones: [
    'PRIMERA: Se ordene la autorización inmediata y la entrega efectiva del medicamento Bosentán 125mg prescrito por mi médico tratante en un plazo no superior a 48 horas.',
    'SEGUNDA: Se garantice el suministro continuo y mensual del tratamiento sin someter a la suscrita a trámites administrativos desproporcionados.',
    'TERCERA: Se me informe por escrito el punto de dispensación habilitado y la fecha exacta en la que puedo reclamar el medicamento.',
  ],
  fundamentosDerecho:
    'Fundamento la presente petición en el Artículo 23 de la Constitución Política, la Ley Estatutaria de Salud 1751 de 2015, y la reiterada jurisprudencia de la Corte Constitucional (Sentencia T-760 de 2008).',
  anexos: [
    'Copia de la Cédula de Ciudadanía.',
    'Copia de la fórmula médica y orden de servicio N° 98451.',
    'Copia de la Historia Clínica resumida con el diagnóstico médico.',
  ],
  plazoRespuestaDias: 15,
  signatureType: 'text',
};

