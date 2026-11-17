import React from 'react';
import { ProrrogaArrendamientoData } from '../../../types/documents';
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
  FileText,
  Home,
  User,
  Calendar,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<ProrrogaArrendamientoData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof ProrrogaArrendamientoData>(
    key: K,
    val: ProrrogaArrendamientoData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const handleCanonAnteriorChange = (val: number) => {
    const incremento = Number(data.porcentajeIncremento) || 0;
    const nuevoCalculado = Math.round(val * (1 + incremento / 100));
    onChange({
      ...data,
      canonAnterior: val,
      nuevoCanon: nuevoCalculado,
      nuevoCanonLetras: numeroALetras(nuevoCalculado),
    });
  };

  const handlePorcentajeChange = (pct: number) => {
    const canonAnt = Number(data.canonAnterior) || 0;
    const nuevoCalculado = Math.round(canonAnt * (1 + pct / 100));
    onChange({
      ...data,
      porcentajeIncremento: pct,
      nuevoCanon: nuevoCalculado,
      nuevoCanonLetras: numeroALetras(nuevoCalculado),
    });
  };

  return (
    <div className="space-y-4">
      {/* 1. Información General del Contrato */}
      <CollapsibleSection
        title="Contrato Original y Lugar"
        icon={<FileText className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Ciudad de firma"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Fecha del otrosí"
            type="date"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
          />
          <InputField
            label="Fecha del contrato original"
            type="date"
            value={data.fechaContratoOriginal}
            onChange={(e) => update('fechaContratoOriginal', e.target.value)}
          />
          <InputField
            label="N° Contrato original (opcional)"
            value={data.numeroContratoOriginal || ''}
            onChange={(e) => update('numeroContratoOriginal', e.target.value)}
            placeholder="Ej. ARR-2025-084"
          />
          <div className="md:col-span-2">
            <SelectField
              label="Destinación del inmueble"
              value={data.usoInmueble}
              onChange={(e) => update('usoInmueble', e.target.value as 'vivienda' | 'comercial')}
              options={[
                { value: 'vivienda', label: 'Vivienda Urbana (Regulado por Ley 820 de 2003)' },
                { value: 'comercial', label: 'Comercial / Oficina / Bodega (Código de Comercio)' },
              ]}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Ubicación del Inmueble */}
      <CollapsibleSection
        title="Inmueble Arrendado"
        icon={<Home className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Dirección completa del inmueble"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej. Carrera 15 # 85-30, Apto 502, Edificio Los Nogales"
            />
          </div>
          <InputField
            label="Ciudad del inmueble"
            value={data.ciudadInmueble}
            onChange={(e) => update('ciudadInmueble', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Matrícula inmobiliaria (opcional)"
            value={data.matriculaInmobiliaria || ''}
            onChange={(e) => update('matriculaInmobiliaria', e.target.value)}
            placeholder="Ej. 50C-2049182"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Partes Intervinientes */}
      <CollapsibleSection
        title="Partes Intervinientes"
        icon={<User className="w-5 h-5 text-emerald-600" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Datos del Arrendador
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Nombre completo o razón social"
                value={data.nombreArrendador}
                onChange={(e) => update('nombreArrendador', e.target.value)}
                placeholder="Nombre del arrendador"
              />
              <div className="grid grid-cols-2 gap-2">
                <SelectField
                  label="Tipo doc."
                  value={data.tipoDocArrendador}
                  onChange={(e) => update('tipoDocArrendador', e.target.value)}
                  options={[
                    { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
                    { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
                    { value: 'NIT', label: 'NIT' },
                    { value: 'Pasaporte', label: 'Pasaporte' },
                  ]}
                />
                <InputField
                  label="Número"
                  value={data.numDocArrendador}
                  onChange={(e) => update('numDocArrendador', e.target.value)}
                  placeholder="Número de identificación"
                />
              </div>
              <InputField
                label="Teléfono de contacto"
                value={data.telefonoArrendador || ''}
                onChange={(e) => update('telefonoArrendador', e.target.value)}
                placeholder="Ej. +57 310 123 4567"
              />
              <InputField
                label="Correo electrónico"
                type="email"
                value={data.correoArrendador || ''}
                onChange={(e) => update('correoArrendador', e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Datos del Arrendatario
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Nombre completo o razón social"
                value={data.nombreArrendatario}
                onChange={(e) => update('nombreArrendatario', e.target.value)}
                placeholder="Nombre del arrendatario"
              />
              <div className="grid grid-cols-2 gap-2">
                <SelectField
                  label="Tipo doc."
                  value={data.tipoDocArrendatario}
                  onChange={(e) => update('tipoDocArrendatario', e.target.value)}
                  options={[
                    { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
                    { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
                    { value: 'NIT', label: 'NIT' },
                    { value: 'Pasaporte', label: 'Pasaporte' },
                  ]}
                />
                <InputField
                  label="Número"
                  value={data.numDocArrendatario}
                  onChange={(e) => update('numDocArrendatario', e.target.value)}
                  placeholder="Número de identificación"
                />
              </div>
              <InputField
                label="Teléfono de contacto"
                value={data.telefonoArrendatario || ''}
                onChange={(e) => update('telefonoArrendatario', e.target.value)}
                placeholder="Ej. +57 316 789 1234"
              />
              <InputField
                label="Correo electrónico"
                type="email"
                value={data.correoArrendatario || ''}
                onChange={(e) => update('correoArrendatario', e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <SwitchField
              label="Incluir Codeudor o Fiador Solidario"
              checked={data.incluyeCodeudor}
              onChange={(checked) => update('incluyeCodeudor', checked)}
              description="Activar si el contrato original cuenta con codeudor que debe ratificar y firmar la prórroga."
            />
            {data.incluyeCodeudor && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <InputField
                  label="Nombre del codeudor"
                  value={data.nombreCodeudor || ''}
                  onChange={(e) => update('nombreCodeudor', e.target.value)}
                  placeholder="Nombre completo"
                />
                <div className="grid grid-cols-2 gap-2">
                  <SelectField
                    label="Tipo doc."
                    value={data.tipoDocCodeudor || 'Cédula de Ciudadanía'}
                    onChange={(e) => update('tipoDocCodeudor', e.target.value)}
                    options={[
                      { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
                      { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
                      { value: 'NIT', label: 'NIT' },
                    ]}
                  />
                  <InputField
                    label="Número"
                    value={data.numDocCodeudor || ''}
                    onChange={(e) => update('numDocCodeudor', e.target.value)}
                    placeholder="Número"
                  />
                </div>
                <InputField
                  label="Teléfono del codeudor"
                  value={data.telefonoCodeudor || ''}
                  onChange={(e) => update('telefonoCodeudor', e.target.value)}
                  placeholder="Ej. +57 301 234 5678"
                />
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Términos de la Prórroga */}
      <CollapsibleSection
        title="Plazo y Vigencia de la Prórroga"
        icon={<Calendar className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Fecha inicio de prórroga"
            type="date"
            value={data.fechaInicioProrroga}
            onChange={(e) => update('fechaInicioProrroga', e.target.value)}
          />
          <InputField
            label="Fecha fin de prórroga"
            type="date"
            value={data.fechaFinProrroga}
            onChange={(e) => update('fechaFinProrroga', e.target.value)}
          />
          <InputField
            label="Duración en meses"
            type="number"
            value={data.duracionMeses.toString()}
            onChange={(e) => update('duracionMeses', parseInt(e.target.value) || 12)}
          />
        </div>
      </CollapsibleSection>

      {/* 5. Canon e Incremento */}
      <CollapsibleSection
        title="Ajuste de Canon y Forma de Pago"
        icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CurrencyField
            label="Canon mensual anterior"
            value={data.canonAnterior}
            onChange={handleCanonAnteriorChange}
          />
          <InputField
            label="Porcentaje de incremento (%)"
            type="number"
            step="0.01"
            value={data.porcentajeIncremento.toString()}
            onChange={(e) => handlePorcentajeChange(parseFloat(e.target.value) || 0)}
            helperText="IPC legal pactado (Ley 820 de 2003 para vivienda)"
          />
          <CurrencyField
            label="Nuevo canon mensual acordado"
            value={data.nuevoCanon}
            onChange={(val) => {
              onChange({
                ...data,
                nuevoCanon: val,
                nuevoCanonLetras: numeroALetras(val),
              });
            }}
          />
          <InputField
            label="Nuevo canon en letras"
            value={data.nuevoCanonLetras || numeroALetras(data.nuevoCanon)}
            onChange={(e) => update('nuevoCanonLetras', e.target.value)}
            placeholder="Cálculo automático de letras"
          />
          <div className="md:col-span-2">
            <InputField
              label="Oportunidad y forma de pago"
              value={data.formaDePago}
              onChange={(e) => update('formaDePago', e.target.value)}
              placeholder="Ej. Dentro de los primeros cinco (5) días hábiles de cada mes"
            />
          </div>
          <div className="md:col-span-2">
            <InputField
              label="Cuenta bancaria de consignación (opcional)"
              value={data.cuentaBancariaPago || ''}
              onChange={(e) => update('cuentaBancariaPago', e.target.value)}
              placeholder="Ej. Cuenta de Ahorros Bancolombia N° 123-456789-00 a nombre del arrendador"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 6. Ratificación y Firma */}
      <CollapsibleSection
        title="Ratificación y Firma"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <TextareaField
            label="Cláusula de ratificación contractual"
            rows={3}
            value={data.ratificacionTexto}
            onChange={(e) => update('ratificacionTexto', e.target.value)}
          />

          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Firma digital del arrendatario
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
