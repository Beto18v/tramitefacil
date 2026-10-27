import React from 'react';
import { PropuestaServiciosData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { User, Building, FileSpreadsheet, Plus, Trash2, DollarSign } from 'lucide-react';

interface Props {
  data: PropuestaServiciosData;
  onChange: (updated: PropuestaServiciosData) => void;
}

export const PropuestaServiciosForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof PropuestaServiciosData>(key: K, val: PropuestaServiciosData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddEntregable = () => {
    update('entregables', [...data.entregables, '']);
  };

  const handleUpdateEntregable = (idx: number, val: string) => {
    const list = [...data.entregables];
    list[idx] = val;
    update('entregables', list);
  };

  const handleRemoveEntregable = (idx: number) => {
    if (data.entregables.length <= 1) {
      update('entregables', ['']);
      return;
    }
    update('entregables', data.entregables.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos del Proponente */}
      <CollapsibleSection
        title="Tus Datos (Proponente / Profesional)"
        subtitle="Nombre, profesión y datos de contacto"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre del Consultor / Proponente</label>
            <input
              type="text"
              value={data.nombreProponente}
              onChange={(e) => update('nombreProponente', e.target.value)}
              placeholder="Ej: Santiago Restrepo Cadavid"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Profesión o Especialidad</label>
            <input
              type="text"
              value={data.profesionProponente}
              onChange={(e) => update('profesionProponente', e.target.value)}
              placeholder="Ej: Consultor en Transformación Digital"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Identificación / Cédula / NIT</label>
            <input
              type="text"
              value={data.identificacionProponente}
              onChange={(e) => update('identificacionProponente', e.target.value)}
              placeholder="Ej: CC 1.037.654.890"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Teléfono</label>
            <input
              type="text"
              value={data.telefonoProponente}
              onChange={(e) => update('telefonoProponente', e.target.value)}
              placeholder="Ej: +57 315 889 0012"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo Electrónico</label>
            <input
              type="email"
              value={data.correoProponente}
              onChange={(e) => update('correoProponente', e.target.value)}
              placeholder="Ej: santiago@empresa.com"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Datos del Cliente */}
      <CollapsibleSection
        title="Datos del Cliente y Fechas"
        subtitle="Destinatario, empresa y validez de la oferta"
        icon={<Building className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre del Contacto</label>
            <input
              type="text"
              value={data.nombreCliente}
              onChange={(e) => update('nombreCliente', e.target.value)}
              placeholder="Ej: Lic. Mariana Botero"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Empresa Cliente</label>
            <input
              type="text"
              value={data.empresaCliente}
              onChange={(e) => update('empresaCliente', e.target.value)}
              placeholder="Ej: LOGÍSTICA DE OCCIDENTE S.A.S."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo del Contacto</label>
            <input
              type="text"
              value={data.cargoCliente}
              onChange={(e) => update('cargoCliente', e.target.value)}
              placeholder="Ej: Gerente de Operaciones"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Validez de la Oferta (Días)</label>
            <input
              type="number"
              value={data.validezDias || 15}
              onChange={(e) => update('validezDias', parseInt(e.target.value, 10) || 15)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Alcance y Entregables */}
      <CollapsibleSection
        title="Alcance, Objetivos y Entregables"
        subtitle="Definición técnica del proyecto propuesto"
        icon={<FileSpreadsheet className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Título del Proyecto / Propuesta</label>
            <input
              type="text"
              value={data.tituloProyecto}
              onChange={(e) => update('tituloProyecto', e.target.value)}
              placeholder="Ej: Modernización del Sistema de Despachos"
              className="w-full min-h-[44px] text-xs font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Objetivo General</label>
            <textarea
              rows={2}
              value={data.objetivoGeneral}
              onChange={(e) => update('objetivoGeneral', e.target.value)}
              placeholder="Ej: Diseñar e implementar una solución integral..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Alcance y Metodología</label>
            <textarea
              rows={4}
              value={data.alcanceDetallado}
              onChange={(e) => update('alcanceDetallado', e.target.value)}
              placeholder="Detalle aquí las fases, actividades y etapas..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          {/* Entregables */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Entregables Tangibles:</label>
              <button
                type="button"
                onClick={handleAddEntregable}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar entregable
              </button>
            </div>
            {data.entregables.map((entregable, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={entregable}
                  onChange={(e) => handleUpdateEntregable(idx, e.target.value)}
                  placeholder={`Entregable ${idx + 1}...`}
                  className="flex-1 min-h-[44px] text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveEntregable(idx)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Honorarios y Condiciones */}
      <CollapsibleSection
        title="Inversión, Cronograma y Condiciones"
        subtitle="Honorarios totales, esquema de pago y exclusiones"
        icon={<DollarSign className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Honorarios Totales ($)</label>
              <input
                type="number"
                min="0"
                value={data.honorariosTotales || ''}
                onChange={(e) => update('honorariosTotales', parseFloat(e.target.value) || 0)}
                placeholder="Ej: 12800000"
                className="w-full min-h-[44px] text-xs font-mono font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tiempo / Cronograma Estimado</label>
              <input
                type="text"
                value={data.cronogramaSemanas}
                onChange={(e) => update('cronogramaSemanas', e.target.value)}
                placeholder="Ej: 8 semanas a partir del anticipo"
                className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Forma de Pago Pactada</label>
            <input
              type="text"
              value={data.formaDePago}
              onChange={(e) => update('formaDePago', e.target.value)}
              placeholder="Ej: 40% anticipo, 30% hito intermedio y 30% final"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Exclusiones o Notas</label>
            <textarea
              rows={2}
              value={data.exclusionesYCondiciones}
              onChange={(e) => update('exclusionesYCondiciones', e.target.value)}
              placeholder="Ej: No incluye compra de servidores ni licencias..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
