import React from 'react';
import { PazYSalvoData } from '../../../types/documents';
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
  ClipboardCheck,
  Building2,
  User,
  Receipt,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<PazYSalvoData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof PazYSalvoData>(key: K, val: PazYSalvoData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleMontoChange = (valor: number) => {
    onChange({
      ...data,
      montoTotalSaldado: valor,
      montoLetras: valor > 0 ? numeroALetras(valor) : '',
    });
  };

  return (
    <div className="space-y-4">
      {/* 1. Datos Generales del Certificado */}
      <CollapsibleSection
        title="Datos del Certificado"
        icon={<ClipboardCheck className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Número del Certificado"
            value={data.numeroCertificado}
            onChange={(e) => update('numeroCertificado', e.target.value)}
            placeholder="Ej. PYS-001"
          />
          <InputField
            label="Ciudad de expedición"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Fecha de expedición"
            type="date"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
          />
        </div>
      </CollapsibleSection>

      {/* 2. Emisor (Quién emite el Paz y Salvo) */}
      <CollapsibleSection
        title="Quién emite el Paz y Salvo"
        icon={<Building2 className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Nombre de la empresa o persona que certifica"
              value={data.nombreEmisor}
              onChange={(e) => update('nombreEmisor', e.target.value)}
              placeholder="Ej. Soluciones Digitales S.A.S. o Juan Pérez"
            />
          </div>
          <SelectField
            label="Calidad en la relación"
            value={data.calidadEmisor}
            onChange={(e) =>
              update('calidadEmisor', e.target.value as PazYSalvoData['calidadEmisor'])
            }
            options={[
              { value: 'empresa', label: 'Empresa / Entidad' },
              { value: 'contratante', label: 'Contratante' },
              { value: 'acreedor', label: 'Acreedor' },
              { value: 'prestador_servicios', label: 'Prestador de Servicios' },
              { value: 'arrendador', label: 'Arrendador' },
              { value: 'otro', label: 'Otro' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <SelectField
            label="Tipo de documento"
            value={data.tipoDocEmisor}
            onChange={(e) => update('tipoDocEmisor', e.target.value)}
            options={[
              { value: 'NIT', label: 'NIT' },
              { value: 'C.C.', label: 'Cédula de Ciudadanía' },
              { value: 'C.E.', label: 'Cédula de Extranjería' },
              { value: 'Pasaporte', label: 'Pasaporte' },
            ]}
          />
          <InputField
            label="Número de documento / NIT"
            value={data.numDocEmisor}
            onChange={(e) => update('numDocEmisor', e.target.value)}
            placeholder="Ej. 901.834.120-5"
          />
          <InputField
            label="Cargo o representación (opcional)"
            value={data.cargoEmisor || ''}
            onChange={(e) => update('cargoEmisor', e.target.value)}
            placeholder="Ej. Representante Legal o Gerente"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <InputField
            label="Dirección (opcional)"
            value={data.direccionEmisor || ''}
            onChange={(e) => update('direccionEmisor', e.target.value)}
            placeholder="Ej. Carrera 7 # 71-21"
          />
          <InputField
            label="Teléfono de contacto (opcional)"
            value={data.telefonoEmisor || ''}
            onChange={(e) => update('telefonoEmisor', e.target.value)}
            placeholder="Ej. (601) 745 8920"
          />
          <InputField
            label="Correo electrónico (opcional)"
            type="email"
            value={data.correoEmisor || ''}
            onChange={(e) => update('correoEmisor', e.target.value)}
            placeholder="Ej. contacto@empresa.co"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Beneficiario (A favor de quién se expide) */}
      <CollapsibleSection
        title="Beneficiario (Quién queda a Paz y Salvo)"
        icon={<User className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre completo o Razón Social"
            value={data.nombreBeneficiario}
            onChange={(e) => update('nombreBeneficiario', e.target.value)}
            placeholder="Ej. Andrés Felipe Salazar Ramírez"
          />
          <InputField
            label="Calidad o rol del beneficiario (opcional)"
            value={data.calidadBeneficiario || ''}
            onChange={(e) => update('calidadBeneficiario', e.target.value)}
            placeholder="Ej. Contratista Independiente / Cliente / Deudor"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SelectField
            label="Tipo de documento"
            value={data.tipoDocBeneficiario}
            onChange={(e) => update('tipoDocBeneficiario', e.target.value)}
            options={[
              { value: 'C.C.', label: 'Cédula de Ciudadanía' },
              { value: 'NIT', label: 'NIT' },
              { value: 'C.E.', label: 'Cédula de Extranjería' },
              { value: 'Pasaporte', label: 'Pasaporte' },
            ]}
          />
          <InputField
            label="Número de documento / NIT"
            value={data.numDocBeneficiario}
            onChange={(e) => update('numDocBeneficiario', e.target.value)}
            placeholder="Ej. 1.020.765.432"
          />
        </div>
      </CollapsibleSection>

      {/* 4. Concepto u Obligación */}
      <CollapsibleSection
        title="Concepto u Obligación Cumplida"
        icon={<Receipt className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Tipo de vínculo o relación"
            value={data.tipoConcepto}
            onChange={(e) =>
              update('tipoConcepto', e.target.value as PazYSalvoData['tipoConcepto'])
            }
            options={[
              { value: 'contrato_servicios', label: 'Contrato de Prestación de Servicios' },
              { value: 'obligacion_comercial', label: 'Obligación Comercial / Pago de Deuda' },
              { value: 'entrega_inventario', label: 'Entrega de Inventario o Bienes' },
              { value: 'liquidacion_cuotas', label: 'Liquidación de Cuotas o Crédito' },
              { value: 'arrendamiento', label: 'Contrato de Arrendamiento' },
              { value: 'acuerdo_privado', label: 'Acuerdo Privado o Transacción' },
              { value: 'otro', label: 'Otro concepto personalizado' },
            ]}
          />
          {data.tipoConcepto === 'otro' && (
            <InputField
              label="Especifique el concepto"
              value={data.conceptoPersonalizado || ''}
              onChange={(e) => update('conceptoPersonalizado', e.target.value)}
              placeholder="Ej. Liquidación final de sociedad de hecho"
            />
          )}
          <InputField
            label="Número o código de referencia"
            value={data.referenciaContrato || ''}
            onChange={(e) => update('referenciaContrato', e.target.value)}
            placeholder="Ej. Contrato N° CS-2025-089 o Factura F-551"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputField
            label="Fecha del acuerdo original (opcional)"
            type="date"
            value={data.fechaAcuerdoOriginal || ''}
            onChange={(e) => update('fechaAcuerdoOriginal', e.target.value)}
          />
          <CurrencyField
            label="Valor total cancelado (opcional, $0 si no aplica dinero)"
            value={data.montoTotalSaldado || 0}
            onChange={handleMontoChange}
          />
        </div>

        <div className="mt-4">
          <TextareaField
            label="Detalle del cumplimiento o satisfacción"
            rows={2}
            value={data.detalleCumplimiento}
            onChange={(e) => update('detalleCumplimiento', e.target.value)}
            placeholder="Describa brevemente cómo se cumplió la obligación o la entrega de bienes..."
          />
        </div>
      </CollapsibleSection>

      {/* 5. Declaración Formal y Renuncia */}
      <CollapsibleSection
        title="Declaración Formal de Paz y Salvo"
        icon={<FileCheck className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <TextareaField
            label="Texto formal de la declaración"
            rows={3}
            value={data.declaracionTexto}
            onChange={(e) => update('declaracionTexto', e.target.value)}
            placeholder="Manifestación formal de paz y salvo..."
          />

          <SwitchField
            label="Incluir renuncia expresa a acciones legales posteriores"
            checked={data.renunciaAcciones}
            onChange={(checked) => update('renunciaAcciones', checked)}
            description="Certifica la extinción formal de acciones judiciales o extrajudiciales conforme al Art. 1625 del Código Civil."
          />

          <SwitchField
            label="Agregar nota aclaratoria u observación especial"
            checked={Boolean(data.incluyeNotaAclaratoria)}
            onChange={(checked) => update('incluyeNotaAclaratoria', checked)}
          />

          {data.incluyeNotaAclaratoria && (
            <TextareaField
              label="Nota aclaratoria u observación"
              rows={2}
              value={data.notaAclaratoria || ''}
              onChange={(e) => update('notaAclaratoria', e.target.value)}
              placeholder="Ej. Este documento no exime de responsabilidades fiscales ante la DIAN..."
            />
          )}
        </div>
      </CollapsibleSection>

      {/* 6. Firma */}
      <CollapsibleSection
        title="Firma de Quien Certifica"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Firma de la persona responsable o representante legal que emite la constancia.
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
