import React from 'react';
import { DOCUMENT_CATALOG, DocumentType, UserProfile } from '../types/documents';
import { PWAInstallButton } from './PWAInstallButton';
import { LuFileText, LuLayoutGrid, LuUserCheck, LuUser } from 'react-icons/lu';

interface Props {
  currentView: 'catalog' | 'editor';
  selectedDocId: DocumentType | null;
  onGoToCatalog: () => void;
  onSelectDoc: (id: DocumentType) => void;
  userProfile: UserProfile | null;
  onOpenProfileModal: () => void;
}

export const Header: React.FC<Props> = ({
  currentView,
  selectedDocId,
  onGoToCatalog,
  onSelectDoc,
  userProfile,
  onOpenProfileModal,
}) => {
  return (
    <header className="no-print bg-white border-b border-slate-200/80 sticky top-0 z-30 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-2xs">
      {/* Brand Wordmark & Navigation */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onGoToCatalog}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          title="Ir al Catálogo de Trámites"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition">
            <LuFileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 leading-tight flex items-center gap-1">
              TrámiteFácil <span className="text-blue-600">Hub</span>
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
            className="min-h-[44px] hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition ml-2 cursor-pointer"
          >
            <LuLayoutGrid className="w-3.5 h-3.5 text-slate-500" />
            <span>Ver Catálogo</span>
          </button>
        )}
      </div>

      {/* Center: Quick Document Switcher (if in editor view) */}
      {currentView === 'editor' && selectedDocId && (
        <div className="hidden md:flex items-center gap-2 max-w-xs">
          <label htmlFor="quick-doc-select" className="text-xs text-slate-500 shrink-0 font-medium">
            Trámite:
          </label>
          <select
            id="quick-doc-select"
            value={selectedDocId}
            onChange={(e) => onSelectDoc(e.target.value as DocumentType)}
            className="min-h-[44px] text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer truncate"
          >
            {DOCUMENT_CATALOG.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Right: User Profile Button & PWA Install Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* User Profile Button */}
        <button
          type="button"
          onClick={onOpenProfileModal}
          className={`min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
            userProfile?.nombreCompleto
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
          title="Configurar perfil emisor para autocompletar trámites"
        >
          {userProfile?.nombreCompleto ? (
            <LuUserCheck className="w-4 h-4 text-emerald-600" />
          ) : (
            <LuUser className="w-4 h-4 text-slate-500" />
          )}
          <span className="hidden sm:inline">
            {userProfile?.nombreCompleto ? 'Mi Perfil' : 'Guardar Perfil'}
          </span>
        </button>

        {/* PWA Install Button */}
        <PWAInstallButton />
      </div>
    </header>
  );
};
