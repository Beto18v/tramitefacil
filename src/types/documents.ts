export type DocumentCategory =
  | 'freelance'
  | 'laboral'
  | 'inmobiliario'
  | 'comercial'
  | 'legal'
  | 'vehiculos';

export type DocumentType =
  // Freelance & Finanzas
  | 'cuenta_cobro'
  | 'propuesta_servicios'
  // Laboral & Talento Humano
  | 'carta_renuncia'
  | 'certificado_laboral'
  | 'permiso_laboral'
  | 'liquidacion_laboral'
  | 'memorando_llamado_atencion'
  | 'otrosi_laboral'
  // Inmobiliario & Arriendos
  | 'contrato_arrendamiento'
  | 'no_renovacion_arriendo'
  | 'acta_entrega'
  | 'prorroga_arrendamiento'
  | 'recibo_pago_canon'
  // Comercial & Contratos
  | 'contrato_prestacion'
  | 'acuerdo_nda'
  | 'pagare_instrucciones'
  | 'paz_y_salvo'
  // Trámites Administrativos
  | 'derecho_peticion'
  | 'poder_autorizacion'
  | 'habeas_data'
  | 'impugnacion_fotomultas'
  | 'reclamo_servicios_publicos'
  // Vehículos
  | 'compraventa_vehiculo'
  | 'autorizacion_patios'
  // Documento a Medida / Oficio Universal
  | 'documento_formal'
  | (string & {});

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
    id: 'laboral',
    name: 'Laboral & Talento Humano',
    icon: 'Building2',
    tagline: 'Renuncias, constancias y licencias de trabajo',
    description: 'Cartas de renuncia con selector de exoneración de preaviso, solicitudes de certificado laboral y permisos remunerados.',
    colorTheme: {
      bg: 'bg-slate-100 dark:bg-slate-800/80',
      text: 'text-slate-700 dark:text-slate-300',
      border: 'border-slate-200 dark:border-slate-700/80',
      hoverBg: 'hover:border-slate-300 dark:hover:border-slate-600',
      accent: 'slate',
    },
    subfilters: ['Todos', 'Renuncias', 'Certificados', 'Permisos', 'Liquidaciones', 'Disciplinario', 'Modificaciones'],
  },
  {
    id: 'inmobiliario',
    name: 'Inmobiliario & Arriendos',
    icon: 'Home',
    tagline: 'Arriendos, vivienda y entrega de inmuebles',
    description: 'Contratos de vivienda urbana con fiador/codeudor solidario, avisos de no renovación y actas de entrega con inventario.',
    colorTheme: {
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200/60 dark:border-emerald-900/60',
      hoverBg: 'hover:border-emerald-300 dark:hover:border-emerald-700',
      accent: 'emerald',
    },
    subfilters: ['Todos', 'Arrendamiento', 'Terminación', 'Inventario'],
  },
  {
    id: 'comercial',
    name: 'Comercial & Contratos',
    icon: 'Handshake',
    tagline: 'Contratos de servicios y acuerdos de confidencialidad',
    description: 'Acuerdos de confidencialidad (NDA), contratos de prestación de servicios con cláusulas de propiedad intelectual y penalidades.',
    colorTheme: {
      bg: 'bg-slate-100 dark:bg-slate-800/80',
      text: 'text-slate-700 dark:text-slate-300',
      border: 'border-slate-200 dark:border-slate-700/80',
      hoverBg: 'hover:border-slate-300 dark:hover:border-slate-600',
      accent: 'slate',
    },
    subfilters: ['Todos', 'Contratos', 'Confidencialidad (NDA)', 'Constancias'],
  },
  {
    id: 'legal',
    name: 'Trámites Administrativos',
    icon: 'Scale',
    tagline: 'Derechos de petición, habeas data y poderes',
    description: 'Derechos de petición con hechos dinámicos y términos de ley, poderes especiales con recuadro de huella y reclamos Habeas Data.',
    colorTheme: {
      bg: 'bg-amber-50/70 dark:bg-amber-950/40',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200/60 dark:border-amber-900/60',
      hoverBg: 'hover:border-amber-300 dark:hover:border-amber-700',
      accent: 'amber',
    },
    subfilters: ['Todos', 'Peticiones', 'Poderes', 'Derechos Ciudadanos'],
  },
  {
    id: 'vehiculos',
    name: 'Vehículos',
    icon: 'Car',
    tagline: 'Compraventa automotriz y trámites de tránsito',
    description: 'Contrato formal de compraventa de carro o moto con paz y salvo de multas y autorizaciones de retiro de patios de tránsito.',
    colorTheme: {
      bg: 'bg-slate-100 dark:bg-slate-800/80',
      text: 'text-slate-700 dark:text-slate-300',
      border: 'border-slate-200 dark:border-slate-700/80',
      hoverBg: 'hover:border-slate-300 dark:hover:border-slate-600',
      accent: 'slate',
    },
    subfilters: ['Todos', 'Vehículos'],
  },
  {
    id: 'freelance',
    name: 'Freelance & Finanzas',
    icon: 'Briefcase',
    tagline: 'Cuentas de cobro, propuestas e ingresos',
    description: 'Cuentas de cobro multilínea con cálculo de retenciones (ReteFuente e ICA) y propuestas comerciales con hitos.',
    colorTheme: {
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200/60 dark:border-emerald-900/60',
      hoverBg: 'hover:border-emerald-300 dark:hover:border-emerald-700',
      accent: 'emerald',
    },
    subfilters: ['Todos', 'Cuentas de Cobro', 'Cotizaciones'],
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

// 6b. Liquidación Definitiva de Contrato Laboral
export interface LiquidacionLaboralData {
  ciudad: string;
  fecha: string;
  nombreEmpresa: string;
  nitEmpresa: string;
  ciudadEmpresa: string;
  nombreRepresentante: string;
  nombreTrabajador: string;
  tipoDocumento: string;
  numeroDocumento: string;
  cargoTrabajador: string;
  fechaIngreso: string;
  fechaRetiro: string;
  motivoRetiro: string;
  salarioBase: number;
  incluyeAuxilioTransporte: boolean;
  auxilioTransporte: number;
  salarioBaseLiquidacion: number;
  diasCesantias: number;
  diasPrima: number;
  diasVacaciones: number;
  cesantiasValor: number;
  interesesCesantiasValor: number;
  primaValor: number;
  vacacionesValor: number;
  otrosDevengos: number;
  descripcionOtrosDevengos: string;
  saludPensionDeducciones: number;
  otrasDeducciones: number;
  descripcionOtrasDeducciones: string;
  totalLiquidacion: number;
  totalEnLetras: string;
  pazYSalvoDeclaracion: string;
  incluirHuella: boolean;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 6c. Llamado de Atención y Memorando Disciplinario
export interface MemorandoLlamadoAtencionData {
  ciudad: string;
  fecha: string;
  numeroMemorando: string;
  nombreEmpresa: string;
  nitEmpresa: string;
  ciudadEmpresa: string;
  remitenteNombre: string;
  remitenteCargo: string;
  departamentoArea: string;
  nombreTrabajador: string;
  tipoDocumento: string;
  numeroDocumento: string;
  cargoTrabajador: string;
  tipoFalta:
    | 'retardo_injustificado'
    | 'inasistencia_injustificada'
    | 'incumplimiento_funciones'
    | 'conducta_inapropiada'
    | 'desacato_ordenes'
    | 'otro';
  fechaFalta: string;
  descripcionHechos: string;
  normaVulnerada: string;
  solicitaDescargos: boolean;
  fechaDescargos: string;
  horaDescargos: string;
  lugarDescargos: string;
  advertenciaReincidencia: string;
  copiaHojaVida: boolean;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 6d. Otrosí Modificatorio de Contrato de Trabajo
export interface OtrosiLaboralData {
  ciudad: string;
  fecha: string;
  numeroOtrosi: string;
  tipoContratoOriginal: string;
  fechaContratoOriginal: string;
  nombreEmpresa: string;
  nitEmpresa: string;
  nombreRepresentanteLegal: string;
  tipoDocRepresentante: string;
  numDocRepresentante: string;
  nombreTrabajador: string;
  tipoDocumento: string;
  numeroDocumento: string;
  cargoTrabajador: string;
  tipoModificacion:
    | 'ajuste_salarial'
    | 'cambio_cargo'
    | 'prorroga_vigencia'
    | 'cambio_lugar_modalidad'
    | 'otra';
  clausulaModificada: string;
  textoAnterior: string;
  textoNuevo: string;
  fechaVigenciaModificacion: string;
  incluyeRatificacion: boolean;
  ratificacionTexto: string;
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

// 13b. Pagaré con Carta de Instrucciones (Arts. 622 y 709 C.Co)
export interface PagareInstruccionesData {
  numeroPagare: string;
  ciudad: string;
  fechaSuscripcion: string;
  tipoVencimiento: 'fecha_fija' | 'a_la_vista' | 'segun_instrucciones';
  fechaVencimiento: string;

  // Acreedor / Tenedor legítimo
  nombreAcreedor: string;
  tipoDocAcreedor: string;
  numDocAcreedor: string;
  ciudadAcreedor: string;

  // Deudor / Otorgante
  nombreDeudor: string;
  tipoDocDeudor: string;
  numDocDeudor: string;
  direccionDeudor: string;
  ciudadDeudor: string;
  telefonoDeudor: string;
  correoDeudor?: string;

  // Codeudor / Avalista solidario (opcional)
  incluirCodeudor: boolean;
  nombreCodeudor?: string;
  tipoDocCodeudor?: string;
  numDocCodeudor?: string;
  direccionCodeudor?: string;
  ciudadCodeudor?: string;
  telefonoCodeudor?: string;
  correoCodeudor?: string;

  // Capital e intereses
  capital: number;
  capitalLetras?: string;
  tasaInteresCorrienteMensual: number;
  tasaInteresMora: string;
  clausulaAceleracion: boolean;
  renunciaRequerimientos: boolean;

  // Carta de Instrucciones
  incluirCartaInstrucciones: boolean;
  objetoCredito?: string;
  instruccionesLlenado: string;
  eventoExigibilidad: string;

  // Huella dactilar y firmas
  incluirHuella: boolean;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 13c. Certificado de Paz y Salvo General (Art. 1625 C.C.)
export interface PazYSalvoData {
  ciudad: string;
  fecha: string;
  numeroCertificado: string;

  // Emisor / Otorgante
  nombreEmisor: string;
  tipoDocEmisor: string;
  numDocEmisor: string;
  calidadEmisor: 'acreedor' | 'contratante' | 'prestador_servicios' | 'arrendador' | 'empresa' | 'otro';
  cargoEmisor?: string;
  telefonoEmisor?: string;
  correoEmisor?: string;
  direccionEmisor?: string;

  // Beneficiario
  nombreBeneficiario: string;
  tipoDocBeneficiario: string;
  numDocBeneficiario: string;
  calidadBeneficiario?: string;

  // Concepto u obligación
  tipoConcepto:
    | 'contrato_servicios'
    | 'obligacion_comercial'
    | 'entrega_inventario'
    | 'liquidacion_cuotas'
    | 'arrendamiento'
    | 'acuerdo_privado'
    | 'otro';
  conceptoPersonalizado?: string;
  referenciaContrato?: string;
  fechaAcuerdoOriginal?: string;
  montoTotalSaldado?: number;
  montoLetras?: string;
  detalleCumplimiento: string;

  // Declaración formal
  declaracionTexto: string;
  renunciaAcciones: boolean;
  incluyeNotaAclaratoria?: boolean;
  notaAclaratoria?: string;

  // Firma
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

// 16. Documento Formal y Oficio Personalizado con IA
export interface DocumentoFormalRecipient {
  name: string;
  titleOrCompany: string;
  address?: string;
}

export interface DocumentoFormalSignature {
  role: string;
  name: string;
  idNumber: string;
  phone?: string;
  email?: string;
}

export interface DocumentoFormalData {
  title: string;
  cityAndDate: string;
  recipient: DocumentoFormalRecipient;
  subject: string;
  openingGreeting: string;
  facts: string[];
  legalBasis: string[];
  petitions: string[];
  closing: string;
  signatures: DocumentoFormalSignature[];
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 17. Otrosí de Prórroga e Incremento de Arrendamiento
export interface ProrrogaArrendamientoData {
  ciudad: string;
  fecha: string;
  fechaContratoOriginal: string;
  numeroContratoOriginal?: string;
  direccionInmueble: string;
  ciudadInmueble: string;
  matriculaInmobiliaria?: string;
  usoInmueble: 'vivienda' | 'comercial';
  nombreArrendador: string;
  tipoDocArrendador: string;
  numDocArrendador: string;
  telefonoArrendador?: string;
  correoArrendador?: string;
  nombreArrendatario: string;
  tipoDocArrendatario: string;
  numDocArrendatario: string;
  telefonoArrendatario?: string;
  correoArrendatario?: string;
  incluyeCodeudor: boolean;
  nombreCodeudor?: string;
  tipoDocCodeudor?: string;
  numDocCodeudor?: string;
  telefonoCodeudor?: string;
  fechaInicioProrroga: string;
  fechaFinProrroga: string;
  duracionMeses: number;
  canonAnterior: number;
  porcentajeIncremento: number;
  nuevoCanon: number;
  nuevoCanonLetras?: string;
  formaDePago: string;
  cuentaBancariaPago?: string;
  ratificacionTexto: string;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 18. Recibo de Pago de Canon de Arrendamiento
export interface ReciboPagoCanonData {
  numeroConsecutivo: string;
  ciudad: string;
  fechaPago: string;
  nombreArrendador: string;
  tipoDocArrendador: string;
  numDocArrendador: string;
  telefonoArrendador?: string;
  nombreArrendatario: string;
  tipoDocArrendatario: string;
  numDocArrendatario: string;
  direccionInmueble: string;
  ciudadInmueble: string;
  periodoMes: string;
  valorCanon: number;
  incluyeAdministracion: boolean;
  valorAdministracion?: number;
  incluyeServicios: boolean;
  valorServicios?: number;
  otrosConceptosDescripcion?: string;
  valorOtrosConceptos?: number;
  valorTotal: number;
  valorTotalLetras?: string;
  formaPago: 'transferencia' | 'efectivo' | 'consignacion' | 'cheque';
  referenciaPago?: string;
  observaciones?: string;
  declaraPazYSalvo: boolean;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 19. Impugnación de Fotodetección y Fotomultas
export interface ImpugnacionFotomultasData {
  ciudad: string;
  fecha: string;
  organismoTransito: string;
  ciudadEntidad: string;
  nombreSolicitante: string;
  tipoDocSolicitante: string;
  numDocSolicitante: string;
  expedicionSolicitante?: string;
  direccionNotificacion: string;
  ciudadNotificacion: string;
  telefonoSolicitante: string;
  correoNotificacion: string;
  calidadSolicitante: 'propietario' | 'conductor_autorizado' | 'apoderado';
  numeroComparendo: string;
  fechaComparendo: string;
  horaComparendo?: string;
  placaVehiculo: string;
  lugarInfraccion: string;
  codigoInfraccion: string;
  descripcionInfraccion?: string;
  causalFaltaIdentificacion: boolean;
  causalFaltaNotificacion: boolean;
  causalCalibracionSenalizacion: boolean;
  hechosAdicionales?: string;
  solicitaExoneracion: boolean;
  solicitaArchivoComparendo: boolean;
  solicitaPruebaTecnica: boolean;
  peticionesAdicionales?: string;
  anexos?: string;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// 20. Reclamo y Derecho de Petición por Servicios Públicos
export interface ReclamoServiciosPublicosData {
  ciudad: string;
  fecha: string;
  empresaServicios: string;
  ciudadEmpresa: string;
  tipoServicio: 'energia' | 'acueducto' | 'gas' | 'aseo' | 'telecomunicaciones' | 'mixto';
  nombreUsuario: string;
  tipoDocUsuario: string;
  numDocUsuario: string;
  calidadUsuario: 'propietario' | 'suscriptor' | 'arrendatario' | 'usuario';
  cuentaContrato: string;
  direccionInmueble: string;
  ciudadInmueble: string;
  telefonoUsuario: string;
  correoNotificaciones: string;
  numeroFactura: string;
  periodoFacturado: string;
  valorReclamado: number;
  consumoHistoricoPromedio?: string;
  consumoCobrado?: string;
  motivoReclamo: 'desviacion_significativa' | 'cobro_no_autorizado' | 'cobro_servicio_no_prestado' | 'cobro_reiterado' | 'falla_prestacion' | 'otro';
  descripcionHechos: string;
  solicitaInvestigacionDesviacion: boolean;
  solicitaReliquidacion: boolean;
  solicitaNoSuspension: boolean;
  peticionesAdicionales?: string;
  anexos?: string;
  signatureType?: 'text' | 'draw';
  signatureDataUrl?: string;
}

// Master AllDocumentsData state container
export interface AllDocumentsData {
  [key: string]: any;
  cuentaCobro: CuentaCobroData;
  propuestaServicios: PropuestaServiciosData;
  contratoPrestacion: ContratoPrestacionData;
  cartaRenuncia: CartaRenunciaData;
  certificadoLaboral: CertificadoLaboralData;
  permisoLaboral: PermisoLaboralData;
  liquidacionLaboral?: LiquidacionLaboralData;
  memorandoLlamadoAtencion?: MemorandoLlamadoAtencionData;
  otrosiLaboral?: OtrosiLaboralData;
  noRenovacionArriendo: NoRenovacionArriendoData;
  contratoArrendamiento: ContratoArrendamientoData;
  actaEntrega: ActaEntregaData;
  prorrogaArrendamiento?: ProrrogaArrendamientoData;
  reciboPagoCanon?: ReciboPagoCanonData;
  derechoPeticion: DerechoPeticionData;
  poderAutorizacion: PoderAutorizacionData;
  habeasData: HabeasDataData;
  impugnacionFotomultas?: ImpugnacionFotomultasData;
  reclamoServiciosPublicos?: ReclamoServiciosPublicosData;
  acuerdoNda: AcuerdoNdaData;
  pagareInstrucciones?: PagareInstruccionesData;
  pazYSalvo?: PazYSalvoData;
  compraventaVehiculo: CompraventaVehiculoData;
  autorizacionPatios: AutorizacionPatiosData;
  documentoFormal: DocumentoFormalData;
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
