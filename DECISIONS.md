# Registro de Decisiones de Arquitectura y Producto (ADR) - TrámiteFácil Hub

Este documento recopila las decisiones de ingeniería, diseño de producto y estrategia técnica aprobadas para la evolución del proyecto.

---

## Índice de Decisiones

| ID | Título | Estado | Fecha |
|---|---|---|---|
| **ADR-001** | Arquitectura Modular de 15 Plantillas con Contrato Tipado | ✅ Implementado | 2026-10-28 |
| **ADR-002** | UI Fintech en Slate y Renderizado Fuera de Pantalla para PDF Móvil | ✅ Implementado | 2026-10-28 |
| **ADR-003** | Arquitectura Serverless en Vercel para Capacidades de Inteligencia Artificial | 🎯 Aprobado (Por implementar) | 2026-10-28 |
| **ADR-004** | Enrutador y Sugeridor Inteligente de Trámites (Fase 1 de IA) | 🎯 Aprobado (Prioridad #1 de IA) | 2026-10-28 |
| **ADR-005** | Autollenado Guiado (Prompt-to-Document) y Oficio Libre Institucional (Fase 2 de IA) | 💡 En backlog | 2026-10-28 |
| **ADR-006** | Estrategia de Tokenomics de Costo Ultrabajo (`gpt-4o-mini` + Schemas) | 🎯 Aprobado | 2026-10-28 |
| **ADR-007** | Marco Legal Actualizado, Disclaimer de Responsabilidad y Footer Institucional | 🎯 Aprobado | 2026-10-29 |
| **ADR-008** | Desaturación Visual, Minimalismo Ejecutivo e Iconografía Lucide (`lucide-react`) | ✅ Implementado | 2026-10-29 |
| **ADR-009** | Onboarding Inmediato y Unificación de Autocompletado en un Solo Formato | ✅ Implementado | 2026-10-29 |
| **ADR-010** | Modo Claro / Oscuro con Paleta Personalizada (Elegancia Grafito / Obsidiana) | ✅ Implementado | 2026-10-29 |
| **ADR-011** | Retención de React + Vite SPA (Descarte de Next.js y Cero Backend/Pagos por ahora) | ✅ Aprobado | 2026-10-29 |
| **ADR-012** | Integración de IA con API de Costo Ultrabajo (Tokens Mínimos & Esquemas Compactos) | 🎯 Priorizado | 2026-10-29 |

---

## Detalle de Decisiones

### ADR-001: Arquitectura Modular de Plantillas
- **Contexto:** Existían 15 componentes monolíticos con lógica acoplada de UI, cálculo y serialización.
- **Decisión:** Desacoplar las 15 plantillas en `src/templates/<dominio>/<docType>/` con 4 archivos estándar: `schema.ts`, `DocumentView.tsx`, `DocumentForm.tsx` e `index.ts`, gobernadas por el contrato `DocumentDefinition<TData>`.
- **Resultado:** Reducción drástica de deuda técnica, cero `any` y registro central extensible.

---

### ADR-002: UI Slate Fintech y Prevención de Crash de PDF en Móvil
- **Contexto:** En móviles, la exportación fallaba al estar el tab `'preview'` en `display: none`.
- **Decisión:** 
  1. Diseñar interfaz corporativa en Slate-900 / Indigo con dual panel responsivo.
  2. Implementar un contenedor de captura off-screen con ancho fijo A4 (`794px`) en `EditorView.tsx`.
- **Resultado:** Exportación consistente en el 100% de dispositivos móviles y escritorios.

---

### ADR-003: Backend Serverless en Vercel sin Costo de Infraestructura
- **Contexto:** Se requiere integrar capacidades de IA sin pagar servidores dedicados (VPS/AWS) y protegiendo las credenciales.
- **Decisión:** Utilizar Vercel Serverless Functions (`/api/*`) aprovechando el hosting actual (`tramitefacil-hub.vercel.app`), gratuito con hasta 100.000 invocaciones mensuales.
- **Seguridad:** `OPENAI_API_KEY` almacenada exclusivamente en las Variables de Entorno de Vercel. Nunca expuesta al cliente.

---

### ADR-004: Enrutador y Sugeridor Inteligente de Trámites (Fase 1 de IA)
- **Contexto:** Muchos usuarios no saben qué trámite legal o comercial necesitan (ej: reclamo a aerolíneas, garantía de producto, deuda laboral).
- **Decisión:** Implementar como primera funcionalidad de IA un **Sugeridor / Enrutador Inteligente**:
  - **Ubicación UI:** Barra de búsqueda inteligente en la vista de Catálogo (`CatalogView.tsx`).
  - **Entrada:** Descripción informal del problema del ciudadano (ej: *"Compré una nevera hace 1 mes y no enfría, el almacén no responde"*).
  - **Salida estructurada:**
    1. `recommendedDocId`: Documento del catálogo recomendado (ej: `derecho_peticion`).
    2. `justification`: Explicación sencilla de por qué aplica legalmente.
    3. `initialDataDraft`: Extracción inicial de datos detectados (nombre almacén, fecha, producto) para precargar el trámite en 1 clic.
    4. `alternativeDocId`: Opción secundaria si aplica.
    5. `externalEntityAdvice`: Si no encaja en las 15 plantillas, orientación sobre entidad competente (SIC, Personería, Inspectoría de Trabajo).
- **Fallback Offline:** Si el usuario no tiene conexión a internet, el buscador opera con búsqueda difusa (*fuzzy search*) por palabras clave y tags del catálogo local.

---

### ADR-005: Autollenado Guiado y Oficio Libre Institucional (Fase 2 de IA)
- **Decisión:** 
  - **Autollenado (Prompt-to-Document):** Modal dentro de `EditorView.tsx` que permite dictar o pegar el caso y autollena los campos del documento activo.
  - **Oficio Libre:** Plantilla comodín para comunicaciones administrativas que no pertenezcan al catálogo fijo.

---

### ADR-006: Tokenomics y Control de Gasto
- **Modelo:** `gpt-4o-mini` con Structured Outputs.
- **Costo proyectado:** ~$0.00008 USD por solicitud. Con $1 USD se pueden realizar ~12.500 consultas.
- **Límites de protección:**
  - Límite duro de gasto configurado en OpenAI ($2 USD/mes).
  - Rate limiting por IP en la función serverless (máx. 10 consultas por hora por usuario).

---

### ADR-007: Marco Legal Actualizado, Disclaimer de Responsabilidad y Footer Institucional
- **Contexto:** Al ser una plataforma de generación de documentos jurídicos y comerciales en Colombia, se debe proteger la responsabilidad civil del autor y garantizar rigor normativo.
- **Decisión:**
  1. **Fidelidad y Actualización Normativa:** Cada plantilla conserva y cita sus fuentes exactas (Código Civil, Código de Comercio, Código Sustantivo del Trabajo, Ley 820 de 2003 de arrendamiento, Ley 1755 de 2015 de petición, Leyes 1266/2008 y 2157/2021 de habeas data, Ley 769 de 2002 de tránsito).
  2. **Footer Institucional con Disclaimer Legal:**
     - Aviso expreso de exención: *"TrámiteFácil Hub es una herramienta tecnológica de automatización documental y no constituye asesoría jurídica profesional ni relación abogado-cliente. Para litigios o controversias complejas, consulte a un profesional colegiado."*
     - Enlace a modal de Términos de Uso y Política de Privacidad (énfasis en privacidad offline: datos locales en el dispositivo del usuario conforme a la Ley 1581 de 2012).

---

### ADR-008: Desaturación Visual, Minimalismo Ejecutivo e Iconografía Lucide (`lucide-react`)
- **Contexto:** La interfaz anterior presentaba saturación visual. Tras evaluar Phosphor Icons (`react-icons/pi`), se determinó expresamente que la suite idónea para la identidad del proyecto es **Lucide Icons (`lucide-react`)**, utilizada con moderación y trazo sobrio (`1.5px` - `1.75px`).
- **Decisión:**
  1. **Familia de Iconos:** Adoptar de manera canónica **`lucide-react`** y desinstalar `react-icons` para reducir el tamaño del bundle.
  2. **Regla de Desaturación ("Menos es Más"):**
     - Retirar el 70% de los iconos redundantes o puramente decorativos en formularios y subtítulos.
     - Conservar iconos únicamente donde aporten valor funcional directo (búsqueda, navegación, acciones primarias de descarga y perfil).
  3. **Jerarquía Visual y Aire:**
     - Aumentar espacios negativos (*white space*), usar bordes sutiles `slate-200/80` / `dark:border-slate-800` y sombras difusas elegantes.
     - Unificar la paleta a 1 color primario institucional (grafito / índigo) + 1 color de estado (Emerald Mint para firmas/perfil verificado).

---

### ADR-009: Onboarding Inmediato y Unificación de Autocompletado en un Solo Formato
- **Contexto:** Actualmente había banners e indicaciones de autocompletado dispersos en múltiples lugares que saturan la vista y dan sensación de plantilla genérica de IA. Además, el usuario novato necesita entender qué hace la app en 3 segundos.
- **Decisión:**
  1. **Claridad Inmediata al Ingresar (Value Proposition en 3 Pasos en `Hero.tsx`):**
     - Al entrar a la app, un bloque visual limpio y rápido que explica el flujo sin rodeos:
       `1. Elige tu trámite` → `2. Completa tus datos (o autollena con 1 clic)` → `3. Descarga en PDF/Word oficial`.
  2. **Un Solo Formato de Autocompletado Unificado:**
     - Eliminadas tarjetas repetitivas intermedias.
     - Un único centro de datos del emisor en Header y Editor: rápido de guardar, rápido de activar y transparente.

---

### ADR-010: Sistema de Modo Claro y Oscuro con Paleta de Marca Personal
- **Contexto:** El azul primario estándar (`blue-600`) se percibe saturado y genérico. Se requiere una identidad cromática de autor: sutil y reposada en modo claro, y ejecutiva/lujosa en modo oscuro.
- **Decisión:**
  1. **Soporte Nativo Claro / Oscuro (`dark` mode toggle persistente en localStorage con `useTheme`):**
     - **Modo Claro (Editorial Paper & Charcoal):** Fondos `slate-50` / marfil sutil, texto en grafito profundo `slate-950`, acentos en índigo noche tenue (`#334155` / `#1E293B` con toques de azul tinta `#1D4ED8`), evitando azules chillones.
     - **Modo Oscuro (Obsidian & Platinum):** Fondos en obsidiana espacial (`#090D16` / `#0B0F19`), superficies en pizarra mate (`#111827`), bordes sutiles con luz ambiental (`rgba(255,255,255,0.08)`), textos en blanco platino y acentos esmeralda/ámbar sutiles.
  2. **Hoja A4 Inmutable:** El documento legal formal mantiene su lienzo blanco de hoja física A4 (`bg-white text-slate-900`) para garantizar que la previsualización corresponda exactamente al PDF real impreso.

---

### ADR-011: Retención de React + Vite SPA (Descarte de Next.js y Cero Backend/Pagos)
- **Contexto:** Se evaluó formalmente si convenía migrar de Vite SPA a Next.js (App Router).
- **Decisión:**
  1. **Permanecer en React 19 + Vite SPA:** Mantener el stack actual sin migrar a Next.js.
  2. **Fundamentos:**
     - Garantiza funcionamiento 100% Offline PWA con Service Workers locales.
     - Costo de infraestructura $0 absoluto (alojamiento estático en Vercel Edge CDN).
     - Cero problemas de SSR con librerías DOM/Canvas (`html2canvas`, `jspdf`, `docx`).
  3. **Alcance:** Por ahora se descartan servidores dedicados de backend, bases de datos remotas y pasarelas de pago. La aplicación opera en el cliente con máxima velocidad y privacidad.

---

### ADR-012: Integración de IA con API de Costo Ultrabajo
- **Contexto:** El usuario desea habilitar asistencia inteligente (sugerencia de trámites y autollenado) utilizando su propia API key, pero con costo ultrabajo e insignificante.
- **Decisión:**
  1. **Modelo de Consumo:** Emplear modelos ultraeconómicos optimizados para texto estructurado:
     - **Gemini Flash (`gemini-1.5-flash` o `gemini-2.0-flash`):** Nivel gratuito masivo (hasta 15 RPM sin costo) y tokens a centavos por millón.
     - Opcionalmente `gpt-4o-mini` / Groq Llama 3.3.
  2. **Optimización de Tokenomics:**
     - Prompts comprimidos al mínimo (system prompt < 300 tokens).
     - Salida JSON estructurada estricta sin divagaciones ni prosa explicativa innecesaria.
     - Costo estimado: menos de $0.00005 USD por consulta de sugerencia.
  3. **Resiliencia Offline:** Siempre mantener activo el motor heurístico local de búsqueda difusa (*fuzzy matcher*) como fallback cuando no haya internet o no se disponga de API key.




