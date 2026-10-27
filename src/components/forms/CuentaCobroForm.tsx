import React from 'react';
import { CuentaCobroData } from '../../types/documents';
import { numeroALetras, formatearMoneda, calcularTotalesCuentaCobro } from '../../utils/numberToWords';
import { CollapsibleSection } from './CollapsibleSection';
import { DollarSign, Building, User, CreditCard, ShieldCheck } from 'lucide-react';

interface Props {
  data: CuentaCobroData;
  onChange: (updated: CuentaCobroData) => void;
}

export const CuentaCobroForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof CuentaCobroData>(key: K, val: CuentaCobroData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const { subtotal, reteFuente, reteICA, totalNeto } = calcularTotalesCuentaCobro(
    data.valorSubtotal || 0,
    data.aplicaReteFuente,
    data.porcentajeReteFuente,
    data.aplicaReteICA,
    data.porcentajeReteICA
  );

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos Generales de la Cuenta */}
      <CollapsibleSection
        title="Consecutivo y Fechas"
        subtitle="Número de documento, fecha de expedición y vencimiento"
        icon={<DollarSign className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              N° Consecutivo
            </label>
            <input
              type="text"
              value={data.numeroConsecutivo}
              onChange={(e) => update('numeroConsecutivo', e.target.value)}
              placeholder="Ej: CC-001"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Fecha de Emisión
            </label>
            <input
              type="date"
              value={data.fechaEmision}
              onChange={(e) => update('fechaEmision', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Ciudad de Expedición
            </label>
            <input
              type="text"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Tus Datos (Contratista) */}
      <CollapsibleSection
        title="Tus Datos (Contratista / Prestador)"
        subtitle="Información legal de quien expide la cuenta de cobro"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nombre Completo o Razón Social
            </label>
            <input
              type="text"
              value={data.nombreContratista}
              onChange={(e) => update('nombreContratista', e.target.value)}
              placeholder="Ej: Camila Andrea Ospina Morales"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo de Documento
            </label>
            <select
              value={data.tipoDocumentoContratista}
              onChange={(e) => update('tipoDocumentoContratista', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Cédula de Ciudadanía">Cédula de Ciudadanía (C.C.)</option>
              <option value="Cédula de Extranjería">Cédula de Extranjería (C.E.)</option>
              <option value="NIT">NIT</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Número de Identificación
            </label>
            <input
              type="text"
              value={data.numeroDocumentoContratista}
              onChange={(e) => update('numeroDocumentoContratista', e.target.value)}
              placeholder="Ej: 1.020.458.789"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Lugar de Expedición
            </label>
            <input
              type="text"
              value={data.expedicionContratista}
              onChange={(e) => update('expedicionContratista', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Teléfono de Contacto
            </label>
            <input
              type="text"
              value={data.telefonoContratista}
              onChange={(e) => update('telefonoContratista', e.target.value)}
              placeholder="Ej: +57 312 458 9621"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={data.correoContratista}
              onChange={(e) => update('correoContratista', e.target.value)}
              placeholder="Ej: micorreo@ejemplo.com"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Dirección de Domicilio
            </label>
            <input
              type="text"
              value={data.direccionContratista}
              onChange={(e) => update('direccionContratista', e.target.value)}
              placeholder="Ej: Calle 127 # 19-45"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Datos del Cliente / Empresa Pagadora */}
      <CollapsibleSection
        title="Datos del Cliente / Empresa Deudora"
        subtitle="Empresa o persona natural a favor de quien se cobra"
        icon={<Building className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Razón Social o Nombre del Cliente
            </label>
            <input
              type="text"
              value={data.nombreCliente}
              onChange={(e) => update('nombreCliente', e.target.value)}
              placeholder="Ej: EMPRESA TECNOLÓGICA S.A.S."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo y Número de Identificación
            </label>
            <div className="flex gap-2">
              <select
                value={data.tipoDocumentoCliente}
                onChange={(e) => update('tipoDocumentoCliente', e.target.value)}
                className="w-24 min-h-[44px] text-xs px-2.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="NIT">NIT</option>
                <option value="C.C.">C.C.</option>
                <option value="RUT">RUT</option>
              </select>
              <input
                type="text"
                value={data.numeroDocumentoCliente}
                onChange={(e) => update('numeroDocumentoCliente', e.target.value)}
                placeholder="Ej: 901.345.678-2"
                className="flex-1 min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Ciudad de la Empresa
            </label>
            <input
              type="text"
              value={data.ciudadCliente}
              onChange={(e) => update('ciudadCliente', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Dirección
            </label>
            <input
              type="text"
              value={data.direccionCliente}
              onChange={(e) => update('direccionCliente', e.target.value)}
              placeholder="Ej: Carrera 7 # 71-21"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Atención a / Representante
            </label>
            <input
              type="text"
              value={data.representanteCliente}
              onChange={(e) => update('representanteCliente', e.target.value)}
              placeholder="Ej: Departamento de Contabilidad"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Concepto y Liquidación (Cálculo automático) */}
      <CollapsibleSection
        title="Concepto, Subtotal y Retenciones"
        subtitle="Cálculo automático de Retención en la Fuente e ICA"
        icon={<DollarSign className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Descripción detallada del servicio o actividades
          </label>
          <textarea
            rows={3}
            value={data.concepto}
            onChange={(e) => update('concepto', e.target.value)}
            placeholder="Ej: Prestación de servicios profesionales de desarrollo web y consultoría en la nube..."
            className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Período de Prestación
            </label>
            <input
              type="text"
              value={data.periodoPrestacion}
              onChange={(e) => update('periodoPrestacion', e.target.value)}
              placeholder="Ej: 01 al 31 de Octubre de 2026"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              N° de Contrato u Orden
            </label>
            <input
              type="text"
              value={data.numeroContrato}
              onChange={(e) => update('numeroContrato', e.target.value)}
              placeholder="Ej: CTO-2026-088"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Valor Subtotal Honorarios ($)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={data.valorSubtotal || ''}
              onChange={(e) => update('valorSubtotal', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 4500000"
              className="w-full min-h-[48px] text-sm font-mono font-bold px-4 py-2.5 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-50/20"
            />
          </div>
        </div>

        {/* Retención en la fuente e ICA toggles */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Deducciones Tributarias Aplicables:
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white rounded-xl border border-slate-200">
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.aplicaReteFuente}
                onChange={(e) => update('aplicaReteFuente', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-800">
                Aplicar Retención en la Fuente
              </span>
            </label>
            {data.aplicaReteFuente && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Tarifa (%):</span>
                <select
                  value={data.porcentajeReteFuente}
                  onChange={(e) => update('porcentajeReteFuente', parseFloat(e.target.value) || 0)}
                  className="min-h-[40px] text-xs font-mono font-semibold px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value={4}>4% (Servicios generales)</option>
                  <option value={6}>6% (Servicios técnicos)</option>
                  <option value={10}>10% (Honorarios sin dec. renta)</option>
                  <option value={11}>11% (Honorarios con dec. renta)</option>
                </select>
                <span className="text-xs font-mono font-bold text-rose-700">
                  -{formatearMoneda(reteFuente)}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white rounded-xl border border-slate-200">
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.aplicaReteICA}
                onChange={(e) => update('aplicaReteICA', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-800">
                Aplicar Retención de ICA (ReteICA)
              </span>
            </label>
            {data.aplicaReteICA && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Tarifa (x1000):</span>
                <select
                  value={data.porcentajeReteICA}
                  onChange={(e) => update('porcentajeReteICA', parseFloat(e.target.value) || 0)}
                  className="min-h-[40px] text-xs font-mono font-semibold px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value={0.966}>9.66 x 1000 (Servicios profesionales)</option>
                  <option value={0.69}>6.9 x 1000 (Servicios comunes)</option>
                  <option value={0.414}>4.14 x 1000 (Comerciales)</option>
                </select>
                <span className="text-xs font-mono font-bold text-rose-700">
                  -{formatearMoneda(reteICA)}
                </span>
              </div>
            )}
          </div>

          {/* Liquidación Resumida */}
          <div className="mt-3 p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>Subtotal:</span>
              <span className="font-mono">{formatearMoneda(subtotal)}</span>
            </div>
            {(data.aplicaReteFuente || data.aplicaReteICA) && (
              <div className="flex justify-between text-rose-700">
                <span>Deducciones totales:</span>
                <span className="font-mono">-{formatearMoneda(reteFuente + reteICA)}</span>
              </div>
            )}
            <div className="flex justify-between text-blue-950 font-bold text-sm pt-1 border-t border-blue-200">
              <span>Total Neto a Recibir:</span>
              <span className="font-mono">{formatearMoneda(totalNeto)}</span>
            </div>
            <p className="text-[11px] text-slate-600 uppercase font-semibold mt-1">
              SON: {numeroALetras(totalNeto, data.moneda)}
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Datos Bancarios */}
      <CollapsibleSection
        title="Datos Bancarios para Transferencia"
        subtitle="Entidad bancaria, tipo de cuenta y titular"
        icon={<CreditCard className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Banco
            </label>
            <input
              type="text"
              value={data.banco}
              onChange={(e) => update('banco', e.target.value)}
              placeholder="Ej: Bancolombia / Davivienda / BBVA"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo de Cuenta
            </label>
            <select
              value={data.tipoCuenta}
              onChange={(e) => update('tipoCuenta', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Ahorros">Cuenta de Ahorros</option>
              <option value="Corriente">Cuenta Corriente</option>
              <option value="Digital / Nequi / Daviplata">Nequi / Daviplata</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Número de Cuenta
            </label>
            <input
              type="text"
              value={data.numeroCuenta}
              onChange={(e) => update('numeroCuenta', e.target.value)}
              placeholder="Ej: 458-921345-02"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Titular de la Cuenta
            </label>
            <input
              type="text"
              value={data.titularCuenta}
              onChange={(e) => update('titularCuenta', e.target.value)}
              placeholder="Dejar vacío si es el mismo contratista"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 6. Cláusulas y Declaraciones de Ley */}
      <CollapsibleSection
        title="Declaraciones Legales Obligatorias"
        subtitle="Seguridad social integral y régimen de IVA"
        icon={<ShieldCheck className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3 text-xs">
          <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={data.declaraSeguridadSocial}
              onChange={(e) => update('declaraSeguridadSocial', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <span className="text-slate-700 leading-relaxed">
              <strong>Declaración de Seguridad Social:</strong> Declaro bajo juramento haber realizado los aportes integrales al Sistema General de Seguridad Social (Salud, Pensión y ARL) de acuerdo con la normatividad vigente.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={data.declaraNoResponsableIVA}
              onChange={(e) => update('declaraNoResponsableIVA', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <span className="text-slate-700 leading-relaxed">
              <strong>No responsable de IVA:</strong> Manifestación de no ser responsable del impuesto sobre las ventas según el Art. 437 del Estatuto Tributario.
            </span>
          </label>
        </div>
      </CollapsibleSection>
    </div>
  );
};
