import { DocumentType, AllDocumentsData, DocumentMeta } from '../types/documents';
import { DocumentDefinition } from './types';
import { cuentaCobroDefinition } from './freelance/cuenta_cobro';
import { propuestaServiciosDefinition } from './freelance/propuesta_servicios';
import { cartaRenunciaDefinition } from './laboral/carta_renuncia';
import { certificadoLaboralDefinition } from './laboral/certificado_laboral';
import { permisoLaboralDefinition } from './laboral/permiso_laboral';
import { liquidacionLaboralDefinition } from './laboral/liquidacion_laboral';
import { memorandoLlamadoAtencionDefinition } from './laboral/memorando_llamado_atencion';
import { otrosiLaboralDefinition } from './laboral/otrosi_laboral';
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
import { documentoFormalDefinition } from './legal/documento_formal';

export type AnyDocumentDefinition = DocumentDefinition<any>;

export const DOC_TYPE_TO_DATA_KEY: Record<DocumentType, string> = {
  cuenta_cobro: 'cuentaCobro',
  propuesta_servicios: 'propuestaServicios',
  contrato_prestacion: 'contratoPrestacion',
  carta_renuncia: 'cartaRenuncia',
  certificado_laboral: 'certificadoLaboral',
  permiso_laboral: 'permisoLaboral',
  liquidacion_laboral: 'liquidacionLaboral',
  memorando_llamado_atencion: 'memorandoLlamadoAtencion',
  otrosi_laboral: 'otrosiLaboral',
  no_renovacion_arriendo: 'noRenovacionArriendo',
  contrato_arrendamiento: 'contratoArrendamiento',
  acta_entrega: 'actaEntrega',
  derecho_peticion: 'derechoPeticion',
  poder_autorizacion: 'poderAutorizacion',
  habeas_data: 'habeasData',
  acuerdo_nda: 'acuerdoNda',
  compraventa_vehiculo: 'compraventaVehiculo',
  autorizacion_patios: 'autorizacionPatios',
  documento_formal: 'documentoFormal',
};

export const DOCUMENT_DEFINITIONS: Record<DocumentType, AnyDocumentDefinition> = {
  // Freelance
  cuenta_cobro: cuentaCobroDefinition,
  propuesta_servicios: propuestaServiciosDefinition,

  // Laboral
  carta_renuncia: cartaRenunciaDefinition,
  certificado_laboral: certificadoLaboralDefinition,
  permiso_laboral: permisoLaboralDefinition,
  liquidacion_laboral: liquidacionLaboralDefinition,
  memorando_llamado_atencion: memorandoLlamadoAtencionDefinition,
  otrosi_laboral: otrosiLaboralDefinition,

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

  // Universal / IA
  documento_formal: documentoFormalDefinition,
};

export function getDocumentDefinition(docType: DocumentType): AnyDocumentDefinition {
  return DOCUMENT_DEFINITIONS[docType];
}

export const DOCUMENT_CATALOG: DocumentMeta[] = Object.values(DOCUMENT_DEFINITIONS).map(
  (def) => def.meta
);

export function registerDocumentDefinition(def: AnyDocumentDefinition): void {
  const id = def.meta.id;
  DOCUMENT_DEFINITIONS[id] = def;
  if (def.dataKey) {
    DOC_TYPE_TO_DATA_KEY[id] = def.dataKey;
  }
  const existingIdx = DOCUMENT_CATALOG.findIndex((m) => m.id === id);
  if (existingIdx >= 0) {
    DOCUMENT_CATALOG[existingIdx] = def.meta;
  } else {
    DOCUMENT_CATALOG.push(def.meta);
  }
}
