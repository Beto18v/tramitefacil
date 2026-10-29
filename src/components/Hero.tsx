import React, { useState } from 'react';
import {
  Search,
  Briefcase,
  DollarSign,
  Home,
  Scale,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PenTool,
} from 'lucide-react';
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
    { id: 'all', label: 'Todos', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
    { id: 'laboral', label: 'Laboral', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'finanzas', label: 'Finanzas & Honorarios', icon: <DollarSign className="w-3.5 h-3.5" /> },
    { id: 'inmobiliario', label: 'Inmobiliario', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'legal', label: 'Legal & Peticiones', icon: <Scale className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6 transition-colors">
      {/* Title & Subtitle */}
      <div className="max-w-3xl space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          Generador de Documentos & Trámites Legales
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          Redacta, personaliza y descarga documentos formales en segundos. 100% privado en tu navegador.
        </p>
      </div>

      {/* 3-Step Value Onboarding Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-xs">
            1
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Elige tu trámite</span>
              <ArrowRight className="w-3 h-3 text-indigo-400 dark:text-slate-400 hidden lg:inline" />
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">15+ formatos colombianos vigentes</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 border-t md:border-t-0 md:border-l border-slate-200/60 dark:border-slate-800">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-xs">
            2
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Completa o autollena</span>
              <PenTool className="w-3 h-3 text-indigo-400 dark:text-slate-500 hidden lg:inline" />
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Autocompleta con 1 clic tus datos</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 border-t md:border-t-0 md:border-l border-slate-200/60 dark:border-slate-800">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-xs">
            3
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Descarga PDF o Word</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400 hidden lg:inline" />
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Listo para imprimir o firmar</p>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs: [ Buscar por nombre ] vs [ Describir mi caso con IA ] */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setSearchMode('standard')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              searchMode === 'standard'
                ? 'bg-white dark:bg-slate-900 text-indigo-950 dark:text-slate-100 shadow-xs border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-100'
            }`}
          >
            <Search className="w-4 h-4 text-indigo-600 dark:text-slate-400" />
            <span>Buscar por nombre</span>
          </button>
          <button
            type="button"
            onClick={() => setSearchMode('assistant')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              searchMode === 'assistant'
                ? 'bg-indigo-600 dark:bg-white text-white dark:text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-200 dark:text-slate-600" />
            <span>Describir mi caso con IA</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-1 ${
                searchMode === 'assistant'
                  ? 'bg-indigo-700 dark:bg-slate-200 text-white dark:text-slate-800'
                  : 'bg-indigo-100 dark:bg-slate-700 text-indigo-800 dark:text-slate-300'
              }`}
            >
              Asistente
            </span>
          </button>
        </div>

        {searchMode === 'standard' && (
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 hidden md:inline">
            {totalResults} plantilla{totalResults !== 1 ? 's' : ''} disponible{totalResults !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Mode 1: Standard Search & Category Pills */}
      {searchMode === 'standard' ? (
        <div className="space-y-6">
          {/* Prominent Universal Search Bar */}
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <Search className="w-5 h-5 text-indigo-600/70 dark:text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por trámite o palabra clave (ej. 'renuncia', 'arriendo', 'retención', 'nda')..."
              className="w-full min-h-[48px] pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-slate-400 focus:border-transparent transition shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-slate-300 min-h-[44px] min-w-[44px] justify-center cursor-pointer font-medium"
              >
                Borrar
              </button>
            )}
          </div>

          {/* Category Pills Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1 hidden sm:inline">
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
                      ? 'bg-indigo-600 text-white dark:bg-white dark:text-slate-900 shadow-xs font-semibold border-indigo-600 dark:border-white'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50/60 dark:hover:bg-slate-700 border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  <span className={isActive ? 'text-white dark:text-slate-900' : 'text-indigo-600 dark:text-slate-400'}>
                    {pill.icon}
                  </span>
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
