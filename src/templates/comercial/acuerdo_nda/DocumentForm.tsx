import React from 'react';
import { AcuerdoNdaData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { SignaturePad } from '../../../components/SignaturePad';
import { InputField, SelectField, CurrencyField, TextareaField, SwitchField } from '../../../components/ui';
import { Calendar, DollarSign, ShieldCheck, Sparkles, Users } from 'lucide-react';

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

export const DocumentForm: React.FC<DocumentFormProps<AcuerdoNdaData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof AcuerdoNdaData>(key: K, val: AcuerdoNdaData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const tipoNdaOptions = [
    { value: 'bilateral', label: 'Bilateral / Mutuo (Ambas partes intercambian secretos)' },
    { value: 'unilateral', label: 'Unilateral (Una parte revela información a la otra)' },
  ];

  const tipoDocOptions = [
    { value: 'NIT', label: 'NIT' },
    { value: 'C.C.', label: 'C.C.' },
    { value: 'C.E.', label: 'C.E.' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Modalidad y Fechas */}
      <CollapsibleSection
        step="Paso 01"
        title="Modalidad y Lugar"
        subtitle="Tipo de confidencialidad, ciudad y fecha de suscripción"
        icon={<ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SelectField
              label="Tipo de Acuerdo"
              value={data.tipoNda}
              onChange={(e) => update('tipoNda', e.target.value as 'unilateral' | 'bilateral')}
              options={tipoNdaOptions}
            />

            <InputField
              label="Ciudad de Celebración"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              required
            />

            <InputField
              label="Fecha del Acuerdo"
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
              required
            />

            <InputField
              label="Duración de la Reserva (Años)"
              type="number"
              min={1}
              max={10}
              value={data.duracionAnos || 3}
              onChange={(e) => update('duracionAnos', parseInt(e.target.value, 10) || 3)}
              required
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Partes Involucradas */}
      <CollapsibleSection
        step="Paso 02"
        title="Partes Intervinientes"
        subtitle="Identificación de la parte emisora y de la parte receptora"
        icon={<Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Emisora */}
          <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wide">
              {data.tipoNda === 'bilateral'
                ? 'Parte 1 (Divulgante y Receptora):'
                : 'Parte Emisora / Divulgante (Dueña de la Información):'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputField
                label="Nombre o Razón Social"
                value={data.nombreParteEmisora}
                onChange={(e) => update('nombreParteEmisora', e.target.value)}
                placeholder="Ej: INNOVACIÓN DIGITAL S.A.S."
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <SelectField
                  label="Tipo Doc."
                  value={data.tipoDocEmisora}
                  onChange={(e) => update('tipoDocEmisora', e.target.value)}
                  options={tipoDocOptions}
                />
                <div className="col-span-2">
                  <InputField
                    label="Número"
                    value={data.numDocEmisora}
                    onChange={(e) => update('numDocEmisora', e.target.value)}
                    placeholder="Número documento"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Domicilio / Sede Principal"
                  value={data.domicilioEmisora}
                  onChange={(e) => update('domicilioEmisora', e.target.value)}
                  placeholder="Ej: Carrera 11 # 82-01, Piso 6, Bogotá D.C."
                />
              </div>
            </div>
          </div>

          {/* Receptora */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              {data.tipoNda === 'bilateral'
                ? 'Parte 2 (Divulgante y Receptora):'
                : 'Parte Receptora (Obligada a Guardar Secreto):'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputField
                label="Nombre o Razón Social"
                value={data.nombreParteReceptora}
                onChange={(e) => update('nombreParteReceptora', e.target.value)}
                placeholder="Ej: CLOUD SYSTEMS COLOMBIA LTDA."
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <SelectField
                  label="Tipo Doc."
                  value={data.tipoDocReceptora}
                  onChange={(e) => update('tipoDocReceptora', e.target.value)}
                  options={tipoDocOptions}
                />
                <div className="col-span-2">
                  <InputField
                    label="Número"
                    value={data.numDocReceptora}
                    onChange={(e) => update('numDocReceptora', e.target.value)}
                    placeholder="Número documento"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Domicilio / Sede Principal"
                  value={data.domicilioReceptora}
                  onChange={(e) => update('domicilioReceptora', e.target.value)}
                  placeholder="Ej: Calle 100 # 19A-40, Bogotá D.C."
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Propósito y Cláusulas Clave */}
      <CollapsibleSection
        step="Paso 03"
        title="Propósito y Penalidad"
        subtitle="Finalidad autorizada y cláusula penal de indemnización"
        icon={<Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          {/* Quick Picker */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Plantillas Rápidas de Propósito (1 toque):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickProposals.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => update('propositoNegociacion', item.text)}
                  className="min-h-[38px] px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-700 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl transition cursor-pointer shadow-2xs"
                >
                  + {item.label}
                </button>
              ))}
            </div>
          </div>

          <TextareaField
            label="Propósito de la Revelación (Finalidad autorizada)"
            value={data.propositoNegociacion}
            onChange={(e) => update('propositoNegociacion', e.target.value)}
            placeholder="Indica para qué fin específico se divulgará la información confidencial..."
            rows={3}
            required
          />

          <CurrencyField
            label="Cláusula Penal por Incumplimiento o Fuga ($ COP)"
            value={data.clausulaPenalMonto}
            onChange={(num) => update('clausulaPenalMonto', num)}
            helperText="Monto indemnizatorio tasado anticipadamente sin perjuicio de acciones penales (Art. 308 C.P.)."
          />

          <SwitchField
            label="Incluir exclusiones legales estándar (información pública, conocida con anterioridad o por orden judicial)"
            checked={data.incluirExclusionesEstandar}
            onChange={(checked) => update('incluirExclusionesEstandar', checked)}
          />
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Tipográfica */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Acuerdo"
        subtitle="Firma manuscrita en pantalla o pie notarial formal"
        icon={<DollarSign className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
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

