import { PazYSalvoData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'paz_y_salvo',
  title: 'Certificado de Paz y Salvo General',
  shortTitle: 'Paz y Salvo General',
  category: 'comercial',
  categoryName: 'Comercial & Contratos',
  categoryIcon: 'Handshake',
  description:
    'Certificación formal e irrevocable de extinción total de obligaciones dinerarias, contractuales, laborales o de entrega de bienes.',
  iconName: 'ClipboardCheck',
  lawReference: 'Código Civil Colombiano (Art. 1625 y concordantes)',
  tags: [
    'paz y salvo',
    'finiquito',
    'deuda saldada',
    'cumplimiento',
    'contrato',
    'comercial',
    'liquidacion',
    'obligacion',
    'constancia',
  ],
  estimatedMinutes: '3 min',
  featuredTags: [
    'Extinción de obligaciones Art. 1625',
    'Liberación total de pasivos',
    'Aplicación universal',
  ],
  subfilter: 'Constancias',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: PazYSalvoData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  numeroCertificado: 'PYS-001',

  // Emisor
  nombreEmisor: '',
  tipoDocEmisor: 'NIT',
  numDocEmisor: '',
  calidadEmisor: 'empresa',
  cargoEmisor: 'Representante Legal',
  telefonoEmisor: '',
  correoEmisor: '',
  direccionEmisor: '',

  // Beneficiario
  nombreBeneficiario: '',
  tipoDocBeneficiario: 'C.C.',
  numDocBeneficiario: '',
  calidadBeneficiario: 'Contratista / Beneficiario',

  // Concepto
  tipoConcepto: 'contrato_servicios',
  conceptoPersonalizado: '',
  referenciaContrato: 'Contrato de Servicios N° 001',
  fechaAcuerdoOriginal: TODAY,
  montoTotalSaldado: 0,
  montoLetras: '',
  detalleCumplimiento:
    'Cumplimiento integral a entera satisfacción de todos los entregables, actas de liquidación y pagos convenidos sin ninguna reserva.',

  // Declaración formal
  declaracionTexto:
    'Por medio del presente documento, certificamos que el beneficiario se encuentra a la fecha a PAZ Y SALVO total y definitivo por todo concepto derivado del vínculo contractual y comercial que nos unió, no existiendo saldos pendientes, reclamaciones ni obligaciones por cumplir.',
  renunciaAcciones: true,
  incluyeNotaAclaratoria: false,
  notaAclaratoria: '',

  // Firma
  signatureType: 'text',
};

export const sampleData: PazYSalvoData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  numeroCertificado: 'PYS-2026-142',

  // Emisor
  nombreEmisor: 'SOLUCIONES DIGITALES COLOMBIA S.A.S.',
  tipoDocEmisor: 'NIT',
  numDocEmisor: '901.834.120-5',
  calidadEmisor: 'contratante',
  cargoEmisor: 'Gerente General y Representante Legal',
  telefonoEmisor: '(601) 745 8920',
  correoEmisor: 'administracion@solucionesdigitales.co',
  direccionEmisor: 'Carrera 7 # 71-21, Torre B, Piso 12, Bogotá D.C.',

  // Beneficiario
  nombreBeneficiario: 'ANDRÉS FELIPE SALAZAR RAMÍREZ',
  tipoDocBeneficiario: 'C.C.',
  numDocBeneficiario: '1.020.765.432',
  calidadBeneficiario: 'Contratista Independiente de Desarrollo Web',

  // Concepto
  tipoConcepto: 'contrato_servicios',
  conceptoPersonalizado: 'Diseño e implementación de pasarela de pagos y módulo de facturación',
  referenciaContrato: 'Contrato de Prestación de Servicios N° CS-2025-089',
  fechaAcuerdoOriginal: '2025-06-15',
  montoTotalSaldado: 18500000,
  montoLetras: 'DIECIOCHO MILLONES QUINIENTOS MIL PESOS M/CTE.',
  detalleCumplimiento:
    'Entrega satisfactoria de la totalidad del código fuente, documentación de despliegue y soporte post-lanzamiento, habiéndose cancelado la totalidad de los honorarios pactados.',

  // Declaración formal
  declaracionTexto:
    'Por medio del presente documento, certificamos de manera libre y voluntaria que ANDRÉS FELIPE SALAZAR RAMÍREZ se encuentra a la fecha a PAZ Y SALVO total y definitivo por todo concepto derivado del Contrato de Prestación de Servicios N° CS-2025-089. No existe a la fecha saldo insoluto, penalidad ni reclamación económica o técnica pendiente de ninguna naturaleza.',
  renunciaAcciones: true,
  incluyeNotaAclaratoria: true,
  notaAclaratoria:
    'Este paz y salvo extingue cualquier responsabilidad recíproca con arreglo a lo dispuesto en el Artículo 1625 del Código Civil colombiano.',

  // Firma
  signatureType: 'text',
};
