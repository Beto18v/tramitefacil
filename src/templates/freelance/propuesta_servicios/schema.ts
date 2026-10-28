import { PropuestaServiciosData } from '../../../types/documents';
import { DocumentMetaInfo } from '../../types';

export const meta: DocumentMetaInfo = {
  id: 'propuesta_servicios',
  title: 'Propuesta de Servicios y Cotización',
  shortTitle: 'Propuesta Comercial',
  category: 'freelance',
  categoryName: 'Finanzas, Freelance & Honorarios',
  categoryIcon: 'Briefcase',
  description:
    'Oferta comercial y cotización profesional estructurada con objetivos, alcance detallado, lista de entregables, cronograma en semanas, honorarios y condiciones de pago.',
  iconName: 'FileSpreadsheet',
  lawReference: 'Código de Comercio Art. 845 y ss. (Oferta Comercial)',
  tags: ['Cotización', 'Propuesta Comercial', 'Freelance', 'Consultoría', 'Entregables'],
  estimatedMinutes: '4 min',
  featuredTags: ['Comercial', 'Entregables', 'Hitos'],
  subfilter: 'Cotizaciones',
};

const TODAY = new Date().toISOString().split('T')[0];

export const defaultData: PropuestaServiciosData = {
  ciudad: 'Bogotá D.C.',
  fecha: TODAY,
  validezDias: 15,
  nombreProponente: '',
  identificacionProponente: '',
  profesionProponente: '',
  telefonoProponente: '',
  correoProponente: '',
  nombreCliente: '',
  empresaCliente: '',
  cargoCliente: '',
  tituloProyecto: '',
  objetivoGeneral: '',
  alcanceDetallado: '',
  entregables: [
    'Documento de Especificaciones Técnicas',
    'Entregable Final y Código Fuente',
    'Capacitación al equipo',
  ],
  cronogramaSemanas: '4 semanas',
  honorariosTotales: 0,
  formaDePago: '50% de anticipo al inicio y 50% contra entrega a satisfacción',
  exclusionesYCondiciones:
    'No incluye costos de licencias de terceros, hosting ni soporte post-entrega no acordado.',
  signatureType: 'text',
};

export const sampleData: PropuestaServiciosData = {
  ciudad: 'Medellín',
  fecha: TODAY,
  validezDias: 30,
  nombreProponente: 'Santiago Restrepo Cadavid',
  identificacionProponente: 'CC 1.037.654.890',
  profesionProponente: 'Consultor Senior en Transformación Digital & Cloud',
  telefonoProponente: '+57 315 889 0012',
  correoProponente: 'santiago.restrepo@techconsulting.co',
  nombreCliente: 'Lic. Mariana Botero Jaramillo',
  empresaCliente: 'LOGÍSTICA INTEGRAL DE OCCIDENTE S.A.S.',
  cargoCliente: 'Gerente de Operaciones y Tecnología',
  tituloProyecto: 'Modernización del Sistema de Despachos y Automatización de Envíos',
  objetivoGeneral:
    'Implementar una solución tecnológica web responsiva que reduzca en un 40% el tiempo manual de asignación de rutas y digitalice el registro de trazabilidad de pedidos.',
  alcanceDetallado:
    'El proyecto comprende: 1) Diagnóstico de procesos actuales de despacho; 2) Configuración de base de datos relacional Cloud SQL; 3) Desarrollo de módulo frontend para operarios con PWA; 4) Integración con APIs de transportadoras aliadas; 5) Capacitación técnica.',
  entregables: [
    'Fase 1: Documento de Arquitectura y Modelo Entidad-Relación aprobado.',
    'Fase 2: Versión Alfa funcional con módulo de creación de despachos.',
    'Fase 3: Versión de Producción desplegada con integración de notificaciones.',
    'Fase 4: Manual de usuario y 10 horas de soporte presencial/remoto.',
  ],
  cronogramaSemanas: '6 semanas calendario',
  honorariosTotales: 12500000,
  formaDePago:
    '40% al perfeccionamiento del contrato, 30% a la entrega de la Versión Alfa y 30% contra acta de recibo a satisfacción.',
  exclusionesYCondiciones:
    'No incluye adquisición de hardware de lectura de código de barras ni cobros por licencias de terceros que correspondan directamente al cliente.',
  signatureType: 'text',
};

