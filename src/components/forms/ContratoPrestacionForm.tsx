import React from 'react';
import { ContratoPrestacionData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { SignaturePad } from '../SignaturePad';
import { User, Building, ScrollText, DollarSign, Plus, Trash2, ShieldCheck, PenTool } from 'lucide-react';

interface Props {
  data: ContratoPrestacionData;
  onChange: (updated: ContratoPrestacionData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const ContratoPrestacionForm: React.FC<Props> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof ContratoPrestacionData>(key: K, val: ContratoPrestacionData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddObligacion = () => {
    update('obligacionesContratista', [...data.obligacionesContratista, '']);
  };

  const handleUpdateObligacion = (idx: number, val: string) => {
    const list = [...data.obligacionesContratista];
    list[idx] = val;
    update('obligacionesContratista', list);
  };

  const handleRemoveObligacion = (idx: number) => {
    if (data.obligacionesContratista.length <= 1) {
      update('obligacionesContratista', ['']);
      return;
    }
    update('obligacionesContratista', data.obligacionesContratista.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Partes Contratantes */}
      <CollapsibleSection
        title="Partes del Contrato"
        subtitle="Identificación del Contratante y Contratista"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">Datos del Contratante:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreContratante}
                onChange={(e) => update('nombreContratante', e.target.value)}
                placeholder="Razón Social / Nombre Contratante"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocContratante}
                  onChange={(e) => update('tipoDocContratante', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="NIT">NIT</option>
                  <option value="C.C.">C.C.</option>
                </select>
                <input
                  type="text"
                  value={data.numDocContratante}
                  onChange={(e) => update('numDocContratante', e.target.value)}
                  placeholder="Número de Identificación"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.domicilioContratante}
                onChange={(e) => update('domicilioContratante', e.target.value)}
                placeholder="Domicilio / Dirección Contratante"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">Datos del Contratista:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreContratista}
                onChange={(e) => update('nombreContratista', e.target.value)}
                placeholder="Nombre Completo del Contratista"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocContratista}
                  onChange={(e) => update('tipoDocContratista', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Cédula de Ciudadanía">C.C.</option>
                  <option value="Cédula de Extranjería">C.E.</option>
                  <option value="NIT">NIT</option>
                </select>
                <input
                  type="text"
                  value={data.numDocContratista}
                  onChange={(e) => update('numDocContratista', e.target.value)}
                  placeholder="Número de Cédula"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.domicilioContratista}
                onChange={(e) => update('domicilioContratista', e.target.value)}
                placeholder="Domicilio / Dirección Contratista"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Objeto y Obligaciones */}
      <CollapsibleSection
        title="Objeto del Contrato y Obligaciones"
        subtitle="Descripción de los servicios a prestar"
        icon={<ScrollText className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Objeto Contractual</label>
            <textarea
              rows={3}
              value={data.objetoContrato}
              onChange={(e) => update('objetoContrato', e.target.value)}
              placeholder="Ej: El contratista se obliga a prestar de forma autónoma los servicios de..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Obligaciones Específicas:</label>
              <button
                type="button"
                onClick={handleAddObligacion}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar obligación
              </button>
            </div>
            {data.obligacionesContratista.map((ob, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={ob}
                  onChange={(e) => handleUpdateObligacion(idx, e.target.value)}
                  placeholder={`Obligación ${idx + 1}...`}
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveObligacion(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Honorarios y Plazos */}
      <CollapsibleSection
        title="Valor, Pagos y Plazos"
        subtitle="Monto total pactado, fechas y lugar de ejecución"
        icon={<DollarSign className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Valor Total del Contrato ($)</label>
            <input
              type="number"
              min="0"
              value={data.valorContrato || ''}
              onChange={(e) => update('valorContrato', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 18000000"
              className="w-full min-h-[44px] text-xs font-mono font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Lugar de Ejecución</label>
            <input
              type="text"
              value={data.lugarEjecucion}
              onChange={(e) => update('lugarEjecucion', e.target.value)}
              placeholder="Ej: Remoto / Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Inicio</label>
            <input
              type="date"
              value={data.fechaInicio}
              onChange={(e) => update('fechaInicio', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Terminación</label>
            <input
              type="date"
              value={data.fechaTerminacion}
              onChange={(e) => update('fechaTerminacion', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Forma de Pago</label>
            <input
              type="text"
              value={data.formaPago}
              onChange={(e) => update('formaPago', e.target.value)}
              placeholder="Ej: Cuotas mensuales previa cuenta de cobro..."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cláusula Penal ($)</label>
            <input
              type="number"
              min="0"
              value={data.clausulaPenalMonto || ''}
              onChange={(e) => update('clausulaPenalMonto', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 3600000"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-200">
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={data.clausulaIndependencia}
              onChange={(e) => update('clausulaIndependencia', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <span className="text-xs text-slate-700">
              Incluir cláusula expresa de total autonomía técnica sin relación de subordinación laboral
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={data.incluirConfidencialidad}
              onChange={(e) => update('incluirConfidencialidad', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <span className="text-xs text-slate-700">
              Incluir cláusula de confidencialidad y reserva estricta de información y propiedad intelectual
            </span>
          </label>
        </div>
      </CollapsibleSection>

      {/* 4. Firma y Suscripción */}
      <CollapsibleSection
        title="Firma del Contratista"
        subtitle="Dibuja tu firma digital en pantalla o usa la línea editorial"
        icon={<PenTool className="w-5 h-5" />}
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
