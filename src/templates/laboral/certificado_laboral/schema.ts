import { CertificadoLaboralData, DocumentMeta } from '../../../types/documents';

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
  estimatedMinutes: '2 min',
  featuredTags: ['Art. 57 CST', 'Salarial y funciones', 'Obligatorio'],
  subfilter: 'Certificados',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: CertificadoLaboralData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  nombreEmpresa: '',
  destinatarioArea: 'Dirección de Gestión Humana y Nómina',
  nombreTrabajador: '',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '',
  cargoDesempenado: '',
  periodoTrabajado: 'Desde el inicio del contrato hasta la fecha actual',
  incluirSalario: true,
  incluirFunciones: true,
  motivoSolicitud: 'Trámite financiero y personal',
  correoEntrega: '',
  signatureType: 'text',
};
export const sampleData: CertificadoLaboralData = {
  ciudad: 'Bucaramanga',
  fecha: TODAY,
  nombreEmpresa: 'CLÍNICA DE ESPECIALISTAS DE SANTANDER S.A.S.',
  destinatarioArea: 'Gerencia de Gestión Humana y Desarrollo Organizacional',
  nombreTrabajador: 'Lina Marcela Peñaloza Rincón',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '1.098.672.441',
  cargoDesempenado: 'Jefe de Enfermería y Auditora de Calidad',
  periodoTrabajado: '01 de febrero de 2021 hasta la fecha actual',
  incluirSalario: true,
  incluirFunciones: true,
  motivoSolicitud: 'Solicitud formal para trámite de crédito hipotecario de vivienda ante entidad bancaria.',
  correoEntrega: 'lina.penaloza@correo.com',
  signatureType: 'text',
};

