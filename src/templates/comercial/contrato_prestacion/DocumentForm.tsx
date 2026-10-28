import React from 'react';
import { ContratoPrestacionData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { SignaturePad } from '../../../components/SignaturePad';
import { InputField, SelectField, CurrencyField, TextareaField, SwitchField } from '../../../components/ui';
import { DollarSign, PenTool, Plus, ScrollText, Trash2, User } from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<ContratoPrestacionData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof ContratoPrestacionData>(key: K, val: ContratoPrestacionData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddObligacion = () => {
    update('obligacionesContratista', [...(data.obligacionesContratista || []), '']);
  };

  const handleUpdateObligacion = (idx: number, val: string) => {
    const list = [...(data.obligacionesContratista || [])];
    list[idx] = val;
    update('obligacionesContratista', list);
  };

  const handleRemoveObligacion = (idx: number) => {
    if ((data.obligacionesContratista || []).length <= 1) {
      update('obligacionesContratista', ['']);
      return;
    }
    update(
      'obligacionesContratista',
      (data.obligacionesContratista || []).filter((_, i) => i !== idx)
    );
  };

  const tipoDocContratanteOptions = [
    { value: 'NIT', label: 'NIT' },
    { value: 'C.C.', label: 'C.C.' },
    { value: 'C.E.', label: 'C.E.' },
  ];

  const tipoDocContratistaOptions = [
    { value: 'Cédula de Ciudadanía', label: 'C.C.' },
    { value: 'Cédula de Extranjería', label: 'C.E.' },
    { value: 'NIT', label: 'NIT' },
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Partes Contratantes */}
      <CollapsibleSection
        step="Paso 01"
        title="Partes del Contrato"
        subtitle="Identificación del Contratante y Contratista"
        icon={<User className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          {/* Contratante */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">
              Datos del Contratante (Cliente / Empresa):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputField
                label="Razón Social / Nombre Contratante"
                value={data.nombreContratante}
                onChange={(e) => update('nombreContratante', e.target.value)}
                placeholder="Ej: GLOBAL MEDIA LAB S.A.S."
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <SelectField
                  label="Tipo Doc."
                  value={data.tipoDocContratante}
                  onChange={(e) => update('tipoDocContratante', e.target.value)}
                  options={tipoDocContratanteOptions}
                />
                <div className="col-span-2">
                  <InputField
                    label="Número"
                    value={data.numDocContratante}
                    onChange={(e) => update('numDocContratante', e.target.value)}
                    placeholder="Ej: 900.876.543-1"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Domicilio / Sede Contratante"
                  value={data.domicilioContratante}
                  onChange={(e) => update('domicilioContratante', e.target.value)}
                  placeholder="Ej: Calle 93B # 13-45, Oficina 501, Bogotá D.C."
                />
              </div>
            </div>
          </div>

          {/* Contratista */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase">
              Datos del Contratista (Profesional Independiente):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputField
                label="Nombre Completo del Contratista"
                value={data.nombreContratista}
                onChange={(e) => update('nombreContratista', e.target.value)}
                placeholder="Ej: Alejandro Vargas Céspedes"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <SelectField
                  label="Tipo Doc."
                  value={data.tipoDocContratista}
                  onChange={(e) => update('tipoDocContratista', e.target.value)}
                  options={tipoDocContratistaOptions}
                />
                <div className="col-span-2">
                  <InputField
                    label="Número"
                    value={data.numDocContratista}
                    onChange={(e) => update('numDocContratista', e.target.value)}
                    placeholder="Ej: 79.889.445"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Domicilio / Dirección Contratista"
                  value={data.domicilioContratista}
                  onChange={(e) => update('domicilioContratista', e.target.value)}
                  placeholder="Ej: Carrera 19 # 104-32, Bogotá D.C."
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Objeto y Obligaciones */}
      <CollapsibleSection
        step="Paso 02"
        title="Objeto del Contrato y Obligaciones"
        subtitle="Descripción de los servicios a prestar"
        icon={<ScrollText className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <TextareaField
            label="Objeto Contractual"
            value={data.objetoContrato}
            onChange={(e) => update('objetoContrato', e.target.value)}
            placeholder="Ej: El contratista se obliga para con el contratante a prestar de forma autónoma..."
            rows={3}
            required
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Obligaciones Específicas:</label>
              <button
                type="button"
                onClick={handleAddObligacion}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar obligación
              </button>
            </div>
            {(data.obligacionesContratista || []).map((ob, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={ob}
                  onChange={(e) => handleUpdateObligacion(idx, e.target.value)}
                  placeholder={`Obligación ${idx + 1}...`}
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveObligacion(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 cursor-pointer"
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
        step="Paso 03"
        title="Valor, Pagos y Plazos"
        subtitle="Monto total pactado, fechas y lugar de ejecución"
        icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CurrencyField
            label="Valor Total del Contrato ($)"
            value={data.valorContrato}
            onChange={(num) => update('valorContrato', num)}
            required
          />

          <InputField
            label="Lugar de Ejecución"
            value={data.lugarEjecucion}
            onChange={(e) => update('lugarEjecucion', e.target.value)}
            placeholder="Ej: Remoto / Bogotá D.C."
          />

          <InputField
            label="Fecha de Inicio"
            type="date"
            value={data.fechaInicio}
            onChange={(e) => update('fechaInicio', e.target.value)}
            required
          />

          <InputField
            label="Fecha de Terminación"
            type="date"
            value={data.fechaTerminacion}
            onChange={(e) => update('fechaTerminacion', e.target.value)}
            required
          />

          <div className="sm:col-span-2">
            <InputField
              label="Forma de Pago"
              value={data.formaPago}
              onChange={(e) => update('formaPago', e.target.value)}
              placeholder="Ej: Cuotas mensuales previa cuenta de cobro..."
              required
            />
          </div>

          <CurrencyField
            label="Cláusula Penal ($ COP)"
            value={data.clausulaPenalMonto}
            onChange={(num) => update('clausulaPenalMonto', num)}
          />

          <InputField
            label="Ciudad y Fecha de Firma"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Bogotá D.C."
          />
        </div>

        <div className="space-y-2 pt-3 border-t border-slate-200">
          <SwitchField
            label="Incluir cláusula expresa de total autonomía técnica sin relación de subordinación laboral"
            checked={data.clausulaIndependencia}
            onChange={(checked) => update('clausulaIndependencia', checked)}
          />

          <SwitchField
            label="Incluir cláusula de confidencialidad y reserva estricta de información y propiedad intelectual"
            checked={data.incluirConfidencialidad}
            onChange={(checked) => update('incluirConfidencialidad', checked)}
          />
        </div>
      </CollapsibleSection>

      {/* 4. Firma y Suscripción */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Contratista"
        subtitle="Dibuja tu firma digital en pantalla o usa la línea editorial"
        icon={<PenTool className="w-5 h-5 text-indigo-600" />}
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

