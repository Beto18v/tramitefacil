import { HabeasDataData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'habeas_data',
  title: 'Solicitud de Habeas Data Financiero',
  shortTitle: 'Habeas Data',
  category: 'legal',
  categoryName: 'Trámites Administrativos',
  categoryIcon: 'Scale',
  description:
    'Petición formal para actualización, rectificación o eliminación de reporte negativo en centrales de riesgo (DataCrédito, TransUnion/CIFIN).',
  iconName: 'ShieldAlert',
  lawReference: 'Leyes 1266/2008 y 2157/2021 (Borrón y Cuenta Nueva)',
  tags: ['habeas data', 'datacrédito', 'cifin', 'reporte negativo', 'centrales de riesgo', 'borrón y cuenta nueva'],
  estimatedMinutes: '3 min',
  featuredTags: ['Borrón y Cuenta Nueva', 'DataCrédito / CIFIN', 'Ley 1266 de 2008'],
  subfilter: 'Derechos Ciudadanos',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: HabeasDataData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  centralDeRiesgo: 'DataCrédito Experian',
  entidadReportante: '',
  nombreTitular: '',
  tipoDocTitular: 'Cédula de Ciudadanía',
  numDocTitular: '',
  expedicionTitular: 'Bogotá D.C.',
  telefonoTitular: '',
  correoTitular: '',
  direccionNotificacion: '',
  numeroObligacion: '',
  causalSolicitud: 'caducidad',
  hechosDetallados:
    '1. En la base de datos de la central de riesgo figura un reporte negativo emitido a mi nombre.\n2. La mora ha superado ampliamente el término legal máximo de caducidad fijado por la Ley 2157 de 2021 y la Sentencia C-1011 de 2008.\n3. Por tanto, es legalmente obligatorio eliminar el dato negativo del historial crediticio.',
  pretensionConcreta: 'Se ordene la eliminación inmediata del reporte negativo histórico y la actualización de mi historial crediticio.',
  anexosDocumentales: ['Copia de la Cédula de Ciudadanía', 'Paz y Salvo de la obligación (si aplica)'],
  signatureType: 'text',
};
export const sampleData: HabeasDataData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  centralDeRiesgo: 'DataCrédito Experian',
  entidadReportante: 'BANCO MULTISERVICIOS S.A.',
  nombreTitular: 'Rodrigo Alberto Herrera Gómez',
  tipoDocTitular: 'Cédula de Ciudadanía',
  numDocTitular: '80.456.789',
  expedicionTitular: 'Bogotá D.C.',
  telefonoTitular: '+57 310 987 6543',
  correoTitular: 'rodrigo.herrera@email.com',
  direccionNotificacion: 'Calle 134 # 15-28, Bogotá D.C.',
  numeroObligacion: 'Obligación N° 4589-0021-998',
  causalSolicitud: 'caducidad',
  hechosDetallados:
    '1. En el historial crediticio de la central de riesgo figura un reporte negativo emitido por Banco Multiservicios S.A. asociado a la obligación N° 4589-0021-998.\n2. La mora de dicha obligación inició hace más de diez (10) años, habiéndose extinguido el término legal de cobro judicial y superando ampliamente el término máximo de permanencia de ocho (8) años fijado por la jurisprudencia de la Corte Constitucional (Sentencia C-1011 de 2008).\n3. De conformidad con el artículo 13 de la Ley 1266 de 2008 y la Ley 2157 de 2021, opera el fenómeno jurídico de la caducidad del dato negativo, por lo cual es improcedente mantener el registro en mi historial crediticio.',
  pretensionConcreta:
    'Que en cumplimiento del régimen de Habeas Data se ordene la eliminación inmediata y definitiva del reporte negativo histórico y se actualice mi perfil con calificación normal.',
  anexosDocumentales: [
    'Copia de la Cédula de Ciudadanía del titular.',
    'Copia del reporte crediticio descargado de la plataforma.',
  ],
  signatureType: 'text',
};

