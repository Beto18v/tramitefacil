import React from 'react';
import { CuentaCobroData, ConceptoItem } from '../../types/documents';
import {
  numeroALetras,
  formatearMoneda,
  calcularTotalesCuentaCobro,
  calcularSubtotalConceptos,
} from '../../utils/numberToWords';
import { CollapsibleSection } from './CollapsibleSection';
import { SignaturePad } from '../SignaturePad';
import {
  LuDollarSign,
  LuUser,
  LuBuilding,
  LuCreditCard,
  LuShieldCheck,
  LuPlus,
  LuTrash2,
  LuSparkles,
  LuToggleLeft,
  LuToggleRight,
} from 'react-icons/lu';

interface Props {
  data: CuentaCobroData;
  onChange: (updated: CuentaCobroData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const CuentaCobroForm: React.FC<Props> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof CuentaCobroData>(key: K, val: CuentaCobroData[K]) => {
    onChange({ ...data, [key]: val });
  };

  // Concepts array handling
  const conceptos = data.conceptos || [
    {
      id: 'item-1',
      descripcion: data.concepto || 'Honorarios profesionales por servicios prestados',
      cantidad: 1,
      valorUnitario: data.valorSubtotal || 0,
    },
  ];

  const handleAddConcepto = () => {
    const newItem: ConceptoItem = {
      id: `item-${Date.now()}`,
      descripcion: '',
      cantidad: 1,
      valorUnitario: 0,
    };
    const updatedConceptos = [...conceptos, newItem];
    const newSubtotal = calcularSubtotalConceptos(updatedConceptos);
    onChange({
      ...data,
      conceptos: updatedConceptos,
      usarConceptosMultiples: true,
      valorSubtotal: newSubtotal,
    });
  };

  const handleUpdateConcepto = (index: number, field: keyof ConceptoItem, value: any) => {
    const updated = [...conceptos];
    updated[index] = { ...updated[index], [field]: value };
    const newSubtotal = calcularSubtotalConceptos(updated);
    onChange({
      ...data,
      conceptos: updated,
      valorSubtotal: newSubtotal,
    });
  };

  const handleRemoveConcepto = (index: number) => {
    if (conceptos.length <= 1) return;
    const updated = conceptos.filter((_, i) => i !== index);
    const newSubtotal = calcularSubtotalConceptos(updated);
    onChange({
      ...data,
      conceptos: updated,
      valorSubtotal: newSubtotal,
    });
  };

  // Quick picker templates for concepts
  const quickConceptTemplates = [
    {
      label: 'Desarrollo de Software',
      text: 'Desarrollo de módulos web en React, arquitectura cloud serverless y pruebas unitarias de software.',
      suggestedPrice: 3500000,
    },
    {
      label: 'Diseño UI/UX & Branding',
      text: 'Diseño de interfaz de usuario en Figma, sistema de diseño, prototipado interactivo y manual de identidad.',
      suggestedPrice: 2200000,
    },
    {
      label: 'Asesoría Contable & Tributaria',
      text: 'Cierre contable mensual, liquidación de nómina, elaboración de declaraciones tributarias y conciliaciones bancarias.',
      suggestedPrice: 1800000,
    },
    {
      label: 'Marketing Digital & Pauta',
      text: 'Planificación de campañas de tráfico pago, optimización de conversiones, analítica web y reporte de rendimiento.',
      suggestedPrice: 1600000,
    },
  ];

  const applyQuickConcept = (templateText: string, suggestedPrice: number) => {
    if (data.usarConceptosMultiples) {
      handleAddConcepto();
      const lastIndex = conceptos.length;
      handleUpdateConcepto(lastIndex, 'descripcion', templateText);
      handleUpdateConcepto(lastIndex, 'valorUnitario', suggestedPrice);
    } else {
      onChange({
        ...data,
        concepto: templateText,
        valorSubtotal: suggestedPrice,
      });
    }
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
        step="Paso 01"
        title="Consecutivo y Fechas"
        subtitle="Número de documento, fecha de expedición y vencimiento"
        icon={<LuDollarSign className="w-5 h-5" />}
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
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Tus Datos (Contratista) */}
      <CollapsibleSection
        step="Paso 02"
        title="Tus Datos (Contratista / Emisor)"
        subtitle="Información legal de quien expide la cuenta de cobro"
        icon={<LuUser className="w-5 h-5" />}
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo de Documento
            </label>
            <select
              value={data.tipoDocumentoContratista}
              onChange={(e) => update('tipoDocumentoContratista', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
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
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Cliente / Pagador */}
      <CollapsibleSection
        step="Paso 03"
        title="Datos del Cliente (Receptor / Empresa)"
        subtitle="Empresa o persona que debe pagar la cuenta"
        icon={<LuBuilding className="w-5 h-5" />}
        defaultOpen={true}
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
              placeholder="Ej: INVERSIONES TECNOLÓGICAS ANDINAS S.A.S."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo de Documento
            </label>
            <select
              value={data.tipoDocumentoCliente}
              onChange={(e) => update('tipoDocumentoCliente', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="NIT">NIT</option>
              <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
              <option value="Cédula de Extranjería">Cédula de Extranjería</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Número de NIT / Cédula
            </label>
            <input
              type="text"
              value={data.numeroDocumentoCliente}
              onChange={(e) => update('numeroDocumentoCliente', e.target.value)}
              placeholder="Ej: 901.345.678-2"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Conceptos y Liquidación (Motor Dinámico) */}
      <CollapsibleSection
        step="Paso 04"
        title="Conceptos, Desglose y Liquidación"
        subtitle="Agrega múltiples líneas con cálculo automático y retenciones"
        icon={<LuDollarSign className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Quick Picker Buttons */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <LuSparkles className="w-4 h-4 text-blue-600" />
              <span>Asistente de Textos Preconfigurados (1 toque):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickConceptTemplates.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => applyQuickConcept(t.text, t.suggestedPrice)}
                  className="min-h-[38px] px-3 py-1.5 text-xs font-medium bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
                >
                  + {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Switch: Multilínea vs Concepto Único */}
          <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Desglose Multilínea de Conceptos
              </span>
              <span className="text-[11px] text-slate-500 block">
                Agrega varios ítems con cantidad y valor unitario para calcular la suma exacta.
              </span>
            </div>
            <button
              type="button"
              onClick={() => update('usarConceptosMultiples', !data.usarConceptosMultiples)}
              className="min-h-[44px] flex items-center gap-2 text-blue-600 font-semibold text-xs cursor-pointer"
            >
              {data.usarConceptosMultiples ? (
                <>
                  <LuToggleRight className="w-7 h-7 text-blue-600" />
                  <span>Activado</span>
                </>
              ) : (
                <>
                  <LuToggleLeft className="w-7 h-7 text-slate-400" />
                  <span className="text-slate-600">Desactivado</span>
                </>
              )}
            </button>
          </div>

          {/* DYNAMIC LINE ITEMS TABLE */}
          {data.usarConceptosMultiples ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  Líneas de Servicios / Conceptos:
                </label>
                <button
                  type="button"
                  onClick={handleAddConcepto}
                  className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition cursor-pointer border border-blue-200/80"
                >
                  <LuPlus className="w-3.5 h-3.5" />
                  <span>+ Agregar concepto</span>
                </button>
              </div>

              {conceptos.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 font-mono text-xs flex items-center justify-center shrink-0 mt-1 font-bold">
                      {idx + 1}
                    </span>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={item.descripcion}
                        onChange={(e) => handleUpdateConcepto(idx, 'descripcion', e.target.value)}
                        placeholder={`Descripción del concepto o entregable ${idx + 1}...`}
                        className="w-full min-h-[42px] text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Cantidad</label>
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => handleUpdateConcepto(idx, 'cantidad', parseFloat(e.target.value) || 1)}
                            className="w-full min-h-[40px] text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Valor Unitario ($)</label>
                          <input
                            type="number"
                            min="0"
                            step="1000"
                            value={item.valorUnitario}
                            onChange={(e) => handleUpdateConcepto(idx, 'valorUnitario', parseFloat(e.target.value) || 0)}
                            className="w-full min-h-[40px] text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Total Ítem</label>
                          <div className="min-h-[40px] px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-semibold text-slate-800 flex items-center">
                            {formatearMoneda((item.cantidad || 0) * (item.valorUnitario || 0))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {conceptos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveConcepto(idx)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Eliminar este concepto"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Concepto General de Cobro
              </label>
              <textarea
                rows={3}
                value={data.concepto}
                onChange={(e) => update('concepto', e.target.value)}
                placeholder="Indique detalladamente el objeto de los honorarios o servicios..."
                className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
              />
            </div>
          )}

          {/* Subtotal input (manual if not multilínea) */}
          {!data.usarConceptosMultiples && (
            <div>
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
                className="w-full min-h-[48px] text-sm font-mono font-bold px-4 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-indigo-50/20"
              />
            </div>
          )}

          {/* Retenciones */}
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
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300"
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
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300"
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

            {/* Total Neto */}
            <div className="mt-3 p-3.5 bg-indigo-50/70 border border-indigo-200/80 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal honorarios:</span>
                <span className="font-mono font-bold">{formatearMoneda(subtotal)}</span>
              </div>
              {(data.aplicaReteFuente || data.aplicaReteICA) && (
                <div className="flex justify-between text-rose-700">
                  <span>Deducciones aplicadas:</span>
                  <span className="font-mono">-{formatearMoneda(reteFuente + reteICA)}</span>
                </div>
              )}
              <div className="flex justify-between text-indigo-950 font-bold text-sm pt-1 border-t border-indigo-200">
                <span>Total Neto a Pagar:</span>
                <span className="font-mono">{formatearMoneda(totalNeto)}</span>
              </div>
              <p className="text-[11px] text-slate-600 uppercase font-semibold mt-1">
                SON: {numeroALetras(totalNeto, data.moneda)}
              </p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Datos Bancarios con Switch Opcional */}
      <CollapsibleSection
        step="Paso 05"
        title="Instrucciones Bancarias de Pago"
        subtitle="Entidad bancaria, tipo de cuenta y consignación"
        icon={<LuCreditCard className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px] p-3 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={data.incluirDatosBancarios}
              onChange={(e) => update('incluirDatosBancarios', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300"
            />
            <span className="text-xs font-semibold text-slate-800">
              ¿Incluir cuenta bancaria para consignación / transferencia?
            </span>
          </label>

          {data.incluirDatosBancarios && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Banco</label>
                <input
                  type="text"
                  value={data.banco}
                  onChange={(e) => update('banco', e.target.value)}
                  placeholder="Ej: Bancolombia / Davivienda / BBVA"
                  className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tipo de Cuenta</label>
                <select
                  value={data.tipoCuenta}
                  onChange={(e) => update('tipoCuenta', e.target.value)}
                  className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                >
                  <option value="Ahorros">Cuenta de Ahorros</option>
                  <option value="Corriente">Cuenta Corriente</option>
                  <option value="Digital / Nequi / Daviplata">Nequi / Daviplata</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Número de Cuenta</label>
                <input
                  type="text"
                  value={data.numeroCuenta}
                  onChange={(e) => update('numeroCuenta', e.target.value)}
                  placeholder="Ej: 458-921345-02"
                  className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Titular de la Cuenta</label>
                <input
                  type="text"
                  value={data.titularCuenta}
                  onChange={(e) => update('titularCuenta', e.target.value)}
                  placeholder="Dejar vacío si es el mismo contratista"
                  className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* 6. Firma y Pie de Página Profesional */}
      <CollapsibleSection
        step="Paso 06"
        title="Firma y Pie de Página Profesional"
        subtitle="Elige entre pie notarial formal o dibujar tu firma digital manuscrita"
        icon={<LuUser className="w-5 h-5" />}
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
