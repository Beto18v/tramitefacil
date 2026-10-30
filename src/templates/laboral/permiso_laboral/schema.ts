import { PermisoLaboralData, DocumentMeta } from '../../../types/documents';

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

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: PermisoLaboralData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  nombreEmpresa: '',
  nombreJefe: '',
  cargoJefe: 'Líder de Área / Supervisor Inmediato',
  nombreEmpleado: '',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '',
  cargoEmpleado: '',
  tipoPermiso: 'calamidad',
  fechaInicio: TODAY,
  fechaFin: TODAY,
  diasTotales: 1,
  motivoDetallado: '',
  anexaSoportes: true,
  compensacionHoras: 'Acorde a las políticas internas de la compañía',
  signatureType: 'text',
};
export const sampleData: PermisoLaboralData = {
  ciudad: 'Pereira',
  fecha: TODAY,
  nombreEmpresa: 'AGROEXPORTACIONES DEL EJE S.A.',
  nombreJefe: 'Ing. Carlos Arturo Henao',
  cargoJefe: 'Gerente de Planta y Producción',
  nombreEmpleado: 'Julián Andrés Echeverri Zuluaga',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '1.088.334.902',
  cargoEmpleado: 'Técnico de Mantenimiento Electromecánico',
  tipoPermiso: 'estudio',
  fechaInicio: '2026-11-10',
  fechaFin: '2026-11-12',
  diasTotales: 3,
  motivoDetallado:
    'Sustentación de tesis de grado y ceremonia de graduación de Ingeniería Mecatrónica en la Universidad Tecnológica de Pereira.',
  anexaSoportes: true,
  compensacionHoras:
    'He coordinado previamente con mi compañero de turno para cubrir las guardias críticas y repondré las horas pendientes en la semana siguiente.',
  signatureType: 'text',
};

