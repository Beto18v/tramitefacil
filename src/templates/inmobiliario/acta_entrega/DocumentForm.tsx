import React from 'react';
import { ActaEntregaData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { InputField, SelectField, TextareaField } from '../../../components/ui';
import { PiClipboardText, PiHouse, PiPlus, PiTrash, PiUser } from 'react-icons/pi';

export const DocumentForm: React.FC<DocumentFormProps<ActaEntregaData>> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof ActaEntregaData>(key: K, val: ActaEntregaData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddPaz = () => {
    update('pazSalvosPresentados', [...(data.pazSalvosPresentados || []), '']);
  };

  const handleUpdatePaz = (idx: number, val: string) => {
    const list = [...(data.pazSalvosPresentados || [])];
    list[idx] = val;
    update('pazSalvosPresentados', list);
  };

  const handleRemovePaz = (idx: number) => {
    update(
      'pazSalvosPresentados',
      (data.pazSalvosPresentados || []).filter((_, i) => i !== idx)
    );
  };

  const calidadEntregaOptions = [
    { value: 'Arrendatario', label: 'En calidad de Arrendatario (Entrega de salida)' },
    { value: 'Arrendador', label: 'En calidad de Arrendador (Entrega inicial)' },
  ];

  const calidadRecibeOptions = [
    { value: 'Arrendador / Propietario', label: 'En calidad de Arrendador / Propietario' },
    { value: 'Arrendatario', label: 'En calidad de Arrendatario' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Comparentes de la Entrega */}
      <CollapsibleSection
        step="Paso 01"
        title="Partes de la Entrega"
        subtitle="Quién entrega y quién recibe el inmueble"
        icon={<PiUser className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">
              Quién Hace Entrega:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputField
                label="Nombre Completo"
                value={data.nombreEntrega}
                onChange={(e) => update('nombreEntrega', e.target.value)}
                placeholder="Nombre Quien Entrega"
                required
              />
              <InputField
                label="Documento de Identidad"
                value={data.docEntrega}
                onChange={(e) => update('docEntrega', e.target.value)}
                placeholder="Ej: CC 53.012.345"
                required
              />
              <div className="sm:col-span-2">
                <SelectField
                  label="Calidad / Rol"
                  value={data.calidadEntrega}
                  onChange={(e) =>
                    update('calidadEntrega', e.target.value as ActaEntregaData['calidadEntrega'])
                  }
                  options={calidadEntregaOptions}
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">
              Quién Recibe a Satisfacción:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputField
                label="Nombre Completo"
                value={data.nombreRecibe}
                onChange={(e) => update('nombreRecibe', e.target.value)}
                placeholder="Nombre Quien Recibe"
                required
              />
              <InputField
                label="Documento de Identidad"
                value={data.docRecibe}
                onChange={(e) => update('docRecibe', e.target.value)}
                placeholder="Ej: CC 79.456.789"
                required
              />
              <div className="sm:col-span-2">
                <SelectField
                  label="Calidad / Rol"
                  value={data.calidadRecibe}
                  onChange={(e) =>
                    update('calidadRecibe', e.target.value as ActaEntregaData['calidadRecibe'])
                  }
                  options={calidadRecibeOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Inmueble y Llaves */}
      <CollapsibleSection
        step="Paso 02"
        title="Inmueble, Fecha y Llaves"
        subtitle="Ubicación y juegos de llaves entregados"
        icon={<PiHouse className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Dirección del Inmueble"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej: Carrera 14 # 94-44, Apto 501"
              required
            />
          </div>

          <InputField
            label="Ciudad"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Bogotá D.C."
            required
          />

          <InputField
            label="Hora de Inspección"
            value={data.hora}
            onChange={(e) => update('hora', e.target.value)}
            placeholder="Ej: 10:30 AM"
          />

          <InputField
            label="Fecha"
            type="date"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
            required
          />

          <InputField
            label="Juegos de Llaves Entregados"
            type="number"
            min={1}
            value={data.juegosLlavesEntregados || 2}
            onChange={(e) => update('juegosLlavesEntregados', parseInt(e.target.value, 10) || 1)}
            required
          />
        </div>
      </CollapsibleSection>

      {/* 3. Lecturas de Medidores e Inventario */}
      <CollapsibleSection
        step="Paso 03"
        title="Lecturas de Medidores y Paz y Salvos"
        subtitle="Contadores de acueducto, energía, gas e inventario"
        icon={<PiClipboardText className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InputField
              label="Lectura Agua (m³)"
              value={data.lecturaAgua}
              onChange={(e) => update('lecturaAgua', e.target.value)}
              placeholder="Ej: 1.458 m³"
            />

            <InputField
              label="Lectura Energía (kWh)"
              value={data.lecturaEnergia}
              onChange={(e) => update('lecturaEnergia', e.target.value)}
              placeholder="Ej: 28.940 kWh"
            />

            <InputField
              label="Lectura Gas (m³)"
              value={data.lecturaGas}
              onChange={(e) => update('lecturaGas', e.target.value)}
              placeholder="Ej: 0.842 m³"
            />
          </div>

          <TextareaField
            label="Estado General de Muros, Pisos y Baños"
            value={data.estadoGeneralParedesPisos}
            onChange={(e) => update('estadoGeneralParedesPisos', e.target.value)}
            placeholder="Paredes pintadas en blanco, pisos laminados aseados..."
            rows={3}
          />

          {/* Paz y salvos aportados */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Paz y Salvos Aportados:</label>
              <button
                type="button"
                onClick={handleAddPaz}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <PiPlus className="w-3.5 h-3.5" /> Agregar paz y salvo
              </button>
            </div>
            {(data.pazSalvosPresentados || []).map((paz, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={paz}
                  onChange={(e) => handleUpdatePaz(idx, e.target.value)}
                  placeholder="Ej: Factura cancelada de Acueducto..."
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePaz(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <PiTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <TextareaField
            label="Observaciones o Acuerdos Pendientes"
            value={data.observacionesPendientes}
            onChange={(e) => update('observacionesPendientes', e.target.value)}
            placeholder="El inmueble se recibe a completa satisfacción sin pendientes..."
            rows={2}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

