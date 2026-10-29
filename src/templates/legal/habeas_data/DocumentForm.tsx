import React from 'react';
import { HabeasDataData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { InputField, SelectField, TextareaField } from '../../../components/ui';
import { PiBuildings, PiPlus, PiShieldWarning, PiTrash, PiUser } from 'react-icons/pi';

export const DocumentForm: React.FC<DocumentFormProps<HabeasDataData>> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof HabeasDataData>(key: K, val: HabeasDataData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const handleAddAnexo = () => {
    update('anexosDocumentales', [...(data.anexosDocumentales || []), '']);
  };

  const handleUpdateAnexo = (idx: number, val: string) => {
    const list = [...(data.anexosDocumentales || [])];
    list[idx] = val;
    update('anexosDocumentales', list);
  };

  const handleRemoveAnexo = (idx: number) => {
    update(
      'anexosDocumentales',
      (data.anexosDocumentales || []).filter((_, i) => i !== idx)
    );
  };

  const centralOptions = [
    { value: 'DataCrédito Experian', label: 'DataCrédito Experian' },
    { value: 'TransUnion / CIFIN', label: 'TransUnion / CIFIN' },
    { value: 'Procrédito', label: 'Procrédito (Fenalco)' },
    { value: 'Entidad Financiera Directa', label: 'Entidad Financiera Directa (Banco / Operador)' },
  ];

  const causalOptions = [
    { value: 'caducidad', label: 'Caducidad del dato negativo (Término máximo legal de 8 años)' },
    { value: 'pago_total', label: 'Pago total y extinción de la mora con término cumplido' },
    { value: 'suplantacion', label: 'Suplantación de identidad / Fraude no reconocido' },
    { value: 'inexistencia', label: 'Inexistencia de la relación contractual o reporte erróneo' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Central de Riesgo y Entidad Fuente */}
      <CollapsibleSection
        step="Paso 01"
        title="Central de Riesgo y Fuente"
        subtitle="DataCrédito, TransUnion/CIFIN o Procrédito"
        icon={<PiBuildings className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <SelectField
              label="Central de Riesgo Destinataria"
              value={data.centralDeRiesgo}
              options={centralOptions}
              onChange={(e) =>
                update('centralDeRiesgo', e.target.value as HabeasDataData['centralDeRiesgo'])
              }
              required
            />
          </div>

          <div>
            <InputField
              label="Entidad Fuente que Reportó"
              value={data.entidadReportante}
              onChange={(e) => update('entidadReportante', e.target.value)}
              placeholder="Ej: BANCO MULTISERVICIOS S.A."
              required
            />
          </div>

          <div>
            <InputField
              label="N° de Obligación / Crédito"
              value={data.numeroObligacion}
              onChange={(e) => update('numeroObligacion', e.target.value)}
              placeholder="Ej: Obligación N° 4589-0021-998"
              className="font-mono"
              required
            />
          </div>

          <div>
            <InputField
              label="Ciudad del Trámite"
              value={data.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              placeholder="Ej: Bogotá D.C."
            />
          </div>

          <div>
            <InputField
              label="Fecha"
              type="date"
              value={data.fecha}
              onChange={(e) => update('fecha', e.target.value)}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Causal y Hechos */}
      <CollapsibleSection
        step="Paso 02"
        title="Causal Legal de Habeas Data y Hechos"
        subtitle="Caducidad, suplantación, pago o inexistencia"
        icon={<PiShieldWarning className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div>
            <SelectField
              label="Causal Concreta Invocada"
              value={data.causalSolicitud}
              options={causalOptions}
              onChange={(e) =>
                update('causalSolicitud', e.target.value as HabeasDataData['causalSolicitud'])
              }
              required
            />
          </div>

          <div>
            <TextareaField
              label="Narración Detallada de los Hechos"
              rows={4}
              value={data.hechosDetallados}
              onChange={(e) => update('hechosDetallados', e.target.value)}
              placeholder="Indique las fechas de adquisición, mora, pago o por qué opera la caducidad del reporte..."
              helperText="Fundamente con fechas y antecedentes verídicos."
              required
            />
          </div>

          <div>
            <InputField
              label="Pretensión Concreta"
              value={data.pretensionConcreta}
              onChange={(e) => update('pretensionConcreta', e.target.value)}
              placeholder="Ej: Se ordene la eliminación inmediata del reporte negativo histórico..."
              required
            />
          </div>

          {/* Anexos */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Pruebas y Anexos Documentales:
              </label>
              <button
                type="button"
                onClick={handleAddAnexo}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <PiPlus className="w-3.5 h-3.5" /> Agregar anexo
              </button>
            </div>
            {(data.anexosDocumentales || []).map((anexo, idx) => (
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
                  aria-label={`Eliminar anexo ${idx + 1}`}
                >
                  <PiTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Datos del Titular y Notificación */}
      <CollapsibleSection
        step="Paso 03"
        title="Datos del Titular y Notificaciones"
        subtitle="Nombre, documento y canal para recibir la respuesta"
        icon={<PiUser className="w-5 h-5 text-indigo-600" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre Completo del Titular"
              value={data.nombreTitular}
              onChange={(e) => update('nombreTitular', e.target.value)}
              placeholder="Ej: Rodrigo Alberto Herrera Gómez"
              required
            />
          </div>

          <div>
            <InputField
              label="Número de Cédula"
              value={data.numDocTitular}
              onChange={(e) => update('numDocTitular', e.target.value)}
              placeholder="Ej: 80.456.789"
              className="font-mono"
              required
            />
          </div>

          <div>
            <InputField
              label="Expedida en"
              value={data.expedicionTitular}
              onChange={(e) => update('expedicionTitular', e.target.value)}
              placeholder="Ej: Bogotá D.C."
            />
          </div>

          <div>
            <InputField
              label="Correo Electrónico (Para respuesta)"
              type="email"
              value={data.correoTitular}
              onChange={(e) => update('correoTitular', e.target.value)}
              placeholder="Ej: rodrigoh@email.com"
              required
            />
          </div>

          <div>
            <InputField
              label="Teléfono"
              value={data.telefonoTitular}
              onChange={(e) => update('telefonoTitular', e.target.value)}
              placeholder="Ej: +57 310 987 6543"
            />
          </div>

          <div className="sm:col-span-2">
            <InputField
              label="Dirección Física de Residencia"
              value={data.direccionNotificacion}
              onChange={(e) => update('direccionNotificacion', e.target.value)}
              placeholder="Ej: Calle 134 # 15-28, Bogotá D.C."
              required
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
