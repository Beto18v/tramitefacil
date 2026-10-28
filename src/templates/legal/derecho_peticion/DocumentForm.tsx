import React from 'react';
import { DerechoPeticionData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { SignaturePad } from '../../../components/SignaturePad';
import { InputField, SelectField, TextareaField } from '../../../components/ui';
import { Building, Plus, Scale, Sparkles, Trash2, User } from 'lucide-react';

const quickClaimTemplates = [
  {
    label: '💊 Medicamentos / Citas EPS',
    asunto:
      'DERECHO DE PETICIÓN URGENTE - AUTORIZACIÓN Y ENTREGA EFECTIVA DE MEDICAMENTOS VITALES Y ASIGNACIÓN DE CITA ESPECIALIZADA',
    tipoEntidad: 'Salud / EPS' as const,
    hechos: [
      '1. Me encuentro legalmente afiliado(a) a su entidad en calidad de cotizante / beneficiario del Sistema de Seguridad Social en Salud.',
      '2. Mi médico tratante prescribió tratamiento médico y fórmula especializada, la cual fue debidamente radicada ante sus canales de atención.',
      '3. A la fecha actual han transcurrido los términos de ley sin que se haya efectuado la entrega del medicamento ni asignado la cita médica requerida.',
      '4. La dilación administrativa vulnera directamente mi derecho fundamental a la salud, a la integridad física y a la vida digna.',
    ],
    pretensiones: [
      'PRIMERA: Se ordene la entrega inmediata y sin más dilaciones de los medicamentos prescritos en la orden médica radicada.',
      'SEGUNDA: Se asigne de manera prioritaria la cita con el especialista médico tratante en una IPS de su red adscrita.',
    ],
  },
  {
    label: '⚡ Servicios Públicos / Facturación',
    asunto:
      'DERECHO DE PETICIÓN - RECLAMO POR FACTURACIÓN INEXACTA Y COBROS NO AUTORIZADOS EN SERVICIO DOMICILIARIO',
    tipoEntidad: 'Servicios Públicos' as const,
    hechos: [
      '1. Soy usuario y suscriptor del servicio público domiciliario en el inmueble ubicado en la dirección de notificación.',
      '2. En la última factura recibida se evidencia un incremento desproporcionado e injustificado en el consumo facturado o cobros por conceptos no pactados.',
      '3. En el predio no se han presentado fugas perceptibles ni variaciones en los hábitos de consumo que justifiquen dicha variación tarifaria.',
    ],
    pretensiones: [
      'PRIMERA: Se realice la revisión técnica del medidor y se investiguen las causas de la desviación significativa de consumo.',
      'SEGUNDA: Se suspendan las acciones de cobro coactivo o corte del servicio mientras se resuelve en firme la presente reclamación.',
      'TERCERA: Se reliquide la factura cobrando el promedio histórico de los últimos seis periodos de facturación.',
    ],
  },
  {
    label: '🏦 Bancos / Cargos no autorizados',
    asunto:
      'DERECHO DE PETICIÓN - RECLAMO POR DÉBITOS AUTOMÁTICOS O SEGUROS NO AUTORIZADOS EN CUENTA BANCARIA',
    tipoEntidad: 'Entidad Financiera / Banco' as const,
    hechos: [
      '1. Soy titular del producto financiero o cuenta de ahorros identificada con la entidad bancaria.',
      '2. En el último extracto bancario se aprecian débitos automáticos por concepto de comisiones o seguros que jamás fueron autorizados de manera expresa por mi parte.',
    ],
    pretensiones: [
      'PRIMERA: Se ordene la cancelación inmediata de la suscripción o póliza no consentida vinculada a mi producto.',
      'SEGUNDA: Se efectúe el reintegro total del dinero debitado indebidamente a mi cuenta bancaria.',
    ],
  },
];

export const DocumentForm: React.FC<DocumentFormProps<DerechoPeticionData>> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof DerechoPeticionData>(key: K, val: DerechoPeticionData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddHecho = () => {
    update('hechos', [...(data.hechos || []), '']);
  };

  const handleUpdateHecho = (index: number, val: string) => {
    const updated = [...(data.hechos || [])];
    updated[index] = val;
    update('hechos', updated);
  };

  const handleRemoveHecho = (index: number) => {
    if ((data.hechos || []).length <= 1) {
      update('hechos', ['']);
      return;
    }
    update(
      'hechos',
      (data.hechos || []).filter((_, i) => i !== index)
    );
  };

  const handleAddPretension = () => {
    update('pretensiones', [...(data.pretensiones || []), '']);
  };

  const handleUpdatePretension = (index: number, val: string) => {
    const updated = [...(data.pretensiones || [])];
    updated[index] = val;
    update('pretensiones', updated);
  };

  const handleRemovePretension = (index: number) => {
    if ((data.pretensiones || []).length <= 1) {
      update('pretensiones', ['']);
      return;
    }
    update(
      'pretensiones',
      (data.pretensiones || []).filter((_, i) => i !== index)
    );
  };

  const handleAddAnexo = () => {
    update('anexos', [...(data.anexos || []), '']);
  };

  const handleUpdateAnexo = (index: number, val: string) => {
    const updated = [...(data.anexos || [])];
    updated[index] = val;
    update('anexos', updated);
  };

  const handleRemoveAnexo = (index: number) => {
    update(
      'anexos',
      (data.anexos || []).filter((_, i) => i !== index)
    );
  };

  const applyClaimTemplate = (tpl: (typeof quickClaimTemplates)[0]) => {
    onChange({
      ...data,
      asunto: tpl.asunto,
      tipoEntidad: tpl.tipoEntidad,
      hechos: tpl.hechos,
      pretensiones: tpl.pretensiones,
    });
  };

  const tipoEntidadOptions = [
    { value: 'Salud / EPS', label: 'Salud / EPS' },
    { value: 'Servicios Públicos', label: 'Servicios Públicos' },
    { value: 'Entidad Financiera / Banco', label: 'Entidad Financiera / Banco' },
    { value: 'Entidad Pública General', label: 'Entidad Pública General' },
  ];

  const tipoDocumentoOptions = [
    { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía (C.C.)' },
    { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería (C.E.)' },
    { value: 'Tarjeta de Identidad', label: 'Tarjeta de Identidad (T.I.)' },
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* Tip legal */}
      <div className="p-4 bg-indigo-50/80 border border-indigo-200/80 rounded-2xl text-xs text-indigo-950 flex items-start gap-3">
        <Scale className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Garantía Constitucional (Art. 23 C.P. & Ley 1755 de 2015):</strong> Las entidades públicas,
          EPS, bancos y prestadoras de servicios públicos tienen por regla general{' '}
          <strong>15 días hábiles</strong> para responder de fondo, de forma clara, oportuna y congruente.
        </div>
      </div>

      {/* Quick Claim Templates */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Plantillas de Reclamación Preconfiguradas (1 toque):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickClaimTemplates.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => applyClaimTemplate(t)}
              className="min-h-[38px] px-3 py-1.5 text-xs font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
            >
              + {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Entidad Destinataria */}
      <CollapsibleSection
        step="Paso 01"
        title="Entidad o Autoridad Destinataria"
        subtitle="Institución pública, EPS o empresa a la que se dirige"
        icon={<Building className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <SelectField
              label="Tipo de Entidad"
              value={data.tipoEntidad}
              onChange={(e) =>
                update('tipoEntidad', e.target.value as DerechoPeticionData['tipoEntidad'])
              }
              options={tipoEntidadOptions}
            />
          </div>

          <div className="sm:col-span-2">
            <InputField
              label="Nombre de la Entidad o Empresa"
              value={data.entidadDestinataria}
              onChange={(e) => update('entidadDestinataria', e.target.value)}
              placeholder="Ej: NUEVA EPS S.A. / BANCO DE BOGOTÁ / ALCALDÍA"
              required
            />
          </div>

          <InputField
            label="Dependencia o Área (Opcional)"
            value={data.dependenciaDestinataria}
            onChange={(e) => update('dependenciaDestinataria', e.target.value)}
            placeholder="Ej: Oficina de PQRS / Gerencia de Autorizaciones"
          />

          <InputField
            label="Cargo del Destinatario (Opcional)"
            value={data.cargoDestinatario}
            onChange={(e) => update('cargoDestinatario', e.target.value)}
            placeholder="Ej: Director Médico / Representante Legal"
          />

          <InputField
            label="Dirección de la Entidad"
            value={data.direccionEntidad}
            onChange={(e) => update('direccionEntidad', e.target.value)}
            placeholder="Ej: Carrera 85K # 46A-66"
          />

          <InputField
            label="Correo de Notificación de la Entidad"
            value={data.correoEntidad}
            onChange={(e) => update('correoEntidad', e.target.value)}
            placeholder="Ej: notificaciones@entidad.gov.co"
          />

          <div className="sm:col-span-2 grid grid-cols-2 gap-2">
            <InputField
              label="Ciudad de Radicación"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              required
            />
            <InputField
              label="Fecha"
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
              required
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Asunto y Hechos */}
      <CollapsibleSection
        step="Paso 02"
        title="Asunto y Hechos Cronológicos"
        subtitle="Motivo principal y narración de lo ocurrido"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <TextareaField
            label="Asunto del Derecho de Petición"
            value={data.asunto}
            onChange={(e) => update('asunto', e.target.value)}
            placeholder="Ej: Solicitud formal de entrega de medicamentos..."
            rows={2}
            required
          />

          <InputField
            label="Referencia / Trámite / N° de Historia / Cuenta (Opcional)"
            value={data.referencia}
            onChange={(e) => update('referencia', e.target.value)}
            placeholder="Ej: Radicado N° 458920 / Cuenta contrato 12345"
          />

          {/* Hechos Dinámicos */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Fundamentos de Hecho (Numerados):</label>
              <button
                type="button"
                onClick={handleAddHecho}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar hecho
              </button>
            </div>
            {(data.hechos || []).map((hecho, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="text-xs font-bold text-slate-400 mt-3">{idx + 1}.</span>
                <textarea
                  rows={2}
                  value={hecho}
                  onChange={(e) => handleUpdateHecho(idx, e.target.value)}
                  placeholder={`Describa el hecho ${idx + 1}...`}
                  className="flex-1 text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHecho(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 cursor-pointer mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Pretensiones y Anexos */}
      <CollapsibleSection
        step="Paso 03"
        title="Pretensiones y Documentos Anexos"
        subtitle="Lo que se solicita concretamente a la entidad"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          {/* Pretensiones Dinámicas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Pretensiones Claras y Concretas:</label>
              <button
                type="button"
                onClick={handleAddPretension}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar pretensión
              </button>
            </div>
            {(data.pretensiones || []).map((pret, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="text-xs font-bold text-indigo-600 mt-3">{idx + 1}.</span>
                <textarea
                  rows={2}
                  value={pret}
                  onChange={(e) => handleUpdatePretension(idx, e.target.value)}
                  placeholder={`Solicito a la entidad que...`}
                  className="flex-1 text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed font-medium"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePretension(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 cursor-pointer mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <TextareaField
            label="Fundamentos de Derecho"
            value={data.fundamentosDerecho}
            onChange={(e) => update('fundamentosDerecho', e.target.value)}
            rows={2}
          />

          {/* Anexos Dinámicos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Documentos y Pruebas que se Anexan:</label>
              <button
                type="button"
                onClick={handleAddAnexo}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar anexo
              </button>
            </div>
            {(data.anexos || []).map((anexo, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={anexo}
                  onChange={(e) => handleUpdateAnexo(idx, e.target.value)}
                  placeholder={`Ej: Copia de fórmula médica del 12/03/2026...`}
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnexo(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Datos del Peticionario y Notificación */}
      <CollapsibleSection
        step="Paso 04"
        title="Tus Datos y Notificación"
        subtitle="Nombre, documento, correo electrónico y firma"
        icon={<User className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <InputField
                label="Tu Nombre Completo"
                value={data.nombrePeticionario}
                onChange={(e) => update('nombrePeticionario', e.target.value)}
                placeholder="Ej: Esperanza Duarte de Martínez"
                required
              />
            </div>

            <SelectField
              label="Tipo de Documento"
              value={data.tipoDocumento}
              onChange={(e) => update('tipoDocumento', e.target.value)}
              options={tipoDocumentoOptions}
            />

            <InputField
              label="Número de Cédula / Documento"
              value={data.numeroDocumento}
              onChange={(e) => update('numeroDocumento', e.target.value)}
              placeholder="Ej: 41.567.890"
              required
            />

            <InputField
              label="Lugar de Expedición"
              value={data.lugarExpedicion}
              onChange={(e) => update('lugarExpedicion', e.target.value)}
              placeholder="Ej: Bogotá D.C."
            />

            <InputField
              label="Teléfono Móvil de Contacto"
              value={data.telefono}
              onChange={(e) => update('telefono', e.target.value)}
              placeholder="Ej: +57 316 456 7812"
              required
            />

            <InputField
              label="Correo Electrónico (Notificación Principal)"
              type="email"
              value={data.correo}
              onChange={(e) => update('correo', e.target.value)}
              placeholder="Ej: esperanza.duarte@email.com"
              required
            />

            <InputField
              label="Dirección Física de Residencia"
              value={data.direccionNotificacion}
              onChange={(e) => update('direccionNotificacion', e.target.value)}
              placeholder="Ej: Diagonal 45 Sur # 16C-22"
              required
            />
          </div>

          <div className="pt-2">
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
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

