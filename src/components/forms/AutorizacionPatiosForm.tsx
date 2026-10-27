import React from 'react';
import { AutorizacionPatiosData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { SignaturePad } from '../SignaturePad';
import { Car, UserCheck, Shield, FileText, Plus, Trash2 } from 'lucide-react';

interface Props {
  data: AutorizacionPatiosData;
  onChange: (updated: AutorizacionPatiosData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const AutorizacionPatiosForm: React.FC<Props> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof AutorizacionPatiosData>(key: K, val: AutorizacionPatiosData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddFacultad = () => {
    update('facultadesExpresas', [...data.facultadesExpresas, '']);
  };

  const handleUpdateFacultad = (idx: number, val: string) => {
    const list = [...data.facultadesExpresas];
    list[idx] = val;
    update('facultadesExpresas', list);
  };

  const handleRemoveFacultad = (idx: number) => {
    if (data.facultadesExpresas.length <= 1) {
      update('facultadesExpresas', ['']);
      return;
    }
    update('facultadesExpresas', data.facultadesExpresas.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos del Propietario y Autorizado */}
      <CollapsibleSection
        step="Paso 01"
        title="Propietario y Persona Autorizada"
        subtitle="Identificación del titular del automotor y de quien retirará el vehículo"
        icon={<UserCheck className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Propietario */}
          <div className="p-3 bg-sky-50/50 border border-sky-100 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wide">
              Datos del Propietario (Poderdante):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombrePropietario}
                onChange={(e) => update('nombrePropietario', e.target.value)}
                placeholder="Nombre Completo del Propietario"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocPropietario}
                  onChange={(e) => update('tipoDocPropietario', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="C.C.">C.C.</option>
                  <option value="C.E.">C.E.</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                <input
                  type="text"
                  value={data.numDocPropietario}
                  onChange={(e) => update('numDocPropietario', e.target.value)}
                  placeholder="Número de cédula"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.telefonoPropietario}
                onChange={(e) => update('telefonoPropietario', e.target.value)}
                placeholder="Teléfono de contacto"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Autorizado */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
              Datos de la Persona Autorizada (Apoderado / Conductor):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreAutorizado}
                onChange={(e) => update('nombreAutorizado', e.target.value)}
                placeholder="Nombre de quien retirará el automotor"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocAutorizado}
                  onChange={(e) => update('tipoDocAutorizado', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="C.C.">C.C.</option>
                  <option value="C.E.">C.E.</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                <input
                  type="text"
                  value={data.numDocAutorizado}
                  onChange={(e) => update('numDocAutorizado', e.target.value)}
                  placeholder="Número de cédula"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.telefonoAutorizado}
                onChange={(e) => update('telefonoAutorizado', e.target.value)}
                placeholder="Teléfono del autorizado"
                className="sm:col-span-2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Vehículo, Tránsito y Patios */}
      <CollapsibleSection
        step="Paso 02"
        title="Vehículo e Inmovilización"
        subtitle="Placa, patio de custodia y organismo de tránsito"
        icon={<Car className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Placa del Vehículo
            </label>
            <input
              type="text"
              value={data.placaVehiculo}
              onChange={(e) => update('placaVehiculo', e.target.value.toUpperCase())}
              placeholder="Ej: KJH789"
              className="w-full min-h-[44px] text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Marca y Modelo / Línea
            </label>
            <input
              type="text"
              value={data.marcaModelo}
              onChange={(e) => update('marcaModelo', e.target.value)}
              placeholder="Ej: Chevrolet Spark GT 2018"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Organismo / Secretaría de Tránsito
            </label>
            <input
              type="text"
              value={data.organismoTransito}
              onChange={(e) => update('organismoTransito', e.target.value)}
              placeholder="Ej: Secretaría Distrital de Movilidad de Bogotá"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Ubicación del Patio de Tránsito
            </label>
            <input
              type="text"
              value={data.patioUbicacion}
              onChange={(e) => update('patioUbicacion', e.target.value)}
              placeholder="Ej: Patio Álamos / Transversal 93"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Número de Orden de Comparendo / Inmovilización
            </label>
            <input
              type="text"
              value={data.numeroComparendo}
              onChange={(e) => update('numeroComparendo', e.target.value)}
              placeholder="Ej: Comparendo N° 110010000000345678"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Facultades y Huella */}
      <CollapsibleSection
        step="Paso 03"
        title="Facultades Expresas y Huella"
        subtitle="Acciones autorizadas para retirar y firmar inventario"
        icon={<Shield className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">
              Facultades Expresas Concedidas:
            </label>
            <button
              type="button"
              onClick={handleAddFacultad}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-semibold transition cursor-pointer border border-sky-200"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Agregar facultad</span>
            </button>
          </div>

          {data.facultadesExpresas.map((fac, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                value={fac}
                onChange={(e) => handleUpdateFacultad(idx, e.target.value)}
                placeholder={`Facultad ${idx + 1}...`}
                className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
              <button
                type="button"
                onClick={() => handleRemoveFacultad(idx)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px] p-3 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={data.incluirRecuadroHuella}
              onChange={(e) => update('incluirRecuadroHuella', e.target.checked)}
              className="w-4 h-4 text-sky-600 rounded border-slate-300"
            />
            <span className="text-xs text-slate-800">
              Incluir recuadro formal para impresión dactilar (Índice derecho) en la hoja de papel
            </span>
          </label>
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Físico */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Propietario"
        subtitle="Firma manuscrita en pantalla o renglón notarial"
        icon={<FileText className="w-5 h-5" />}
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
