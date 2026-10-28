import React from 'react';
import { ContratoArrendamientoData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { SignaturePad } from '../../../components/SignaturePad';
import { InputField, SelectField, CurrencyField, SwitchField } from '../../../components/ui';
import { DollarSign, Home, User } from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<ContratoArrendamientoData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof ContratoArrendamientoData>(
    key: K,
    val: ContratoArrendamientoData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const tipoDocOptions = [
    { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía (C.C.)' },
    { value: 'NIT', label: 'NIT' },
    { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería (C.E.)' },
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Partes Arrendador y Arrendatario */}
      <CollapsibleSection
        step="Paso 01"
        title="Partes del Arrendamiento"
        subtitle="Identificación del Arrendador (Propietario) y Arrendatario (Inquilino)"
        icon={<User className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          {/* Arrendador */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-tight block">
              Datos del Arrendador (Propietario):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputField
                label="Nombre del Arrendador"
                value={data.nombreArrendador}
                onChange={(e) => update('nombreArrendador', e.target.value)}
                placeholder="Nombre o Razón Social"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <SelectField
                  label="Tipo Doc."
                  value={data.tipoDocArrendador}
                  onChange={(e) => update('tipoDocArrendador', e.target.value)}
                  options={tipoDocOptions}
                />
                <div className="col-span-2">
                  <InputField
                    label="Número de Documento"
                    value={data.numDocArrendador}
                    onChange={(e) => update('numDocArrendador', e.target.value)}
                    placeholder="Número"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Teléfono del Arrendador"
                  value={data.telefonoArrendador}
                  onChange={(e) => update('telefonoArrendador', e.target.value)}
                  placeholder="Ej: +57 300 123 4567"
                />
              </div>
            </div>
          </div>

          {/* Arrendatario */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-tight block">
              Datos del Arrendatario (Inquilino):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputField
                label="Nombre del Arrendatario"
                value={data.nombreArrendatario}
                onChange={(e) => update('nombreArrendatario', e.target.value)}
                placeholder="Nombre Completo"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <SelectField
                  label="Tipo Doc."
                  value={data.tipoDocArrendatario}
                  onChange={(e) => update('tipoDocArrendatario', e.target.value)}
                  options={tipoDocOptions}
                />
                <div className="col-span-2">
                  <InputField
                    label="Número de Documento"
                    value={data.numDocArrendatario}
                    onChange={(e) => update('numDocArrendatario', e.target.value)}
                    placeholder="Número"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Teléfono del Arrendatario"
                  value={data.telefonoArrendatario}
                  onChange={(e) => update('telefonoArrendatario', e.target.value)}
                  placeholder="Ej: +57 314 987 6543"
                />
              </div>
            </div>
          </div>

          {/* Switch Codeudor o Fiador Solidario */}
          <div className="p-3.5 bg-indigo-50/50 border border-indigo-200/80 rounded-xl space-y-3">
            <SwitchField
              label="¿Incluye Codeudor o Fiador Solidario?"
              description="Añade la cláusula de responsabilidad solidaria y la sección de firma del garante."
              checked={data.incluyeCodeudor}
              onChange={(checked) => update('incluyeCodeudor', checked)}
            />

            {data.incluyeCodeudor && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-indigo-100">
                <InputField
                  label="Nombre del Codeudor"
                  value={data.nombreCodeudor}
                  onChange={(e) => update('nombreCodeudor', e.target.value)}
                  placeholder="Nombre Completo"
                />
                <div className="grid grid-cols-3 gap-2">
                  <SelectField
                    label="Tipo Doc."
                    value={data.tipoDocCodeudor}
                    onChange={(e) => update('tipoDocCodeudor', e.target.value)}
                    options={tipoDocOptions}
                  />
                  <div className="col-span-2">
                    <InputField
                      label="Número de Documento"
                      value={data.numDocCodeudor}
                      onChange={(e) => update('numDocCodeudor', e.target.value)}
                      placeholder="Número"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    label="Teléfono del Codeudor"
                    value={data.telefonoCodeudor}
                    onChange={(e) => update('telefonoCodeudor', e.target.value)}
                    placeholder="Ej: +57 310 555 4321"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Inmueble Objeto */}
      <CollapsibleSection
        step="Paso 02"
        title="Inmueble y Ubicación"
        subtitle="Dirección y matrícula inmobiliaria"
        icon={<Home className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Dirección Completa del Inmueble"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej: Carrera 15 # 98-40, Apartamento 302"
              required
            />
          </div>

          <InputField
            label="Ciudad del Inmueble"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Bogotá D.C."
            required
          />

          <InputField
            label="Matrícula Inmobiliaria (Opcional)"
            value={data.matriculaInmobiliaria}
            onChange={(e) => update('matriculaInmobiliaria', e.target.value)}
            placeholder="Ej: 50C-123456"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Condiciones Económicas */}
      <CollapsibleSection
        step="Paso 03"
        title="Canon, Pagos y Duración"
        subtitle="Valor mensual, día límite de pago y vigencia"
        icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CurrencyField
            label="Canon Mensual ($)"
            value={data.canonMensual}
            onChange={(num) => update('canonMensual', num)}
            required
          />

          <CurrencyField
            label="Cuota de Administración ($) (0 si incluida)"
            value={data.cuotaAdministracion}
            onChange={(num) => update('cuotaAdministracion', num)}
          />

          <InputField
            label="Día Límite de Pago Mensual"
            type="number"
            min={1}
            max={31}
            value={data.diaLimitePago}
            onChange={(e) => update('diaLimitePago', parseInt(e.target.value, 10) || 5)}
            required
          />

          <InputField
            label="Duración del Contrato (Meses)"
            type="number"
            min={1}
            value={data.duracionMeses}
            onChange={(e) => update('duracionMeses', parseInt(e.target.value, 10) || 12)}
            required
          />

          <InputField
            label="Fecha de Inicio"
            type="date"
            value={data.fechaInicio}
            onChange={(e) => update('fechaInicio', e.target.value)}
            required
          />

          <InputField
            label="Fecha de Finalización"
            type="date"
            value={data.fechaFin}
            onChange={(e) => update('fechaFin', e.target.value)}
            required
          />

          <div className="sm:col-span-2">
            <CurrencyField
              label="Depósito o Garantía de Servicios ($) (Opcional)"
              value={data.montoDepositoGarantia}
              onChange={(num) => update('montoDepositoGarantia', num)}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Firma y Garante */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Arrendatario"
        subtitle="Dibuja tu firma digital en pantalla o usa pie notarial impreso"
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

