import React, { useState } from 'react';
import {
  PiMagnifyingGlass,
  PiBriefcase,
  PiCurrencyDollar,
  PiHouse,
  PiScales,
  PiSlidersHorizontal,
  PiSparkle,
} from 'react-icons/pi';
import { DocumentType } from '../types/documents';
import { AiDocumentSuggester } from './AiDocumentSuggester';

export type QuickCategoryFilter =
  | 'all'
  | 'laboral'
  | 'finanzas'
  | 'inmobiliario'
  | 'legal';

export type SearchMode = 'standard' | 'assistant';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: QuickCategoryFilter;
  onFilterChange: (filter: QuickCategoryFilter) => void;
  totalResults: number;
  onSelectDoc?: (id: DocumentType) => void;
  defaultMode?: SearchMode;
}

export const Hero: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalResults,
  onSelectDoc,
  defaultMode = 'standard',
}) => {
  const [searchMode, setSearchMode] = useState<SearchMode>(defaultMode);

  const categoryPills: {
    id: QuickCategoryFilter;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'all', label: 'Todos', icon: <PiSlidersHorizontal className="w-3.5 h-3.5" /> },
    { id: 'laboral', label: 'Laboral', icon: <PiBriefcase className="w-3.5 h-3.5" /> },
    { id: 'finanzas', label: 'Finanzas & Honorarios', icon: <PiCurrencyDollar className="w-3.5 h-3.5" /> },
    { id: 'inmobiliario', label: 'Inmobiliario', icon: <PiHouse className="w-3.5 h-3.5" /> },
    { id: 'legal', label: 'Legal & Peticiones', icon: <PiScales className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      {/* Title & Subtitle */}
      <div className="max-w-3xl space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
          Generador de Documentos & Trámites Legales
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          Redacta, personaliza y descarga documentos formales en segundos. 100% privado en tu navegador.
        </p>
      </div>

      {/* Mode Selector Tabs: [ 🔍 Buscar por nombre ] vs [ ✨ Describir mi caso con IA ] */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="inline-flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setSearchMode('standard')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              searchMode === 'standard'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PiMagnifyingGlass className="w-4 h-4 text-slate-500" />
            <span>Buscar por nombre</span>
          </button>
          <button
            type="button"
            onClick={() => setSearchMode('assistant')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              searchMode === 'assistant'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PiSparkle className="w-4 h-4 text-blue-200" />
            <span>Describir mi caso con IA</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider bg-blue-700 text-white ml-1">
              Asistente
            </span>
          </button>
        </div>

        {searchMode === 'standard' && (
          <span className="text-xs font-mono text-slate-400 hidden md:inline">
            {totalResults} plantilla{totalResults !== 1 ? 's' : ''} disponible{totalResults !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Mode 1: Standard Search & Category Pills */}
      {searchMode === 'standard' ? (
        <div className="space-y-6">
          {/* Prominent Universal Search Bar */}
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <PiMagnifyingGlass className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por trámite o palabra clave (ej. 'renuncia', 'arriendo', 'retención', 'nda')..."
              className="w-full min-h-[48px] pl-11 pr-12 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200/80 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-700 min-h-[44px] min-w-[44px] justify-center cursor-pointer font-medium"
              >
                Borrar
              </button>
            )}
          </div>

          {/* Category Pills Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
              Categorías:
            </span>
            {categoryPills.map((pill) => {
              const isActive = activeFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => onFilterChange(pill.id)}
                  className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-semibold'
                      : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-slate-200/80'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>{pill.icon}</span>
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Mode 2: AI Document Suggester & Router */
        <AiDocumentSuggester onSelectDoc={onSelectDoc} />
      )}
    </div>
  );
};
