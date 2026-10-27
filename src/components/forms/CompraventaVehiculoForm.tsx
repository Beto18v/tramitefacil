import React from 'react';
import { CompraventaVehiculoData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { SignaturePad } from '../SignaturePad';
import { Car, Users, DollarSign, ShieldCheck, FileCheck } from 'lucide-react';

interface Props {
  data: CompraventaVehiculoData;
  onChange: (updated: CompraventaVehiculoData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const CompraventaVehiculoForm: React.FC<Props> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof CompraventaVehiculoData>(key: K, val: CompraventaVehiculoData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos de las Partes */}
      <CollapsibleSection
        step="Paso 01"
        title="Vendedor y Comprador"
        subtitle="Identificación y contacto de las partes contratantes"
        icon={<Users className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Vendedor */}
          <div className="p-3 bg-sky-50/50 border border-sky-100 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wide">
              Datos del Vendedor:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreVendedor}
                onChange={(e) => update('nombreVendedor', e.target.value)}
                placeholder="Nombre Completo del Vendedor"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocVendedor}
                  onChange={(e) => update('tipoDocVendedor', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="C.C.">C.C.</option>
                  <option value="C.E.">C.E.</option>
                  <option value="NIT">NIT</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                <input
                  type="text"
                  value={data.numDocVendedor}
                  onChange={(e) => update('numDocVendedor', e.target.value)}
                  placeholder="Número de cédula"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.telefonoVendedor}
                onChange={(e) => update('telefonoVendedor', e.target.value)}
                placeholder="Teléfono móvil"
                className="min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="text"
                value={data.direccionVendedor}
                onChange={(e) => update('direccionVendedor', e.target.value)}
                placeholder="Dirección y ciudad"
                className="min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Comprador */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
              Datos del Comprador:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={data.nombreComprador}
                onChange={(e) => update('nombreComprador', e.target.value)}
                placeholder="Nombre Completo del Comprador"
                className="w-full min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <div className="flex gap-2">
                <select
                  value={data.tipoDocComprador}
                  onChange={(e) => update('tipoDocComprador', e.target.value)}
                  className="w-24 min-h-[44px] text-xs px-2 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="C.C.">C.C.</option>
                  <option value="C.E.">C.E.</option>
                  <option value="NIT">NIT</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                <input
                  type="text"
                  value={data.numDocComprador}
                  onChange={(e) => update('numDocComprador', e.target.value)}
                  placeholder="Número de cédula"
                  className="flex-1 min-h-[44px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <input
                type="text"
                value={data.telefonoComprador}
                onChange={(e) => update('telefonoComprador', e.target.value)}
                placeholder="Teléfono móvil"
                className="min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
              <input
                type="text"
                value={data.direccionComprador}
                onChange={(e) => update('direccionComprador', e.target.value)}
                placeholder="Dirección y ciudad"
                className="min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Características del Automotor */}
      <CollapsibleSection
        step="Paso 02"
        title="Datos del Vehículo"
        subtitle="Placa, marca, modelo, motor, chasis y clase de automotor"
        icon={<Car className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Placa del Vehículo
            </label>
            <input
              type="text"
              value={data.placa}
              onChange={(e) => update('placa', e.target.value.toUpperCase())}
              placeholder="Ej: ABC123"
              className="w-full min-h-[44px] text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Clase de Vehículo
            </label>
            <select
              value={data.claseVehiculo}
              onChange={(e) => update('claseVehiculo', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 bg-white"
            >
              <option value="Automóvil">Automóvil / Sedán / Hatchback</option>
              <option value="Camioneta / SUV">Camioneta / SUV</option>
              <option value="Motocicleta">Motocicleta</option>
              <option value="Campero">Campero / 4x4</option>
              <option value="Furgón / Utilitario">Furgón / Utilitario</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Marca
            </label>
            <input
              type="text"
              value={data.marca}
              onChange={(e) => update('marca', e.target.value)}
              placeholder="Ej: Mazda / Chevrolet / Yamaha"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Línea
            </label>
            <input
              type="text"
              value={data.linea}
              onChange={(e) => update('linea', e.target.value)}
              placeholder="Ej: 3 Touring / Onix / NMAX"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Modelo (Año)
            </label>
            <input
              type="number"
              min="1980"
              max="2030"
              value={data.modeloAnio || 2020}
              onChange={(e) => update('modeloAnio', parseInt(e.target.value, 10) || 2020)}
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Color
            </label>
            <input
              type="text"
              value={data.color}
              onChange={(e) => update('color', e.target.value)}
              placeholder="Ej: Gris Titanio / Blanco"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Número de Motor
            </label>
            <input
              type="text"
              value={data.numeroMotor}
              onChange={(e) => update('numeroMotor', e.target.value.toUpperCase())}
              placeholder="Ej: PE-1234567"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Número de Chasis / VIN
            </label>
            <input
              type="text"
              value={data.numeroChasis}
              onChange={(e) => update('numeroChasis', e.target.value.toUpperCase())}
              placeholder="Ej: 3MZBN1234567890"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Precio, Pago y Traspaso */}
      <CollapsibleSection
        step="Paso 03"
        title="Precio, Pago y Traspaso"
        subtitle="Valor convenido, división de gastos de traspaso e impuestos"
        icon={<DollarSign className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Precio de Venta ($ COP)
              </label>
              <input
                type="number"
                min="0"
                step="500000"
                value={data.precioVenta || ''}
                onChange={(e) => update('precioVenta', parseFloat(e.target.value) || 0)}
                placeholder="Ej: 48000000"
                className="w-full min-h-[44px] text-xs font-mono font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Gastos de Traspaso (Simit / RUNT / Derechos)
              </label>
              <input
                type="text"
                value={data.gastosTraspasoPorcentajes}
                onChange={(e) => update('gastosTraspasoPorcentajes', e.target.value)}
                placeholder="Ej: Por mitades iguales (50% vendedor, 50% comprador)"
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Forma de Pago Convenida
              </label>
              <input
                type="text"
                value={data.formaPago}
                onChange={(e) => update('formaPago', e.target.value)}
                placeholder="Ej: Transferencia electrónica bancaria contra entrega del automotor y radicación de traspaso"
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px] p-3 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={data.pazYSalvoMultas}
              onChange={(e) => update('pazYSalvoMultas', e.target.checked)}
              className="w-4 h-4 text-sky-600 rounded border-slate-300"
            />
            <span className="text-xs text-slate-800">
              Vendedor garantiza entrega a paz y salvo total por multas SIMIT, embargos e impuestos departamentales
            </span>
          </label>
        </div>
      </CollapsibleSection>

      {/* 4. Firma Digital o Impresa */}
      <CollapsibleSection
        step="Paso 04"
        title="Firma del Vendedor"
        subtitle="Dibuja tu firma en pantalla o imprímela con línea formal"
        icon={<FileCheck className="w-5 h-5" />}
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
