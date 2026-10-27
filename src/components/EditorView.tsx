import React, { useState, useRef } from 'react';
import {
  DocumentType,
  AllDocumentsData,
  DocumentStyleConfig,
  DOCUMENT_CATALOG,
} from '../types/documents';
import { DocumentPreview } from './DocumentPreview';
import { exportElementToPdf } from '../utils/exportPdf';
import { exportDocx } from '../utils/exportDocx';
import { generarTextoPlano } from '../utils/plainTextGenerator';

// Forms
import { CuentaCobroForm } from './forms/CuentaCobroForm';
import { PropuestaServiciosForm } from './forms/PropuestaServiciosForm';
import { ContratoPrestacionForm } from './forms/ContratoPrestacionForm';
import { CartaRenunciaForm } from './forms/CartaRenunciaForm';
import { CertificadoLaboralForm } from './forms/CertificadoLaboralForm';
import { PermisoLaboralForm } from './forms/PermisoLaboralForm';
import { NoRenovacionArriendoForm } from './forms/NoRenovacionArriendoForm';
import { ContratoArrendamientoForm } from './forms/ContratoArrendamientoForm';
import { ActaEntregaForm } from './forms/ActaEntregaForm';
import { DerechoPeticionForm } from './forms/DerechoPeticionForm';
import { PoderAutorizacionForm } from './forms/PoderAutorizacionForm';
import { HabeasDataForm } from './forms/HabeasDataForm';

