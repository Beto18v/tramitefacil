import React from 'react';
import { ReclamoServiciosPublicosData } from '../../../types/documents';
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
import {
  Building2,
  User,
  Receipt,
  Scale,
  FileCheck,
  Zap,
} from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<ReclamoServiciosPublicosData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof ReclamoServiciosPublicosData>(
    key: K,
    val: ReclamoServiciosPublicosData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4">
      {/* 1. Empresa Prestadora y Servicio */}
      <CollapsibleSection
        title="Empresa Prestadora y Servicio"
        icon={<Building2 className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Ciudad de radicación"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Fecha del reclamo"
            type="date"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
          />
          <div className="md:col-span-2">
            <InputField
              label="Nombre de la empresa prestadora"
              value={data.empresaServicios}
              onChange={(e) => update('empresaServicios', e.target.value)}
              placeholder="Ej. Enel Colombia S.A. E.S.P., EAAB, EPM, Vanti S.A."
            />
          </div>
          <InputField
            label="Ciudad de la empresa"
            value={data.ciudadEmpresa}
            onChange={(e) => update('ciudadEmpresa', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <SelectField
            label="Tipo de servicio público"
            value={data.tipoServicio}
            onChange={(e) =>
              update(
                'tipoServicio',
                e.target.value as 'energia' | 'acueducto' | 'gas' | 'aseo' | 'telecomunicaciones' | 'mixto'
              )
            }
            options={[
              { value: 'energia', label: 'Energía Eléctrica' },
              { value: 'acueducto', label: 'Acueducto y Alcantarillado' },
              { value: 'gas', label: 'Gas Natural Domiciliario' },
              { value: 'aseo', label: 'Aseo y Residuos' },
              { value: 'telecomunicaciones', label: 'Telecomunicaciones / Internet' },
              { value: 'mixto', label: 'Servicio Mixto / Múltiple' },
            ]}
          />
        </div>
      </CollapsibleSection>

      {/* 2. Usuario y Predio */}
      <CollapsibleSection
        title="Datos del Usuario y Predio"
        icon={<User className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre completo del usuario / suscriptor"
            value={data.nombreUsuario}
            onChange={(e) => update('nombreUsuario', e.target.value)}
            placeholder="Nombre de quien reclama"
          />
          <div className="grid grid-cols-2 gap-2">
            <SelectField
              label="Tipo doc."
              value={data.tipoDocUsuario}
              onChange={(e) => update('tipoDocUsuario', e.target.value)}
              options={[
                { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
                { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
                { value: 'NIT', label: 'NIT' },
              ]}
            />
            <InputField
              label="Número"
              value={data.numDocUsuario}
              onChange={(e) => update('numDocUsuario', e.target.value)}
              placeholder="Número de identificación"
            />
          </div>
          <SelectField
            label="Calidad del solicitante"
            value={data.calidadUsuario}
            onChange={(e) =>
              update(
                'calidadUsuario',
                e.target.value as 'propietario' | 'suscriptor' | 'arrendatario' | 'usuario'
              )
            }
            options={[
              { value: 'usuario', label: 'Usuario(a) efectivo del servicio' },
              { value: 'suscriptor', label: 'Suscriptor(a) que figura en la factura' },
              { value: 'propietario', label: 'Propietario(a) del predio' },
              { value: 'arrendatario', label: 'Arrendatario(a) habitante' },
            ]}
          />
          <InputField
            label="Cuenta Contrato / NIC / Código de Usuario"
            value={data.cuentaContrato}
            onChange={(e) => update('cuentaContrato', e.target.value)}
            placeholder="Ej. NIC 20948123 / Matrícula 1004582"
            helperText="Identificador del servicio que aparece en el encabezado de su factura"
          />
          <div className="md:col-span-2">
            <InputField
              label="Dirección del inmueble servido"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej. Carrera 7 # 120-45, Casa 3"
            />
          </div>
          <InputField
            label="Ciudad del predio"
            value={data.ciudadInmueble}
            onChange={(e) => update('ciudadInmueble', e.target.value)}
            placeholder="Ej. Bogotá D.C."
          />
          <InputField
            label="Teléfono de contacto"
            value={data.telefonoUsuario}
            onChange={(e) => update('telefonoUsuario', e.target.value)}
            placeholder="Ej. +57 315 123 4567"
          />
          <div className="md:col-span-2">
            <InputField
              label="Correo electrónico para notificaciones"
              type="email"
              value={data.correoNotificaciones}
              onChange={(e) => update('correoNotificaciones', e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Factura y Motivo */}
      <CollapsibleSection
        title="Factura y Desviación del Consumo"
        icon={<Receipt className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="N° de Factura reclamada"
              value={data.numeroFactura}
              onChange={(e) => update('numeroFactura', e.target.value)}
              placeholder="Ej. FAC-2026-904128"
            />
            <InputField
              label="Período facturado"
              value={data.periodoFacturado}
              onChange={(e) => update('periodoFacturado', e.target.value)}
              placeholder="Ej. Octubre - Noviembre 2026"
            />
            <CurrencyField
              label="Valor total facturado en disputa"
              value={data.valorReclamado}
              onChange={(val) => update('valorReclamado', val)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Consumo habitual promedio"
              value={data.consumoHistoricoPromedio || ''}
              onChange={(e) => update('consumoHistoricoPromedio', e.target.value)}
              placeholder="Ej. 130 kWh / mes ó 15 m³ / bimestre"
              helperText="Promedio de los últimos 6 meses en condiciones normales"
            />
            <InputField
              label="Consumo cobrado en esta factura"
              value={data.consumoCobrado || ''}
              onChange={(e) => update('consumoCobrado', e.target.value)}
              placeholder="Ej. 410 kWh / mes ó 64 m³ / bimestre"
              helperText="Consumo extraordinario que se considera erróneo o desviado"
            />
          </div>

          <SelectField
            label="Causal principal de inconformidad"
            value={data.motivoReclamo}
            onChange={(e) =>
              update(
                'motivoReclamo',
                e.target.value as
                  | 'desviacion_significativa'
                  | 'cobro_no_autorizado'
                  | 'cobro_servicio_no_prestado'
                  | 'cobro_reiterado'
                  | 'falla_prestacion'
                  | 'otro'
              )
            }
            options={[
              { value: 'desviacion_significativa', label: 'Desviación significativa de consumo (Art. 149 Ley 142/94)' },
              { value: 'cobro_no_autorizado', label: 'Cobro de conceptos no autorizados o seguros no contratados' },
              { value: 'cobro_servicio_no_prestado', label: 'Cobro por servicio no prestado o suspendido previamente' },
              { value: 'cobro_reiterado', label: 'Cobro duplicado o cobro de facturas ya canceladas' },
              { value: 'falla_prestacion', label: 'Falla continua en la prestación y calidad del servicio' },
              { value: 'otro', label: 'Otro motivo de controversia' },
            ]}
          />

          <TextareaField
            label="Descripción detallada de los hechos"
            rows={3}
            value={data.descripcionHechos}
            onChange={(e) => update('descripcionHechos', e.target.value)}
            placeholder="Explique las razones de su desacuerdo con la factura..."
          />
        </div>
      </CollapsibleSection>

      {/* 4. Peticiones Expresas */}
      <CollapsibleSection
        title="Peticiones Expresas (Ley 142 de 1994)"
        icon={<Scale className="w-5 h-5 text-emerald-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <SwitchField
            label="Solicitar visita técnica de investigación de desviación y revisión del medidor (Art. 149)"
            checked={data.solicitaInvestigacionDesviacion}
            onChange={(checked) => update('solicitaInvestigacionDesviacion', checked)}
          />
          <SwitchField
            label="Solicitar reliquidación de la factura al promedio histórico del predio"
            checked={data.solicitaReliquidacion}
            onChange={(checked) => update('solicitaReliquidacion', checked)}
          />
          <SwitchField
            label="Exigir prohibición expresa de suspensión del servicio y cupón temporal (Art. 155)"
            checked={data.solicitaNoSuspension}
            onChange={(checked) => update('solicitaNoSuspension', checked)}
            description="La empresa no puede cortar el servicio ni exigir el pago disputado mientras resuelva la reclamación."
          />
          <TextareaField
            label="Peticiones adicionales (opcional)"
            rows={2}
            value={data.peticionesAdicionales || ''}
            onChange={(e) => update('peticionesAdicionales', e.target.value)}
            placeholder="Ej. Solicitud de factura provisional para pagar únicamente el cargo fijo o aseo."
          />
        </div>
      </CollapsibleSection>

      {/* 5. Anexos y Firma */}
      <CollapsibleSection
        title="Anexos y Firma Digital"
        icon={<FileCheck className="w-5 h-5 text-emerald-600" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <TextareaField
            label="Relación de documentos anexos"
            rows={3}
            value={data.anexos || ''}
            onChange={(e) => update('anexos', e.target.value)}
            placeholder="1. Copia de la factura reclamada... 2. Copias de facturas anteriores..."
          />

          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Firma digital del solicitante
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
