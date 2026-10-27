import React from 'react';
import { AcuerdoNdaData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { SignaturePad } from '../SignaturePad';
import { ShieldCheck, Users, Calendar, DollarSign, Sparkles } from 'lucide-react';

interface Props {
  data: AcuerdoNdaData;
  onChange: (updated: AcuerdoNdaData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

const quickProposals = [
  {
    label: 'Desarrollo de Software & Algoritmos',
    text: 'Evaluación y posible desarrollo conjunto de plataformas tecnológicas, código fuente propietario, algoritmos y modelos de datos.',
  },
  {
    label: 'Alianza Estratégica & Comercial',
    text: 'Exploración de sinergias comerciales, intercambio de métricas financieras y análisis para una eventual sociedad comercial o distribución.',
  },
  {
    label: 'Inversión & Rueda de Capital',
    text: 'Revisión y auditoría (due diligence) de estados financieros, cartera de clientes, propiedad intelectual y métricas de tracción para ronda de financiamiento.',
  },
];

export const AcuerdoNdaForm: React.FC<Props> = ({ data, onChange, onSaveSignatureToProfile }) => {
  const update = <K extends keyof AcuerdoNdaData>(key: K, val: AcuerdoNdaData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Modalidad y Fechas */}
      <CollapsibleSection
        step="Paso 01"
        title="Modalidad y Lugar"
        subtitle="Tipo de confidencialidad, ciudad y fecha de suscripción"
        icon={<ShieldCheck className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tipo de Acuerdo
              </label>
              <select
                value={data.tipoNda}
                onChange={(e) => update('tipoNda', e.target.value as 'unilateral' | 'bilateral')}
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 bg-white"
              >
                <option value="unilateral">Unilateral (Una parte revela información a la otra)</option>
                <option value="bilateral">Bilateral / Mutuo (Ambas partes intercambian secretos)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ciudad de Celebración
              </label>
              <input
                type="text"
                value={data.ciudad}
                onChange={(e) => update('ciudad', e.target.value)}
                placeholder="Ej: Bogotá D.C."
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha del Acuerdo
              </label>
              <input
                type="date"
                value={data.fecha}
                onChange={(e) => update('fecha', e.target.value)}
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Duración de la Reserva (Años)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={data.duracionAnos || 3}
                onChange={(e) => update('duracionAnos', parseInt(e.target.value, 10) || 3)}
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Partes Involucradas */}
      <CollapsibleSection
        step="Paso 02"
        title="Partes Intervinientes"
        subtitle="Identificación de la parte emisora y de la parte receptora"
        icon={<Users className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Emisora */}
          <div className="p-3 bg-violet-50/50 border border-violet-100 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-violet-800 uppercase tracking-wide">
              {data.tipoNda === 'bilateral' ? 'Parte 1 (Divulgante y Receptora):' : 'Parte Emisora / Divulgante (Dueña de la Información):'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreParteEmisora}
                onChange={(e) => update('nombreParteEmisora', e.target.value)}
                placeholder="Nombre o Razón Social Emisora"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocEmisora}
                  onChange={(e) => update('tipoDocEmisora', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="NIT">NIT</option>
                  <option value="C.C.">C.C.</option>
                  <option value="C.E.">C.E.</option>
                </select>
                <input
                  type="text"
                  value={data.numDocEmisora}
                  onChange={(e) => update('numDocEmisora', e.target.value)}
                  placeholder="Número de documento"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.domicilioEmisora}
                onChange={(e) => update('domicilioEmisora', e.target.value)}
                placeholder="Domicilio / Sede principal"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Receptora */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
              {data.tipoNda === 'bilateral' ? 'Parte 2 (Divulgante y Receptora):' : 'Parte Receptora (Obligada a Guardar Secreto):'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreParteReceptora}
                onChange={(e) => update('nombreParteReceptora', e.target.value)}
                placeholder="Nombre o Razón Social Receptora"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocReceptora}
                  onChange={(e) => update('tipoDocReceptora', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="NIT">NIT</option>
                  <option value="C.C.">C.C.</option>
                  <option value="C.E.">C.E.</option>
                </select>
                <input
                  type="text"
                  value={data.numDocReceptora}
                  onChange={(e) => update('numDocReceptora', e.target.value)}
                  placeholder="Número de documento"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.domicilioReceptora}
                onChange={(e) => update('domicilioReceptora', e.target.value)}
                placeholder="Domicilio / Sede principal"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Propósito y Cláusulas Clave */}
      <CollapsibleSection
        step="Paso 03"
        title="Propósito y Penalidad"
        subtitle="Finalidad autorizada y cláusula penal de indemnización"
        icon={<Calendar className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          {/* Quick Picker */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>Plantillas Rápidas de Propósito (1 toque):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickProposals.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => update('propositoNegociacion', item.text)}
                  className="min-h-[38px] px-3 py-1.5 text-xs font-medium bg-white hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200 border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
                >
                  + {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Propósito de la Revelación (Finalidad autorizada)
            </label>
            <textarea
              rows={3}
              value={data.propositoNegociacion}
              onChange={(e) => update('propositoNegociacion', e.target.value)}
              placeholder="Indica para qué fin específico se divulgará la información confidencial..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Cláusula Penal por Incumplimiento o Fuga ($ COP)
            </label>
            <input
              type="number"
              min="0"
              step="500000"
              value={data.clausulaPenalMonto || ''}
              onChange={(e) => update('clausulaPenalMonto', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 50000000"
              className="w-full min-h-[44px] text-xs font-mono font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Monto indemnizatorio tasado anticipadamente sin perjuicio de las acciones penales y comerciales correspondientes.
            </p>
          </div>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px] p-3 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={data.incluirExclusionesEstandar}
              onChange={(e) => update('incluirExclusionesEstandar', e.target.checked)}
              className="w-4 h-4 text-violet-600 rounded border-slate-300"
            />
            <span className="text-xs text-slate-800">
              Incluir exclusiones legales estándar (información pública, conocida con anterioridad o requerida por orden judicial)
            </span>
          </label>
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Typográfica */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Acuerdo"
        subtitle="Firma manuscrita en pantalla o pie notarial formal"
        icon={<DollarSign className="w-5 h-5" />}
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
