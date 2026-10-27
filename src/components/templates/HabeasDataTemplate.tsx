import React from 'react';
import { HabeasDataData, DocumentStyleConfig } from '../../types/documents';

interface Props {
  data: HabeasDataData;
  styleConfig: DocumentStyleConfig;
}

export const HabeasDataTemplate: React.FC<Props> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[14.5px] leading-relaxed'
      : 'text-[13px] leading-relaxed';

  const causalLabels: Record<HabeasDataData['causalSolicitud'], string> = {
    caducidad: 'Caducidad del dato negativo (Término legal máximo de permanencia cumplido)',
    suplantacion: 'Suplantación de identidad / Fraude',
    pago_total: 'Pago total y extinción de la obligación con término de permanencia vencido',
    inexistencia: 'Inexistencia de la relación contractual o error en la vinculación',
  };

  return (
    <div className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-6 sm:p-10 md:p-12 min-h-[1050px] flex flex-col justify-between`}>
      <div className="space-y-5">
        {/* Fecha y Ciudad */}
        <div className="text-right text-xs md:text-sm text-slate-700">
          <p>{data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}</p>
        </div>

        {/* Destinatario */}
        <div className="space-y-1 text-xs md:text-sm">
          <p className="font-semibold text-slate-900 uppercase">Señores:</p>
          <p className="font-bold text-slate-950 text-sm md:text-base uppercase">
            {data.centralDeRiesgo || 'CENTRAL DE INFORMACIÓN FINANCIERA'}
          </p>
          {data.entidadReportante && (
            <p className="text-slate-700">
              Con copia / vinculado a la entidad fuente: <strong>{data.entidadReportante}</strong>
            </p>
          )}
          <p className="text-slate-600">Área de Reclamaciones y Habeas Data</p>
        </div>

        {/* Asunto */}
        <div className="bg-slate-50 border-l-4 border-slate-900 p-3 my-2">
          <p className="font-bold text-slate-950 text-xs md:text-sm uppercase">
            ASUNTO:{' '}
            <span className="font-semibold normal-case text-slate-900">
              Ejercicio del derecho fundamental de Habeas Data (Leyes Estatutarias 1266 de 2008 y 2157 de 2021)
            </span>
          </p>
          {data.numeroObligacion && (
            <p className="text-xs text-slate-600 mt-1 font-mono">
              Obligación / Producto objeto de reclamación: {data.numeroObligacion}
            </p>
          )}
        </div>

        {/* Comparencia del titular */}
        <div className="text-justify text-slate-800">
          <p>
            Yo, <strong>{data.nombreTitular || '[NOMBRE DEL TITULAR]'}</strong>, mayor de edad, identificado(a) con{' '}
            <strong>{data.tipoDocTitular} N° {data.numDocTitular || '____________'}</strong>
            {data.expedicionTitular ? ` expedida en ${data.expedicionTitular}` : ''}, acudo a ustedes en ejercicio
            de la garantía constitucional de <strong>Habeas Data</strong> consagrada en el artículo 15 de la Constitución Política,
            la Ley 1266 de 2008 y la Ley 2157 de 2021, para formular la siguiente reclamación fundamentada en:
          </p>
        </div>

        {/* Causal invocada */}
        <div className="bg-blue-50/60 p-3 border border-blue-200 rounded-lg text-xs">
          <strong className="block text-blue-900 uppercase text-[10px] tracking-wider mb-0.5">
            Causal Legal de la Solicitud:
          </strong>
          <span className="font-semibold text-slate-900">{causalLabels[data.causalSolicitud]}</span>
        </div>

        {/* Hechos */}
        <div>
          <h2 className="font-bold text-slate-950 uppercase tracking-wide text-xs border-b border-slate-200 pb-1 mb-1.5">
            1. Hechos y Antecedentes
          </h2>
          <div className="text-justify text-slate-700 whitespace-pre-line leading-relaxed text-xs">
            {data.hechosDetallados || '(Narre los antecedentes de la obligación y las fechas de mora o pago...)'}
          </div>
        </div>

        {/* Pretensiones */}
        <div>
          <h2 className="font-bold text-slate-950 uppercase tracking-wide text-xs border-b border-slate-200 pb-1 mb-1.5">
            2. Pretensión Concreta
          </h2>
          <p className="text-justify text-slate-800 font-medium text-xs leading-relaxed">
            {data.pretensionConcreta || 'Se ordene la actualización o supresión del dato caduco.'}
          </p>
        </div>

        {/* Fundamentos legales de Habeas Data */}
        <div className="text-[11px] text-slate-600 border-t border-slate-200 pt-2">
          <strong>Fundamentos de Derecho:</strong> Artículo 15 de la C.P.; Ley 1266 de 2008; Ley 2157 de 2021 (Régimen de Borrón y Cuenta Nueva); y Sentencias C-1011 de 2008 y C-282 de 2021 de la Corte Constitucional, las cuales disponen el término de caducidad y la obligación de resolver el reclamo dentro de los quince (15) días hábiles siguientes.
        </div>

        {/* Anexos */}
        {data.anexosDocumentales && data.anexosDocumentales.length > 0 && (
          <div>
            <h2 className="font-bold text-slate-950 uppercase tracking-wide text-xs border-b border-slate-200 pb-1 mb-1">
              3. Pruebas y Anexos
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-0.5 text-slate-700 text-[11px]">
              {data.anexosDocumentales.map((anexo, idx) => (
                <li key={idx} className="pl-1">
                  {anexo}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notificaciones */}
        <div className="bg-slate-50 border border-slate-200 p-3 text-xs">
          <p className="font-bold text-slate-800 mb-1">Dirección y Notificaciones:</p>
          <p className="text-slate-700">Dirección: {data.direccionNotificacion || 'Dirección de residencia'}</p>
          <p className="text-slate-700">Correo Electrónico: {data.correoTitular || ''} | Tel: {data.telefonoTitular || ''}</p>
        </div>
      </div>

      {/* Firma */}
      <div className="pt-8 mt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-8">Atentamente y con el debido respeto,</p>
        <div className="w-80">
          <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
          <p className="font-bold text-slate-950 uppercase text-xs">
            {data.nombreTitular || 'FIRMA DEL TITULAR'}
          </p>
          <p className="text-[11px] text-slate-700">
            {data.tipoDocTitular}: <span className="font-mono">{data.numDocTitular || '________________'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
