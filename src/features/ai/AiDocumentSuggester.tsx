import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Scale,
  Briefcase,
  Receipt,
  Car,
  Home,
  FileText,
  ShieldCheck,
  Building2,
  DollarSign,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Lock,
  Loader2,
  Check,
  ShoppingCart,
  Zap,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';
import { DocumentType, DocumentoFormalData } from '../../types/documents';
import {
  diagnoseLegalCase,
  generateCustomDocument,
  DiagnosticResult,
  DiagnosticOption,
} from '../../services/aiService';

interface Props {
  onSelectDoc?: (id: DocumentType, customData?: any) => void;
  className?: string;
}

interface ExampleCase {
  label: string;
  icon: LucideIcon;
  text: string;
}

const QUICK_EXAMPLES: ExampleCase[] = [
  {
    label: 'Inquilino no paga arriendo',
    icon: Home,
    text: 'Mi inquilino lleva 2 meses sin pagar el arriendo y no quiere entregar el apartamento.',
  },
  {
    label: 'Garantía de electrodoméstico',
    icon: ShoppingCart,
    text: 'Compré una nevera hace 2 semanas, vino defectuosa y en el almacén se niegan a devolverme el dinero o cambiarla.',
  },
  {
    label: 'Renuncia con liquidación',
    icon: Briefcase,
    text: 'Voy a renunciar a mi trabajo actual y necesito pedir que me exoneren del preaviso y me paguen la liquidación completa.',
  },
  {
    label: 'Cobro indebido en banco',
    icon: DollarSign,
    text: 'El banco me está cobrando un seguro que nunca solicité ni autoricé y no me quieren hacer el reembolso.',
  },
];

