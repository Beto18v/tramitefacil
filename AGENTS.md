# AGENTS.md — Reglas y Guía de Desarrollo para Asistentes y Agentes de IA

Este documento define las directrices operativas, restricciones arquitectónicas, reglas de control de versiones y estándares de experiencia de usuario que **todo agente o asistente de IA debe seguir estrictamente** al colaborar en este repositorio (`tramitefacil`).

---

## 🛑 1. Regla de Oro de Control de Versiones (Git)

> **PROHIBICIÓN ESTRICTA DE COMMITS AUTOMÁTICOS**
> - **NUNCA** ejecutes `git commit` ni `git push` por iniciativa propia o de forma automática.
> - Solo se deben crear commits cuando el usuario lo solicite **de manera explícita y directa** (por ejemplo: *"haz commit"*, *"guarda esto en git"*, *"crea el commit"*).
> - Presenta siempre las modificaciones, resultados de compilación y pruebas al usuario primero, y espera su confirmación antes de tocar el historial de git.
> - Cuando el usuario pida el commit, usa el formato estándar de **Conventional Commits** (`feat(...)`, `fix(...)`, `refactor(...)`, `style(...)`, `docs(...)`).

---

## 🗣️ 2. Regla de Lenguaje y Experiencia de Usuario (UI Copy)

> **LENGUAJE 100% HUMANO, CÁLIDO Y ACCESIBLE PARA CUALQUIER EDAD**
> La aplicación está diseñada para que la use cualquier ciudadano colombiano (desde un adulto mayor hasta un joven independiente o comerciante), sin enredos técnicos.

### Palabras y Conceptos Prohibidos en la Interfaz:
Queda terminantemente prohibido incluir jerga de programador, palabras de inteligencia artificial o términos técnicos fríos en botones, títulos, textos de ayuda, modales o tooltips:
- ❌ **PROHIBIDO:** `prompt`, `Prompt-to-Document`
- ❌ **PROHIBIDO:** `sanitización`, `anti-inyección`, `inyección`
- ❌ **PROHIBIDO:** `Gemini`, `OpenAI`, `LLM`, `modelo` (en textos visibles de cara al usuario)
- ❌ **PROHIBIDO:** `heurístico`, `token`, `payload`, `API`, `schema`, `código`
- ❌ **PROHIBIDO:** `caché (0 ms)`

### Equivalencias Humanas Obligatorias:
| En vez de usar (Técnico / Frío) | Usa siempre (Humano / Cercano) |
|---|---|
| `Autollenar con IA (Prompt-to-Document)` | **Completar Datos con el Asistente** |
| `Entrada protegida con sanitización anti-inyección` | **Tus datos son 100% privados y seguros en tu dispositivo** |
| `La IA mapeará los datos a los campos del schema` | **El asistente completará automáticamente cada casilla del formulario** |
| `Procesando con Gemini...` | **Completando información...** |
| `Extraer y Autollenar` | **Completar Casillas** |
| `Describir mi caso con IA` | **Contar mi caso** |
| `Llenar con IA` | **Completar con Asistente** |
| `Caché ultra rápida (0 ms)` | **Respuesta Inmediata** |
| `Gemini 2.0 Flash` | **Asistente Inteligente** |
| `Motor Offline` | **Modo Privado sin Conexión** |
| `Redactar Documento Formal con IA` | **Crear este Documento** |
| `Redactando documento formal con IA...` | **Preparando tu documento oficial...** |

---

## 🏛️ 3. Arquitectura y Restricciones Técnicas

### 100% Client-Side & Privacidad Absoluta (Offline-First PWA)
- Los datos de los ciudadanos **nunca se guardan en bases de datos remotas ni en la nube**.
- El almacenamiento local se gestiona en `localStorage` con el hook `useLocalStorage` con debounce y captura segura de `QuotaExceededError`.
- La aplicación debe funcionar sin internet mediante el Service Worker de `vite-plugin-pwa`.

