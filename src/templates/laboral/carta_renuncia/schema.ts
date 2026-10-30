import { CartaRenunciaData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'carta_renuncia',
  title: 'Carta de Renuncia Laboral con Preaviso',
  shortTitle: 'Carta de Renuncia',
  category: 'laboral',
  categoryName: 'Laboral & Talento Humano',
  categoryIcon: 'Building2',
  description:
    'Carta de renuncia formal con switch de exoneración de preaviso legal, selector de motivos jurídicos rápidos y solicitud de liquidación.',
  iconName: 'UserMinus',
  lawReference: 'Código Sustantivo del Trabajo (C.S.T.)',
  tags: ['renuncia', 'retiro', 'trabajo', 'empleo', 'preaviso', 'liquidación', 'cst'],
  estimatedMinutes: '1 min',
  featuredTags: ['Exoneración preaviso', 'Liquidación de ley', 'CST'],
  subfilter: 'Renuncias',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: CartaRenunciaData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  nombreEmpresa: '',
  nombreDestinatario: '',
  cargoDestinatario: 'Gerente de Gestión Humana',
  departamento: 'Recursos Humanos',
  nombreTrabajador: '',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '',
  cargoTrabajador: '',
  fechaIngreso: '',
  ultimoDiaLaboral: '',
  solicitaExoneracionPreaviso: false,
  motivoCategoria: 'nuevos_retos',
  motivoDetalle: 'He tomado la decisión voluntaria de culminar mi relación laboral con el objetivo de asumir nuevos retos y proyectos profesionales.',
  ofrecimientoEmpalme: true,
  solicitudLiquidacion: true,
  parrafoAgradecimiento:
    'Agradezco sinceramente las oportunidades de aprendizaje y el apoyo brindado por la dirección y por mis compañeros durante el tiempo que formé parte de la organización.',
  signatureType: 'text',
};
export const sampleData: CartaRenunciaData = {
  ciudad: 'Barranquilla',
  fecha: TODAY,
  nombreEmpresa: 'DISTRIBUCIONES DEL CARIBE S.A.',
  nombreDestinatario: 'Dra. Patricia Arrázola Montes',
  cargoDestinatario: 'Directora de Talento Humano',
  departamento: 'Dirección Comercial',
  nombreTrabajador: 'David Fernando Gómez Cantillo',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '1.045.789.234',
  cargoTrabajador: 'Coordinador de Cuentas Corporativas',
  fechaIngreso: '2022-03-15',
  ultimoDiaLaboral: '2026-11-15',
  solicitaExoneracionPreaviso: true,
  motivoCategoria: 'nuevos_retos',
  motivoDetalle:
    'He aceptado una propuesta laboral en el sector de tecnología internacional que representa un paso significativo en mi plan de carrera profesional.',
  ofrecimientoEmpalme: true,
  solicitudLiquidacion: true,
  parrafoAgradecimiento:
    'Agradezco profundamente la confianza, el respeto y las invaluables oportunidades de crecimiento humano y profesional que me fueron concedidas a lo largo de estos más de 4 años en la empresa.',
  signatureType: 'text',
};

