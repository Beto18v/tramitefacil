import React from 'react';
import { DerechoPeticionData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { SignaturePad } from '../SignaturePad';
import { Plus, Trash2, Building, User, Scale, Sparkles } from 'lucide-react';

interface Props {
  data: DerechoPeticionData;
  onChange: (updated: DerechoPeticionData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const DerechoPeticionForm: React.FC<Props> = ({
  data,
  onChange,
  onSaveSignatureToProfile,
}) => {
  const update = <K extends keyof DerechoPeticionData>(key: K, val: DerechoPeticionData[K]) => {
    onChange({ ...data, [key]: val });
  };

  // Dynamic Hechos helpers
  const handleAddHecho = () => {
    update('hechos', [...data.hechos, '']);
  };

  const handleUpdateHecho = (index: number, val: string) => {
    const updated = [...data.hechos];
    updated[index] = val;
    update('hechos', updated);
  };

  const handleRemoveHecho = (index: number) => {
    if (data.hechos.length <= 1) {
      update('hechos', ['']);
      return;
    }
    update('hechos', data.hechos.filter((_, i) => i !== index));
  };

  // Dynamic Pretensiones helpers
  const handleAddPretension = () => {
    update('pretensiones', [...data.pretensiones, '']);
  };

  const handleUpdatePretension = (index: number, val: string) => {
    const updated = [...data.pretensiones];
    updated[index] = val;
    update('pretensiones', updated);
  };

  const handleRemovePretension = (index: number) => {
    if (data.pretensiones.length <= 1) {
      update('pretensiones', ['']);
      return;
    }
    update('pretensiones', data.pretensiones.filter((_, i) => i !== index));
  };

  // Dynamic Anexos helpers
  const handleAddAnexo = () => {
    update('anexos', [...data.anexos, '']);
  };

  const handleUpdateAnexo = (index: number, val: string) => {
    const updated = [...data.anexos];
    updated[index] = val;
    update('anexos', updated);
  };

  const handleRemoveAnexo = (index: number) => {
    update('anexos', data.anexos.filter((_, i) => i !== index));
  };

  // Quick picker templates for common legal claims
  const quickClaimTemplates = [
    {
      label: '💊 Medicamentos / Citas EPS',
      asunto: 'DERECHO DE PETICIÓN URGENTE - AUTORIZACIÓN Y ENTREGA EFECTIVA DE MEDICAMENTOS VITALES Y ASIGNACIÓN DE CITA ESPECIALIZADA',
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
      asunto: 'DERECHO DE PETICIÓN - RECLAMO POR FACTURACIÓN INEXACTA Y COBROS NO AUTORIZADOS EN SERVICIO DOMICILIARIO',
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
      asunto: 'DERECHO DE PETICIÓN - RECLAMO POR DÉBITOS AUTOMÁTICOS O SEGUROS NO AUTORIZADOS EN CUENTA BANCARIA',
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

  const applyClaimTemplate = (tpl: typeof quickClaimTemplates[0]) => {
    onChange({
      ...data,
      asunto: tpl.asunto,
      tipoEntidad: tpl.tipoEntidad,
      hechos: tpl.hechos,
      pretensiones: tpl.pretensiones,
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Tip explicativo legal */}
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
        title="Entidad o Empresa Destinataria"
        subtitle="Institución, EPS, banco o despacho público al que se dirige"
        icon={<Building className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo de Entidad
            </label>
            <select
              value={data.tipoEntidad}
              onChange={(e) => update('tipoEntidad', e.target.value as any)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            >
              <option value="Salud / EPS">Salud / EPS (Citas, cirugías, tratamientos, medicamentos)</option>
              <option value="Servicios Públicos">Servicios Públicos (Cobros indebidos, reconexión)</option>
              <option value="Entidad Financiera / Banco">Entidad Financiera / Banco (Cobros, extractos, seguros)</option>
              <option value="Entidad Pública General">Entidad Pública General (Alcaldías, ministerios, juzgados)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre de la Entidad</label>
            <input
              type="text"
              value={data.entidadDestinataria}
              onChange={(e) => update('entidadDestinataria', e.target.value)}
              placeholder="Ej: NUEVA EPS / CLARO COLOMBIA / ALCALDÍA MAYOR"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo del Destinatario (Opcional)</label>
            <input
              type="text"
              value={data.cargoDestinatario}
              onChange={(e) => update('cargoDestinatario', e.target.value)}
              placeholder="Ej: Director(a) de PQRS"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dependencia u Oficina</label>
            <input
              type="text"
              value={data.dependenciaDestinataria}
              onChange={(e) => update('dependenciaDestinataria', e.target.value)}
              placeholder="Ej: Oficina de Atención al Usuario"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ciudad de Radicación</label>
            <input
              type="text"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha del Documento</label>
            <input
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Asunto y Hechos Dinámicos */}
      <CollapsibleSection
        step="Paso 02"
        title="Asunto y Hechos Dinámicos"
        subtitle="Agrega o elimina los hechos numerados cronológicamente"
        icon={<Scale className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Asunto Formal</label>
            <textarea
              rows={2}
              value={data.asunto}
              onChange={(e) => update('asunto', e.target.value)}
              placeholder="Ej: DERECHO DE PETICIÓN URGENTE - ENTREGA DE MEDICAMENTOS..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-semibold leading-relaxed"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Hechos que fundamentan la solicitud:
              </label>
              <button
                type="button"
                onClick={handleAddHecho}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition cursor-pointer border border-indigo-200/80"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Agregar hecho</span>
              </button>
            </div>

            {data.hechos.map((hecho, idx) => (
              <div key={idx} className="flex gap-2 items-start bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 font-mono text-xs flex items-center justify-center shrink-0 mt-1 font-bold">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={hecho}
                  onChange={(e) => handleUpdateHecho(idx, e.target.value)}
                  placeholder={`Describa el hecho ${idx + 1}...`}
                  className="flex-1 text-xs p-2.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHecho(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 transition cursor-pointer"
                  title="Eliminar este hecho"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Pretensiones y Fundamentos */}
      <CollapsibleSection
        step="Paso 03"
        title="Peticiones Concretas (Pretensiones) y Anexos"
        subtitle="Qué requieres que la entidad resuelva expresamente"
        icon={<Scale className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">Peticiones Concretas:</label>
              <button
                type="button"
                onClick={handleAddPretension}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition cursor-pointer border border-emerald-200/80"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Agregar petición</span>
              </button>
            </div>
            {data.pretensiones.map((pretension, idx) => (
              <div key={idx} className="flex gap-2 items-start bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-mono text-xs flex items-center justify-center shrink-0 mt-1 font-bold">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={pretension}
                  onChange={(e) => handleUpdatePretension(idx, e.target.value)}
                  placeholder={`Petición concreta ${idx + 1}...`}
                  className="flex-1 text-xs p-2.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePretension(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 transition cursor-pointer"
                  title="Eliminar esta petición"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fundamentos Jurídicos Pre-redactados</label>
            <textarea
              rows={3}
              value={data.fundamentosDerecho}
              onChange={(e) => update('fundamentosDerecho', e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-slate-700 leading-relaxed"
            />
          </div>

          {/* Anexos */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Documentos y Pruebas que Anexas:</label>
              <button
                type="button"
                onClick={handleAddAnexo}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar anexo
              </button>
            </div>
            {data.anexos.map((anexo, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={anexo}
                  onChange={(e) => handleUpdateAnexo(idx, e.target.value)}
                  placeholder="Ej: Copia de orden médica / comprobante..."
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnexo(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Peticionario y Notificaciones */}
      <CollapsibleSection
        step="Paso 04"
        title="Tus Datos y Notificaciones"
        subtitle="Dónde recibirás la respuesta formal de la entidad"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tu Nombre Completo</label>
            <input
              type="text"
              value={data.nombrePeticionario}
              onChange={(e) => update('nombrePeticionario', e.target.value)}
              placeholder="Ej: Esperanza Duarte de Martínez"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cédula de Ciudadanía</label>
            <input
              type="text"
              value={data.numeroDocumento}
              onChange={(e) => update('numeroDocumento', e.target.value)}
              placeholder="Ej: 41.567.890"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Lugar de Expedición</label>
            <input
              type="text"
              value={data.lugarExpedicion}
              onChange={(e) => update('lugarExpedicion', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Teléfono Celular</label>
            <input
              type="text"
              value={data.telefono}
              onChange={(e) => update('telefono', e.target.value)}
              placeholder="Ej: +57 316 456 7812"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo Electrónico (Notificación)</label>
            <input
              type="email"
              value={data.correo}
              onChange={(e) => update('correo', e.target.value)}
              placeholder="Ej: esperanza.duarte@email.com"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dirección Física de Notificación</label>
            <input
              type="text"
              value={data.direccionNotificacion}
              onChange={(e) => update('direccionNotificacion', e.target.value)}
              placeholder="Ej: Diagonal 45 Sur # 16C-22, Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Firma Digital o Tipográfica */}
      <CollapsibleSection
        step="Paso 05"
        title="Firma del Peticionario"
        subtitle="Dibuja tu firma digital en pantalla o usa pie notarial impreso"
        icon={<User className="w-5 h-5" />}
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
