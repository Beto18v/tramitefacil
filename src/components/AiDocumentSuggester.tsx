import React, { useState, useEffect, useTransition } from 'react';
import { PiSparkle, PiArrowRight, PiScales, PiBriefcase, PiReceipt, PiCar, PiHouse, PiKey, PiFileText, PiUserCheck, PiUserMinus, PiCalendarBlank, PiShieldCheck, PiBuildings, PiCurrencyDollar, PiWarningCircle, PiArrowSquareOut, PiArrowCounterClockwise, PiCheckCircle, PiInfo, PiPaperPlaneTilt, PiLightning } from 'react-icons/pi';
import { DocumentType, DocumentMeta } from '../types/documents';
import {
  analyzeCaseDescription,
  SuggestionResult,
} from '../utils/aiDocumentSuggester';

interface Props {
  onSelectDoc?: (id: DocumentType) => void;
  className?: string;
}

interface ExampleCase {
  label: string;
  icon: string;
  text: string;
}

const QUICK_EXAMPLES: ExampleCase[] = [
  {
    label: 'Garantía de producto',
    icon: '🛒',
    text: 'Compré una nevera hace 2 semanas, falló y en el almacén no me quieren devolver el dinero ni dar garantía...',
  },
  {
    label: 'Renuncia de trabajo',
    icon: '💼',
    text: 'Voy a cambiarme de trabajo y necesito presentar mi renuncia formal pidiendo que me exoneren del preaviso y me paguen la liquidación.',
  },
  {
    label: 'Cobro de honorarios',
    icon: '💰',
    text: 'Terminé un proyecto freelance de diseño y necesito presentar mi cuenta de cobro con retención en la fuente e ICA.',
  },
  {
    label: 'Retiro de patios',
    icon: '🚗',
    text: 'Inmovilizaron mi moto en los patios de tránsito y necesito autorizar a un familiar con poder especial para que la retire.',
  },
  {
    label: 'No renovar arriendo',
    icon: '🏠',
    text: 'Soy arrendador y quiero notificar a mi inquilino con 3 meses de anticipación que no prorrogaré el contrato de arrendamiento.',
  },
  {
    label: 'Reporte Datacrédito',
    icon: '💳',
    text: 'Pagué una deuda hace más de un año y todavía aparezco con reporte negativo en Datacrédito, necesito que lo eliminen por borrón y cuenta nueva.',
  },
];

