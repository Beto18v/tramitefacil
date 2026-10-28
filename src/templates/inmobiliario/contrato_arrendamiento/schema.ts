import { ContratoArrendamientoData, DocumentMeta } from '../../../types/documents';
import { defaultContratoArrendamiento, sampleContratoArrendamiento } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'contrato_arrendamiento',
  title: 'Contrato de Arrendamiento de Vivienda Urbana',
  shortTitle: 'Contrato de Arrendamiento',
  category: 'inmobiliario',
  categoryName: 'Inmobiliario & Propiedad',
  categoryIcon: 'Home',
  description:
    'Contrato completo para casa o apartamento urbano con switch para fiador / codeudor solidario, cuota de administración y servicios.',
  iconName: 'KeyRound',
  lawReference: 'Ley 820 de 2003 y Código Civil',
  tags: ['contrato', 'arrendamiento', 'alquiler', 'canon', 'arrendador', 'inquilino', 'codeudor'],
  estimatedMinutes: '⚡ 5 min',
  featuredTags: ['Con Fiador/Codeudor', 'Ley 820', 'Inventario'],
  subfilter: 'Arrendamiento',
};

export const defaultData: ContratoArrendamientoData = defaultContratoArrendamiento;
export const sampleData: ContratoArrendamientoData = sampleContratoArrendamiento;

