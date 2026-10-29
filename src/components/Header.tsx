import React from 'react';
import { DOCUMENT_CATALOG, DocumentType, UserProfile } from '../types/documents';
import { PWAInstallButton } from './PWAInstallButton';
import { FileText, LayoutGrid, Sun, Moon, UserCog, UserCheck } from 'lucide-react';

interface Props {
  currentView: 'catalog' | 'editor';
  selectedDocId: DocumentType | null;
  onGoToCatalog: () => void;
  onSelectDoc: (id: DocumentType) => void;
  userProfile?: UserProfile | null;
  onOpenProfileModal?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<Props> = ({
  currentView,
  selectedDocId,
  onGoToCatalog,
  onSelectDoc,
  userProfile,
  onOpenProfileModal,
  theme = 'light',
  onToggleTheme,
}) => {
  const hasProfile = Boolean(userProfile && userProfile.nombreCompleto?.trim());

  return (
    <header className="no-print bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-2xs transition-colors">
      {/* Brand Wordmark & Navigation */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onGoToCatalog}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          title="Ir al Catálogo de Trámites"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:bg-indigo-700 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
              TrámiteFácil
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-slate-300 border border-indigo-200/80 dark:border-slate-700">
                Hub
              </span>
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium hidden sm:inline leading-none">
              Documentos Legales Instantáneos
            </span>
          </div>
        </button>

        {/* Catalog button */}
        {currentView === 'editor' && (
          <button
            type="button"
            onClick={onGoToCatalog}
            className="min-h-[40px] hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl transition ml-1 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Ver Catálogo</span>
          </button>
        )}
      </div>

      {/* Center: Quick Document Switcher (if in editor view) */}
      {currentView === 'editor' && selectedDocId && (
        <div className="hidden md:flex items-center gap-2 max-w-xs">
          <label
            htmlFor="quick-doc-select"
            className="text-xs text-slate-500 dark:text-slate-400 shrink-0 font-medium"
          >
            Trámite:
          </label>
          <select
            id="quick-doc-select"
            value={selectedDocId}
            onChange={(e) => onSelectDoc(e.target.value as DocumentType)}
            className="min-h-[40px] text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/90 dark:border-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 cursor-pointer truncate"
          >
            {DOCUMENT_CATALOG.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Right: Autocomplete Profile Button + Theme Toggle + PWA Install */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Prominent Profile Autocomplete Button on BOTH mobile and PC */}
        {onOpenProfileModal && (
          hasProfile && userProfile ? (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="min-h-[40px] inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200/90 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition cursor-pointer shadow-2xs"
              title="Ver o editar tus datos fiscales y firma guardados"
            >
              <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[170px]">
                {userProfile.nombreCompleto}
              </span>
              {userProfile.signatureDataUrl && (
                <span className="hidden lg:inline text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  Firma lista
                </span>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="min-h-[40px] inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 transition cursor-pointer shadow-xs whitespace-nowrap"
              title="Configura tus datos fiscales y firma para autocompletar documentos en 1 clic"
            >
              <UserCog className="w-4 h-4 shrink-0" />
              <span className="text-[11px] sm:text-xs">
                Configurar Perfil para Autollenar
              </span>
            </button>
          )
        )}

        {/* Theme Toggle (Light / Dark Mode) */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema de color"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        )}

        {/* PWA Install Button */}
        <PWAInstallButton />
      </div>
    </header>
  );
};
