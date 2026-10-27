import React from 'react';
import { ContratoArrendamientoData, DocumentStyleConfig } from '../../types/documents';
import { formatearMoneda, numeroALetras } from '../../utils/numberToWords';

interface Props {
  data: ContratoArrendamientoData;
  styleConfig: DocumentStyleConfig;
}

export const ContratoArrendamientoTemplate: React.FC<Props> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[11.5px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[14px] leading-relaxed'
      : 'text-[12.5px] leading-relaxed';

  return (
    <div className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-6 sm:p-10 md:p-12 min-h-[1050px] flex flex-col justify-between`}>
      <div className="space-y-4">
        {/* Title */}
        <div className="text-center border-b-2 border-slate-900 pb-3">
          <h1 className="text-lg md:text-xl font-bold uppercase tracking-wide text-slate-950">
            Contrato de Arrendamiento de Vivienda Urbana
          </h1>
          <p className="text-[11px] text-slate-600 uppercase tracking-widest mt-0.5">
            Regulado por la Ley 820 de 2003 y el Código Civil Colombiano
          </p>
        </div>

        {/* Date and Location */}
        <div className="text-right text-xs text-slate-600">
          <p>{data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}</p>
        </div>

        {/* Comparentes */}
        <div className="text-justify text-slate-800 space-y-2">
          <p>
            Entre los suscritos a saber: de una parte, <strong>{data.nombreArrendador || '[NOMBRE DEL ARRENDADOR]'}</strong>,
            identificado(a) con {data.tipoDocArrendador} N° <strong>{data.numDocArrendador || '____________'}</strong>,
            teléfono {data.telefonoArrendador || ''}, quien para todos los efectos del presente contrato se denominará el{' '}
            <strong>ARRENDADOR</strong>; y de la otra parte, <strong>{data.nombreArrendatario || '[NOMBRE DEL ARRENDATARIO]'}</strong>,
            identificado(a) con {data.tipoDocArrendatario} N° <strong>{data.numDocArrendatario || '____________'}</strong>,
            teléfono {data.telefonoArrendatario || ''}, quien se denominará el <strong>ARRENDATARIO</strong>, hemos convenido
            celebrar el presente Contrato de Arrendamiento de Vivienda Urbana sujeto a las siguientes cláusulas:
          </p>
        </div>

        {/* Cláusulas */}
        <div className="space-y-3 text-justify text-slate-800">
          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              PRIMERA. INMUEBLE OBJETO:
            </h2>
            <p className="leading-relaxed">
              El ARRENDADOR entrega a título de arrendamiento para uso exclusivo de habitación familiar el inmueble ubicado en:{' '}
              <strong>{data.direccionInmueble || '[Dirección del Inmueble]'}</strong>
              {data.matriculaInmobiliaria ? `, con Matrícula Inmobiliaria N° ${data.matriculaInmobiliaria}` : ''}.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              SEGUNDA. CANON DE ARRENDAMIENTO:
            </h2>
            <p className="leading-relaxed">
              El canon mensual de arrendamiento convenido es la suma de{' '}
              <strong className="font-mono text-slate-950">{formatearMoneda(data.canonMensual)}</strong> (
              {numeroALetras(data.canonMensual)}), que el ARRENDATARIO pagará de manera anticipada dentro de los primeros{' '}
              <strong>{data.diaLimitePago || 5} días</strong> de cada período mensual. Modalidad: {data.formaPagoCanon}.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              TERCERA. TÉRMINO DE DURACIÓN:
            </h2>
            <p className="leading-relaxed">
              El presente contrato tendrá una vigencia inicial de <strong>{data.duracionMeses || 12} meses</strong>, contados a partir
              del <strong>{data.fechaInicio || 'Inicio'}</strong> hasta el <strong>{data.fechaFin || 'Vencimiento'}</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              CUARTA. SERVICIOS PÚBLICOS Y ADMINISTRACIÓN:
            </h2>
            <p className="leading-relaxed text-[11px] text-slate-700">
              El pago de los servicios públicos domiciliarios estará a cargo de: {data.responsableServicios}.
              {data.cuotaAdministracion > 0 && (
                <> Asimismo, la cuota ordinaria de administración por valor de <strong>{formatearMoneda(data.cuotaAdministracion)}</strong> será asumida conforme a lo pactado.</>
              )}
            </p>
          </div>

          {data.montoDepositoGarantia > 0 && (
            <div>
              <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
                QUINTA. DEPÓSITO Y BALANCE DE SERVICIOS:
              </h2>
              <p className="leading-relaxed text-[11px] text-slate-700">
                A la firma del presente instrumento, se constituye una garantía/depósito de servicios por la suma de{' '}
                <strong>{formatearMoneda(data.montoDepositoGarantia)}</strong>, respaldando el pago de los consumos finales al término del contrato.
              </p>
            </div>
          )}

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              SEXTA. RESTITUCIÓN Y REPARACIONES:
            </h2>
            <p className="leading-relaxed text-[11px] text-slate-600">
              El ARRENDATARIO se obliga a restituir el inmueble al vencimiento en el mismo estado en que lo recibe, salvo el deterioro natural
              por el uso legítimo. Cualquier modificación locativa requerirá autorización expresa y por escrito del ARRENDADOR.
            </p>
          </div>
        </div>
      </div>

      {/* Firmas Arrendador y Arrendatario */}
      <div className="pt-8 mt-6 border-t border-slate-300">
        <p className="text-xs text-slate-500 mb-8">
          En constancia de lo anterior, los contratantes suscriben el presente contrato en dos ejemplares con destino a cada una de las partes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
            <p className="font-bold text-slate-950 uppercase text-xs">EL ARRENDADOR:</p>
            <p className="font-semibold text-slate-900 text-xs">{data.nombreArrendador || 'Nombre Arrendador'}</p>
            <p className="text-[11px] text-slate-600">{data.tipoDocArrendador}: {data.numDocArrendador}</p>
            <p className="text-[10px] text-slate-500">Tel: {data.telefonoArrendador}</p>
          </div>

          <div>
            <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
            <p className="font-bold text-slate-950 uppercase text-xs">EL ARRENDATARIO:</p>
            <p className="font-semibold text-slate-900 text-xs">{data.nombreArrendatario || 'Nombre Arrendatario'}</p>
            <p className="text-[11px] text-slate-600">{data.tipoDocArrendatario}: {data.numDocArrendatario}</p>
            <p className="text-[10px] text-slate-500">Tel: {data.telefonoArrendatario}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
