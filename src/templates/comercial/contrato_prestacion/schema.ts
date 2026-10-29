import { ContratoPrestacionData, DocumentMeta } from '../../../types/documents';
import { defaultContratoPrestacion, sampleContratoPrestacion } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'contrato_prestacion',
  title: 'Contrato de Prestación de Servicios Profesionales',
  shortTitle: 'Contrato de Servicios',
  category: 'comercial',
  categoryName: 'Comercial & Negocios',
  categoryIcon: 'Handshake',
  description:
    'Contrato civil y comercial con autonomía técnica, sin subordinación, con interruptores de confidencialidad y cláusula penal.',
  iconName: 'ScrollText',
  lawReference: 'Código Civil (Art. 1495) y Código de Comercio',
  tags: ['contrato', 'servicios', 'independiente', 'prestación', 'honorarios', 'autonomía', 'nda'],
  estimatedMinutes: '4 min',
  featuredTags: ['Sin subordinación', 'Cláusula penal', 'Confidencialidad'],
  subfilter: 'Contratos',
};

export const defaultData: ContratoPrestacionData = defaultContratoPrestacion;
export const sampleData: ContratoPrestacionData = sampleContratoPrestacion;

