import React from 'react';
import { DerechoPeticionData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { Plus, Trash2, Building, User, Scale } from 'lucide-react';

interface Props {
  data: DerechoPeticionData;
  onChange: (updated: DerechoPeticionData) => void;
}

export const DerechoPeticionForm: React.FC<Props> = ({ data, onChange }) => {
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

  return (
    <div className="space-y-4 pb-8">
      {/* Tip explicativo legal */}
      <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-3">
        <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Garantía Constitucional (Art. 23 C.P. & Ley 1755 de 2015):</strong> Las entidades públicas,
          EPS, bancos y prestadoras de servicios públicos tienen por regla general{' '}
          <strong>15 días hábiles</strong> para responder de fondo, de forma clara, oportuna y congruente.
        </div>
      </div>

      {/* 1. Entidad Destinataria */}
      <CollapsibleSection
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
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
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo del Destinatario (Opcional)</label>
            <input
              type="text"
              value={data.cargoDestinatario}
              onChange={(e) => update('cargoDestinatario', e.target.value)}
              placeholder="Ej: Director(a) de PQRS"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dependencia u Oficina</label>
            <input
              type="text"
              value={data.dependenciaDestinataria}
              onChange={(e) => update('dependenciaDestinataria', e.target.value)}
              placeholder="Ej: Oficina de Atención al Usuario"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dirección Física de la Entidad</label>
            <input
              type="text"
              value={data.direccionEntidad}
              onChange={(e) => update('direccionEntidad', e.target.value)}
              placeholder="Ej: Carrera 85K # 46A-66"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo de Notificaciones</label>
            <input
              type="email"
              value={data.correoEntidad}
              onChange={(e) => update('correoEntidad', e.target.value)}
              placeholder="Ej: notificaciones@entidad.gov.co"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Asunto y Hechos */}
      <CollapsibleSection
        title="Asunto y Hechos de la Petición"
        subtitle="Narración cronológica y clara de lo ocurrido"
        icon={<Scale className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Asunto Concreto</label>
            <input
              type="text"
              value={data.asunto}
              onChange={(e) => update('asunto', e.target.value)}
              placeholder="Ej: Solicitud urgente de autorización y entrega de medicamentos..."
              className="w-full min-h-[44px] text-xs font-semibold px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Referencia o N° de Expediente</label>
            <input
              type="text"
              value={data.referencia}
              onChange={(e) => update('referencia', e.target.value)}
              placeholder="Ej: Historia Clínica N° 2026-HC-449"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Hechos */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Hechos que motivan la solicitud:</label>
              <button
                type="button"
                onClick={handleAddHecho}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar hecho
              </button>
            </div>
            {data.hechos.map((hecho, idx) => (
              <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center shrink-0 mt-1 font-bold">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={hecho}
                  onChange={(e) => handleUpdateHecho(idx, e.target.value)}
                  placeholder={`Describa el hecho ${idx + 1}...`}
                  className="flex-1 text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHecho(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600"
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
        title="Peticiones Puntuales y Fundamentos"
        subtitle="Qué requieres que la entidad resuelva y anexos"
        icon={<Scale className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Peticiones Concretas:</label>
              <button
                type="button"
                onClick={handleAddPretension}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar petición
              </button>
            </div>
            {data.pretensiones.map((pretension, idx) => (
              <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs flex items-center justify-center shrink-0 mt-1 font-bold">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={pretension}
                  onChange={(e) => handleUpdatePretension(idx, e.target.value)}
                  placeholder={`Petición ${idx + 1}...`}
                  className="flex-1 text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePretension(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600"
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
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700 leading-relaxed"
            />
          </div>

          {/* Anexos */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Documentos y Pruebas que Anexas:</label>
              <button
                type="button"
                onClick={handleAddAnexo}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
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
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnexo(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600"
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
        title="Tus Datos y Notificaciones"
        subtitle="Dónde recibirás la respuesta formal de la entidad"
        icon={<User className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre del Peticionario</label>
            <input
              type="text"
              value={data.nombrePeticionario}
              onChange={(e) => update('nombrePeticionario', e.target.value)}
              placeholder="Ej: Jorge Eduardo Salcedo Restrepo"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tipo de Documento</label>
            <select
              value={data.tipoDocumento}
              onChange={(e) => update('tipoDocumento', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Cédula de Ciudadanía">C.C.</option>
              <option value="Cédula de Extranjería">C.E.</option>
              <option value="Tarjeta de Identidad">T.I.</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Número de Documento</label>
            <input
              type="text"
              value={data.numeroDocumento}
              onChange={(e) => update('numeroDocumento', e.target.value)}
              placeholder="Ej: 79.845.123"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Lugar de Expedición</label>
            <input
              type="text"
              value={data.lugarExpedicion}
              onChange={(e) => update('lugarExpedicion', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Teléfono Móvil</label>
            <input
              type="text"
              value={data.telefono}
              onChange={(e) => update('telefono', e.target.value)}
              placeholder="Ej: +57 300 892 1144"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo Electrónico (Para respuesta)</label>
            <input
              type="email"
              value={data.correo}
              onChange={(e) => update('correo', e.target.value)}
              placeholder="Ej: mi.correo@ejemplo.com"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dirección de Residencia</label>
            <input
              type="text"
              value={data.direccionNotificacion}
              onChange={(e) => update('direccionNotificacion', e.target.value)}
              placeholder="Ej: Calle 53 # 24-18, Apto 301"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
