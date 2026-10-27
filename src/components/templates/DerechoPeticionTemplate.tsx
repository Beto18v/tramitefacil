import React from 'react';
import { DerechoPeticionData, DocumentStyleConfig } from '../../types/documents';

interface Props {
  data: DerechoPeticionData;
  styleConfig: DocumentStyleConfig;
}

export const DerechoPeticionTemplate: React.FC<Props> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[14.5px] leading-relaxed'
      : 'text-[13px] leading-relaxed';

  return (
    <div className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-8 md:p-12 min-h-[1050px] flex flex-col justify-between`}>
      <div className="space-y-5">
        {/* Fecha y Ciudad */}
        <div className="text-right text-xs md:text-sm text-slate-700">
          <p>
            {data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha de radicación'}
          </p>
        </div>

        {/* Destinatario */}
        <div className="space-y-1 text-xs md:text-sm">
          <p className="font-semibold text-slate-900 uppercase">Señores:</p>
          <p className="font-bold text-slate-950 text-sm md:text-base uppercase">
            {data.entidadDestinataria || 'NOMBRE DE LA ENTIDAD / EMPRESA'}
          </p>
          {data.cargoDestinatario && (
            <p className="text-slate-700">Atn: {data.cargoDestinatario}</p>
          )}
          {data.dependenciaDestinataria && (
            <p className="text-slate-600">{data.dependenciaDestinataria}</p>
          )}
          {data.direccionEntidad && (
            <p className="text-slate-600">{data.direccionEntidad}</p>
          )}
          {data.correoEntidad && (
            <p className="text-slate-600">Correo: {data.correoEntidad}</p>
          )}
        </div>

        {/* Asunto & Referencia */}
        <div className="bg-slate-50 border-l-4 border-slate-900 p-3 my-3">
          <p className="font-bold text-slate-950 text-xs md:text-sm uppercase">
            ASUNTO:{' '}
            <span className="font-semibold normal-case text-slate-900">
              {data.asunto || 'DERECHO DE PETICIÓN (Art. 23 Constitución Política de Colombia)'}
            </span>
          </p>
          {data.referencia && (
            <p className="text-xs text-slate-600 mt-1">
              <strong>Referencia / Trámite:</strong> {data.referencia}
            </p>
          )}
        </div>

        {/* Encabezado formal del peticionario */}
        <div className="text-justify text-slate-800">
          <p>
            Yo, <strong>{data.nombrePeticionario || '[NOMBRE DEL PETICIONARIO]'}</strong>, mayor de edad, identificado(a) con{' '}
            <strong>{data.tipoDocumento} N° {data.numeroDocumento || '____________'}</strong>
            {data.lugarExpedicion ? ` expedida en ${data.lugarExpedicion}` : ''}, domiciliado(a) en la ciudad de{' '}
            {data.ciudadNotificacion || data.ciudad || 'esta ciudad'}, en ejercicio del derecho fundamental consagrado en el{' '}
            <strong>Artículo 23 de la Constitución Política de Colombia</strong> y regulado de manera integral por la{' '}
            <strong>Ley Estatutaria 1755 de 2015</strong>, acudo respetuosamente ante su despacho con el fin de formular la
            siguiente solicitud formal con fundamento en los siguientes:
          </p>
        </div>

        {/* I. Hechos */}
        <div>
          <h2 className="font-bold text-slate-950 uppercase tracking-wide text-xs md:text-sm border-b border-slate-300 pb-1 mb-2">
            I. Fundamentos de Hecho
          </h2>
          {data.hechos && data.hechos.length > 0 && data.hechos.some((h) => h.trim() !== '') ? (
            <ol className="list-decimal list-outside ml-5 space-y-2 text-justify text-slate-800">
              {data.hechos
                .filter((h) => h.trim() !== '')
                .map((hecho, idx) => (
                  <li key={idx} className="pl-1">
                    {hecho}
                  </li>
                ))}
            </ol>
          ) : (
            <p className="text-slate-400 italic text-xs">
              (Describa de forma cronológica y ordenada los hechos que motivan su petición...)
            </p>
          )}
        </div>

        {/* II. Peticiones / Pretensiones */}
        <div>
          <h2 className="font-bold text-slate-950 uppercase tracking-wide text-xs md:text-sm border-b border-slate-300 pb-1 mb-2">
            II. Peticiones y Pretensiones
          </h2>
          <p className="text-xs text-slate-600 mb-2">
            Con base en los hechos expuestos, solicito respetuosamente a su entidad acceder a lo siguiente:
          </p>
          {data.pretensiones && data.pretensiones.length > 0 && data.pretensiones.some((p) => p.trim() !== '') ? (
            <ol className="list-decimal list-outside ml-5 space-y-2 text-justify text-slate-800">
              {data.pretensiones
                .filter((p) => p.trim() !== '')
                .map((pretension, idx) => (
                  <li key={idx} className="pl-1 font-medium">
                    {pretension}
                  </li>
                ))}
            </ol>
          ) : (
            <p className="text-slate-400 italic text-xs">
              (Indique de forma concreta, clara y numerada las solicitudes requeridas...)
            </p>
          )}
        </div>

        {/* III. Fundamentos de Derecho */}
        {data.fundamentosDerecho && (
          <div>
            <h2 className="font-bold text-slate-950 uppercase tracking-wide text-xs md:text-sm border-b border-slate-300 pb-1 mb-1.5">
              III. Fundamentos Jurídicos
            </h2>
            <p className="text-justify text-slate-700 text-xs leading-relaxed">
              {data.fundamentosDerecho}
            </p>
          </div>
        )}

        {/* IV. Anexos y Pruebas */}
        {data.anexos && data.anexos.length > 0 && data.anexos.some((a) => a.trim() !== '') && (
          <div>
            <h2 className="font-bold text-slate-950 uppercase tracking-wide text-xs md:text-sm border-b border-slate-300 pb-1 mb-1.5">
              IV. Documentos y Pruebas que se Anexan
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-slate-700 text-xs">
              {data.anexos
                .filter((a) => a.trim() !== '')
                .map((anexo, idx) => (
                  <li key={idx} className="pl-1">
                    {anexo}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* V. Notificaciones */}
        <div className="bg-slate-50 border border-slate-200 p-3 text-xs">
          <h2 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
            V. Lugar de Notificación
          </h2>
          <p className="text-slate-700 mb-1">
            Recibiré respuesta formal a esta petición en cualquiera de los siguientes medios:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-800">
            <div>
              <span className="font-medium text-slate-600">Dirección de residencia:</span>{' '}
              {data.direccionNotificacion || '_______________________________'} (
              {data.ciudadNotificacion || data.ciudad || 'Ciudad'})
            </div>
            <div>
              <span className="font-medium text-slate-600">Correo Electrónico (Principal):</span>{' '}
              <span className="font-mono text-slate-900 font-medium">{data.correo || '_____________________'}</span>
            </div>
            {data.telefono && (
              <div>
                <span className="font-medium text-slate-600">Teléfono móvil de contacto:</span>{' '}
                <span className="font-mono">{data.telefono}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Firma */}
      <div className="pt-8 mt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-8">Atentamente y con el debido respeto,</p>
        <div className="w-80">
          <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
          <p className="font-bold text-slate-950 uppercase text-sm">
            {data.nombrePeticionario || 'NOMBRE DEL PETICIONARIO'}
          </p>
          <p className="text-xs text-slate-700">
            {data.tipoDocumento}:{' '}
            <span className="font-mono">{data.numeroDocumento || '________________'}</span>
            {data.lugarExpedicion ? ` de ${data.lugarExpedicion}` : ''}
          </p>
          {data.telefono && <p className="text-xs text-slate-600">Tel: {data.telefono}</p>}
          {data.correo && <p className="text-xs text-slate-600">Email: {data.correo}</p>}
        </div>
      </div>
    </div>
  );
};
