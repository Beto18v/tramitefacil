import { DocumentoFormalData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'documento_formal',
  title: 'Documento Formal y Oficio Personalizado',
  shortTitle: 'Documento a Medida',
  category: 'legal',
  categoryName: 'Trámites Administrativos',
  categoryIcon: 'Sparkles',
  description:
    'Documento formal y oficio redactado a la medida de tu caso, estructurado con hechos, fundamentos legales colombianos y peticiones.',
  iconName: 'FileText',
  lawReference: 'Estructura Jurídica Institucional Colombiana',
  tags: [
    'oficio',
    'carta formal',
    'reclamación',
    'documento a medida',
    'personalizado',
    'solicitud',
    'acuerdo',
  ],
  estimatedMinutes: '1 min',
  featuredTags: ['A tu Medida', 'Formato Oficial', 'Listo para Firmar'],
  subfilter: 'Derechos Ciudadanos',
};

const TODAY = new Date().toLocaleDateString('es-CO', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const defaultData: DocumentoFormalData = {
  title: 'OFICIO FORMAL DE PETICIÓN Y RECLAMACIÓN',
  cityAndDate: `Bogotá D.C., ${TODAY}`,
  recipient: {
    name: 'A QUIEN CORRESPONDA / ENTIDAD DESTINATARIA',
    titleOrCompany: 'Dirección o Representación Legal',
    address: 'Ciudad / Dirección de Notificaciones',
  },
  subject: 'ASUNTO: Reclamación formal y solicitud en ejercicio de los derechos legales',
  openingGreeting: 'Respetado(a) señor(a):',
  facts: [
    '1. Que en fecha reciente se presentó la situación de hecho objeto de la presente comunicación.',
    '2. Que se han agotado las instancias previas de diálogo sin obtener una solución satisfactoria.',
    '3. Que la situación descrita genera una afectación directa que requiere atención inmediata.',
  ],
  legalBasis: [
    'Artículo 23 de la Constitución Política de Colombia (Derecho Fundamental de Petición).',
    'Normas aplicables del Código Civil y legislación colombiana concordante.',
  ],
  petitions: [
    '1. Se dé trámite y respuesta formal a la presente comunicación dentro de los términos de ley.',
    '2. Se adopten las medidas correctivas solicitadas para resolver la situación planteada.',
  ],
  closing: 'Atentamente,',
  signatures: [
    {
      role: 'SOLICITANTE',
      name: 'Nombre Completo del Solicitante',
      idNumber: 'C.C. No. 00.000.000 de Bogotá D.C.',
      phone: '+57 300 000 0000',
      email: 'correo@ejemplo.com',
    },
  ],
  signatureType: 'text',
};

export const sampleData: DocumentoFormalData = {
  title: 'REQUERIMIENTO FORMAL Y PREAVISO DE TERMINACIÓN POR MORA',
  cityAndDate: `Bogotá D.C., ${TODAY}`,
  recipient: {
    name: 'SEÑOR ARRENDATARIO Y CODEUDOR SOLIDARIO',
    titleOrCompany: 'Inquilinos del Inmueble Arrendado',
    address: 'Calle 127 # 45-67, Apto 302, Bogotá D.C.',
  },
  subject:
    'ASUNTO: Notificación formal de mora en cánones de arrendamiento y requerimiento de restitución voluntaria del inmueble (Art. 22 Ley 820 de 2003)',
  openingGreeting: 'Respetados señores:',
  facts: [
    '1. En calidad de ARRENDADOR, suscribí con ustedes contrato de arrendamiento sobre el inmueble ubicado en la Calle 127 # 45-67, Apto 302 de Bogotá D.C.',
    '2. A la fecha de la presente comunicación, se registra un retraso injustificado de más de dos (2) meses en el pago de los cánones de arrendamiento pactados.',
    '3. A pesar de los reiterados requerimientos informales, no se ha efectuado el pago ni suscrito acuerdo de cancelación de la deuda acumulada.',
  ],
  legalBasis: [
    'Artículo 22, numeral 1 de la Ley 820 de 2003: Causal de terminación unilateral del contrato de arrendamiento por mora en el pago del canon.',
    'Artículo 1608 del Código Civil Colombiano: Constitución en mora del deudor sin necesidad de reconvención judicial expresa.',
  ],
  petitions: [
    '1. Efectuar el pago inmediato de la totalidad de los cánones y servicios adeudados a la fecha.',
    '2. Proceder a la entrega material y desocupación pacífica del inmueble dentro del término perentorio de diez (10) días hábiles siguientes al recibo de esta carta.',
    '3. En caso de no proceder a la entrega o pago, se iniciarán las acciones legales pertinentes ante los juzgados civiles competentes con exigencia de la cláusula penal.',
  ],
  closing: 'Con toda atención,',
  signatures: [
    {
      role: 'ARRENDADOR',
      name: 'Carlos Andrés Mendoza Silva',
      idNumber: 'C.C. No. 79.854.120 de Bogotá D.C.',
      phone: '+57 315 890 1234',
      email: 'carlos.mendoza@email.com',
    },
  ],
  signatureType: 'text',
};

