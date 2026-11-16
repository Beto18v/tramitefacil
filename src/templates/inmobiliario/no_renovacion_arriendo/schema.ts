import { NoRenovacionArriendoData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'no_renovacion_arriendo',
  title: 'Notificación de No Renovación de Arrendamiento',
  shortTitle: 'No Renovación Arriendo',
  category: 'inmobiliario',
  categoryName: 'Inmobiliario & Arriendos',
  categoryIcon: 'Home',
  description:
    'Aviso formal con preaviso legal de 3 meses para terminación o no prórroga de contrato de arrendamiento sin penalidad.',
  iconName: 'Home',
  lawReference: 'Ley 820 de 2003 (Régimen de Arrendamiento)',
  tags: ['arriendo', 'terminación', 'inmueble', 'desalojo', 'preaviso', 'casa'],
  estimatedMinutes: '2 min',
  featuredTags: ['Preaviso 3 meses', 'Ley 820 de 2003', 'Sin penalidad'],
  subfilter: 'Terminación',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: NoRenovacionArriendoData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  rolRemitente: 'arrendatario',
  nombreRemitente: '',
  tipoDocRemitente: 'Cédula de Ciudadanía',
  numDocRemitente: '',
  telefonoRemitente: '',
  correoRemitente: '',
  nombreDestinatario: '',
  tipoDocDestinatario: 'Cédula de Ciudadanía',
  numDocDestinatario: '',
  direccionNotificacion: '',
  direccionInmueble: '',
  ciudadInmueble: 'Bogotá D.C.',
  matriculaInmobiliaria: '',
  fechaContrato: '',
  fechaEntregaInmueble: '',
  horaEntrega: '10:00 AM',
  causalInvocada: 'Vencimiento natural del plazo pactado sin intención de prórroga',
  detalleCausal:
    'En estricto cumplimiento de la cláusula de preaviso y del artículo 24 de la Ley 820 de 2003, notifico formalmente que no es mi voluntad renovar el contrato de arrendamiento.',
  instruccionesPazSalvo:
    'El inmueble será restituido a paz y salvo por concepto de cánones, cuotas de administración y con las últimas lecturas de servicios públicos domiciliarios canceladas.',
  restitucionDeposito: true,
  signatureType: 'text',
};
export const sampleData: NoRenovacionArriendoData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  rolRemitente: 'arrendatario',
  nombreRemitente: 'Marcela Viviana Cárdenas Rojas',
  tipoDocRemitente: 'Cédula de Ciudadanía',
  numDocRemitente: '52.789.340',
  telefonoRemitente: '+57 311 234 5678',
  correoRemitente: 'marcela.cardenas@email.com',
  nombreDestinatario: 'Dr. Hernando Pardo Umaña',
  tipoDocDestinatario: 'Cédula de Ciudadanía',
  numDocDestinatario: '19.456.782',
  direccionNotificacion: 'Calle 140 # 11-45, Torre 2, Apto 804, Bogotá D.C.',
  direccionInmueble: 'Apartamento 804, Edificio Los Rosales, Calle 140 # 11-45',
  ciudadInmueble: 'Bogotá D.C.',
  matriculaInmobiliaria: '50C-1894523',
  fechaContrato: '2023-12-01',
  fechaEntregaInmueble: '2026-12-01',
  horaEntrega: '09:00 AM',
  causalInvocada: 'Vencimiento natural del término contractual sin interés de prórroga',
  detalleCausal:
    'Dando estricto cumplimiento a la cláusula décima primera del contrato de arrendamiento y al artículo 24 numeral 5 de la Ley 820 de 2003, informo con más de tres (3) meses de anticipación que no renovaré el contrato celebrado sobre el inmueble.',
  instruccionesPazSalvo:
    'Entregaré el inmueble totalmente desocupado, pintado en color blanco hueso según inventario inicial, a paz y salvo con la administración y con las constancias de pago de Enel, Acueducto y Vanti.',
  restitucionDeposito: true,
  signatureType: 'text',
};

