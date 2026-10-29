import { DerechoPeticionData, DocumentMeta } from '../../../types/documents';
import { defaultDerechoPeticion, sampleDerechoPeticion } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'derecho_peticion',
  title: 'Derecho de Petición Estándar Multilínea',
  shortTitle: 'Derecho de Petición',
  category: 'legal',
  categoryName: 'Trámites Ciudadanos & Legales',
  categoryIcon: 'Scale',
  description:
    'Petición formal basada en el Art. 23 de la Constitución con lista dinámica de hechos y pretensiones numeradas para salud, bancos o servicios.',
  iconName: 'FileText',
  lawReference: 'Artículo 23 Constitución Política y Ley 1755 de 2015',
  tags: ['petición', 'reclamo', 'eps', 'banco', 'salud', 'pqrs', 'ley 1755', 'hechos'],
  estimatedMinutes: '3 min',
  featuredTags: ['Hechos dinámicos', 'Término 15 días', 'Art. 23 C.P.'],
  subfilter: 'Peticiones',
};

export const defaultData: DerechoPeticionData = defaultDerechoPeticion;
export const sampleData: DerechoPeticionData = sampleDerechoPeticion;

