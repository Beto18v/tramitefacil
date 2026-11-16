import React, { useState, useMemo } from 'react';
import { CATEGORIES_CONFIG, DocumentType } from '../../types/documents';
import { DOCUMENT_CATALOG } from '../../templates';
import { DocumentCard, Hero, QuickCategoryFilter } from '../../features/catalog';
import { resolveIcon } from '../../features/catalog/documentIcons';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

interface Props {
  onSelectDoc: (id: DocumentType, customData?: any) => void;
  onOpenProfileModal?: () => void;
}

const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

export const CatalogView: React.FC<Props> = ({ onSelectDoc, onOpenProfileModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<QuickCategoryFilter>('all');

  // Filtered documents by search query and sector pill
  const filteredDocuments = useMemo(() => {
    let list = DOCUMENT_CATALOG;

    // Apply sector pill filter
    if (activeFilter !== 'all') {
      list = list.filter((d) => d.category === activeFilter);
    }

    // Apply text search (accent-insensitive: "contrato" matches "contrató")
    const q = normalizeText(searchQuery);
    if (q) {
      list = list.filter((doc) => {
        const sector = CATEGORIES_CONFIG.find((c) => c.id === doc.category);
        const haystacks = [
          doc.title,
          doc.description,
          doc.lawReference,
          doc.categoryName,
          sector?.name ?? '',
          ...doc.tags,
        ];
        return haystacks.some((field) => normalizeText(field).includes(q));
      });
    }

    return list;
  }, [searchQuery, activeFilter]);

  // Group visible documents by sector, in the decided taxonomy order
  const documentGroups = useMemo(
    () =>
      CATEGORIES_CONFIG.map((config) => ({
        config,
        documents: filteredDocuments.filter((d) => d.category === config.id),
      })).filter((group) => group.documents.length > 0),
    [filteredDocuments]
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
      {/* 1. Sleek Compact Command Bar & Search */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        totalResults={filteredDocuments.length}
        onSelectDoc={onSelectDoc}
        onOpenProfileModal={onOpenProfileModal}
      />

      {/* 2. Catalog Grid with Structured Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {activeFilter === 'all'
                ? `Todos los Trámites Disponibles (${filteredDocuments.length})`
                : `Trámites de ${CATEGORIES_CONFIG.find((c) => c.id === activeFilter)?.name || ''} (${filteredDocuments.length})`}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Selecciona una plantilla para comenzar a completar información
            </p>
          </div>

          {(searchQuery || activeFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition cursor-pointer min-h-[44px] flex items-center px-2"
            >
              Restablecer filtros
            </button>
          )}
        </div>

        {/* Empty Search State */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto my-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 mx-auto flex items-center justify-center border border-slate-700">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              No encontramos trámites para "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Intenta buscar por palabras clave como "renuncia", "arriendo", "petición", "vehículo" o selecciona otro sector.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="min-h-[44px] px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                Ver todos los trámites
              </button>
            </div>
          </div>
        ) : activeFilter === 'all' && !searchQuery ? (
          /* Sector Grouped Display */
          <div className="space-y-8">
            {documentGroups.map(({ config, documents }) => {
              const SectorIcon = resolveIcon(config.icon);
              return (
                <section key={config.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center border border-slate-700 shrink-0">
                        <SectorIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          {config.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 hidden sm:block">
                          {config.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                      {documents.length} {documents.length === 1 ? 'trámite' : 'trámites'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                      <DocumentCard
                        key={doc.id}
                        document={doc}
                        onSelect={onSelectDoc}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* Flat Grid for Filtered / Searched Results */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* 3. Bottom Trust & Official Framework Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-200 block">
              Validez Jurídica Garantizada para Colombia
            </span>
            <span className="text-[11px] text-slate-400">
              Plantillas redactadas bajo los estándares de la Constitución Política y Códigos Sustantivos de Colombia.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-400 shrink-0 font-medium bg-emerald-950/40 border border-emerald-900/60 px-3 py-1.5 rounded-xl">
          <Lock className="w-3.5 h-3.5" />
          <span>Privacidad 100% en tu dispositivo</span>
        </div>
      </div>
    </div>
  );
};