import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  FileDown,
  Printer,
  FileText,
  Eye,
  Edit3,
  Loader2,
  Share2,
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
}) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'form' | 'preview'>('form');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const docMeta = DOCUMENT_CATALOG.find((d) => d.id === selectedDoc) || DOCUMENT_CATALOG[0];

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
    }

    const cleanPrefix = docMeta.title.replace(/[^a-zA-Z0-9]/g, '_');
    const cleanPerson = personOrOrg.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
    return `${cleanPrefix}_${cleanPerson}_${today}.${ext}`;
  };

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) {
      onTriggerToast('No se encontró el elemento para exportar PDF.', 'error');
      return;
    }

    try {
      setIsExportingPdf(true);
      onTriggerToast('Generando documento PDF de alta fidelidad...', 'info');
      const filename = getDynamicFilename('pdf');
      await exportElementToPdf(sheetRef.current, filename, 'a4');
      onTriggerToast(`¡PDF descargado con éxito: ${filename}!`, 'success');
    } catch (err) {
      console.error(err);
      onTriggerToast('Hubo un error al generar el PDF. Abriendo diálogo nativo.', 'error');
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    try {
      setIsExportingDocx(true);
      onTriggerToast('Generando archivo editable en formato Word (.docx)...', 'info');
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
      const text = generarTextoPlano(selectedDoc, data);
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      onTriggerToast('Texto formal copiado al portapapeles con éxito.', 'success');
      setTimeout(() => setHasCopied(false), 2500);
    } catch (err) {
      console.error(err);
      onTriggerToast('No se pudo copiar el texto al portapapeles.', 'error');
    }
  };

  const handleNativePrint = () => {
    window.print();
  };

  // Form Renderer
  const renderCurrentForm = () => {
    switch (selectedDoc) {
      case 'cuenta_cobro':
        return (
          <CuentaCobroForm
            data={data.cuentaCobro}
            onChange={(updated) => onUpdateData('cuentaCobro', updated)}
          />
        );
      case 'propuesta_servicios':
        return (
          <PropuestaServiciosForm
            data={data.propuestaServicios}
            onChange={(updated) => onUpdateData('propuestaServicios', updated)}
          />
        );
      case 'contrato_prestacion':
        return (
          <ContratoPrestacionForm
            data={data.contratoPrestacion}
            onChange={(updated) => onUpdateData('contratoPrestacion', updated)}
          />
        );
      case 'carta_renuncia':
        return (
          <CartaRenunciaForm
            data={data.cartaRenuncia}
            onChange={(updated) => onUpdateData('cartaRenuncia', updated)}
          />
        );
      case 'certificado_laboral':
        return (
          <CertificadoLaboralForm
            data={data.certificadoLaboral}
            onChange={(updated) => onUpdateData('certificadoLaboral', updated)}
          />
        );
      case 'permiso_laboral':
        return (
          <PermisoLaboralForm
            data={data.permisoLaboral}
            onChange={(updated) => onUpdateData('permisoLaboral', updated)}
          />
        );
      case 'no_renovacion_arriendo':
        return (
          <NoRenovacionArriendoForm
            data={data.noRenovacionArriendo}
            onChange={(updated) => onUpdateData('noRenovacionArriendo', updated)}
          />
        );
      case 'contrato_arrendamiento':
        return (
          <ContratoArrendamientoForm
            data={data.contratoArrendamiento}
            onChange={(updated) => onUpdateData('contratoArrendamiento', updated)}
          />
        );
      case 'acta_entrega':
        return (
          <ActaEntregaForm
            data={data.actaEntrega}
            onChange={(updated) => onUpdateData('actaEntrega', updated)}
          />
        );
      case 'derecho_peticion':
        return (
          <DerechoPeticionForm
            data={data.derechoPeticion}
            onChange={(updated) => onUpdateData('derechoPeticion', updated)}
          />
        );
      case 'poder_autorizacion':
        return (
          <PoderAutorizacionForm
            data={data.poderAutorizacion}
            onChange={(updated) => onUpdateData('poderAutorizacion', updated)}
          />
        );
      case 'habeas_data':
        return (
          <HabeasDataForm
            data={data.habeasData}
            onChange={(updated) => onUpdateData('habeasData', updated)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-57px)] w-full overflow-hidden bg-slate-100">
      {/* Top action & navigation bar */}
      <div className="no-print bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-2xs">
        {/* Left: Back button + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
            title="Volver al catálogo de documentos"
            aria-label="Volver al catálogo"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Catálogo</span>
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 leading-tight">
                {docMeta.title}
              </span>
              <span className="hidden md:inline-block text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                {docMeta.lawReference}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline-block truncate max-w-md">
              {docMeta.description}
            </span>
          </div>
        </div>

        {/* Center: Mobile View Toggle (Tab form vs preview) */}
        <div className="lg:hidden flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveMobileTab('form')}
            className={`min-h-[44px] px-3.5 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
              activeMobileTab === 'form'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Formulario
          </button>
          <button
            onClick={() => setActiveMobileTab('preview')}
            className={`min-h-[44px] px-3.5 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
              activeMobileTab === 'preview'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Previsualizar
          </button>
        </div>

        {/* Right: Quick actions (Sample, Reset, Copy, Word, PDF, Print) */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Autollenar con datos de ejemplo */}
          <button
            onClick={() => {
              onLoadSample(selectedDoc);
              onTriggerToast('Formulario autollenado con datos de prueba realistas.', 'info');
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-medium text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50/50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Llenar con datos de ejemplo"
            aria-label="Llenar con datos de ejemplo"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Ejemplo</span>
          </button>

          {/* Limpiar */}
          <button
            onClick={() => {
              onReset(selectedDoc);
              onTriggerToast('Campos del formulario reiniciados.', 'info');
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-2.5 py-2 font-medium text-slate-500 hover:text-rose-700 bg-slate-50 hover:bg-rose-50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Limpiar formulario"
            aria-label="Limpiar formulario"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Limpiar</span>
          </button>

          {/* Copiar texto plano */}
          <button
            onClick={handleCopyText}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Copiar texto plano al portapapeles"
            aria-label="Copiar texto al portapapeles"
          >
            {hasCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold hidden md:inline">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span className="hidden md:inline">Copiar</span>
              </>
            )}
          </button>

          {/* Exportar Word (.docx) */}
          <button
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            title="Descargar documento Word (.docx) editable"
            aria-label="Descargar Word"
          >
            {isExportingDocx ? (
              <Loader2 className="w-4 h-4 text-blue-700 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 text-blue-700" />
            )}
            <span className="font-semibold">Word</span>
          </button>

          {/* Exportar PDF (html2pdf direct) */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            title="Descargar PDF de alta resolución"
            aria-label="Descargar PDF"
          >
            {isExportingPdf ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <FileDown className="w-4 h-4 text-white" />
            )}
            <span>PDF</span>
          </button>

          {/* Imprimir nativo */}
          <button
            onClick={handleNativePrint}
            className="min-h-[44px] hidden md:inline-flex items-center gap-1.5 px-3 py-2 font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Imprimir hoja directamente"
            aria-label="Imprimir hoja"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden xl:inline">Imprimir</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Form, Right Preview */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* Left Panel: Form */}
        <div
          className={`w-full lg:w-1/2 lg:block h-full overflow-y-auto bg-slate-50 border-r border-slate-200 p-4 sm:p-6 transition-all ${
            activeMobileTab === 'form' ? 'block' : 'hidden'
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <div className="mb-4 pb-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Formulario de Datos
                </h2>
                <p className="text-xs text-slate-500">
                  Los cambios se reflejan inmediatamente en la hoja de previsualización.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Guardado automático
              </span>
            </div>

            {renderCurrentForm()}
          </div>
        </div>

        {/* Right Panel: Simulated A4 Sheet Preview */}
        <div
          className={`w-full lg:w-1/2 lg:block h-full transition-all ${
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
    </div>
  );
};
