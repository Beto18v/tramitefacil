import React from 'react';
import {
  X,
  FileSearch,
  PenTool,
  Download,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-5 sm:p-6 flex items-start justify-between border-b border-slate-200/90 dark:border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-[11px] font-semibold border border-indigo-200/70 dark:border-indigo-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Guía Rápida de Uso
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              ¿Cómo crear tus documentos en 3 pasos?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              TrámiteFácil Hub te permite preparar documentos formales válidos en Colombia en menos de 2 minutos.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-2xl p-2 transition cursor-pointer flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: 3 Pasos */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Paso 1 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              1
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Elige tu documento o cuenta tu caso</span>
                <FileSearch className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Selecciona una plantilla del catálogo (Derecho de Petición, Arriendo, Renuncia, etc.) o entra a la pestaña <strong className="text-indigo-600 dark:text-indigo-400">"Contar mi caso"</strong> para que el asistente redacte una carta a la medida de tu situación.
              </p>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              2
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Diligencia la información</span>
                <PenTool className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Completa las casillas del formulario con tus datos. También puedes usar el botón <strong className="text-indigo-600 dark:text-indigo-400">"Mi Perfil"</strong> para autollenar tu nombre, cédula y dirección con un solo toque. Tus datos son 100% privados y no salen de tu dispositivo.
              </p>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              3
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Descarga en PDF o Word</span>
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Revisa la vista previa en hoja física y descarga tu documento oficial en formato PDF nítido o en Word (.docx) editable. Listo para firmar, enviar por correo o radicar formalmente.
              </p>
            </div>
          </div>

          {/* Nota de Privacidad y Costo $0 */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>TrámiteFácil es 100% gratuito y privado:</strong> No requiere registro previo, no almacena tus datos en servidores externos y funciona incluso sin conexión a internet.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200/90 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>¡Entendido, comenzar!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

