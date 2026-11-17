import React from 'react';
import { ReciboPagoCanonData } from '../../../types/documents';
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
  Receipt,
  Home,
  User,
  DollarSign,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<ReciboPagoCanonData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof ReciboPagoCanonData>(
    key: K,
    val: ReciboPagoCanonData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const recalcularTotal = (cambios: Partial<ReciboPagoCanonData>) => {
    const proximo = { ...data, ...cambios };
    const canon = Number(proximo.valorCanon) || 0;
    const admin = proximo.incluyeAdministracion ? Number(proximo.valorAdministracion) || 0 : 0;
    const serv = proximo.incluyeServicios ? Number(proximo.valorServicios) || 0 : 0;
    const otros = Number(proximo.valorOtrosConceptos) || 0;
    const total = canon + admin + serv + otros;

    onChange({
      ...proximo,
      valorTotal: total,
      valorTotalLetras: numeroALetras(total),
    });
  };

  return (
    <div className="space-y-4">
      {/* 1. Datos Generales del Recibo */}
      <CollapsibleSection
        title="Datos del Recibo"
        icon={<Receipt className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="N° Consecutivo"
            value={data.numeroConsecutivo}
            onChange={(e) => update('numeroConsecutivo', e.target.value)}
            placeholder="Ej. REC-001"
          />
          <InputField
            label="Ciudad de pago"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Fecha del pago"
            type="date"
            value={data.fechaPago}
            onChange={(e) => update('fechaPago', e.target.value)}
          />
        </div>
      </CollapsibleSection>

      {/* 2. Inmueble y Período */}
      <CollapsibleSection
        title="Inmueble y Mes Pagado"
        icon={<Home className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Dirección del inmueble arrendado"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej. Calle 10 # 43E-20, Apto 703, Edificio El Poblado"
            />
          </div>
          <InputField
            label="Ciudad del inmueble"
            value={data.ciudadInmueble}
            onChange={(e) => update('ciudadInmueble', e.target.value)}
            placeholder="Ej. Medellín"
          />
          <InputField
            label="Mes o período que cancela"
            value={data.periodoMes}
            onChange={(e) => update('periodoMes', e.target.value)}
            placeholder="Ej. Noviembre de 2026"
            helperText="Indica con claridad el mes que queda a paz y salvo"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Partes */}
      <CollapsibleSection
        title="Partes (Arrendador y Arrendatario)"
        icon={<User className="w-5 h-5 text-emerald-600" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          {/* Arrendador (quien recibe) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Quien recibe el dinero (Arrendador o Administrador)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Nombre completo"
                value={data.nombreArrendador}
                onChange={(e) => update('nombreArrendador', e.target.value)}
                placeholder="Nombre de quien recibe"
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
                  ]}
                />
                <InputField
                  label="Número"
                  value={data.numDocArrendador}
                  onChange={(e) => update('numDocArrendador', e.target.value)}
                  placeholder="Número de doc."
                />
              </div>
              <InputField
                label="Teléfono de contacto (opcional)"
                value={data.telefonoArrendador || ''}
                onChange={(e) => update('telefonoArrendador', e.target.value)}
                placeholder="Ej. +57 300 123 4567"
              />
            </div>
          </div>

          {/* Arrendatario (quien paga) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Quien realiza el pago (Arrendatario / Inquilino)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Nombre del arrendatario"
                value={data.nombreArrendatario}
                onChange={(e) => update('nombreArrendatario', e.target.value)}
                placeholder="Nombre del inquilino"
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
                  ]}
                />
                <InputField
                  label="Número"
                  value={data.numDocArrendatario}
                  onChange={(e) => update('numDocArrendatario', e.target.value)}
                  placeholder="Número de doc."
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Valores y Liquidación */}
      <CollapsibleSection
        title="Valores y Liquidación"
        icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencyField
              label="Valor del canon mensual"
              value={data.valorCanon}
              onChange={(val) => recalcularTotal({ valorCanon: val })}
            />
          </div>

          {/* Administración opcional */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <SwitchField
              label="Incluye cuota de administración"
              checked={data.incluyeAdministracion}
              onChange={(checked) => recalcularTotal({ incluyeAdministracion: checked })}
              description="Activar si el arrendatario cancela también la cuota de administración."
            />
            {data.incluyeAdministracion && (
              <div className="pt-2">
                <CurrencyField
                  label="Valor cuota de administración"
                  value={data.valorAdministracion || 0}
                  onChange={(val) => recalcularTotal({ valorAdministracion: val })}
                />
              </div>
            )}
          </div>

          {/* Servicios públicos opcional */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <SwitchField
              label="Incluye cobro de servicios públicos"
              checked={data.incluyeServicios}
              onChange={(checked) => recalcularTotal({ incluyeServicios: checked })}
              description="Activar si se incluye reintegro de servicios públicos domiciliarios."
            />
            {data.incluyeServicios && (
              <div className="pt-2">
                <CurrencyField
                  label="Valor de servicios públicos"
                  value={data.valorServicios || 0}
                  onChange={(val) => recalcularTotal({ valorServicios: val })}
                />
              </div>
            )}
          </div>

          {/* Otros conceptos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Otros conceptos (opcional)"
              value={data.otrosConceptosDescripcion || ''}
              onChange={(e) => update('otrosConceptosDescripcion', e.target.value)}
              placeholder="Ej. Parqueadero adicional, depósito"
            />
            <CurrencyField
              label="Valor otros conceptos"
              value={data.valorOtrosConceptos || 0}
              onChange={(val) => recalcularTotal({ valorOtrosConceptos: val })}
            />
          </div>

          {/* Totales */}
          <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CurrencyField
                label="Total pagado"
                value={data.valorTotal}
                onChange={(val) => {
                  onChange({
                    ...data,
                    valorTotal: val,
                    valorTotalLetras: numeroALetras(val),
                  });
                }}
              />
              <InputField
                label="Total en letras"
                value={data.valorTotalLetras || numeroALetras(data.valorTotal)}
                onChange={(e) => update('valorTotalLetras', e.target.value)}
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Medio de Pago y Paz y Salvo */}
      <CollapsibleSection
        title="Medio de Pago y Paz y Salvo"
        icon={<CreditCard className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Forma de pago"
              value={data.formaPago}
              onChange={(e) =>
                update('formaPago', e.target.value as 'transferencia' | 'efectivo' | 'consignacion' | 'cheque')
              }
              options={[
                { value: 'transferencia', label: 'Transferencia Bancaria Electrónica' },
                { value: 'consignacion', label: 'Consignación en Corresponsal / Banco' },
                { value: 'efectivo', label: 'Efectivo contra entrega de recibo' },
                { value: 'cheque', label: 'Cheque' },
              ]}
            />
            <InputField
              label="Número de comprobante / Referencia (opcional)"
              value={data.referenciaPago || ''}
              onChange={(e) => update('referenciaPago', e.target.value)}
              placeholder="Ej. Comprobante N° 0049184 Bancolombia"
            />
          </div>

          <SwitchField
            label="Emitir constancia expresa de paz y salvo del período"
            checked={data.declaraPazYSalvo}
            onChange={(checked) => update('declaraPazYSalvo', checked)}
            description="Certifica formalmente que el arrendatario queda sin deudas pendientes por este mes (Art. 11 Ley 820 de 2003)."
          />

          <TextareaField
            label="Observaciones adicionales (opcional)"
            rows={2}
            value={data.observaciones || ''}
            onChange={(e) => update('observaciones', e.target.value)}
            placeholder="Anotaciones sobre lecturas de servicios, entrega de copia, etc."
          />
        </div>
      </CollapsibleSection>

      {/* 6. Firma */}
      <CollapsibleSection
        title="Firma de Quien Recibe"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Firma del arrendador o administrador como constancia de haber recibido a conformidad los dineros.
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
      </CollapsibleSection>
    </div>
  );
};
