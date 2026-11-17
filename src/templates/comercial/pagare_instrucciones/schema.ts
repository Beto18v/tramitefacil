import { PagareInstruccionesData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'pagare_instrucciones',
  title: 'Pagaré con Carta de Instrucciones',
  shortTitle: 'Pagaré con Instrucciones',
  category: 'comercial',
  categoryName: 'Comercial & Contratos',
  categoryIcon: 'Handshake',
  description:
    'Título valor ejecutivo para respaldo de créditos y deudas, con carta de instrucciones expresa conforme al Código de Comercio.',
  iconName: 'Receipt',
  lawReference: 'Código de Comercio (Arts. 622 y 709 a 711)',
  tags: [
    'pagare',
    'carta de instrucciones',
    'deuda',
    'titulo valor',
    'credito',
    'codeudor',
    'prestamo',
    'superfinanciera',
  ],
  estimatedMinutes: '4 min',
  featuredTags: [
    'Título valor ejecutivo',
    'Carta de instrucciones Art. 622',
    'Cláusula de aceleración',
  ],
  subfilter: 'Contratos',
};

const TODAY = new Date().toISOString().split('T')[0];
const nextYearDate = new Date();
nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
const NEXT_YEAR = nextYearDate.toISOString().split('T')[0];

export const defaultData: PagareInstruccionesData = {
  numeroPagare: '001',
  ciudad: 'Bogotá D.C.',
  fechaSuscripcion: TODAY,
  tipoVencimiento: 'fecha_fija',
  fechaVencimiento: NEXT_YEAR,

  // Acreedor
  nombreAcreedor: '',
  tipoDocAcreedor: 'NIT',
  numDocAcreedor: '',
  ciudadAcreedor: 'Bogotá D.C.',

  // Deudor
  nombreDeudor: '',
  tipoDocDeudor: 'C.C.',
  numDocDeudor: '',
  direccionDeudor: '',
  ciudadDeudor: 'Bogotá D.C.',
  telefonoDeudor: '',
  correoDeudor: '',

  // Codeudor
  incluirCodeudor: true,
  nombreCodeudor: '',
  tipoDocCodeudor: 'C.C.',
  numDocCodeudor: '',
  direccionCodeudor: '',
  ciudadCodeudor: 'Bogotá D.C.',
  telefonoCodeudor: '',
  correoCodeudor: '',

  // Capital e intereses
  capital: 10000000,
  capitalLetras: 'DIEZ MILLONES DE PESOS M/CTE.',
  tasaInteresCorrienteMensual: 1.5,
  tasaInteresMora:
    'Tasa máxima legal permitida certificada por la Superintendencia Financiera de Colombia',
  clausulaAceleracion: true,
  renunciaRequerimientos: true,

  // Carta de instrucciones
  incluirCartaInstrucciones: true,
  objetoCredito: 'Respaldo de obligación crediticia y financiamiento comercial',
  instruccionesLlenado:
    'Autorizamos expresa e irrevocablemente al acreedor o legítimo tenedor para llenar los espacios en blanco del pagaré adjunto de conformidad con el Art. 622 del Código de Comercio, incorporando el saldo total insoluto de capital, los intereses corrientes causados y los intereses moratorios liquidados a la tasa máxima legal permitida, fijando como fecha de vencimiento el día en que se efectúe el llenado.',
  eventoExigibilidad:
    'Mora o retraso en el pago de cualquiera de las cuotas o del capital, liquidación, o incumplimiento sobreviniente de cualquier obligación a cargo del deudor.',

  // Huella y firma
  incluirHuella: true,
  signatureType: 'text',
};

export const sampleData: PagareInstruccionesData = {
  numeroPagare: 'PG-2026-084',
  ciudad: 'Medellín',
  fechaSuscripcion: TODAY,
  tipoVencimiento: 'fecha_fija',
  fechaVencimiento: NEXT_YEAR,

  // Acreedor
  nombreAcreedor: 'INVERSIONES & CRÉDITO DE OCCIDENTE S.A.S.',
  tipoDocAcreedor: 'NIT',
  numDocAcreedor: '901.654.321-8',
  ciudadAcreedor: 'Medellín',

  // Deudor
  nombreDeudor: 'CARLOS ALBERTO RESTREPO MONTOYA',
  tipoDocDeudor: 'C.C.',
  numDocDeudor: '71.284.950',
  direccionDeudor: 'Calle 10 # 43E-22, Apto 502, El Poblado',
  ciudadDeudor: 'Medellín',
  telefonoDeudor: '315 892 4410',
  correoDeudor: 'carlos.restrepo.m@gmail.com',

  // Codeudor
  incluirCodeudor: true,
  nombreCodeudor: 'LUZ MARINA GIRALDO MEJÍA',
  tipoDocCodeudor: 'C.C.',
  numDocCodeudor: '43.918.420',
  direccionCodeudor: 'Carrera 76 # 32-15, Laureles',
  ciudadCodeudor: 'Medellín',
  telefonoCodeudor: '300 456 7812',
  correoCodeudor: 'luz.giraldo@outlook.com',

  // Capital e intereses
  capital: 25000000,
  capitalLetras: 'VEINTICINCO MILLONES DE PESOS M/CTE.',
  tasaInteresCorrienteMensual: 1.8,
  tasaInteresMora:
    'Tasa máxima legal permitida certificada por la Superintendencia Financiera de Colombia',
  clausulaAceleracion: true,
  renunciaRequerimientos: true,

  // Carta de instrucciones
  incluirCartaInstrucciones: true,
  objetoCredito: 'Financiamiento de adquisición de maquinaria industrial y capital operativo',
  instruccionesLlenado:
    'Autorizamos expresa e irrevocablemente al acreedor o legítimo tenedor para llenar los espacios en blanco del pagaré N° PG-2026-084 conforme al Art. 622 del Código de Comercio: a) La fecha de vencimiento será la fecha en que el acreedor declare extinguido el plazo; b) La suma a cobrar corresponderá al capital adeudado más los intereses corrientes y moratorios liquidados a la tasa máxima certificada por la Superfinanciera.',
  eventoExigibilidad:
    'El no pago oportuno de una o más cuotas periódicas, el embargo de bienes del deudor o codeudor, o cualquier proceso judicial o concursal de insolvencia.',

  // Huella y firma
  incluirHuella: true,
  signatureType: 'text',
};
