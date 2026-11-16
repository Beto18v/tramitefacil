import { ActaEntregaData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'acta_entrega',
  title: 'Acta de Entrega y Estado de Inmueble',
  shortTitle: 'Acta de Entrega Inmueble',
  category: 'inmobiliario',
  categoryName: 'Inmobiliario & Arriendos',
  categoryIcon: 'Home',
  description:
    'Constancia física de entrega de llaves, verificación del estado de paredes y pisos, inventario y lecturas de servicios públicos.',
  iconName: 'ClipboardCheck',
  lawReference: 'Ley 820 de 2003 y Acta Notarial / Civil',
  tags: ['acta', 'entrega', 'llaves', 'inventario', 'paz y salvo', 'restitución'],
  estimatedMinutes: '3 min',
  featuredTags: ['Paz y salvo', 'Lectura de servicios', 'Inventario'],
  subfilter: 'Inventario',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: ActaEntregaData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  hora: '10:00 AM',
  direccionInmueble: '',
  nombreEntrega: '',
  calidadEntrega: 'Arrendatario',
  docEntrega: '',
  nombreRecibe: '',
  calidadRecibe: 'Arrendador / Propietario',
  docRecibe: '',
  juegosLlavesEntregados: 2,
  estadoGeneralParedesPisos: 'Pintura en buen estado general, pisos limpios sin fracturas y cerraduras operativas.',
  lecturaAgua: '',
  lecturaEnergia: '',
  lecturaGas: '',
  pazSalvosPresentados: ['Paz y Salvo de Administración', 'Factura de Energía al día', 'Factura de Acueducto al día', 'Factura de Gas Natural al día'],
  observacionesPendientes: 'Ninguna novedad pendiente. El inmueble se recibe a completa conformidad.',
  signatureType: 'text',
};
export const sampleData: ActaEntregaData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  hora: '11:30 AM',
  direccionInmueble: 'Calle 106 # 18-35, Apto 402, Chicó Navarra, Bogotá D.C.',
  nombreEntrega: 'Mauricio Andrés Silva Pardo',
  calidadEntrega: 'Arrendatario',
  docEntrega: 'CC 80.123.456',
  nombreRecibe: 'Inmobiliaria San Fernando S.A.S. (Rep. por Juan Pablo Roa)',
  calidadRecibe: 'Arrendador / Propietario',
  docRecibe: 'CC 19.876.543',
  juegosLlavesEntregados: 3,
  estadoGeneralParedesPisos:
    'Paredes recién pintadas en blanco vinilo tipo 1 sin perforaciones. Pisos laminados en óptimo estado sin humedad ni rayones. Ventanas y persianas tipo blackout funcionando correctamente.',
  lecturaAgua: '1452.8 m³',
  lecturaEnergia: '28941.5 kWh',
  lecturaGas: '0843.2 m³',
  pazSalvosPresentados: [
    'Paz y Salvo de Cuotas de Administración hasta Octubre 2026',
    'Certificado de pago en línea Enel Colombia',
    'Certificado de pago Acueducto de Bogotá',
    'Paz y Salvo Vanti Gas Natural',
  ],
  observacionesPendientes:
    'Se entrega control remoto de puerta vehicular del garaje N° 12 y tarjeta de acceso al lobby. Ambas partes declaran recibir el inmueble a entera satisfacción.',
  signatureType: 'text',
};

