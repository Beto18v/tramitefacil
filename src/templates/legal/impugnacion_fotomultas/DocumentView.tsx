import React from 'react';
import { ImpugnacionFotomultasData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { SignatureBlock, LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<ImpugnacionFotomultasData>> = ({
  data,
  styleConfig,
}) => {
  const getCalidadTexto = (calidad: string) => {
    switch (calidad) {
      case 'propietario':
        return 'propietario(a) inscrito(a)';
      case 'conductor_autorizado':
        return 'conductor(a) autorizado(a)';
      case 'apoderado':
        return 'apoderado(a) especial';
      default:
        return 'propietario(a)';
    }
  };

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="letter"
      letter={{
        cityAndDate: `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}`,
        recipient: (
          <div className="space-y-1 text-xs md:text-sm">
            <p className="font-semibold text-slate-900">Señores:</p>
            <p className="font-bold text-slate-950 uppercase text-sm md:text-base">
              {data.organismoTransito || 'SECRETARÍA / ORGANISMO DE TRÁNSITO Y TRANSPORTE'}
            </p>
            <p className="text-slate-700">Área de Contravenciones / Inspecciones de Tránsito</p>
            <p className="text-slate-600 font-medium">{data.ciudadEntidad || data.ciudad || 'Ciudad'}</p>
          </div>
        ),
        subject: `DERECHO DE PETICIÓN EN INTERÉS PARTICULAR E IMPUGNACIÓN FORMAL DE FOTOMULTA / COMPARENDO N° ${
          data.numeroComparendo || '________________'
        }`,
        reference: `Vehículo de Placa: ${data.placaVehiculo || '______'} - Sentencia C-038 de 2020 y Ley 1843 de 2017`,
      }}
      signatures={
        <div className="pt-8 border-t border-slate-300">
          <p className="text-xs text-slate-500 mb-6">Atentamente,</p>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <SignatureBlock
              label="SOLICITANTE / PETICIONARIO:"
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              name={data.nombreSolicitante}
              docType={data.tipoDocSolicitante}
              docNumber={data.numDocSolicitante}
              expedition={data.expedicionSolicitante}
              phone={data.telefonoSolicitante}
              email={data.correoNotificacion}
              address={data.direccionNotificacion}
              widthClass="w-80"
            />

            <div className="w-64 border border-slate-300 p-3 bg-slate-50 text-[11px] text-slate-700">
              <p className="font-bold text-slate-900 mb-1">CONSTANCIA DE RADICACIÓN OFICIAL:</p>
              <div className="h-6"></div>
              <p>N° Radicado: ____________________</p>
              <p>Fecha y Hora: ___/___/2026 __:__</p>
              <p>Firma / Sello Ventanilla o Correo</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-justify text-slate-800 leading-relaxed text-xs md:text-sm">
        {/* Comparecencia */}
        <p>
          Yo, <strong>{data.nombreSolicitante || '________________'}</strong>, mayor de edad, vecino(a) de la ciudad de{' '}
          {data.ciudadNotificacion || data.ciudad || 'esta ciudad'}, identificado(a) con {data.tipoDocSolicitante} N°{' '}
          <strong>{data.numDocSolicitante || '________________'}</strong>
          {data.expedicionSolicitante ? ` de ${data.expedicionSolicitante}` : ''}, actuando en mi condición de{' '}
          <strong>{getCalidadTexto(data.calidadSolicitante)}</strong> del vehículo automotor identificado con placa{' '}
          <strong>{data.placaVehiculo || '______'}</strong>, en ejercicio del derecho fundamental de petición consagrado
          en el <strong>artículo 23 de la Constitución Política de Colombia</strong> y conforme al procedimiento
          establecido en la <strong>Ley 1755 de 2015</strong>, la <strong>Ley 1843 de 2017</strong> y las directrices
          jurisprudenciales fijadas por la Corte Constitucional en la <strong>Sentencia C-038 de 2020</strong>, formulo
          formal <strong>IMPUGNACIÓN Y SOLICITUD DE REVOCATORIA DIRECTA Y ARCHIVO DEFINITIVO</strong> de la orden de
          comparendo individualizada, con base en los siguientes:
        </p>

        {/* Hechos */}
        <div className="space-y-3">
          <p className="font-bold text-slate-950 uppercase tracking-wide border-b border-slate-200 pb-1">
            I. HECHOS Y ANTECEDENTES
          </p>

          <p>
            <strong>PRIMERO.</strong> La entidad de tránsito expidió la orden de comparendo N°{' '}
            <strong>{data.numeroComparendo || '________________'}</strong>, imputando la presunta infracción con código{' '}
            <strong>{data.codigoInfraccion}</strong>, detectada presuntamente mediante sistema automático/semiautomático
            (fotodetección) el día <strong>{data.fechaComparendo || '____/__/__'}</strong>
            {data.horaComparendo ? ` a las ${data.horaComparendo}` : ''}, sobre el vehículo de placa{' '}
            <strong>{data.placaVehiculo || '______'}</strong>
            {data.lugarInfraccion ? `, en la ubicación: ${data.lugarInfraccion}` : ''}.
          </p>

          {data.causalFaltaIdentificacion && (
            <p>
              <strong>SEGUNDO. VULNERACIÓN DEL PRINCIPIO DE RESPONSABILIDAD SUBJETIVA (FALTA DE IDENTIFICACIÓN PLENA DEL CONDUCTOR).</strong>{' '}
              En el registro fotográfico y documental adosado a la orden de comparendo no existe prueba idónea, plena e
              inequívoca que demuestre que el suscrito peticionario estuviese conduciendo el rodante en el momento de la
              captura técnica. La Corte Constitucional en la Sentencia C-038 de 2020 declaró inexequible la responsabilidad
              solidaria patrimonial entre el propietario y el conductor, determinando categóricamente que la administración
              debe probar de forma individualizada quién ejecutó materialmente la conducta infractora antes de vincular o
              sancionar al dueño del vehículo.
            </p>
          )}

          {data.causalFaltaNotificacion && (
            <p>
              <strong>TERCERO. INDEBIDA O EXTEMPORÁNEA NOTIFICACIÓN.</strong> La entidad de tránsito omitió cumplir con
              la garantía del debido proceso al no remitir oportunamente la citación por correo certificado dentro del
              término perentorio e improrrogable de tres (3) días hábiles siguientes a la validación de la orden,
              contraviniendo el artículo 8 de la Ley 1843 de 2017 y privándome del derecho de defensa.
            </p>
          )}

          {data.causalCalibracionSenalizacion && (
            <p>
              <strong>CUARTO. AUSENCIA DE CALIBRACIÓN Y SEÑALIZACIÓN REGLAMENTARIA.</strong> No se encuentra acreditada
              la calibración periódica vigente del cinemómetro o dispositivo de detección ante el Instituto Nacional de
              Metrología (INM) ni la señalización previa visible a 500 metros exigida por el artículo 10 de la Ley 1843 de
              2017.
            </p>
          )}

          {data.hechosAdicionales && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
              <p className="font-semibold text-slate-900">Hechos y precisiones adicionales del caso:</p>
              <p className="whitespace-pre-line text-slate-700">{data.hechosAdicionales}</p>
            </div>
          )}
        </div>

        {/* Fundamentos de Derecho */}
        <div className="space-y-2">
          <p className="font-bold text-slate-950 uppercase tracking-wide border-b border-slate-200 pb-1">
            II. FUNDAMENTOS JURÍDICOS
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
            <li>
              <strong>Artículos 23 y 29 de la Constitución Política:</strong> Derechos fundamentales de petición, presunción
              de inocencia y debido proceso administrativo sancionatorio.
            </li>
            <li>
              <strong>Sentencia C-038 de 2020 (Corte Constitucional):</strong> Abolición definitiva de la solidaridad
              automática sancionatoria en fotomultas. La carga probatoria de identificar al conductor infractor recae
              exclusivamente en la entidad sancionadora.
            </li>
            <li>
              <strong>Sentencia C-321 de 2022 (Corte Constitucional):</strong> Ratifica el estándar probatorio estricto y la
              responsabilidad personal en materia contravencional.
            </li>
            <li>
              <strong>Ley 1843 de 2017 (Arts. 8 y 10):</strong> Términos obligatorios de validación, notificación legal y
              requisitos técnicos de señalización de sistemas tecnológicos.
            </li>
          </ul>
        </div>

        {/* Peticiones */}
        <div className="space-y-3">
          <p className="font-bold text-slate-950 uppercase tracking-wide border-b border-slate-200 pb-1">
            III. PETICIONES
          </p>

          <ol className="list-decimal list-inside space-y-1.5 text-slate-800">
            {data.solicitaExoneracion && (
              <li>
                <strong>EXONERAR</strong> al suscrito peticionario de cualquier grado de responsabilidad contravencional
                derivada del comparendo N° <strong>{data.numeroComparendo || '________________'}</strong>.
              </li>
            )}
            {data.solicitaArchivoComparendo && (
              <li>
                <strong>ORDENAR EL ARCHIVO DEFINITIVO</strong> de la citada orden de comparendo y realizar la respectiva
                actualización en el sistema SIMIT y en la base de datos de la Secretaría, dejando el estado a paz y salvo sin
                imposición de cobro coactivo ni afectación patrimonial.
              </li>
            )}
            {data.solicitaPruebaTecnica && (
              <li>
                En subsidio, si la entidad decide continuar con la actuación, se sirva <strong>APORTAR Y NOTIFICAR</strong>{' '}
                la prueba fotográfica en resolución que acredite con certeza la identidad del conductor, así como el
                certificado de calibración metrológica vigente del dispositivo utilizado.
              </li>
            )}
            {data.peticionesAdicionales && (
              <li className="whitespace-pre-line">{data.peticionesAdicionales}</li>
            )}
          </ol>
        </div>

        {/* Anexos */}
        {data.anexos && (
          <div className="space-y-1 text-xs text-slate-700">
            <p className="font-bold text-slate-900 uppercase">IV. ANEXOS DOCUMENTALES</p>
            <p className="whitespace-pre-line pl-2">{data.anexos}</p>
          </div>
        )}

        {/* Notificaciones */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
          <p className="font-bold text-slate-900 uppercase">V. NOTIFICACIONES</p>
          <p>
            Recibiré comunicaciones oficiales y respuesta motivada a este derecho de petición en:
          </p>
          <p>
            Dirección física: <strong>{data.direccionNotificacion || '________________'}</strong>{' '}
            {data.ciudadNotificacion ? `(${data.ciudadNotificacion})` : ''}
          </p>
          <p>
            Correo electrónico para notificación judicial: <strong>{data.correoNotificacion || '________________'}</strong>
          </p>
          {data.telefonoSolicitante && <p>Teléfono móvil: {data.telefonoSolicitante}</p>}
        </div>
      </div>
    </LegalDocumentShell>
  );
};
