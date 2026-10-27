import React, { useState, useMemo } from 'react';
import {
  DOCUMENT_CATALOG,
  CATEGORIES_CONFIG,
  DocumentType,
  DocumentCategory,
} from '../types/documents';
import {
  Search,
  Briefcase,
  Building2,
  Home,
  Scale,
  Folder,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Receipt,
  FileSpreadsheet,
  ScrollText,
  UserMinus,
  Award,
  CalendarClock,
  KeyRound,
  ClipboardCheck,
  FileText,
  Fingerprint,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  onSelectDoc: (id: DocumentType) => void;
}

export const CatalogView: React.FC<Props> = ({ onSelectDoc }) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const renderIcon = (name: string, className: string = 'w-5 h-5') => {
    switch (name) {
      case 'Receipt':
        return <Receipt className={className} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className={className} />;
      case 'ScrollText':
        return <ScrollText className={className} />;
      case 'UserMinus':
        return <UserMinus className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'CalendarClock':
        return <CalendarClock className={className} />;
      case 'Home':
        return <Home className={className} />;
      case 'KeyRound':
        return <KeyRound className={className} />;
      case 'ClipboardCheck':
        return <ClipboardCheck className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'Fingerprint':
        return <Fingerprint className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  const getCategoryIcon = (cat: DocumentCategory | 'all') => {
    switch (cat) {
      case 'freelance':
        return <Briefcase className="w-4 h-4" />;
      case 'laboral':
        return <Building2 className="w-4 h-4" />;
      case 'inmobiliario':
        return <Home className="w-4 h-4" />;
      case 'legal':
        return <Scale className="w-4 h-4" />;
      default:
        return <Folder className="w-4 h-4" />;
    }
  };

  // Filter documents
  const filteredDocs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DOCUMENT_CATALOG.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      if (!matchCategory) return false;
      if (!q) return true;

      const inTitle = doc.title.toLowerCase().includes(q);
      const inDesc = doc.description.toLowerCase().includes(q);
      const inRef = doc.lawReference.toLowerCase().includes(q);
      const inTags = doc.tags.some((t) => t.toLowerCase().includes(q));
      return inTitle || inDesc || inRef || inTags;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-in fade-in duration-150">
      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide text-blue-100 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Offline · Sin registro · Privacidad Total
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Generador Instantáneo de Documentos Legales
          </h1>
          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            Elige tu trámite, completa los campos guiados y descarga al instante tu documento formal en PDF o Word (.docx) listo para imprimir y firmar.
          </p>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        {/* Search Input (Touch Target >= 44px) */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar trámite por nombre o palabra clave (ej. cuenta de cobro, renuncia, arriendo, derecho de petición)..."
            className="w-full min-h-[48px] pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-xs transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-700 min-h-[44px] min-w-[44px] justify-center"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Category Tabs (Touch friendly >= 44px) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_CONFIG.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? DOCUMENT_CATALOG.length
                : DOCUMENT_CATALOG.filter((d) => d.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <p className="text-base font-semibold text-slate-800">No se encontraron trámites</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No hay documentos que coincidan con &quot;{searchQuery}&quot;. Intenta con términos generales como &quot;cobro&quot;, &quot;trabajo&quot; o &quot;contrato&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 min-h-[44px] px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
          >
            Ver todos los documentos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDoc(doc.id)}
              className="group bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between cursor-pointer active:scale-[0.99]"
            >
              <div className="space-y-3">
                {/* Category kicker & icon */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {renderIcon(doc.iconName)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    {doc.categoryName}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Footer legal reference & Action button */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 truncate max-w-[200px]" title={doc.lawReference}>
                  {doc.lawReference}
                </span>
                <span className="min-h-[44px] inline-flex items-center gap-1.5 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Crear <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust & Features Footer Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong className="block text-slate-900 font-semibold">100% en tu navegador</strong>
            Tus datos personales nunca viajan a servidores externos.
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <strong className="block text-slate-900 font-semibold">Descarga PDF y Word (.docx)</strong>
            Archivos nativos listos para enviar por correo o editar.
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong className="block text-slate-900 font-semibold">PWA Instalable</strong>
            Accede en cualquier momento desde tu pantalla de inicio móvil.
          </div>
        </div>
      </div>
    </div>
  );
};
