import React from 'react';
import { NoRenovacionArriendoData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { InputField, SelectField, TextareaField, SwitchField } from '../../../components/ui';
import { PiWarningCircle, PiHouse, PiKey, PiUser } from 'react-icons/pi';

export const DocumentForm: React.FC<DocumentFormProps<NoRenovacionArriendoData>> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof NoRenovacionArriendoData>(
    key: K,
    val: NoRenovacionArriendoData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const handleCausalChange = (causal: string) => {
    let sugerencia = '';
    if (causal.includes('ordinario') || causal.includes('preaviso')) {
      sugerencia =
        'En ejercicio de la facultad legal conferida por la Ley 820 de 2003 y las estipulaciones contractuales, le notifico formalmente y con la antelación debida mi voluntad irrevocable de no prorrogar el contrato al término del período contractual vigente.';
    } else if (causal.includes('propia') || causal.includes('habitación')) {
      sugerencia =
        'Comunico a usted que requiero el inmueble arrendado para destinación y habitación propia de mi núcleo familiar, causal legal contemplada en el artículo 22 de la Ley 820 de 2003.';
    } else if (causal.includes('remodelación') || causal.includes('reparación')) {
      sugerencia =
        'El inmueble requiere ser desocupado formalmente para adelantar obras indispensables de reparación estructural y remodelación mayor que impiden su habitación continua.';
    }

    onChange({
      ...data,
      causalInvocada: causal,
      detalleCausal: sugerencia || data.detalleCausal,
    });
  };

  const causalOptions = [
    {
      value: 'Vencimiento del término contractual y preaviso ordinario',
      label: 'No renovación voluntaria ordinaria con preaviso legal (3 meses)',
    },
    {
      value: 'Necesidad de ocupación del inmueble para habitación propia',
      label: 'Necesidad de habitación propia (Art. 22 Ley 820/2003)',
    },
    {
      value: 'Demolición, reparación estructural sustancial o remodelación',
      label: 'Demolición o remodelación sustancial requerida',
    },
    {
      value: 'Terminación anticipada por mutuo acuerdo',
      label: 'Terminación concertada por mutuo acuerdo',
    },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* Aviso legal ley 820 */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
        <PiWarningCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Preaviso Legal Obligatorio (Ley 820 de 2003):</strong> Para vivienda urbana, la comunicación
          debe remitirse con al menos <strong>3 meses de antelación</strong> a la fecha de vencimiento
          contractual mediante servicio postal autorizado.
        </div>
      </div>

      {/* 1. Rol y Partes */}
      <CollapsibleSection
        step="Paso 01"
        title="Rol y Partes del Arrendamiento"
        subtitle="Identificación del Remitente y Destinatario"
        icon={<PiUser className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            ¿Quién remite la comunicación?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => update('rolRemitente', 'arrendador')}
              className={`min-h-[52px] p-3 text-xs rounded-xl border text-left transition-all cursor-pointer ${
                data.rolRemitente === 'arrendador'
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold ring-2 ring-indigo-600/20'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              Soy el Arrendador
              <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                Propietario / Quien alquila
              </span>
            </button>

            <button
              type="button"
              onClick={() => update('rolRemitente', 'arrendatario')}
              className={`min-h-[52px] p-3 text-xs rounded-xl border text-left transition-all cursor-pointer ${
                data.rolRemitente === 'arrendatario'
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold ring-2 ring-indigo-600/20'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              Soy el Arrendatario
              <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                Inquilino / Quien habita
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
          <InputField
            label="Nombre de Quien Remite"
            value={data.nombreRemitente}
            onChange={(e) => update('nombreRemitente', e.target.value)}
            placeholder="Ej: Carlos Alberto De La Hoz"
            required
          />

          <InputField
            label="Cédula del Remitente"
            value={data.numDocRemitente}
            onChange={(e) => update('numDocRemitente', e.target.value)}
            placeholder="Ej: 72.234.980"
            required
          />

          <InputField
            label="Nombre del Destinatario"
            value={data.nombreDestinatario}
            onChange={(e) => update('nombreDestinatario', e.target.value)}
            placeholder="Ej: Mauricio Javier Gómez"
            required
          />

          <InputField
            label="Cédula del Destinatario"
            value={data.numDocDestinatario}
            onChange={(e) => update('numDocDestinatario', e.target.value)}
            placeholder="Ej: 8.765.432"
            required
          />

          <div className="sm:col-span-2">
            <InputField
              label="Dirección de Notificación del Destinatario"
              value={data.direccionNotificacion}
              onChange={(e) => update('direccionNotificacion', e.target.value)}
              placeholder="Ej: Calle 84 # 51B-32, Apto 804"
              required
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Inmueble y Plazos */}
      <CollapsibleSection
        step="Paso 02"
        title="Inmueble y Fechas Contractuales"
        subtitle="Dirección del predio y fecha de restitución de llaves"
        icon={<PiHouse className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Dirección Exacta del Inmueble"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej: Apartamento 804, Edificio Altos del Golf, Calle 84 # 51B-32"
              required
            />
          </div>

          <InputField
            label="Ciudad del Inmueble"
            value={data.ciudadInmueble}
            onChange={(e) => update('ciudadInmueble', e.target.value)}
            placeholder="Ej: Barranquilla"
            required
          />

          <InputField
            label="Matrícula Inmobiliaria (Opcional)"
            value={data.matriculaInmobiliaria}
            onChange={(e) => update('matriculaInmobiliaria', e.target.value)}
            placeholder="Ej: 040-384921"
          />

          <InputField
            label="Fecha del Contrato Original"
            value={data.fechaContrato}
            onChange={(e) => update('fechaContrato', e.target.value)}
            placeholder="Ej: 15 de febrero de 2024"
          />

          <InputField
            label="Fecha de Entrega de Llaves"
            type="date"
            value={data.fechaEntregaInmueble}
            onChange={(e) => update('fechaEntregaInmueble', e.target.value)}
            required
          />

          <InputField
            label="Hora de la Cita de Entrega"
            value={data.horaEntrega}
            onChange={(e) => update('horaEntrega', e.target.value)}
            placeholder="Ej: 09:30 AM"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Causal y Paz y Salvo */}
      <CollapsibleSection
        step="Paso 03"
        title="Causal Legal e Inspección Conjunta"
        subtitle="Motivación de no prórroga e instrucciones para inventario"
        icon={<PiKey className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <SelectField
            label="Causal Invocada"
            value={data.causalInvocada}
            onChange={(e) => handleCausalChange(e.target.value)}
            options={causalOptions}
          />

          <TextareaField
            label="Motivación Detallada"
            value={data.detalleCausal}
            onChange={(e) => update('detalleCausal', e.target.value)}
            rows={3}
          />

          <TextareaField
            label="Instrucciones para Paz y Salvo de Servicios"
            value={data.instruccionesPazSalvo}
            onChange={(e) => update('instruccionesPazSalvo', e.target.value)}
            rows={3}
          />

          <SwitchField
            label="Mencionar verificación de servicios y balance de depósito / garantías"
            checked={data.restitucionDeposito}
            onChange={(checked) => update('restitucionDeposito', checked)}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

