export type DocumentCategory =
  | 'freelance'
  | 'laboral'
  | 'inmobiliario'
  | 'legal';

export type DocumentType =
  // 💼 Freelance & Contratistas
  | 'cuenta_cobro'
  | 'propuesta_servicios'
  | 'contrato_prestacion'
  // 🏢 Laboral & Empleo
  | 'carta_renuncia'
  | 'certificado_laboral'
  | 'permiso_laboral'
  // 🏠 Inmobiliario & Hogar
  | 'no_renovacion_arriendo'
  | 'contrato_arrendamiento'
  | 'acta_entrega'
  // ⚖️ Trámites Ciudadanos & Legales
  | 'derecho_peticion'
  | 'poder_autorizacion'
  | 'habeas_data';

export interface DocumentMeta {
  id: DocumentType;
  title: string;
  shortTitle: string;
  category: DocumentCategory;
  categoryName: string;
  categoryIcon: string;
  description: string;
  iconName: string;
  lawReference: string;
  tags: string[];
}

export const CATEGORIES_CONFIG: { id: DocumentCategory | 'all'; name: string; icon: string }[] = [
  { id: 'all', name: 'Todos los Trámites', icon: 'Folder' },
  { id: 'freelance', name: 'Freelance & Contratistas', icon: 'Briefcase' },
  { id: 'laboral', name: 'Laboral & Empleo', icon: 'Building2' },
  { id: 'inmobiliario', name: 'Inmobiliario & Hogar', icon: 'Home' },
  { id: 'legal', name: 'Trámites Ciudadanos & Legales', icon: 'Scale' },
];

