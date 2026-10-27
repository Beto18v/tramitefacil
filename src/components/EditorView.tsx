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
import { AcuerdoNdaForm } from './forms/AcuerdoNdaForm';
import { CompraventaVehiculoForm } from './forms/CompraventaVehiculoForm';
import { AutorizacionPatiosForm } from './forms/AutorizacionPatiosForm';

import {
  LuArrowLeft,
  LuSparkles,
  LuRotateCcw,
  LuCopy,
  LuCheck,
  LuDownload,
  LuFileText,
  LuPrinter,
  LuLoaderCircle,
  LuUserCheck,
  LuUserCog,
} from 'react-icons/lu';

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

const calculateDocCompletion = (docType: DocumentType, allData: AllDocumentsData): number => {
  let docObj: Record<string, any> = {};
  switch (docType) {
    case 'cuenta_cobro':
      docObj = allData.cuentaCobro;
      break;
    case 'propuesta_servicios':
      docObj = allData.propuestaServicios;
      break;
    case 'contrato_prestacion':
      docObj = allData.contratoPrestacion;
      break;
    case 'carta_renuncia':
      docObj = allData.cartaRenuncia;
      break;
    case 'certificado_laboral':
      docObj = allData.certificadoLaboral;
      break;
    case 'permiso_laboral':
      docObj = allData.permisoLaboral;
      break;
    case 'no_renovacion_arriendo':
      docObj = allData.noRenovacionArriendo;
      break;
    case 'contrato_arrendamiento':
      docObj = allData.contratoArrendamiento;
      break;
    case 'acta_entrega':
      docObj = allData.actaEntrega;
      break;
    case 'derecho_peticion':
      docObj = allData.derechoPeticion;
      break;
    case 'poder_autorizacion':
      docObj = allData.poderAutorizacion;
      break;
    case 'habeas_data':
      docObj = allData.habeasData;
      break;
    case 'acuerdo_nda':
      docObj = allData.acuerdoNda;
      break;
    case 'compraventa_vehiculo':
      docObj = allData.compraventaVehiculo;
      break;
    case 'autorizacion_patios':
      docObj = allData.autorizacionPatios;
      break;
  }

  const entries = Object.entries(docObj);
  if (entries.length === 0) return 0;

  let filled = 0;
  for (const [, val] of entries) {
    if (typeof val === 'string' && val.trim().length > 0) {
      filled++;
    } else if (typeof val === 'number' && val > 0) {
      filled++;
    } else if (typeof val === 'boolean' && val === true) {
      filled++;
    } else if (Array.isArray(val) && val.length > 0) {
      filled++;
    }
  }

  return Math.min(100, Math.max(10, Math.round((filled / entries.length) * 100)));
};

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
  const docMeta = DOCUMENT_CATALOG.find((d) => d.id === selectedDoc) || DOCUMENT_CATALOG[0];

  const completionPercentage = useMemo(() => {
    return calculateDocCompletion(selectedDoc, data);
  }, [selectedDoc, data]);

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
    if (!sheetRef.current) {
      onTriggerToast('No se encontró el documento para exportar.', 'error');
      return;
    }

    try {
      setIsExportingPdf(true);
      onTriggerToast('Generando documento PDF institucional...', 'info');
      const filename = getDynamicFilename('pdf');
      await exportElementToPdf(sheetRef.current, filename, 'a4');
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
      const text = generarTextoPlano(selectedDoc, data);
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

  // Form Renderer
  const renderCurrentForm = () => {
    switch (selectedDoc) {
      case 'cuenta_cobro':
        return (
          <CuentaCobroForm
            data={data.cuentaCobro}
            onChange={(updated) => onUpdateData('cuentaCobro', updated)}
            onSaveSignatureToProfile={onSaveSignatureToProfile}
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
            onSaveSignatureToProfile={onSaveSignatureToProfile}
          />
        );
      case 'carta_renuncia':
        return (
          <CartaRenunciaForm
            data={data.cartaRenuncia}
            onChange={(updated) => onUpdateData('cartaRenuncia', updated)}
            onSaveSignatureToProfile={onSaveSignatureToProfile}
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
            onSaveSignatureToProfile={onSaveSignatureToProfile}
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
            onSaveSignatureToProfile={onSaveSignatureToProfile}
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
      case 'acuerdo_nda':
        return (
          <AcuerdoNdaForm
            data={data.acuerdoNda}
            onChange={(updated) => onUpdateData('acuerdoNda', updated)}
            onSaveSignatureToProfile={onSaveSignatureToProfile}
          />
        );
      case 'compraventa_vehiculo':
        return (
          <CompraventaVehiculoForm
            data={data.compraventaVehiculo}
            onChange={(updated) => onUpdateData('compraventaVehiculo', updated)}
            onSaveSignatureToProfile={onSaveSignatureToProfile}
          />
        );
      case 'autorizacion_patios':
        return (
          <AutorizacionPatiosForm
            data={data.autorizacionPatios}
            onChange={(updated) => onUpdateData('autorizacionPatios', updated)}
            onSaveSignatureToProfile={onSaveSignatureToProfile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-57px)] w-full overflow-hidden bg-[#F8FAFC]">
      {/* 1. Top action & navigation bar (Clean Corporate Bar) */}
      <div className="no-print bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-2xs z-20">
        {/* Left: Botón de retroceso + Nombre del documento actual */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold transition cursor-pointer border border-slate-200"
            title="Volver al catálogo"
          >
            <LuArrowLeft className="w-4 h-4 text-slate-600" />
            <span>← Volver al catálogo</span>
          </button>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900 leading-tight">
              {docMeta.title}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                {docMeta.lawReference}
              </span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="font-mono text-[11px] text-slate-600">
                {completionPercentage}% completado
              </span>
            </div>
          </div>
        </div>

        {/* Center Mobile Selector: [ 📝 Llenar Formulario ] | [ 📄 Ver Documento A4 ] */}
        <div className="lg:hidden flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveMobileTab('form')}
            className={`min-h-[44px] px-3.5 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMobileTab === 'form'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📝</span>
            <span>Llenar Formulario</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMobileTab('preview')}
            className={`min-h-[44px] px-3.5 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMobileTab === 'preview'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📄</span>
            <span>Ver Documento A4</span>
          </button>
        </div>

        {/* Right Desktop Actions: Llenar prueba, Limpiar, Copiar, Word, PDF */}
        <div className="hidden lg:flex items-center flex-wrap gap-2 text-xs">
          {/* Botón de acción rápida: Llenar con datos de prueba */}
          <button
            type="button"
            onClick={() => {
              onLoadSample(selectedDoc);
              onTriggerToast('Documento autollenado con datos de prueba realistas.', 'info');
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl shadow-2xs transition cursor-pointer"
            title="Llenar con datos de prueba realistas"
          >
            <LuSparkles className="w-4 h-4 text-blue-600" />
            <span>🪄 Llenar con datos de prueba</span>
          </button>

          {/* Autocompletar con perfil */}
          <button
            type="button"
            onClick={onApplyProfile}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shadow-2xs transition cursor-pointer"
            title="Autocompletar con datos de tu perfil"
          >
            <LuUserCheck className="w-4 h-4 text-emerald-600" />
            <span>{userProfile?.nombreCompleto ? 'Mi Perfil' : 'Perfil'}</span>
          </button>

          {/* Limpiar */}
          <button
            type="button"
            onClick={() => {
              onReset(selectedDoc);
              onTriggerToast('Campos reiniciados.', 'info');
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-2.5 py-2 font-medium text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition cursor-pointer"
            title="Limpiar formulario"
          >
            <LuRotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Limpiar</span>
          </button>

          {/* Copiar texto */}
          <button
            type="button"
            onClick={handleCopyText}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition cursor-pointer"
            title="Copiar texto formal al portapapeles"
          >
            {hasCopied ? (
              <>
                <LuCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">¡Copiado!</span>
              </>
            ) : (
              <>
                <LuCopy className="w-4 h-4 text-slate-500" />
                <span>Copiar</span>
              </>
            )}
          </button>

          {/* Descargar Word (.docx) */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl shadow-2xs transition cursor-pointer disabled:opacity-50"
            title="Descargar documento Word (.docx)"
          >
            {isExportingDocx ? (
              <LuLoaderCircle className="w-4 h-4 text-slate-600 animate-spin" />
            ) : (
              <LuFileText className="w-4 h-4 text-slate-700" />
            )}
            <span className="font-semibold">Word (.docx)</span>
          </button>

          {/* Descargar PDF (Azul Corporativo) */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm transition cursor-pointer disabled:opacity-50"
            title="Descargar documento en PDF"
          >
            {isExportingPdf ? (
              <LuLoaderCircle className="w-4 h-4 text-white animate-spin" />
            ) : (
              <LuDownload className="w-4 h-4 text-white" />
            )}
            <span>Descargar PDF</span>
          </button>

          {/* Imprimir */}
          <button
            type="button"
            onClick={handleNativePrint}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-2.5 py-2 font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition cursor-pointer"
            title="Imprimir directamente"
          >
            <LuPrinter className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* 2. Main 2-Column Split Layout (Desktop: 50% / 50%) */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* Left Panel: Form */}
        <div
          className={`no-print w-full lg:w-1/2 lg:block h-full overflow-y-auto bg-[#F8FAFC] border-r border-slate-200 p-4 sm:p-6 transition-all pb-24 lg:pb-8 ${
            activeMobileTab === 'form' ? 'block' : 'hidden'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Quick Profile helper card */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-3 border border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <LuUserCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    {userProfile?.nombreCompleto
                      ? `Datos de: ${userProfile.nombreCompleto}`
                      : 'Datos del Emisor'}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {userProfile?.nombreCompleto
                      ? 'Inyecta tu identificación y firma con 1 clic'
                      : 'Configura tus datos para no tener que repetirlos'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onApplyProfile}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                >
                  {userProfile?.nombreCompleto ? '⚡ Aplicar Perfil' : 'Configurar'}
                </button>
                <button
                  type="button"
                  onClick={onOpenProfileModal}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium transition cursor-pointer"
                  title="Editar perfil guardado"
                >
                  <LuUserCog className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick sample button for mobile (prominent) */}
            <div className="lg:hidden flex items-center justify-between gap-2 p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl">
              <span className="text-xs text-blue-900 font-medium">
                ¿Deseas probar este trámite rápido?
              </span>
              <button
                type="button"
                onClick={() => {
                  onLoadSample(selectedDoc);
                  onTriggerToast('Datos de prueba cargados.', 'info');
                }}
                className="min-h-[44px] px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <LuSparkles className="w-3.5 h-3.5" />
                <span>🪄 Llenar datos</span>
              </button>
            </div>

            {/* Form Section Header with Auto-save indicator */}
            <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 tracking-tight">
                  Formulario Guiado
                </h2>
                <p className="text-xs text-slate-500">
                  Diligencia los campos requeridos para estructurar el documento.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Guardado automático
              </span>
            </div>

            {renderCurrentForm()}
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

      {/* 3. Barra inferior de descarga fija (Bottom Sheet Bar) */}
      <div className="lg:hidden no-print fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-2xl safe-area-bottom">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Botón 1: Descargar PDF (Azul Corporativo con LuDownload) */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="min-h-[44px] flex flex-col items-center justify-center p-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[11px] font-semibold shadow-sm transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isExportingPdf ? (
              <LuLoaderCircle className="w-4 h-4 text-white animate-spin mb-0.5" />
            ) : (
              <LuDownload className="w-4 h-4 text-white mb-0.5" />
            )}
            <span className="truncate">Descargar PDF</span>
          </button>

          {/* Botón 2: Descargar Word (.docx) (Estilo secundario con LuFileText) */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="min-h-[44px] flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-[11px] font-semibold transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isExportingDocx ? (
              <LuLoaderCircle className="w-4 h-4 text-slate-600 animate-spin mb-0.5" />
            ) : (
              <LuFileText className="w-4 h-4 text-slate-700 mb-0.5" />
            )}
            <span className="truncate">Word (.docx)</span>
          </button>

          {/* Botón 3: Copiar Texto (con feedback visual de copiado) */}
          <button
            type="button"
            onClick={handleCopyText}
            className="min-h-[44px] flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-[11px] font-semibold transition active:scale-95 cursor-pointer"
          >
            {hasCopied ? (
              <>
                <LuCheck className="w-4 h-4 text-emerald-600 mb-0.5" />
                <span className="text-emerald-700 font-bold truncate">¡Copiado!</span>
              </>
            ) : (
              <>
                <LuCopy className="w-4 h-4 text-slate-600 mb-0.5" />
                <span className="truncate">Copiar Texto</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
