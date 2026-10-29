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

export const DOCUMENT_CATALOG: DocumentMeta[] = [
  // Finanzas, Freelance & Honorarios
  {
    id: 'cuenta_cobro',
    title: 'Cuenta de Cobro / Honorarios Multilínea',
    shortTitle: 'Cuenta de Cobro',
    category: 'freelance',
    categoryName: 'Finanzas, Freelance & Honorarios',
    categoryIcon: 'Briefcase',
    description: 'Documento equivalente con desglose dinámico de múltiples conceptos, retención en la fuente (10%, 11%, 4% o personalizada) e ICA.',
    iconName: 'Receipt',
    lawReference: 'Art. 437 E.T. y Art. 1.6.1.4.12 D.U.R. 1625/2016',
    tags: ['cobro', 'honorarios', 'factura', 'prestación', 'cuenta', 'pago', 'retención', 'ica', 'multilínea'],
    estimatedMinutes: '2 min',
    featuredTags: ['Multilínea', 'Calcula retención', 'DUR 1625'],
    subfilter: 'Cuentas de Cobro',
  },
  {
    id: 'propuesta_servicios',
    title: 'Propuesta Comercial / Cotización de Servicios',
    shortTitle: 'Propuesta / Cotización',
    category: 'freelance',
    categoryName: 'Finanzas, Freelance & Honorarios',
    categoryIcon: 'Briefcase',
    description: 'Propuesta formal con desglose de entregables, fases del proyecto, cronograma en semanas y condiciones de pago.',
    iconName: 'FileSpreadsheet',
    lawReference: 'Código de Comercio - Oferta Mercantil (Art. 845)',
    tags: ['propuesta', 'cotización', 'servicios', 'alcance', 'presupuesto', 'comercial', 'fases'],
    estimatedMinutes: '3 min',
    featuredTags: ['Hitos de pago', 'Alcance técnico', 'Oferta mercantil'],
    subfilter: 'Cotizaciones',
  },

  // Laboral & Talento Humano
  {
    id: 'carta_renuncia',
    title: 'Carta de Renuncia Laboral con Preaviso',
    shortTitle: 'Carta de Renuncia',
    category: 'laboral',
    categoryName: 'Laboral & Talento Humano',
    categoryIcon: 'Building2',
    description: 'Carta de renuncia formal con switch de exoneración de preaviso legal, selector de motivos jurídicos rápidos y solicitud de liquidación.',
    iconName: 'UserMinus',
    lawReference: 'Código Sustantivo del Trabajo (C.S.T.)',
    tags: ['renuncia', 'retiro', 'trabajo', 'empleo', 'preaviso', 'liquidación', 'cst'],
    estimatedMinutes: '1 min',
    featuredTags: ['Exoneración preaviso', 'Liquidación de ley', 'CST'],
    subfilter: 'Renuncias',
  },
  {
    id: 'certificado_laboral',
    title: 'Solicitud de Certificado Laboral y Salarial',
    shortTitle: 'Certificado Laboral',
    category: 'laboral',
    categoryName: 'Laboral & Talento Humano',
    categoryIcon: 'Building2',
    description: 'Petición a recursos humanos para constancia con cargo desempeñado, salario, funciones y tiempo exacto de servicio.',
    iconName: 'Award',
    lawReference: 'Art. 57 Numeral 7 del Código Sustantivo del Trabajo',
    tags: ['certificado', 'constancia', 'laboral', 'salario', 'tiempo', 'cst', 'funciones'],
    estimatedMinutes: '2 min',
    featuredTags: ['Art. 57 CST', 'Salarial y funciones', 'Obligatorio'],
    subfilter: 'Certificados',
  },
  {
    id: 'permiso_laboral',
    title: 'Solicitud de Permiso o Licencia Laboral',
    shortTitle: 'Permiso / Licencia',
    category: 'laboral',
    categoryName: 'Laboral & Talento Humano',
    categoryIcon: 'Building2',
    description: 'Solicitud formal por calamidad doméstica, estudios, citas médicas, deberes ciudadanos o licencia no remunerada.',
    iconName: 'CalendarClock',
    lawReference: 'Art. 57 Numeral 6 del Código Sustantivo del Trabajo',
    tags: ['permiso', 'licencia', 'ausencia', 'calamidad', 'vacaciones', 'estudio'],
    estimatedMinutes: '2 min',
    featuredTags: ['Calamidad / Citas', 'Remunerada o no', 'CST'],
    subfilter: 'Permisos',
  },

  // Inmobiliario & Propiedad
  {
    id: 'contrato_arrendamiento',
    title: 'Contrato de Arrendamiento de Vivienda Urbana',
    shortTitle: 'Contrato de Arrendamiento',
    category: 'inmobiliario',
    categoryName: 'Inmobiliario & Propiedad',
    categoryIcon: 'Home',
    description: 'Contrato completo para casa o apartamento urbano con switch para fiador / codeudor solidario, cuota de administración y servicios.',
    iconName: 'KeyRound',
    lawReference: 'Ley 820 de 2003 y Código Civil',
    tags: ['contrato', 'arrendamiento', 'alquiler', 'canon', 'arrendador', 'inquilino', 'codeudor'],
    estimatedMinutes: '5 min',
    featuredTags: ['Con Fiador/Codeudor', 'Ley 820', 'Inventario'],
    subfilter: 'Arrendamiento',
  },
  {
    id: 'no_renovacion_arriendo',
    title: 'Notificación de No Renovación de Arrendamiento',
    shortTitle: 'No Renovación Arriendo',
    category: 'inmobiliario',
    categoryName: 'Inmobiliario & Propiedad',
    categoryIcon: 'Home',
    description: 'Aviso formal con preaviso legal de 3 meses para terminación o no prórroga de contrato de arrendamiento sin penalidad.',
    iconName: 'Home',
    lawReference: 'Ley 820 de 2003 (Régimen de Arrendamiento)',
    tags: ['arriendo', 'terminación', 'inmueble', 'desalojo', 'preaviso', 'casa'],
    estimatedMinutes: '2 min',
    featuredTags: ['Preaviso 3 meses', 'Ley 820 de 2003', 'Sin penalidad'],
    subfilter: 'Terminación',
  },
  {
    id: 'acta_entrega',
    title: 'Acta de Entrega y Estado de Inmueble',
    shortTitle: 'Acta de Entrega Inmueble',
    category: 'inmobiliario',
    categoryName: 'Inmobiliario & Propiedad',
    categoryIcon: 'Home',
    description: 'Constancia física de entrega de llaves, verificación del estado de paredes y pisos, inventario y lecturas de servicios públicos.',
    iconName: 'ClipboardCheck',
    lawReference: 'Ley 820 de 2003 y Acta Notarial / Civil',
    tags: ['acta', 'entrega', 'llaves', 'inventario', 'paz y salvo', 'restitución'],
    estimatedMinutes: '3 min',
    featuredTags: ['Paz y salvo', 'Lectura de servicios', 'Inventario'],
    subfilter: 'Inventario',
  },

  // Comercial & Negocios
  {
    id: 'contrato_prestacion',
    title: 'Contrato de Prestación de Servicios Profesionales',
    shortTitle: 'Contrato de Servicios',
    category: 'comercial',
    categoryName: 'Comercial & Negocios',
    categoryIcon: 'Handshake',
    description: 'Contrato civil y comercial con autonomía técnica, sin subordinación, con interruptores de confidencialidad y cláusula penal.',
    iconName: 'ScrollText',
    lawReference: 'Código Civil (Art. 1495) y Código de Comercio',
    tags: ['contrato', 'servicios', 'independiente', 'prestación', 'honorarios', 'autonomía', 'nda'],
    estimatedMinutes: '4 min',
    featuredTags: ['Sin subordinación', 'Cláusula penal', 'Confidencialidad'],
    subfilter: 'Contratos',
  },
  {
    id: 'acuerdo_nda',
    title: 'Acuerdo de Confidencialidad y No Divulgación (NDA)',
    shortTitle: 'Acuerdo NDA',
    category: 'comercial',
    categoryName: 'Comercial & Negocios',
    categoryIcon: 'Handshake',
    description: 'Pacto formal de protección de secretos comerciales, propiedad intelectual, información financiera y cláusula penal indemnizatoria.',
    iconName: 'ShieldCheck',
    lawReference: 'Decisión 486 CAN y Código de Comercio',
    tags: ['nda', 'confidencialidad', 'secreto', 'comercial', 'propiedad', 'negocios'],
    estimatedMinutes: '3 min',
    featuredTags: ['Protección de IP', 'Cláusula penal', 'Bilateral / Unilateral'],
    subfilter: 'Confidencialidad (NDA)',
  },

  // Trámites Ciudadanos & Legales
  {
    id: 'derecho_peticion',
    title: 'Derecho de Petición Estándar Multilinea',
    shortTitle: 'Derecho de Petición',
    category: 'legal',
    categoryName: 'Trámites Ciudadanos & Legales',
    categoryIcon: 'Scale',
    description: 'Petición formal basada en el Art. 23 de la Constitución con lista dinámica de hechos y pretensiones numeradas para salud, bancos o servicios.',
    iconName: 'FileText',
    lawReference: 'Artículo 23 Constitución Política y Ley 1755 de 2015',
    tags: ['petición', 'reclamo', 'eps', 'banco', 'salud', 'pqrs', 'ley 1755', 'hechos'],
    estimatedMinutes: '3 min',
    featuredTags: ['Hechos dinámicos', 'Término 15 días', 'Art. 23 C.P.'],
    subfilter: 'Peticiones',
  },
  {
    id: 'poder_autorizacion',
    title: 'Poder Especial / Autorización Amplia a Terceros',
    shortTitle: 'Poder Especial / Autorización',
    category: 'legal',
    categoryName: 'Trámites Ciudadanos & Legales',
    categoryIcon: 'Scale',
    description: 'Mandato con facultades expresas de radicación, firma y retiro, incluyendo espacio para firma y recuadro de huella dactilar.',
    iconName: 'Fingerprint',
    lawReference: 'Art. 2142 y ss. Código Civil y C.G.P.',
    tags: ['poder', 'autorización', 'trámite', 'tercero', 'huella', 'diligencia'],
    estimatedMinutes: '2 min',
    featuredTags: ['Facultades expresas', 'Huella dactilar', 'Código Civil'],
    subfilter: 'Poderes',
  },
  {
    id: 'habeas_data',
    title: 'Solicitud de Habeas Data para eliminación de reportes',
    shortTitle: 'Habeas Data (Reportes)',
    category: 'legal',
    categoryName: 'Trámites Ciudadanos & Legales',
    categoryIcon: 'Scale',
    description: 'Petición para eliminación, rectificación o caducidad de reportes ante DataCrédito, TransUnion/CIFIN o Procrédito.',
    iconName: 'ShieldAlert',
    lawReference: 'Ley 1266 de 2008 y Ley 2157 de 2021 (Borrón y Cuenta Nueva)',
    tags: ['datacredito', 'cifin', 'habeas data', 'reporte', 'datacrédito', 'centrales'],
    estimatedMinutes: '3 min',
    featuredTags: ['Borrón y Cuenta Nueva', 'Ley 2157', 'Centrales de riesgo'],
    subfilter: 'Habeas Data',
  },

  // Vehículos & Transporte
  {
    id: 'compraventa_vehiculo',
    title: 'Contrato de Compraventa de Vehículo Automotor',
    shortTitle: 'Compraventa Vehículo',
    category: 'vehiculos',
    categoryName: 'Vehículos & Transporte',
    categoryIcon: 'Car',
    description: 'Contrato de venta de automóvil o motocicleta con placas, motor, chasis, saneamiento por multas e impuestos, y pacto de traspaso.',
    iconName: 'Car',
    lawReference: 'Código de Comercio (Art. 905) y Ley 769 de 2002',
    tags: ['carro', 'moto', 'vehículo', 'compraventa', 'traspaso', 'placa', 'multas'],
    estimatedMinutes: '4 min',
    featuredTags: ['Saneamiento multas', 'Traspaso legal', 'SOAT y Tecno'],
    subfilter: 'Compraventa',
  },
  {
    id: 'autorizacion_patios',
    title: 'Autorización y Poder para Retiro de Vehículo en Patios',
    shortTitle: 'Autorización Patios',
    category: 'vehiculos',
    categoryName: 'Vehículos & Transporte',
    categoryIcon: 'Car',
    description: 'Poder formal dirigido al organismo de tránsito para autorizar a un tercero a retirar un automotor inmovilizado en patios.',
    iconName: 'Car',
    lawReference: 'Ley 769 de 2002 (Código Nacional de Tránsito)',
    tags: ['patios', 'inmovilizado', 'tránsito', 'comparendo', 'autorización', 'grúa'],
    estimatedMinutes: '2 min',
    featuredTags: ['Organismo de tránsito', 'Huella dactilar', 'Retiro de patios'],
    subfilter: 'Tránsito & Patios',
  },
];

// Document Style Options
export interface DocumentStyleConfig {
  fontFamily: 'serif' | 'sans';
  fontSize: 'compact' | 'normal' | 'spacious';
  paperSize: 'a4' | 'letter';
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
