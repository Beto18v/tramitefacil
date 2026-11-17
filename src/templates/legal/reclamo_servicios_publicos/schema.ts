import { ReclamoServiciosPublicosData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'reclamo_servicios_publicos',
  title: 'Reclamo y Derecho de Petición por Servicios Públicos',
  shortTitle: 'Reclamo Servicios Públicos',
  category: 'legal',
  categoryName: 'Trámites Administrativos',
  categoryIcon: 'Scale',
  description:
    'Reclamo formal y derecho de petición ante empresas de servicios públicos por cobros excesivos, desviación de consumo o cobros no autorizados.',
  iconName: 'Scale',
  lawReference: 'Ley 142 de 1994 (Arts. 149, 154 y 155)',
  tags: [
    'servicios públicos',
    'epm',
    'enel',
    'acueducto',
    'vanti',
    'desviación significativa',
    'factura',
    'reclamo',
  ],
  estimatedMinutes: '3 min',
  featuredTags: ['Ley 142 de 1994', 'Desviación Significativa', 'No Suspensión Art. 155'],
  subfilter: 'Peticiones',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: ReclamoServiciosPublicosData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  empresaServicios: 'Enel Colombia S.A. E.S.P.',
  ciudadEmpresa: 'Bogotá D.C.',
  tipoServicio: 'energia',
  nombreUsuario: '',
  tipoDocUsuario: 'Cédula de Ciudadanía',
  numDocUsuario: '',
  calidadUsuario: 'usuario',
  cuentaContrato: '',
  direccionInmueble: '',
  ciudadInmueble: 'Bogotá D.C.',
  telefonoUsuario: '',
  correoNotificaciones: '',
  numeroFactura: '',
  periodoFacturado: 'Octubre - Noviembre 2026',
  valorReclamado: 385000,
  consumoHistoricoPromedio: '130 kWh / mes',
  consumoCobrado: '410 kWh / mes',
  motivoReclamo: 'desviacion_significativa',
  descripcionHechos:
    'En la factura objeto de reclamo se presenta un incremento desproporcionado e injustificado en el consumo facturado frente al promedio histórico del predio, configurando una desviación significativa en los términos del artículo 149 de la Ley 142 de 1994, sin que en el inmueble hayan variado los hábitos de consumo ni existan fugas imperceptibles imputables al usuario.',
  solicitaInvestigacionDesviacion: true,
  solicitaReliquidacion: true,
  solicitaNoSuspension: true,
  peticionesAdicionales:
    'Solicito la expedición de un cupón de pago por los valores no reclamados para cancelar oportunamente los conceptos ordinarios que no son objeto de controversia.',
  anexos:
    '1. Copia de la factura objeto de reclamo.\n2. Copia de las últimas tres (3) facturas anteriores demostrando el consumo promedio histórico.\n3. Copia de la cédula de ciudadanía del solicitante.',
  signatureType: 'text',
};

export const sampleData: ReclamoServiciosPublicosData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  empresaServicios: 'Empresa de Acueducto y Alcantarillado de Bogotá (EAAB E.S.P.)',
  ciudadEmpresa: 'Bogotá D.C.',
  tipoServicio: 'acueducto',
  nombreUsuario: 'Claudia Patricia Ramírez Morales',
  tipoDocUsuario: 'Cédula de Ciudadanía',
  numDocUsuario: '52.345.678',
  calidadUsuario: 'suscriptor',
  cuentaContrato: 'NIC 20948123 / Cuenta Contrato 1004582',
  direccionInmueble: 'Carrera 7 # 120-45, Casa 3',
  ciudadInmueble: 'Bogotá D.C.',
  telefonoUsuario: '+57 315 890 1234',
  correoNotificaciones: 'claudia.ramirez@correo.com',
  numeroFactura: 'FAC-2026-904128',
  periodoFacturado: 'Septiembre - Octubre 2026',
  valorReclamado: 450000,
  consumoHistoricoPromedio: '16 m³ / bimestre',
  consumoCobrado: '64 m³ / bimestre',
  motivoReclamo: 'desviacion_significativa',
  descripcionHechos:
    'El consumo facturado en el período reciente asciende a 64 m³, cuadruplicando el promedio histórico del inmueble que oscila entre 14 y 16 m³. Esta variación extrema constituye una desviación significativa evidente (Art. 149 Ley 142/94). Tras una revisión técnica hidrosanitaria particular, se constató que no existen fugas en las instalaciones internas.',
  solicitaInvestigacionDesviacion: true,
  solicitaReliquidacion: true,
  solicitaNoSuspension: true,
  peticionesAdicionales:
    'Solicito formalmente que la empresa practique visita técnica con laboratorio de calibración del medidor y que se abstenga de suspender o cortar el servicio de agua, amparado en el Art. 155 de la Ley 142 de 1994.',
  anexos:
    '1. Copia de la factura reclamada N° FAC-2026-904128.\n2. Histórico de facturación de los tres bimestres anteriores.\n3. Certificado de inspección de plomería sin fugas internas.',
  signatureType: 'text',
};
