import React from 'react';
import { NoRenovacionArriendoData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { Home, User, Calendar, Key, AlertCircle } from 'lucide-react';

interface Props {
  data: NoRenovacionArriendoData;
  onChange: (updated: NoRenovacionArriendoData) => void;
}

export const NoRenovacionArriendoForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof NoRenovacionArriendoData>(
    key: K,
    val: NoRenovacionArriendoData[K]
  ) => {
    onChange({ ...data, [key]: val });
  };

  const handleCausalChange = (causal: string) => {
    let sugerencia = '';
    if (causal.includes('ordinario') || causal.includes('preaviso')) {
      sugerencia =
        'En ejercicio de la facultad legal conferida por la Ley 820 de 2003 y las estipulaciones contractuales, le notifico formalmente y con la antelación debida mi voluntad irrevocable de no prorrogar el contrato al término del período contractual vigente.';
    } else if (causal.includes('propia') || causal.includes('habitación')) {
      sugerencia =
        'Comunico a usted que requiero el inmueble arrendado para destinación y habitación propia de mi núcleo familiar, causal legal contemplada en el artículo 22 de la Ley 820 de 2003.';
    } else if (causal.includes('remodelación') || causal.includes('reparación')) {
      sugerencia =
        'El inmueble requiere ser desocupado formalmente para adelantar obras indispensables de reparación estructural y remodelación mayor que impiden su habitación continua.';
    }

    onChange({
      ...data,
      causalInvocada: causal,
      detalleCausal: sugerencia || data.detalleCausal,
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Aviso legal ley 820 */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Preaviso Legal Obligatorio (Ley 820 de 2003):</strong> Para vivienda urbana, la comunicación debe remitirse con al menos{' '}
          <strong>3 meses de antelación</strong> a la fecha de vencimiento contractual mediante servicio postal autorizado.
        </div>
      </div>

      {/* 1. Rol y Partes */}
      <CollapsibleSection
        title="Rol y Partes del Arrendamiento"
        subtitle="Identificación del Remitente y Destinatario"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            ¿Quién remite la comunicación?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => update('rolRemitente', 'arrendador')}
              className={`min-h-[52px] p-3 text-xs rounded-xl border text-left transition-all cursor-pointer ${
                data.rolRemitente === 'arrendador'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-2 ring-blue-600/20'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              Soy el Arrendador
              <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                Propietario / Quien alquila
              </span>
            </button>

            <button
              type="button"
              onClick={() => update('rolRemitente', 'arrendatario')}
              className={`min-h-[52px] p-3 text-xs rounded-xl border text-left transition-all cursor-pointer ${
                data.rolRemitente === 'arrendatario'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-2 ring-blue-600/20'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              Soy el Arrendatario
              <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                Inquilino / Quien habita
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre de Quien Remite</label>
            <input
              type="text"
              value={data.nombreRemitente}
              onChange={(e) => update('nombreRemitente', e.target.value)}
              placeholder="Ej: Carlos Alberto De La Hoz"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cédula del Remitente</label>
            <input
              type="text"
              value={data.numDocRemitente}
              onChange={(e) => update('numDocRemitente', e.target.value)}
              placeholder="Ej: 72.234.980"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre del Destinatario</label>
            <input
              type="text"
              value={data.nombreDestinatario}
              onChange={(e) => update('nombreDestinatario', e.target.value)}
              placeholder="Ej: Mauricio Javier Gómez"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cédula del Destinatario</label>
            <input
              type="text"
              value={data.numDocDestinatario}
              onChange={(e) => update('numDocDestinatario', e.target.value)}
              placeholder="Ej: 8.765.432"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dirección de Notificación</label>
            <input
              type="text"
              value={data.direccionNotificacion}
              onChange={(e) => update('direccionNotificacion', e.target.value)}
              placeholder="Ej: Calle 84 # 51B-32, Apto 804"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Inmueble y Plazos */}
      <CollapsibleSection
        title="Inmueble y Fechas Contractuales"
        subtitle="Dirección del predio y fecha de restitución de llaves"
        icon={<Home className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Dirección Exacta del Inmueble</label>
            <input
              type="text"
              value={data.direccionInmueble}
              onChange={(e) => update('direccionInmueble', e.target.value)}
              placeholder="Ej: Apartamento 804, Edificio Altos del Golf, Calle 84 # 51B-32"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ciudad</label>
            <input
              type="text"
              value={data.ciudadInmueble}
              onChange={(e) => update('ciudadInmueble', e.target.value)}
              placeholder="Ej: Barranquilla"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Matrícula Inmobiliaria (Opcional)</label>
            <input
              type="text"
              value={data.matriculaInmobiliaria}
              onChange={(e) => update('matriculaInmobiliaria', e.target.value)}
              placeholder="Ej: 040-384921"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha del Contrato Original</label>
            <input
              type="text"
              value={data.fechaContrato}
              onChange={(e) => update('fechaContrato', e.target.value)}
              placeholder="Ej: 15 de febrero de 2024"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Entrega de Llaves</label>
            <input
              type="date"
              value={data.fechaEntregaInmueble}
              onChange={(e) => update('fechaEntregaInmueble', e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-50/20 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hora de la Cita de Entrega</label>
            <input
              type="text"
              value={data.horaEntrega}
              onChange={(e) => update('horaEntrega', e.target.value)}
              placeholder="Ej: 09:30 AM"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Causal y Paz y Salvo */}
      <CollapsibleSection
        title="Causal Legal e Inspección Conjunta"
        subtitle="Motivación de no prórroga e instrucciones para inventario"
        icon={<Key className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Causal Invocada</label>
            <select
              value={data.causalInvocada}
              onChange={(e) => handleCausalChange(e.target.value)}
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Vencimiento del término contractual y preaviso ordinario">
                No renovación voluntaria ordinaria con preaviso legal (3 meses)
              </option>
              <option value="Necesidad de ocupación del inmueble para habitación propia">
                Necesidad de habitación propia (Art. 22 Ley 820/2003)
              </option>
              <option value="Demolición, reparación estructural sustancial o remodelación">
                Demolición o remodelación sustancial requerida
              </option>
              <option value="Terminación anticipada por mutuo acuerdo">
                Terminación concertada por mutuo acuerdo
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Motivación Detallada</label>
            <textarea
              rows={3}
              value={data.detalleCausal}
              onChange={(e) => update('detalleCausal', e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Instrucciones para Paz y Salvo de Servicios</label>
            <textarea
              rows={3}
              value={data.instruccionesPazSalvo}
              onChange={(e) => update('instruccionesPazSalvo', e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={data.restitucionDeposito}
              onChange={(e) => update('restitucionDeposito', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <span className="text-xs text-slate-700">Mencionar verificación de servicios y balance de depósito / garantías</span>
          </label>
        </div>
      </CollapsibleSection>
    </div>
  );
};
