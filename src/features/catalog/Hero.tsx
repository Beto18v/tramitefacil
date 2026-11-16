import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Sparkles,
  ChevronDown,
  Check,
  SlidersHorizontal,
  UserCog,
  Download,
  LayoutGrid,
  FolderOpen,
  X,
  Smartphone,
  Laptop,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import {
  CATEGORIES_CONFIG,
  DocumentCategory,
  DocumentType,
} from '../../types/documents';
import { DOCUMENT_CATALOG } from '../../templates';
import { resolveIcon } from './documentIcons';
import { HeroIntro } from './HeroIntro';
import { AiDocumentSuggester } from '../ai/AiDocumentSuggester';
import { OnboardingModal } from '../../components/shared/OnboardingModal';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export type QuickCategoryFilter = 'all' | DocumentCategory;
export type SearchMode = 'standard' | 'assistant';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: QuickCategoryFilter;
  onFilterChange: (filter: QuickCategoryFilter) => void;
  totalResults: number;
  onSelectDoc?: (id: DocumentType, customData?: any) => void;
  defaultMode?: SearchMode;
  onOpenProfileModal?: () => void;
}

export const Hero: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalResults,
  onSelectDoc,
  defaultMode = 'standard',
  onOpenProfileModal,
}) => {
  const [searchMode, setSearchMode] = useState<SearchMode>(defaultMode);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  const searchControlsRef = useRef<HTMLDivElement>(null);
  const floatingMenuRef = useRef<HTMLDivElement>(null);

  // PWA installation support
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showUniversalGuide, setShowUniversalGuide] = useState(false);

  const handleInstallClick = async () => {
    setIsOptionsMenuOpen(false);
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowUniversalGuide(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowUniversalGuide(true);
    }
  };

  const handleScrollToSearch = () => {
    setSearchMode('standard');
    searchControlsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Close floating dropdown on click outside or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        floatingMenuRef.current &&
        !floatingMenuRef.current.contains(event.target as Node)
      ) {
        setIsOptionsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOptionsMenuOpen(false);
      }
    };

    if (isOptionsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOptionsMenuOpen]);

  const activeSectorConfig = CATEGORIES_CONFIG.find((c) => c.id === activeFilter);
  const ActiveSectorIcon = activeSectorConfig
    ? resolveIcon(activeSectorConfig.icon)
    : SlidersHorizontal;

  return (
    <div className="space-y-6 relative">
      {/* 1. Hero Landing Visual Showcase: Notaría Digital con Hoja A4 y Métricas */}
      <HeroIntro
        onExploreClick={handleScrollToSearch}
        onAssistantClick={() => {
          setSearchMode('assistant');
          searchControlsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* 2. Interactive Search Section */}
      <div
        ref={searchControlsRef}
        id="catalog-search-section"
        className="bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-sm transition-colors space-y-4"
      >
        {/* Mode Selector Tabs & Total Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="inline-flex p-1 bg-slate-950/70 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setSearchMode('standard')}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                searchMode === 'standard'
                  ? 'bg-slate-800 text-white shadow-xs border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
              <span>Explorar catálogo</span>
            </button>
            <button
              type="button"
              onClick={() => setSearchMode('assistant')}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                searchMode === 'assistant'
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-200" strokeWidth={1.75} />
              <span>Contar mi caso</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-1 ${
                  searchMode === 'assistant'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-800 text-emerald-400'
                }`}
              >
                Asistente
              </span>
            </button>
          </div>

          {searchMode === 'standard' && (
            <span className="text-xs font-medium tabular-nums text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-full border border-slate-800">
              {totalResults} plantilla{totalResults !== 1 ? 's' : ''} disponible{totalResults !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Mode 1: Search Input & Active Filter Pill */}
        {searchMode === 'standard' ? (
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-emerald-500" strokeWidth={1.75} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar por trámite, norma o palabra clave (ej. 'renuncia', 'arriendo', 'retención', 'petición')..."
                className="w-full min-h-[48px] pl-12 pr-12 py-2.5 bg-slate-950/60 hover:bg-slate-950 focus:bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-white min-h-[44px] min-w-[44px] justify-center cursor-pointer font-medium"
                >
                  Borrar
                </button>
              )}
            </div>

            {/* Active Category Filter Tag Pill */}
            {activeFilter !== 'all' && activeSectorConfig && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-400">Sector seleccionado:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 shadow-2xs">
                  <ActiveSectorIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeSectorConfig.name}</span>
                  <button
                    type="button"
                    onClick={() => onFilterChange('all')}
                    className="ml-1 p-0.5 hover:bg-emerald-800/60 rounded-full cursor-pointer text-emerald-300 hover:text-white transition"
                    title="Quitar filtro de sector"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Mode 2: AI Document Suggester & Router */
          <AiDocumentSuggester onSelectDoc={onSelectDoc} />
        )}
      </div>

      {/* 3. Floating Interactive Action Button & Fixed Menu (Always accessible on screen) */}
      <div
        ref={floatingMenuRef}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
      >
        {/* Popover Options Menu (Opens upwards above the floating button) */}
        {isOptionsMenuOpen && (
          <div className="mb-3 w-72 sm:w-80 max-h-[calc(100vh-120px)] overflow-y-auto rounded-3xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-3 shadow-2xl z-50 space-y-1.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Menú de Opciones
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-900/60">
                Acceso Rápido
              </span>
            </div>

            {/* Option 1: Configurar perfil */}
            {onOpenProfileModal && (
              <button
                type="button"
                onClick={() => {
                  setIsOptionsMenuOpen(false);
                  onOpenProfileModal();
                }}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
                  <UserCog className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white">Configurar Perfil</span>
                  <span className="text-[11px] text-slate-400">Autocompletar identificación y firma</span>
                </div>
              </button>
            )}

            {/* Option 2: Instalar PWA */}
            {!isInstalled && (
              <button
                type="button"
                onClick={handleInstallClick}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white">Instalar Aplicación</span>
                  <span className="text-[11px] text-slate-400">Acceso rápido y privado sin conexión</span>
                </div>
              </button>
            )}

            {/* Option 3: Contar mi caso con Asistente */}
            <button
              type="button"
              onClick={() => {
                setSearchMode('assistant');
                setIsOptionsMenuOpen(false);
                searchControlsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">Contar mi caso al Asistente</span>
                <span className="text-[11px] text-slate-400">Redacción inteligente paso a paso</span>
              </div>
            </button>

            {/* Option 4: Explorar catálogo completo */}
            <button
              type="button"
              onClick={() => {
                setSearchMode('standard');
                onFilterChange('all');
                onSearchChange('');
                setIsOptionsMenuOpen(false);
                searchControlsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
                <LayoutGrid className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">Explorar Todo el Catálogo</span>
                <span className="text-[11px] text-slate-400">Ver todas las plantillas sin filtros</span>
              </div>
            </button>

            {/* Option 5: Categorías por Sector (Expandible) */}
            <div className="pt-1.5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center shrink-0">
                    <FolderOpen className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-white">Categorías por Sector</span>
                    <span className="text-[11px] text-slate-400">Filtrar por área jurídica</span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isCategoriesExpanded ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>

              {/* Submenú de las 6 categorías */}
              {isCategoriesExpanded && (
                <div className="mt-1 space-y-1 pl-2 border-l-2 border-emerald-800/40 ml-4 py-1 animate-in fade-in slide-in-from-top-1">
                  {CATEGORIES_CONFIG.map((sector) => {
                    const SectorIcon = resolveIcon(sector.icon);
                    const isSelected = activeFilter === sector.id;
                    const count = DOCUMENT_CATALOG.filter((d) => d.category === sector.id).length;
                    return (
                      <button
                        key={sector.id}
                        type="button"
                        onClick={() => {
                          onFilterChange(sector.id);
                          setSearchMode('standard');
                          setIsOptionsMenuOpen(false);
                          searchControlsRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition cursor-pointer text-left ${
                          isSelected
                            ? 'bg-emerald-950/70 text-emerald-300 font-semibold border border-emerald-800/80'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <SectorIcon className="w-3.5 h-3.5 shrink-0 text-emerald-400" strokeWidth={1.75} />
                          <span className="truncate">{sector.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-semibold text-slate-500">
                            {count}
                          </span>
                          {isSelected && <Check className="w-3 h-3 text-emerald-400" strokeWidth={2} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* The Floating Pill Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
          className={`min-h-[48px] px-4 sm:px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-2xl backdrop-blur-md border ${
            isOptionsMenuOpen
              ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-500/20'
              : 'bg-slate-900/95 hover:bg-slate-800 text-slate-100 border-slate-700/90 hover:border-emerald-500/50 hover:shadow-emerald-950/40 hover:scale-105 active:scale-95'
          }`}
          title="Menú de opciones flotante"
        >
          <div className="relative flex items-center justify-center">
            <SlidersHorizontal
              className={`w-4 h-4 transition-transform duration-200 ${
                isOptionsMenuOpen ? 'rotate-90 text-white' : 'text-emerald-400'
              }`}
              strokeWidth={2}
            />
            {!isOptionsMenuOpen && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            )}
          </div>
          <span>Opciones</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOptionsMenuOpen ? 'rotate-180 text-white' : 'text-slate-400'
            }`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Onboarding / Guía de uso Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* iOS Safari Modal Guide */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 p-6 shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 my-8 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                Instalar en iPhone o iPad
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-950/70 text-emerald-400 flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-200">1. Toca el botón Compartir</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">En la barra inferior del navegador Safari.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-950/70 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-200">2. "Agregar a pantalla de inicio"</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Desliza las opciones y selecciona Agregar.</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Universal Desktop/Android Guide */}
      {showUniversalGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 p-6 shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 my-8 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-emerald-400" />
                Instalar Aplicación
              </h3>
              <button
                type="button"
                onClick={() => setShowUniversalGuide(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-200">En la barra de direcciones</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Haz clic en el icono de instalar en la barra superior de tu navegador (Chrome, Edge o Brave).
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowUniversalGuide(false)}
              className="mt-5 w-full min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
