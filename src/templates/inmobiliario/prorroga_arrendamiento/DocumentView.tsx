import React from 'react';
import { ProrrogaArrendamientoData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';
import { SignatureBlock, LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<ProrrogaArrendamientoData>> = ({
  data,
  styleConfig,
}) => {
  const canonAnteriorFormateado = formatearMoneda(data.canonAnterior);
  const canonAnteriorLetras = numeroALetras(data.canonAnterior);
  const nuevoCanonFormateado = formatearMoneda(data.nuevoCanon);
  const nuevoCanonLetras = data.nuevoCanonLetras || numeroALetras(data.nuevoCanon);

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="banner"
      banner={{
        align: 'center',
        title: 'Otrosí de Prórroga e Incremento de Canon',
        subtitle: `Modificatorio al Contrato de Arrendamiento de ${
          data.usoInmueble === 'vivienda' ? 'Vivienda Urbana' : 'Inmueble Comercial'
        }`,
        dateCity: `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha de suscripción'}`,
        badge: `Destinación: ${data.usoInmueble === 'vivienda' ? 'Vivienda' : 'Comercial'}`,
      }}
      signatures={
        <div className="pt-8 border-t border-slate-300">
          <p className="text-xs text-slate-500 mb-8">
            En constancia de mutuo y pleno acuerdo, las partes intervinientes suscriben el presente otrosí en
            dos (2) ejemplares de idéntico valor probatorio:
          </p>
          <div
            className={`grid grid-cols-1 ${
              data.incluyeCodeudor && data.nombreCodeudor ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
            } gap-6 items-end`}
          >
            <SignatureBlock
              label="EL ARRENDADOR:"
              signatureType="text"
              name={data.nombreArrendador}
              docType={data.tipoDocArrendador}
              docNumber={data.numDocArrendador}
              phone={data.telefonoArrendador}
              email={data.correoArrendador}
              widthClass="w-full"
            />

            <SignatureBlock
              label="EL ARRENDATARIO:"
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              name={data.nombreArrendatario}
              docType={data.tipoDocArrendatario}
              docNumber={data.numDocArrendatario}
              phone={data.telefonoArrendatario}
              email={data.correoArrendatario}
              widthClass="w-full"
            />

            {data.incluyeCodeudor && data.nombreCodeudor && (
              <SignatureBlock
                label="CODEUDOR SOLIDARIO:"
                signatureType="text"
                name={data.nombreCodeudor}
                docType={data.tipoDocCodeudor}
                docNumber={data.numDocCodeudor}
                phone={data.telefonoCodeudor}
                widthClass="w-full"
              />
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-justify text-slate-800 leading-relaxed text-xs md:text-sm">
        {/* Comparecencia */}
        <p>
          Entre los suscritos a saber, de una parte <strong>{data.nombreArrendador || '________________'}</strong>,
          mayor de edad, domiciliado(a) en {data.ciudad || 'esta ciudad'}, identificado(a) con{' '}
          {data.tipoDocArrendador} N° <strong>{data.numDocArrendador || '________________'}</strong>, quien en adelante
          y para todos los efectos legales se denominará <strong>EL ARRENDADOR</strong>; y de otra parte{' '}
          <strong>{data.nombreArrendatario || '________________'}</strong>, mayor de edad, identificado(a) con{' '}
          {data.tipoDocArrendatario} N° <strong>{data.numDocArrendatario || '________________'}</strong>, quien para los
          mismos efectos se denominará <strong>EL ARRENDATARIO</strong>
          {data.incluyeCodeudor && data.nombreCodeudor ? (
            <span>
              ; y <strong>{data.nombreCodeudor}</strong>, identificado(a) con {data.tipoDocCodeudor} N°{' '}
              <strong>{data.numDocCodeudor || '________________'}</strong> en su calidad de{' '}
              <strong>CODEUDOR SOLIDARIO</strong>
            </span>
          ) : null}
          , hemos convenido libre y voluntariamente celebrar el presente otrosí modificatorio al contrato de arrendamiento
          vigente, previas las siguientes consideraciones:
        </p>

        {/* Considerandos */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700 space-y-1.5 text-xs">
          <p className="font-semibold text-slate-900">CONSIDERACIONES PREVIAS:</p>
          <p>
            1. Que entre las partes se celebró un contrato de arrendamiento de {data.usoInmueble === 'vivienda' ? 'vivienda urbana' : 'local comercial'}
            {data.numeroContratoOriginal ? ` bajo el N° ${data.numeroContratoOriginal}` : ''} con fecha{' '}
            <strong>{data.fechaContratoOriginal || '____/__/__'}</strong>, respecto al inmueble ubicado en la{' '}
            <strong>{data.direccionInmueble || '[DIRECCIÓN DEL INMUEBLE]'}</strong>
            {data.ciudadInmueble ? ` de ${data.ciudadInmueble}` : ''}
            {data.matriculaInmobiliaria ? ` (Matrícula Inmobiliaria N° ${data.matriculaInmobiliaria})` : ''}.
          </p>
          <p>
            2. Que es mutua voluntad de los contratantes extender la vigencia del citado contrato y acordar el reajuste
            económico correspondiente al nuevo período de ejecución.
          </p>
        </div>

        {/* Cláusulas */}
        <div className="space-y-4">
          <div>
            <p className="font-bold text-slate-900 mb-1">
              CLÁUSULA PRIMERA. PRÓRROGA DEL PLAZO CONTRACTUAL:
            </p>
            <p>
              Las partes acuerdan prorrogar el término de duración del contrato de arrendamiento base por un período
              adicional de <strong>{data.duracionMeses || 12} meses</strong>, el cual comenzará a regir a partir del{' '}
              <strong>{data.fechaInicioProrroga || '____/__/__'}</strong> y finalizará el día{' '}
              <strong>{data.fechaFinProrroga || '____/__/__'}</strong>.
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-900 mb-1">
              CLÁUSULA SEGUNDA. AJUSTE E INCREMENTO DEL CANON DE ARRENDAMIENTO:
            </p>
            <p>
              De conformidad con lo dispuesto en el artículo 20 de la Ley 820 de 2003 para vivienda urbana y la
              autonomía de la voluntad contractual, las partes acuerdan aplicar un incremento del{' '}
              <strong>{data.porcentajeIncremento}%</strong> sobre el canon anterior ({canonAnteriorFormateado} -{' '}
              <em>{canonAnteriorLetras}</em>). Por consiguiente, el nuevo canon mensual de arrendamiento que regirá
              durante la presente prórroga será la suma de <strong>{nuevoCanonFormateado}</strong> (
              <strong>{nuevoCanonLetras}</strong>).
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-900 mb-1">
              CLÁUSULA TERCERA. FORMA Y OPORTUNIDAD DE PAGO:
            </p>
            <p>
              EL ARRENDATARIO continuará cancelando el nuevo valor mensual pactado{' '}
              {data.formaDePago || 'dentro de los primeros cinco (5) días hábiles de cada período mensual'}
              {data.cuentaBancariaPago ? ` mediante consignación o transferencia electrónica a: ${data.cuentaBancariaPago}.` : '.'}
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-900 mb-1">
              CLÁUSULA CUARTA. RATIFICACIÓN DE LAS DEMÁS CLÁUSULAS CONTRACTUALES:
            </p>
            <p>
              {data.ratificacionTexto ||
                'Las partes ratifican expresamente que todas y cada una de las demás cláusulas, garantías, prohibiciones y estipulaciones pactadas en el contrato original que no fueron objeto de modificación mediante este instrumento continúan plenamente vigentes y surtiendo plenos efectos jurídicos entre los suscribientes.'}
            </p>
          </div>
        </div>
      </div>
    </LegalDocumentShell>
  );
};