export const AiDocumentSuggester: React.FC<Props> = ({
  onSelectDoc,
  className = '',
}) => {
  const [caseDescription, setCaseDescription] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [offlineNotice, setOfflineNotice] = useState<string>('');

  // Referencia al AbortController del diagnóstico en curso (para abortar peticiones previas)
  const diagnoseAbortRef = useRef<AbortController | null>(null);
  // Referencia al aviso pendiente de navegación offline (para limpiarlo al desmontar)
  const offlineNavTimeoutRef = useRef<number | null>(null);
  // Último texto ya analizado con éxito (evita relanzar la consulta por el mismo caso)
  const lastDiagnosedTextRef = useRef<string>('');

  // Limpia el aviso de navegación pendiente si el componente se desmonta
  useEffect(() => {
    return () => {
      if (offlineNavTimeoutRef.current !== null) {
        window.clearTimeout(offlineNavTimeoutRef.current);
      }
    };
  }, []);

  // Análisis automático con debounce cuando el usuario escribe
  useEffect(() => {
    const trimmed = caseDescription.trim();
    if (!trimmed || trimmed.length < 8) {
      setDiagnosticResult(null);
      setSelectedOptionId('');
      setUserAnswers({});
      setIsDiagnosing(false);
      return;
    }

    // Si este texto ya fue analizado con éxito, no relanzar la consulta
    if (trimmed === lastDiagnosedTextRef.current) return;

    const controller = new AbortController();
    diagnoseAbortRef.current = controller;
    setIsDiagnosing(true);
    setErrorMessage('');
    setOfflineNotice('');

    const timer = setTimeout(async () => {
      try {
        const result = await diagnoseLegalCase(trimmed, controller.signal);
        setDiagnosticResult(result);
        if (result.options && result.options.length > 0) {
          setSelectedOptionId(result.options[0].id);
        }
        lastDiagnosedTextRef.current = trimmed;
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setIsDiagnosing(false);
      }
    }, 450);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [caseDescription]);

  const handleSelectExample = async (text: string) => {
    const trimmed = text.trim();
    // Si este texto ya fue analizado con éxito, no relanzar la consulta
    if (trimmed && trimmed === lastDiagnosedTextRef.current) {
      setCaseDescription(text);
      return;
    }

    // Aborta el diagnóstico previo (debounce) antes de lanzar la nueva consulta
    diagnoseAbortRef.current?.abort();
    const controller = new AbortController();
    diagnoseAbortRef.current = controller;
    // Marca el texto como en análisis para que el efecto del debounce no lo duplique
    lastDiagnosedTextRef.current = trimmed;

    setCaseDescription(text);
    setIsDiagnosing(true);
    setErrorMessage('');
    setOfflineNotice('');
    try {
      const result = await diagnoseLegalCase(text, controller.signal);
      setDiagnosticResult(result);
      if (result.options && result.options.length > 0) {
        setSelectedOptionId(result.options[0].id);
      }
    } catch (err) {
      // Si el fallo no fue por aborto propio, habilita el reintento del mismo texto
      if (
        (err as any)?.name !== 'AbortError' &&
        diagnoseAbortRef.current === controller
      ) {
        lastDiagnosedTextRef.current = '';
      }
      console.error(err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleClear = () => {
    setCaseDescription('');
    setDiagnosticResult(null);
    setSelectedOptionId('');
    setUserAnswers({});
    setErrorMessage('');
    setOfflineNotice('');
    lastDiagnosedTextRef.current = '';
  };

  const handleToggleAnswer = (questionId: string, optionValue: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === optionValue ? '' : optionValue,
    }));
  };

  // Acción principal: Redactar o abrir el documento
  const handleProceedWithDocument = async (option: DiagnosticOption) => {
    if (!onSelectDoc) return;

    // Si es una plantilla fija y no se requiere redacción especial de IA
    if (option.isStandardCatalogDoc && option.standardDocId && option.standardDocId !== 'documento_formal') {
      onSelectDoc(option.standardDocId);
      return;
    }

    // Si es redacción de documento formal a la medida con IA
    // Indica si la navegación quedó programada con aviso offline: en ese caso el
    // botón permanece ocupado hasta que la navegación se ejecute realmente.
    let navigationScheduled = false;
    try {
      setIsGeneratingDoc(true);
      setErrorMessage('');
      setOfflineNotice('');

      const res = await generateCustomDocument({
        caseDescription,
        selectedOptionTitle: option.title,
        answers: userAnswers,
      });

      const documentData = res.document;
      if (res.success && documentData) {
        if (res.offline) {
          // Aviso amable: el documento se preparó localmente sin conexión.
          // Se muestra brevemente antes de abrir el editor.
          setOfflineNotice(
            'El asistente preparó tu documento en modo privado sin conexión. Puedes editarlo en el formulario.'
          );
          navigationScheduled = true;
          offlineNavTimeoutRef.current = window.setTimeout(() => {
            offlineNavTimeoutRef.current = null;
            setIsGeneratingDoc(false);
            onSelectDoc('documento_formal', documentData);
          }, 1600);
        } else {
          onSelectDoc('documento_formal', documentData);
        }
      } else {
        setErrorMessage(
          'No se pudo preparar el documento en este momento. Espera unos segundos e inténtalo de nuevo.'
        );
      }
    } catch {
      setErrorMessage(
        'No se pudo preparar el documento en este momento. Espera unos segundos e inténtalo de nuevo.'
      );
    } finally {
      if (!navigationScheduled) {
        setIsGeneratingDoc(false);
      }
    }
  };

  const selectedOption = diagnosticResult?.options?.find((o) => o.id === selectedOptionId);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Paso 1: Entrada accesible para cualquier persona */}
      <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-7 space-y-4 shadow-2xs transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Paso 1: ¿Qué te ocurrió o qué necesitas tramitar?
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Escríbelo con tus propias palabras. Te explicaremos tus opciones y te ayudaremos a crear el documento adecuado.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isDiagnosing && (
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Revisando tu caso...</span>
              </span>
            )}
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              100% confidencial en tu dispositivo
            </span>
          </div>
        </div>

        {/* Textarea grande y accesible */}
        <div className="relative">
          <textarea
            rows={3}
            value={caseDescription}
            onChange={(e) => setCaseDescription(e.target.value)}
            placeholder="Ejemplo: Mi inquilino lleva 2 meses sin pagarme el arriendo y no quiere entregar el apartamento..."
            className="w-full p-4 pr-24 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition shadow-2xs resize-none leading-relaxed"
          />
          {caseDescription && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-3.5 right-3.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer min-h-[36px] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Borrar</span>
            </button>
          )}
        </div>

        {/* Ejemplos rápidos en 1 clic */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            O toca uno de estos ejemplos cotidianos para probar:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {QUICK_EXAMPLES.map((ex) => {
              const IconComp = ex.icon;
              const isSelected = caseDescription === ex.text;
              return (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => handleSelectExample(ex.text)}
                  className={`min-h-[44px] text-xs font-semibold px-3 py-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white dark:text-slate-900' : 'text-indigo-600 dark:text-indigo-400'}`} />
                  <span className="truncate">{ex.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Paso 2: Diagnóstico y Opciones Claras */}
      {diagnosticResult && !diagnosticResult.isOutOfScope && (
        <div className="bg-white dark:bg-slate-900 border-2 border-indigo-500/30 dark:border-indigo-500/40 rounded-3xl p-5 sm:p-7 space-y-6 shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header del Diagnóstico */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Paso 2: Opciones Recomendadas para tu Caso</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                ¿Cuáles son tus alternativas y qué documento te conviene generar?
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {diagnosticResult.cached ? (
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Respuesta Inmediata
                </span>
              ) : diagnosticResult.source === 'gemini_cloud' ? (
                <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  Asistente Inteligente
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-slate-500" />
                  Modo Privado sin Conexión
                </span>
              )}
            </div>
          </div>

          {/* Explicación en lenguaje sencillo */}
          <div className="bg-indigo-50/60 dark:bg-slate-800/60 rounded-2xl p-4 border border-indigo-100 dark:border-slate-700/80 space-y-1">
            <span className="text-xs font-bold text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Resumen sencillo de tu situación:</span>
            </span>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {diagnosticResult.plainSummary}
            </p>
          </div>

          {/* Selector de Opciones Documentales */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Elige el documento que deseas redactar:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {diagnosticResult.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-500 shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            opt.badge?.toLowerCase().includes('recomendado')
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                              : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300'
                          }`}
                        >
                          {opt.badge || 'Opción'}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {opt.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {opt.purpose}
                      </p>
                    </div>

                    {opt.legalBasisShort && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        <Scale className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span className="truncate">{opt.legalBasisShort}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preguntas rápidas de afinación (Chips) */}
          {diagnosticResult.clarificationQuestions &&
            diagnosticResult.clarificationQuestions.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Aclara estos detalles para que la carta quede más exacta (opcional):</span>
                </span>

                <div className="space-y-3">
                  {diagnosticResult.clarificationQuestions.map((q) => (
                    <div key={q.id} className="space-y-1.5">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{q.question}</p>
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((optVal) => {
                          const isPicked = userAnswers[q.id] === optVal;
                          return (
                            <button
                              key={optVal}
                              type="button"
                              onClick={() => handleToggleAnswer(q.id, optVal)}
                              className={`min-h-[44px] text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                                isPicked
                                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 shadow-2xs'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {optVal}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Aviso amable cuando el documento se preparó en modo privado */}
          {offlineNotice && (
            <div className="p-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{offlineNotice}</span>
            </div>
          )}

          {/* Mensaje de error si falla la generación */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex flex-wrap items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="flex-1 min-w-[8rem]">{errorMessage}</span>
              {selectedOption && (
                <button
                  type="button"
                  onClick={() => handleProceedWithDocument(selectedOption)}
                  disabled={isGeneratingDoc}
                  className="min-h-[36px] px-3 py-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-60 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reintentar</span>
                </button>
              )}
            </div>
          )}

          {/* Botón Principal de Redacción del Documento */}
          {selectedOption && (
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span>Generando: </span>
                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                  {selectedOption.title}
                </strong>
              </div>

              <button
                type="button"
                onClick={() => handleProceedWithDocument(selectedOption)}
                disabled={isGeneratingDoc}
                className="min-h-[50px] px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
              >
                {isGeneratingDoc ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Preparando tu documento oficial...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-indigo-200" />
                    <span>Crear este Documento</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Caso Fuera de Alcance Privado (Delito Penal, ICBF, etc.) */}
      {diagnosticResult?.isOutOfScope && (
        <div className="bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-amber-700 dark:text-amber-400" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-200/80 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200">
                <span>Orientación Ciudadana Oficial</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Este caso requiere intervención de una autoridad pública
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {diagnosticResult.plainSummary}
              </p>
            </div>
          </div>

          {diagnosticResult.entityAdvice && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-amber-200 dark:border-amber-800 space-y-2 text-xs">
              <strong className="block text-slate-900 dark:text-slate-100 font-bold">
                Entidad o canal competente:
              </strong>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {diagnosticResult.entityAdvice}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
