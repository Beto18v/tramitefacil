import React, { useState, useEffect } from 'react';
import {
  DocumentType,
  DocumentStyleConfig,
  AllDocumentsData,
  AppStorageState,
  UserProfile,
} from './types/documents';
import {
  defaultStyleConfig,
  getInitialFullStorageState,
} from './data/initialData';
import { getDocumentDefinition, DOC_TYPE_TO_DATA_KEY } from './templates';
import { Header, Footer } from './components/layout';
import { CatalogView, EditorView } from './components/views';
import { UserProfileModal } from './components/shared';
import { loadUserProfile, saveUserProfile, injectProfileIntoDocument } from './utils/profileInjector';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const STORAGE_KEY = 'tramite_facil_state_v1';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'error';
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [appState, setAppState] = useLocalStorage<AppStorageState>(
    STORAGE_KEY,
    getInitialFullStorageState,
    { debounceMs: 350 }
  );

  const currentView = appState.currentView;
  const selectedDocId: DocumentType = appState.selectedDocId || 'cuenta_cobro';
  const styleConfig = appState.styleConfig;
  const documentsData = appState.documents;

  const setCurrentView = (view: 'catalog' | 'editor') => {
    setAppState((prev) => ({ ...prev, currentView: view }));
  };

  const setSelectedDocId = (docId: DocumentType) => {
    setAppState((prev) => ({ ...prev, selectedDocId: docId }));
  };

  const setStyleConfig = (config: DocumentStyleConfig) => {
    setAppState((prev) => ({ ...prev, styleConfig: config }));
  };

  const setDocumentsData = (
    docs: AllDocumentsData | ((prev: AllDocumentsData) => AllDocumentsData)
  ) => {
    setAppState((prev) => ({
      ...prev,
      documents: typeof docs === 'function' ? docs(prev.documents) : docs,
    }));
  };

  // User Profile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    return loadUserProfile();
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'info',
  });

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.show, toast.message]);

  // Navigate to editor with document
  const handleSelectDocFromCatalog = (docId: DocumentType, customData?: any) => {
    setSelectedDocId(docId);
    if (customData && docId === 'documento_formal') {
      setDocumentsData((prev) => ({
        ...prev,
        documentoFormal: {
          ...prev.documentoFormal,
          ...customData,
        },
      }));
    }
    setCurrentView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to catalog
  const handleGoToCatalog = () => {
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update a single document's model
  const handleUpdateData = <K extends keyof AllDocumentsData>(
    key: K,
    updated: AllDocumentsData[K]
  ) => {
    setDocumentsData((prev) => ({
      ...prev,
      [key]: updated,
    }));
  };

  // Save profile and update state
  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    saveUserProfile(newProfile);
    showToast('Perfil emisor guardado en tu navegador.', 'success');
  };

  // Save drawn signature directly to profile
  const handleSaveSignatureToProfile = (dataUrl: string) => {
    const current = userProfile || {
      nombreCompleto: '',
      tipoDocumento: 'Cédula de Ciudadanía',
      numeroDocumento: '',
      expedicionDocumento: '',
      ciudad: '',
      telefono: '',
      correo: '',
      direccion: '',
      cargoOProfesion: '',
      banco: '',
      tipoCuenta: 'Ahorros' as const,
      numeroCuenta: '',
    };
    const updated = { ...current, signatureDataUrl: dataUrl };
    setUserProfile(updated);
    saveUserProfile(updated);
    showToast('Firma digital guardada en tu perfil para futuros documentos.', 'success');
  };

  // Apply user profile to currently selected document
  const handleApplyProfile = () => {
    if (!userProfile || !userProfile.nombreCompleto) {
      // Open modal to configure first
      setIsProfileModalOpen(true);
      showToast('Configura tus datos para autocompletar tus trámites.', 'info');
      return;
    }

    const updated = injectProfileIntoDocument(selectedDocId, documentsData, userProfile);
    setDocumentsData(updated);
    showToast(`¡Datos de ${userProfile.nombreCompleto.split(' ')[0]} autocompletados con éxito!`, 'success');
  };

  // Reset a document to default
  const handleReset = (docType: DocumentType) => {
    const def = getDocumentDefinition(docType);
    const key = DOC_TYPE_TO_DATA_KEY[docType];
    handleUpdateData(key, def.defaultData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-600 selection:text-white dark:selection:bg-emerald-500 dark:selection:text-slate-950 overflow-x-hidden transition-colors">
      {/* 1. Global Navigation Header */}
      <Header
        currentView={currentView}
        selectedDocId={selectedDocId}
        onGoToCatalog={handleGoToCatalog}
        onSelectDoc={(id) => setSelectedDocId(id)}
        userProfile={userProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* 2. Main Viewport */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'catalog' ? (
          <CatalogView
            onSelectDoc={handleSelectDocFromCatalog}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
          />
        ) : (
          <EditorView
            selectedDoc={selectedDocId}
            data={documentsData}
            onUpdateData={handleUpdateData}
            onBackToCatalog={handleGoToCatalog}
            onReset={handleReset}
            styleConfig={styleConfig}
            onUpdateStyle={setStyleConfig}
            onTriggerToast={showToast}
            userProfile={userProfile}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
            onApplyProfile={handleApplyProfile}
            onSaveSignatureToProfile={handleSaveSignatureToProfile}
          />
        )}
      </main>

      {/* 3. Institutional Footer */}
      <Footer />

      {/* 4. User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={userProfile}
        onSaveProfile={handleSaveProfile}
        onApplyToCurrentDoc={currentView === 'editor' ? handleApplyProfile : undefined}
      />

      {/* 5. Floating Toast Feedback */}
      {toast.show && (
        <aside
          aria-live="polite"
          className="no-print fixed bottom-20 lg:bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white shadow-2xl border border-slate-800 dark:border-slate-700 animate-in slide-in-from-bottom-4 duration-200 max-w-sm sm:max-w-md"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-emerald-400 shrink-0" />}

          <span className="text-xs font-medium leading-snug flex-1">
            {toast.message}
          </span>

          <button
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="p-1 text-slate-400 hover:text-white rounded-xl transition min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}
    </div>
  );
}
