import React from 'react';
import { CartaRenunciaData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { Briefcase, Building, Calendar, HeartHandshake } from 'lucide-react';

interface Props {
  data: CartaRenunciaData;
  onChange: (updated: CartaRenunciaData) => void;
}

export const CartaRenunciaForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof CartaRenunciaData>(key: K, val: CartaRenunciaData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleMotivoCategoriaChange = (categoria: CartaRenunciaData['motivoCategoria']) => {
    let sugerencia = '';
    if (categoria === 'nuevos_retos') {
      sugerencia =
        'Esta determinación responde a una nueva oportunidad de desarrollo profesional y laboral que he decidido asumir, la cual se alinea con mis proyectos y metas de crecimiento a mediano y largo plazo.';
    } else if (categoria === 'motivos_personales') {
      sugerencia =
        'Esta renuncia obedece a razones estrictamente personales y familiares que demandan mi total dedicación y atención en este momento, haciéndome imposible continuar con mis responsabilidades laborales.';
    } else if (categoria === 'estudios') {
      sugerencia =
        'Esta decisión obedece al inicio de un programa académico formal de educación superior que requiere mi dedicación de tiempo completo para mi formación profesional.';
    } else if (categoria === 'traslado') {
      sugerencia =
        'Esta determinación se fundamenta en un inminente cambio de residencia a otra ciudad, situación que me impide físicamente seguir desempeñando mis funciones en la sede de la compañía.';
    }

    onChange({
      ...data,
      motivoCategoria: categoria,
      motivoDetalle: sugerencia || data.motivoDetalle,
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Empresa y Destinatario */}
      <CollapsibleSection
        title="Empresa y Destinatario"
        subtitle="Nombre de la empresa, jefatura o talento humano"
        icon={<Building className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre de la Empresa o Empleador</label>
            <input
              type="text"
              value={data.nombreEmpresa}
              onChange={(e) => update('nombreEmpresa', e.target.value)}
              placeholder="Ej: TECNOLOGÍAS DEL PACÍFICO S.A.S."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Jefe Inmediato o Director(a) RRHH</label>
            <input
              type="text"
              value={data.nombreDestinatario}
              onChange={(e) => update('nombreDestinatario', e.target.value)}
              placeholder="Ej: Dra. Marcela Echeverri"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo del Destinatario</label>
            <input
              type="text"
              value={data.cargoDestinatario}
              onChange={(e) => update('cargoDestinatario', e.target.value)}
              placeholder="Ej: Gerente de Talento Humano"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ciudad</label>
            <input
              type="text"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Medellín"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de la Carta</label>
            <input
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Tus Datos Laborales */}
      <CollapsibleSection
        title="Tus Datos y Cargo"
        subtitle="Cargo desempeñado y fecha de retiro efectivo"
        icon={<Briefcase className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tu Nombre Completo</label>
            <input
              type="text"
              value={data.nombreTrabajador}
              onChange={(e) => update('nombreTrabajador', e.target.value)}
              placeholder="Ej: Andrés Felipe Cardona Giraldo"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo que Renuncias</label>
            <input
              type="text"
              value={data.cargoTrabajador}
              onChange={(e) => update('cargoTrabajador', e.target.value)}
              placeholder="Ej: Líder Técnico de Operaciones"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cédula de Ciudadanía</label>
            <input
              type="text"
              value={data.numeroDocumento}
              onChange={(e) => update('numeroDocumento', e.target.value)}
              placeholder="Ej: 1.035.789.442"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Ingreso (Opcional)</label>
            <input
              type="date"
              value={data.fechaIngreso}
              onChange={(e) => update('fechaIngreso', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Último Día Laboral (Efectividad)</label>
            <input
              type="date"
              value={data.ultimoDiaLaboral}
              onChange={(e) => update('ultimoDiaLaboral', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-50/20 font-semibold"
            />
          </div>
        </div>

        {/* Exoneración de preaviso toggle */}
        <label className="flex items-start gap-3 cursor-pointer min-h-[44px] p-3 bg-slate-50 border border-slate-200 rounded-xl mt-2">
          <input
            type="checkbox"
            checked={data.solicitaExoneracionPreaviso}
            onChange={(e) => update('solicitaExoneracionPreaviso', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300"
          />
          <span className="text-xs text-slate-700 leading-relaxed">
            <strong>Solicitar Exoneración de Preaviso:</strong> Incluir párrafo formal solicitando a la empresa ser exonerado(a) del término ordinario de preaviso para retiro inmediato en la fecha fijada.
          </span>
        </label>
      </CollapsibleSection>

      {/* 3. Motivo y Agradecimiento */}
      <CollapsibleSection
        title="Motivo, Agradecimiento y Liquidación"
        subtitle="Razones de renuncia, empalme y solicitud de pago de prestaciones"
        icon={<HeartHandshake className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Categoría del Motivo</label>
            <select
              value={data.motivoCategoria}
              onChange={(e) => handleMotivoCategoriaChange(e.target.value as any)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="nuevos_retos">Nuevos retos y oportunidades profesionales</option>
              <option value="motivos_personales">Motivos estrictamente personales / familiares</option>
              <option value="estudios">Continuación de estudios académicos</option>
              <option value="traslado">Cambio de residencia / traslado</option>
              <option value="otro">Otro motivo personalizado</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Redacción Detallada del Motivo</label>
            <textarea
              rows={3}
              value={data.motivoDetalle}
              onChange={(e) => update('motivoDetalle', e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Párrafo de Agradecimiento</label>
            <textarea
              rows={3}
              value={data.parrafoAgradecimiento}
              onChange={(e) => update('parrafoAgradecimiento', e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.ofrecimientoEmpalme}
                onChange={(e) => update('ofrecimientoEmpalme', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="text-xs text-slate-700">
                Ofrecer empalme y entrega formal de funciones
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.solicitudLiquidacion}
                onChange={(e) => update('solicitudLiquidacion', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="text-xs text-slate-700">
                Solicitar examen médico de egreso, paz y salvo y liquidación de prestaciones
              </span>
            </label>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
