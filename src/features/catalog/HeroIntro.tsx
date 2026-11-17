import React from 'react';
import {
  Sparkles,
  ArrowDown,
  ShieldCheck,
  HelpCircle,
  FileText,
} from 'lucide-react';

interface Props {
  onExploreClick: () => void;
  onAssistantClick: () => void;
  onOpenOnboarding: () => void;
}

export const HeroIntro: React.FC<Props> = ({
  onExploreClick,
  onAssistantClick,
  onOpenOnboarding,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-10 lg:p-12 shadow-xl transition-all">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />

      {/* Grid Pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline, Copy, Action Buttons */}
        <div className="lg:col-span-7 space-y-6">
          {/* Brand Wordmark: TrámiteFácil Hub at top-left of Hero */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <FileText className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  TrámiteFácil
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                  Hub
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Notaría Digital & Trámites Oficiales de Colombia
              </span>
            </div>
          </div>

          {/* Top Badge: Notaría Digital */}
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-200">
              Plataforma Ciudadana de Trámites en Colombia
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-medium hidden sm:inline">
              100% Privado en tu Dispositivo
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-balance">
              Documentos legales formales,{' '}
              <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                sin intermediarios y en minutos.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Crea derechos de petición, contratos de arrendamiento, cartas laborales y cuentas de cobro con redacción jurídica profesional. Sin costo, sin registros y sin almacenar nada en la nube.
            </p>
          </div>

          {/* Action CTAs: Elegantes y Profesionales */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onExploreClick}
              className="min-h-[48px] px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md hover:shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Explorar Trámites por Sector</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={onAssistantClick}
              className="min-h-[48px] px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 shadow-xs transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" strokeWidth={1.75} />
              <span>Contar mi caso al Asistente</span>
            </button>

            <button
              type="button"
              onClick={onOpenOnboarding}
              className="min-h-[48px] px-3.5 py-3 rounded-2xl text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Ver guía paso a paso"
            >
              <HelpCircle className="w-4 h-4" strokeWidth={1.75} />
              <span>¿Cómo funciona?</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <div className="text-xl font-bold text-white font-mono">16+</div>
              <div className="text-slate-400 font-medium text-[11px]">Plantillas Legales</div>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <div className="text-xl font-bold text-emerald-400 font-mono">$0</div>
              <div className="text-slate-400 font-medium text-[11px]">100% Gratuito</div>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <div className="text-xl font-bold text-white font-mono">PDF & Word</div>
              <div className="text-slate-400 font-medium text-[11px]">Descarga Directa</div>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <div className="text-xl font-bold text-emerald-400 font-mono">0 ms</div>
              <div className="text-slate-400 font-medium text-[11px]">En tu Navegador</div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Paper Preview Mockup */}
        <div className="lg:col-span-5 relative flex justify-center">
          {/* Subtle Outer Card Glow */}
          <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/15 via-transparent to-emerald-500/10 rounded-3xl blur-2xl transform rotate-2 scale-95" />

          {/* Floating Document Mockup */}
          <div className="relative w-full max-w-sm rounded-2xl bg-white text-slate-900 p-5 sm:p-6 shadow-2xl border border-slate-200/80 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500 space-y-4">
            {/* Header of the mock paper */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  TF
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-tight text-slate-900 leading-tight">
                    REPÚBLICA DE COLOMBIA
                  </div>
                  <div className="text-[9px] text-slate-500 font-medium">
                    DOCUMENTO CON RIGOR JURÍDICO
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Válido
              </span>
            </div>

            {/* Simulated legal content paragraphs */}
            <div className="space-y-2 text-[10px] text-slate-700 leading-relaxed font-serif">
              <div className="font-sans font-bold text-slate-900 text-[11px]">
                DERECHO DE PETICIÓN (ART. 23 CONSTITUCIÓN POLÍTICA)
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[9px] font-sans text-slate-600 space-y-1">
                <p>
                  <strong>DIRIGIDO A:</strong> ENTIDAD / INSTITUCIÓN CORRESPONDIENTE
                </p>
                <p>
                  <strong>CIUDAD:</strong> BOGOTÁ D.C. / MEDELLÍN / CALI
                </p>
              </div>
              <p className="line-clamp-2 italic text-slate-500 text-[9px]">
                "En ejercicio del derecho consagrado en el artículo 23 de la Constitución Política y las disposiciones de la Ley 1755 de 2015..."
              </p>
              {/* Fake lines to suggest structured document */}
              <div className="space-y-1.5 pt-1">
                <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                <div className="h-1.5 bg-emerald-100 rounded-full w-4/5" />
                <div className="h-1.5 bg-slate-200 rounded-full w-3/4" />
              </div>
            </div>

            {/* Signature & Fingerprint Area Mockup */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="space-y-1">
                <div className="w-24 h-5 border-b border-dashed border-slate-400" />
                <div className="text-[9px] font-sans font-semibold text-slate-800">
                  FIRMA DEL CIUDADANO
                </div>
                <div className="text-[8px] font-sans text-slate-400 font-mono">
                  C.C. No. ••••••••••
                </div>
              </div>
              <div className="w-10 h-12 rounded border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-[7px] text-slate-400 font-sans text-center px-1">
                <span>HUELLA DACTILAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
