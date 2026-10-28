import React from 'react';
import { PropuestaServiciosData } from '../../../types/documents';
import {
  InputField,
  CurrencyField,
  TextareaField,
  RepeaterField,
} from '../../../components/ui';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { User, Building, FileSpreadsheet, DollarSign, Clock } from 'lucide-react';

export interface PropuestaServiciosFormProps {
  data: PropuestaServiciosData;
  onChange: (updated: PropuestaServiciosData) => void;
}

export const DocumentForm: React.FC<PropuestaServiciosFormProps> = ({ data, onChange }) => {
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
        title="1. Tus Datos (Proponente / Profesional)"
        icon={<User className="w-4 h-4 text-blue-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            label="Nombre del Consultor / Proponente"
            value={data.nombreProponente}
            onChange={(e) => update('nombreProponente', e.target.value)}
            placeholder="Ej: Santiago Restrepo Cadavid"
            required
            containerClassName="sm:col-span-2"
          />
          <InputField
            label="Profesión o Especialidad"
            value={data.profesionProponente}
            onChange={(e) => update('profesionProponente', e.target.value)}
            placeholder="Ej: Consultor Senior en Cloud & Dev"
          />
          <InputField
            label="Identificación / Cédula / NIT"
            value={data.identificacionProponente}
            onChange={(e) => update('identificacionProponente', e.target.value)}
            placeholder="Ej: CC 1.037.654.890"
          />
          <InputField
            label="Teléfono de Contacto"
            value={data.telefonoProponente}
            onChange={(e) => update('telefonoProponente', e.target.value)}
            placeholder="Ej: +57 315 889 0012"
          />
          <InputField
            label="Correo Electrónico"
            type="email"
            value={data.correoProponente}
            onChange={(e) => update('correoProponente', e.target.value)}
            placeholder="Ej: santiago@empresa.com"
          />
        </div>
      </CollapsibleSection>

      {/* 2. Datos del Cliente y Emisión */}
      <CollapsibleSection
        title="2. Datos del Cliente y Emisión"
        icon={<Building className="w-4 h-4 text-blue-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            label="Nombre del Cliente o Contacto"
            value={data.nombreCliente}
            onChange={(e) => update('nombreCliente', e.target.value)}
            placeholder="Ej: Lic. Mariana Botero"
            required
          />
          <InputField
            label="Empresa o Razón Social"
            value={data.empresaCliente}
            onChange={(e) => update('empresaCliente', e.target.value)}
            placeholder="Ej: Logística Integral S.A.S."
          />
          <InputField
            label="Cargo del Contacto"
            value={data.cargoCliente}
            onChange={(e) => update('cargoCliente', e.target.value)}
            placeholder="Ej: Gerente de Operaciones"
          />
          <InputField
            label="Ciudad de Emisión"
            value={data.ciudad}
            onChange={(e) => update('ciudad', e.target.value)}
            placeholder="Ej: Medellín"
          />
          <InputField
            label="Fecha de la Propuesta"
            type="date"
            value={data.fecha}
            onChange={(e) => update('fecha', e.target.value)}
          />
          <InputField
            label="Validez de la Oferta (días)"
            type="number"
            value={data.validezDias}
            onChange={(e) => update('validezDias', parseInt(e.target.value, 10) || 15)}
          />
        </div>
      </CollapsibleSection>

      {/* 3. Definición del Proyecto y Alcance */}
      <CollapsibleSection
        title="3. Proyecto, Objetivo y Alcance"
        icon={<FileSpreadsheet className="w-4 h-4 text-blue-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <InputField
            label="Título de la Propuesta o Proyecto"
            value={data.tituloProyecto}
            onChange={(e) => update('tituloProyecto', e.target.value)}
            placeholder="Ej: Modernización del Sistema de Despachos"
            required
          />
          <TextareaField
            label="Objetivo General del Servicio"
            value={data.objetivoGeneral}
            onChange={(e) => update('objetivoGeneral', e.target.value)}
            placeholder="Ej: Implementar una solución tecnológica web que automatice el registro de pedidos..."
            rows={2}
            required
          />
          <TextareaField
            label="Alcance Detallado y Metodología"
            value={data.alcanceDetallado}
            onChange={(e) => update('alcanceDetallado', e.target.value)}
            placeholder="Detalla las fases, actividades y tareas técnicas incluidas..."
            rows={4}
            required
          />
        </div>
      </CollapsibleSection>

      {/* 4. Lista de Entregables */}
      <CollapsibleSection
        title="4. Entregables Principales"
        icon={<Clock className="w-4 h-4 text-blue-600" />}
        defaultOpen={true}
      >
        <RepeaterField
          label="Hitos y Entregables Tangibles"
          items={data.entregables}
          onAdd={handleAddEntregable}
          onUpdate={handleUpdateEntregable}
          onRemove={handleRemoveEntregable}
          itemPrefix="Entregable #"
          addButtonText="Añadir Otro Entregable"
          placeholder="Ej: Documento de Arquitectura / Versión Alfa / Manual de Usuario"
        />
      </CollapsibleSection>

      {/* 5. Inversión y Cronograma */}
      <CollapsibleSection
        title="5. Honorarios, Pagos y Cronograma"
        icon={<DollarSign className="w-4 h-4 text-blue-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CurrencyField
              label="Honorarios Totales Propuestos (COP)"
              value={data.honorariosTotales}
              onChange={(val) => update('honorariosTotales', val)}
              required
            />
            <InputField
              label="Tiempo Estimado de Ejecución"
              value={data.cronogramaSemanas}
              onChange={(e) => update('cronogramaSemanas', e.target.value)}
              placeholder="Ej: 6 semanas calendario"
            />
          </div>

          <TextareaField
            label="Esquema y Forma de Pago"
            value={data.formaDePago}
            onChange={(e) => update('formaDePago', e.target.value)}
            placeholder="Ej: 50% de anticipo al inicio y 50% contra entrega final a satisfacción..."
            rows={2}
          />

          <TextareaField
            label="Exclusiones y Condiciones Generales"
            value={data.exclusionesYCondiciones}
            onChange={(e) => update('exclusionesYCondiciones', e.target.value)}
            placeholder="Ej: No incluye costos de licencias de terceros, hosting..."
            rows={2}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

