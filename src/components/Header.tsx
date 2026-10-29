import React from 'react';
import { DOCUMENT_CATALOG, DocumentType, UserProfile } from '../types/documents';
import { PWAInstallButton } from './PWAInstallButton';
import { PiFileText, PiSquaresFour, PiUserCheck, PiUser } from 'react-icons/pi';

interface Props {
  currentView: 'catalog' | 'editor';
  selectedDocId: DocumentType | null;
  onGoToCatalog: () => void;
  onSelectDoc: (id: DocumentType) => void;
  userProfile: UserProfile | null;
  onOpenProfileModal: () => void;
}

const getInitials = (fullName: string): string => {
  if (!fullName) return 'U';
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const getAbbreviatedDoc = (tipo?: string, num?: string): string => {
  const docTypeMap: Record<string, string> = {
    'Cédula de Ciudadanía': 'CC',
    'Cédula de Extranjería': 'CE',
    'Pasaporte': 'PAS',
    'NIT': 'NIT',
    'Permiso Especial de Permanencia': 'PEP',
    'Permiso por Protección Temporal': 'PPT',
  };
  const prefix = tipo ? (docTypeMap[tipo] || tipo.slice(0, 3).toUpperCase()) : 'DOC';
  if (!num) return prefix;
  const clean = num.replace(/\D/g, '');
  if (clean.length > 4) {
    return `${prefix} •••${clean.slice(-4)}`;
  }
  return `${prefix} ${num}`;
};

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
    <header className="no-print bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-2xs">
      {/* Brand Wordmark & Navigation */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onGoToCatalog}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          title="Ir al Catálogo de Trámites"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-2xs group-hover:bg-blue-600 transition-colors">
            <PiFileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 leading-tight flex items-center gap-1.5">
              TrámiteFácil
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
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
            className="min-h-[44px] hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200/80 rounded-xl transition ml-1 cursor-pointer"
          >
            <PiSquaresFour className="w-4 h-4 text-slate-500" />
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

      {/* Right: User Profile Widget & PWA Install Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Desktop Profile Widget */}
        <div className="hidden sm:flex items-center">
          {hasProfile && userProfile ? (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="min-h-[44px] flex items-center gap-2.5 pl-1.5 pr-3 py-1 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 rounded-full transition-all shadow-2xs group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              title="Ver o editar tus datos fiscales y firma guardados"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center shrink-0 tracking-tight group-hover:bg-blue-600 transition-colors">
                {getInitials(userProfile.nombreCompleto)}
              </div>
              <div className="flex flex-col min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-900 truncate max-w-[130px] leading-tight">
                    {userProfile.nombreCompleto}
                  </span>
                  {userProfile.signatureDataUrl && (
                    <span
                      className="text-[10px] inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium"
                      title="Firma digital configurada para autollenado"
                    >
                      <span>✍️</span>
                      <span className="hidden xl:inline text-[9px]">Firma lista</span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono leading-none">
                  {getAbbreviatedDoc(userProfile.tipoDocumento, userProfile.numeroDocumento)}
                </span>
              </div>
              <PiUserCheck className="w-4 h-4 text-emerald-600 shrink-0 ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/90 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
              title="Configura tus datos fiscales y firma para autocompletar trámites en un clic"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-blue-600 text-white text-[11px] font-bold shadow-2xs group-hover:scale-105 transition-transform">
                ⚡
              </span>
              <span className="leading-tight">Configurar Perfil para Autollenar</span>
            </button>
          )}
        </div>

        {/* Mobile Profile Compact Button (Touch friendly min-h-[44px]) */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={onOpenProfileModal}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl border transition-colors cursor-pointer relative ${
              hasProfile
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            aria-label={hasProfile ? 'Ver perfil emisor' : 'Configurar perfil'}
            title={hasProfile && userProfile ? `Perfil: ${userProfile.nombreCompleto}` : 'Configurar perfil para autollenar'}
          >
            {hasProfile && userProfile ? (
              <>
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  {getInitials(userProfile.nombreCompleto)}
                </span>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-200" />
              </>
            ) : (
              <>
                <PiUser className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
              </>
            )}
          </button>
        </div>

        {/* PWA Install Button */}
        <PWAInstallButton />
      </div>
    </header>
  );
};
