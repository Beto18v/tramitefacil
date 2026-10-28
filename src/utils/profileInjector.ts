import { UserProfile, DocumentType, AllDocumentsData } from '../types/documents';

export const USER_PROFILE_STORAGE_KEY = 'tramitefacil_profile_v1';

export const defaultUserProfile: UserProfile = {
  nombreCompleto: '',
  tipoDocumento: 'Cédula de Ciudadanía',
  numeroDocumento: '',
  expedicionDocumento: '',
  ciudad: '',
  telefono: '',
  correo: '',
  direccion: '',
  cargoOProfesion: '',
  banco: '',
  tipoCuenta: 'Ahorros',
  numeroCuenta: '',
};

export function loadUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultUserProfile, ...parsed };
    }
  } catch (e) {
    console.warn('Error loading user profile:', e);
  }
  return null;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Error saving user profile:', e);
  }
}

/**
 * Injects user profile fields into any of the 12 document schemas
 */
export function injectProfileIntoDocument(
  docType: DocumentType,
  currentData: AllDocumentsData,
  profile: UserProfile
): AllDocumentsData {
  const updated = { ...currentData };

  switch (docType) {
    case 'cuenta_cobro': {
      updated.cuentaCobro = {
        ...updated.cuentaCobro,
        nombreContratista: profile.nombreCompleto || updated.cuentaCobro.nombreContratista,
        tipoDocumentoContratista: profile.tipoDocumento || updated.cuentaCobro.tipoDocumentoContratista,
        numeroDocumentoContratista: profile.numeroDocumento || updated.cuentaCobro.numeroDocumentoContratista,
        expedicionContratista: profile.expedicionDocumento || updated.cuentaCobro.expedicionContratista,
        ciudad: profile.ciudad || updated.cuentaCobro.ciudad,
        telefonoContratista: profile.telefono || updated.cuentaCobro.telefonoContratista,
        correoContratista: profile.correo || updated.cuentaCobro.correoContratista,
        direccionContratista: profile.direccion || updated.cuentaCobro.direccionContratista,
        banco: profile.banco || updated.cuentaCobro.banco,
        tipoCuenta: profile.tipoCuenta || updated.cuentaCobro.tipoCuenta,
        numeroCuenta: profile.numeroCuenta || updated.cuentaCobro.numeroCuenta,
        titularCuenta: profile.nombreCompleto || updated.cuentaCobro.titularCuenta,
      };
      break;
    }
    case 'propuesta_servicios': {
      updated.propuestaServicios = {
        ...updated.propuestaServicios,
        nombreProponente: profile.nombreCompleto || updated.propuestaServicios.nombreProponente,
        identificacionProponente: profile.numeroDocumento || updated.propuestaServicios.identificacionProponente,
        profesionProponente: profile.cargoOProfesion || updated.propuestaServicios.profesionProponente,
        ciudad: profile.ciudad || updated.propuestaServicios.ciudad,
        telefonoProponente: profile.telefono || updated.propuestaServicios.telefonoProponente,
        correoProponente: profile.correo || updated.propuestaServicios.correoProponente,
      };
      break;
    }
    case 'contrato_prestacion': {
      updated.contratoPrestacion = {
        ...updated.contratoPrestacion,
        nombreContratista: profile.nombreCompleto || updated.contratoPrestacion.nombreContratista,
        tipoDocContratista: profile.tipoDocumento || updated.contratoPrestacion.tipoDocContratista,
        numDocContratista: profile.numeroDocumento || updated.contratoPrestacion.numDocContratista,
        domicilioContratista: profile.direccion || profile.ciudad || updated.contratoPrestacion.domicilioContratista,
      };
      break;
    }
    case 'carta_renuncia': {
      updated.cartaRenuncia = {
        ...updated.cartaRenuncia,
        nombreTrabajador: profile.nombreCompleto || updated.cartaRenuncia.nombreTrabajador,
        tipoDocumento: profile.tipoDocumento || updated.cartaRenuncia.tipoDocumento,
        numeroDocumento: profile.numeroDocumento || updated.cartaRenuncia.numeroDocumento,
        ciudad: profile.ciudad || updated.cartaRenuncia.ciudad,
        cargoTrabajador: profile.cargoOProfesion || updated.cartaRenuncia.cargoTrabajador,
      };
      break;
    }
    case 'certificado_laboral': {
      updated.certificadoLaboral = {
        ...updated.certificadoLaboral,
        nombreTrabajador: profile.nombreCompleto || updated.certificadoLaboral.nombreTrabajador,
        tipoDocumento: profile.tipoDocumento || updated.certificadoLaboral.tipoDocumento,
        numeroDocumento: profile.numeroDocumento || updated.certificadoLaboral.numeroDocumento,
        ciudad: profile.ciudad || updated.certificadoLaboral.ciudad,
        cargoDesempenado: profile.cargoOProfesion || updated.certificadoLaboral.cargoDesempenado,
        correoEntrega: profile.correo || updated.certificadoLaboral.correoEntrega,
      };
      break;
    }
    case 'permiso_laboral': {
      updated.permisoLaboral = {
        ...updated.permisoLaboral,
        nombreEmpleado: profile.nombreCompleto || updated.permisoLaboral.nombreEmpleado,
        tipoDocumento: profile.tipoDocumento || updated.permisoLaboral.tipoDocumento,
        numeroDocumento: profile.numeroDocumento || updated.permisoLaboral.numeroDocumento,
        ciudad: profile.ciudad || updated.permisoLaboral.ciudad,
        cargoEmpleado: profile.cargoOProfesion || updated.permisoLaboral.cargoEmpleado,
      };
      break;
    }
    case 'no_renovacion_arriendo': {
      updated.noRenovacionArriendo = {
        ...updated.noRenovacionArriendo,
        nombreRemitente: profile.nombreCompleto || updated.noRenovacionArriendo.nombreRemitente,
        tipoDocRemitente: profile.tipoDocumento || updated.noRenovacionArriendo.tipoDocRemitente,
        numDocRemitente: profile.numeroDocumento || updated.noRenovacionArriendo.numDocRemitente,
        ciudad: profile.ciudad || updated.noRenovacionArriendo.ciudad,
        telefonoRemitente: profile.telefono || updated.noRenovacionArriendo.telefonoRemitente,
        correoRemitente: profile.correo || updated.noRenovacionArriendo.correoRemitente,
      };
      break;
    }
    case 'contrato_arrendamiento': {
      updated.contratoArrendamiento = {
        ...updated.contratoArrendamiento,
        nombreArrendador: profile.nombreCompleto || updated.contratoArrendamiento.nombreArrendador,
        tipoDocArrendador: profile.tipoDocumento || updated.contratoArrendamiento.tipoDocArrendador,
        numDocArrendador: profile.numeroDocumento || updated.contratoArrendamiento.numDocArrendador,
        telefonoArrendador: profile.telefono || updated.contratoArrendamiento.telefonoArrendador,
      };
      break;
    }
    case 'acta_entrega': {
      updated.actaEntrega = {
        ...updated.actaEntrega,
        nombreEntrega: profile.nombreCompleto || updated.actaEntrega.nombreEntrega,
        docEntrega: profile.numeroDocumento || updated.actaEntrega.docEntrega,
        ciudad: profile.ciudad || updated.actaEntrega.ciudad,
      };
      break;
    }
    case 'derecho_peticion': {
      updated.derechoPeticion = {
        ...updated.derechoPeticion,
        nombrePeticionario: profile.nombreCompleto || updated.derechoPeticion.nombrePeticionario,
        tipoDocumento: profile.tipoDocumento || updated.derechoPeticion.tipoDocumento,
        numeroDocumento: profile.numeroDocumento || updated.derechoPeticion.numeroDocumento,
        lugarExpedicion: profile.expedicionDocumento || updated.derechoPeticion.lugarExpedicion,
        ciudad: profile.ciudad || updated.derechoPeticion.ciudad,
        telefono: profile.telefono || updated.derechoPeticion.telefono,
        correo: profile.correo || updated.derechoPeticion.correo,
        direccionNotificacion: profile.direccion || updated.derechoPeticion.direccionNotificacion,
        ciudadNotificacion: profile.ciudad || updated.derechoPeticion.ciudadNotificacion,
      };
      break;
    }
    case 'poder_autorizacion': {
      updated.poderAutorizacion = {
        ...updated.poderAutorizacion,
        nombreOtorgante: profile.nombreCompleto || updated.poderAutorizacion.nombreOtorgante,
        tipoDocOtorgante: profile.tipoDocumento || updated.poderAutorizacion.tipoDocOtorgante,
        numDocOtorgante: profile.numeroDocumento || updated.poderAutorizacion.numDocOtorgante,
        expedicionOtorgante: profile.expedicionDocumento || updated.poderAutorizacion.expedicionOtorgante,
        domicilioOtorgante: profile.direccion || profile.ciudad || updated.poderAutorizacion.domicilioOtorgante,
        telefonoOtorgante: profile.telefono || updated.poderAutorizacion.telefonoOtorgante,
        ciudad: profile.ciudad || updated.poderAutorizacion.ciudad,
      };
      break;
    }
    case 'habeas_data': {
      updated.habeasData = {
        ...updated.habeasData,
        nombreTitular: profile.nombreCompleto || updated.habeasData.nombreTitular,
        tipoDocTitular: profile.tipoDocumento || updated.habeasData.tipoDocTitular,
        numDocTitular: profile.numeroDocumento || updated.habeasData.numDocTitular,
        expedicionTitular: profile.expedicionDocumento || updated.habeasData.expedicionTitular,
        ciudad: profile.ciudad || updated.habeasData.ciudad,
        telefonoTitular: profile.telefono || updated.habeasData.telefonoTitular,
        correoTitular: profile.correo || updated.habeasData.correoTitular,
        direccionNotificacion: profile.direccion || updated.habeasData.direccionNotificacion,
      };
      break;
    }
    case 'acuerdo_nda': {
      updated.acuerdoNda = {
        ...updated.acuerdoNda,
        nombreParteEmisora: profile.nombreCompleto || updated.acuerdoNda.nombreParteEmisora,
        tipoDocEmisora: profile.tipoDocumento || updated.acuerdoNda.tipoDocEmisora,
        numDocEmisora: profile.numeroDocumento || updated.acuerdoNda.numDocEmisora,
        domicilioEmisora: profile.direccion || profile.ciudad || updated.acuerdoNda.domicilioEmisora,
        ciudad: profile.ciudad || updated.acuerdoNda.ciudad,
      };
      break;
    }
    case 'compraventa_vehiculo': {
      updated.compraventaVehiculo = {
        ...updated.compraventaVehiculo,
        nombreVendedor: profile.nombreCompleto || updated.compraventaVehiculo.nombreVendedor,
        tipoDocVendedor: profile.tipoDocumento || updated.compraventaVehiculo.tipoDocVendedor,
        numDocVendedor: profile.numeroDocumento || updated.compraventaVehiculo.numDocVendedor,
        telefonoVendedor: profile.telefono || updated.compraventaVehiculo.telefonoVendedor,
        direccionVendedor: profile.direccion || updated.compraventaVehiculo.direccionVendedor,
        ciudad: profile.ciudad || updated.compraventaVehiculo.ciudad,
      };
      break;
    }
    case 'autorizacion_patios': {
      updated.autorizacionPatios = {
        ...updated.autorizacionPatios,
        nombrePropietario: profile.nombreCompleto || updated.autorizacionPatios.nombrePropietario,
        tipoDocPropietario: profile.tipoDocumento || updated.autorizacionPatios.tipoDocPropietario,
        numDocPropietario: profile.numeroDocumento || updated.autorizacionPatios.numDocPropietario,
        telefonoPropietario: profile.telefono || updated.autorizacionPatios.telefonoPropietario,
        ciudad: profile.ciudad || updated.autorizacionPatios.ciudad,
      };
      break;
    }
  }

  // If user profile has a saved signature, inject it
  if (profile.signatureDataUrl) {
    const docKeyMap: Record<DocumentType, keyof AllDocumentsData> = {
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
    const key = docKeyMap[docType];
    if (key && updated[key]) {
      const docWithSig = updated[key] as { signatureType?: 'text' | 'draw'; signatureDataUrl?: string };
      docWithSig.signatureType = 'draw';
      docWithSig.signatureDataUrl = profile.signatureDataUrl;
    }
  }

  return updated;
}
