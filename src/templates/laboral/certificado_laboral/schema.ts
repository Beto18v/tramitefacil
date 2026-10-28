import { CertificadoLaboralData, DocumentMeta } from '../../../types/documents';
import { defaultCertificadoLaboral, sampleCertificadoLaboral } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'certificado_laboral',
  title: 'Solicitud de Certificado Laboral y Salarial',
  shortTitle: 'Certificado Laboral',
  category: 'laboral',
  categoryName: 'Laboral & Talento Humano',
  categoryIcon: 'Building2',
  description:
    'Petición a recursos humanos para constancia con cargo desempeñado, salario, funciones y tiempo exacto de servicio.',
  iconName: 'Award',
  lawReference: 'Art. 57 Numeral 7 del Código Sustantivo del Trabajo',
  tags: ['certificado', 'constancia', 'laboral', 'salario', 'tiempo', 'cst', 'funciones'],
  estimatedMinutes: '⚡ 2 min',
  featuredTags: ['Art. 57 CST', 'Salarial y funciones', 'Obligatorio'],
  subfilter: 'Certificados',
};

export const defaultData: CertificadoLaboralData = defaultCertificadoLaboral;
export const sampleData: CertificadoLaboralData = sampleCertificadoLaboral;

