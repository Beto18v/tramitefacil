import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import {
  Download,
  Share2,
  PlusSquare,
  X,
  Laptop,
  Smartphone,
  CheckCircle2,
  WifiOff,
} from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showUniversalGuide, setShowUniversalGuide] = useState(false);

  // If already running inside standalone installed window, hide button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const installedSuccessfully = await install();
      if (!installedSuccessfully) {
        setShowUniversalGuide(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowUniversalGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="min-h-[40px] inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 transition cursor-pointer shadow-2xs"
        title="Instalar TrámiteFácil Hub en tu dispositivo para acceso rápido y sin internet"
      >
        <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <span className="hidden sm:inline">Instalar App</span>
      </button>

      {/* 1. iOS Safari Modal Guide */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Instalar en iPhone o iPad
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer rounded-xl"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
              Para usar TrámiteFácil Hub como una app nativa en iOS desde Safari:
            </p>

            <div className="mt-4 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-slate-100 mb-0.5">Paso 1</strong>
                  Toca el botón <strong>Compartir</strong> (ícono de caja con flecha arriba) en la barra inferior de Safari.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-slate-100 mb-0.5">Paso 2</strong>
                  Desplaza hacia abajo y selecciona <strong>&quot;Agregar a pantalla de inicio&quot;</strong>.
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 flex items-center gap-2.5 text-[11px] text-emerald-800 dark:text-emerald-300">
              <WifiOff className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Funciona 100% sin conexión a internet una vez agregada.</span>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* 2. Universal / Desktop / Android Browser Modal Guide */}
      {showUniversalGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Instalar TrámiteFácil Hub
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Acceso directo, rápido y sin internet
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowUniversalGuide(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer rounded-xl"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              {/* Chrome / Edge option */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                  <Laptop className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>En Google Chrome o Microsoft Edge (PC / Mac)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Haz clic en el ícono de instalación en la <strong>barra de direcciones (URL)</strong> a la derecha, o abre el menú <strong>(⋮)</strong> &gt; <strong>&quot;Instalar TrámiteFácil Hub&quot;</strong>.
                </p>
              </div>

              {/* Android option */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                  <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>En Celulares Android (Chrome / Brave / Edge)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Toca el menú superior de tres puntos <strong>(⋮)</strong> y selecciona <strong>&quot;Instalar aplicación&quot;</strong> o <strong>&quot;Agregar a la pantalla principal&quot;</strong>.
                </p>
              </div>

              {/* Firefox / other browsers */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>En Mozilla Firefox u otros navegadores</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Presiona <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-[10px] font-mono">Ctrl + D</kbd> (o <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-[10px] font-mono">⌘ + D</kbd> en Mac) para guardar en marcadores o fija la pestaña para tenerla siempre a la mano.
                </p>
              </div>
            </div>

            {/* Offline badge */}
            <div className="mt-4 p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 flex items-center gap-2.5 text-[11px] text-emerald-800 dark:text-emerald-300">
              <WifiOff className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Funciona 100% sin conexión a internet y tus datos son privados en tu navegador.</span>
            </div>

            <button
              type="button"
              onClick={() => setShowUniversalGuide(false)}
              className="mt-5 w-full min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
