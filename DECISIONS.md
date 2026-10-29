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
| **ADR-008** | Desaturación Visual, Minimalismo Ejecutivo e Iconografía Phosphor (`react-icons/pi`) | 🎯 Aprobado | 2026-10-29 |

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

### ADR-008: Desaturación Visual, Minimalismo Ejecutivo e Iconografía Phosphor (`react-icons/pi`)
- **Contexto:** La interfaz actual sufre de saturación visual: demasiados iconos decorativos en cada label/título y colores chillones dispersos.
- **Decisión:**
  1. **Familia de Iconos:** Adoptar **Phosphor Icons (`react-icons/pi`)**, reconocidos por su estética contemporánea, estilizada y limpia (referente: Linear, Amie, Raycast).
  2. **Regla de Desaturación ("Menos es Más"):**
     - Retirar el 70% de los iconos redundantes o puramente decorativos en formularios y subtítulos.
     - Conservar iconos únicamente donde aporten valor funcional directo (búsqueda, navegación, acciones primarias de descarga y perfil).
  3. **Jerarquía Visual y Aire:**
     - Aumentar espacios negativos (*white space*), usar bordes sutiles `slate-200/70` y sombras difusas elegantes.
     - Unificar la paleta a 1 color primario institucional (Royal Indigo) + 1 color de estado (Emerald Mint para firmas/perfil verificado).


