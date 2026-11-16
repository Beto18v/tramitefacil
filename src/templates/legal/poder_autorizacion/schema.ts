import { PoderAutorizacionData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'poder_autorizacion',
  title: 'Poder Especial / Autorización Amplia a Terceros',
  shortTitle: 'Poder Especial / Autorización',
  category: 'legal',
  categoryName: 'Trámites Administrativos',
  categoryIcon: 'Scale',
  description:
    'Mandato con facultades expresas de radicación, firma y retiro, incluyendo espacio para firma y recuadro de huella dactilar.',
  iconName: 'Fingerprint',
  lawReference: 'Art. 2142 y ss. Código Civil y C.G.P.',
  tags: ['poder', 'autorización', 'trámite', 'tercero', 'huella', 'diligencia'],
  estimatedMinutes: '2 min',
  featuredTags: ['Facultades expresas', 'Huella dactilar', 'Código Civil'],
  subfilter: 'Poderes',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: PoderAutorizacionData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  nombreOtorgante: '',
  tipoDocOtorgante: 'Cédula de Ciudadanía',
  numDocOtorgante: '',
  expedicionOtorgante: 'Bogotá D.C.',
  domicilioOtorgante: '',
  telefonoOtorgante: '',
  nombreApoderado: '',
  tipoDocApoderado: 'Cédula de Ciudadanía',
  numDocApoderado: '',
  expedicionApoderado: 'Bogotá D.C.',
  telefonoApoderado: '',
  entidadTramite: '',
  objetoAutorizacion: '',
  facultadesEspecificas: [
    'Radicar formularios oficiales y solicitudes ante la entidad.',
    'Presentar y cotejar documentos de identidad y soportes.',
    'Notificarse formalmente de actos administrativos y resoluciones.',
    'Firmar actas de entrega, constancias y paz y salvos.',
    'Reclamar documentos originales, tarjetas y certificados finales.',
  ],
  vigenciaTexto: 'El presente poder especial tiene vigencia por treinta (30) días calendario contados a partir de su firma.',
  incluirRecuadroHuella: true,
  notaLegal:
    'El otorgante manifiesta que el apoderado cuenta con plenas facultades para culminar el trámite en mención sin limitación alguna.',
  signatureType: 'text',
};
export const sampleData: PoderAutorizacionData = {
  ciudad: 'Cali',
  fecha: TODAY,
  nombreOtorgante: 'Gloria Patricia Valencia Quintero',
  tipoDocOtorgante: 'Cédula de Ciudadanía',
  numDocOtorgante: '31.954.882',
  expedicionOtorgante: 'Cali (Valle del Cauca)',
  domicilioOtorgante: 'Avenida 6N # 28N-34, Cali',
  telefonoOtorgante: '+57 315 784 2200',
  nombreApoderado: 'Sebastián Morales Valencia',
  tipoDocApoderado: 'Cédula de Ciudadanía',
  numDocApoderado: '1.144.189.650',
  expedicionApoderado: 'Cali (Valle del Cauca)',
  telefonoApoderado: '+57 318 632 9911',
  entidadTramite: 'Secretaría de Movilidad y Tránsito de Cali / Centro Integral de Servicios',
  objetoAutorizacion:
    'Realizar en mi nombre y representación todas las gestiones administrativas necesarias para el trámite de levantamiento de prenda, traspaso y retiro de placas del vehículo automotor de mi propiedad, identificado con placa ABC-123 y número de chasis 9BFZZZ44512.',
  facultadesEspecificas: [
    'Radicar formularios oficiales de solicitud de trámite vehicular.',
    'Presentar y cotejar documentos de identidad, SOAT y revisión técnico-mecánica.',
    'Firmar actas de recepción, liquidaciones de derechos de tránsito y formularios de traspaso.',
    'Reclamar la nueva Licencia de Tránsito (tarjeta de propiedad) y constancias definitivas.',
  ],
  vigenciaTexto:
    'El presente poder especial tiene carácter específico y una vigencia improrrogable de sesenta (60) días calendario contados a partir de la fecha de su expedición.',
  incluirRecuadroHuella: true,
  notaLegal:
    'El poderdante y el apoderado reconocen expresamente la veracidad de los datos consignados y asumen la responsabilidad legal derivada del mandato otorgado de conformidad con la ley.',
  signatureType: 'text',
};

