import { CartaRenunciaData, DocumentMeta } from '../../../types/documents';
import { defaultCartaRenuncia, sampleCartaRenuncia } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'carta_renuncia',
  title: 'Carta de Renuncia Laboral con Preaviso',
  shortTitle: 'Carta de Renuncia',
  category: 'laboral',
  categoryName: 'Laboral & Talento Humano',
  categoryIcon: 'Building2',
  description:
    'Carta de renuncia formal con switch de exoneración de preaviso legal, selector de motivos jurídicos rápidos y solicitud de liquidación.',
  iconName: 'UserMinus',
  lawReference: 'Código Sustantivo del Trabajo (C.S.T.)',
  tags: ['renuncia', 'retiro', 'trabajo', 'empleo', 'preaviso', 'liquidación', 'cst'],
  estimatedMinutes: '1 min',
  featuredTags: ['Exoneración preaviso', 'Liquidación de ley', 'CST'],
  subfilter: 'Renuncias',
};

export const defaultData: CartaRenunciaData = defaultCartaRenuncia;
export const sampleData: CartaRenunciaData = sampleCartaRenuncia;

