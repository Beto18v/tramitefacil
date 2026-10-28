import React from 'react';
import { NoRenovacionArriendoData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';

export const DocumentView: React.FC<DocumentViewProps<NoRenovacionArriendoData>> = ({
  data,
  styleConfig,
}) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12.5px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[15px] leading-loose'
      : 'text-[13.5px] leading-relaxed';

  const esArrendador = data.rolRemitente === 'arrendador';

  return (
    <div
      className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-8 md:p-12 min-h-[1050px] flex flex-col justify-between`}
    >
      <div className="space-y-6">
        {/* Ciudad y fecha */}
        <div className="text-right text-xs md:text-sm text-slate-700">
          <p>
            {data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha de envío'}
          </p>
        </div>

        {/* Destinatario */}
        <div className="space-y-1 text-xs md:text-sm">
          <p className="font-semibold text-slate-900">Señor(a):</p>
          <p className="font-bold text-slate-950 uppercase text-sm md:text-base">
            {data.nombreDestinatario || 'NOMBRE DEL DESTINATARIO'}
          </p>
          <p className="text-slate-700">
            {data.tipoDocDestinatario}:{' '}
            <span className="font-mono">{data.numDocDestinatario || '________________'}</span>
          </p>
          <p className="text-slate-600">
            En calidad de: <strong>{esArrendador ? 'Arrendatario(a)' : 'Arrendador(a) / Propietario(a)'}</strong>
          </p>
          {data.direccionNotificacion && (
            <p className="text-slate-600">Dirección: {data.direccionNotificacion}</p>
          )}
        </div>

        {/* Asunto */}
        <div className="border-b-2 border-slate-900 pb-2">
          <p className="font-bold text-slate-950 text-xs md:text-sm uppercase">
            ASUNTO:{' '}
            <span className="font-semibold normal-case text-slate-900">
              Notificación formal de no renovación y solicitud de restitución de inmueble arrendado
            </span>
          </p>
        </div>

        {/* Saludo */}
        <div>
          <p className="text-slate-800">Apreciado(a) señor(a):</p>
        </div>

        {/* Cuerpo */}
        <div className="space-y-4 text-justify text-slate-800">
          <p>
            En mi condición de <strong>{esArrendador ? 'ARRENDADOR' : 'ARRENDATARIO'}</strong> del inmueble
            ubicado en la <strong>{data.direccionInmueble || '[DIRECCIÓN DEL INMUEBLE]'}</strong>
            {data.ciudadInmueble ? ` de la ciudad de ${data.ciudadInmueble}` : ''}
            {data.matriculaInmobiliaria
              ? `, con Matrícula Inmobiliaria N° ${data.matriculaInmobiliaria}`
              : ''}
            , me dirijo a usted con el debido respeto para manifestarle mi decisión irrevocable de{' '}
            <strong>NO RENOVAR NI PRORROGAR</strong> el contrato de arrendamiento suscrito entre las partes
            {data.fechaContrato ? ` con fecha ${data.fechaContrato}` : ''}.
          </p>

          <p>
            Esta notificación se formula en estricto cumplimiento de los términos de preaviso establecidos en
            la <strong>Ley 820 de 2003</strong> (Régimen de Arrendamiento de Vivienda Urbana) y las cláusulas
            estipuladas en el respectivo contrato, con una antelación oportuna frente a la fecha de vencimiento
            del período en curso.
          </p>

          {/* Causal y detalle */}
          <div className="bg-slate-50 border-l-4 border-slate-900 p-3 my-2 text-xs md:text-sm">
            <p className="font-bold text-slate-950 uppercase text-xs mb-1">Causal Invocada:</p>
            <p className="text-slate-800 font-semibold mb-1">
              {data.causalInvocada || 'Vencimiento del término contractual y preaviso ordinario'}
            </p>
            {data.detalleCausal && (
              <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-line">
                {data.detalleCausal}
              </p>
            )}
          </div>

          <p>
            En consecuencia, la fecha señalada para la restitución formal, desocupación física y entrega de
            llaves del inmueble será el próximo{' '}
            <strong className="text-slate-950">
              {data.fechaEntregaInmueble || '[Fecha de entrega]'}
            </strong>
            {data.horaEntrega ? ` a las ${data.horaEntrega}` : ''}.
          </p>

          {data.instruccionesPazSalvo && (
            <p className="whitespace-pre-line text-xs md:text-sm">{data.instruccionesPazSalvo}</p>
          )}

          {data.restitucionDeposito && (
            <p className="text-xs text-slate-700">
              Una vez verificada la entrega a satisfacción del inmueble en las mismas condiciones en que fue
              recibido (salvo el deterioro natural por el uso legítimo) y comprobado el pago total de los
              consumos finales de servicios públicos, se procederá conforme a la ley con el balance de cuentas
              y paz y salvo definitivo.
            </p>
          )}
        </div>
      </div>

      {/* Firmas */}
      <div className="pt-8 mt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-8">Atentamente,</p>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="w-72">
            <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
            <p className="font-bold text-slate-950 uppercase text-sm">
              {data.nombreRemitente || 'NOMBRE DEL REMITENTE'}
            </p>
            <p className="text-xs text-slate-700">
              {data.tipoDocRemitente}:{' '}
              <span className="font-mono">{data.numDocRemitente || '________________'}</span>
            </p>
            <p className="text-xs text-slate-600">
              {esArrendador ? 'Arrendador / Propietario' : 'Arrendatario'}
            </p>
            {data.telefonoRemitente && (
              <p className="text-xs text-slate-600">Tel: {data.telefonoRemitente}</p>
            )}
            {data.correoRemitente && (
              <p className="text-xs text-slate-600">Email: {data.correoRemitente}</p>
            )}
          </div>

          <div className="w-60 border border-slate-300 p-3 bg-slate-50 text-[11px] text-slate-600">
            <p className="font-semibold text-slate-800 mb-1">Constancia de Notificación Personal:</p>
            <div className="h-6"></div>
            <p>Recibido por: __________________</p>
            <p>Fecha: ___/___/2026 Hora: _______</p>
            <p>Firma o Sello Correo Certificado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

