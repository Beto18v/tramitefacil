import React from 'react';
import { ActaEntregaData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { User, Home, ClipboardCheck, Plus, Trash2, Key } from 'lucide-react';

interface Props {
  data: ActaEntregaData;
  onChange: (updated: ActaEntregaData) => void;
}

export const ActaEntregaForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof ActaEntregaData>(key: K, val: ActaEntregaData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddPaz = () => {
    update('pazSalvosPresentados', [...data.pazSalvosPresentados, '']);
  };

  const handleUpdatePaz = (idx: number, val: string) => {
    const list = [...data.pazSalvosPresentados];
    list[idx] = val;
    update('pazSalvosPresentados', list);
  };

  const handleRemovePaz = (idx: number) => {
    update('pazSalvosPresentados', data.pazSalvosPresentados.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Comparentes de la Entrega */}
      <CollapsibleSection
        title="Partes de la Entrega"
        subtitle="Quién entrega y quién recibe el inmueble"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">Quién Hace Entrega:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreEntrega}
                onChange={(e) => update('nombreEntrega', e.target.value)}
                placeholder="Nombre Completo"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="text"
                value={data.docEntrega}
                onChange={(e) => update('docEntrega', e.target.value)}
                placeholder="Documento (Ej: CC 53.012.345)"
                className="w-full min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <select
                value={data.calidadEntrega}
                onChange={(e) => update('calidadEntrega', e.target.value as any)}
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Arrendatario">En calidad de Arrendatario (Entrega de salida)</option>
                <option value="Arrendador">En calidad de Arrendador (Entrega inicial)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">Quién Recibe a Satisfacción:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreRecibe}
                onChange={(e) => update('nombreRecibe', e.target.value)}
                placeholder="Nombre Completo"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="text"
                value={data.docRecibe}
                onChange={(e) => update('docRecibe', e.target.value)}
                placeholder="Documento (Ej: CC 79.456.789)"
                className="w-full min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <select
                value={data.calidadRecibe}
                onChange={(e) => update('calidadRecibe', e.target.value as any)}
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Arrendador / Propietario">En calidad de Arrendador / Propietario</option>
                <option value="Arrendatario">En calidad de Arrendatario</option>
              </select>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Inmueble y Llaves */}
      <CollapsibleSection
        title="Inmueble, Fecha y Llaves"
        subtitle="Ubicación y juegos de llaves entregados"
        icon={<Home className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dirección del Inmueble</label>
            <input
              type="text"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej: Carrera 14 # 94-44, Apto 501"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ciudad</label>
            <input
              type="text"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hora de Inspección</label>
            <input
              type="text"
              value={data.hora}
              onChange={(e) => update('hora', e.target.value)}
              placeholder="Ej: 10:30 AM"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha</label>
            <input
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Juegos de Llaves Entregados</label>
            <input
              type="number"
              min="1"
              value={data.juegosLlavesEntregados || 2}
              onChange={(e) => update('juegosLlavesEntregados', parseInt(e.target.value, 10) || 1)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Lecturas de Medidores e Inventario */}
      <CollapsibleSection
        title="Lecturas de Medidores y Paz y Salvos"
        subtitle="Contadores de acueducto, energía, gas e inventario"
        icon={<ClipboardCheck className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Lectura Agua (m³)</label>
              <input
                type="text"
                value={data.lecturaAgua}
                onChange={(e) => update('lecturaAgua', e.target.value)}
                placeholder="Ej: 1.458 m³"
                className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Lectura Energía (kWh)</label>
              <input
                type="text"
                value={data.lecturaEnergia}
                onChange={(e) => update('lecturaEnergia', e.target.value)}
                placeholder="Ej: 28.940 kWh"
                className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Lectura Gas (m³)</label>
              <input
                type="text"
                value={data.lecturaGas}
                onChange={(e) => update('lecturaGas', e.target.value)}
                placeholder="Ej: 0.842 m³"
                className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Estado General de Muros, Pisos y Baños</label>
            <textarea
              rows={3}
              value={data.estadoGeneralParedesPisos}
              onChange={(e) => update('estadoGeneralParedesPisos', e.target.value)}
              placeholder="Paredes pintadas en blanco, pisos laminados aseados..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          {/* Paz y salvos aportados */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Paz y Salvos Aportados:</label>
              <button
                type="button"
                onClick={handleAddPaz}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar paz y salvo
              </button>
            </div>
            {data.pazSalvosPresentados.map((paz, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={paz}
                  onChange={(e) => handleUpdatePaz(idx, e.target.value)}
                  placeholder="Ej: Factura cancelada de Acueducto..."
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePaz(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Observaciones o Acuerdos Pendientes</label>
            <textarea
              rows={2}
              value={data.observacionesPendientes}
              onChange={(e) => update('observacionesPendientes', e.target.value)}
              placeholder="El inmueble se recibe a completa satisfacción sin pendientes..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
