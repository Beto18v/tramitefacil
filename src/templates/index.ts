export * from './types';
export * from './registry';
export * from './factory';

// Freelance
export { cuentaCobroDefinition } from './freelance/cuenta_cobro';
export { propuestaServiciosDefinition } from './freelance/propuesta_servicios';

// Laboral
export { cartaRenunciaDefinition } from './laboral/carta_renuncia';
export { certificadoLaboralDefinition } from './laboral/certificado_laboral';
export { permisoLaboralDefinition } from './laboral/permiso_laboral';
export { liquidacionLaboralDefinition } from './laboral/liquidacion_laboral';
export { memorandoLlamadoAtencionDefinition } from './laboral/memorando_llamado_atencion';
export { otrosiLaboralDefinition } from './laboral/otrosi_laboral';

// Inmobiliario
export { contratoArrendamientoDefinition } from './inmobiliario/contrato_arrendamiento';
export { noRenovacionArriendoDefinition } from './inmobiliario/no_renovacion_arriendo';
export { actaEntregaDefinition } from './inmobiliario/acta_entrega';
export { prorrogaArrendamientoDefinition } from './inmobiliario/prorroga_arrendamiento';
export { reciboPagoCanonDefinition } from './inmobiliario/recibo_pago_canon';

// Comercial
export { contratoPrestacionDefinition } from './comercial/contrato_prestacion';
export { acuerdoNdaDefinition } from './comercial/acuerdo_nda';

// Legal
export { derechoPeticionDefinition } from './legal/derecho_peticion';
export { poderAutorizacionDefinition } from './legal/poder_autorizacion';
export { habeasDataDefinition } from './legal/habeas_data';
export { impugnacionFotomultasDefinition } from './legal/impugnacion_fotomultas';
export { reclamoServiciosPublicosDefinition } from './legal/reclamo_servicios_publicos';

// Vehículos
export { compraventaVehiculoDefinition } from './vehiculos/compraventa_vehiculo';
export { autorizacionPatiosDefinition } from './vehiculos/autorizacion_patios';
