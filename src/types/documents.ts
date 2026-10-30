export type DocumentCategory =
  | 'freelance'
  | 'laboral'
  | 'inmobiliario'
  | 'comercial'
  | 'legal'
  | 'vehiculos';

export type DocumentType =
  // Finanzas, Freelance & Honorarios
  | 'cuenta_cobro'
  | 'propuesta_servicios'
  // Laboral & Talento Humano
  | 'carta_renuncia'
  | 'certificado_laboral'
  | 'permiso_laboral'
  // Inmobiliario & Propiedad
  | 'contrato_arrendamiento'
  | 'no_renovacion_arriendo'
  | 'acta_entrega'
  // Comercial & Negocios
  | 'contrato_prestacion'
  | 'acuerdo_nda'
  // Trámites Ciudadanos & Legales
  | 'derecho_peticion'
  | 'poder_autorizacion'
  | 'habeas_data'
  // Vehículos & Transporte
  | 'compraventa_vehiculo'
  | 'autorizacion_patios';

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
  estimatedMinutes?: string;
  featuredTags?: string[];
  subfilter?: string;
}

export interface CategoryHubConfig {
  id: DocumentCategory;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  colorTheme: {
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
    accent: string;
  };
  subfilters: string[];
}

export const CATEGORIES_CONFIG: CategoryHubConfig[] = [
  {
    id: 'freelance',
    name: 'Finanzas, Freelance & Honorarios',
    icon: 'Briefcase',
    tagline: 'Cuentas de cobro, cotizaciones e ingresos',
    description: 'Cuentas de cobro multilínea con cálculo de retenciones (ReteFuente e ICA) y propuestas comerciales con hitos.',
    colorTheme: {
      bg: 'bg-indigo-50/70',
      text: 'text-indigo-700',
      border: 'border-indigo-100',
      hoverBg: 'hover:border-indigo-300',
      accent: 'indigo',
    },
    subfilters: ['Todos', 'Cuentas de Cobro', 'Cotizaciones'],
  },
  {
    id: 'laboral',
    name: 'Laboral & Talento Humano',
    icon: 'Building2',
    tagline: 'Renuncias, constancias y licencias de trabajo',
    description: 'Cartas de renuncia con selector de exoneración de preaviso, solicitudes de certificado laboral y permisos remunerados.',
    colorTheme: {
      bg: 'bg-blue-50/70',
      text: 'text-blue-700',
      border: 'border-blue-100',
      hoverBg: 'hover:border-blue-300',
      accent: 'blue',
    },
    subfilters: ['Todos', 'Renuncias', 'Certificados', 'Permisos'],
  },
  {
    id: 'inmobiliario',
    name: 'Inmobiliario & Propiedad',
    icon: 'Home',
    tagline: 'Vivienda, arrendamiento y entrega de inmuebles',
    description: 'Contratos de vivienda urbana con fiador/codeudor solidario, avisos de no renovación y actas de entrega con inventario.',
    colorTheme: {
      bg: 'bg-emerald-50/70',
      text: 'text-emerald-700',
      border: 'border-emerald-100',
      hoverBg: 'hover:border-emerald-300',
      accent: 'emerald',
    },
    subfilters: ['Todos', 'Arrendamiento', 'Terminación', 'Inventario'],
  },
  {
    id: 'comercial',
    name: 'Comercial & Negocios',
    icon: 'Handshake',
    tagline: 'Contratos mercantiles y acuerdos de confidencialidad',
    description: 'Acuerdos de confidencialidad (NDA), contratos de prestación de servicios con cláusulas de propiedad intelectual y penalidades.',
    colorTheme: {
      bg: 'bg-violet-50/70',
      text: 'text-violet-700',
      border: 'border-violet-100',
      hoverBg: 'hover:border-violet-300',
      accent: 'violet',
    },
    subfilters: ['Todos', 'Contratos', 'Confidencialidad (NDA)'],
  },
  {
    id: 'legal',
    name: 'Trámites Ciudadanos & Legales',
    icon: 'Scale',
    tagline: 'Peticiones, poderes y defensa de datos',
    description: 'Derechos de petición con hechos dinámicos y términos de ley, poderes especiales con recuadro de huella y reclamos Habeas Data.',
    colorTheme: {
      bg: 'bg-amber-50/70',
      text: 'text-amber-700',
      border: 'border-amber-100',
      hoverBg: 'hover:border-amber-300',
      accent: 'amber',
    },
    subfilters: ['Todos', 'Peticiones', 'Poderes', 'Habeas Data'],
  },
  {
    id: 'vehiculos',
    name: 'Vehículos & Transporte',
    icon: 'Car',
    tagline: 'Compraventa automotriz y trámites de tránsito',
    description: 'Contrato formal de compraventa de carro o moto con paz y salvo de multas y autorizaciones de retiro de patios de tránsito.',
    colorTheme: {
      bg: 'bg-sky-50/70',
      text: 'text-sky-700',
      border: 'border-sky-100',
      hoverBg: 'hover:border-sky-300',
      accent: 'sky',
    },
    subfilters: ['Todos', 'Compraventa', 'Tránsito & Patios'],
  },
];

