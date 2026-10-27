import React from 'react';
import { PoderAutorizacionData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { Shield, User, UserCheck, Plus, Trash2, Fingerprint } from 'lucide-react';

interface Props {
  data: PoderAutorizacionData;
  onChange: (updated: PoderAutorizacionData) => void;
}

export const PoderAutorizacionForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof PoderAutorizacionData>(key: K, val: PoderAutorizacionData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddFacultad = () => {
    update('facultadesEspecificas', [...data.facultadesEspecificas, '']);
  };

  const handleUpdateFacultad = (index: number, val: string) => {
    const updated = [...data.facultadesEspecificas];
    updated[index] = val;
    update('facultadesEspecificas', updated);
  };

  const handleRemoveFacultad = (index: number) => {
    update('facultadesEspecificas', data.facultadesEspecificas.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos del Otorgante */}
      <CollapsibleSection
        title="Datos del Otorgante (Poderdante)"
        subtitle="Quién confiere la autorización legal"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre Completo del Otorgante</label>
            <input
              type="text"
              value={data.nombreOtorgante}
              onChange={(e) => update('nombreOtorgante', e.target.value)}
              placeholder="Ej: Gloria Patricia Valencia"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tipo de Documento</label>
            <select
              value={data.tipoDocOtorgante}
              onChange={(e) => update('tipoDocOtorgante', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Cédula de Ciudadanía">C.C.</option>
              <option value="Cédula de Extranjería">C.E.</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Número de Identificación</label>
            <input
              type="text"
              value={data.numDocOtorgante}
              onChange={(e) => update('numDocOtorgante', e.target.value)}
              placeholder="Ej: 31.954.882"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ciudad de Expedición</label>
            <input
              type="text"
              value={data.expedicionOtorgante}
              onChange={(e) => update('expedicionOtorgante', e.target.value)}
              placeholder="Ej: Cali (Valle)"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Domicilio y Teléfono</label>
            <input
              type="text"
              value={data.domicilioOtorgante}
              onChange={(e) => update('domicilioOtorgante', e.target.value)}
              placeholder="Ej: Av. 6N # 28N-34, Cali"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Datos del Apoderado */}
      <CollapsibleSection
        title="Datos del Apoderado (Autorizado)"
        subtitle="Persona que realizará el trámite en tu representación"
        icon={<UserCheck className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre Completo del Autorizado</label>
            <input
              type="text"
              value={data.nombreApoderado}
              onChange={(e) => update('nombreApoderado', e.target.value)}
              placeholder="Ej: Sebastián Morales Valencia"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Número de Cédula</label>
            <input
              type="text"
              value={data.numDocApoderado}
              onChange={(e) => update('numDocApoderado', e.target.value)}
              placeholder="Ej: 1.144.189.650"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Expedida en</label>
            <input
              type="text"
              value={data.expedicionApoderado}
              onChange={(e) => update('expedicionApoderado', e.target.value)}
              placeholder="Ej: Cali"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Trámite, Objeto y Facultades */}
      <CollapsibleSection
        title="Trámite y Facultades Concedidas"
        subtitle="Gestión específica autorizada y límite temporal"
        icon={<Shield className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Entidad o Dependencia</label>
            <input
              type="text"
              value={data.entidadTramite}
              onChange={(e) => update('entidadTramite', e.target.value)}
              placeholder="Ej: Secretaría de Movilidad / Notaría 25 / Banco"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Objeto del Trámite Detallado</label>
            <textarea
              rows={3}
              value={data.objetoAutorizacion}
              onChange={(e) => update('objetoAutorizacion', e.target.value)}
              placeholder="Describa el trámite vehicular, retiro de cheques o documentación..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          {/* Facultades */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Facultades Expresas:</label>
              <button
                type="button"
                onClick={handleAddFacultad}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar facultad
              </button>
            </div>
            {data.facultadesEspecificas.map((fac, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={fac}
                  onChange={(e) => handleUpdateFacultad(idx, e.target.value)}
                  placeholder={`Facultad ${idx + 1}...`}
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFacultad(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Vigencia Temporal</label>
            <input
              type="text"
              value={data.vigenciaTexto}
              onChange={(e) => update('vigenciaTexto', e.target.value)}
              placeholder="Ej: Válido por 30 días calendario a partir de su firma"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={data.incluirRecuadroHuella}
              onChange={(e) => update('incluirRecuadroHuella', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <span className="text-xs text-slate-700">
              Incluir recuadro gráfico para huella dactilar (Índice derecho) del otorgante
            </span>
          </label>
        </div>
      </CollapsibleSection>
    </div>
  );
};
