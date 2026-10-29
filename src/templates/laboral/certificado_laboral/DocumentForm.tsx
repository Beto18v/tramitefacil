import React from 'react';
import { CertificadoLaboralData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { CollapsibleSection } from '../../../components/forms/CollapsibleSection';
import { InputField, SelectField, SwitchField } from '../../../components/ui';
import { PiCertificate, PiBuildings, PiUser } from 'react-icons/pi';

export const DocumentForm: React.FC<DocumentFormProps<CertificadoLaboralData>> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof CertificadoLaboralData>(key: K, val: CertificadoLaboralData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const tipoDocumentoOptions = [
    { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía (C.C.)' },
    { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería (C.E.)' },
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos de la Empresa */}
      <CollapsibleSection
        step="Paso 01"
        title="Empresa y Área Destinataria"
        subtitle="Entidad a la que se solicita la constancia"
        icon={<PiBuildings className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Nombre de la Empresa"
              value={data.nombreEmpresa}
              onChange={(e) => update('nombreEmpresa', e.target.value)}
              placeholder="Ej: BANCO DE COMERCIO Y FINANZAS S.A."
              required
            />
          </div>

          <InputField
            label="Área o Departamento"
            value={data.destinatarioArea}
            onChange={(e) => update('destinatarioArea', e.target.value)}
            placeholder="Ej: Gerencia de Gestión Humana"
          />

          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Ciudad"
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

      {/* 2. Datos del Empleado */}
      <CollapsibleSection
        step="Paso 02"
        title="Tus Datos y Cargo Laborado"
        subtitle="Nombre, documento y tiempo de servicios"
        icon={<PiUser className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <InputField
              label="Tu Nombre Completo"
              value={data.nombreTrabajador}
              onChange={(e) => update('nombreTrabajador', e.target.value)}
              placeholder="Ej: Paula Andrea Méndez Salazar"
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
            label="Número de Cédula"
            value={data.numeroDocumento}
            onChange={(e) => update('numeroDocumento', e.target.value)}
            placeholder="Ej: 52.987.654"
            required
          />

          <InputField
            label="Cargo Desempeñado"
            value={data.cargoDesempenado}
            onChange={(e) => update('cargoDesempenado', e.target.value)}
            placeholder="Ej: Especialista de Crédito y Cartera"
            required
          />

          <InputField
            label="Período de Trabajo"
            value={data.periodoTrabajado}
            onChange={(e) => update('periodoTrabajado', e.target.value)}
            placeholder="Ej: 15 de enero de 2021 a la fecha"
            required
          />
        </div>
      </CollapsibleSection>

      {/* 3. Requerimientos del Certificado */}
      <CollapsibleSection
        step="Paso 03"
        title="Opciones y Destino del Certificado"
        subtitle="Salario, funciones y correo para recepción"
        icon={<PiCertificate className="w-5 h-5 text-indigo-600" />}
        defaultOpen={true}
      >
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-semibold text-slate-800 block mb-1">
              Campos requeridos en el certificado:
            </span>
            <SwitchField
              label="Incluir monto de salario básico y tipo de remuneración"
              checked={data.incluirSalario}
              onChange={(checked) => update('incluirSalario', checked)}
            />
            <SwitchField
              label="Incluir descripción de funciones principales"
              checked={data.incluirFunciones}
              onChange={(checked) => update('incluirFunciones', checked)}
            />
          </div>

          <InputField
            label="Motivo de la Solicitud"
            value={data.motivoSolicitud}
            onChange={(e) => update('motivoSolicitud', e.target.value)}
            placeholder="Ej: Solicitud de crédito de vivienda / Trámite de visa"
          />

          <InputField
            label="Correo Electrónico para Entrega"
            type="email"
            value={data.correoEntrega}
            onChange={(e) => update('correoEntrega', e.target.value)}
            placeholder="Ej: mi.correo@ejemplo.com"
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};
