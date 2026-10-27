import React from 'react';
import { ContratoArrendamientoData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { User, Home, DollarSign, Calendar, KeyRound } from 'lucide-react';

interface Props {
  data: ContratoArrendamientoData;
  onChange: (updated: ContratoArrendamientoData) => void;
}

export const ContratoArrendamientoForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof ContratoArrendamientoData>(key: K, val: ContratoArrendamientoData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Partes Arrendador y Arrendatario */}
      <CollapsibleSection
        title="Partes del Arrendamiento"
        subtitle="Identificación del Arrendador (Propietario) y Arrendatario (Inquilino)"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">Datos del Arrendador:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreArrendador}
                onChange={(e) => update('nombreArrendador', e.target.value)}
                placeholder="Nombre del Arrendador / Propietario"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocArrendador}
                  onChange={(e) => update('tipoDocArrendador', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Cédula de Ciudadanía">C.C.</option>
                  <option value="NIT">NIT</option>
                  <option value="C.E.">C.E.</option>
                </select>
                <input
                  type="text"
                  value={data.numDocArrendador}
                  onChange={(e) => update('numDocArrendador', e.target.value)}
                  placeholder="Número de Cédula"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.telefonoArrendador}
                onChange={(e) => update('telefonoArrendador', e.target.value)}
                placeholder="Teléfono del Arrendador"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">Datos del Arrendatario:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreArrendatario}
                onChange={(e) => update('nombreArrendatario', e.target.value)}
                placeholder="Nombre del Arrendatario / Inquilino"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocArrendatario}
                  onChange={(e) => update('tipoDocArrendatario', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Cédula de Ciudadanía">C.C.</option>
                  <option value="C.E.">C.E.</option>
                  <option value="NIT">NIT</option>
                </select>
                <input
                  type="text"
                  value={data.numDocArrendatario}
                  onChange={(e) => update('numDocArrendatario', e.target.value)}
                  placeholder="Número de Cédula"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.telefonoArrendatario}
                onChange={(e) => update('telefonoArrendatario', e.target.value)}
                placeholder="Teléfono del Arrendatario"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Inmueble Objeto */}
      <CollapsibleSection
        title="Inmueble y Ubicación"
        subtitle="Dirección y matrícula inmobiliaria"
        icon={<Home className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dirección Completa del Inmueble</label>
            <input
              type="text"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej: Carrera 15 # 98-40, Apartamento 302"
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Matrícula Inmobiliaria (Opcional)</label>
            <input
              type="text"
              value={data.matriculaInmobiliaria}
              onChange={(e) => update('matriculaInmobiliaria', e.target.value)}
              placeholder="Ej: 50C-123456"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Canon y Servicios */}
      <CollapsibleSection
        title="Canon Mensual, Plazos y Servicios"
        subtitle="Valor del arriendo, día de corte y duración en meses"
        icon={<DollarSign className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Canon Mensual ($)</label>
            <input
              type="number"
              min="0"
              value={data.canonMensual || ''}
              onChange={(e) => update('canonMensual', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 2800000"
              className="w-full min-h-[44px] text-xs font-mono font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Día Límite de Pago Mensual</label>
            <input
              type="number"
              min="1"
              max="31"
              value={data.diaLimitePago || 5}
              onChange={(e) => update('diaLimitePago', parseInt(e.target.value, 10) || 5)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Duración en Meses</label>
            <input
              type="number"
              min="1"
              value={data.duracionMeses || 12}
              onChange={(e) => update('duracionMeses', parseInt(e.target.value, 10) || 12)}
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
              value={data.fechaFin}
              onChange={(e) => update('fechaFin', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cuota de Administración ($)</label>
            <input
              type="number"
              min="0"
              value={data.cuotaAdministracion || ''}
              onChange={(e) => update('cuotaAdministracion', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 420000"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Forma de Pago del Canon</label>
            <input
              type="text"
              value={data.formaPagoCanon}
              onChange={(e) => update('formaPagoCanon', e.target.value)}
              placeholder="Ej: Transferencia electrónica a cuenta Bancolombia..."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Responsable de Servicios Públicos</label>
            <input
              type="text"
              value={data.responsableServicios}
              onChange={(e) => update('responsableServicios', e.target.value)}
              placeholder="Ej: Arrendatario asume acueducto, energía, gas e internet"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
