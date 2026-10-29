import React from 'react';
import { AutorizacionPatiosData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { InputField, SelectField, SwitchField } from '../../../components/ui';
import { SignaturePad } from '../../../components/SignaturePad';
import { PiCar, PiFileText, PiPlus, PiShield, PiTrash, PiUserCheck } from 'react-icons/pi';

export const DocumentForm: React.FC<DocumentFormProps<AutorizacionPatiosData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof AutorizacionPatiosData>(
    key: K,
    val: AutorizacionPatiosData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddFacultad = () => {
    update('facultadesExpresas', [...(data.facultadesExpresas || []), '']);
  };

  const handleUpdateFacultad = (idx: number, val: string) => {
    const list = [...(data.facultadesExpresas || [])];
    list[idx] = val;
    update('facultadesExpresas', list);
  };

  const handleRemoveFacultad = (idx: number) => {
    if ((data.facultadesExpresas || []).length <= 1) {
      update('facultadesExpresas', ['']);
      return;
    }
    update(
      'facultadesExpresas',
      (data.facultadesExpresas || []).filter((_, i) => i !== idx)
    );
  };

  const tipoDocOptions = [
    { value: 'C.C.', label: 'Cédula de Ciudadanía (C.C.)' },
    { value: 'C.E.', label: 'Cédula de Extranjería (C.E.)' },
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos del Propietario y Autorizado */}
      <CollapsibleSection
        step="Paso 01"
        title="Propietario y Persona Autorizada"
        subtitle="Identificación del titular del automotor y de quien retirará el vehículo"
        icon={<PiUserCheck className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Propietario */}
          <div className="p-3 bg-sky-50/50 border border-sky-100 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wide">
              Datos del Propietario (Poderdante):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="sm:col-span-2">
                <InputField
                  label="Nombre Completo del Propietario"
                  value={data.nombrePropietario}
                  onChange={(e) => update('nombrePropietario', e.target.value)}
                  placeholder="Ej: Laura Camila Restrepo"
                  required
                />
              </div>

              <SelectField
                label="Tipo de Documento"
                value={data.tipoDocPropietario}
                options={tipoDocOptions}
                onChange={(e) => update('tipoDocPropietario', e.target.value)}
              />

              <InputField
                label="Número de Cédula"
                value={data.numDocPropietario}
                onChange={(e) => update('numDocPropietario', e.target.value)}
                placeholder="Número de documento"
                className="font-mono"
                required
              />

              <div className="sm:col-span-2">
                <InputField
                  label="Teléfono de Contacto"
                  value={data.telefonoPropietario}
                  onChange={(e) => update('telefonoPropietario', e.target.value)}
                  placeholder="Ej: 311 234 5678"
                />
              </div>
            </div>
          </div>

          {/* Autorizado */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
              Datos de la Persona Autorizada (Apoderado / Conductor):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="sm:col-span-2">
                <InputField
                  label="Nombre de Quien Retirará el Automotor"
                  value={data.nombreAutorizado}
                  onChange={(e) => update('nombreAutorizado', e.target.value)}
                  placeholder="Ej: Diego Alejandro Morales"
                  required
                />
              </div>

              <SelectField
                label="Tipo de Documento"
                value={data.tipoDocAutorizado}
                options={tipoDocOptions}
                onChange={(e) => update('tipoDocAutorizado', e.target.value)}
              />

              <InputField
                label="Número de Cédula"
                value={data.numDocAutorizado}
                onChange={(e) => update('numDocAutorizado', e.target.value)}
                placeholder="Número de documento"
                className="font-mono"
                required
              />

              <div className="sm:col-span-2">
                <InputField
                  label="Teléfono del Autorizado"
                  value={data.telefonoAutorizado}
                  onChange={(e) => update('telefonoAutorizado', e.target.value)}
                  placeholder="Ej: 320 876 5432"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <InputField
              label="Ciudad del Trámite"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
            />
            <InputField
              label="Fecha"
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Vehículo, Tránsito y Patios */}
      <CollapsibleSection
        step="Paso 02"
        title="Vehículo e Inmovilización"
        subtitle="Placa, patio de custodia y organismo de tránsito"
        icon={<PiCar className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <InputField
              label="Placa del Vehículo"
              value={data.placaVehiculo}
              onChange={(e) => update('placaVehiculo', e.target.value.toUpperCase())}
              placeholder="Ej: KJH789"
              className="font-mono font-bold uppercase tracking-widest"
              required
            />
          </div>

          <div>
            <InputField
              label="Marca y Modelo / Línea"
              value={data.marcaModelo}
              onChange={(e) => update('marcaModelo', e.target.value)}
              placeholder="Ej: Chevrolet Spark GT 2018"
              required
            />
          </div>

          <div>
            <InputField
              label="Organismo / Secretaría de Tránsito"
              value={data.organismoTransito}
              onChange={(e) => update('organismoTransito', e.target.value)}
              placeholder="Ej: Secretaría Distrital de Movilidad de Bogotá"
              required
            />
          </div>

          <div>
            <InputField
              label="Ubicación del Patio de Tránsito"
              value={data.patioUbicacion}
              onChange={(e) => update('patioUbicacion', e.target.value)}
              placeholder="Ej: Patio Álamos / Transversal 93"
            />
          </div>

          <div className="sm:col-span-2">
            <InputField
              label="Número de Orden de Comparendo / Inmovilización"
              value={data.numeroComparendo}
              onChange={(e) => update('numeroComparendo', e.target.value)}
              placeholder="Ej: Comparendo N° 110010000000345678"
              className="font-mono"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Facultades y Huella */}
      <CollapsibleSection
        step="Paso 03"
        title="Facultades Expresas y Huella"
        subtitle="Acciones autorizadas para retirar y firmar inventario"
        icon={<PiShield className="w-5 h-5 text-indigo-600" />}
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
              <PiPlus className="w-3.5 h-3.5" />
              <span>+ Agregar facultad</span>
            </button>
          </div>

          {(data.facultadesExpresas || []).map((fac, idx) => (
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
                aria-label={`Eliminar facultad ${idx + 1}`}
              >
                <PiTrash className="w-4 h-4" />
              </button>
            </div>
          ))}

          <SwitchField
            label="Recuadro Formal para Impresión Dactilar"
            description="Incluir recuadro formal para impresión dactilar (Índice derecho) en la hoja física"
            checked={data.incluirRecuadroHuella}
            onChange={(checked) => update('incluirRecuadroHuella', checked)}
          />
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Físico */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Propietario"
        subtitle="Firma manuscrita en pantalla o renglón notarial"
        icon={<PiFileText className="w-5 h-5 text-indigo-600" />}
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

