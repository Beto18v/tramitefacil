import { ActaEntregaData, DocumentMeta } from '../../../types/documents';
import { defaultActaEntrega, sampleActaEntrega } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'acta_entrega',
  title: 'Acta de Entrega y Estado de Inmueble',
  shortTitle: 'Acta de Entrega Inmueble',
  category: 'inmobiliario',
  categoryName: 'Inmobiliario & Propiedad',
  categoryIcon: 'Home',
  description:
    'Constancia física de entrega de llaves, verificación del estado de paredes y pisos, inventario y lecturas de servicios públicos.',
  iconName: 'ClipboardCheck',
  lawReference: 'Ley 820 de 2003 y Acta Notarial / Civil',
  tags: ['acta', 'entrega', 'llaves', 'inventario', 'paz y salvo', 'restitución'],
  estimatedMinutes: '⚡ 3 min',
  featuredTags: ['Paz y salvo', 'Lectura de servicios', 'Inventario'],
  subfilter: 'Inventario',
};

export const defaultData: ActaEntregaData = defaultActaEntrega;
export const sampleData: ActaEntregaData = sampleActaEntrega;

