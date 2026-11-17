import React from 'react';
import { PazYSalvoData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';
import { SignatureBlock, LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<PazYSalvoData>> = ({
  data,
  styleConfig,
}) => {
  const tieneMonto = data.montoTotalSaldado !== undefined && data.montoTotalSaldado > 0;
  const montoSaldadoFormateado = tieneMonto ? formatearMoneda(data.montoTotalSaldado!) : '';
  const montoSaldadoLetras =
    tieneMonto && (data.montoLetras || numeroALetras(data.montoTotalSaldado!));

  const getTipoConceptoTexto = () => {
    switch (data.tipoConcepto) {
      case 'contrato_servicios':
        return 'Contrato de Prestación de Servicios';
      case 'obligacion_comercial':
        return 'Obligación Comercial / Deuda';
      case 'entrega_inventario':
        return 'Entrega de Bienes / Inventario';
      case 'liquidacion_cuotas':
        return 'Liquidación de Cuotas Periódicas';
      case 'arrendamiento':
        return 'Contrato de Arrendamiento';
      case 'acuerdo_privado':
        return 'Acuerdo Privado o Transacción';
      case 'otro':
      default:
        return data.conceptoPersonalizado || 'Obligación Contractual';
    }
  };

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="banner"
      banner={{
        align: 'center',
        title: 'CERTIFICADO DE PAZ Y SALVO GENERAL',
        subtitle: 'Constancia Formal de Cumplimiento y Extinción de Obligaciones (Art. 1625 del Código Civil)',
        dateCity: `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha de expedición'}`,
        badge: `CERTIFICADO N° ${data.numeroCertificado || '001'}`,
      }}
      signatures={
        <div className="pt-8 border-t border-slate-300">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <SignatureBlock
              label="EXPEDIDO Y FIRMADO POR:"
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              name={data.nombreEmisor}
              docType={data.tipoDocEmisor}
              docNumber={data.numDocEmisor}
              role={data.cargoEmisor || 'Emisor / Otorgante'}
              phone={data.telefonoEmisor}
              address={data.direccionEmisor}
              widthClass="w-80"
            />

            <div className="w-64 border border-slate-300 p-3 bg-slate-50 text-[11px] text-slate-700 rounded">
              <p className="font-bold text-slate-900 mb-1 uppercase tracking-tight">
                BENEFICIARIO CERTIFICADO:
              </p>
              <p className="font-semibold uppercase text-xs text-slate-950">
                {data.nombreBeneficiario || 'Nombre del Beneficiario'}
              </p>
              <p>
                {data.tipoDocBeneficiario}:{' '}
                <span className="font-mono">{data.numDocBeneficiario || '__________'}</span>
              </p>
              {data.calidadBeneficiario && (
                <p className="text-slate-600 mt-1 italic">{data.calidadBeneficiario}</p>
              )}
              <p className="text-emerald-700 font-semibold mt-2 text-[10px]">
                Estado: Paz y Salvo Definitivo
              </p>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-justify text-slate-800 text-xs md:text-sm leading-relaxed">
        {/* Identificación del Emisor y Beneficiario */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded space-y-2">
          <p>
            Quien suscribe el presente documento,{' '}
            <strong>{data.nombreEmisor || '[NOMBRE DEL EMISOR O EMPRESA]'}</strong>, identificado(a)
            con{' '}
            <strong>
              {data.tipoDocEmisor} N° {data.numDocEmisor || '____________'}
            </strong>
            {data.cargoEmisor ? `, actuando en calidad de ${data.cargoEmisor}` : ''}
            {data.direccionEmisor ? `, con domicilio en ${data.direccionEmisor}` : ''}
            {data.ciudad ? ` de la ciudad de ${data.ciudad}` : ''}:
          </p>
          <p className="font-bold text-center text-slate-950 uppercase tracking-widest text-xs py-1">
            HACE CONSTAR:
          </p>
          <p>
            Que el(la) señor(a) / entidad:{' '}
            <strong>{data.nombreBeneficiario || '[NOMBRE DEL BENEFICIARIO]'}</strong>, identificado(a) con{' '}
            <strong>
              {data.tipoDocBeneficiario} N° {data.numDocBeneficiario || '____________'}
            </strong>
            {data.calidadBeneficiario ? ` en su condición de ${data.calidadBeneficiario}` : ''}, ha dado
            cumplimiento integral a las obligaciones a su cargo según el siguiente detalle:
          </p>
        </div>

        {/* Resumen del Concepto u Obligación */}
        <div className="border-l-4 border-emerald-600 bg-emerald-50/40 p-3.5 space-y-1.5 rounded-r text-xs">
          <div className="flex flex-wrap justify-between gap-2">
            <div>
              <span className="font-bold text-slate-900">Naturaleza de la relación: </span>
              <span className="text-slate-800">{getTipoConceptoTexto()}</span>
            </div>
            {data.referenciaContrato && (
              <div>
                <span className="font-bold text-slate-900">Referencia: </span>
                <span className="font-mono text-slate-800">{data.referenciaContrato}</span>
              </div>
            )}
          </div>

          {data.fechaAcuerdoOriginal && (
            <div>
              <span className="font-bold text-slate-900">Fecha del acuerdo o inicio: </span>
              <span className="text-slate-700">{data.fechaAcuerdoOriginal}</span>
            </div>
          )}

          {tieneMonto && (
            <div className="pt-1 border-t border-emerald-900/10">
              <span className="font-bold text-slate-900">Valor total cancelado y liquidado: </span>
              <span className="font-mono font-bold text-slate-950">{montoSaldadoFormateado}</span>
              {montoSaldadoLetras && (
                <span className="text-slate-700 italic"> ({montoSaldadoLetras})</span>
              )}
            </div>
          )}

          {data.detalleCumplimiento && (
            <div className="pt-1">
              <p className="font-bold text-slate-900">Alcance del cumplimiento:</p>
              <p className="text-slate-700 mt-0.5">{data.detalleCumplimiento}</p>
            </div>
          )}
        </div>

        {/* Declaración Central de Paz y Salvo */}
        <div className="p-3.5 bg-white border border-slate-300 rounded shadow-sm">
          <p className="font-semibold text-slate-950 mb-1 uppercase tracking-wide text-xs">
            Declaración de Paz y Salvo Definitivo:
          </p>
          <p className="text-slate-800">
            {data.declaracionTexto ||
              'Se certifica que el beneficiario se encuentra a la fecha a PAZ Y SALVO total y definitivo por todo concepto económico, contractual y comercial, no existiendo saldos pendientes ni obligaciones insolutas.'}
          </p>
        </div>

        {/* Cláusula de Renuncia a Reclamaciones Posteriores */}
        {data.renunciaAcciones && (
          <p className="text-slate-700 text-xs text-justify">
            En virtud de lo anterior, las partes declaran que las obligaciones derivadas del vínculo antes
            referenciado han quedado legalmente <strong>extinguidas por pago efectivo y satisfacción mutua</strong>,
            de conformidad con el <strong>Artículo 1625 del Código Civil colombiano</strong>, manifestando
            que no existe motivo alguno para iniciar o proseguir acciones judiciales, arbitrales o
            extrajudiciales por estos conceptos.
          </p>
        )}

        {/* Nota Aclaratoria Opcional */}
        {data.incluyeNotaAclaratoria && data.notaAclaratoria && (
          <div className="p-3 bg-amber-50/60 border border-amber-200 rounded text-xs text-slate-700">
            <span className="font-bold text-amber-900">Nota u observación especial: </span>
            <span>{data.notaAclaratoria}</span>
          </div>
        )}

        {/* Cierre formal */}
        <p className="text-xs text-slate-600">
          Se expide el presente certificado en la ciudad de{' '}
          <strong>{data.ciudad || 'esta ciudad'}</strong>, a los{' '}
          <strong>{data.fecha || 'días del mes en curso'}</strong>, con destino al interesado para los
          fines comerciales, bancarios, laborales o legales que estime convenientes.
        </p>
      </div>
    </LegalDocumentShell>
  );
};
