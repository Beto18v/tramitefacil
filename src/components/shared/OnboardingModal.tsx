import React, { useEffect } from 'react';
import {
  FileSearch,
  PenTool,
  Download,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-[11px] font-semibold border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} />
              Guía Rápida de Uso
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              ¿Cómo crear tus documentos en 3 pasos?
            </h3>
            <p className="text-xs text-slate-400">
              TrámiteFácil Hub te permite preparar documentos formales válidos en Colombia en menos de 2 minutos.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] text-slate-400 hover:text-white rounded-2xl p-2 transition cursor-pointer flex items-center justify-center hover:bg-slate-800"
            title="Cerrar guía"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Content: 3 Pasos */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Paso 1 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Elige tu documento o cuenta tu caso</span>
                <FileSearch className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Selecciona una plantilla del catálogo (Derecho de Petición, Arriendo, Renuncia, etc.) o entra a la pestaña <strong className="text-emerald-400">"Contar mi caso"</strong> para que el asistente redacte una carta a la medida de tu situación.
              </p>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Diligencia la información</span>
                <PenTool className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Completa las casillas del formulario con tus datos. También puedes usar el botón <strong className="text-emerald-400">"Mi Perfil"</strong> para autollenar tu nombre, cédula y dirección con un solo toque. Tus datos son 100% privados y no salen de tu dispositivo.
              </p>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Descarga en PDF o Word</span>
                <Download className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Revisa la vista previa en hoja física y descarga tu documento oficial en formato PDF nítido o en Word (.docx) editable. Listo para firmar, enviar por correo o radicar formalmente.
              </p>
            </div>
          </div>

          {/* Nota de Privacidad y Costo $0 */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/60 flex items-start gap-3 text-xs text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.75} />
            <div className="leading-relaxed">
              <strong className="text-emerald-300">TrámiteFácil es 100% gratuito y privado:</strong> No requiere registro previo, no almacena tus datos en servidores externos y funciona incluso sin conexión a internet.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
            <span>¡Entendido, comenzar!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
