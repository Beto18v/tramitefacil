import React from 'react';
import { CompraventaVehiculoData, DocumentStyleConfig } from '../../types/documents';
import { formatearMoneda, numeroALetras } from '../../utils/numberToWords';
import { SignatureBlock } from './SignatureBlock';

interface Props {
  data: CompraventaVehiculoData;
  styleConfig: DocumentStyleConfig;
}

export const CompraventaVehiculoTemplate: React.FC<Props> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[11px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[13.5px] leading-relaxed'
      : 'text-[12px] leading-relaxed';

  return (
    <div className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-6 sm:p-10 md:p-12 min-h-[1050px] flex flex-col justify-between`}>
      <div className="space-y-4">
        {/* Title */}
        <div className="text-center border-b-2 border-slate-900 pb-3">
          <h1 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide text-slate-950">
            Contrato de Compraventa de Vehículo Automotor
          </h1>
          <p className="text-[10.5px] sm:text-[11px] text-slate-600 uppercase tracking-widest mt-0.5">
            Régimen Mercantil y Código Nacional de Tránsito (Ley 769 de 2002)
          </p>
        </div>

        {/* Date and Location */}
        <div className="text-right text-xs text-slate-600">
          <p>{data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}</p>
        </div>

        {/* Comparentes */}
        <div className="text-justify text-slate-800 space-y-2">
          <p>
            Entre los suscritos a saber: de una parte, <strong>{data.nombreVendedor || '[NOMBRE DEL VENDEDOR]'}</strong>,
            identificado(a) con {data.tipoDocVendedor} N° <strong>{data.numDocVendedor || '____________'}</strong>, domiciliado(a)
            en {data.direccionVendedor || 'esta ciudad'}, teléfono {data.telefonoVendedor || '____________'}, quien en adelante
            se denominará el <strong>VENDEDOR</strong>; y de la otra parte, <strong>{data.nombreComprador || '[NOMBRE DEL COMPRADOR]'}</strong>,
            identificado(a) con {data.tipoDocComprador} N° <strong>{data.numDocComprador || '____________'}</strong>, domiciliado(a)
            en {data.direccionComprador || 'esta ciudad'}, teléfono {data.telefonoComprador || '____________'}, quien en adelante
            se denominará el <strong>COMPRADOR</strong>, hemos convenido celebrar el presente Contrato de Compraventa de Vehículo
            Automotor, el cual se regirá por las siguientes cláusulas:
          </p>
        </div>

        {/* Cláusulas */}
        <div className="space-y-3 text-justify text-slate-800">
          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1.5">
              PRIMERA. OBJETO Y DESCRIPCIÓN DEL AUTOMOTOR:
            </h2>
            <p className="leading-relaxed mb-2">
              El VENDEDOR transfiere a título de compraventa real y material al COMPRADOR la propiedad y posesión del vehículo
              automotor que a continuación se describe e individualiza:
            </p>

            {/* Ficha técnica del vehículo */}
            <div className="border border-slate-300 rounded-lg overflow-hidden my-2 text-xs">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="p-2 font-bold text-slate-700 w-1/4">Placa:</td>
                    <td className="p-2 font-mono font-bold text-slate-950 text-sm">{data.placa || 'PENDIENTE'}</td>
                    <td className="p-2 font-bold text-slate-700 w-1/4">Clase:</td>
                    <td className="p-2">{data.claseVehiculo || 'Automóvil'}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold text-slate-700">Marca:</td>
                    <td className="p-2 font-semibold">{data.marca || '---'}</td>
                    <td className="p-2 font-bold text-slate-700">Línea:</td>
                    <td className="p-2">{data.linea || '---'}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="p-2 font-bold text-slate-700">Modelo (Año):</td>
                    <td className="p-2 font-mono">{data.modeloAnio || '---'}</td>
                    <td className="p-2 font-bold text-slate-700">Color:</td>
                    <td className="p-2">{data.color || '---'}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-700">N° Motor:</td>
                    <td className="p-2 font-mono">{data.numeroMotor || '---'}</td>
                    <td className="p-2 font-bold text-slate-700">N° Chasis / VIN:</td>
                    <td className="p-2 font-mono">{data.numeroChasis || '---'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              SEGUNDA. PRECIO Y FORMA DE PAGO:
            </h2>
            <p className="leading-relaxed">
              El precio libre y mutuamente convenido para la compraventa del vehículo es la suma de{' '}
              <strong className="font-mono text-slate-950">{formatearMoneda(data.precioVenta)}</strong> (
              {numeroALetras(data.precioVenta)}), que el COMPRADOR pagará al VENDEDOR de la siguiente manera:{' '}
              {data.formaPago || 'Conforme a lo pactado entre las partes'}.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              TERCERA. TRASPASO Y GASTOS:
            </h2>
            <p className="leading-relaxed">
              Las Partes se obligan mutuamente a suscribir el formulario oficial de solicitud de trámites ante el organismo de
              tránsito respectivo. Los derechos de tránsito, retención en la fuente y demás costos generados por el traspaso
              serán cubiertos así: <strong>{data.gastosTraspasoPorcentajes || 'Por partes iguales (50% y 50%)'}</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              CUARTA. SANEAMIENTO Y PAZ Y SALVO:
            </h2>
            <p className="leading-relaxed text-[11px] text-slate-700">
              El VENDEDOR garantiza que el vehículo es de su exclusiva propiedad, no ha sido hurtado ni remarcado, y se compromete
              al saneamiento por evicción y vicios redhibitorios conforme a la ley.{' '}
              {data.pazYSalvoMultas && (
                <>
                  Asimismo, el VENDEDOR garantiza expresamente la entrega del automotor a paz y salvo total por concepto de
                  comparendos o multas de tránsito (SIMIT), impuestos vehiculares y gravámenes judiciales o prendas vigentes
                  causadas con anterioridad a la entrega.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Firmas a doble columna */}
      <div className="pt-6 mt-6 border-t border-slate-300">
        <p className="text-xs text-slate-500 mb-6">
          Para constancia de lo acordado, se suscribe el presente contrato en dos (2) ejemplares de idéntico valor probatorio:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
          <SignatureBlock
            label="EL VENDEDOR:"
            signatureType={data.signatureType || 'text'}
            signatureDataUrl={data.signatureDataUrl}
            name={data.nombreVendedor}
            docType={data.tipoDocVendedor}
            docNumber={data.numDocVendedor}
            phone={data.telefonoVendedor}
            address={data.direccionVendedor}
            widthClass="w-full"
          />

          <SignatureBlock
            label="EL COMPRADOR:"
            signatureType="text"
            name={data.nombreComprador}
            docType={data.tipoDocComprador}
            docNumber={data.numDocComprador}
            phone={data.telefonoComprador}
            address={data.direccionComprador}
            widthClass="w-full"
          />
        </div>
      </div>
    </div>
  );
};