export const AiDocumentSuggester: React.FC<Props> = ({
  onSelectDoc,
  className = '',
}) => {
  const [caseDescription, setCaseDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<SuggestionResult>({
    status: 'empty',
    alternatives: [],
    queryAnalyzed: '',
  });
  const [, startTransition] = useTransition();

  // Ejecuta el análisis en tiempo real al cambiar el texto
  useEffect(() => {
    startTransition(() => {
      const result = analyzeCaseDescription(caseDescription);
      setAnalysisResult(result);
    });
  }, [caseDescription]);

  const handleSelectExample = (text: string) => {
    setCaseDescription(text);
  };

  const handleClear = () => {
    setCaseDescription('');
  };

  // Renderiza icono correspondiente según el documento
  const renderDocIcon = (docId: DocumentType) => {
    switch (docId) {
      case 'cuenta_cobro':
        return <PiReceipt className="w-5 h-5 text-indigo-600" />;
      case 'propuesta_servicios':
        return <PiCurrencyDollar className="w-5 h-5 text-indigo-600" />;
      case 'carta_renuncia':
        return <PiUserMinus className="w-5 h-5 text-blue-600" />;
      case 'certificado_laboral':
        return <PiUserCheck className="w-5 h-5 text-blue-600" />;
      case 'permiso_laboral':
        return <PiCalendarBlank className="w-5 h-5 text-blue-600" />;
      case 'contrato_arrendamiento':
        return <PiHouse className="w-5 h-5 text-emerald-600" />;
      case 'no_renovacion_arriendo':
        return <PiKey className="w-5 h-5 text-emerald-600" />;
      case 'acta_entrega':
        return <PiHouse className="w-5 h-5 text-emerald-600" />;
      case 'contrato_prestacion':
        return <PiBriefcase className="w-5 h-5 text-violet-600" />;
      case 'acuerdo_nda':
        return <PiShieldCheck className="w-5 h-5 text-violet-600" />;
      case 'derecho_peticion':
        return <PiScales className="w-5 h-5 text-amber-600" />;
      case 'poder_autorizacion':
        return <PiFileText className="w-5 h-5 text-amber-600" />;
      case 'habeas_data':
        return <PiScales className="w-5 h-5 text-amber-600" />;
      case 'compraventa_vehiculo':
        return <PiCar className="w-5 h-5 text-sky-600" />;
      case 'autorizacion_patios':
        return <PiKey className="w-5 h-5 text-sky-600" />;
      default:
        return <PiFileText className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {/* 1. Header & Text Area Input Card */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <PiSparkle className="w-4 h-4 text-blue-600" />
            </span>
            <label
              htmlFor="ai-case-input"
              className="text-sm font-semibold text-slate-900"
            >
              Describe tu caso en lenguaje natural
            </label>
          </div>
          <span className="text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <PiLightning className="w-3 h-3 text-amber-500" />
            Análisis 100% privado en tu navegador
          </span>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            id="ai-case-input"
            rows={3}
            value={caseDescription}
            onChange={(e) => setCaseDescription(e.target.value)}
            placeholder="Escribe qué te ocurrió o qué necesitas tramitar (ej: 'Compré una nevera hace 2 semanas, falló y en el almacén no me quieren devolver el dinero ni dar garantía...')"
            className="w-full p-3.5 pr-20 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-2xs resize-none"
          />
          {caseDescription && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-3 right-3 text-xs text-slate-400 hover:text-slate-700 font-medium px-2 py-1 rounded-md hover:bg-slate-100 transition cursor-pointer min-h-[36px] flex items-center gap-1"
            >
              <PiArrowCounterClockwise className="w-3 h-3" />
              Limpiar
            </button>
          )}
        </div>

        {/* Quick Example Chips */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <span>Ejemplos rápidos para probar en un clic:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => handleSelectExample(ex.text)}
                className={`min-h-[44px] text-xs font-medium px-3 py-1.5 rounded-xl border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  caseDescription === ex.text
                    ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <span>{ex.icon}</span>
                <span>{ex.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Analysis Results Section */}
      {analysisResult.status === 'matched' && analysisResult.bestMatch && (
        <div className="space-y-4">
          {/* Main Recommended Card (Slate Fintech Styling) */}
          <div className="bg-gradient-to-b from-blue-50/50 via-white to-white rounded-2xl border-2 border-blue-500/40 p-5 sm:p-6 shadow-sm space-y-5 transition-all">
            {/* Top Badge & Confidence */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-700">
                <PiSparkle className="w-3.5 h-3.5 text-blue-600" />
                <span>Trámite Recomendado por Inteligencia Legal</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <PiCheckCircle className="w-3 h-3 text-emerald-600" />
                Coincidencia {analysisResult.bestMatch.confidence === 'alta' ? 'Alta (Recomendado)' : 'Moderada'}
              </span>
            </div>

            {/* Document Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                  {renderDocIcon(analysisResult.bestMatch.document.id)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {analysisResult.bestMatch.document.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-slate-500">
                      {analysisResult.bestMatch.document.categoryName}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-mono text-slate-500">
                      {analysisResult.bestMatch.document.estimatedMinutes || '⚡ 2 min'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Empezar este trámite */}
              {onSelectDoc && (
                <button
                  type="button"
                  onClick={() => onSelectDoc(analysisResult.bestMatch!.document.id)}
                  className="min-h-[44px] px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Empezar este trámite</span>
                  <PiArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Reasoning & Legal Justification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {/* Practical Reasoning */}
              <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70 space-y-1.5">
                <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                  <PiInfo className="w-4 h-4 text-blue-600" />
                  <span>Por qué aplica a tu caso</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {analysisResult.bestMatch.reasoning}
                </p>
              </div>

              {/* Legal Justification */}
              <div className="bg-amber-50/50 rounded-xl p-3.5 border border-amber-200/70 space-y-1.5">
                <div className="text-xs font-semibold text-amber-950 flex items-center gap-1.5">
                  <PiScales className="w-4 h-4 text-amber-600" />
                  <span>Fundamento Legal Colombiano</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-normal">
                  {analysisResult.bestMatch.legalJustification}
                </p>
              </div>
            </div>

            {/* PiKey Advantages Checklist */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-y-2 gap-x-4">
              {analysisResult.bestMatch.keyPoints.map((point, idx) => (
                <span
                  key={idx}
                  className="text-xs text-slate-600 flex items-center gap-1.5 font-medium"
                >
                  <PiCheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{point}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Secondary / Alternative Suggestions */}
          {analysisResult.alternatives.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Otras opciones que también podrían aplicar:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {analysisResult.alternatives.map((alt) => (
                  <div
                    key={alt.document.id}
                    className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                        {renderDocIcon(alt.document.id)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-slate-900 block truncate">
                          {alt.document.shortTitle || alt.document.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {alt.document.categoryName}
                        </span>
                      </div>
                    </div>
                    {onSelectDoc && (
                      <button
                        type="button"
                        onClick={() => onSelectDoc(alt.document.id)}
                        className="min-h-[44px] px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/70 hover:bg-blue-100 rounded-lg transition cursor-pointer shrink-0 flex items-center gap-1"
                      >
                        <span>Elegir</span>
                        <PiArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Out-Of-Scope / Institutional Guidance Card */}
      {analysisResult.status === 'out_of_scope' && analysisResult.entityGuidance && (
        <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <PiWarningCircle className="w-6 h-6 text-amber-700" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900">
                <span>Orientación Ciudadana Especializada</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Este caso requiere intervención ante una entidad pública u oficial
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {analysisResult.entityGuidance.description}
              </p>
            </div>
          </div>

          {/* Official Entity Box */}
          <div className="bg-white rounded-xl p-4 border border-amber-200/80 space-y-2.5 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <PiBuildings className="w-4 h-4 text-amber-600" />
                {analysisResult.entityGuidance.entityName}
              </span>
              <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                {analysisResult.entityGuidance.entityCategory}
              </span>
            </div>

            <div className="text-xs text-slate-700 space-y-1">
              <strong className="block text-slate-900">Paso recomendado:</strong>
              <p>{analysisResult.entityGuidance.actionRequired}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-mono text-[11px]">
                Norma: {analysisResult.entityGuidance.legalBasis}
              </span>
              <span className="text-blue-700 font-semibold flex items-center gap-1">
                <span>Canal: {analysisResult.entityGuidance.officialCanal}</span>
              </span>
            </div>
          </div>

          {/* Optional Petition Fallback */}
          {analysisResult.entityGuidance.canUsePetitionAsFirstStep && onSelectDoc && (
            <div className="bg-white/80 rounded-xl p-3 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <PiScales className="w-4 h-4 text-amber-600 shrink-0" />
                <span>¿Deseas radicar primero una solicitud formal escrita antes de acudir a la entidad?</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectDoc('derecho_peticion')}
                className="min-h-[44px] px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Redactar Derecho de Petición</span>
                <PiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. No Match Card (Encouraging more details or trying examples) */}
      {analysisResult.status === 'no_match' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-500">
            <PiInfo className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800">
              No detectamos un trámite legal o contractual específico
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
              TrámiteFácil cuenta con 15 plantillas para contratos, honorarios, trámites laborales, peticiones y vehículos. Describe con más detalle tu situación o prueba haciendo clic en uno de los ejemplos superiores.
            </p>
          </div>
          {onSelectDoc && (
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => onSelectDoc('derecho_peticion')}
                className="min-h-[44px] px-3.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <PiScales className="w-3.5 h-3.5" />
                <span>Ver Derecho de Petición</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectDoc('cuenta_cobro')}
                className="min-h-[44px] px-3.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <PiReceipt className="w-3.5 h-3.5" />
                <span>Ver Cuenta de Cobro</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectDoc('carta_renuncia')}
                className="min-h-[44px] px-3.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <PiBriefcase className="w-3.5 h-3.5" />
                <span>Ver Carta de Renuncia</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