// Document Style Options
export interface DocumentStyleConfig {
  fontFamily: 'serif' | 'sans';
  fontSize: 'compact' | 'normal' | 'spacious';
  paperSize: 'a4' | 'letter';
  includeWatermark?: boolean;
}

// Line Item Concept for multi-line documents
export interface ConceptoItem {
  id: string;
  descripcion: string;
  cantidad: number;
  valorUnitario: number;
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
  conceptos?: ConceptoItem[];
  usarConceptosMultiples?: boolean;
  periodoPrestacion: string;
  numeroContrato: string;
  valorSubtotal: number;
  aplicaReteFuente: boolean;
  porcentajeReteFuente: number;
  aplicaReteICA: boolean;
  porcentajeReteICA: number;
  moneda: string;
  incluirDatosBancarios: boolean;
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  titularCuenta: string;
  declaraSeguridadSocial: boolean;
  declaraNoResponsableIVA: boolean;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  conceptos?: ConceptoItem[];
  cronogramaSemanas: string;
  honorariosTotales: number;
  formaDePago: string;
  exclusionesYCondiciones: string;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  incluirConfidencialidad: boolean;
  clausulaPenalMonto: number;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  incluyeCodeudor: boolean;
  nombreCodeudor: string;
  tipoDocCodeudor: string;
  numDocCodeudor: string;
  telefonoCodeudor: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
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
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 13. Acuerdo de Confidencialidad (NDA)
export interface AcuerdoNdaData {
  ciudad: string;
  fecha: string;
  tipoNda: 'unilateral' | 'bilateral';
  nombreParteEmisora: string;
  tipoDocEmisora: string;
  numDocEmisora: string;
  domicilioEmisora: string;
  nombreParteReceptora: string;
  tipoDocReceptora: string;
  numDocReceptora: string;
  domicilioReceptora: string;
  propositoNegociacion: string;
  duracionAnos: number;
  clausulaPenalMonto: number;
  incluirExclusionesEstandar: boolean;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 14. Compraventa de Vehículo
export interface CompraventaVehiculoData {
  ciudad: string;
  fecha: string;
  nombreVendedor: string;
  tipoDocVendedor: string;
  numDocVendedor: string;
  telefonoVendedor: string;
  direccionVendedor: string;
  nombreComprador: string;
  tipoDocComprador: string;
  numDocComprador: string;
  telefonoComprador: string;
  direccionComprador: string;
  placa: string;
  marca: string;
  linea: string;
  modeloAnio: number;
  claseVehiculo: string;
  color: string;
  numeroMotor: string;
  numeroChasis: string;
  precioVenta: number;
  formaPago: string;
  soatVigenteHasta: string;
  tecnomecanicaHasta: string;
  gastosTraspasoPorcentajes: string;
  pazYSalvoMultas: boolean;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 15. Autorización de Patios
export interface AutorizacionPatiosData {
  ciudad: string;
  fecha: string;
  nombrePropietario: string;
  tipoDocPropietario: string;
  numDocPropietario: string;
  telefonoPropietario: string;
  nombreAutorizado: string;
  tipoDocAutorizado: string;
  numDocAutorizado: string;
  telefonoAutorizado: string;
  organismoTransito: string;
  patioUbicacion: string;
  placaVehiculo: string;
  marcaModelo: string;
  numeroComparendo: string;
  facultadesExpresas: string[];
  incluirRecuadroHuella: boolean;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// Master AllDocumentsData state container
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
  acuerdoNda: AcuerdoNdaData;
  compraventaVehiculo: CompraventaVehiculoData;
  autorizacionPatios: AutorizacionPatiosData;
}

// Master state stored in localStorage (Key: tramite_facil_state_v1)
export interface AppStorageState {
  version: string;
  selectedDocId: DocumentType | null;
  currentView: 'catalog' | 'editor';
  styleConfig: DocumentStyleConfig;
  documents: AllDocumentsData;
}

// User Profile stored in localStorage (Key: tramitefacil_profile_v1)
export interface UserProfile {
  nombreCompleto: string;
  tipoDocumento: string;
  numeroDocumento: string;
  expedicionDocumento: string;
  ciudad: string;
  telefono: string;
  correo: string;
  direccion: string;
  cargoOProfesion: string;
  banco: string;
  tipoCuenta: 'Ahorros' | 'Corriente';
  numeroCuenta: string;
  signatureDataUrl?: string;
}
