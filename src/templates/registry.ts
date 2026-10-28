import { DocumentType, AllDocumentsData } from '../types/documents';
import { DocumentDefinition } from './types';
import { cuentaCobroDefinition } from './freelance/cuenta_cobro';
import { propuestaServiciosDefinition } from './freelance/propuesta_servicios';
import { cartaRenunciaDefinition } from './laboral/carta_renuncia';
import { certificadoLaboralDefinition } from './laboral/certificado_laboral';
import { permisoLaboralDefinition } from './laboral/permiso_laboral';
import { contratoArrendamientoDefinition } from './inmobiliario/contrato_arrendamiento';
import { noRenovacionArriendoDefinition } from './inmobiliario/no_renovacion_arriendo';
import { actaEntregaDefinition } from './inmobiliario/acta_entrega';
import { contratoPrestacionDefinition } from './comercial/contrato_prestacion';
import { acuerdoNdaDefinition } from './comercial/acuerdo_nda';
import { derechoPeticionDefinition } from './legal/derecho_peticion';
import { poderAutorizacionDefinition } from './legal/poder_autorizacion';
import { habeasDataDefinition } from './legal/habeas_data';
import { compraventaVehiculoDefinition } from './vehiculos/compraventa_vehiculo';
import { autorizacionPatiosDefinition } from './vehiculos/autorizacion_patios';

export type AnyDocumentDefinition = DocumentDefinition<any>;

export const DOC_TYPE_TO_DATA_KEY: Record<DocumentType, keyof AllDocumentsData> = {
  cuenta_cobro: 'cuentaCobro',
  propuesta_servicios: 'propuestaServicios',
  contrato_prestacion: 'contratoPrestacion',
  carta_renuncia: 'cartaRenuncia',
  certificado_laboral: 'certificadoLaboral',
  permiso_laboral: 'permisoLaboral',
  no_renovacion_arriendo: 'noRenovacionArriendo',
  contrato_arrendamiento: 'contratoArrendamiento',
  acta_entrega: 'actaEntrega',
  derecho_peticion: 'derechoPeticion',
  poder_autorizacion: 'poderAutorizacion',
  habeas_data: 'habeasData',
  acuerdo_nda: 'acuerdoNda',
  compraventa_vehiculo: 'compraventaVehiculo',
  autorizacion_patios: 'autorizacionPatios',
};

export const DOCUMENT_DEFINITIONS: Record<DocumentType, AnyDocumentDefinition> = {
  // Freelance
  cuenta_cobro: cuentaCobroDefinition,
  propuesta_servicios: propuestaServiciosDefinition,

  // Laboral
  carta_renuncia: cartaRenunciaDefinition,
  certificado_laboral: certificadoLaboralDefinition,
  permiso_laboral: permisoLaboralDefinition,

  // Inmobiliario
  contrato_arrendamiento: contratoArrendamientoDefinition,
  no_renovacion_arriendo: noRenovacionArriendoDefinition,
  acta_entrega: actaEntregaDefinition,

  // Comercial
  contrato_prestacion: contratoPrestacionDefinition,
  acuerdo_nda: acuerdoNdaDefinition,

  // Legal
  derecho_peticion: derechoPeticionDefinition,
  poder_autorizacion: poderAutorizacionDefinition,
  habeas_data: habeasDataDefinition,

  // Vehículos
  compraventa_vehiculo: compraventaVehiculoDefinition,
  autorizacion_patios: autorizacionPatiosDefinition,
};

export function getDocumentDefinition(docType: DocumentType): AnyDocumentDefinition {
  return DOCUMENT_DEFINITIONS[docType];
}