export const DOCUMENT_CATALOG: DocumentMeta[] = [
  // 💼 Freelance & Contratistas
  {
    id: 'cuenta_cobro',
    title: 'Cuenta de Cobro / Honorarios',
    shortTitle: 'Cuenta de Cobro',
    category: 'freelance',
    categoryName: 'Freelance & Contratistas',
    categoryIcon: 'Briefcase',
    description: 'Documento equivalente para cobro de honorarios con cálculo automático de retención en la fuente e ICA.',
    iconName: 'Receipt',
    lawReference: 'Art. 437 E.T. y Art. 1.6.1.4.12 D.U.R. 1625/2016',
    tags: ['cobro', 'honorarios', 'factura', 'prestación', 'cuenta', 'pago'],
  },
  {
    id: 'propuesta_servicios',
    title: 'Propuesta Comercial de Servicios',
    shortTitle: 'Propuesta de Servicios',
    category: 'freelance',
    categoryName: 'Freelance & Contratistas',
    categoryIcon: 'Briefcase',
    description: 'Cotización y propuesta profesional formal con alcance, entregables, cronograma y condiciones económicas.',
    iconName: 'FileSpreadsheet',
    lawReference: 'Código de Comercio - Oferta Mercantil (Art. 845)',
    tags: ['propuesta', 'cotización', 'servicios', 'alcance', 'presupuesto'],
  },
  {
    id: 'contrato_prestacion',
    title: 'Contrato de Prestación de Servicios',
    shortTitle: 'Contrato de Servicios',
    category: 'freelance',
    categoryName: 'Freelance & Contratistas',
    categoryIcon: 'Briefcase',
    description: 'Contrato civil/comercial independiente con autonomía técnica, sin subordinación laboral.',
    iconName: 'ScrollText',
    lawReference: 'Código Civil (Art. 1495) y Código de Comercio',
    tags: ['contrato', 'servicios', 'independiente', 'prestación', 'honorarios'],
  },

  // 🏢 Laboral & Empleo
  {
    id: 'carta_renuncia',
    title: 'Carta de Renuncia Voluntaria',
    shortTitle: 'Carta de Renuncia',
    category: 'laboral',
    categoryName: 'Laboral & Empleo',
    categoryIcon: 'Building2',
    description: 'Notificación irrevocable de renuncia con opción de exoneración de preaviso, empalme y solicitud de liquidación.',
    iconName: 'UserMinus',
    lawReference: 'Código Sustantivo del Trabajo (C.S.T.)',
    tags: ['renuncia', 'retiro', 'trabajo', 'empleo', 'preaviso', 'liquidación'],
  },
  {
    id: 'certificado_laboral',
    title: 'Solicitud de Certificado Laboral',
    shortTitle: 'Certificado Laboral',
    category: 'laboral',
    categoryName: 'Laboral & Empleo',
    categoryIcon: 'Building2',
    description: 'Petición al empleador o ex-empleador para expedir constancia con cargo, salario y tiempo laborado.',
    iconName: 'Award',
    lawReference: 'Art. 57 Numeral 7 del Código Sustantivo del Trabajo',
    tags: ['certificado', 'constancia', 'laboral', 'salario', 'tiempo', 'cst'],
  },
  {
    id: 'permiso_laboral',
    title: 'Solicitud de Permiso / Licencia',
    shortTitle: 'Permiso / Licencia',
    category: 'laboral',
    categoryName: 'Laboral & Empleo',
    categoryIcon: 'Building2',
    description: 'Solicitud formal para calamidad doméstica, estudios, trámites personales o licencia no remunerada.',
    iconName: 'CalendarClock',
    lawReference: 'Art. 57 Numeral 6 del Código Sustantivo del Trabajo',
    tags: ['permiso', 'licencia', 'ausencia', 'calamidad', 'vacaciones', 'estudio'],
  },

  // 🏠 Inmobiliario & Hogar
  {
    id: 'no_renovacion_arriendo',
    title: 'Aviso de No Renovación de Arrendamiento',
    shortTitle: 'No Renovación Arriendo',
    category: 'inmobiliario',
    categoryName: 'Inmobiliario & Hogar',
    categoryIcon: 'Home',
    description: 'Notificación de terminación con preaviso oportuno de 3 meses para vivienda urbana.',
    iconName: 'Home',
    lawReference: 'Ley 820 de 2003 (Régimen de Arrendamiento)',
    tags: ['arriendo', 'terminación', 'inmueble', 'desalojo', 'preaviso', 'casa'],
  },
  {
    id: 'contrato_arrendamiento',
    title: 'Contrato de Arrendamiento de Vivienda',
    shortTitle: 'Contrato de Arriendo',
    category: 'inmobiliario',
    categoryName: 'Inmobiliario & Hogar',
    categoryIcon: 'Home',
    description: 'Contrato completo para apartamento o casa urbana con cláusulas de canon, servicios y depósito.',
    iconName: 'KeyRound',
    lawReference: 'Ley 820 de 2003 y Código Civil',
    tags: ['contrato', 'arrendamiento', 'alquiler', 'canon', 'arrendador', 'inquilino'],
  },
  {
    id: 'acta_entrega',
    title: 'Acta de Entrega de Inmueble y Llaves',
    shortTitle: 'Acta de Entrega Inmueble',
    category: 'inmobiliario',
    categoryName: 'Inmobiliario & Hogar',
    categoryIcon: 'Home',
    description: 'Constancia física de devolución de llaves, verificación de inventario y paz y salvo de servicios.',
    iconName: 'ClipboardCheck',
    lawReference: 'Ley 820 de 2003 y Acta Notarial / Civil',
    tags: ['acta', 'entrega', 'llaves', 'inventario', 'paz y salvo', 'restitución'],
  },

  // ⚖️ Trámites Ciudadanos & Legales
  {
    id: 'derecho_peticion',
    title: 'Derecho de Petición Estándar',
    shortTitle: 'Derecho de Petición',
    category: 'legal',
    categoryName: 'Trámites Ciudadanos & Legales',
    categoryIcon: 'Scale',
    description: 'Solicitud formal para salud (EPS), servicios públicos o entidades financieras con términos perentorios.',
    iconName: 'FileText',
    lawReference: 'Artículo 23 Constitución Política y Ley 1755 de 2015',
    tags: ['petición', 'reclamo', 'eps', 'banco', 'salud', 'pqrs', 'ley 1755'],
  },
  {
    id: 'poder_autorizacion',
    title: 'Poder Especial / Autorización a Terceros',
    shortTitle: 'Poder / Autorización',
    category: 'legal',
    categoryName: 'Trámites Ciudadanos & Legales',
    categoryIcon: 'Scale',
    description: 'Mandato con facultades expresas y recuadro gráfico para huella dactilar (índice derecho).',
    iconName: 'Fingerprint',
    lawReference: 'Art. 2142 y ss. Código Civil y C.G.P.',
    tags: ['poder', 'autorización', 'trámite', 'tercero', 'huella', 'diligencia'],
  },
  {
    id: 'habeas_data',
    title: 'Solicitud de Habeas Data Financiero',
    shortTitle: 'Habeas Data (Reportes)',
    category: 'legal',
    categoryName: 'Trámites Ciudadanos & Legales',
    categoryIcon: 'Scale',
    description: 'Petición para eliminación, rectificación o caducidad de reportes negativos ante centrales de riesgo.',
    iconName: 'ShieldAlert',
    lawReference: 'Ley 1266 de 2008 y Ley 2157 de 2021 (Ley de Borrón y Cuenta Nueva)',
    tags: ['datacredito', 'cifin', 'habeas data', 'reporte', 'datacrédito', 'centrales'],
  },
];

