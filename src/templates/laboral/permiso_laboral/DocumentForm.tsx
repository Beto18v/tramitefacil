import React from 'react';
import { PermisoLaboralData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { SignaturePad } from '../../../components/SignaturePad';
import { InputField, SelectField, TextareaField, SwitchField } from '../../../components/ui';
import { PiBuildings, PiCalendarBlank, PiUser } from 'react-icons/pi';

export const DocumentForm: React.FC<DocumentFormProps<PermisoLaboralData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof PermisoLaboralData>(key: K, val: PermisoLaboralData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const tipoPermisoOptions = [
    { value: 'calamidad', label: 'Calamidad Doméstica (Familiar / Urgencia)' },
    { value: 'estudio', label: 'Permiso Académico / Examen de Estudio' },
    { value: 'medico', label: 'Cita o Procedimiento Médico Especializado' },
    { value: 'tramite', label: 'Diligencia Notarial / Judicial / Trámite Personal' },
    { value: 'no_remunerada', label: 'Licencia No Remunerada' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Empresa y Jefe Inmediato */}
      <CollapsibleSection
        step="Paso 01"
        title="Empresa y Jefatura Inmediata"
        subtitle="Destinatario responsable de la aprobación"
        icon={<PiBuildings className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre de la Empresa"
              value={data.nombreEmpresa}
              onChange={(e) => update('nombreEmpresa', e.target.value)}
              placeholder="Ej: INDUSTRIAS METÁLICAS S.A."
              required
            />
          </div>

          <InputField
            label="Nombre del Jefe Inmediato"
            value={data.nombreJefe}
            onChange={(e) => update('nombreJefe', e.target.value)}
            placeholder="Ej: Ing. Carlos Hernán Caicedo"
            required
          />

          <InputField
            label="Cargo del Jefe"
            value={data.cargoJefe}
            onChange={(e) => update('cargoJefe', e.target.value)}
            placeholder="Ej: Director de Planta"
          />

          <div className="grid grid-cols-2 gap-2 sm:col-span-2">
            <InputField
              label="Ciudad"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              required
            />
            <InputField
              label="Fecha de la Solicitud"
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
              required
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Datos del Empleado */}
      <CollapsibleSection
        step="Paso 02"
        title="Tus Datos y Cargo"
        subtitle="Nombre completo e identificación del solicitante"
        icon={<PiUser className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Tu Nombre Completo"
              value={data.nombreEmpleado}
              onChange={(e) => update('nombreEmpleado', e.target.value)}
              placeholder="Ej: Héctor Fabio Zuleta"
              required
            />
          </div>

          <InputField
            label="Número de Cédula"
            value={data.numeroDocumento}
            onChange={(e) => update('numeroDocumento', e.target.value)}
            placeholder="Ej: 16.789.012"
            required
          />

          <InputField
            label="Cargo que Desempeñas"
            value={data.cargoEmpleado}
            onChange={(e) => update('cargoEmpleado', e.target.value)}
            placeholder="Ej: Supervisor de Calidad"
            required
          />
        </div>
      </CollapsibleSection>

      {/* 3. Fechas y Modalidad del Permiso */}
      <CollapsibleSection
        step="Paso 03"
        title="Modalidad, Fechas y Justificación"
        subtitle="Tipo de permiso, duración y motivo de ausencia"
        icon={<PiCalendarBlank className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <SelectField
            label="Tipo de Permiso / Licencia"
            value={data.tipoPermiso}
            onChange={(e) =>
              update('tipoPermiso', e.target.value as PermisoLaboralData['tipoPermiso'])
            }
            options={tipoPermisoOptions}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InputField
              label="Fecha de Inicio"
              type="date"
              value={data.fechaInicio}
              onChange={(e) => update('fechaInicio', e.target.value)}
              required
            />

            <InputField
              label="Fecha de Regreso"
              type="date"
              value={data.fechaFin}
              onChange={(e) => update('fechaFin', e.target.value)}
              required
            />

            <InputField
              label="Días Hábiles"
              type="number"
              min={1}
              value={data.diasTotales || 1}
              onChange={(e) => update('diasTotales', parseInt(e.target.value, 10) || 1)}
              required
            />
          </div>

          <TextareaField
            label="Motivo y Justificación Detallada"
            value={data.motivoDetallado}
            onChange={(e) => update('motivoDetallado', e.target.value)}
            placeholder="Explique respetuosamente la causa que motiva el permiso..."
            rows={3}
            required
          />

          <InputField
            label="Compromiso de Compensación (Opcional)"
            value={data.compensacionHoras}
            onChange={(e) => update('compensacionHoras', e.target.value)}
            placeholder="Ej: Repondré las horas en el turno del sábado siguiente..."
          />

          <SwitchField
            label="Se anexan soportes médicos / comprobantes probatorios"
            checked={data.anexaSoportes}
            onChange={(checked) => update('anexaSoportes', checked)}
          />
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Tipográfica */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Solicitante"
        subtitle="Firma manuscrita en pantalla o pie notarial impreso"
        icon={<PiUser className="w-5 h-5 text-indigo-600" />}
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
