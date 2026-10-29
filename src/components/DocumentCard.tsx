import React from 'react';
import { DocumentMeta, DocumentType } from '../types/documents';
import {
  Receipt,
  DollarSign,
  Briefcase,
  UserCheck,
  Home,
  Key,
  Scale,
  FileText,
  ArrowRight,
  Clock,
  Car,
} from 'lucide-react';

interface Props {
  document: DocumentMeta;
  onSelect: (id: DocumentType) => void;
}

export const DocumentCard: React.FC<Props> = ({ document, onSelect }) => {
  // Select icon based on document ID or category
  const renderIcon = () => {
    switch (document.id) {
      case 'cuenta_cobro':
        return <Receipt className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'propuesta_servicios':
        return <DollarSign className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'contrato_prestacion':
        return <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'carta_renuncia':
        return <Briefcase className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'certificado_laboral':
        return <UserCheck className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'permiso_laboral':
        return <Briefcase className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'contrato_arrendamiento':
        return <Home className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'no_renovacion_arriendo':
        return <Key className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'acta_entrega':
        return <Home className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'derecho_peticion':
        return <Scale className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'poder_autorizacion':
        return <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'habeas_data':
        return <Scale className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'acuerdo_nda':
        return <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'compraventa_vehiculo':
        return <Car className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'autorizacion_patios':
        return <Car className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      default:
        return <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(document.id)}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-2xs hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div className="space-y-4">
        {/* Top bar: Circular icon + Time badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700 transition-colors">
            {renderIcon()}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            <span>{document.estimatedMinutes || '2 min'}</span>
          </span>
        </div>

        {/* Title and description */}
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug tracking-tight">
            {document.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {document.description}
          </p>
        </div>

        {/* Legal validity badge */}
        <div className="pt-1">
          <span className="inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/80 px-2 py-0.5 rounded-md truncate max-w-full">
            {document.lawReference}
          </span>
        </div>
      </div>

      {/* Action button */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          {document.categoryName}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(document.id);
          }}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors cursor-pointer"
        >
          <span>Redactar documento</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
