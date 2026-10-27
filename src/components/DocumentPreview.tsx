import React, { useState } from 'react';
import {
  DocumentType,
  AllDocumentsData,
  DocumentStyleConfig,
} from '../types/documents';
import { CuentaCobroTemplate } from './templates/CuentaCobroTemplate';
import { PropuestaServiciosTemplate } from './templates/PropuestaServiciosTemplate';
import { ContratoPrestacionTemplate } from './templates/ContratoPrestacionTemplate';
import { CartaRenunciaTemplate } from './templates/CartaRenunciaTemplate';
import { CertificadoLaboralTemplate } from './templates/CertificadoLaboralTemplate';
import { PermisoLaboralTemplate } from './templates/PermisoLaboralTemplate';
import { NoRenovacionArriendoTemplate } from './templates/NoRenovacionArriendoTemplate';
import { ContratoArrendamientoTemplate } from './templates/ContratoArrendamientoTemplate';
import { ActaEntregaTemplate } from './templates/ActaEntregaTemplate';
import { DerechoPeticionTemplate } from './templates/DerechoPeticionTemplate';
import { PoderAutorizacionTemplate } from './templates/PoderAutorizacionTemplate';
import { HabeasDataTemplate } from './templates/HabeasDataTemplate';
import { ZoomIn, ZoomOut, Maximize2, Type, Printer, FileDown } from 'lucide-react';

interface Props {
  selectedDoc: DocumentType;
  data: AllDocumentsData;
  styleConfig: DocumentStyleConfig;
  onUpdateStyle: (config: DocumentStyleConfig) => void;
  sheetRef?: React.RefObject<HTMLDivElement | null>;
  onPrint?: () => void;
  onDownloadPdf?: () => void;
}

export const DocumentPreview: React.FC<Props> = ({
  selectedDoc,
  data,
  styleConfig,
  onUpdateStyle,
  sheetRef,
  onPrint,
  onDownloadPdf,
}) => {
  const [zoom, setZoom] = useState<number>(100);

  const handleZoomChange = (delta: number) => {
    setZoom((prev) => Math.min(130, Math.max(65, prev + delta)));
  };

  const renderActiveTemplate = () => {
    switch (selectedDoc) {
      case 'cuenta_cobro':
        return <CuentaCobroTemplate data={data.cuentaCobro} styleConfig={styleConfig} />;
      case 'propuesta_servicios':
        return <PropuestaServiciosTemplate data={data.propuestaServicios} styleConfig={styleConfig} />;
      case 'contrato_prestacion':
        return <ContratoPrestacionTemplate data={data.contratoPrestacion} styleConfig={styleConfig} />;
      case 'carta_renuncia':
        return <CartaRenunciaTemplate data={data.cartaRenuncia} styleConfig={styleConfig} />;
      case 'certificado_laboral':
        return <CertificadoLaboralTemplate data={data.certificadoLaboral} styleConfig={styleConfig} />;
      case 'permiso_laboral':
        return <PermisoLaboralTemplate data={data.permisoLaboral} styleConfig={styleConfig} />;
      case 'no_renovacion_arriendo':
        return <NoRenovacionArriendoTemplate data={data.noRenovacionArriendo} styleConfig={styleConfig} />;
      case 'contrato_arrendamiento':
        return <ContratoArrendamientoTemplate data={data.contratoArrendamiento} styleConfig={styleConfig} />;
      case 'acta_entrega':
        return <ActaEntregaTemplate data={data.actaEntrega} styleConfig={styleConfig} />;
      case 'derecho_peticion':
        return <DerechoPeticionTemplate data={data.derechoPeticion} styleConfig={styleConfig} />;
      case 'poder_autorizacion':
        return <PoderAutorizacionTemplate data={data.poderAutorizacion} styleConfig={styleConfig} />;
      case 'habeas_data':
        return <HabeasDataTemplate data={data.habeasData} styleConfig={styleConfig} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-200/70 overflow-hidden relative">
      {/* Top preview toolbar: Zoom + Typography styling controls */}
      <div className="no-print bg-white/95 backdrop-blur-xs border-b border-slate-200 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">Formato Estándar Carta / A4</span>
          <span className="text-slate-300">|</span>
          {/* Typography toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => onUpdateStyle({ ...styleConfig, fontFamily: 'serif' })}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                styleConfig.fontFamily === 'serif'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tipografía Editorial / Notarial (Merriweather)"
            >
              Editorial (Serif)
            </button>
            <button
              onClick={() => onUpdateStyle({ ...styleConfig, fontFamily: 'sans' })}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                styleConfig.fontFamily === 'sans'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tipografía Moderna / Corporativa (Sans)"
            >
              Moderna (Sans)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => handleZoomChange(-10)}
              disabled={zoom <= 65}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
              title="Reducir zoom"
              aria-label="Reducir zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] font-semibold text-slate-700 min-w-[42px] text-center">
              {zoom}%
            </span>
            <button
              onClick={() => handleZoomChange(10)}
              disabled={zoom >= 130}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
              title="Aumentar zoom"
              aria-label="Aumentar zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setZoom(100)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title="Restablecer al 100%"
            aria-label="Restablecer al 100%"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable Viewport with Simulated Paper Sheet */}
      <div className="flex-1 overflow-auto p-3 sm:p-6 md:p-8 flex justify-center items-start preview-wrapper">
        <div
          ref={sheetRef}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="print-area w-full max-w-[800px] bg-white rounded-sm shadow-xl border border-slate-300/80 my-2 select-text"
        >
          {renderActiveTemplate()}
        </div>
      </div>

      {/* Bottom quick hints & actions */}
      <div className="no-print bg-slate-900 text-white text-[11px] px-4 py-2 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="text-slate-300 hidden sm:inline">
            Previsualización en tiempo real — 100% privado en tu navegador
          </span>
          <span className="text-slate-300 sm:hidden">
            Listo para exportar
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onDownloadPdf && (
            <button
              onClick={onDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-medium transition-colors shadow-xs"
            >
              <FileDown className="w-3.5 h-3.5" />
              Descargar PDF
            </button>
          )}
          {onPrint && (
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium transition-colors border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
