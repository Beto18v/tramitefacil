import { ContratoPrestacionData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'contrato_prestacion',
  title: 'Contrato de Prestación de Servicios Profesionales',
  shortTitle: 'Contrato de Servicios',
  category: 'comercial',
  categoryName: 'Comercial & Contratos',
  categoryIcon: 'Handshake',
  description:
    'Contrato civil y comercial con autonomía técnica, sin subordinación, con interruptores de confidencialidad y cláusula penal.',
  iconName: 'ScrollText',
  lawReference: 'Código Civil (Art. 1495) y Código de Comercio',
  tags: ['contrato', 'servicios', 'independiente', 'prestación', 'honorarios', 'autonomía', 'nda'],
  estimatedMinutes: '4 min',
  featuredTags: ['Sin subordinación', 'Cláusula penal', 'Confidencialidad'],
  subfilter: 'Contratos',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: ContratoPrestacionData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  nombreContratante: '',
  tipoDocContratante: 'NIT',
  numDocContratante: '',
  domicilioContratante: '',
  nombreContratista: '',
  tipoDocContratista: 'Cédula de Ciudadanía',
  numDocContratista: '',
  domicilioContratista: '',
  objetoContrato: '',
  obligacionesContratista: [
    'Ejecutar las labores con plena autonomía técnica y directiva.',
    'Presentar informes de avance periódicos según los requerimientos.',
    'Acreditar el pago oportuno de aportes a seguridad social integral.',
  ],
  valorContrato: 0,
  formaPago: 'Pagos mensuales contra presentación de cuenta de cobro y soportes de seguridad social.',
  fechaInicio: TODAY,
  fechaTerminacion: '',
  lugarEjecucion: 'En las instalaciones del contratista y/o de manera remota.',
  clausulaIndependencia: true,
  incluirConfidencialidad: true,
  clausulaPenalMonto: 0,
  signatureType: 'text',
};
export const sampleData: ContratoPrestacionData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  nombreContratante: 'GLOBAL MEDIA LAB S.A.S.',
  tipoDocContratante: 'NIT',
  numDocContratante: '900.876.543-1',
  domicilioContratante: 'Calle 93B # 13-45, Oficina 501, Bogotá D.C.',
  nombreContratista: 'Alejandro Vargas Céspedes',
  tipoDocContratista: 'Cédula de Ciudadanía',
  numDocContratista: '79.889.445',
  domicilioContratista: 'Carrera 19 # 104-32, Bogotá D.C.',
  objetoContrato:
    'El CONTRATISTA se obliga para con el CONTRATANTE a prestar de forma autónoma e independiente sus servicios profesionales como Director Creativo Audiovisual y Diseñador de Campañas Digitales.',
  obligacionesContratista: [
    'Planear, dirigir y entregar el paquete mensual de piezas publicitarias acordadas.',
    'Garantizar la originalidad de los entregables y la cesión patrimonial de derechos de autor.',
    'Cumplir estrictamente con los plazos pactados para cada lanzamiento publicitario.',
    'Aportar sus propios equipos de cómputo, software de diseño y herramientas de producción.',
    'Acreditar mensualmente sus aportes al Sistema de Seguridad Social Integral.',
  ],
  valorContrato: 18000000,
  formaPago: 'Seis (6) cuotas mensuales consecutivas de $3.000.000 cada una, pagaderas dentro de los primeros cinco (5) días de cada mes.',
  fechaInicio: TODAY,
  fechaTerminacion: '2027-04-30',
  lugarEjecucion: 'Bogotá D.C., bajo modalidad no presencial (remota).',
  clausulaIndependencia: true,
  incluirConfidencialidad: true,
  clausulaPenalMonto: 3600000,
  signatureType: 'text',
};

