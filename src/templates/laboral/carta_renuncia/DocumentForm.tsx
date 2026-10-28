import React from 'react';
import { CartaRenunciaData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { SignaturePad } from '../../../components/SignaturePad';
import { InputField, TextareaField, SwitchField } from '../../../components/ui';
import { Briefcase, Building, HeartHandshake, Sparkles, User } from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<CartaRenunciaData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof CartaRenunciaData>(key: K, val: CartaRenunciaData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleApplyMotivo = (categoria: CartaRenunciaData['motivoCategoria'], detalle: string) => {
    onChange({
      ...data,
      motivoCategoria: categoria,
      motivoDetalle: detalle,
    });
  };

  const quickMotives = [
    {
      label: 'Nuevos Retos',
      cat: 'nuevos_retos' as const,
      text: 'Esta determinación responde a una nueva oportunidad de desarrollo profesional que he decidido asumir, la cual se alinea con mis proyectos y metas de crecimiento a mediano y largo plazo.',
    },
    {
      label: 'Motivos Personales',
      cat: 'motivos_personales' as const,
      text: 'Esta renuncia obedece a razones estrictamente personales y familiares que demandan mi total dedicación y atención en este momento, haciéndome imposible continuar con mis responsabilidades laborales.',
    },
    {
      label: 'Estudios Superiores',
      cat: 'estudios' as const,
      text: 'Esta decisión obedece al inicio de un programa académico formal de educación superior que requiere mi dedicación de tiempo completo para mi formación profesional.',
    },
    {
      label: 'Traslado de Ciudad',
      cat: 'traslado' as const,
      text: 'Esta determinación se fundamenta en un inminente cambio de residencia a otra ciudad, situación que me impide físicamente seguir desempeñando mis funciones en la sede de la compañía.',
    },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Empresa y Destinatario */}
      <CollapsibleSection
        step="Paso 01"
        title="Empresa y Destinatario"
        subtitle="Nombre de la empresa, jefatura o talento humano"
        icon={<Building className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre de la Empresa o Empleador"
              value={data.nombreEmpresa}
              onChange={(e) => update('nombreEmpresa', e.target.value)}
              placeholder="Ej: TECNOLOGÍAS DEL PACÍFICO S.A.S."
              required
            />
          </div>

          <InputField
            label="Jefe Inmediato o Director(a) RRHH"
            value={data.nombreDestinatario}
            onChange={(e) => update('nombreDestinatario', e.target.value)}
            placeholder="Ej: Dra. Marcela Echeverri"
          />

          <InputField
            label="Cargo del Destinatario"
            value={data.cargoDestinatario}
            onChange={(e) => update('cargoDestinatario', e.target.value)}
            placeholder="Ej: Gerente de Talento Humano"
          />

          <InputField
            label="Ciudad"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Medellín"
            required
          />

          <InputField
            label="Fecha de la Carta"
            type="date"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
            required
          />
        </div>
      </CollapsibleSection>

      {/* 2. Tus Datos Laborales */}
      <CollapsibleSection
        step="Paso 02"
        title="Tus Datos y Cargo Laboral"
        subtitle="Cargo desempeñado, fecha de retiro y preaviso"
        icon={<Briefcase className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Tu Nombre Completo"
              value={data.nombreTrabajador}
              onChange={(e) => update('nombreTrabajador', e.target.value)}
              placeholder="Ej: Andrés Felipe Cardona Giraldo"
              required
            />
          </div>

          <InputField
            label="Cargo que Renuncias"
            value={data.cargoTrabajador}
            onChange={(e) => update('cargoTrabajador', e.target.value)}
            placeholder="Ej: Líder Técnico de Operaciones"
            required
          />

          <InputField
            label="Cédula de Ciudadanía"
            value={data.numeroDocumento}
            onChange={(e) => update('numeroDocumento', e.target.value)}
            placeholder="Ej: 1.045.789.234"
            required
          />

          <InputField
            label="Fecha de Ingreso (Opcional)"
            type="date"
            value={data.fechaIngreso}
            onChange={(e) => update('fechaIngreso', e.target.value)}
          />

          <InputField
            label="Último Día Laboral Efectivo"
            type="date"
            value={data.ultimoDiaLaboral}
            onChange={(e) => update('ultimoDiaLaboral', e.target.value)}
            required
          />

          <div className="sm:col-span-2">
            <SwitchField
              label="¿Solicitar exoneración del plazo de preaviso legal?"
              description="Permite retirarse de manera inmediata sin penalidad, solicitando la dispensa formal a la empresa."
              checked={data.solicitaExoneracionPreaviso}
              onChange={(checked) => update('solicitaExoneracionPreaviso', checked)}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Motivo y Agradecimiento */}
      <CollapsibleSection
        step="Paso 03"
        title="Motivo, Agradecimiento y Liquidación"
        subtitle="Razones de renuncia, empalme y solicitud de pago de prestaciones"
        icon={<HeartHandshake className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Selecciona un motivo común pre-redactado (1 toque):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickMotives.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => handleApplyMotivo(m.cat, m.text)}
                  className="min-h-[38px] px-3 py-1.5 text-xs font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <TextareaField
            label="Redacción Detallada del Motivo"
            value={data.motivoDetalle}
            onChange={(e) => update('motivoDetalle', e.target.value)}
            rows={3}
          />

          <TextareaField
            label="Párrafo de Agradecimiento"
            value={data.parrafoAgradecimiento}
            onChange={(e) => update('parrafoAgradecimiento', e.target.value)}
            rows={3}
          />

          <div className="space-y-2 pt-1">
            <SwitchField
              label="Ofrecer empalme y entrega formal de funciones pendientes"
              checked={data.ofrecimientoEmpalme}
              onChange={(checked) => update('ofrecimientoEmpalme', checked)}
            />

            <SwitchField
              label="Solicitar examen médico de egreso, paz y salvo y liquidación definitiva de prestaciones"
              checked={data.solicitudLiquidacion}
              onChange={(checked) => update('solicitudLiquidacion', checked)}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Tipográfica */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Trabajador"
        subtitle="Firma manuscrita en pantalla o pie notarial impreso"
        icon={<User className="w-5 h-5 text-indigo-600" />}
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
