import React from 'react';
import { ContratoArrendamientoData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { SignaturePad } from '../SignaturePad';
import { User, Home, DollarSign, Calendar, KeyRound, ShieldCheck } from 'lucide-react';

interface Props {
  data: ContratoArrendamientoData;
  onChange: (updated: ContratoArrendamientoData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const ContratoArrendamientoForm: React.FC<Props> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof ContratoArrendamientoData>(key: K, val: ContratoArrendamientoData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Partes Arrendador y Arrendatario */}
      <CollapsibleSection
        step="Paso 01"
        title="Partes del Arrendamiento"
        subtitle="Identificación del Arrendador (Propietario) y Arrendatario (Inquilino)"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          {/* Arrendador */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-tight block">
              Datos del Arrendador (Propietario):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreArrendador}
                onChange={(e) => update('nombreArrendador', e.target.value)}
                placeholder="Nombre del Arrendador"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <input
                type="text"
                value={data.telefonoArrendador}
                onChange={(e) => update('telefonoArrendador', e.target.value)}
                placeholder="Teléfono móvil del Arrendador"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          {/* Arrendatario */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-tight block">
              Datos del Arrendatario (Inquilino):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreArrendatario}
                onChange={(e) => update('nombreArrendatario', e.target.value)}
                placeholder="Nombre del Arrendatario"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <input
                type="text"
                value={data.telefonoArrendatario}
                onChange={(e) => update('telefonoArrendatario', e.target.value)}
                placeholder="Teléfono móvil del Arrendatario"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          {/* Switch Codeudor o Fiador Solidario */}
          <div className="p-3.5 bg-indigo-50/50 border border-indigo-200/80 rounded-xl space-y-3">
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.incluyeCodeudor}
                onChange={(e) => update('incluyeCodeudor', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  ¿Incluye Codeudor o Fiador Solidario?
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Añade la cláusula de responsabilidad solidaria y la sección de firma del garante.
                </span>
              </div>
            </label>

            {data.incluyeCodeudor && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-indigo-100">
                <input
                  type="text"
                  value={data.nombreCodeudor}
                  onChange={(e) => update('nombreCodeudor', e.target.value)}
                  placeholder="Nombre completo del Codeudor"
                  className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
                <input
                  type="text"
                  value={data.numDocCodeudor}
                  onChange={(e) => update('numDocCodeudor', e.target.value)}
                  placeholder="Cédula del Codeudor"
                  className="w-full min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
                <input
                  type="text"
                  value={data.telefonoCodeudor}
                  onChange={(e) => update('telefonoCodeudor', e.target.value)}
                  placeholder="Teléfono del Codeudor"
                  className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Inmueble Objeto */}
      <CollapsibleSection
        step="Paso 02"
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ciudad</label>
            <input
              type="text"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Matrícula Inmobiliaria (Opcional)</label>
            <input
              type="text"
              value={data.matriculaInmobiliaria}
              onChange={(e) => update('matriculaInmobiliaria', e.target.value)}
              placeholder="Ej: 50C-123456"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Condiciones Económicas */}
      <CollapsibleSection
        step="Paso 03"
        title="Canon, Pagos y Duración"
        subtitle="Valor mensual, día límite de pago y vigencia"
        icon={<DollarSign className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Canon Mensual ($)</label>
            <input
              type="number"
              min="0"
              step="50000"
              value={data.canonMensual || ''}
              onChange={(e) => update('canonMensual', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 2500000"
              className="w-full min-h-[44px] text-xs font-mono font-bold px-3.5 py-2.5 border border-indigo-300 rounded-xl bg-indigo-50/20 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cuota de Administración ($) (0 si incluida)</label>
            <input
              type="number"
              min="0"
              value={data.cuotaAdministracion || ''}
              onChange={(e) => update('cuotaAdministracion', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 350000"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Día Límite de Pago Mensual</label>
            <input
              type="number"
              min="1"
              max="31"
              value={data.diaLimitePago}
              onChange={(e) => update('diaLimitePago', parseInt(e.target.value) || 5)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Duración (Meses)</label>
            <input
              type="number"
              min="1"
              value={data.duracionMeses}
              onChange={(e) => update('duracionMeses', parseInt(e.target.value) || 12)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Inicio del Arriendo</label>
            <input
              type="date"
              value={data.fechaInicio}
              onChange={(e) => update('fechaInicio', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Finalización</label>
            <input
              type="date"
              value={data.fechaFin}
              onChange={(e) => update('fechaFin', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Firma y Garante */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Arrendador / Inquilino"
        subtitle="Dibuja tu firma digital en pantalla o usa pie notarial impreso"
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
