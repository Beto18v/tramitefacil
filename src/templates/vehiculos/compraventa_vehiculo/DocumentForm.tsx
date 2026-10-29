import React from 'react';
import { CompraventaVehiculoData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import {
  InputField,
  SelectField,
  CurrencyField,
  SwitchField,
} from '../../../components/ui';
import { SignaturePad } from '../../../components/SignaturePad';
import { PiCar, PiCurrencyDollar, PiFileDoc, PiUsers } from 'react-icons/pi';

export const DocumentForm: React.FC<DocumentFormProps<CompraventaVehiculoData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof CompraventaVehiculoData>(
    key: K,
    val: CompraventaVehiculoData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const tipoDocOptions = [
    { value: 'C.C.', label: 'Cédula de Ciudadanía (C.C.)' },
    { value: 'C.E.', label: 'Cédula de Extranjería (C.E.)' },
    { value: 'NIT', label: 'NIT' },
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  const claseVehiculoOptions = [
    { value: 'Automóvil', label: 'Automóvil / Sedán / Hatchback' },
    { value: 'Camioneta / SUV', label: 'Camioneta / SUV' },
    { value: 'Motocicleta', label: 'Motocicleta' },
    { value: 'Campero', label: 'Campero / 4x4' },
    { value: 'Furgón / Utilitario', label: 'Furgón / Utilitario' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos de las Partes */}
      <CollapsibleSection
        step="Paso 01"
        title="Vendedor y Comprador"
        subtitle="Identificación y contacto de las partes contratantes"
        icon={<PiUsers className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Vendedor */}
          <div className="p-3 bg-sky-50/50 border border-sky-100 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wide">
              Datos del Vendedor:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="sm:col-span-2">
                <InputField
                  label="Nombre Completo del Vendedor"
                  value={data.nombreVendedor}
                  onChange={(e) => update('nombreVendedor', e.target.value)}
                  placeholder="Ej: Carlos Eduardo Morales"
                  required
                />
              </div>

              <SelectField
                label="Tipo de Documento"
                value={data.tipoDocVendedor}
                options={tipoDocOptions}
                onChange={(e) => update('tipoDocVendedor', e.target.value)}
              />

              <InputField
                label="Número de Documento"
                value={data.numDocVendedor}
                onChange={(e) => update('numDocVendedor', e.target.value)}
                placeholder="Número de cédula o NIT"
                className="font-mono"
                required
              />

              <InputField
                label="Teléfono Móvil"
                value={data.telefonoVendedor}
                onChange={(e) => update('telefonoVendedor', e.target.value)}
                placeholder="Ej: 310 123 4567"
              />

              <InputField
                label="Dirección y Ciudad"
                value={data.direccionVendedor}
                onChange={(e) => update('direccionVendedor', e.target.value)}
                placeholder="Ej: Cra 15 # 85-30, Bogotá"
              />
            </div>
          </div>

          {/* Comprador */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
              Datos del Comprador:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="sm:col-span-2">
                <InputField
                  label="Nombre Completo del Comprador"
                  value={data.nombreComprador}
                  onChange={(e) => update('nombreComprador', e.target.value)}
                  placeholder="Ej: Andrés Felipe Gómez"
                  required
                />
              </div>

              <SelectField
                label="Tipo de Documento"
                value={data.tipoDocComprador}
                options={tipoDocOptions}
                onChange={(e) => update('tipoDocComprador', e.target.value)}
              />

              <InputField
                label="Número de Documento"
                value={data.numDocComprador}
                onChange={(e) => update('numDocComprador', e.target.value)}
                placeholder="Número de cédula o NIT"
                className="font-mono"
                required
              />

              <InputField
                label="Teléfono Móvil"
                value={data.telefonoComprador}
                onChange={(e) => update('telefonoComprador', e.target.value)}
                placeholder="Ej: 315 987 6543"
              />

              <InputField
                label="Dirección y Ciudad"
                value={data.direccionComprador}
                onChange={(e) => update('direccionComprador', e.target.value)}
                placeholder="Ej: Cll 100 # 19-61, Bogotá"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <InputField
              label="Ciudad del Contrato"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
            />
            <InputField
              label="Fecha del Contrato"
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Características del Automotor */}
      <CollapsibleSection
        step="Paso 02"
        title="Datos del Vehículo"
        subtitle="Placa, marca, modelo, motor, chasis y clase de automotor"
        icon={<PiCar className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <InputField
              label="Placa del Vehículo"
              value={data.placa}
              onChange={(e) => update('placa', e.target.value.toUpperCase())}
              placeholder="Ej: ABC123"
              className="font-mono font-bold uppercase tracking-widest"
              required
            />
          </div>

          <div>
            <SelectField
              label="Clase de Vehículo"
              value={data.claseVehiculo}
              options={claseVehiculoOptions}
              onChange={(e) => update('claseVehiculo', e.target.value)}
              required
            />
          </div>

          <div>
            <InputField
              label="Marca"
              value={data.marca}
              onChange={(e) => update('marca', e.target.value)}
              placeholder="Ej: Mazda / Chevrolet / Yamaha"
              required
            />
          </div>

          <div>
            <InputField
              label="Línea"
              value={data.linea}
              onChange={(e) => update('linea', e.target.value)}
              placeholder="Ej: 3 Touring / Onix / NMAX"
              required
            />
          </div>

          <div>
            <InputField
              label="Modelo (Año)"
              type="number"
              min="1980"
              max="2030"
              value={data.modeloAnio || 2020}
              onChange={(e) => update('modeloAnio', parseInt(e.target.value, 10) || 2020)}
              className="font-mono"
              required
            />
          </div>

          <div>
            <InputField
              label="Color"
              value={data.color}
              onChange={(e) => update('color', e.target.value)}
              placeholder="Ej: Gris Titanio / Blanco"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <InputField
              label="Número de Motor"
              value={data.numeroMotor}
              onChange={(e) => update('numeroMotor', e.target.value.toUpperCase())}
              placeholder="Ej: PE-1234567"
              className="font-mono"
            />
          </div>

          <div>
            <InputField
              label="Número de Chasis / VIN"
              value={data.numeroChasis}
              onChange={(e) => update('numeroChasis', e.target.value.toUpperCase())}
              placeholder="Ej: 3MZBN1234567890"
              className="font-mono"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Precio, Pago y Traspaso */}
      <CollapsibleSection
        step="Paso 03"
        title="Precio, Pago y Traspaso"
        subtitle="Valor convenido, división de gastos de traspaso e impuestos"
        icon={<PiCurrencyDollar className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <CurrencyField
                label="Precio de Venta ($ COP)"
                value={data.precioVenta || 0}
                onChange={(val) => update('precioVenta', val)}
                required
              />
            </div>

            <div>
              <InputField
                label="Gastos de Traspaso (Simit / RUNT / Derechos)"
                value={data.gastosTraspasoPorcentajes}
                onChange={(e) => update('gastosTraspasoPorcentajes', e.target.value)}
                placeholder="Ej: Por mitades iguales (50% vendedor, 50% comprador)"
              />
            </div>

            <div className="sm:col-span-2">
              <InputField
                label="Forma de Pago Convenida"
                value={data.formaPago}
                onChange={(e) => update('formaPago', e.target.value)}
                placeholder="Ej: Transferencia electrónica bancaria contra entrega del automotor"
              />
            </div>
          </div>

          <SwitchField
            label="Paz y Salvo Multas y Gravámenes"
            description="El vendedor garantiza entrega a paz y salvo total por multas SIMIT, embargos e impuestos departamentales"
            checked={data.pazYSalvoMultas}
            onChange={(checked) => update('pazYSalvoMultas', checked)}
          />
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Impresa */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Vendedor"
        subtitle="Dibuja tu firma en pantalla o imprímela con línea formal"
        icon={<PiFileDoc className="w-5 h-5 text-indigo-600" />}
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

