import React from 'react';
import { HabeasDataData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { User, Building, ShieldAlert, Plus, Trash2 } from 'lucide-react';

interface Props {
  data: HabeasDataData;
  onChange: (updated: HabeasDataData) => void;
}

export const HabeasDataForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof HabeasDataData>(key: K, val: HabeasDataData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddAnexo = () => {
    update('anexosDocumentales', [...data.anexosDocumentales, '']);
  };

  const handleUpdateAnexo = (idx: number, val: string) => {
    const list = [...data.anexosDocumentales];
    list[idx] = val;
    update('anexosDocumentales', list);
  };

  const handleRemoveAnexo = (idx: number) => {
    update('anexosDocumentales', data.anexosDocumentales.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Central de Riesgo y Entidad Fuente */}
      <CollapsibleSection
        title="Central de Riesgo y Fuente"
        subtitle="DataCrédito, TransUnion/CIFIN o Procrédito"
        icon={<Building className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Central de Riesgo Destinataria</label>
            <select
              value={data.centralDeRiesgo}
              onChange={(e) => update('centralDeRiesgo', e.target.value as any)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="DataCrédito Experian">DataCrédito Experian</option>
              <option value="TransUnion / CIFIN">TransUnion / CIFIN</option>
              <option value="Procrédito">Procrédito (Fenalco)</option>
              <option value="Entidad Financiera Directa">Entidad Financiera Directa (Banco / Operador)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Entidad Fuente que Reportó</label>
            <input
              type="text"
              value={data.entidadReportante}
              onChange={(e) => update('entidadReportante', e.target.value)}
              placeholder="Ej: BANCO MULTISERVICIOS S.A."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">N° de Obligación / Crédito</label>
            <input
              type="text"
              value={data.numeroObligacion}
              onChange={(e) => update('numeroObligacion', e.target.value)}
              placeholder="Ej: Obligación N° 4589-0021-998"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Causal y Hechos */}
      <CollapsibleSection
        title="Causal Legal de Habeas Data y Hechos"
        subtitle="Caducidad, suplantación, pago o inexistencia"
        icon={<ShieldAlert className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Causal Concreta Invocada</label>
            <select
              value={data.causalSolicitud}
              onChange={(e) => update('causalSolicitud', e.target.value as any)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="caducidad">Caducidad del dato negativo (Término máximo legal de 8 años)</option>
              <option value="pago_total">Pago total y extinción de la mora con término cumplido</option>
              <option value="suplantacion">Suplantación de identidad / Fraude no reconocido</option>
              <option value="inexistencia">Inexistencia de la relación contractual o reporte erróneo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Narración Detallada de los Hechos</label>
            <textarea
              rows={4}
              value={data.hechosDetallados}
              onChange={(e) => update('hechosDetallados', e.target.value)}
              placeholder="Indique las fechas de adquisición, mora, pago o por qué opera la caducidad del reporte..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pretensión Concreta</label>
            <input
              type="text"
              value={data.pretensionConcreta}
              onChange={(e) => update('pretensionConcreta', e.target.value)}
              placeholder="Ej: Se ordene la eliminación inmediata del reporte negativo histórico..."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Anexos */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Pruebas y Anexos Documentales:</label>
              <button
                type="button"
                onClick={handleAddAnexo}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar anexo
              </button>
            </div>
            {data.anexosDocumentales.map((anexo, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={anexo}
                  onChange={(e) => handleUpdateAnexo(idx, e.target.value)}
                  placeholder={`Anexo ${idx + 1}...`}
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

      {/* 3. Datos del Titular y Notificación */}
      <CollapsibleSection
        title="Datos del Titular y Notificaciones"
        subtitle="Nombre, documento y canal para recibir la respuesta"
        icon={<User className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre Completo del Titular</label>
            <input
              type="text"
              value={data.nombreTitular}
              onChange={(e) => update('nombreTitular', e.target.value)}
              placeholder="Ej: Rodrigo Alberto Herrera Gómez"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Número de Cédula</label>
            <input
              type="text"
              value={data.numDocTitular}
              onChange={(e) => update('numDocTitular', e.target.value)}
              placeholder="Ej: 80.456.789"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Expedida en</label>
            <input
              type="text"
              value={data.expedicionTitular}
              onChange={(e) => update('expedicionTitular', e.target.value)}
              placeholder="Ej: Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo Electrónico (Para respuesta)</label>
            <input
              type="email"
              value={data.correoTitular}
              onChange={(e) => update('correoTitular', e.target.value)}
              placeholder="Ej: rodrigoh@email.com"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Teléfono</label>
            <input
              type="text"
              value={data.telefonoTitular}
              onChange={(e) => update('telefonoTitular', e.target.value)}
              placeholder="Ej: +57 310 987 6543"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dirección Física de Residencia</label>
            <input
              type="text"
              value={data.direccionNotificacion}
              onChange={(e) => update('direccionNotificacion', e.target.value)}
              placeholder="Ej: Calle 134 # 15-28, Bogotá D.C."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
