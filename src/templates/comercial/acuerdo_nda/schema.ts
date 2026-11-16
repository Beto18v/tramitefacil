import { AcuerdoNdaData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'acuerdo_nda',
  title: 'Acuerdo de Confidencialidad y No Divulgación (NDA)',
  shortTitle: 'Acuerdo NDA',
  category: 'comercial',
  categoryName: 'Comercial & Contratos',
  categoryIcon: 'Handshake',
  description:
    'Pacto formal de protección de secretos comerciales, propiedad intelectual, información financiera y cláusula penal indemnizatoria.',
  iconName: 'ShieldCheck',
  lawReference: 'Decisión 486 CAN y Código de Comercio',
  tags: ['nda', 'confidencialidad', 'secreto', 'comercial', 'propiedad', 'negocios'],
  estimatedMinutes: '3 min',
  featuredTags: ['Protección de IP', 'Cláusula penal', 'Bilateral / Unilateral'],
  subfilter: 'Confidencialidad (NDA)',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: AcuerdoNdaData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  tipoNda: 'bilateral',
  nombreParteEmisora: '',
  tipoDocEmisora: 'NIT',
  numDocEmisora: '',
  domicilioEmisora: 'Bogotá D.C.',
  nombreParteReceptora: '',
  tipoDocReceptora: 'NIT',
  numDocReceptora: '',
  domicilioReceptora: 'Bogotá D.C.',
  propositoNegociacion:
    'Evaluación, diseño y posible ejecución conjunta de proyectos comerciales, tecnológicos y de desarrollo de software.',
  duracionAnos: 2,
  clausulaPenalMonto: 10000000,
  incluirExclusionesEstandar: true,
  signatureType: 'text',
};
export const sampleData: AcuerdoNdaData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  tipoNda: 'bilateral',
  nombreParteEmisora: 'INNOVACIÓN DIGITAL ANDINA S.A.S.',
  tipoDocEmisora: 'NIT',
  numDocEmisora: '901.782.345-6',
  domicilioEmisora: 'Carrera 11 # 82-01, Piso 6, Bogotá D.C.',
  nombreParteReceptora: 'CLOUD SYSTEMS COLOMBIA LTDA.',
  tipoDocReceptora: 'NIT',
  numDocReceptora: '830.554.219-8',
  domicilioReceptora: 'Calle 100 # 19A-40, Bogotá D.C.',
  propositoNegociacion:
    'Evaluación de sinergias para el desarrollo conjunto de una plataforma de pasarela de pagos fintech y exploración de integración de código fuente propietario.',
  duracionAnos: 3,
  clausulaPenalMonto: 50000000,
  incluirExclusionesEstandar: true,
  signatureType: 'text',
};

