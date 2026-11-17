import React from 'react';
import { OtrosiLaboralData } from '../../../types/documents';
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
  FileText,
  Building2,
  User,
  SlidersHorizontal,
  ShieldCheck,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<OtrosiLaboralData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof OtrosiLaboralData>(
    key: K,
    val: OtrosiLaboralData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const modificacionesPredefinidas = [
    {
      tipo: 'ajuste_salarial' as const,
      label: 'Ajuste Salarial / Aumento',
      clausula: 'Cláusula Tercera (Salario y Remuneración)',
      anterior:
        'El EMPLEADOR pagará al TRABAJADOR por la prestación de sus servicios un salario básico mensual equivalente a $... m/cte.',
      nuevo:
        'A partir de la fecha de vigencia del presente otrosí, el salario básico mensual del TRABAJADOR será de $... m/cte., pagadero en los periodos y condiciones habituales.',
    },
    {
      tipo: 'cambio_cargo' as const,
      label: 'Ascenso o Cambio de Cargo',
      clausula: 'Cláusula Primera (Cargo y Funciones)',
      anterior:
        'El TRABAJADOR desempeñará el cargo de [Cargo anterior], ejerciendo las labores inherentes al puesto asignado.',
      nuevo:
        'A partir de la vigencia del presente otrosí, el TRABAJADOR desempeñará el cargo de [Nuevo Cargo], asumiendo las responsabilidades y funciones propias del nuevo rol.',
    },
    {
      tipo: 'prorroga_vigencia' as const,
      label: 'Prórroga de Duración',
      clausula: 'Cláusula Segunda (Duración y Prórrogas)',
      anterior:
        'El presente contrato tendrá una duración definida que vencerá el próximo [Fecha vencimiento anterior].',
      nuevo:
        'Las partes acuerdan de mutuo acuerdo prorrogar la duración del contrato por un término adicional de [X meses / 1 año], fijando como nueva fecha de vencimiento el próximo [Nueva fecha].',
    },
    {
      tipo: 'cambio_lugar_modalidad' as const,
      label: 'Modalidad Remota / Híbrida',
      clausula: 'Cláusula Cuarta (Lugar y Modalidad de Trabajo)',
      anterior:
        'El TRABAJADOR prestará sus servicios de manera presencial y exclusiva en las instalaciones físicas de la compañía.',
      nuevo:
        'Las partes convienen adoptar la modalidad de trabajo híbrido (Ley 2088/2021 y Ley 2121/2021), alternando jornadas presenciales en sede y jornadas de trabajo en casa, conforme a las políticas corporativas.',
    },
  ];

  const handleSeleccionarModificacion = (mod: (typeof modificacionesPredefinidas)[0]) => {
    onChange({
      ...data,
      tipoModificacion: mod.tipo,
      clausulaModificada: mod.clausula,
      textoAnterior: mod.anterior,
      textoNuevo: mod.nuevo,
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Contrato Base y Otrosí */}
      <CollapsibleSection
        step="Paso 01"
        title="Identificación del Contrato Base y Otrosí"
        subtitle="Número de otrosí, tipo de contrato de trabajo y fecha de suscripción"
        icon={<FileText className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            label="Número o Consecutivo del Otrosí"
            value={data.numeroOtrosi}
            onChange={(e) => update('numeroOtrosi', e.target.value)}
            placeholder="Ej: Otrosí N° 01"
            required
          />
          <SelectField
            label="Tipo de Contrato de Trabajo Original"
            value={data.tipoContratoOriginal}
            onChange={(e) => update('tipoContratoOriginal', e.target.value)}
            options={[
              { label: 'Contrato a Término Indefinido', value: 'Contrato de Trabajo a Término Indefinido' },
              { label: 'Contrato a Término Fijo', value: 'Contrato de Trabajo a Término Fijo' },
              { label: 'Contrato por Obra o Labor', value: 'Contrato de Trabajo por Duración de Obra o Labor' },
              { label: 'Contrato de Aprendizaje', value: 'Contrato de Aprendizaje' },
            ]}
          />
          <InputField
            type="date"
            label="Fecha del Contrato de Trabajo Original"
            value={data.fechaContratoOriginal}
            onChange={(e) => update('fechaContratoOriginal', e.target.value)}
            required
          />
          <InputField
            label="Ciudad de Celebración"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Bogotá D.C."
          />
          <InputField
            type="date"
            label="Fecha del Otrosí"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
          />
        </div>
      </CollapsibleSection>

      {/* 2. Partes Contractuales */}
      <CollapsibleSection
        step="Paso 02"
        title="Partes: Empleador y Trabajador"
        subtitle="Razón social, NIT, representante legal y trabajador"
        icon={<Building2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Empleador */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/80 space-y-3">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Datos del Empleador
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InputField
                label="Nombre de la Empresa o Empleador"
                value={data.nombreEmpresa}
                onChange={(e) => update('nombreEmpresa', e.target.value)}
                placeholder="Ej: SOLUCIONES DIGITALES S.A.S."
                required
              />
              <InputField
                label="NIT del Empleador"
                value={data.nitEmpresa}
                onChange={(e) => update('nitEmpresa', e.target.value)}
                placeholder="Ej: 900.876.543-1"
              />
              <InputField
                label="Nombre del Representante Legal"
                value={data.nombreRepresentanteLegal}
                onChange={(e) => update('nombreRepresentanteLegal', e.target.value)}
                placeholder="Ej: María Eugenia Celis Pineda"
              />
              <div className="grid grid-cols-2 gap-2">
                <SelectField
                  label="Tipo Doc. Rep."
                  value={data.tipoDocRepresentante}
                  onChange={(e) => update('tipoDocRepresentante', e.target.value)}
                  options={[
                    { label: 'C.C.', value: 'Cédula de Ciudadanía' },
                    { label: 'C.E.', value: 'Cédula de Extranjería' },
                    { label: 'Pasaporte', value: 'Pasaporte' },
                  ]}
                />
                <InputField
                  label="Número Doc."
                  value={data.numDocRepresentante}
                  onChange={(e) => update('numDocRepresentante', e.target.value)}
                  placeholder="Ej: 63.456.789"
                />
              </div>
            </div>
          </div>

          {/* Trabajador */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/80 space-y-3">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Datos del Trabajador
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <InputField
                  label="Nombre Completo del Trabajador"
                  value={data.nombreTrabajador}
                  onChange={(e) => update('nombreTrabajador', e.target.value)}
                  placeholder="Ej: Andrés Felipe Villamizar Rueda"
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
                placeholder="Ej: 1.098.765.432"
                required
              />
              <div className="sm:col-span-2">
                <InputField
                  label="Cargo Actual del Trabajador"
                  value={data.cargoTrabajador}
                  onChange={(e) => update('cargoTrabajador', e.target.value)}
                  placeholder="Ej: Líder de Desarrollo Web"
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Contenido de la Modificación */}
      <CollapsibleSection
        step="Paso 03"
        title="Modificación Acordada"
        subtitle="Tipo de ajuste, cláusula modificada, texto anterior y nueva redacción"
        icon={<SlidersHorizontal className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Tipo de Modificación Común (Carga plantilla sugerida):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {modificacionesPredefinidas.map((item) => (
                <button
                  key={item.tipo}
                  type="button"
                  onClick={() => handleSeleccionarModificacion(item)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-all text-left ${
                    data.tipoModificacion === item.tipo
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-medium dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-300'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Cláusula que se Modifica"
              value={data.clausulaModificada}
              onChange={(e) => update('clausulaModificada', e.target.value)}
              placeholder="Ej: Cláusula Tercera (Salario y Remuneración)"
              required
            />
            <InputField
              type="date"
              label="Fecha de Entrada en Vigencia"
              value={data.fechaVigenciaModificacion}
              onChange={(e) => update('fechaVigenciaModificacion', e.target.value)}
              required
            />
          </div>

          <TextareaField
            label="Texto o Estipulación Anterior (Opcional para comparación)"
            value={data.textoAnterior}
            onChange={(e) => update('textoAnterior', e.target.value)}
            rows={3}
            placeholder="Pega aquí el texto original de la cláusula antes del cambio..."
          />

          <TextareaField
            label="Nuevo Texto Acordado para la Cláusula"
            value={data.textoNuevo}
            onChange={(e) => update('textoNuevo', e.target.value)}
            rows={4}
            placeholder="Escribe la nueva redacción acordada entre las partes..."
            required
          />
        </div>
      </CollapsibleSection>

      {/* 4. Cláusula de Ratificación y Firmas */}
      <CollapsibleSection
        step="Paso 04"
        title="Ratificación de Términos y Firmas"
        subtitle="Mantenimiento de las demás estipulaciones y firmas de las partes"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <SwitchField
            label="Incluir Cláusula de Ratificación de Términos"
            description="Reafirma que todo lo no modificado expresamente en este otrosí permanece inalterado"
            checked={data.incluyeRatificacion}
            onChange={(checked) => update('incluyeRatificacion', checked)}
          />

          {data.incluyeRatificacion && (
            <TextareaField
              label="Texto de la Cláusula de Ratificación"
              value={data.ratificacionTexto}
              onChange={(e) => update('ratificacionTexto', e.target.value)}
              rows={3}
            />
          )}

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Firma Digitalizada del Trabajador (Opcional)
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