### Costo de Infraestructura $0 Absoluto
- Stack: **React 19 + TypeScript (strict) + Vite SPA** desplegado en Vercel Edge CDN.
- **NO bases de datos de pago:** No usar bases de datos vectoriales pesadas (Chroma) ni SQLite en servidores dedicados.
- El catálogo completo de documentos cabe en memoria y en prompts compactos; no se necesita RAG vectorial para 15–50 plantillas.
- Cualquier función serverless debe ubicarse en `api/` (ej. `api/ai.ts`) y operar bajo el plan gratuito de Vercel.

### Soporte Dual de IA (Online Económica + Offline Heurístico)
1. **En la Nube (Online):**
   - Usa Google Gemini Flash (`gemini-2.0-flash`) a costo insignificante con Structured Outputs (`responseMimeType: "application/json"`).
   - Rate limiting por IP en memoria (15 peticiones/minuto).
   - Doble nivel de caché: `sessionStorage` en el cliente (0 ms, 0 tokens) y mapa LRU en memoria en el servidor Vercel.
2. **Sin Conexión (Offline Fallback):**
   - Si no hay red, si no hay clave configurada o si falla la API, la app **jamás se bloquea ni muestra error de red**: conmuta de forma transparente al motor heurístico local de `src/utils/aiDocumentSuggester.ts`.

---

## 📄 4. Estándar de Plantillas de Documentos

### Estructura Modular Obligatoria
Cada documento vive en su propia carpeta bajo `src/templates/<categoria>/<documento>/` y contiene exactamente 4 archivos:
1. `schema.ts`: Definición de metadatos (`DocumentMeta`), datos por defecto (`defaultData`) y datos de ejemplo (`sampleData`).
2. `DocumentView.tsx`: Vista tipográfica institucional envuelta en `LegalDocumentShell`.
3. `DocumentForm.tsx`: Formulario de edición con inputs estandarizados (`InputField`, `TextareaField`, etc.).
4. `index.ts`: Implementación del contrato `DocumentDefinition<TData>` exportando `toPlainText`, `calculateCompletion`, `getFilename`, etc.

### Hoja Física A4 y Exportación Multiformato
- La previsualización simula una hoja física A4 blanca (`bg-white text-slate-900`) sin importar si el usuario tiene activado el modo oscuro en la aplicación.
- Márgenes de impresión estandarizados: `@page { size: auto; margin: 12mm 15mm 15mm 15mm; }`.
- Exportación PDF institucional mediante `html-to-image` + `jspdf` (contenedor off-screen fijo de `794px` para evitar crashes en móviles y soportar colores OKLCH de Tailwind v4).
- Exportación Word (.docx) formalmente estructurada mediante la librería `docx`.

---

## 🎨 5. Sistema de Diseño e Identidad Visual

- **Paleta Ejecutiva:**
  - Modo Claro: Marfil / papel editorial tenue (`slate-50`), texto en grafito profundo (`slate-950`), acentos en índigo corporativo.
  - Modo Oscuro: Obsidiana espacial (`#090D16` / `#0B0F19`), superficies en pizarra mate (`slate-900`), bordes sutiles.
  - Color de acento de validación: Esmeralda sobrio (`emerald-600` / `emerald-400`).
- **Iconos:** Canónicamente **Lucide Icons** (`lucide-react`) con trazo uniforme (`1.5px` - `1.75px`).
- **Cero Emojis en la Interfaz:** No usar emojis literales (`⚡`, `📝`, `📄`, `💊`, `🏦`, etc.) en botones, cards o títulos. Usar siempre componentes SVG de Lucide.

---

## 🔍 6. Checklist de Verificación Antes de Entregar Trabajo

Antes de notificar al usuario que una tarea está completada, el agente debe verificar:
1. `npm run lint` (`tsc --noEmit`): Debe compilar con **0 errores de TypeScript** (modo estricto).
2. `npm run build`: Debe generar el bundle de producción sin fallos.
3. Revisión de textos: Que ninguna pantalla muestre jerga técnica ni palabras prohibidas.
4. **NO hacer commit:** Preguntar o esperar la confirmación del usuario para proceder con git.