// Document Style Options
export interface DocumentStyleConfig {
  fontFamily: 'serif' | 'sans';
  fontSize: 'compact' | 'normal' | 'spacious';
  paperSize: 'a4' | 'letter';
}

// ==================== DOCUMENT SCHEMAS ====================

// 1. Cuenta de Cobro
export interface CuentaCobroData {
  numeroConsecutivo: string;
  fechaEmision: string;
  fechaVencimiento: string;
  ciudad: string;
  nombreContratista: string;
  tipoDocumentoContratista: string;
  numeroDocumentoContratista: string;
  expedicionContratista: string;
  telefonoContratista: string;
  correoContratista: string;
  direccionContratista: string;
  nombreCliente: string;
  tipoDocumentoCliente: string;
  numeroDocumentoCliente: string;
  direccionCliente: string;
  ciudadCliente: string;
  representanteCliente: string;
  concepto: string;
  periodoPrestacion: string;
  numeroContrato: string;
  valorSubtotal: number;
  aplicaReteFuente: boolean;
  porcentajeReteFuente: number;
  aplicaReteICA: boolean;
  porcentajeReteICA: number;
  moneda: string;
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  titularCuenta: string;
  declaraSeguridadSocial: boolean;
  declaraNoResponsableIVA: boolean;
}

// 2. Propuesta de Servicios
export interface PropuestaServiciosData {
  ciudad: string;
  fecha: string;
  validezDias: number;
  nombreProponente: string;
  identificacionProponente: string;
  profesionProponente: string;
  telefonoProponente: string;
  correoProponente: string;
  nombreCliente: string;
  empresaCliente: string;
  cargoCliente: string;
  tituloProyecto: string;
  objetivoGeneral: string;
  alcanceDetallado: string;
  entregables: string[];
  cronogramaSemanas: string;
  honorariosTotales: number;
  formaDePago: string;
  exclusionesYCondiciones: string;
}

// 3. Contrato de Prestación de Servicios
export interface ContratoPrestacionData {
  ciudad: string;
  fecha: string;
  nombreContratante: string;
  tipoDocContratante: string;
  numDocContratante: string;
  domicilioContratante: string;
  nombreContratista: string;
  tipoDocContratista: string;
  numDocContratista: string;
  domicilioContratista: string;
  objetoContrato: string;
  obligacionesContratista: string[];
  valorContrato: number;
  formaPago: string;
  fechaInicio: string;
  fechaTerminacion: string;
  lugarEjecucion: string;
  clausulaIndependencia: boolean;
  clausulaPenalMonto: number;
}

