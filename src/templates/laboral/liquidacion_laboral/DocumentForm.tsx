import React from 'react';
import { LiquidacionLaboralData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import {
  CollapsibleSection,
  InputField,
  SelectField,
  CurrencyField,
  SwitchField,
  TextareaField,
} from '../../../components/ui';
import { SignaturePad } from '../../../components/shared/SignaturePad';
import { numeroALetras } from '../../../utils/numberToWords';
import {
  Building2,
  User,
  CalendarClock,
  Calculator,
  ShieldCheck,
  RotateCcw,
  Receipt,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<LiquidacionLaboralData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof LiquidacionLaboralData>(
    key: K,
    val: LiquidacionLaboralData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const calcularFórmulasDeLey = () => {
    const salarioBase = Math.max(0, Number(data.salarioBase) || 0);
    const auxilioTransporte = data.incluyeAuxilioTransporte
      ? Math.max(0, Number(data.auxilioTransporte) || 0)
      : 0;
    const basePrestaciones = salarioBase + auxilioTransporte;

    const diasCesantias = Math.max(0, Number(data.diasCesantias) || 0);
    const diasPrima = Math.max(0, Number(data.diasPrima) || 0);
    const diasVacaciones = Math.max(0, Number(data.diasVacaciones) || 0);

    const cesantias = Math.round((basePrestaciones * diasCesantias) / 360);
    const intereses = Math.round((cesantias * diasCesantias * 0.12) / 360);
    const prima = Math.round((basePrestaciones * diasPrima) / 360);
    const vacaciones = Math.round((salarioBase * diasVacaciones) / 720);

    const otrosDevengos = Math.max(0, Number(data.otrosDevengos) || 0);
    const subtotal = cesantias + intereses + prima + vacaciones + otrosDevengos;

    const deducciones =
      Math.max(0, Number(data.saludPensionDeducciones) || 0) +
      Math.max(0, Number(data.otrasDeducciones) || 0);

    const totalNeto = Math.max(0, subtotal - deducciones);
    const textoLetras = numeroALetras(totalNeto);

    onChange({
      ...data,
      salarioBaseLiquidacion: basePrestaciones,
      cesantiasValor: cesantias,
      interesesCesantiasValor: intereses,
      primaValor: prima,
      vacacionesValor: vacaciones,
      totalLiquidacion: totalNeto,
      totalEnLetras: textoLetras,
    });
  };

  const motivosComunes = [
    'Terminación de contrato por vencimiento del plazo pactado',
    'Renuncia voluntaria del trabajador',
    'Terminación por mutuo acuerdo entre las partes',
    'Terminación unilateral por justa causa comprobada',
    'Despido sin justa causa con indemnización',
    'Terminación de la obra o labor contratada',
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Empresa y Empleador */}
      <CollapsibleSection
        step="Paso 01"
        title="Datos de la Empresa y Empleador"
        subtitle="Razón social, NIT y datos del representante"
        icon={<Building2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Razón Social o Nombre del Empleador"
              value={data.nombreEmpresa}
              onChange={(e) => update('nombreEmpresa', e.target.value)}
              placeholder="Ej: DISTRIBUIDORA ANDINA S.A.S."
              required
            />
          </div>
          <InputField
            label="NIT o Documento del Empleador"
            value={data.nitEmpresa}
            onChange={(e) => update('nitEmpresa', e.target.value)}
            placeholder="Ej: 901.234.567-8"
          />
          <InputField
            label="Ciudad de Operación"
            value={data.ciudadEmpresa}
            onChange={(e) => update('ciudadEmpresa', e.target.value)}
            placeholder="Ej: Bogotá D.C."
          />
          <div className="sm:col-span-2">
            <InputField
              label="Nombre del Representante Legal o Jefe de RRHH"
              value={data.nombreRepresentante}
              onChange={(e) => update('nombreRepresentante', e.target.value)}
              placeholder="Ej: Diana Marcela Restrepo Vélez"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Trabajador */}
      <CollapsibleSection
        step="Paso 02"
        title="Datos del Trabajador"
        subtitle="Nombre, identificación y cargo liquidado"
        icon={<User className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre Completo del Trabajador"
              value={data.nombreTrabajador}
              onChange={(e) => update('nombreTrabajador', e.target.value)}
              placeholder="Ej: Carlos Andrés Mejía Ospina"
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
            placeholder="Ej: 1.018.456.789"
            required
          />
          <div className="sm:col-span-2">
            <InputField
              label="Cargo Desempeñado"
              value={data.cargoTrabajador}
              onChange={(e) => update('cargoTrabajador', e.target.value)}
              placeholder="Ej: Coordinador de Almacén y Despachos"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Periodo Laboral y Causa de Retiro */}
      <CollapsibleSection
        step="Paso 03"
        title="Periodo Laboral y Retiro"
        subtitle="Fechas de vinculación y causa de terminación"
        icon={<CalendarClock className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            type="date"
            label="Fecha de Ingreso"
            value={data.fechaIngreso}
            onChange={(e) => update('fechaIngreso', e.target.value)}
          />
          <InputField
            type="date"
            label="Fecha de Retiro / Último Día"
            value={data.fechaRetiro}
            onChange={(e) => update('fechaRetiro', e.target.value)}
            required
          />
          <InputField
            label="Ciudad y Fecha de Expedición"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Bogotá D.C."
          />
          <InputField
            type="date"
            label="Fecha del Documento"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
          />

          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Causa de Retiro
            </label>
            <div className="flex flex-wrap gap-1.5">
              {motivosComunes.map((motivo) => (
                <button
                  key={motivo}
                  type="button"
                  onClick={() => update('motivoRetiro', motivo)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-all text-left ${
                    data.motivoRetiro === motivo
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-medium dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-300'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {motivo}
                </button>
              ))}
            </div>
            <InputField
              label="Motivo Específico de Retiro"
              value={data.motivoRetiro}
              onChange={(e) => update('motivoRetiro', e.target.value)}
              placeholder="Causa de retiro o terminación de contrato"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Salario y Bases de Liquidación */}
      <CollapsibleSection
        step="Paso 04"
        title="Salario y Días a Liquidar"
        subtitle="Sueldo base, auxilio de transporte y días computados"
        icon={<Calculator className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CurrencyField
              label="Salario Básico Mensual"
              value={data.salarioBase}
              onChange={(val) => update('salarioBase', val)}
              placeholder="1600000"
            />

            <div className="space-y-2">
              <SwitchField
                label="Incluye Auxilio de Transporte"
                description="Aplica para trabajadores que devengan hasta 2 salarios mínimos"
                checked={data.incluyeAuxilioTransporte}
                onChange={(checked) => update('incluyeAuxilioTransporte', checked)}
              />
              {data.incluyeAuxilioTransporte && (
                <CurrencyField
                  label="Valor Auxilio de Transporte"
                  value={data.auxilioTransporte}
                  onChange={(val) => update('auxilioTransporte', val)}
                  placeholder="200000"
                />
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-lg space-y-3">
            <p className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 tracking-wider">
              Días trabajados en el periodo a liquidar
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InputField
                type="number"
                label="Días Cesantías (año en curso)"
                value={String(data.diasCesantias)}
                onChange={(e) => update('diasCesantias', Number(e.target.value) || 0)}
              />
              <InputField
                type="number"
                label="Días Prima (semestre en curso)"
                value={String(data.diasPrima)}
                onChange={(e) => update('diasPrima', Number(e.target.value) || 0)}
              />
              <InputField
                type="number"
                label="Días Vacaciones (pendientes)"
                value={String(data.diasVacaciones)}
                onChange={(e) => update('diasVacaciones', Number(e.target.value) || 0)}
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={calcularFórmulasDeLey}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Calcular Valores Sugeridos de Ley (C.S.T.)
              </button>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Valores Liquidados y Deducciones */}
      <CollapsibleSection
        step="Paso 05"
        title="Prestaciones, Bonos y Deducciones"
        subtitle="Montos exactos de cesantías, intereses, prima y retenciones"
        icon={<Receipt className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CurrencyField
              label="Valor Cesantías"
              value={data.cesantiasValor}
              onChange={(val) => update('cesantiasValor', val)}
            />
            <CurrencyField
              label="Valor Intereses a las Cesantías"
              value={data.interesesCesantiasValor}
              onChange={(val) => update('interesesCesantiasValor', val)}
            />
            <CurrencyField
              label="Valor Prima de Servicios"
              value={data.primaValor}
              onChange={(val) => update('primaValor', val)}
            />
            <CurrencyField
              label="Valor Vacaciones Compensadas"
              value={data.vacacionesValor}
              onChange={(val) => update('vacacionesValor', val)}
            />
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/80 space-y-3">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Otros Pagos y Deducciones
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CurrencyField
                label="Otros Devengos / Bonos"
                value={data.otrosDevengos}
                onChange={(val) => update('otrosDevengos', val)}
              />
              <InputField
                label="Concepto de Otros Devengos"
                value={data.descripcionOtrosDevengos}
                onChange={(e) => update('descripcionOtrosDevengos', e.target.value)}
                placeholder="Ej: Bonificación por cumplimiento de metas"
              />
              <CurrencyField
                label="Deducciones Seguridad Social (Salud/Pensión)"
                value={data.saludPensionDeducciones}
                onChange={(val) => update('saludPensionDeducciones', val)}
              />
              <CurrencyField
                label="Otras Deducciones Autorizadas"
                value={data.otrasDeducciones}
                onChange={(val) => update('otrasDeducciones', val)}
              />
            </div>
            {data.otrasDeducciones > 0 && (
              <InputField
                label="Detalle de Otras Deducciones"
                value={data.descripcionOtrasDeducciones}
                onChange={(e) => update('descripcionOtrasDeducciones', e.target.value)}
                placeholder="Ej: Préstamo de nómina, libranza o anticipo"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <CurrencyField
              label="TOTAL NETO A PAGAR"
              value={data.totalLiquidacion}
              onChange={(val) => {
                update('totalLiquidacion', val);
                update('totalEnLetras', numeroALetras(val));
              }}
            />
            <InputField
              label="Total en Letras"
              value={data.totalEnLetras}
              onChange={(e) => update('totalEnLetras', e.target.value)}
              placeholder="DOS MILLONES..."
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 6. Paz y Salvo y Firma */}
      <CollapsibleSection
        step="Paso 06"
        title="Declaración de Paz y Salvo y Firmas"
        subtitle="Cláusula de finiquito y recuadro de huella dactilar"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <TextareaField
            label="Texto de la Declaración de Paz y Salvo"
            value={data.pazYSalvoDeclaracion}
            onChange={(e) => update('pazYSalvoDeclaracion', e.target.value)}
            rows={4}
          />

          <SwitchField
            label="Incluir Recuadro para Huella Dactilar"
            description="Agrega un espacio formal de impresión dactilar para el trabajador"
            checked={data.incluirHuella}
            onChange={(checked) => update('incluirHuella', checked)}
          />

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
