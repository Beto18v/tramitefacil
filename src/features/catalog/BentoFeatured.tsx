import React from 'react';
import { DocumentType } from '../../types/documents';
import {
  Scale,
  Receipt,
  Home,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  FileCheck,
} from 'lucide-react';

interface Props {
  onSelectDoc: (id: DocumentType) => void;
}

export const BentoFeatured: React.FC<Props> = ({ onSelectDoc }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/60 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} />
            <span>Trámites Más Solicitados en Colombia</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Plantillas Jurídicas Destacadas
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Modelos con soporte normativo oficial, listos para diligenciar y exportar en formato A4 institucional.
        </p>
      </div>

      {/* Bento Grid Layout - Notaría Digital Moderna */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Bento 1: Derecho de Petición (Grande - 7 columnas en lg) */}
        <div
          onClick={() => onSelectDoc('derecho_peticion')}
          className="lg:col-span-7 group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-xs hover:border-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transition-opacity group-hover:opacity-100" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-800/60 px-3 py-1 rounded-full">
                <Scale className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.75} />
                <span>Artículo 23 Constitución Política</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                <span className="tabular-nums">3 min</span>
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                Derecho de Petición Estándar
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                Exige información, copias o respuestas claras a entidades públicas, bancos, EPS o empresas de servicios. Incluye lista dinámica de hechos y términos legales de respuesta.
              </p>
            </div>

            {/* Stylized Paper Mockup Snippet */}
            <div className="mt-2 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 text-[11px] font-mono text-slate-300 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-semibold text-slate-300 tracking-wider text-[10px] uppercase">
                  Radicado Ciudadano • Ley 1755 de 2015
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} />
                  15 Días Hábiles
                </span>
              </div>
              <div className="space-y-1 text-slate-400 text-[10px] sm:text-[11px]">
                <p className="truncate">
                  <strong className="text-slate-200">ASUNTO:</strong> Solicitud formal de información y entrega de antecedentes
                </p>
                <p className="truncate">
                  <strong className="text-slate-200">FUNDAMENTO:</strong> Art. 23 C.P. y Ley 1437 de 2011 (CPACA)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between relative z-10">
            <span className="text-xs font-medium text-slate-400">
              Trámites Administrativos
            </span>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Crear este documento</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </div>
          </div>
        </div>

        {/* Bento 2: Cuenta de Cobro (5 columnas en lg) */}
        <div
          onClick={() => onSelectDoc('cuenta_cobro')}
          className="lg:col-span-5 group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-xs hover:border-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl transition-opacity group-hover:opacity-100" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-800/60 px-3 py-1 rounded-full">
                <Receipt className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} />
                <span>Freelance & Honorarios</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                <span className="tabular-nums">2 min</span>
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                Cuenta de Cobro
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Documento equivalente para independientes y contratistas. Cálculo automático de ReteFuente (11%) y ReteICA.
              </p>
            </div>

            {/* Mini Calculation Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Honorarios brutos</span>
                <span className="font-mono text-slate-200 font-semibold">$ 2.500.000</span>
              </div>
              <div className="flex justify-between text-amber-400 text-[11px] font-medium">
                <span>Retención Fuente (11%)</span>
                <span className="font-mono">- $ 275.000</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center font-semibold">
                <span className="text-slate-200 text-xs">Neto a Pagar</span>
                <span className="font-mono text-emerald-400 text-base font-bold">$ 2.225.000</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between relative z-10">
            <span className="text-xs font-medium text-slate-400">
              Freelance & Finanzas
            </span>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Crear cuenta</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </div>
          </div>
        </div>

        {/* Bento 3: Contrato de Arrendamiento (6 columnas en lg) */}
        <div
          onClick={() => onSelectDoc('contrato_arrendamiento')}
          className="lg:col-span-6 group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-xs hover:border-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-800/60 px-3 py-1 rounded-full">
                <Home className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} />
                <span>Ley 820 de 2003</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                <span className="tabular-nums">5 min</span>
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                Contrato de Arrendamiento de Vivienda
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Protección legal para arrendador y arrendatario con cláusula de fiador o codeudor solidario, inventario y penalidades.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                Cláusula de Codeudor
              </span>
              <span className="text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                Incremento IPC Anual
              </span>
              <span className="text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                Espacio de Huella
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between relative z-10">
            <span className="text-xs font-medium text-slate-400">
              Inmobiliario & Arriendos
            </span>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Redactar contrato</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </div>
          </div>
        </div>

        {/* Bento 4: Documento a Medida / Oficio Universal (6 columnas en lg) */}
        <div
          onClick={() => onSelectDoc('documento_formal')}
          className="lg:col-span-6 group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-xs hover:border-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 bg-teal-950/50 border border-teal-800/60 px-3 py-1 rounded-full">
                <FileCheck className="w-3.5 h-3.5 text-teal-400" strokeWidth={1.75} />
                <span>Oficio Universal</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                <span className="tabular-nums">3 min</span>
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                Documento Formal & Oficio a la Medida
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                ¿Tienes un trámite especial? Redacta cualquier carta, memorial, reclamo o solicitud con estructura jurídica y formal en segundos.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                Hechos y Peticiones
              </span>
              <span className="text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                Citas Legales Colombianas
              </span>
              <span className="text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                Firma y C.C.
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between relative z-10">
            <span className="text-xs font-medium text-slate-400">
              Trámites Administrativos
            </span>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Crear a mi medida</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
