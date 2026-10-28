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
  defaultCuentaCobro,
  defaultPropuestaServicios,
  defaultContratoPrestacion,
  defaultCartaRenuncia,
  defaultCertificadoLaboral,
  defaultPermisoLaboral,
  defaultNoRenovacionArriendo,
  defaultContratoArrendamiento,
  defaultActaEntrega,
  defaultDerechoPeticion,
  defaultPoderAutorizacion,
  defaultHabeasData,
  defaultAcuerdoNda,
  defaultCompraventaVehiculo,
  defaultAutorizacionPatios,
  sampleCuentaCobro,
  samplePropuestaServicios,
  sampleContratoPrestacion,
  sampleCartaRenuncia,
  sampleCertificadoLaboral,
  samplePermisoLaboral,
  sampleNoRenovacionArriendo,
  sampleContratoArrendamiento,
  sampleActaEntrega,
  sampleDerechoPeticion,
  samplePoderAutorizacion,
  sampleHabeasData,
  sampleAcuerdoNda,
  sampleCompraventaVehiculo,
  sampleAutorizacionPatios,
} from './data/initialData';
import { Header } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { EditorView } from './components/EditorView';
import { UserProfileModal } from './components/UserProfileModal';
import { loadUserProfile, saveUserProfile, injectProfileIntoDocument } from './utils/profileInjector';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const STORAGE_KEY = 'tramite_facil_state_v1';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'error';
}

export default function App() {
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

  // User Profile state (tramitefacil_profile_v1)
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
  const handleSelectDocFromCatalog = (docId: DocumentType) => {
    setSelectedDocId(docId);
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

  // Load sample for a document
  const handleLoadSample = (docType: DocumentType) => {
    switch (docType) {
      case 'cuenta_cobro':
        handleUpdateData('cuentaCobro', sampleCuentaCobro);
        break;
      case 'propuesta_servicios':
        handleUpdateData('propuestaServicios', samplePropuestaServicios);
        break;
      case 'contrato_prestacion':
        handleUpdateData('contratoPrestacion', sampleContratoPrestacion);
        break;
      case 'carta_renuncia':
        handleUpdateData('cartaRenuncia', sampleCartaRenuncia);
        break;
      case 'certificado_laboral':
        handleUpdateData('certificadoLaboral', sampleCertificadoLaboral);
        break;
      case 'permiso_laboral':
        handleUpdateData('permisoLaboral', samplePermisoLaboral);
        break;
      case 'no_renovacion_arriendo':
        handleUpdateData('noRenovacionArriendo', sampleNoRenovacionArriendo);
        break;
      case 'contrato_arrendamiento':
        handleUpdateData('contratoArrendamiento', sampleContratoArrendamiento);
        break;
      case 'acta_entrega':
        handleUpdateData('actaEntrega', sampleActaEntrega);
        break;
      case 'derecho_peticion':
        handleUpdateData('derechoPeticion', sampleDerechoPeticion);
        break;
      case 'poder_autorizacion':
        handleUpdateData('poderAutorizacion', samplePoderAutorizacion);
        break;
      case 'habeas_data':
        handleUpdateData('habeasData', sampleHabeasData);
        break;
      case 'acuerdo_nda':
        handleUpdateData('acuerdoNda', sampleAcuerdoNda);
        break;
      case 'compraventa_vehiculo':
        handleUpdateData('compraventaVehiculo', sampleCompraventaVehiculo);
        break;
      case 'autorizacion_patios':
        handleUpdateData('autorizacionPatios', sampleAutorizacionPatios);
        break;
    }
  };

  // Reset a document to default
  const handleReset = (docType: DocumentType) => {
    switch (docType) {
      case 'cuenta_cobro':
        handleUpdateData('cuentaCobro', defaultCuentaCobro);
        break;
      case 'propuesta_servicios':
        handleUpdateData('propuestaServicios', defaultPropuestaServicios);
        break;
      case 'contrato_prestacion':
        handleUpdateData('contratoPrestacion', defaultContratoPrestacion);
        break;
      case 'carta_renuncia':
        handleUpdateData('cartaRenuncia', defaultCartaRenuncia);
        break;
      case 'certificado_laboral':
        handleUpdateData('certificadoLaboral', defaultCertificadoLaboral);
        break;
      case 'permiso_laboral':
        handleUpdateData('permisoLaboral', defaultPermisoLaboral);
        break;
      case 'no_renovacion_arriendo':
        handleUpdateData('noRenovacionArriendo', defaultNoRenovacionArriendo);
        break;
      case 'contrato_arrendamiento':
        handleUpdateData('contratoArrendamiento', defaultContratoArrendamiento);
        break;
      case 'acta_entrega':
        handleUpdateData('actaEntrega', defaultActaEntrega);
        break;
      case 'derecho_peticion':
        handleUpdateData('derechoPeticion', defaultDerechoPeticion);
        break;
      case 'poder_autorizacion':
        handleUpdateData('poderAutorizacion', defaultPoderAutorizacion);
        break;
      case 'habeas_data':
        handleUpdateData('habeasData', defaultHabeasData);
        break;
      case 'acuerdo_nda':
        handleUpdateData('acuerdoNda', defaultAcuerdoNda);
        break;
      case 'compraventa_vehiculo':
        handleUpdateData('compraventaVehiculo', defaultCompraventaVehiculo);
        break;
      case 'autorizacion_patios':
        handleUpdateData('autorizacionPatios', defaultAutorizacionPatios);
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* 1. Global Navigation Header */}
      <Header
        currentView={currentView}
        selectedDocId={selectedDocId}
        onGoToCatalog={handleGoToCatalog}
        onSelectDoc={(id) => setSelectedDocId(id)}
        userProfile={userProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* 2. Main Viewport */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'catalog' ? (
          <CatalogView
            onSelectDoc={handleSelectDocFromCatalog}
            userProfile={userProfile}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
          />
        ) : (
          <EditorView
            selectedDoc={selectedDocId}
            data={documentsData}
            onUpdateData={handleUpdateData}
            onBackToCatalog={handleGoToCatalog}
            onLoadSample={handleLoadSample}
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

      {/* 3. User Profile Modal (tramitefacil_profile_v1) */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={userProfile}
        onSaveProfile={handleSaveProfile}
        onApplyToCurrentDoc={currentView === 'editor' ? handleApplyProfile : undefined}
      />

      {/* 4. Floating Toast Feedback */}
      {toast.show && (
        <aside
          aria-live="polite"
          className="no-print fixed bottom-20 lg:bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 animate-in slide-in-from-bottom-4 duration-200 max-w-sm sm:max-w-md"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}

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
