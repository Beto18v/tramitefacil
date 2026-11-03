import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Loader2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';
import { DocumentType } from '../../types/documents';
import { autofillDocumentWithAi } from '../../services/aiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  docType: DocumentType;
  docTitle: string;
  currentData: any;
  onApplyData: (extractedFields: Record<string, any>) => void;
  onTriggerToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const AiAutofillModal: React.FC<Props> = ({
  isOpen,
  onClose,
  docType,
  docTitle,
  currentData,
  onApplyData,
  onTriggerToast,
}) => {
  const [narrative, setNarrative] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedPreview, setExtractedPreview] = useState<Record<string, any> | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    const trimmed = narrative.trim();
    if (!trimmed || trimmed.length < 5) {
      onTriggerToast('Por favor describe o pega la información de tu caso.', 'info');
      return;
    }

    try {
      setIsLoading(true);
      setExtractedPreview(null);
      const res = await autofillDocumentWithAi(docType, trimmed, currentData);

      if (res.success && res.extractedFields) {
        setExtractedPreview(res.extractedFields);
        onTriggerToast('¡Datos extraídos con éxito! Revisa la vista previa y aplícalos.', 'success');
      } else {
        onTriggerToast(res.error || 'No se pudieron extraer los datos con IA.', 'error');
      }
    } catch (err: any) {
      console.error(err);
      onTriggerToast('Error de comunicación con el servicio de IA.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmApply = () => {
    if (extractedPreview) {
      onApplyData(extractedPreview);
      onTriggerToast('¡Formulario completado con los datos extraídos!', 'success');
      handleClose();
    }
  };

  const handleClose = () => {
    setNarrative('');
    setExtractedPreview(null);
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-xl space-y-5 transition-colors overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Autollenar con IA (Prompt-to-Document)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {docTitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-indigo-50/60 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-indigo-100 dark:border-slate-700/80 space-y-1 text-xs text-slate-600 dark:text-slate-300">
          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Pega o redacta los datos de tu trámite</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Escribe en lenguaje natural nombres, fechas, valores monetarios o cláusulas. La IA de costo ultrabajo mapeará los datos a los campos de este documento sin inventar información.
          </p>
        </div>

        {/* Input Textarea */}
        <div className="space-y-2">
          <textarea
            rows={4}
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
            disabled={isLoading}
            placeholder="Ejemplo: Arriendo apartamento 402 en la Calle 123 # 45-67 de Bogotá a Juan Camilo Pérez con cédula 1.020.304.505 por un valor mensual de 1.800.000 pesos por un término de 12 meses iniciando el 1 de diciembre de 2026..."
            className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 transition shadow-2xs resize-none"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              Entrada protegida con sanitización anti-inyección
            </span>
            <span className="font-mono">{narrative.length}/2500</span>
          </div>
        </div>

        {/* Preview of Extracted Fields */}
        {extractedPreview && (
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Campos detectados y listos para aplicar ({Object.keys(extractedPreview).length}):
              </span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900">
              {Object.entries(extractedPreview).map(([key, val]) => (
                <div key={key} className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 last:border-0 py-0.5">
                  <span className="text-slate-500 dark:text-slate-400">{key}:</span>
                  <span className="text-slate-900 dark:text-slate-100 font-semibold text-right truncate">
                    {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleClose}
            className="min-h-[44px] px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl transition cursor-pointer"
          >
            Cancelar
          </button>

          {!extractedPreview ? (
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading || narrative.trim().length < 5}
              className="min-h-[44px] px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Procesando con Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Extraer y Autollenar</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmApply}
              className="min-h-[44px] px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Aplicar al Formulario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

