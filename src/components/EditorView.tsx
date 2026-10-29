import React, { useState, useRef, useMemo } from 'react';
import {
  DocumentType,
  AllDocumentsData,
  DocumentStyleConfig,
  DOCUMENT_CATALOG,
  UserProfile,
} from '../types/documents';
import { DocumentPreview } from './DocumentPreview';
import { exportElementToPdf } from '../utils/exportPdf';
import { exportDocx } from '../utils/exportDocx';
import { getDocumentDefinition, DOC_TYPE_TO_DATA_KEY } from '../templates';

import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Download,
  FileText,
  Printer,
  Loader2,
  UserCheck,
  UserCog,
  PenTool,
} from 'lucide-react';

interface Props {
  selectedDoc: DocumentType;
  data: AllDocumentsData;
  onUpdateData: <K extends keyof AllDocumentsData>(key: K, updated: AllDocumentsData[K]) => void;
  onBackToCatalog: () => void;
  onLoadSample: (docType: DocumentType) => void;
  onReset: (docType: DocumentType) => void;
  styleConfig: DocumentStyleConfig;
  onUpdateStyle: (config: DocumentStyleConfig) => void;
  onTriggerToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  userProfile: UserProfile | null;
  onOpenProfileModal: () => void;
  onApplyProfile: () => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const EditorView: React.FC<Props> = ({
  selectedDoc,
  data,
  onUpdateData,
  onBackToCatalog,
  onLoadSample,
  onReset,
  styleConfig,
  onUpdateStyle,
  onTriggerToast,
  userProfile,
  onOpenProfileModal,
  onApplyProfile,
  onSaveSignatureToProfile,
}) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'form' | 'preview'>('form');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const exportSheetRef = useRef<HTMLDivElement>(null);

  const definition = useMemo(() => getDocumentDefinition(selectedDoc), [selectedDoc]);
  const dataKey = DOC_TYPE_TO_DATA_KEY[selectedDoc];
  const currentDocData = data[dataKey];
  const docMeta = DOCUMENT_CATALOG.find((d) => d.id === selectedDoc) || definition.meta;

  const completionPercentage = useMemo(() => {
    return definition.calculateCompletion(currentDocData);
  }, [definition, currentDocData]);

  const getDynamicFilename = (ext: 'pdf' | 'docx') => {
    const today = new Date().toISOString().split('T')[0];
    let personOrOrg = 'Documento';

    switch (selectedDoc) {
      case 'cuenta_cobro':
        personOrOrg = data.cuentaCobro.nombreContratista || 'Contratista';
        break;
      case 'propuesta_servicios':
        personOrOrg = data.propuestaServicios.nombreProponente || 'Proponente';
        break;
      case 'contrato_prestacion':
        personOrOrg = data.contratoPrestacion.nombreContratista || 'Contratista';
        break;
      case 'carta_renuncia':
        personOrOrg = data.cartaRenuncia.nombreTrabajador || 'Trabajador';
        break;
      case 'certificado_laboral':
        personOrOrg = data.certificadoLaboral.nombreTrabajador || 'Empleado';
        break;
      case 'permiso_laboral':
        personOrOrg = data.permisoLaboral.nombreEmpleado || 'Empleado';
        break;
      case 'no_renovacion_arriendo':
        personOrOrg = data.noRenovacionArriendo.nombreRemitente || 'Arrendador';
        break;
      case 'contrato_arrendamiento':
        personOrOrg = data.contratoArrendamiento.nombreArrendatario || 'Inquilino';
        break;
      case 'acta_entrega':
        personOrOrg = data.actaEntrega.direccionInmueble ? data.actaEntrega.direccionInmueble.slice(0, 15) : 'Inmueble';
        break;
      case 'derecho_peticion':
        personOrOrg = data.derechoPeticion.nombrePeticionario || 'Peticionario';
        break;
      case 'poder_autorizacion':
        personOrOrg = data.poderAutorizacion.nombreOtorgante || 'Otorgante';
        break;
      case 'habeas_data':
        personOrOrg = data.habeasData.nombreTitular || 'Titular';
        break;
      case 'acuerdo_nda':
        personOrOrg = data.acuerdoNda.nombreParteEmisora || 'Emisora';
        break;
      case 'compraventa_vehiculo':
        personOrOrg = `${data.compraventaVehiculo.placa || 'Vehiculo'}_${data.compraventaVehiculo.nombreVendedor || 'Vendedor'}`;
        break;
      case 'autorizacion_patios':
        personOrOrg = `${data.autorizacionPatios.placaVehiculo || 'Patios'}_${data.autorizacionPatios.nombrePropietario || 'Propietario'}`;
        break;
    }

    const cleanPrefix = docMeta.title.replace(/[^a-zA-Z0-9]/g, '_');
    const cleanPerson = personOrOrg.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
    return `${cleanPrefix}_${cleanPerson}_${today}.${ext}`;
  };

