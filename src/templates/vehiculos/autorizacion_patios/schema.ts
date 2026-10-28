import { AutorizacionPatiosData, DocumentMeta } from '../../../types/documents';
import {
  defaultAutorizacionPatios,
  sampleAutorizacionPatios,
} from '../../../data/initialData';

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
  estimatedMinutes: '⚡ 2 min',
  featuredTags: ['Desinmovilización', 'Poder Notarial / Patios', 'Ley 769 de 2002'],
  subfilter: 'Vehículos',
};

export const defaultData: AutorizacionPatiosData = defaultAutorizacionPatios;
export const sampleData: AutorizacionPatiosData = sampleAutorizacionPatios;

