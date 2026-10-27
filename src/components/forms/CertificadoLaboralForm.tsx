import React from 'react';
import { CertificadoLaboralData } from '../../types/documents';
import { CollapsibleSection } from './CollapsibleSection';
import { User, Building, Award } from 'lucide-react';

interface Props {
  data: CertificadoLaboralData;
  onChange: (updated: CertificadoLaboralData) => void;
}

export const CertificadoLaboralForm: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof CertificadoLaboralData>(key: K, val: CertificadoLaboralData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Datos de la Empresa */}
      <CollapsibleSection
        title="Empresa y Área Destinataria"
        subtitle="Entidad a la que se solicita la constancia"
        icon={<Building className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre de la Empresa</label>
            <input
              type="text"
              value={data.nombreEmpresa}
              onChange={(e) => update('nombreEmpresa', e.target.value)}
              placeholder="Ej: BANCO DE COMERCIO Y FINANZAS S.A."
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Área o Departamento</label>
            <input
              type="text"
              value={data.destinatarioArea}
              onChange={(e) => update('destinatarioArea', e.target.value)}
              placeholder="Ej: Gerencia de Gestión Humana"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ciudad y Fecha</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={data.ciudad}
                onChange={(e) => update('ciudad', e.target.value)}
                placeholder="Ciudad"
                className="w-1/2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-xl"
              />
              <input
                type="date"
                value={data.fecha}
                onChange={(e) => update('fecha', e.target.value)}
                className="w-1/2 min-h-[44px] text-xs px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Datos del Empleado */}
      <CollapsibleSection
        title="Tus Datos y Cargo Laborado"
        subtitle="Nombre, documento y tiempo de servicios"
        icon={<User className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tu Nombre Completo</label>
            <input
              type="text"
              value={data.nombreTrabajador}
              onChange={(e) => update('nombreTrabajador', e.target.value)}
              placeholder="Ej: Paula Andrea Méndez Salazar"
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
              <option value="Cédula de Ciudadanía">Cédula de Ciudadanía (C.C.)</option>
              <option value="Cédula de Extranjería">Cédula de Extranjería (C.E.)</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Número de Cédula</label>
            <input
              type="text"
              value={data.numeroDocumento}
              onChange={(e) => update('numeroDocumento', e.target.value)}
              placeholder="Ej: 52.987.654"
              className="w-full min-h-[44px] text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cargo Desempeñado</label>
            <input
              type="text"
              value={data.cargoDesempenado}
              onChange={(e) => update('cargoDesempenado', e.target.value)}
              placeholder="Ej: Especialista de Crédito y Cartera"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Período de Trabajo</label>
            <input
              type="text"
              value={data.periodoTrabajado}
              onChange={(e) => update('periodoTrabajado', e.target.value)}
              placeholder="Ej: 15 de enero de 2021 a la fecha"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Requerimientos del Certificado */}
      <CollapsibleSection
        title="Opciones y Destino del Certificado"
        subtitle="Salario, funciones y correo para recepción"
        icon={<Award className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-semibold text-slate-800 block mb-1">Campos requeridos en el certificado:</span>
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.incluirSalario}
                onChange={(e) => update('incluirSalario', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="text-xs text-slate-700">Incluir monto de salario básico y tipo de remuneración</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={data.incluirFunciones}
                onChange={(e) => update('incluirFunciones', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="text-xs text-slate-700">Incluir descripción de funciones principales</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Motivo de la Solicitud</label>
            <input
              type="text"
              value={data.motivoSolicitud}
              onChange={(e) => update('motivoSolicitud', e.target.value)}
              placeholder="Ej: Solicitud de crédito de vivienda / Trámite de visa"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo Electrónico para Entrega</label>
            <input
              type="email"
              value={data.correoEntrega}
              onChange={(e) => update('correoEntrega', e.target.value)}
              placeholder="Ej: mi.correo@ejemplo.com"
              className="w-full min-h-[44px] text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
