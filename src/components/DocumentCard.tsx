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
  Zap,
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
        return <Receipt className="w-5 h-5 text-slate-700" />;
      case 'propuesta_servicios':
        return <DollarSign className="w-5 h-5 text-slate-700" />;
      case 'contrato_prestacion':
        return <FileText className="w-5 h-5 text-slate-700" />;
      case 'carta_renuncia':
        return <Briefcase className="w-5 h-5 text-slate-700" />;
      case 'certificado_laboral':
        return <UserCheck className="w-5 h-5 text-slate-700" />;
      case 'permiso_laboral':
        return <Briefcase className="w-5 h-5 text-slate-700" />;
      case 'contrato_arrendamiento':
        return <Home className="w-5 h-5 text-slate-700" />;
      case 'no_renovacion_arriendo':
        return <Key className="w-5 h-5 text-slate-700" />;
      case 'acta_entrega':
        return <Home className="w-5 h-5 text-slate-700" />;
      case 'derecho_peticion':
        return <Scale className="w-5 h-5 text-slate-700" />;
      case 'poder_autorizacion':
        return <FileText className="w-5 h-5 text-slate-700" />;
      case 'habeas_data':
        return <Scale className="w-5 h-5 text-slate-700" />;
      case 'acuerdo_nda':
        return <FileText className="w-5 h-5 text-slate-700" />;
      case 'compraventa_vehiculo':
        return <FileText className="w-5 h-5 text-slate-700" />;
      case 'autorizacion_patios':
        return <Key className="w-5 h-5 text-slate-700" />;
      default:
        return <FileText className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(document.id)}
      className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div className="space-y-4">
        {/* Top bar: Circular icon + Time badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            {renderIcon()}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-full">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>{document.estimatedMinutes || '⚡ 2 min'}</span>
          </span>
        </div>

        {/* Title and description */}
        <div>
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug tracking-tight">
            {document.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {document.description}
          </p>
        </div>

        {/* Legal validity badge */}
        <div className="pt-1">
          <span className="inline-block text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-md truncate max-w-full">
            {document.lawReference}
          </span>
        </div>
      </div>

      {/* Action button */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium">
          {document.categoryName}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(document.id);
          }}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors cursor-pointer"
        >
          <span>Redactar documento</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
