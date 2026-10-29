import { AcuerdoNdaData, DocumentMeta } from '../../../types/documents';
import { defaultAcuerdoNda, sampleAcuerdoNda } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'acuerdo_nda',
  title: 'Acuerdo de Confidencialidad y No Divulgación (NDA)',
  shortTitle: 'Acuerdo NDA',
  category: 'comercial',
  categoryName: 'Comercial & Negocios',
  categoryIcon: 'Handshake',
  description:
    'Pacto formal de protección de secretos comerciales, propiedad intelectual, información financiera y cláusula penal indemnizatoria.',
  iconName: 'ShieldCheck',
  lawReference: 'Decisión 486 CAN y Código de Comercio',
  tags: ['nda', 'confidencialidad', 'secreto', 'comercial', 'propiedad', 'negocios'],
  estimatedMinutes: '3 min',
  featuredTags: ['Protección de IP', 'Cláusula penal', 'Bilateral / Unilateral'],
  subfilter: 'Confidencialidad (NDA)',
};

export const defaultData: AcuerdoNdaData = defaultAcuerdoNda;
export const sampleData: AcuerdoNdaData = sampleAcuerdoNda;