  const handleDownloadPdf = async () => {
    const targetElement = exportSheetRef.current || sheetRef.current;
    if (!targetElement) {
      onTriggerToast('No se encontró el documento para exportar.', 'error');
      return;
    }

    try {
      setIsExportingPdf(true);
      onTriggerToast('Generando documento PDF institucional...', 'info');
      const filename = getDynamicFilename('pdf');
      await exportElementToPdf(targetElement, filename, 'a4');
      onTriggerToast(`¡PDF descargado con éxito: ${filename}!`, 'success');
    } catch (err) {
      console.error(err);
      onTriggerToast('Hubo un inconveniente al generar el PDF. Abriendo diálogo de impresión.', 'error');
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    try {
      setIsExportingDocx(true);
      onTriggerToast('Generando archivo Word (.docx) con formato formal...', 'info');
      const filename = getDynamicFilename('docx');
      await exportDocx(selectedDoc, data, docMeta.title, filename);
      onTriggerToast(`¡Documento Word descargado con éxito: ${filename}!`, 'success');
    } catch (err) {
      console.error(err);
      onTriggerToast('Hubo un error al generar el archivo Word.', 'error');
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handleCopyText = async () => {
    try {
      const text = definition.toPlainText(currentDocData);
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      onTriggerToast('Texto legal copiado al portapapeles.', 'success');
      setTimeout(() => setHasCopied(false), 2500);
    } catch (err) {
      console.error(err);
      onTriggerToast('No se pudo copiar el texto al portapapeles.', 'error');
    }
  };

  const handleNativePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-57px)] w-full overflow-hidden bg-slate-50 dark:bg-[#0B0F19] transition-colors">
      {/* 1. Top action & navigation bar */}
      <div className="no-print bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-2xs z-20">
        {/* Left: Volver + Document Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer border border-slate-200 dark:border-slate-700"
            title="Volver al catálogo"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>Catálogo</span>
          </button>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {docMeta.title}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                {docMeta.lawReference}
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {completionPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Mobile Selector: [ Formulario ] | [ Vista A4 ] */}
        <div className="lg:hidden flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveMobileTab('form')}
            className={`min-h-[44px] px-3.5 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMobileTab === 'form'
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-100'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Formulario</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMobileTab('preview')}
            className={`min-h-[44px] px-3.5 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMobileTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Vista A4</span>
          </button>
        </div>

        {/* Right Desktop Actions */}
        <div className="hidden lg:flex items-center flex-wrap gap-2 text-xs">
          {/* Llenar con datos de prueba */}
          <button
            type="button"
            onClick={() => {
              onLoadSample(selectedDoc);
              onTriggerToast('Documento autollenado con datos de prueba realistas.', 'info');
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-semibold text-indigo-700 dark:text-slate-200 bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 border border-indigo-200/80 dark:border-slate-700 rounded-xl shadow-2xs transition cursor-pointer"
            title="Llenar con datos de prueba realistas"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Ejemplo</span>
          </button>

          {/* Autocompletar con perfil */}
          <button
            type="button"
            onClick={onApplyProfile}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-xl shadow-2xs transition cursor-pointer"
            title="Autocompletar con datos de tu perfil"
          >
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{userProfile?.nombreCompleto ? 'Mi Perfil' : 'Perfil'}</span>
          </button>

          {/* Limpiar */}
          <button
            type="button"
            onClick={() => {
              onReset(selectedDoc);
              onTriggerToast('Campos reiniciados.', 'info');
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-2.5 py-2 font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs transition cursor-pointer"
            title="Limpiar formulario"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Limpiar</span>
          </button>

          {/* Copiar texto */}
          <button
            type="button"
            onClick={handleCopyText}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs transition cursor-pointer"
            title="Copiar texto formal al portapapeles"
          >
            {hasCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300 font-semibold">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Copiar</span>
              </>
            )}
          </button>

          {/* Descargar Word (.docx) */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs transition cursor-pointer disabled:opacity-50"
            title="Descargar documento Word (.docx)"
          >
            {isExportingDocx ? (
              <Loader2 className="w-4 h-4 text-slate-600 dark:text-slate-400 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            )}
            <span className="font-semibold">Word</span>
          </button>

          {/* Descargar PDF */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
            title="Descargar documento en PDF"
          >
            {isExportingPdf ? (
              <Loader2 className="w-4 h-4 text-white dark:text-slate-900 animate-spin" />
            ) : (
              <Download className="w-4 h-4 text-white dark:text-slate-900" />
            )}
            <span>Descargar PDF</span>
          </button>

          {/* Imprimir */}
          <button
            type="button"
            onClick={handleNativePrint}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-2.5 py-2 font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs transition cursor-pointer"
            title="Imprimir directamente"
          >
            <Printer className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* 2. Main 2-Column Split Layout (Desktop: 50% / 50%) */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* Left Panel: Form */}
        <div
          className={`no-print w-full lg:w-1/2 lg:block h-full overflow-y-auto bg-slate-50/50 dark:bg-[#0B0F19] border-r border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 transition-all pb-24 lg:pb-8 ${
            activeMobileTab === 'form' ? 'block' : 'hidden'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Quick Profile helper card */}
            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl shadow-2xs flex flex-wrap items-center justify-between gap-3 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block">
                    {userProfile?.nombreCompleto
                      ? `Datos de: ${userProfile.nombreCompleto}`
                      : 'Datos del Emisor'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    {userProfile?.nombreCompleto
                      ? 'Inyecta tu identificación y firma con 1 clic'
                      : 'Configura tus datos para autocompletar formularios'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onApplyProfile}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                >
                  {userProfile?.nombreCompleto ? 'Autollenar con mi perfil' : 'Configurar perfil'}
                </button>
                <button
                  type="button"
                  onClick={onOpenProfileModal}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-medium transition cursor-pointer"
                  title="Editar perfil guardado"
                >
                  <UserCog className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick sample button for mobile (prominent) */}
            <div className="lg:hidden flex items-center justify-between gap-2 p-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                ¿Deseas probar este trámite rápido?
              </span>
              <button
                type="button"
                onClick={() => {
                  onLoadSample(selectedDoc);
                  onTriggerToast('Datos de prueba cargados.', 'info');
                }}
                className="min-h-[44px] px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Datos de prueba</span>
              </button>
            </div>

            {/* Form Section Header with Auto-save indicator */}
            <div className="pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Formulario Guiado
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Diligencia los campos requeridos para estructurar el documento oficial.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Autoguardado
              </span>
            </div>

            {/* Dynamic Modular Form Resolution */}
            {definition.renderForm({
              data: currentDocData,
              onChange: (updated) => onUpdateData(dataKey, updated),
              onSaveSignatureToProfile,
            })}
          </div>
        </div>

        {/* Right Panel: Simulated A4 Sheet Preview */}
        <div
          className={`w-full lg:w-1/2 lg:block h-full transition-all pb-24 lg:pb-0 ${
            activeMobileTab === 'preview' ? 'block' : 'hidden'
          }`}
        >
          <DocumentPreview
            selectedDoc={selectedDoc}
            data={data}
            styleConfig={styleConfig}
            onUpdateStyle={onUpdateStyle}
            sheetRef={sheetRef}
            onPrint={handleNativePrint}
            onDownloadPdf={handleDownloadPdf}
          />
        </div>
      </div>

      {/* 3. Barra inferior de descarga fija para móviles (Bottom Sheet Bar) */}
      <div className="lg:hidden no-print fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2.5 shadow-2xl safe-area-bottom">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Botón 1: Descargar PDF */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="min-h-[44px] flex flex-col items-center justify-center p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-600 text-white text-[11px] font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isExportingPdf ? (
              <Loader2 className="w-4 h-4 text-white dark:text-slate-900 animate-spin mb-0.5" />
            ) : (
              <Download className="w-4 h-4 text-white dark:text-slate-900 mb-0.5" />
            )}
            <span className="truncate">Descargar PDF</span>
          </button>

          {/* Botón 2: Descargar Word (.docx) */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="min-h-[44px] flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isExportingDocx ? (
              <Loader2 className="w-4 h-4 text-slate-600 dark:text-slate-400 animate-spin mb-0.5" />
            ) : (
              <FileText className="w-4 h-4 text-slate-700 dark:text-slate-300 mb-0.5" />
            )}
            <span className="truncate">Word (.docx)</span>
          </button>

          {/* Botón 3: Copiar Texto */}
          <button
            type="button"
            onClick={handleCopyText}
            className="min-h-[44px] flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold transition active:scale-95 cursor-pointer"
          >
            {hasCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-0.5" />
                <span className="text-emerald-700 dark:text-emerald-300 font-bold truncate">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400 mb-0.5" />
                <span className="truncate">Copiar Texto</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Phase 4: Off-screen fixed 794px width container for reliable PDF generation on all devices */}
      <div
        ref={exportSheetRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '794px',
          backgroundColor: '#ffffff',
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        {definition.renderView({
          data: currentDocData,
          styleConfig,
        })}
      </div>
    </div>
  );
};
