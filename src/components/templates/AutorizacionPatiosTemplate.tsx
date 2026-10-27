import React from 'react';
import { AutorizacionPatiosData, DocumentStyleConfig } from '../../types/documents';
import { SignatureBlock } from './SignatureBlock';

interface Props {
  data: AutorizacionPatiosData;
  styleConfig: DocumentStyleConfig;
}

export const AutorizacionPatiosTemplate: React.FC<Props> = ({ data, styleConfig }) => {
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
            Poder Especial y Autorización para Retiro de Vehículo en Patios
          </h1>
          <p className="text-[10.5px] sm:text-[11px] text-slate-600 uppercase tracking-widest mt-0.5">
            Trámite de Desinmovilización y Restitución Vehicular - Ley 769 de 2002
          </p>
        </div>

        {/* Date and Location */}
        <div className="text-right text-xs text-slate-600">
          <p>{data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}</p>
        </div>

        {/* Destinatario */}
        <div className="text-slate-800 space-y-0.5 text-xs">
          <p className="font-bold text-slate-900">Señores:</p>
          <p className="font-bold uppercase text-slate-950">{data.organismoTransito || 'ORGANISMO DE TRÁNSITO Y TRANSPORTE'}</p>
          <p>Área de Trámites y Entrega de Vehículos Inmovilizados / Patios</p>
          <p>{data.ciudad || 'Presente'}</p>
        </div>

        {/* Asunto */}
        <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs">
          <p className="font-bold text-slate-900">
            ASUNTO: <span className="font-normal">Poder especial amplio y suficiente para retiro de vehículo inmovilizado con placas</span>{' '}
            <strong className="font-mono text-slate-950">{data.placaVehiculo || '_______'}</strong>
            {data.numeroComparendo ? ` (Comparendo / Orden N° ${data.numeroComparendo})` : ''}.
          </p>
        </div>

        {/* Cuerpo del mandato */}
        <div className="text-justify text-slate-800 space-y-3">
          <p>
            Yo, <strong>{data.nombrePropietario || '[NOMBRE DEL PROPIETARIO]'}</strong>, mayor de edad, identificado(a) con{' '}
            {data.tipoDocPropietario} N° <strong>{data.numDocPropietario || '____________'}</strong>, domiciliado(a) en la ciudad de{' '}
            {data.ciudad || 'esta ciudad'}, en mi calidad de propietario(a) debidamente inscrito(a) en el Registro Terrestre Automotor
            del vehículo automotor con placas <strong className="font-mono text-slate-950">{data.placaVehiculo || '_______'}</strong>,
            marca/línea <strong>{data.marcaModelo || '_______'}</strong>, manifiesto que por medio del presente instrumento confiero{' '}
            <strong>PODER ESPECIAL, AMPLIO Y SUFICIENTE</strong> a{' '}
            <strong>{data.nombreAutorizado || '[NOMBRE DEL APODERADO / AUTORIZADO]'}</strong>, identificado(a) con{' '}
            {data.tipoDocAutorizado} N° <strong>{data.numDocAutorizado || '____________'}</strong>, teléfono {data.telefonoAutorizado || '_______'},
            para que en mi nombre y representación adelante todas las diligencias inherentes a la desinmovilización y retiro del automotor.
          </p>

          <div>
            <p className="font-bold text-slate-900 mb-1">
              El apoderado queda expresamente facultado para:
            </p>
            {data.facultadesExpresas && data.facultadesExpresas.length > 0 && data.facultadesExpresas.some((f) => f.trim()) ? (
              <ol className="list-decimal list-outside ml-5 space-y-1 text-slate-700">
                {data.facultadesExpresas
                  .filter((f) => f.trim())
                  .map((fac, idx) => (
                    <li key={idx} className="pl-1">
                      {fac}
                    </li>
                  ))}
              </ol>
            ) : (
              <p className="italic text-slate-400">(Liste las facultades conferidas...)</p>
            )}
          </div>

          <p className="text-[11px] text-slate-600">
            El apoderado cuenta con facultades para comparecer a audiencias contravencionales si fuere del caso, presentar los
            comprobantes de pago correspondientes a servicios de grúa y parqueadero en el patio de custodia ubicado en{' '}
            <strong>{data.patioUbicacion || 'los patios oficiales'}</strong>, suscribir la correspondiente acta de entrega e inventario físico,
            recibir las llaves y conducir o transportar el vehículo fuera de las instalaciones del patio.
          </p>
        </div>
      </div>

      {/* Firmas y Recuadro de Huella */}
      <div className="pt-6 mt-6 border-t border-slate-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
          {/* Otorgante con huella */}
          <div className="flex gap-4 items-end">
            <SignatureBlock
              label="OTORGANTE / PODERDANTE:"
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              name={data.nombrePropietario}
              docType={data.tipoDocPropietario}
              docNumber={data.numDocPropietario}
              phone={data.telefonoPropietario}
              role="Propietario del Automotor"
              widthClass="flex-1"
            />

            {data.incluirRecuadroHuella && (
              <div className="w-20 h-24 border-2 border-dashed border-slate-400 rounded-lg flex flex-col items-center justify-center p-1 text-center shrink-0 mb-1">
                <span className="text-[9px] uppercase font-bold text-slate-500">Huella</span>
                <span className="text-[8px] text-slate-400 leading-tight">Índice Derecho</span>
              </div>
            )}
          </div>

          {/* Aceptación del apoderado */}
          <div>
            <SignatureBlock
              label="ACEPTO (APODERADO / AUTORIZADO):"
              signatureType="text"
              name={data.nombreAutorizado}
              docType={data.tipoDocAutorizado}
              docNumber={data.numDocAutorizado}
              phone={data.telefonoAutorizado}
              role="Persona Autorizada"
              widthClass="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
