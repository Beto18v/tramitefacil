import React from 'react';
import { DOCUMENT_CATALOG, DocumentType, UserProfile } from '../types/documents';
import { PWAInstallButton } from './PWAInstallButton';
import { FileText, LayoutGrid, UserCheck, User, Sun, Moon } from 'lucide-react';

interface Props {
  currentView: 'catalog' | 'editor';
  selectedDocId: DocumentType | null;
  onGoToCatalog: () => void;
  onSelectDoc: (id: DocumentType) => void;
  userProfile: UserProfile | null;
  onOpenProfileModal: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
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
    Pasaporte: 'PAS',
    NIT: 'NIT',
    'Permiso Especial de Permanencia': 'PEP',
    'Permiso por Protección Temporal': 'PPT',
  };
  const prefix = tipo ? docTypeMap[tipo] || tipo.slice(0, 3).toUpperCase() : 'DOC';
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
  theme = 'light',
  onToggleTheme,
}) => {
  const hasProfile = Boolean(userProfile && userProfile.nombreCompleto?.trim());

  return (
    <header className="no-print bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-2xs transition-colors">
      {/* Brand Wordmark & Navigation */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onGoToCatalog}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          title="Ir al Catálogo de Trámites"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center shadow-2xs group-hover:bg-blue-600 dark:group-hover:bg-blue-500 dark:group-hover:text-white transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
              TrámiteFácil
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
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
            className="min-h-[44px] hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl transition ml-1 cursor-pointer"
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
            className="min-h-[44px] text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/90 dark:border-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer truncate"
          >
            {DOCUMENT_CATALOG.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Right: Theme Toggle + Profile Widget + PWA Install */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle (Light / Dark Mode) */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
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

        {/* Desktop Profile Widget */}
        <div className="hidden sm:flex items-center">
          {hasProfile && userProfile ? (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="min-h-[44px] flex items-center gap-2.5 pl-1.5 pr-3 py-1 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/90 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-full transition-all shadow-2xs group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              title="Ver o editar tus datos fiscales y firma guardados"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs flex items-center justify-center shrink-0 tracking-tight group-hover:bg-blue-600 dark:group-hover:bg-blue-500 dark:group-hover:text-white transition-colors">
                {getInitials(userProfile.nombreCompleto)}
              </div>
              <div className="flex flex-col min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[130px] leading-tight">
                    {userProfile.nombreCompleto}
                  </span>
                  {userProfile.signatureDataUrl && (
                    <span
                      className="text-[10px] inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 font-medium"
                      title="Firma digital configurada para autollenado"
                    >
                      <span>✍️</span>
                      <span className="hidden xl:inline text-[9px]">Firma lista</span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono leading-none">
                  {getAbbreviatedDoc(userProfile.tipoDocumento, userProfile.numeroDocumento)}
                </span>
              </div>
              <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/80 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
              title="Configura tus datos fiscales y firma para autocompletar trámites en un clic"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-blue-600 dark:bg-blue-500 text-white text-[11px] font-bold shadow-2xs group-hover:scale-105 transition-transform">
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
                ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
            aria-label={hasProfile ? 'Ver perfil emisor' : 'Configurar perfil'}
            title={
              hasProfile && userProfile
                ? `Perfil: ${userProfile.nombreCompleto}`
                : 'Configurar perfil para autollenar'
            }
          >
            {hasProfile && userProfile ? (
              <>
                <span className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-bold flex items-center justify-center">
                  {getInitials(userProfile.nombreCompleto)}
                </span>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 ring-1 ring-emerald-200" />
              </>
            ) : (
              <>
                <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
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
