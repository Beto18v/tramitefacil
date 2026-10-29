import { PermisoLaboralData, DocumentMeta } from '../../../types/documents';
import { defaultPermisoLaboral, samplePermisoLaboral } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'permiso_laboral',
  title: 'Solicitud de Permiso o Licencia Laboral',
  shortTitle: 'Permiso / Licencia',
  category: 'laboral',
  categoryName: 'Laboral & Talento Humano',
  categoryIcon: 'Building2',
  description:
    'Solicitud formal por calamidad doméstica, estudios, citas médicas, deberes ciudadanos o licencia no remunerada.',
  iconName: 'CalendarClock',
  lawReference: 'Art. 57 Numeral 6 del Código Sustantivo del Trabajo',
  tags: ['permiso', 'licencia', 'ausencia', 'calamidad', 'vacaciones', 'estudio'],
  estimatedMinutes: '2 min',
  featuredTags: ['Calamidad / Citas', 'Remunerada o no', 'CST'],
  subfilter: 'Permisos',
};

export const defaultData: PermisoLaboralData = defaultPermisoLaboral;
export const sampleData: PermisoLaboralData = samplePermisoLaboral;

