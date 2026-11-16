import React from 'react';
import { DocumentType, UserProfile } from '../../types/documents';
import { DOCUMENT_CATALOG } from '../../templates';
import { PWAInstallButton } from '../shared/PWAInstallButton';
import { FileText, LayoutGrid, UserCog, UserCheck } from 'lucide-react';

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
}) => {
  const hasProfile = Boolean(userProfile && userProfile.nombreCompleto?.trim());

  return (
    <header className="no-print bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-xs transition-colors">
      {/* Brand Wordmark & Navigation */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onGoToCatalog}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          title="Ir al Catálogo de Trámites"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-emerald-500 transition-colors">
            <FileText className="w-4 h-4" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
              TrámiteFácil
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                Hub
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline leading-none">
              Documentos Legales Instantáneos
            </span>
          </div>
        </button>

        {/* Catalog button */}
        {currentView === 'editor' && (
          <button
            type="button"
            onClick={onGoToCatalog}
            className="min-h-[40px] hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition ml-1 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
            <span>Ver Catálogo</span>
          </button>
        )}
      </div>

      {/* Center: Quick Document Switcher (if in editor view) */}
      {currentView === 'editor' && selectedDocId && (
        <div className="hidden md:flex items-center gap-2 max-w-xs">
          <label
            htmlFor="quick-doc-select"
            className="text-xs text-slate-400 shrink-0 font-medium"
          >
            Trámite:
          </label>
          <select
            id="quick-doc-select"
            value={selectedDocId}
            onChange={(e) => onSelectDoc(e.target.value as DocumentType)}
            className="min-h-[40px] text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer truncate shadow-xs"
          >
            {DOCUMENT_CATALOG.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Right: Autocomplete Profile Button + PWA Install */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onOpenProfileModal && (
          hasProfile && userProfile ? (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="min-h-[40px] inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/50 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/60 transition cursor-pointer shadow-xs"
              title="Ver o editar tus datos fiscales y firma guardados"
            >
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.75} />
              <span className="truncate max-w-[120px] sm:max-w-[170px]">
                {userProfile.nombreCompleto}
              </span>
              {userProfile.signatureDataUrl && (
                <span className="hidden lg:inline text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-900 text-emerald-200">
                  Firma lista
                </span>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="min-h-[40px] inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer shadow-xs whitespace-nowrap"
              title="Configura tus datos fiscales y firma para autocompletar documentos en 1 clic"
            >
              <UserCog className="w-4 h-4 shrink-0 text-white" strokeWidth={1.75} />
              <span className="text-[11px] sm:text-xs">
                Configurar Perfil para Autocompletar
              </span>
            </button>
          )
        )}

        {/* PWA Install Button */}
        <PWAInstallButton />
      </div>
    </header>
  );
};
