import { DocumentMeta, MemorandoLlamadoAtencionData } from '../../../types/documents';

export const meta: DocumentMeta = {
  id: 'memorando_llamado_atencion',
  title: 'Llamado de Atención y Memorando Disciplinario',
  shortTitle: 'Llamado de Atención',
  category: 'laboral',
  categoryName: 'Laboral & Talento Humano',
  categoryIcon: 'Building2',
  description:
    'Memorando formal disciplinario con tipificación de falta laboral, descripción de hechos, citación opcional a descargos y debido proceso.',
  iconName: 'ScrollText',
  lawReference: 'Código Sustantivo del Trabajo (C.S.T. Art. 115)',
  tags: [
    'memorando',
    'llamado de atención',
    'disciplinario',
    'falta laboral',
    'descargos',
    'debido proceso',
    'cst',
    'reglamento interno',
  ],
  estimatedMinutes: '2 min',
  featuredTags: ['Debido Proceso', 'C.S.T. Art. 115', 'Descargos'],
  subfilter: 'Disciplinario',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: MemorandoLlamadoAtencionData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  numeroMemorando: 'MEM-2026-001',
  nombreEmpresa: '',
  nitEmpresa: '',
  ciudadEmpresa: 'Bogotá D.C.',
  remitenteNombre: '',
  remitenteCargo: 'Director(a) de Gestión Humana',
  departamentoArea: 'Operaciones',
  nombreTrabajador: '',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '',
  cargoTrabajador: '',
  tipoFalta: 'retardo_injustificado',
  fechaFalta: TODAY,
  descripcionHechos:
    'El día indicado se constató el ingreso al puesto de trabajo con más de 45 minutos de retraso sobre el horario regular asignado, sin previo aviso ni justificación médica o de fuerza mayor comprobada, afectando la continuidad de las labores.',
  normaVulnerada:
    'Artículo 58 (Numerales 1 y 4) del Código Sustantivo del Trabajo y Reglamento Interno de Trabajo de la Empresa (Obligación de puntualidad y cumplimiento del horario pactado).',
  solicitaDescargos: true,
  fechaDescargos: TODAY,
  horaDescargos: '10:00 AM',
  lugarDescargos: 'Oficina de Gestión Humana / Enlace virtual corporativo',
  advertenciaReincidencia:
    'Se le recuerda que la reiteración o reincidencia en estas conductas contrarias a las obligaciones laborales dará lugar a la apertura formal de proceso disciplinario sancionatorio o a la terminación del contrato con justa causa conforme al Art. 62 del C.S.T.',
  copiaHojaVida: true,
  signatureType: 'text',
};

export const sampleData: MemorandoLlamadoAtencionData = {
  ciudad: 'Cali',
  fecha: TODAY,
  numeroMemorando: 'MEM-GH-2026-042',
  nombreEmpresa: 'INDUSTRIAS METÁLICAS DE OCCIDENTE S.A.S.',
  nitEmpresa: '890.301.245-9',
  ciudadEmpresa: 'Cali, Valle del Cauca',
  remitenteNombre: 'Héctor Fabio Ramírez Lozano',
  remitenteCargo: 'Gerente de Talento Humano',
  departamentoArea: 'Producción y Planta',
  nombreTrabajador: 'Julián Camilo Morales Pardo',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '1.144.123.890',
  cargoTrabajador: 'Técnico de Mantenimiento Electromecánico',
  tipoFalta: 'inasistencia_injustificada',
  fechaFalta: TODAY,
  descripcionHechos:
    'El colaborador no se presentó a su turno habitual programado de 06:00 a 14:00 horas, omitiendo notificar a su supervisor inmediato y sin allegar constancia o incapacidad expedida por su EPS que justifique legalmente la ausencia laboral.',
  normaVulnerada:
    'Artículo 58 numeral 1° y Artículo 60 numeral 4° del C.S.T. en concordancia con el Artículo 48 del Reglamento Interno de Trabajo relativo a faltas disciplinarias por ausencias laborales no autorizadas.',
  solicitaDescargos: true,
  fechaDescargos: TODAY,
  horaDescargos: '03:00 PM',
  lugarDescargos: 'Sala de Juntas de Talento Humano - Planta Yumbo',
  advertenciaReincidencia:
    'Se exhorta al trabajador a mantener un estricto acatamiento de sus compromisos laborales. La reincidencia en faltas disciplinarias acarreará las sanciones contempladas en el Reglamento Interno de Trabajo y la legislación laboral vigente.',
  copiaHojaVida: true,
  signatureType: 'text',
};

export type { MemorandoLlamadoAtencionData };
