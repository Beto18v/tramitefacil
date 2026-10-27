import React from 'react';
import { CartaRenunciaData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { SignaturePad } from '../SignaturePad';
import { Briefcase, Building, Calendar, HeartHandshake, Sparkles, User } from 'lucide-react';

interface Props {
  data: CartaRenunciaData;
  onChange: (updated: CartaRenunciaData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const CartaRenunciaForm: React.FC<Props> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof CartaRenunciaData>(key: K, val: CartaRenunciaData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleApplyMotivo = (categoria: CartaRenunciaData['motivoCategoria'], detalle: string) => {
    onChange({
      ...data,
      motivoCategoria: categoria,
      motivoDetalle: detalle,
    });
  };

  const quickMotives = [
    {
      label: 'Nuevos Retos',
      cat: 'nuevos_retos' as const,
      text: 'Esta determinación responde a una nueva oportunidad de desarrollo profesional que he decidido asumir, la cual se alinea con mis proyectos y metas de crecimiento a mediano y largo plazo.',
    },
    {
      label: 'Motivos Personales',
      cat: 'motivos_personales' as const,
      text: 'Esta renuncia obedece a razones estrictamente personales y familiares que demandan mi total dedicación y atención en este momento, haciéndome imposible continuar con mis responsabilidades laborales.',
    },
    {
      label: 'Estudios Superiores',
      cat: 'estudios' as const,
      text: 'Esta decisión obedece al inicio de un programa académico formal de educación superior que requiere mi dedicación de tiempo completo para mi formación profesional.',
    },
    {
      label: 'Traslado de Ciudad',
      cat: 'traslado' as const,
      text: 'Esta determinación se fundamenta en un inminente cambio de residencia a otra ciudad, situación que me impide físicamente seguir desempeñando mis funciones en la sede de la compañía.',
    },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Empresa y Destinatario */}
      <CollapsibleSection
        step="Paso 01"
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Jefe Inmediato o Director(a) RRHH</label>
            <input
              type="text"
              value={data.nombreDestinatario}
              onChange={(e) => update('nombreDestinatario', e.target.value)}
              placeholder="Ej: Dra. Marcela Echeverri"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo del Destinatario</label>
            <input
              type="text"
              value={data.cargoDestinatario}
              onChange={(e) => update('cargoDestinatario', e.target.value)}
              placeholder="Ej: Gerente de Talento Humano"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ciudad</label>
            <input
              type="text"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Medellín"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de la Carta</label>
            <input
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Tus Datos Laborales */}
      <CollapsibleSection
        step="Paso 02"
        title="Tus Datos y Cargo Laboral"
        subtitle="Cargo desempeñado, fecha de retiro y preaviso"
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo que Renuncias</label>
            <input
              type="text"
              value={data.cargoTrabajador}
              onChange={(e) => update('cargoTrabajador', e.target.value)}
              placeholder="Ej: Líder Técnico de Operaciones"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cédula de Ciudadanía</label>
            <input
              type="text"
              value={data.numeroDocumento}
              onChange={(e) => update('numeroDocumento', e.target.value)}
              placeholder="Ej: 1.045.789.234"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Ingreso (Opcional)</label>
            <input
              type="date"
              value={data.fechaIngreso}
              onChange={(e) => update('fechaIngreso', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Último Día Laboral Efectivo</label>
            <input
              type="date"
              value={data.ultimoDiaLaboral}
              onChange={(e) => update('ultimoDiaLaboral', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-indigo-50/20"
            />
          </div>

          {/* Switch de Exoneración de Preaviso */}
          <div className="sm:col-span-2 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.solicitaExoneracionPreaviso}
                onChange={(e) => update('solicitaExoneracionPreaviso', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  ¿Solicitar exoneración del plazo de preaviso legal?
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Permite retirarse de manera inmediata sin penalidad, solicitando la dispensa formal a la empresa.
                </span>
              </div>
            </label>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Motivo y Agradecimiento */}
      <CollapsibleSection
        step="Paso 03"
        title="Motivo, Agradecimiento y Liquidación"
        subtitle="Razones de renuncia, empalme y solicitud de pago de prestaciones"
        icon={<HeartHandshake className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Quick Motive Pickers */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Selecciona un motivo común pre-redactado (1 toque):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickMotives.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => handleApplyMotivo(m.cat, m.text)}
                  className="min-h-[38px] px-3 py-1.5 text-xs font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Redacción Detallada del Motivo</label>
            <textarea
              rows={3}
              value={data.motivoDetalle}
              onChange={(e) => update('motivoDetalle', e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Párrafo de Agradecimiento</label>
            <textarea
              rows={3}
              value={data.parrafoAgradecimiento}
              onChange={(e) => update('parrafoAgradecimiento', e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.ofrecimientoEmpalme}
                onChange={(e) => update('ofrecimientoEmpalme', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300"
              />
              <span className="text-xs text-slate-700">
                Ofrecer empalme y entrega formal de funciones pendientes
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.solicitudLiquidacion}
                onChange={(e) => update('solicitudLiquidacion', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300"
              />
              <span className="text-xs text-slate-700">
                Solicitar examen médico de egreso, paz y salvo y liquidación definitiva de prestaciones
              </span>
            </label>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Tipográfica */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Trabajador"
        subtitle="Firma manuscrita en pantalla o pie notarial impreso"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <SignaturePad
          signatureType={data.signatureType || 'text'}
          signatureDataUrl={data.signatureDataUrl}
          onSignatureChange={(type, dataUrl) => {
            onChange({
              ...data,
              signatureType: type,
              signatureDataUrl: dataUrl,
            });
          }}
          onSaveToProfile={onSaveSignatureToProfile}
        />
      </CollapsibleSection>
    </div>
  );
};
