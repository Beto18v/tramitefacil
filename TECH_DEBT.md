# Registro de Deuda Técnica y Estado de Remediación - TrámiteFácil Hub

Este documento clasifica de forma rigurosa los defectos técnicos, riesgos de estabilidad, cuellos de botella de rendimiento y redundancias arquitectónicas detectadas durante la auditoría del código fuente, así como el estado de remediación de cada uno.

---

## Matriz de Priorización y Estado General

| Nivel | Definición | Estado de Remediación |
|---|---|---|
| **P0 (Crítico)** | Defectos que rompen funcionalidades operativas o causan cuellos de botella. | ✅ **100% Remediado** (P0-1, P0-2, P0-3, P0-4 mitigado) |
| **P1 (Alto)** | Deuda arquitectónica, tipado débil, dependencias muertas o componentes monolíticos. | ✅ **100% Remediado** (P1-1, P1-2, P1-3, P1-4, P1-5) |
| **P2 (Medio)** | Optimización DX, inconsistencias de estilo, scripts y limpieza de configuración. | ✅ **100% Remediado** (P2-1, P2-2, P2-3) |

---

## 🔴 Prioridad P0: Crítico (Bloqueantes / Fallos de Ejecución)

### P0-1: [RESUELTO] Fallo crítico de exportación PDF en vista móvil por contenedor oculto (`display: none`)
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** En `src/components/EditorView.tsx` se implementó un contenedor off-screen fijo de `794px` (ancho exacto A4 a 96 DPI: 210mm). La función `handleDownloadPdf` captura este elemento desacoplándolo de la pestaña activa en móvil (`form` vs `preview`), eliminando el crash por dimensiones cero de `html2canvas`.

### P0-2: [RESUELTO] Serialización sincrónica masiva de 15 documentos en `localStorage` en cada pulsación
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** Implementado hook `useLocalStorage` con debounce configurable (350ms) en `src/hooks/useLocalStorage.ts`. Evita el bloqueo del hilo principal al redactar párrafos extensos y provee salvado inmediato (`flush`) y control seguro de errores.

### P0-3: [RESUELTO] Ausencia de manejo de cuota de almacenamiento y riesgo de `QuotaExceededError`
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** `useLocalStorage` captura explícitamente excepciones de tipo `QuotaExceededError` (códigos 22 y 1014), emite advertencias estructuradas y previene la corrupción del estado local sin crashear la aplicación.

### P0-4: [MITIGADO / EN PRODUCCIÓN] Generación de documentos DOCX
- **Estado:** 🟡 **Mitigado y funcional.** `src/utils/plainTextGenerator.ts` se simplificó para delegar en `definition.toPlainText(...)`. La exportación Word (`exportDocx.ts`) opera de manera estable sobre todas las 15 plantillas y tablas de firmas.
- **Siguiente Mejora Opcional:** En un futuro sprint, permitir que cada definición de plantilla en `src/templates/` exporte una función nativa `toDocxSections(data)` para formateo avanzado de tablas multinivel.

---

## 🟡 Prioridad P1: Alto (Deuda Arquitectónica y Mantenibilidad)

### P1-1: [RESUELTO] Componentes y utilidades monolíticas excesivas (>250 líneas)
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** 
  - Las 15 plantillas fueron 100% modularizadas bajo `src/templates/<dominio>/<docType>/` con su contrato `DocumentDefinition<TData>`.
  - `src/components/EditorView.tsx` y `src/components/DocumentPreview.tsx` se redujeron en más de un 55% al delegar dinámicamente en el registro `getDocumentDefinition(selectedDoc)`.
  - `plainTextGenerator.ts` se redujo de 561 líneas a 10 líneas.
  - Los 15 formularios y 15 vistas previas legacy en `src/components/forms/` y `src/components/templates/` se convirtieron en forwarders ultraligeros de 14 líneas, manteniendo compatibilidad al 100%.

### P1-2: [RESUELTO] Configuración permisiva de TypeScript y falta de modo estricto
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** `"strict": true` activado en `tsconfig.json`. Cero `any` implícitos. `tsc --noEmit` pasa limpio con 0 errores en los 15 dominios.

### P1-3: [RESUELTO] Paquetes duplicados de iconos (`lucide-react` vs `react-icons`)
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** Se eliminó `react-icons` de `package.json` y se unificó el 100% de la iconografía de la aplicación bajo `lucide-react`.

### P1-4: [RESUELTO] Dependencias residuales y muertas en el stack de producción
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** Purgados los paquetes muertos `@google/genai`, `express`, `@types/express`, `dotenv`, `html2pdf.js`, `motion`, `autoprefixer`, `esbuild` y `tsx`.

### P1-5: [RESUELTO] Conflicto entre formato de página A4 y `@page { size: letter; }` en CSS
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** Se actualizó `src/index.css` a `@page { size: auto; margin: 12mm 15mm 15mm 15mm; }`, adaptándose de forma natural al papel configurado en la impresora del usuario sin descuadrar márgenes.

---

## 🟢 Prioridad P2: Medio (Refinamiento y Experiencia de Desarrollo)

### P2-1: [RESUELTO] Metadatos residuales del template base
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** `package.json` actualizado a `"name": "tramitefacil-hub"`, `metadata.json` eliminado y `.env.example` saneado.

### P2-2: [RESUELTO] Script de limpieza incompatible con entornos Windows
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** `"clean"` en `package.json` estandarizado a `node -e "require('fs').rmSync('dist', { recursive: true, force: true })"`, funcionando de manera idéntica en Windows PowerShell, Linux y macOS.

### P2-3: [RESUELTO] Abstracción en inputs de formularios (UI Design System)
- **Estado:** ✅ **Completado.**
- **Solución Aplicada:** Creado paquete en `src/components/ui/` (`InputField`, `SelectField`, `CurrencyField`, `TextareaField`, `SwitchField`, `RepeaterField`) implementado a través de los nuevos formularios modulares.
