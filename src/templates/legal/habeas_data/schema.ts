import { HabeasDataData, DocumentMeta } from '../../../types/documents';
import { defaultHabeasData, sampleHabeasData } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'habeas_data',
  title: 'Solicitud de Habeas Data Financiero',
  shortTitle: 'Habeas Data',
  category: 'legal',
  categoryName: 'Trámites Ciudadanos & Legales',
  categoryIcon: 'Scale',
  description:
    'Petición formal para actualización, rectificación o eliminación de reporte negativo en centrales de riesgo (DataCrédito, TransUnion/CIFIN).',
  iconName: 'ShieldAlert',
  lawReference: 'Leyes 1266/2008 y 2157/2021 (Borrón y Cuenta Nueva)',
  tags: ['habeas data', 'datacrédito', 'cifin', 'reporte negativo', 'centrales de riesgo', 'borrón y cuenta nueva'],
  estimatedMinutes: '⚡ 3 min',
  featuredTags: ['Borrón y Cuenta Nueva', 'DataCrédito / CIFIN', 'Ley 1266 de 2008'],
  subfilter: 'Derechos Ciudadanos',
};

export const defaultData: HabeasDataData = defaultHabeasData;
export const sampleData: HabeasDataData = sampleHabeasData;