// 4. Carta de Renuncia
export interface CartaRenunciaData {
  ciudad: string;
  fecha: string;
  nombreEmpresa: string;
  nombreDestinatario: string;
  cargoDestinatario: string;
  departamento: string;
  nombreTrabajador: string;
  tipoDocumento: string;
  numeroDocumento: string;
  cargoTrabajador: string;
  fechaIngreso: string;
  ultimoDiaLaboral: string;
  solicitaExoneracionPreaviso: boolean;
  motivoCategoria: 'nuevos_retos' | 'motivos_personales' | 'estudios' | 'traslado' | 'otro';
  motivoDetalle: string;
  ofrecimientoEmpalme: boolean;
  solicitudLiquidacion: boolean;
  parrafoAgradecimiento: string;
}

// 5. Solicitud Certificado Laboral
export interface CertificadoLaboralData {
  ciudad: string;
  fecha: string;
  nombreEmpresa: string;
  destinatarioArea: string;
  nombreTrabajador: string;
  tipoDocumento: string;
  numeroDocumento: string;
  cargoDesempenado: string;
  periodoTrabajado: string;
  incluirSalario: boolean;
  incluirFunciones: boolean;
  motivoSolicitud: string;
  correoEntrega: string;
}

// 6. Solicitud de Permiso o Licencia
export interface PermisoLaboralData {
  ciudad: string;
  fecha: string;
  nombreEmpresa: string;
  nombreJefe: string;
  cargoJefe: string;
  nombreEmpleado: string;
  tipoDocumento: string;
  numeroDocumento: string;
  cargoEmpleado: string;
  tipoPermiso: 'calamidad' | 'estudio' | 'medico' | 'tramite' | 'no_remunerada';
  fechaInicio: string;
  fechaFin: string;
  diasTotales: number;
  motivoDetallado: string;
  anexaSoportes: boolean;
  compensacionHoras: string;
}

// 7. No Renovación de Arrendamiento
export interface NoRenovacionArriendoData {
  ciudad: string;
  fecha: string;
  rolRemitente: 'arrendador' | 'arrendatario';
  nombreRemitente: string;
  tipoDocRemitente: string;
  numDocRemitente: string;
  telefonoRemitente: string;
  correoRemitente: string;
  nombreDestinatario: string;
  tipoDocDestinatario: string;
  numDocDestinatario: string;
  direccionNotificacion: string;
  direccionInmueble: string;
  ciudadInmueble: string;
  matriculaInmobiliaria: string;
  fechaContrato: string;
  fechaEntregaInmueble: string;
  horaEntrega: string;
  causalInvocada: string;
  detalleCausal: string;
  instruccionesPazSalvo: string;
  restitucionDeposito: boolean;
}

// 8. Contrato de Arrendamiento
export interface ContratoArrendamientoData {
  ciudad: string;
  fecha: string;
  nombreArrendador: string;
  tipoDocArrendador: string;
  numDocArrendador: string;
  telefonoArrendador: string;
  nombreArrendatario: string;
  tipoDocArrendatario: string;
  numDocArrendatario: string;
  telefonoArrendatario: string;
  direccionInmueble: string;
  matriculaInmobiliaria: string;
  canonMensual: number;
  diaLimitePago: number;
  formaPagoCanon: string;
  duracionMeses: number;
  fechaInicio: string;
  fechaFin: string;
  cuotaAdministracion: number;
  responsableServicios: string;
  montoDepositoGarantia: number;
}

