import React from 'react';
import { Search, Briefcase, DollarSign, Home, Scale, SlidersHorizontal } from 'lucide-react';

export type QuickCategoryFilter = 'all' | 'laboral' | 'finanzas' | 'inmobiliario' | 'legal';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: QuickCategoryFilter;
  onFilterChange: (filter: QuickCategoryFilter) => void;
  totalResults: number;
}

export const Hero: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalResults,
}) => {
  const categoryPills: { id: QuickCategoryFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Todos', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
    { id: 'laboral', label: 'Laboral', icon: <Briefcase className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'finanzas', label: 'Finanzas & Honorarios', icon: <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'inmobiliario', label: 'Inmobiliario', icon: <Home className="w-3.5 h-3.5 text-amber-600" /> },
    { id: 'legal', label: 'Legal & Peticiones', icon: <Scale className="w-3.5 h-3.5 text-purple-600" /> },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Title & Subtitle */}
      <div className="max-w-3xl space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
          Generador de Documentos & Trámites Legales
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          Redacta, personaliza y descarga documentos formales en segundos. 100% privado en tu navegador.
        </p>
      </div>

      {/* Prominent Universal Search Bar */}
      <div className="relative w-full max-w-3xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por trámite o palabra clave (ej. 'renuncia', 'arriendo', 'retención', 'nda')..."
          className="w-full min-h-[48px] pl-11 pr-12 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-xs"
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
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-semibold'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-slate-200'
              }`}
            >
              <span className={isActive ? 'text-white' : ''}>{pill.icon}</span>
              <span>{pill.label}</span>
            </button>
          );
        })}

        <span className="ml-auto text-xs font-mono text-slate-400 hidden md:inline">
          {totalResults} plantilla{totalResults !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
};
