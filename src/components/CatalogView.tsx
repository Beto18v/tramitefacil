import React, { useState, useMemo } from 'react';
import { DOCUMENT_CATALOG, DocumentType } from '../types/documents';
import { Hero, QuickCategoryFilter } from './Hero';
import { DocumentCard } from './DocumentCard';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

interface Props {
  onSelectDoc: (id: DocumentType) => void;
}

export const CatalogView: React.FC<Props> = ({ onSelectDoc }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<QuickCategoryFilter>('all');

  // Filtered documents by search query and category pill
  const filteredDocuments = useMemo(() => {
    let list = DOCUMENT_CATALOG;

    // Apply category pill filter
    if (activeFilter === 'laboral') {
      list = list.filter((d) => d.category === 'laboral');
    } else if (activeFilter === 'finanzas') {
      list = list.filter((d) => d.category === 'freelance' || d.category === 'comercial');
    } else if (activeFilter === 'inmobiliario') {
      list = list.filter((d) => d.category === 'inmobiliario');
    } else if (activeFilter === 'legal') {
      list = list.filter((d) => d.category === 'legal' || d.category === 'vehiculos');
    }

    // Apply text search
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter((doc) => {
        const inTitle = doc.title.toLowerCase().includes(q);
        const inDesc = doc.description.toLowerCase().includes(q);
        const inRef = doc.lawReference.toLowerCase().includes(q);
        const inCat = doc.categoryName.toLowerCase().includes(q);
        const inTags = doc.tags.some((t) => t.toLowerCase().includes(q));
        return inTitle || inDesc || inRef || inCat || inTags;
      });
    }

    return list;
  }, [searchQuery, activeFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* 1. Hero Component */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        totalResults={filteredDocuments.length}
        onSelectDoc={onSelectDoc}
      />

      {/* 2. Catalog Grid with Structured Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
            Plantillas Disponibles ({filteredDocuments.length})
          </h2>
          {(searchQuery || activeFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer min-h-[44px] flex items-center"
            >
              Restablecer filtros
            </button>
          )}
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 space-y-3 shadow-2xs">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-200">No se encontraron trámites</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              No hay documentos que coincidan con tus criterios. Intenta con otra categoría o término de búsqueda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-3 min-h-[44px] px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-xl transition cursor-pointer shadow-xs"
            >
              Ver todas las plantillas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onSelect={onSelectDoc}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. Trust & Security Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100 font-semibold">100% Privado en Cliente</strong>
            Tus datos se procesan en tu navegador sin enviar nada a servidores externos.
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100 font-semibold">Formato Formal PDF & Word</strong>
            Exportación con márgenes estándar de imprenta (2.54 cm) y tipografía legal.
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100 font-semibold">Validez y Normatividad</strong>
            Redactados conforme al Código Sustantivo del Trabajo, Civil y Comercio.
          </div>
        </div>
      </div>
    </div>
  );
};
