import React from 'react';
import { PoderAutorizacionData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { InputField, SelectField, TextareaField, SwitchField } from '../../../components/ui';
import { Plus, Shield, Trash2, User, UserCheck } from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<PoderAutorizacionData>> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof PoderAutorizacionData>(key: K, val: PoderAutorizacionData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddFacultad = () => {
    update('facultadesEspecificas', [...(data.facultadesEspecificas || []), '']);
  };

  const handleUpdateFacultad = (index: number, val: string) => {
    const updated = [...(data.facultadesEspecificas || [])];
    updated[index] = val;
    update('facultadesEspecificas', updated);
  };

  const handleRemoveFacultad = (index: number) => {
    update(
      'facultadesEspecificas',
      (data.facultadesEspecificas || []).filter((_, i) => i !== index)
    );
  };

  const tipoDocOptions = [
    { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía (C.C.)' },
    { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería (C.E.)' },
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos del Otorgante */}
      <CollapsibleSection
        step="Paso 01"
        title="Datos del Otorgante (Poderdante)"
        subtitle="Quién confiere la autorización legal"
        icon={<User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre Completo del Otorgante"
              value={data.nombreOtorgante}
              onChange={(e) => update('nombreOtorgante', e.target.value)}
              placeholder="Ej: Gloria Patricia Valencia"
              required
            />
          </div>

          <SelectField
            label="Tipo de Documento"
            value={data.tipoDocOtorgante}
            onChange={(e) => update('tipoDocOtorgante', e.target.value)}
            options={tipoDocOptions}
          />

          <InputField
            label="Número de Identificación"
            value={data.numDocOtorgante}
            onChange={(e) => update('numDocOtorgante', e.target.value)}
            placeholder="Ej: 31.954.882"
            required
          />

          <InputField
            label="Ciudad de Expedición"
            value={data.expedicionOtorgante}
            onChange={(e) => update('expedicionOtorgante', e.target.value)}
            placeholder="Ej: Cali (Valle)"
          />

          <InputField
            label="Domicilio / Dirección y Teléfono"
            value={data.domicilioOtorgante}
            onChange={(e) => update('domicilioOtorgante', e.target.value)}
            placeholder="Ej: Av. 6N # 28N-34, Cali"
          />
        </div>
      </CollapsibleSection>

      {/* 2. Datos del Apoderado */}
      <CollapsibleSection
        step="Paso 02"
        title="Datos del Apoderado (Autorizado)"
        subtitle="Persona que realizará el trámite en tu representación"
        icon={<UserCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre Completo del Autorizado"
              value={data.nombreApoderado}
              onChange={(e) => update('nombreApoderado', e.target.value)}
              placeholder="Ej: Sebastián Morales Valencia"
              required
            />
          </div>

          <InputField
            label="Número de Cédula"
            value={data.numDocApoderado}
            onChange={(e) => update('numDocApoderado', e.target.value)}
            placeholder="Ej: 1.144.189.650"
            required
          />

          <InputField
            label="Expedida en"
            value={data.expedicionApoderado}
            onChange={(e) => update('expedicionApoderado', e.target.value)}
            placeholder="Ej: Cali"
          />

          <InputField
            label="Teléfono del Apoderado"
            value={data.telefonoApoderado}
            onChange={(e) => update('telefonoApoderado', e.target.value)}
            placeholder="Ej: +57 318 632 9911"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Trámite, Objeto y Facultades */}
      <CollapsibleSection
        step="Paso 03"
        title="Trámite y Facultades Concedidas"
        subtitle="Gestión específica autorizada y límite temporal"
        icon={<Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <InputField
            label="Entidad o Dependencia ante la cual se surte el trámite"
            value={data.entidadTramite}
            onChange={(e) => update('entidadTramite', e.target.value)}
            placeholder="Ej: Secretaría de Movilidad / Notaría 25 / Banco"
            required
          />

          <TextareaField
            label="Objeto del Trámite Detallado"
            value={data.objetoAutorizacion}
            onChange={(e) => update('objetoAutorizacion', e.target.value)}
            placeholder="Describa el trámite vehicular, retiro de cheques o documentación..."
            rows={3}
            required
          />

          {/* Facultades Dinámicas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Facultades Expresas Concedidas:</label>
              <button
                type="button"
                onClick={handleAddFacultad}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar facultad
              </button>
            </div>
            {(data.facultadesEspecificas || []).map((fac, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={fac}
                  onChange={(e) => handleUpdateFacultad(idx, e.target.value)}
                  placeholder={`Facultad ${idx + 1}...`}
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFacultad(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Vigencia Temporal"
              value={data.vigenciaTexto}
              onChange={(e) => update('vigenciaTexto', e.target.value)}
              placeholder="Ej: Válido por 30 días calendario a partir de su firma"
            />
            <InputField
              label="Ciudad y Fecha de Expedición"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Cali, Valle"
            />
          </div>

          <SwitchField
            label="Incluir recuadro gráfico para huella dactilar (Índice derecho) del otorgante"
            checked={data.incluirRecuadroHuella}
            onChange={(checked) => update('incluirRecuadroHuella', checked)}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

