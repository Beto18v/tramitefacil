import React from 'react';
import { MemorandoLlamadoAtencionData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import {
  CollapsibleSection,
  InputField,
  SelectField,
  SwitchField,
  TextareaField,
} from '../../../components/ui';
import { SignaturePad } from '../../../components/shared/SignaturePad';
import {
  Building2,
  User,
  ShieldAlert,
  CalendarClock,
  ShieldCheck,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<MemorandoLlamadoAtencionData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof MemorandoLlamadoAtencionData>(
    key: K,
    val: MemorandoLlamadoAtencionData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const faltasPredefinidas = [
    {
      tipo: 'retardo_injustificado' as const,
      label: 'Retardo Injustificado',
      hechos:
        'El día indicado se evidenció el ingreso al puesto de trabajo con más de 40 minutos de retraso sobre el horario laboral asignado, sin previo aviso ni justificación médica o de fuerza mayor comprobada.',
      norma:
        'Artículo 58 (Numerales 1 y 4) del Código Sustantivo del Trabajo y Reglamento Interno de Trabajo (Obligación de puntualidad y cumplimiento del horario pactado).',
    },
    {
      tipo: 'inasistencia_injustificada' as const,
      label: 'Inasistencia a Laborar',
      hechos:
        'El trabajador no se presentó a cumplir su jornada laboral en el turno programado, omitiendo dar oportuno aviso a su jefe inmediato y sin allegar constancia de incapacidad emitida por la EPS.',
      norma:
        'Artículo 58 Numeral 1° y Artículo 60 Numeral 4° del C.S.T., así como las disposiciones del Reglamento Interno de Trabajo sobre ausencias laborales no autorizadas.',
    },
    {
      tipo: 'incumplimiento_funciones' as const,
      label: 'Incumplimiento de Funciones',
      hechos:
        'Se verificó la omisión en la entrega oportuna de las tareas y reportes asignados conforme al manual de funciones de su cargo, generando retrasos en los procesos del área de trabajo.',
      norma:
        'Artículo 58 Numeral 1° del C.S.T. (Obligación de ejecutar la labor con la mayor eficiencia y cuidado profesional).',
    },
    {
      tipo: 'conducta_inapropiada' as const,
      label: 'Conducta / Trato Inadecuado',
      hechos:
        'Se constató una conducta contraria a las normas de convivencia laboral y respeto mutuo, dirigiéndose de manera inadecuada y desobligante hacia compañeros de trabajo o usuarios del servicio.',
      norma:
        'Artículo 58 Numeral 2° del C.S.T. (Guardar rigurosamente la moral en las relaciones con sus superiores y compañeros).',
    },
    {
      tipo: 'desacato_ordenes' as const,
      label: 'Desacato a Instrucciones',
      hechos:
        'El colaborador se rehusó injustificadamente a acatar directrices e instrucciones operativas legítimas impartidas de manera clara por su superior jerárquico dentro del marco de sus funciones.',
      norma:
        'Artículo 58 Numeral 1° del C.S.T. y Cláusula contractual sobre acatamiento de directrices operativas del empleador.',
    },
  ];

  const handleSeleccionarFalta = (falta: (typeof faltasPredefinidas)[0]) => {
    onChange({
      ...data,
      tipoFalta: falta.tipo,
      descripcionHechos: falta.hechos,
      normaVulnerada: falta.norma,
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Empresa y Emisor */}
      <CollapsibleSection
        step="Paso 01"
        title="Datos de la Empresa y Remitente"
        subtitle="Empresa, número de radicado y jefatura que emite el memorando"
        icon={<Building2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre de la Empresa o Empleador"
              value={data.nombreEmpresa}
              onChange={(e) => update('nombreEmpresa', e.target.value)}
              placeholder="Ej: INDUSTRIAS METÁLICAS DE OCCIDENTE S.A.S."
              required
            />
          </div>
          <InputField
            label="NIT de la Empresa"
            value={data.nitEmpresa}
            onChange={(e) => update('nitEmpresa', e.target.value)}
            placeholder="Ej: 890.301.245-9"
          />
          <InputField
            label="Número o Consecutivo del Memorando"
            value={data.numeroMemorando}
            onChange={(e) => update('numeroMemorando', e.target.value)}
            placeholder="Ej: MEM-2026-001"
          />
          <InputField
            label="Ciudad y Fecha"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Cali"
          />
          <InputField
            type="date"
            label="Fecha del Memorando"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
          />
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
            <InputField
              label="Nombre de quien Emite (Jefatura / RRHH)"
              value={data.remitenteNombre}
              onChange={(e) => update('remitenteNombre', e.target.value)}
              placeholder="Ej: Héctor Fabio Ramírez Lozano"
              required
            />
            <InputField
              label="Cargo de quien Emite"
              value={data.remitenteCargo}
              onChange={(e) => update('remitenteCargo', e.target.value)}
              placeholder="Ej: Gerente de Talento Humano"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Trabajador */}
      <CollapsibleSection
        step="Paso 02"
        title="Datos del Trabajador Notificado"
        subtitle="Nombre, documento de identidad, cargo y departamento"
        icon={<User className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre Completo del Trabajador"
              value={data.nombreTrabajador}
              onChange={(e) => update('nombreTrabajador', e.target.value)}
              placeholder="Ej: Julián Camilo Morales Pardo"
              required
            />
          </div>
          <SelectField
            label="Tipo de Documento"
            value={data.tipoDocumento}
            onChange={(e) => update('tipoDocumento', e.target.value)}
            options={[
              { label: 'Cédula de Ciudadanía', value: 'Cédula de Ciudadanía' },
              { label: 'Cédula de Extranjería', value: 'Cédula de Extranjería' },
              { label: 'Permiso Especial / PPT', value: 'Permiso por Protección Temporal (PPT)' },
              { label: 'Pasaporte', value: 'Pasaporte' },
            ]}
          />
          <InputField
            label="Número de Documento"
            value={data.numeroDocumento}
            onChange={(e) => update('numeroDocumento', e.target.value)}
            placeholder="Ej: 1.144.123.890"
            required
          />
          <InputField
            label="Cargo del Trabajador"
            value={data.cargoTrabajador}
            onChange={(e) => update('cargoTrabajador', e.target.value)}
            placeholder="Ej: Técnico de Mantenimiento"
          />
          <InputField
            label="Área o Departamento"
            value={data.departamentoArea}
            onChange={(e) => update('departamentoArea', e.target.value)}
            placeholder="Ej: Producción y Planta"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Falta y Hechos */}
      <CollapsibleSection
        step="Paso 03"
        title="Tipificación de la Falta y Hechos"
        subtitle="Selección rápida de causa, fecha de ocurrencia y narración de hechos"
        icon={<ShieldAlert className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Motivo o Falta Frecuente (Completa texto automáticamente):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {faltasPredefinidas.map((item) => (
                <button
                  key={item.tipo}
                  type="button"
                  onClick={() => handleSeleccionarFalta(item)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-all text-left ${
                    data.tipoFalta === item.tipo
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-medium dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-300'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <InputField
              type="date"
              label="Fecha en que Ocurrieron los Hechos"
              value={data.fechaFalta}
              onChange={(e) => update('fechaFalta', e.target.value)}
              required
            />
            <SelectField
              label="Clasificación de la Falta"
              value={data.tipoFalta}
              onChange={(e) => update('tipoFalta', e.target.value as any)}
              options={[
                { label: 'Retardo injustificado', value: 'retardo_injustificado' },
                { label: 'Inasistencia injustificada', value: 'inasistencia_injustificada' },
                { label: 'Incumplimiento de funciones', value: 'incumplimiento_funciones' },
                { label: 'Conducta o trato inapropiado', value: 'conducta_inapropiada' },
                { label: 'Desacato a órdenes de superiores', value: 'desacato_ordenes' },
                { label: 'Otra falta sujeta a revisión', value: 'otro' },
              ]}
            />
          </div>

          <TextareaField
            label="Descripción Detallada de los Hechos (Modo, Tiempo y Lugar)"
            value={data.descripcionHechos}
            onChange={(e) => update('descripcionHechos', e.target.value)}
            rows={4}
            required
          />

          <TextareaField
            label="Norma o Artículo Vulnerado (C.S.T. / Reglamento Interno)"
            value={data.normaVulnerada}
            onChange={(e) => update('normaVulnerada', e.target.value)}
            rows={2}
          />
        </div>
      </CollapsibleSection>

      {/* 4. Citación a Descargos */}
      <CollapsibleSection
        step="Paso 04"
        title="Garantía de Descargos y Debido Proceso"
        subtitle="Citación formal a diligencia de descargos (C.S.T. Art. 115)"
        icon={<CalendarClock className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <SwitchField
            label="Citar a Diligencia de Descargos"
            description="Requerido si se proyecta aplicar sanciones disciplinarias o suspensión temporal"
            checked={data.solicitaDescargos}
            onChange={(checked) => update('solicitaDescargos', checked)}
          />

          {data.solicitaDescargos && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/80">
              <InputField
                type="date"
                label="Fecha de la Diligencia"
                value={data.fechaDescargos}
                onChange={(e) => update('fechaDescargos', e.target.value)}
              />
              <InputField
                label="Hora de la Diligencia"
                value={data.horaDescargos}
                onChange={(e) => update('horaDescargos', e.target.value)}
                placeholder="Ej: 10:00 AM"
              />
              <InputField
                label="Lugar o Sala de Reunión"
                value={data.lugarDescargos}
                onChange={(e) => update('lugarDescargos', e.target.value)}
                placeholder="Ej: Sala de Juntas / Teams"
              />
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* 5. Advertencia, Hoja de Vida y Firmas */}
      <CollapsibleSection
        step="Paso 05"
        title="Advertencia, Hoja de Vida y Firmas"
        subtitle="Consecuencias de reincidencia y firmas formales"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <TextareaField
            label="Advertencia de Reincidencia"
            value={data.advertenciaReincidencia}
            onChange={(e) => update('advertenciaReincidencia', e.target.value)}
            rows={3}
          />

          <SwitchField
            label="Adjuntar Copia a la Hoja de Vida"
            description="Registra formalmente el memorando en el expediente laboral del trabajador"
            checked={data.copiaHojaVida}
            onChange={(checked) => update('copiaHojaVida', checked)}
          />

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Firma Digitalizada del Empleador / Emisor (Opcional)
            </label>
            <SignaturePad
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              onSignatureChange={(type, url) => {
                onChange({
                  ...data,
                  signatureType: type,
                  signatureDataUrl: url,
                });
              }}
              onSaveToProfile={onSaveSignatureToProfile}
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
