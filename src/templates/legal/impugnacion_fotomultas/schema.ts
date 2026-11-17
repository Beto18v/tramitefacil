import { ImpugnacionFotomultasData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'impugnacion_fotomultas',
  title: 'Impugnación de Fotodetección y Fotomultas',
  shortTitle: 'Impugnación Fotomulta',
  category: 'legal',
  categoryName: 'Trámites Administrativos',
  categoryIcon: 'Scale',
  description:
    'Derecho de petición y recurso de impugnación de comparendo por fotodetección exigiendo plena prueba de identificación del conductor y debido proceso.',
  iconName: 'ShieldAlert',
  lawReference: 'Sentencias C-038/20, C-321/22 y Ley 1843 de 2017',
  tags: ['fotomulta', 'tránsito', 'fotodetección', 'impugnación', 'comparendo', 'c-038', 'multa'],
  estimatedMinutes: '4 min',
  featuredTags: ['Sentencia C-038/20', 'Identificación del Conductor', 'Ley 1843 de 2017'],
  subfilter: 'Peticiones',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: ImpugnacionFotomultasData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  organismoTransito: 'Secretaría Distrital de Movilidad de Bogotá',
  ciudadEntidad: 'Bogotá D.C.',
  nombreSolicitante: '',
  tipoDocSolicitante: 'Cédula de Ciudadanía',
  numDocSolicitante: '',
  expedicionSolicitante: 'Bogotá D.C.',
  direccionNotificacion: '',
  ciudadNotificacion: 'Bogotá D.C.',
  telefonoSolicitante: '',
  correoNotificacion: '',
  calidadSolicitante: 'propietario',
  numeroComparendo: '',
  fechaComparendo: '',
  horaComparendo: '14:30',
  placaVehiculo: '',
  lugarInfraccion: '',
  codigoInfraccion: 'C.29 (Conducir a velocidad superior a la permitida)',
  descripcionInfraccion: 'Presunto exceso de velocidad detectado por medio tecnológico.',
  causalFaltaIdentificacion: true,
  causalFaltaNotificacion: false,
  causalCalibracionSenalizacion: false,
  hechosAdicionales:
    'El suscrito peticionario no conducía el vehículo automotor en el momento y lugar indicados en el comparendo. En el registro fotográfico adjunto al comparendo no es posible identificar plenamente al conductor, vulnerando el principio constitucional de responsabilidad subjetiva en materia sancionatoria.',
  solicitaExoneracion: true,
  solicitaArchivoComparendo: true,
  solicitaPruebaTecnica: true,
  peticionesAdicionales: '',
  anexos:
    '1. Copia de la cédula de ciudadanía del peticionario.\n2. Copia de la licencia de tránsito del vehículo.\n3. Copia o consulta del comparendo objeto de impugnación.',
  signatureType: 'text',
};

export const sampleData: ImpugnacionFotomultasData = {
  ciudad: 'Medellín',
  fecha: TODAY,
  organismoTransito: 'Secretaría de Movilidad de Medellín',
  ciudadEntidad: 'Medellín',
  nombreSolicitante: 'Jorge Enrique Betancur Morales',
  tipoDocSolicitante: 'Cédula de Ciudadanía',
  numDocSolicitante: '70.892.451',
  expedicionSolicitante: 'Medellín',
  direccionNotificacion: 'Circular 4 # 71-45, Barrio Laureles',
  ciudadNotificacion: 'Medellín',
  telefonoSolicitante: '+57 312 456 7890',
  correoNotificacion: 'jorge.betancur@ejemplo.com',
  calidadSolicitante: 'propietario',
  numeroComparendo: '05001000000034567891',
  fechaComparendo: '2026-10-15',
  horaComparendo: '08:45 AM',
  placaVehiculo: 'HQX 452',
  lugarInfraccion: 'Autopista Sur con Calle 10, Sentido Norte - Sur',
  codigoInfraccion: 'C.29 (Conducir a velocidad superior a la permitida)',
  descripcionInfraccion: 'Detección por sistema automático de velocidad sobre carril oriental.',
  causalFaltaIdentificacion: true,
  causalFaltaNotificacion: true,
  causalCalibracionSenalizacion: false,
  hechosAdicionales:
    '1. En la fecha y hora de la presunta infracción yo no conducía el automotor; las imágenes captadas por la cámara automática no permiten individualizar ni identificar al conductor del rodante.\n2. La notificación por correo certificado fue entregada con más de veinte días hábiles de posterioridad a la validación, excediendo ampliamente el término perentorio de tres (3) días hábiles fijado por el artículo 8 de la Ley 1843 de 2017.',
  solicitaExoneracion: true,
  solicitaArchivoComparendo: true,
  solicitaPruebaTecnica: true,
  peticionesAdicionales:
    'Solicito la abstención inmediata de cualquier cobro coactivo, reporte sancionatorio en el SIMIT o imposición de cobro de intereses moratorios mientras se resuelve de fondo esta impugnación.',
  anexos:
    '1. Copia de la cédula de ciudadanía del solicitante.\n2. Copia de la tarjeta de propiedad del automotor de placa HQX 452.\n3. Copia de la guía de envío de la empresa de mensajería con la fecha efectiva de entrega.',
  signatureType: 'text',
};