// 9. Acta de Entrega de Inmueble
export interface ActaEntregaData {
  ciudad: string;
  fecha: string;
  hora: string;
  direccionInmueble: string;
  nombreEntrega: string;
  calidadEntrega: 'Arrendatario' | 'Arrendador';
  docEntrega: string;
  nombreRecibe: string;
  calidadRecibe: 'Arrendador / Propietario' | 'Arrendatario';
  docRecibe: string;
  juegosLlavesEntregados: number;
  estadoGeneralParedesPisos: string;
  lecturaAgua: string;
  lecturaEnergia: string;
  lecturaGas: string;
  pazSalvosPresentados: string[];
  observacionesPendientes: string;
}

// 10. Derecho de Petición
export interface DerechoPeticionData {
  ciudad: string;
  fecha: string;
  tipoEntidad: 'Salud / EPS' | 'Servicios Públicos' | 'Entidad Financiera / Banco' | 'Entidad Pública General';
  entidadDestinataria: string;
  dependenciaDestinataria: string;
  cargoDestinatario: string;
  direccionEntidad: string;
  correoEntidad: string;
  nombrePeticionario: string;
  tipoDocumento: string;
  numeroDocumento: string;
  lugarExpedicion: string;
  telefono: string;
  correo: string;
  direccionNotificacion: string;
  ciudadNotificacion: string;
  asunto: string;
  referencia: string;
  hechos: string[];
  pretensiones: string[];
  fundamentosDerecho: string;
  anexos: string[];
  plazoRespuestaDias: number;
}

// 11. Poder Especial / Autorización
export interface PoderAutorizacionData {
  ciudad: string;
  fecha: string;
  nombreOtorgante: string;
  tipoDocOtorgante: string;
  numDocOtorgante: string;
  expedicionOtorgante: string;
  domicilioOtorgante: string;
  telefonoOtorgante: string;
  nombreApoderado: string;
  tipoDocApoderado: string;
  numDocApoderado: string;
  expedicionApoderado: string;
  telefonoApoderado: string;
  entidadTramite: string;
  objetoAutorizacion: string;
  facultadesEspecificas: string[];
  vigenciaTexto: string;
  incluirRecuadroHuella: boolean;
  notaLegal: string;
}

// 12. Solicitud Habeas Data
export interface HabeasDataData {
  ciudad: string;
  fecha: string;
  centralDeRiesgo: 'DataCrédito Experian' | 'TransUnion / CIFIN' | 'Procrédito' | 'Entidad Financiera Directa';
  entidadReportante: string;
  nombreTitular: string;
  tipoDocTitular: string;
  numDocTitular: string;
  expedicionTitular: string;
  telefonoTitular: string;
  correoTitular: string;
  direccionNotificacion: string;
  numeroObligacion: string;
  causalSolicitud: 'caducidad' | 'suplantacion' | 'pago_total' | 'inexistencia';
  hechosDetallados: string;
  pretensionConcreta: string;
  anexosDocumentales: string[];
}

// All documents state container
export interface AllDocumentsData {
  cuentaCobro: CuentaCobroData;
  propuestaServicios: PropuestaServiciosData;
  contratoPrestacion: ContratoPrestacionData;
  cartaRenuncia: CartaRenunciaData;
  certificadoLaboral: CertificadoLaboralData;
  permisoLaboral: PermisoLaboralData;
  noRenovacionArriendo: NoRenovacionArriendoData;
  contratoArrendamiento: ContratoArrendamientoData;
  actaEntrega: ActaEntregaData;
  derechoPeticion: DerechoPeticionData;
  poderAutorizacion: PoderAutorizacionData;
  habeasData: HabeasDataData;
}

// Master state representing all documents stored in localStorage (Key: tramite_facil_state_v1)
export interface AppStorageState {
  version: string;
  selectedDocId: DocumentType | null;
  currentView: 'catalog' | 'editor';
  styleConfig: DocumentStyleConfig;
  documents: AllDocumentsData;
}
