import React from 'react';
import { PermisoLaboralData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { User, Building, CalendarClock } from 'lucide-react';

interface Props {
  data: PermisoLaboralData;
  onChange: (updated: PermisoLaboralData) => void;
}

export const PermisoLaboralForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof PermisoLaboralData>(key: K, val: PermisoLaboralData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Empresa y Jefe Inmediato */}
      <CollapsibleSection
        title="Empresa y Jefatura Inmediata"
        subtitle="Destinatario responsable de la aprobación"
        icon={<Building className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre de la Empresa</label>
            <input
              type="text"
              value={data.nombreEmpresa}
              onChange={(e) => update('nombreEmpresa', e.target.value)}
              placeholder="Ej: INDUSTRIAS METÁLICAS S.A."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre del Jefe Inmediato</label>
            <input
              type="text"
              value={data.nombreJefe}
              onChange={(e) => update('nombreJefe', e.target.value)}
              placeholder="Ej: Ing. Carlos Hernán Caicedo"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo del Jefe</label>
            <input
              type="text"
              value={data.cargoJefe}
              onChange={(e) => update('cargoJefe', e.target.value)}
              placeholder="Ej: Director de Planta"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Datos del Empleado */}
      <CollapsibleSection
        title="Tus Datos y Cargo"
        subtitle="Nombre completo e identificación del solicitante"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tu Nombre Completo</label>
            <input
              type="text"
              value={data.nombreEmpleado}
              onChange={(e) => update('nombreEmpleado', e.target.value)}
              placeholder="Ej: Héctor Fabio Zuleta"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Número de Cédula</label>
            <input
              type="text"
              value={data.numeroDocumento}
              onChange={(e) => update('numeroDocumento', e.target.value)}
              placeholder="Ej: 16.789.012"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo que Desempeñas</label>
            <input
              type="text"
              value={data.cargoEmpleado}
              onChange={(e) => update('cargoEmpleado', e.target.value)}
              placeholder="Ej: Supervisor de Calidad"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Fechas y Modalidad del Permiso */}
      <CollapsibleSection
        title="Modalidad, Fechas y Justificación"
        subtitle="Tipo de permiso, duración y motivo de ausencia"
        icon={<CalendarClock className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tipo de Permiso / Licencia</label>
            <select
              value={data.tipoPermiso}
              onChange={(e) => update('tipoPermiso', e.target.value as any)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="calamidad">Calamidad Doméstica (Familiar / Urgencia)</option>
              <option value="estudio">Permiso Académico / Examen de Estudio</option>
              <option value="medico">Cita o Procedimiento Médico Especializado</option>
              <option value="tramite">Diligencia Notarial / Judicial / Trámite Personal</option>
              <option value="no_remunerada">Licencia No Remunerada</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Inicio</label>
              <input
                type="date"
                value={data.fechaInicio}
                onChange={(e) => update('fechaInicio', e.target.value)}
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Regreso</label>
              <input
                type="date"
                value={data.fechaFin}
                onChange={(e) => update('fechaFin', e.target.value)}
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Días Hábiles</label>
              <input
                type="number"
                min="1"
                value={data.diasTotales || 1}
                onChange={(e) => update('diasTotales', parseInt(e.target.value, 10) || 1)}
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Motivo y Justificación Detallada</label>
            <textarea
              rows={3}
              value={data.motivoDetallado}
              onChange={(e) => update('motivoDetallado', e.target.value)}
              placeholder="Explique respetuosamente la causa que motiva el permiso..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Compromiso de Compensación (Opcional)</label>
            <input
              type="text"
              value={data.compensacionHoras}
              onChange={(e) => update('compensacionHoras', e.target.value)}
              placeholder="Ej: Repondré las horas en el turno del sábado siguiente..."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={data.anexaSoportes}
              onChange={(e) => update('anexaSoportes', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <span className="text-xs text-slate-700">Se anexan soportes médicos / comprobantes probatorios</span>
          </label>
        </div>
      </CollapsibleSection>
    </div>
  );
};
