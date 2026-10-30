import { AutorizacionPatiosData, DocumentMeta } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'autorizacion_patios',
  title: 'Autorización y Poder para Retiro de Patios',
  shortTitle: 'Retiro de Patios',
  category: 'vehiculos',
  categoryName: 'Trámites de Tránsito & Vehículos',
  categoryIcon: 'Car',
  description:
    'Poder especial amplio para retiro de automotores inmovilizados en patios oficiales ante secretarías y organismos de tránsito.',
  iconName: 'Key',
  lawReference: 'Art. 125 Ley 769 de 2002 y Resoluciones de Tránsito',
  tags: [
    'patios',
    'inmovilización',
    'tránsito',
    'grúa',
    'comparendo',
    'desinmovilización',
    'vehículo',
  ],
  estimatedMinutes: '2 min',
  featuredTags: ['Desinmovilización', 'Poder Notarial / Patios', 'Ley 769 de 2002'],
  subfilter: 'Vehículos',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: AutorizacionPatiosData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  nombrePropietario: '',
  tipoDocPropietario: 'Cédula de Ciudadanía',
  numDocPropietario: '',
  telefonoPropietario: '',
  nombreAutorizado: '',
  tipoDocAutorizado: 'Cédula de Ciudadanía',
  numDocAutorizado: '',
  telefonoAutorizado: '',
  organismoTransito: 'Secretaría Distrital de Movilidad de Bogotá',
  patioUbicacion: 'Patio Único de Retención Transitoria',
  placaVehiculo: '',
  marcaModelo: '',
  numeroComparendo: '',
  facultadesExpresas: [
    'Notificarse del comparendo y de la orden de entrega del vehículo.',
    'Efectuar la subsanación de la causal de inmovilización en el patio.',
    'Pagar los derechos de grúa y parqueadero ante el operador autorizado.',
    'Firmar el inventario de entrega física y retirar el automotor.',
  ],
  incluirRecuadroHuella: true,
  signatureType: 'text',
};
export const sampleData: AutorizacionPatiosData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  nombrePropietario: 'Mauricio Alejandro Riaño Castro',
  tipoDocPropietario: 'Cédula de Ciudadanía',
  numDocPropietario: '80.334.891',
  telefonoPropietario: '+57 312 998 4411',
  nombreAutorizado: 'Camilo Ernesto Riaño Castro',
  tipoDocAutorizado: 'Cédula de Ciudadanía',
  numDocAutorizado: '1.022.345.671',
  telefonoAutorizado: '+57 315 677 8899',
  organismoTransito: 'Secretaría Distrital de Movilidad de Bogotá',
  patioUbicacion: 'Patio Álamos (Calle 63 # 93-00)',
  placaVehiculo: 'HQX-789',
  marcaModelo: 'Chevrolet Onix LTZ 2022',
  numeroComparendo: '110010000000284561',
  facultadesExpresas: [
    'Notificarse del acta de inmovilización y comparendo correspondiente.',
    'Presentar la documentación de subsanación de la infracción cometida.',
    'Liquidar y cancelar las tarifas oficiales de grúa y parqueadero.',
    'Firmar el inventario de entrega física y retirar el automotor del patio.',
  ],
  incluirRecuadroHuella: true,
  signatureType: 'text',
};

