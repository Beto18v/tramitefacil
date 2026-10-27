import { DocumentType } from '../types/documents';
import { numeroALetras, formatearMoneda, calcularTotalesCuentaCobro } from './numberToWords';

export function generarTextoPlano(docType: DocumentType, state: any): string {
  switch (docType) {
    case 'cuenta_cobro': {
      const d = state.cuenta_cobro || state.cuentaCobro;
      const { subtotal, reteFuente, reteICA, totalNeto } = calcularTotalesCuentaCobro(
        d.valorSubtotal || d.valorTotal || 0,
        d.aplicaReteFuente,
        d.porcentajeReteFuente,
        d.aplicaReteICA,
        d.porcentajeReteICA
      );
      const letras = numeroALetras(totalNeto, d.moneda || 'PESOS M/CTE.');

      return `CUENTA DE COBRO N° ${d.numeroConsecutivo || '001'}

Ciudad y Fecha: ${d.ciudad || 'Ciudad'}, ${d.fechaEmision || 'Fecha'}

DEBE A:
Contratista: ${d.nombreContratista || 'NOMBRE DEL CONTRATISTA'}
${d.tipoDocumentoContratista || 'C.C.'}: ${d.numeroDocumentoContratista || 'Documento'} de ${d.expedicionContratista || ''}
Teléfono: ${d.telefonoContratista || 'N/A'} | Correo: ${d.correoContratista || 'N/A'}
Dirección: ${d.direccionContratista || 'N/A'}

A FAVOR DE:
Cliente / Empresa: ${d.nombreCliente || 'NOMBRE DEL CLIENTE'}
${d.tipoDocumentoCliente || 'NIT'}: ${d.numeroDocumentoCliente || 'NIT'}
Ciudad: ${d.ciudadCliente || ''}

LIQUIDACIÓN:
Subtotal Honorarios: ${formatearMoneda(subtotal)}
${d.aplicaReteFuente ? `(-) Retención en la Fuente (${d.porcentajeReteFuente}%): ${formatearMoneda(reteFuente)}` : ''}
${d.aplicaReteICA ? `(-) Retención de ICA (${d.porcentajeReteICA}%): ${formatearMoneda(reteICA)}` : ''}
TOTAL NETO A PAGAR: ${formatearMoneda(totalNeto)}
SON: ${letras}

CONCEPTO:
${d.concepto || 'Prestación de servicios profesionales.'}

Período de prestación: ${d.periodoPrestacion || 'N/A'}
N° de Contrato / O.S.: ${d.numeroContrato || 'N/A'}

DATOS BANCARIOS:
Banco: ${d.banco || 'Bancolombia'} | Tipo: ${d.tipoCuenta || 'Ahorros'}
Número: ${d.numeroCuenta || 'XXXXXXXX'}
Titular: ${d.titularCuenta || d.nombreContratista || ''}

DECLARACIONES LEGALES:
${d.declaraSeguridadSocial ? '- Declaro bajo juramento haber realizado los aportes correspondientes a la Seguridad Social Integral (Salud, Pensión y Riesgos Laborales) de acuerdo a la normatividad legal vigente.' : ''}
${d.declaraNoResponsableIVA ? '- Manifiesto pertenecer al régimen de no responsables del Impuesto sobre las Ventas (IVA) conforme al Art. 437 del Estatuto Tributario.' : ''}

Atentamente,

_____________________________
${d.nombreContratista || 'FIRMA CONTRATISTA'}
${d.tipoDocumentoContratista}: ${d.numeroDocumentoContratista || ''}`;
    }

    case 'propuesta_servicios': {
      const d = state.propuesta_servicios || state.propuestaServicios;
      const entregablesTexto = (d.entregables || [])
        .filter((e: string) => e.trim() !== '')
        .map((e: string, i: number) => `${i + 1}. ${e}`)
        .join('\n');

      return `PROPUESTA COMERCIAL DE SERVICIOS PROFESIONALES

Fecha: ${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}
Validez de la oferta: ${d.validezDias || 15} días calendario

DE: ${d.nombreProponente || 'Proponente'} (${d.profesionProponente || 'Consultor'})
Identificación: ${d.identificacionProponente || ''}
Contacto: ${d.telefonoProponente || ''} | ${d.correoProponente || ''}

PARA: ${d.nombreCliente || 'Cliente'}
Empresa: ${d.empresaCliente || ''} (${d.cargoCliente || ''})

PROYECTO: ${d.tituloProyecto || 'Título de la Propuesta'}

1. OBJETIVO GENERAL:
${d.objetivoGeneral || ''}

2. ALCANCE DETALLADO:
${d.alcanceDetallado || ''}

3. ENTREGABLES:
${entregablesTexto}

4. CRONOGRAMA:
${d.cronogramaSemanas || ''}

5. CONDICIONES ECONÓMICAS:
Inversión total: ${formatearMoneda(d.honorariosTotales || 0)}
Forma de pago: ${d.formaDePago || ''}

6. EXCLUSIONES Y CONDICIONES:
${d.exclusionesYCondiciones || ''}

Atentamente,

_____________________________
${d.nombreProponente || 'FIRMA PROPONENTE'}
${d.identificacionProponente || ''}`;
    }

    case 'contrato_prestacion': {
      const d = state.contrato_prestacion || state.contratoPrestacion;
      const obligacionesTexto = (d.obligacionesContratista || [])
        .filter((o: string) => o.trim() !== '')
        .map((o: string, i: number) => `${i + 1}. ${o}`)
        .join('\n');

      return `CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES

Ciudad y Fecha: ${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Entre los suscritos a saber:
CONTRATANTE: ${d.nombreContratante || 'CONTRATANTE'}, identificado con ${d.tipoDocContratante} N° ${d.numDocContratante}, con domicilio en ${d.domicilioContratante}; y
CONTRATISTA: ${d.nombreContratista || 'CONTRATISTA'}, identificado con ${d.tipoDocContratista} N° ${d.numDocContratista}, con domicilio en ${d.domicilioContratista}, hemos acordado celebrar el presente contrato regido por las siguientes cláusulas:

PRIMERA. OBJETO:
${d.objetoContrato || ''}

SEGUNDA. OBLIGACIONES DEL CONTRATISTA:
${obligacionesTexto}

TERCERA. VALOR Y FORMA DE PAGO:
El valor total pactado es la suma de ${formatearMoneda(d.valorContrato || 0)}.
Forma de pago: ${d.formaPago || ''}

CUARTA. PLAZO DE EJECUCIÓN:
Desde el ${d.fechaInicio || 'Inicio'} hasta el ${d.fechaTerminacion || 'Terminación'}.
Lugar de ejecución: ${d.lugarEjecucion || ''}.

QUINTA. INDEPENDENCIA Y AUTONOMÍA:
${d.clausulaIndependencia ? 'El CONTRATISTA actuará con total autonomía técnica y directiva, sin que el presente acuerdo genere relación de subordinación ni vínculo laboral.' : ''}

SEXTA. CLÁUSULA PENAL:
En caso de incumplimiento grave, la parte que incumpla pagará a la otra a título de pena la suma de ${formatearMoneda(d.clausulaPenalMonto || 0)}.

Para constancia se firma por las partes:

CONTRATANTE:                              CONTRATISTA:
_____________________________             _____________________________
${d.nombreContratante || ''}               ${d.nombreContratista || ''}
${d.tipoDocContratante}: ${d.numDocContratante || ''}    ${d.tipoDocContratista}: ${d.numDocContratista || ''}`;
    }

    case 'carta_renuncia': {
      const d = state.carta_renuncia || state.cartaRenuncia;
      return `${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Señores:
${d.nombreEmpresa || 'EMPRESA'}
Atención: ${d.nombreDestinatario || ''}
${d.cargoDestinatario || 'Gestión Humana'} (${d.departamento || ''})

ASUNTO: Renuncia voluntaria e irrevocable al cargo de ${d.cargoTrabajador || 'Cargo'}

Respetados señores:

Por medio de la presente me permito comunicar mi decisión voluntaria de presentar renuncia irrevocable al cargo de ${d.cargoTrabajador || 'Cargo'} que he venido desempeñando en la empresa${d.fechaIngreso ? ` desde el ${d.fechaIngreso}` : ''}.

Mi último día laborable será el ${d.ultimoDiaLaboral || 'Fecha'}.
${d.solicitaExoneracionPreaviso ? 'Solicito comedidamente la exoneración del término legal de preaviso para hacer efectiva mi desvinculación en la fecha indicada.' : ''}

${d.motivoDetalle || ''}

${d.parrafoAgradecimiento || ''}

${d.ofrecimientoEmpalme ? 'Reitero mi completa disposición para realizar una entrega ordenada de funciones y proyectos.' : ''}
${d.solicitudLiquidacion ? 'Solicito la expedición del examen médico de retiro, certificado laboral y la respectiva liquidación definitiva de salarios y prestaciones sociales según el Código Sustantivo del Trabajo.' : ''}

Atentamente,

_____________________________
${d.nombreTrabajador || 'TRABAJADOR'}
${d.tipoDocumento}: ${d.numeroDocumento || ''}
${d.cargoTrabajador || ''}`;
    }

    case 'certificado_laboral': {
      const d = state.certificado_laboral || state.certificadoLaboral;
      return `${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Señores:
${d.nombreEmpresa || 'EMPRESA'}
Atención: ${d.destinatarioArea || 'Gestión Humana'}

ASUNTO: Solicitud de expedición de Certificado Laboral (Art. 57 Numeral 7 del C.S.T.)

Yo, ${d.nombreTrabajador || 'Nombre del Trabajador'}, identificado con ${d.tipoDocumento} N° ${d.numeroDocumento}, en calidad de empleado / ex-empleado de su compañía, acudo respetuosamente con el fin de solicitar la expedición de un certificado laboral formal.

Detalles requeridos:
- Cargo desempeñado: ${d.cargoDesempenado || ''}
- Período laborado: ${d.periodoTrabajado || ''}
${d.incluirSalario ? '- Se solicita incluir el salario básico y tipo de remuneración.' : ''}
${d.incluirFunciones ? '- Se solicita incluir el detalle de responsabilidades y funciones desempeñadas.' : ''}
Motivo: ${d.motivoSolicitud || 'Trámites personales'}

Agradezco enviar dicho certificado al correo electrónico: ${d.correoEntrega || ''}.

Atentamente,

_____________________________
${d.nombreTrabajador || 'FIRMA TRABAJADOR'}
${d.tipoDocumento}: ${d.numeroDocumento || ''}`;
    }

    case 'permiso_laboral': {
      const d = state.permiso_laboral || state.permisoLaboral;
      return `${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Señores:
${d.nombreEmpresa || 'EMPRESA'}
Atención: ${d.nombreJefe || 'Jefe Inmediato'} (${d.cargoJefe || ''})

ASUNTO: Solicitud de Permiso / Licencia Laboral

Yo, ${d.nombreEmpleado || 'Empleado'}, identificado con ${d.tipoDocumento} N° ${d.numeroDocumento}, desempeñando el cargo de ${d.cargoEmpleado || ''}, me permito solicitar formalmente autorización para ausentarme de mis labores.

Tipo de solicitud: ${d.tipoPermiso.toUpperCase()}
Período: Desde el ${d.fechaInicio || ''} hasta el ${d.fechaFin || ''} (Total: ${d.diasTotales || 1} días hábiles)

Motivación detallada:
${d.motivoDetallado || ''}

${d.anexaSoportes ? 'Se adjuntan los soportes y documentos justificativos pertinentes.' : ''}
${d.compensacionHoras ? `Compromiso de compensación: ${d.compensacionHoras}` : ''}

Agradezco de antemano su atención y favorable respuesta.

Atentamente,

_____________________________
${d.nombreEmpleado || 'FIRMA EMPLEADO'}
${d.tipoDocumento}: ${d.numeroDocumento || ''}`;
    }

    case 'no_renovacion_arriendo': {
      const d = state.no_renovacion_arriendo || state.noRenovacionArriendo;
      return `${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Señor(a):
${d.nombreDestinatario || 'DESTINATARIO'}
${d.tipoDocDestinatario}: ${d.numDocDestinatario || ''}
Dirección: ${d.direccionNotificacion || ''}

ASUNTO: Comunicación formal de no renovación y restitución de inmueble arrendado

En mi calidad de ${d.rolRemitente ? d.rolRemitente.toUpperCase() : 'ARRENDADOR'} del inmueble ubicado en ${d.direccionInmueble || 'Dirección'}${d.ciudadInmueble ? ` de ${d.ciudadInmueble}` : ''}${d.matriculaInmobiliaria ? ` (Matrícula: ${d.matriculaInmobiliaria})` : ''}, le notifico de manera formal mi decisión irrevocable de no prorrogar el contrato de arrendamiento${d.fechaContrato ? ` suscrito el ${d.fechaContrato}` : ''}, conforme a la Ley 820 de 2003.

CAUSAL: ${d.causalInvocada || ''}
${d.detalleCausal || ''}

FECHA DE ENTREGA Y RESTITUCIÓN DE LLAVES:
${d.fechaEntregaInmueble || 'Fecha'} a las ${d.horaEntrega || '10:00 AM'}.

${d.instruccionesPazSalvo || ''}
${d.restitucionDeposito ? 'Una vez verificado el inventario y paz y salvos, se procederá al balance del depósito de garantía.' : ''}

Atentamente,

_____________________________
${d.nombreRemitente || 'REMITENTE'}
${d.tipoDocRemitente}: ${d.numDocRemitente || ''}
Teléfono: ${d.telefonoRemitente || ''}`;
    }

    case 'contrato_arrendamiento': {
      const d = state.contrato_arrendamiento || state.contratoArrendamiento;
      return `CONTRATO DE ARRENDAMIENTO DE VIVIENDA URBANA (LEY 820 DE 2003)

Ciudad y Fecha: ${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

ARRENDADOR: ${d.nombreArrendador || 'Arrendador'}, ${d.tipoDocArrendador} N° ${d.numDocArrendador}, Tel: ${d.telefonoArrendador}
ARRENDATARIO: ${d.nombreArrendatario || 'Arrendatario'}, ${d.tipoDocArrendatario} N° ${d.numDocArrendatario}, Tel: ${d.telefonoArrendatario}

PRIMERA. INMUEBLE OBJETO:
${d.direccionInmueble || ''}${d.matriculaInmobiliaria ? ` (Matrícula Inmobiliaria: ${d.matriculaInmobiliaria})` : ''}.

SEGUNDA. CANON MENSUAL:
El canon mensual pactado es de ${formatearMoneda(d.canonMensual || 0)} (${numeroALetras(d.canonMensual || 0)}).
Pago en los primeros ${d.diaLimitePago || 5} días de cada mes.
Forma de pago: ${d.formaPagoCanon || ''}.

TERCERA. TÉRMINO DE DURACIÓN:
${d.duracionMeses || 12} meses, contados desde el ${d.fechaInicio || ''} hasta el ${d.fechaFin || ''}.

CUARTA. SERVICIOS PÚBLICOS Y ADMINISTRACIÓN:
Cuota de administración mensual: ${formatearMoneda(d.cuotaAdministracion || 0)}.
Responsable de servicios: ${d.responsableServicios || 'Arrendatario'}.

QUINTA. DEPÓSITO Y GARANTÍA:
Garantía constituida por la suma de ${formatearMoneda(d.montoDepositoGarantia || 0)}.

Firmado en dos ejemplares de idéntico tenor:

ARRENDADOR:                               ARRENDATARIO:
_____________________________             _____________________________
${d.nombreArrendador || ''}               ${d.nombreArrendatario || ''}
${d.tipoDocArrendador}: ${d.numDocArrendador || ''}       ${d.tipoDocArrendatario}: ${d.numDocArrendatario || ''}`;
    }

    case 'acta_entrega': {
      const d = state.acta_entrega || state.actaEntrega;
      const pazSalvosTexto = (d.pazSalvosPresentados || []).map((p: string) => `- ${p}`).join('\n');

      return `ACTA DE ENTREGA DE INMUEBLE, INVENTARIO Y LLAVES

Ciudad y Fecha: ${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'} - Hora: ${d.hora || ''}
Inmueble: ${d.direccionInmueble || ''}

QUIEN ENTREGA: ${d.nombreEntrega || ''} (${d.calidadEntrega || ''}) - ${d.docEntrega || ''}
QUIEN RECIBE: ${d.nombreRecibe || ''} (${d.calidadRecibe || ''}) - ${d.docRecibe || ''}

1. LLAVES ENTREGADAS:
Se entregan un total de ${d.juegosLlavesEntregados || 2} juego(s) de llaves de las cerraduras principales y accesos.

2. ESTADO FÍSICO GENERAL:
${d.estadoGeneralParedesPisos || ''}

3. LECTURAS FINALES DE MEDIDORES:
- Acueducto / Agua: ${d.lecturaAgua || ''}
- Energía Eléctrica: ${d.lecturaEnergia || ''}
- Gas Natural: ${d.lecturaGas || ''}

4. PAZ Y SALVOS APORTADOS:
${pazSalvosTexto}

5. OBSERVACIONES Y CONCLUSIÓN:
${d.observacionesPendientes || ''}

Para constancia firman a satisfacción:

ENTREGA:                                  RECIBE:
_____________________________             _____________________________
${d.nombreEntrega || ''}                  ${d.nombreRecibe || ''}
${d.docEntrega || ''}                     ${d.docRecibe || ''}`;
    }

    case 'derecho_peticion': {
      const d = state.derecho_peticion || state.derechoPeticion;
      const hechosTexto = (d.hechos || [])
        .filter((h: string) => h.trim() !== '')
        .map((h: string, i: number) => `${i + 1}. ${h}`)
        .join('\n');
      const peticionesTexto = (d.pretensiones || [])
        .filter((p: string) => p.trim() !== '')
        .map((p: string, i: number) => `${i + 1}. ${p}`)
        .join('\n');
      const anexosTexto = (d.anexos || [])
        .filter((a: string) => a.trim() !== '')
        .map((a: string) => `- ${a}`)
        .join('\n');

      return `${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Señores:
${d.entidadDestinataria || 'ENTIDAD DESTINATARIA'}
Atención: ${d.cargoDestinatario || ''} (${d.dependenciaDestinataria || ''})
${d.direccionEntidad || ''}
${d.correoEntidad ? `Correo: ${d.correoEntidad}` : ''}

ASUNTO: ${d.asunto || 'DERECHO DE PETICIÓN'}
${d.referencia ? `Referencia: ${d.referencia}` : ''}

Yo, ${d.nombrePeticionario || 'Peticionario'}, identificado con ${d.tipoDocumento} N° ${d.numeroDocumento || ''} de ${d.lugarExpedicion || ''}, en ejercicio del derecho fundamental consagrado en el Art. 23 de la Constitución Política y Ley 1755 de 2015, respetuosamente presento la siguiente solicitud:

I. HECHOS:
${hechosTexto}

II. PETICIONES:
${peticionesTexto}

III. FUNDAMENTOS DE DERECHO:
${d.fundamentosDerecho || ''}

${anexosTexto ? `IV. ANEXOS:\n${anexosTexto}\n` : ''}
V. NOTIFICACIONES:
Dirección: ${d.direccionNotificacion || ''} (${d.ciudadNotificacion || d.ciudad || ''})
Correo: ${d.correo || ''} | Teléfono: ${d.telefono || ''}

Atentamente,

_____________________________
${d.nombrePeticionario || 'FIRMA PETICIONARIO'}
${d.tipoDocumento}: ${d.numeroDocumento || ''}`;
    }

    case 'poder_autorizacion': {
      const d = state.poder_autorizacion || state.poderAutorizacion;
      const facultades = (d.facultadesEspecificas || [])
        .filter((f: string) => f.trim() !== '')
        .map((f: string) => `- ${f}`)
        .join('\n');

      return `PODER ESPECIAL AMPLIO Y SUFICIENTE

Ciudad y Fecha: ${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Señores:
${d.entidadTramite || 'A QUIEN CORRESPONDA'}

Yo, ${d.nombreOtorgante || 'Otorgante'}, identificado con ${d.tipoDocOtorgante} N° ${d.numDocOtorgante || ''} de ${d.expedicionOtorgante || ''}, con domicilio en ${d.domicilioOtorgante || ''}, confiero PODER ESPECIAL a:

${d.nombreApoderado || 'Apoderado'}, identificado con ${d.tipoDocApoderado} N° ${d.numDocApoderado || ''} de ${d.expedicionApoderado || ''}.

OBJETO DEL PODER:
${d.objetoAutorizacion || ''}

FACULTADES EXPRESAS:
${facultades}

VIGENCIA:
${d.vigenciaTexto || ''}

${d.notaLegal || ''}

OTORGANTE (PODERDANTE):                    APODERADO (ACEPTA):
_____________________________             _____________________________
${d.nombreOtorgante || ''}                ${d.nombreApoderado || ''}
${d.tipoDocOtorgante}: ${d.numDocOtorgante || ''}        ${d.tipoDocApoderado}: ${d.numDocApoderado || ''}`;
    }

    case 'habeas_data': {
      const d = state.habeas_data || state.habeasData;
      const anexos = (d.anexosDocumentales || []).map((a: string) => `- ${a}`).join('\n');

      return `${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Señores:
${d.centralDeRiesgo || 'CENTRAL DE RIESGO'}
Entidad reportante / fuente: ${d.entidadReportante || ''}

ASUNTO: Petición de Habeas Data Financiero - Eliminación / Actualización de Reporte Negativo
(Leyes Estatutarias 1266 de 2008 y 2157 de 2021)

Yo, ${d.nombreTitular || 'Titular'}, identificado con ${d.tipoDocTitular} N° ${d.numDocTitular} de ${d.expedicionTitular || ''}, acudo a ustedes para formular la presente petición formal:

1. HECHOS Y ANTECEDENTES:
${d.hechosDetallados || ''}
Obligación objeto del reclamo: ${d.numeroObligacion || ''}
Causal invocada: ${d.causalSolicitud ? d.causalSolicitud.toUpperCase() : 'CADUCIDAD'}

2. PRETENSIÓN:
${d.pretensionConcreta || ''}

3. ANEXOS:
${anexos}

4. NOTIFICACIONES:
Dirección: ${d.direccionNotificacion || ''}
Correo: ${d.correoTitular || ''} | Teléfono: ${d.telefonoTitular || ''}

Atentamente,

_____________________________
${d.nombreTitular || 'FIRMA TITULAR'}
${d.tipoDocTitular}: ${d.numDocTitular || ''}`;
    }

    case 'acuerdo_nda': {
      const d = state.acuerdo_nda || state.acuerdoNda;
      return `ACUERDO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN (${d.tipoNda === 'bilateral' ? 'BILATERAL' : 'UNILATERAL'})

Ciudad y Fecha: ${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}
Vigencia de la reserva: ${d.duracionAnos || 3} años

ENTRE:
Parte Divulgante: ${d.nombreParteEmisora || 'Parte A'} (${d.tipoDocEmisora} N° ${d.numDocEmisora || ''})
Domicilio: ${d.domicilioEmisora || ''}

Y:
Parte Receptora: ${d.nombreParteReceptora || 'Parte B'} (${d.tipoDocReceptora} N° ${d.numDocReceptora || ''})
Domicilio: ${d.domicilioReceptora || ''}

1. PROPÓSITO DE LA REVELACIÓN:
${d.propositoNegociacion || ''}

2. OBLIGACIONES DE CONFIDENCIALIDAD:
La parte receptora se compromete a mantener estricta confidencialidad respecto a cualquier información técnica, operativa, comercial o de propiedad intelectual recibida.

3. CLÁUSULA PENAL E INDEMNIZACIÓN:
${d.clausulaPenalMonto > 0 ? `Cláusula penal por incumplimiento tasada en ${formatearMoneda(d.clausulaPenalMonto)} (${numeroALetras(d.clausulaPenalMonto)}).` : 'Sin penalidad pecuniaria fija.'}

En constancia de lo acordado, firman:

_____________________________             _____________________________
${d.nombreParteEmisora || 'PARTE DIVULGANTE'}     ${d.nombreParteReceptora || 'PARTE RECEPTORA'}
${d.tipoDocEmisora}: ${d.numDocEmisora || ''}             ${d.tipoDocReceptora}: ${d.numDocReceptora || ''}`;
    }

    case 'compraventa_vehiculo': {
      const d = state.compraventa_vehiculo || state.compraventaVehiculo;
      return `CONTRATO DE COMPRAVENTA DE VEHÍCULO AUTOMOTOR

Ciudad y Fecha: ${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

VENDEDOR: ${d.nombreVendedor || 'Vendedor'} (${d.tipoDocVendedor} N° ${d.numDocVendedor || ''})
Teléfono: ${d.telefonoVendedor || ''} | Dirección: ${d.direccionVendedor || ''}

COMPRADOR: ${d.nombreComprador || 'Comprador'} (${d.tipoDocComprador} N° ${d.numDocComprador || ''})
Teléfono: ${d.telefonoComprador || ''} | Dirección: ${d.direccionComprador || ''}

DESCRIPCIÓN DEL AUTOMOTOR:
- Placa: ${d.placa || 'PENDIENTE'}
- Clase: ${d.claseVehiculo || 'Automóvil'} | Marca: ${d.marca || ''} | Línea: ${d.linea || ''}
- Modelo: ${d.modeloAnio || ''} | Color: ${d.color || ''}
- N° Motor: ${d.numeroMotor || ''} | N° Chasis/VIN: ${d.numeroChasis || ''}

CONDICIONES ECONÓMICAS:
- Precio de Venta: ${formatearMoneda(d.precioVenta || 0)} (${numeroALetras(d.precioVenta || 0)})
- Forma de Pago: ${d.formaPago || ''}
- Gastos de Traspaso: ${d.gastosTraspasoPorcentajes || 'Por mitades iguales'}

SANEAMIENTO Y PAZ Y SALVO:
El vendedor garantiza saneamiento por evicción y entrega a paz y salvo total por multas SIMIT, gravámenes e impuestos.

En constancia de lo anterior, firman:

_____________________________             _____________________________
${d.nombreVendedor || 'EL VENDEDOR'}             ${d.nombreComprador || 'EL COMPRADOR'}
${d.tipoDocVendedor}: ${d.numDocVendedor || ''}             ${d.tipoDocComprador}: ${d.numDocComprador || ''}`;
    }

    case 'autorizacion_patios': {
      const d = state.autorizacion_patios || state.autorizacionPatios;
      const facultades = (d.facultadesExpresas || []).map((f: string, i: number) => `${i + 1}. ${f}`).join('\n');

      return `AUTORIZACIÓN Y PODER ESPECIAL PARA RETIRO DE VEHÍCULO EN PATIOS

Ciudad y Fecha: ${d.ciudad || 'Ciudad'}, ${d.fecha || 'Fecha'}

Señores:
${d.organismoTransito || 'ORGANISMO DE TRÁNSITO Y TRANSPORTE'}
Ubicación de patios: ${d.patioUbicacion || ''}

ASUNTO: Poder especial para retiro de automotor inmovilizado con placas ${d.placaVehiculo || ''}

Yo, ${d.nombrePropietario || 'Propietario'}, identificado con ${d.tipoDocPropietario} N° ${d.numDocPropietario || ''}, en calidad de propietario inscrito del automotor con placas ${d.placaVehiculo || ''} (Marca/Línea: ${d.marcaModelo || ''}), confiero poder especial a:

${d.nombreAutorizado || 'Apoderado'} (${d.tipoDocAutorizado} N° ${d.numDocAutorizado || ''})
Teléfono: ${d.telefonoAutorizado || ''}

FACULTADES EXPRESAS:
${facultades}

Atentamente,

_____________________________             _____________________________
${d.nombrePropietario || 'PROPIETARIO (PODERDANTE)'}    ${d.nombreAutorizado || 'APODERADO (ACEPTA)'}
${d.tipoDocPropietario}: ${d.numDocPropietario || ''}       ${d.tipoDocAutorizado}: ${d.numDocAutorizado || ''}`;
    }

    default:
      return '';
  }
}
