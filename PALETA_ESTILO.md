# Guía de Identidad Visual: Notaría Digital Moderna
## Paleta: Esmeralda Institucional & Obsidiana Ejecutiva

Este documento establece los fundamentos, códigos de color, directrices tipográficas y reglas de diseño para toda la interfaz de **TrámiteFácil Hub**.

---

## 🏛️ 1. Nombre y Filosofía del Estilo

- **Nombre del Estilo:** *Notaría Digital Moderna / Editorial Institucional*.
- **Concepto:** Sobriedad, legitimidad, rigor jurídico y calma visual. Inspirado en el diseño editorial suizo y la dignidad de las instituciones oficiales de Colombia.
- **Sensación Buscada:** Seguridad, transparencia, respeto legal y facilidad de uso para cualquier ciudadano.
- **Características Clave:**
  - **Superficies profundas y limpias:** Fondo obsidiana (`#090D16` / `#0B0F19`) con tarjetas en pizarra mate (`slate-900`) y bordes refinados (`border-slate-800`).
  - **Acentos institucionales:** Verde esmeralda institucional (`emerald-600` / `emerald-500`) como símbolo de validez legal y certificación oficial.
  - **Detalles notariales:** Citas normativas oficiales (*Art. 23 C.P.*, *Ley 1755*, *Ley 820*) destacadas con sobriedad en ámbar tenue.
  - **Cero distracciones:** Sin elementos flotantes innecesarios, sin animaciones estridentes y sin sombras de cómic.

---

## 🎨 2. Paleta de Colores Oficial

### Acentos Principales
| Color | Hex | Tailwind | Rol en la Interfaz |
|---|---|---|---|
| **Esmeralda Institucional** | `#059669` / `#10B981` | `text-emerald-400`, `bg-emerald-600` | Acciones principales, estados activos, sellos de validez y confirmación. |
| **Pizarra Notarial** | `#090D16` | `bg-[#090D16]` | Fondo canvas principal de la aplicación. |
| **Superficie de Tarjeta** | `#0F172A` | `bg-slate-900` | Tarjetas de trámite, paneles y modales. |
| **Borde Estructural** | `#1E293B` | `border-slate-800` | Delimitación nítida y elegante de contenedores. |
| **Ámbar Normativo** | `#F59E0B` | `text-amber-400`, `bg-amber-950/50` | Citas de artículos de ley y plazos oficiales. |

---

## 🔲 3. Reglas de Componentes

1. **Botones de Acción Primaria:**
   - Fondo: `bg-emerald-600 hover:bg-emerald-500`.
   - Texto: `text-white font-semibold`.
   - Esquinas: `rounded-2xl` o `rounded-xl`.
   - Sombra: `shadow-sm hover:shadow-emerald-600/20`.

2. **Botones Secundarios:**
   - Fondo: `bg-slate-800 hover:bg-slate-700`.
   - Texto: `text-slate-200`.
   - Borde: `border border-slate-700`.

3. **Buscador & Selector de Sectores:**
   - Barra fluida con buscador universal y menú desplegable de sectores en una sola línea compacta.
   - Menú popover elegante con iconos y contadores por sector.

4. **Tarjetas de Trámite (Catálogo y Bento):**
   - Fondo `bg-slate-900` con `border border-slate-800`.
   - Hover suave: `hover:border-slate-700 hover:shadow-md`.
   - Icono en contenedor redondeado institucional y enlace en esmeralda.

---

## ⚠️ 4. Recordatorios de Cumplimiento (AGENTS.md)
- **Cero emojis en la interfaz:** Utilizar componentes de `lucide-react` con trazo uniforme (stroke `1.75` - `2.0`).
- **Lenguaje 100% humano y cálido:** Prohibido usar palabras como `prompt`, `sanitización`, `API`, `schema`, `LLM`, `Gemini`, `modelo`.
- **Cero commits automáticos:** Confirmar siempre con el usuario antes de cualquier operación en git.
