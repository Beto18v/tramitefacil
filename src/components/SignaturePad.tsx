import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, PenTool, Type, Check, Sparkles } from 'lucide-react';

interface Props {
  signatureType: 'text' | 'draw';
  signatureDataUrl?: string;
  onSignatureChange: (type: 'text' | 'draw', dataUrl?: string) => void;
  onSaveToProfile?: (dataUrl: string) => void;
}

export const SignaturePad: React.FC<Props> = ({
  signatureType,
  signatureDataUrl,
  onSignatureChange,
  onSaveToProfile,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [savedToProfileSuccess, setSavedToProfileSuccess] = useState(false);

  // Initialize and scale canvas for high-DPI screens
  useEffect(() => {
    if (signatureType !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 2;
    const width = canvas.offsetWidth || 460;
    const height = 150;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);

    ctx.strokeStyle = '#0f172a'; // Deep slate / black ink
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // If an existing signatureDataUrl is passed, draw it onto canvas
    if (signatureDataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        setHasDrawn(true);
      };
      img.src = signatureDataUrl;
    }
  }, [signatureType]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    const mouseEvent = e as React.MouseEvent;
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Export transparent PNG
    const dataUrl = canvas.toDataURL('image/png');
    onSignatureChange('draw', dataUrl);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 2;
    ctx.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
    setHasDrawn(false);
    onSignatureChange('draw', undefined);
  };

  const handleSaveToProfile = () => {
    if (!signatureDataUrl || !onSaveToProfile) return;
    onSaveToProfile(signatureDataUrl);
    setSavedToProfileSuccess(true);
    setTimeout(() => setSavedToProfileSuccess(false), 2200);
  };

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3.5">
      {/* Selector de tipo de firma */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs font-bold text-slate-800 tracking-tight">
          Formato de Firma en el Documento
        </label>
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => onSignatureChange('text')}
            className={`min-h-[36px] px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              signatureType === 'text'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Tipográfica Formal</span>
          </button>
          <button
            type="button"
            onClick={() => onSignatureChange('draw', signatureDataUrl)}
            className={`min-h-[36px] px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              signatureType === 'draw'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Dibujar Firma Digital</span>
          </button>
        </div>
      </div>

      {signatureType === 'text' ? (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-xs text-slate-600 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <strong className="block text-slate-900 font-semibold">Pie de firma formal impreso</strong>
            Se generará una línea de firma notarial con tu nombre completo, tipo y número de documento, ciudad y teléfono para firma manual con bolígrafo.
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Canvas container */}
          <div className="relative bg-white rounded-xl border-2 border-dashed border-blue-200 shadow-xs overflow-hidden touch-none select-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[150px] cursor-crosshair block"
              style={{ width: '100%', height: '150px' }}
            />

            {/* Dotted baseline hint */}
            <div className="absolute bottom-6 left-6 right-6 border-b border-dashed border-slate-300 pointer-events-none flex items-center justify-between text-[10px] text-slate-400 select-none">
              <span>Línea de firma</span>
              <span>Dibuja aquí con el dedo o ratón</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={handleClear}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 rounded-xl transition cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar trazo</span>
            </button>

            {onSaveToProfile && (
              <button
                type="button"
                onClick={handleSaveToProfile}
                disabled={!hasDrawn && !signatureDataUrl}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition cursor-pointer font-medium disabled:opacity-40"
              >
                {savedToProfileSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">¡Guardada en tu perfil!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Guardar firma en mi perfil</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
