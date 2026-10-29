import React, { useState } from 'react';
import {
  DocumentType,
  AllDocumentsData,
  DocumentStyleConfig,
} from '../types/documents';
import { getDocumentDefinition, DOC_TYPE_TO_DATA_KEY } from '../templates';
import { ZoomIn, ZoomOut, Maximize2, Printer, Download, Sparkles } from 'lucide-react';

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

  const definition = getDocumentDefinition(selectedDoc);
  const dataKey = DOC_TYPE_TO_DATA_KEY[selectedDoc];
  const currentDocData = data[dataKey];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-100/90 dark:bg-[#0B0F19] overflow-hidden relative transition-colors">
      {/* Top preview toolbar: Zoom + Typography styling controls */}
      <div className="no-print bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Vista A4 Institucional
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          {/* Typography toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onUpdateStyle({ ...styleConfig, fontFamily: 'serif' })}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                styleConfig.fontFamily === 'serif'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Tipografía Editorial / Notarial (Merriweather)"
            >
              Editorial (Serif)
            </button>
            <button
              onClick={() => onUpdateStyle({ ...styleConfig, fontFamily: 'sans' })}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                styleConfig.fontFamily === 'sans'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Tipografía Moderna / Corporativa (Sans)"
            >
              Moderna (Sans)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => handleZoomChange(-10)}
              disabled={zoom <= 65}
              className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 disabled:opacity-30 transition-colors cursor-pointer"
              title="Reducir zoom"
              aria-label="Reducir zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 min-w-[42px] text-center">
              {zoom}%
            </span>
            <button
              onClick={() => handleZoomChange(10)}
              disabled={zoom >= 130}
              className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 disabled:opacity-30 transition-colors cursor-pointer"
              title="Aumentar zoom"
              aria-label="Aumentar zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setZoom(100)}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            title="Restablecer al 100%"
            aria-label="Restablecer al 100%"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable Viewport with Simulated Paper Sheet (CRITICAL INVARIANT: ALWAYS bg-white text-slate-900) */}
      <div className="flex-1 overflow-auto p-3 sm:p-6 md:p-8 flex justify-center items-start preview-wrapper">
        <div
          ref={sheetRef}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="print-area w-full max-w-[800px] bg-white text-slate-900 rounded-xs shadow-[0_15px_35px_rgba(15,23,42,0.12),_0_5px_15px_rgba(15,23,42,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-300/80 dark:border-slate-700 my-2 select-text"
        >
          {definition.renderView({
            data: currentDocData,
            styleConfig,
          })}
        </div>
      </div>

      {/* Bottom quick hints & actions for Desktop */}
      <div className="no-print hidden sm:flex bg-slate-900 dark:bg-slate-950 text-white text-[11px] px-4 py-2 border-t border-slate-800 items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="text-slate-300">
            Previsualización en vivo conforme a estándares jurídicos y comerciales colombianos
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onDownloadPdf && (
            <button
              onClick={onDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white bg-slate-800 hover:bg-slate-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer border border-slate-700 dark:border-indigo-500"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar PDF
            </button>
          )}
          {onPrint && (
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
