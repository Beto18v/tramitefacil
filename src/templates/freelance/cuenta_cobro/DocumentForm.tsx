import React from 'react';
import { CuentaCobroData, ConceptoItem } from '../../../types/documents';
import {
  InputField,
  SelectField,
  CurrencyField,
  TextareaField,
  SwitchField,
} from '../../../components/ui';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { SignaturePad } from '../../../components/SignaturePad';
import { DollarSign, User, Building2, CreditCard, ShieldCheck, Plus, Trash2, Sparkles } from 'lucide-react';
import { calcularSubtotalConceptos } from './calculations';
import { quickConceptTemplates } from './schema';

export interface CuentaCobroFormProps {
  data: CuentaCobroData;
  onChange: (updated: CuentaCobroData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const DocumentForm: React.FC<CuentaCobroFormProps> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof CuentaCobroData>(key: K, val: CuentaCobroData[K]) => {
    onChange({ ...data, [key]: val });
  };

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

  const handleUpdateConcepto = <K extends keyof ConceptoItem>(
    index: number,
    field: K,
    value: ConceptoItem[K]
  ) => {
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

  return (
    <div className="space-y-4">
      {/* 1. Datos Generales de Emisión */}
      <CollapsibleSection
        title="1. Emisión y Numeración"
        icon={<DollarSign className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <InputField
            label="Número Consecutivo"
            value={data.numeroConsecutivo}
            onChange={(e) => update('numeroConsecutivo', e.target.value)}
            placeholder="Ej: 001"
            required
          />
          <InputField
            label="Fecha de Emisión"
            type="date"
            value={data.fechaEmision}
            onChange={(e) => update('fechaEmision', e.target.value)}
            required
          />
          <InputField
            label="Ciudad de Expedición"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Bogotá D.C."
            required
          />
        </div>
      </CollapsibleSection>

      {/* 2. Datos del Contratista (Emisor) */}
      <CollapsibleSection
        title="2. Tus Datos (Contratista / Emisor)"
        icon={<User className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            label="Nombre Completo o Razón Social"
            value={data.nombreContratista}
            onChange={(e) => update('nombreContratista', e.target.value)}
            placeholder="Ej: Juan Pérez Morales"
            required
            containerClassName="sm:col-span-2"
          />
          <SelectField
            label="Tipo de Documento"
            value={data.tipoDocumentoContratista}
            onChange={(e) => update('tipoDocumentoContratista', e.target.value)}
            options={[
              'Cédula de Ciudadanía',
              'NIT',
              'Cédula de Extranjería',
              'Pasaporte',
              'Permiso por Protección Temporal (PPT)',
            ]}
          />
          <InputField
            label="Número de Documento"
            value={data.numeroDocumentoContratista}
            onChange={(e) => update('numeroDocumentoContratista', e.target.value)}
            placeholder="Ej: 1.020.304.050"
            required
          />
          <InputField
            label="Lugar de Expedición"
            value={data.expedicionContratista}
            onChange={(e) => update('expedicionContratista', e.target.value)}
            placeholder="Ej: Bogotá D.C."
          />
          <InputField
            label="Teléfono de Contacto"
            value={data.telefonoContratista}
            onChange={(e) => update('telefonoContratista', e.target.value)}
            placeholder="Ej: 310 123 4567"
          />
          <InputField
            label="Correo Electrónico"
            type="email"
            value={data.correoContratista}
            onChange={(e) => update('correoContratista', e.target.value)}
            placeholder="Ej: contratista@correo.com"
          />
          <InputField
            label="Dirección de Domicilio"
            value={data.direccionContratista}
            onChange={(e) => update('direccionContratista', e.target.value)}
            placeholder="Ej: Calle 100 # 15-20"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Datos del Cliente / Empresa Pagadora */}
      <CollapsibleSection
        title="3. Datos del Cliente o Empresa"
        icon={<Building2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            label="Nombre o Razón Social del Cliente"
            value={data.nombreCliente}
            onChange={(e) => update('nombreCliente', e.target.value)}
            placeholder="Ej: Empresa de Servicios S.A.S."
            required
            containerClassName="sm:col-span-2"
          />
          <SelectField
            label="Tipo de Documento Cliente"
            value={data.tipoDocumentoCliente}
            onChange={(e) => update('tipoDocumentoCliente', e.target.value)}
            options={['NIT', 'Cédula de Ciudadanía', 'Cédula de Extranjería']}
          />
          <InputField
            label="Número de NIT o Documento"
            value={data.numeroDocumentoCliente}
            onChange={(e) => update('numeroDocumentoCliente', e.target.value)}
            placeholder="Ej: 900.123.456-7"
            required
          />
          <InputField
            label="Dirección del Cliente"
            value={data.direccionCliente}
            onChange={(e) => update('direccionCliente', e.target.value)}
            placeholder="Ej: Carrera 7 # 72-10"
          />
          <InputField
            label="Ciudad del Cliente"
            value={data.ciudadCliente}
            onChange={(e) => update('ciudadCliente', e.target.value)}
            placeholder="Ej: Bogotá D.C."
          />
          <InputField
            label="Atención a / Representante"
            value={data.representanteCliente}
            onChange={(e) => update('representanteCliente', e.target.value)}
            placeholder="Ej: Dpto. de Gestión Humana / Contabilidad"
            containerClassName="sm:col-span-2"
          />
        </div>
      </CollapsibleSection>

      {/* 4. Conceptos y Liquidación Económica */}
      <CollapsibleSection
        title="4. Servicios y Liquidación de Honorarios"
        icon={<DollarSign className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
        defaultOpen={true}
      >
        {/* Plantillas rápidas sugeridas */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl mb-4">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Sugerencias Rápidas de Concepto:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickConceptTemplates.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applyQuickConcept(tpl.text, tpl.suggestedPrice)}
                className="text-[11px] font-medium px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                + {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selector Concepto único vs multilínea */}
        <div className="mb-4">
          <SwitchField
            label="Modo de Conceptos Detallados Multilínea"
            description="Activa esta opción para desglosar varios ítems con cantidad y valor unitario."
            checked={Boolean(data.usarConceptosMultiples)}
            onChange={(checked) => update('usarConceptosMultiples', checked)}
          />
        </div>

        {data.usarConceptosMultiples ? (
          <div className="space-y-3">
            {conceptos.map((item, index) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                    Ítem #{index + 1}
                  </span>
                  {conceptos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveConcepto(index)}
                      className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 p-1 rounded-md text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  )}
                </div>

                <InputField
                  label="Descripción del Ítem"
                  value={item.descripcion}
                  onChange={(e) =>
                    handleUpdateConcepto(index, 'descripcion', e.target.value)
                  }
                  placeholder="Ej: Honorarios mes de octubre por desarrollo de software"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField
                    label="Cantidad"
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) =>
                      handleUpdateConcepto(
                        index,
                        'cantidad',
                        parseInt(e.target.value, 10) || 1
                      )
                    }
                  />
                  <CurrencyField
                    label="Valor Unitario (COP)"
                    value={item.valorUnitario}
                    onChange={(val) =>
                      handleUpdateConcepto(index, 'valorUnitario', val)
                    }
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddConcepto}
              className="w-full py-2.5 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Otro Concepto o Servicio</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <TextareaField
              label="Concepto de Cobro"
              value={data.concepto}
              onChange={(e) => update('concepto', e.target.value)}
              placeholder="Ej: Prestación de servicios profesionales de desarrollo web y consultoría técnica..."
              rows={3}
              required
            />
            <CurrencyField
              label="Valor Subtotal Honorarios (COP)"
              value={data.valorSubtotal}
              onChange={(val) => update('valorSubtotal', val)}
              required
            />
          </div>
        )}

        {/* Retenciones Tributarias */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Deducciones y Retenciones Tributarias Aplicables:
          </p>

          <div className="space-y-2">
            <SwitchField
              label="Aplicar Retención en la Fuente"
              description="Aplica porcentaje de retención (típicamente 10% u 11% para honorarios profesionales)."
              checked={data.aplicaReteFuente}
              onChange={(checked) => update('aplicaReteFuente', checked)}
            />
            {data.aplicaReteFuente && (
              <div className="pl-4">
                <InputField
                  label="Porcentaje de Retención en la Fuente (%)"
                  type="number"
                  step="0.1"
                  value={data.porcentajeReteFuente}
                  onChange={(e) =>
                    update('porcentajeReteFuente', parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            )}

            <SwitchField
              label="Aplicar Retención de ICA (ReteICA)"
              description="Retención municipal de Industria y Comercio (ej: 0.966% en Bogotá)."
              checked={data.aplicaReteICA}
              onChange={(checked) => update('aplicaReteICA', checked)}
            />
            {data.aplicaReteICA && (
              <div className="pl-4">
                <InputField
                  label="Porcentaje de ReteICA (%)"
                  type="number"
                  step="0.001"
                  value={data.porcentajeReteICA}
                  onChange={(e) =>
                    update('porcentajeReteICA', parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Datos Bancarios */}
      <CollapsibleSection
        title="5. Datos Bancarios para Transferencia"
        icon={<CreditCard className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            label="Entidad Bancaria"
            value={data.banco}
            onChange={(e) => update('banco', e.target.value)}
            placeholder="Ej: Bancolombia / Davivienda / Nequi"
          />
          <SelectField
            label="Tipo de Cuenta"
            value={data.tipoCuenta}
            onChange={(e) => update('tipoCuenta', e.target.value as CuentaCobroData['tipoCuenta'])}
            options={['Ahorros', 'Corriente', 'Depósito Electrónico (Nequi/Daviplata)']}
          />
          <InputField
            label="Número de Cuenta"
            value={data.numeroCuenta}
            onChange={(e) => update('numeroCuenta', e.target.value)}
            placeholder="Ej: 123-456789-01"
          />
          <InputField
            label="Titular de la Cuenta"
            value={data.titularCuenta}
            onChange={(e) => update('titularCuenta', e.target.value)}
            placeholder="Ej: Nombre del contratista"
          />
        </div>
      </CollapsibleSection>

      {/* 6. Declaraciones Legales y Firma */}
      <CollapsibleSection
        title="6. Declaraciones Juramentadas y Firma"
        icon={<ShieldCheck className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
        defaultOpen={true}
      >
        <div className="space-y-2 mb-4">
          <SwitchField
            label="Declaración de Pago de Seguridad Social (Salud, Pensión, ARL)"
            description="Manifiesta haber realizado los aportes conforme al Art. 244 de la Ley 1955 de 2019."
            checked={data.declaraSeguridadSocial}
            onChange={(checked) => update('declaraSeguridadSocial', checked)}
          />
          <SwitchField
            label="Declaración de Régimen de No Responsable de IVA"
            description="Declara pertenecer al régimen de no responsables del IVA (Art. 437 del E.T.)."
            checked={data.declaraNoResponsableIVA}
            onChange={(checked) => update('declaraNoResponsableIVA', checked)}
          />
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Rúbrica o Firma del Contratista Emisor:
          </p>
          <SignaturePad
            signatureType={data.signatureType || 'text'}
            signatureDataUrl={data.signatureDataUrl}
            onSignatureChange={(sigType, dataUrl) => {
              onChange({
                ...data,
                signatureType: sigType,
                signatureDataUrl: dataUrl,
              });
            }}
            onSaveToProfile={onSaveSignatureToProfile}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

