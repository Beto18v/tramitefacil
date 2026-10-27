import React from 'react';
import { ContratoPrestacionData, DocumentStyleConfig } from '../../types/documents';
import { formatearMoneda, numeroALetras } from '../../utils/numberToWords';
import { SignatureBlock } from './SignatureBlock';

interface Props {
  data: ContratoPrestacionData;
  styleConfig: DocumentStyleConfig;
}

export const ContratoPrestacionTemplate: React.FC<Props> = ({ data, styleConfig }) => {
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
            Contrato de Prestación de Servicios Profesionales Independientes
          </h1>
          <p className="text-[11px] text-slate-600 uppercase tracking-widest mt-0.5">
            Régimen Civil y Comercial de Servicios
          </p>
        </div>

        {/* Date and Location */}
        <div className="text-right text-xs text-slate-600">
          <p>{data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}</p>
        </div>

        {/* Comparentes */}
        <div className="text-justify text-slate-800 space-y-2">
          <p>
            Entre los suscritos a saber: de una parte, <strong>{data.nombreContratante || '[NOMBRE DEL CONTRATANTE]'}</strong>,
            identificado con {data.tipoDocContratante} N° <strong>{data.numDocContratante || '____________'}</strong>,
            con domicilio y sede de actividades en {data.domicilioContratante || 'esta ciudad'}, quien en adelante y para todos
            los efectos del presente contrato se denominará el <strong>CONTRATANTE</strong>; y de la otra parte,{' '}
            <strong>{data.nombreContratista || '[NOMBRE DEL CONTRATISTA]'}</strong>, mayor de edad, identificado con{' '}
            {data.tipoDocContratista} N° <strong>{data.numDocContratista || '____________'}</strong>, domiciliado en{' '}
            {data.domicilioContratista || 'esta ciudad'}, quien para los mismos efectos se denominará el{' '}
            <strong>CONTRATISTA</strong>, hemos acordado celebrar el presente Contrato de Prestación de Servicios, el cual
            se regirá por las normas civiles y comerciales colombianas y por las siguientes cláusulas:
          </p>
        </div>

        {/* Cláusulas */}
        <div className="space-y-3 text-justify text-slate-800">
          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              PRIMERA. OBJETO DEL CONTRATO:
            </h2>
            <p className="leading-relaxed">
              El CONTRATISTA se obliga para con el CONTRATANTE a prestar con entera autonomía técnica y profesional los siguientes servicios: {data.objetoContrato || '(Defina el objeto del contrato...)'}
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              SEGUNDA. OBLIGACIONES ESPECÍFICAS DEL CONTRATISTA:
            </h2>
            {data.obligacionesContratista && data.obligacionesContratista.length > 0 && data.obligacionesContratista.some((o) => o.trim()) ? (
              <ol className="list-decimal list-outside ml-5 space-y-1 text-slate-700">
                {data.obligacionesContratista
                  .filter((o) => o.trim())
                  .map((ob, idx) => (
                    <li key={idx} className="pl-1">
                      {ob}
                    </li>
                  ))}
              </ol>
            ) : (
              <p className="italic text-slate-400">(Liste las obligaciones pactadas...)</p>
            )}
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              TERCERA. VALOR Y FORMA DE PAGO:
            </h2>
            <p className="leading-relaxed">
              El valor total convenido por la prestación de los servicios objeto de este contrato es la suma de{' '}
              <strong className="font-mono text-slate-950">{formatearMoneda(data.valorContrato)}</strong> (
              {numeroALetras(data.valorContrato)}). Dicha suma se cancelará de la siguiente forma: {data.formaPago}.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              CUARTA. PLAZO DE EJECUCIÓN:
            </h2>
            <p className="leading-relaxed">
              El término de duración del presente contrato será a partir del <strong>{data.fechaInicio || 'Inicio'}</strong> hasta
              el <strong>{data.fechaTerminacion || 'Terminación'}</strong>. El lugar convenido para su ejecución será {data.lugarEjecucion}.
            </p>
          </div>

          {data.clausulaIndependencia && (
            <div>
              <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
                QUINTA. INDEPENDENCIA Y EXCLUSIÓN DE RELACIÓN LABORAL:
              </h2>
              <p className="leading-relaxed text-[11px] text-slate-600">
                El CONTRATISTA declara expresamente que goza de completa libertad, autonomía técnica y directiva para ejecutar
                las actividades contratadas. En consecuencia, el presente acuerdo no constituye en ningún caso contrato de trabajo,
                ni genera relación de subordinación, salario, prestaciones sociales ni indemnizaciones de naturaleza laboral.
              </p>
            </div>
          )}

          {data.incluirConfidencialidad && (
            <div>
              <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
                SEXTA. CONFIDENCIALIDAD Y PROPIEDAD INTELECTUAL:
              </h2>
              <p className="leading-relaxed text-[11px] text-slate-600">
                Toda la información técnica, comercial, operativa, bases de datos o metodologías suministradas por el CONTRATANTE
                o generadas en desarrollo del servicio contratado tendrán carácter de estrictamente confidenciales y reservadas.
                Los derechos patrimoniales sobre los entregables y obras derivadas pertenecerán en su totalidad al CONTRATANTE.
              </p>
            </div>
          )}

          {data.clausulaPenalMonto > 0 && (
            <div>
              <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
                {data.incluirConfidencialidad ? 'SÉPTIMA.' : 'SEXTA.'} CLÁUSULA PENAL:
              </h2>
              <p className="leading-relaxed text-[11px] text-slate-600">
                En caso de incumplimiento total o parcial de las obligaciones contraídas, la parte incumplida pagará a la otra a título
                de pena la suma de <strong>{formatearMoneda(data.clausulaPenalMonto)}</strong>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Firmas a doble columna */}
      <div className="pt-6 mt-6 border-t border-slate-300">
        <p className="text-xs text-slate-500 mb-6">
          En señal de conformidad y aceptación, se suscribe el presente documento en dos ejemplares del mismo tenor:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
          <SignatureBlock
            label="EL CONTRATANTE:"
            signatureType="text"
            name={data.nombreContratante}
            docType={data.tipoDocContratante}
            docNumber={data.numDocContratante}
            address={data.domicilioContratante}
            widthClass="w-full"
          />

          <SignatureBlock
            label="EL CONTRATISTA:"
            signatureType={data.signatureType || 'text'}
            signatureDataUrl={data.signatureDataUrl}
            name={data.nombreContratista}
            docType={data.tipoDocContratista}
            docNumber={data.numDocContratista}
            address={data.domicilioContratista}
            widthClass="w-full"
          />
        </div>
      </div>
    </div>
  );
};
