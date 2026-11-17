import React from 'react';
import { ImpugnacionFotomultasData } from '../../../types/documents';
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
  ShieldAlert,
  Car,
  User,
  Scale,
  FileCheck,
  Building2,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<ImpugnacionFotomultasData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof ImpugnacionFotomultasData>(
    key: K,
    val: ImpugnacionFotomultasData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4">
      {/* 1. Organismo de Tránsito */}
      <CollapsibleSection
        title="Organismo de Tránsito y Radicación"
        icon={<Building2 className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Ciudad de radicación"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Fecha del derecho de petición"
            type="date"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
          />
          <div className="md:col-span-2">
            <InputField
              label="Organismo o Secretaría de Tránsito"
              value={data.organismoTransito}
              onChange={(e) => update('organismoTransito', e.target.value)}
              placeholder="Ej. Secretaría Distrital de Movilidad de Bogotá"
            />
          </div>
          <InputField
            label="Ciudad de la entidad"
            value={data.ciudadEntidad}
            onChange={(e) => update('ciudadEntidad', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
        </div>
      </CollapsibleSection>

      {/* 2. Solicitante / Propietario */}
      <CollapsibleSection
        title="Datos del Solicitante / Propietario"
        icon={<User className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre completo"
            value={data.nombreSolicitante}
            onChange={(e) => update('nombreSolicitante', e.target.value)}
            placeholder="Nombre completo del ciudadano"
          />
          <div className="grid grid-cols-2 gap-2">
            <SelectField
              label="Tipo doc."
              value={data.tipoDocSolicitante}
              onChange={(e) => update('tipoDocSolicitante', e.target.value)}
              options={[
                { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
                { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
                { value: 'NIT', label: 'NIT' },
                { value: 'Pasaporte', label: 'Pasaporte' },
              ]}
            />
            <InputField
              label="Número"
              value={data.numDocSolicitante}
              onChange={(e) => update('numDocSolicitante', e.target.value)}
              placeholder="Número de documento"
            />
          </div>
          <InputField
            label="Lugar de expedición del documento"
            value={data.expedicionSolicitante || ''}
            onChange={(e) => update('expedicionSolicitante', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <SelectField
            label="Calidad con respecto al vehículo"
            value={data.calidadSolicitante}
            onChange={(e) =>
              update(
                'calidadSolicitante',
                e.target.value as 'propietario' | 'conductor_autorizado' | 'apoderado'
              )
            }
            options={[
              { value: 'propietario', label: 'Propietario(a) inscrito en el RUNT' },
              { value: 'conductor_autorizado', label: 'Conductor(a) autorizado(a)' },
              { value: 'apoderado', label: 'Apoderado(a) especial' },
            ]}
          />
          <InputField
            label="Dirección de notificación"
            value={data.direccionNotificacion}
            onChange={(e) => update('direccionNotificacion', e.target.value)}
            placeholder="Ej. Calle 100 # 15-20, Apto 401"
          />
          <InputField
            label="Ciudad de notificación"
            value={data.ciudadNotificacion}
            onChange={(e) => update('ciudadNotificacion', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Teléfono celular"
            value={data.telefonoSolicitante}
            onChange={(e) => update('telefonoSolicitante', e.target.value)}
            placeholder="Ej. +57 310 123 4567"
          />
          <InputField
            label="Correo electrónico para notificaciones"
            type="email"
            value={data.correoNotificacion}
            onChange={(e) => update('correoNotificacion', e.target.value)}
            placeholder="correo@ejemplo.com"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Detalle de la Fotomulta */}
      <CollapsibleSection
        title="Detalle del Comparendo y Vehículo"
        icon={<Car className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="N° de Comparendo"
            value={data.numeroComparendo}
            onChange={(e) => update('numeroComparendo', e.target.value)}
            placeholder="Ej. 11001000000012345678"
          />
          <InputField
            label="Fecha de la infracción"
            type="date"
            value={data.fechaComparendo}
            onChange={(e) => update('fechaComparendo', e.target.value)}
          />
          <InputField
            label="Hora de la infracción"
            value={data.horaComparendo || ''}
            onChange={(e) => update('horaComparendo', e.target.value)}
            placeholder="Ej. 14:30"
          />
          <InputField
            label="Placa del vehículo"
            value={data.placaVehiculo}
            onChange={(e) => update('placaVehiculo', e.target.value.toUpperCase())}
            placeholder="Ej. ABC 123"
          />
          <div className="md:col-span-2">
            <InputField
              label="Lugar o dirección de la fotodetección"
              value={data.lugarInfraccion}
              onChange={(e) => update('lugarInfraccion', e.target.value)}
              placeholder="Ej. Autopista Norte con Calle 127, Sentido Sur-Norte"
            />
          </div>
          <div className="md:col-span-3">
            <InputField
              label="Código y descripción de la infracción"
              value={data.codigoInfraccion}
              onChange={(e) => update('codigoInfraccion', e.target.value)}
              placeholder="Ej. C.29 (Conducir a velocidad superior a la permitida)"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Causales de Impugnación */}
      <CollapsibleSection
        title="Causales Jurídicas de Impugnación"
        icon={<ShieldAlert className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
            <SwitchField
              label="Falta de identificación plena del conductor (Sentencia C-038 de 2020)"
              checked={data.causalFaltaIdentificacion}
              onChange={(checked) => update('causalFaltaIdentificacion', checked)}
              description="La Corte Constitucional prohibió sancionar automáticamente al propietario sin probar plenamente quién conducía."
            />
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
            <SwitchField
              label="Notificación extemporánea o indebida (Ley 1843 de 2017, Art. 8)"
              checked={data.causalFaltaNotificacion}
              onChange={(checked) => update('causalFaltaNotificacion', checked)}
              description="Activar si la citación por correo físico no fue enviada dentro de los 3 días hábiles posteriores a la validación."
            />
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
            <SwitchField
              label="Falta de calibración periódica o señalización visible a 500m"
              checked={data.causalCalibracionSenalizacion}
              onChange={(checked) => update('causalCalibracionSenalizacion', checked)}
              description="Cuestionar la calibración técnica del cinemómetro o la ausencia de aviso reglamentario previo."
            />
          </div>

          <TextareaField
            label="Hechos adicionales y detalles de su caso"
            rows={3}
            value={data.hechosAdicionales || ''}
            onChange={(e) => update('hechosAdicionales', e.target.value)}
            placeholder="Describa circunstancias adicionales (por ejemplo, el vehículo estaba arrendado, vendido con traspaso abierto, usted no estaba en la ciudad, etc.)."
          />
        </div>
      </CollapsibleSection>

      {/* 5. Peticiones Expresas */}
      <CollapsibleSection
        title="Peticiones Expresas a la Entidad"
        icon={<Scale className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <SwitchField
            label="Solicitar exoneración total de responsabilidad contravencional"
            checked={data.solicitaExoneracion}
            onChange={(checked) => update('solicitaExoneracion', checked)}
          />
          <SwitchField
            label="Solicitar archivo definitivo del comparendo y paz y salvo en SIMIT"
            checked={data.solicitaArchivoComparendo}
            onChange={(checked) => update('solicitaArchivoComparendo', checked)}
          />
          <SwitchField
            label="Solicitar aporte de prueba fotográfica nítida del conductor y certificado de calibración"
            checked={data.solicitaPruebaTecnica}
            onChange={(checked) => update('solicitaPruebaTecnica', checked)}
          />
          <TextareaField
            label="Peticiones adicionales (opcional)"
            rows={2}
            value={data.peticionesAdicionales || ''}
            onChange={(e) => update('peticionesAdicionales', e.target.value)}
            placeholder="Ej. Solicitud de no cobro de intereses moratorios ni envío a cobro coactivo."
          />
        </div>
      </CollapsibleSection>

      {/* 6. Anexos y Firma */}
      <CollapsibleSection
        title="Anexos y Firma Digital"
        icon={<FileCheck className="w-5 h-5 text-emerald-600" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <TextareaField
            label="Relación de anexos documentales"
            rows={3}
            value={data.anexos || ''}
            onChange={(e) => update('anexos', e.target.value)}
            placeholder="1. Copia de la cédula... 2. Copia de tarjeta de propiedad..."
          />

          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Firma digital del solicitante
            </p>
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
