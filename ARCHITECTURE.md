# Arquitectura de Software - TrámiteFácil Hub

## 1. Visión General y Principios de Diseño

**TrámiteFácil Hub** es una plataforma web progresiva (PWA) de alto rendimiento, diseñada bajo el paradigma **Client-Side Only / Offline-First / Privacy-by-Design**, orientada a la parametrización, previsualización y generación instantánea de documentos legales, comerciales, laborales e inmobiliarios adaptados a la normatividad de Colombia.

### Principios Arquitectónicos Fundamentales
1. **Privacidad Absoluta (Zero-Knowledge Architecture):** Ningún dato ingresado por el usuario abandona su navegador. No existen bases de datos remotas, servidores de telemetría ni endpoints analíticos de terceros.
2. **Offline-First Operacional:** La aplicación es completamente funcional sin conexión a internet mediante Service Workers gestionados por `vite-plugin-pwa`.
3. **Flujo de Datos Unidireccional Estricto (UDF):** La captura de datos, la persistencia local, la previsualización tipográfica en hoja A4 y el pipeline de exportación (PDF / DOCX) se comunican mediante un ciclo de datos predecible y tipado.
4. **Desacoplamiento Esquema-Vista:** La lógica de campos, validaciones y cálculos tributarios/legales debe operar de forma agnóstica a los componentes visuales de presentación.

---

## 2. Diagrama de Flujo de Datos Unidireccional (UDF)

```mermaid
flowchart TD
    subgraph CAPTURE["1. Captura de Datos (Inputs)"]
        UI_Form["Formulario Dinámico / Form Engine"]
        User_Input["Interacción del Usuario"]
        User_Profile["Inyección de Perfil Guardado"]
        User_Input --> UI_Form
        User_Profile -.->|Autocompletar| UI_Form
    end

    subgraph STATE["2. Gestión de Estado & Persistencia"]
        State_Hook["Hook useDocumentState / useLocalStorage"]
        Debounce_Queue["Cola de Debounce (400ms)"]
        LocalStorage_Engine[("LocalStorage Versionado\n(tramitefacil_v2_*)")]
        Schema_Validator["Validador y Migrador de Esquema"]

        UI_Form -->|Dispatch action / update| State_Hook
        State_Hook -->|Mutación inmediata de memoria| Debounce_Queue
        Debounce_Queue -->|Escritura asíncrona segura| Schema_Validator
        Schema_Validator -->|JSON.stringify + try/catch| LocalStorage_Engine
        LocalStorage_Engine -.->|Carga inicial + Migración| Schema_Validator
        Schema_Validator -.->|Estado validado| State_Hook
    end

    subgraph VIEW["3. Capa de Presentación Reactiva"]
        Reactive_Context["Estado del Documento Activo"]
        Preview_Container["DocumentPreview (Viewport A4)"]
        Style_Config["Configuración Tipográfica (Serif / Sans)"]
        A4_Renderer["Renderizador de Plantilla (DOM A4 Simulado)"]

        State_Hook --> Reactive_Context
        Style_Config --> Preview_Container
        Reactive_Context --> Preview_Container
        Preview_Container --> A4_Renderer
    end

    subgraph EXPORT["4. Pipeline de Exportación"]
        Btn_PDF["Exportar PDF"]
        Btn_Word["Exportar Word (.docx)"]
        Btn_Print["Impresión Directa"]
        Btn_Copy["Copiar Texto"]

        A4_Renderer -->|Clonación DOM / Vectorial| Btn_PDF
        Reactive_Context -->|Generador Semántico docx| Btn_Word
        A4_Renderer -->|@media print CSS Engine| Btn_Print
        Reactive_Context -->|Generador Plain Text| Btn_Copy

        Btn_PDF --> File_PDF[("Documento .PDF Descargado")]
        Btn_Word --> File_Word[("Documento .DOCX Descargado")]
        Btn_Print --> Browser_Print[("Diálogo de Impresión del SO")]
        Btn_Copy --> Clipboard[("Portapapeles del Sistema")]
    end
```

---

## 3. Ciclo de Vida del Dato y Estados del Sistema

El flujo unidireccional opera bajo las siguientes etapas:

1. **Captura y Normalización:**
   El usuario interactúa con los controles del formulario guiado. Cada mutación genera un evento tipado que actualiza el estado local en memoria reactiva inmediata (`React State`), garantizando una tasa de refresco fluida (60 FPS) sin bloqueos del hilo principal.
2. **Persistencia Desacoplada y Debounced:**
   Para prevenir la degradación de rendimiento por escrituras sincrónicas en cada pulsación de tecla, las escrituras en `localStorage` se encolan mediante un temporizador debounce de 400ms. Si ocurre una excepción de cuota (`QuotaExceededError`), el sistema la captura, libera activos no esenciales (como previsualizaciones temporales) y notifica al usuario sin perder los datos en memoria.
3. **Previsualización Reactiva en Tiempo Real:**
   El componente de previsualización A4 consume el estado del documento y los modificadores de estilo (familia tipográfica, tamaño de fuente). La hoja A4 virtual mantiene dimensiones estándar (210mm x 297mm en proporción escalada) y renderiza las cláusulas legales y tablas de liquidación reactivamente.
4. **Pipeline de Exportación Polimórfico:**
   El documento puede materializarse en múltiples formatos finales a partir de la misma fuente de verdad:
   - **PDF:** Generación a través del motor `@media print` de alta resolución o renderizado vectorial puro en cliente vía `jsPDF`.
   - **DOCX:** Construcción de un árbol de objetos tipados (`docx.Document`, `docx.Paragraph`, `docx.Table`) con tablas invisibles de firma y márgenes institucionales (2.5 cm).
   - **Texto Plano:** Serialización limpia con codificación UTF-8 para pegado en correos o plataformas judiciales.

---

## 4. Estándar de Diseño para Nuevas Plantillas (Template Architecture)

Actualmente, añadir un documento exige modificar hasta 7 archivos distintos (`documents.ts`, `initialData.ts`, `EditorView.tsx`, `DocumentPreview.tsx`, `exportDocx.ts`, `plainTextGenerator.ts` y crear un nuevo Form/Template). 

Para escalar a más de 50 trámites sin acumular deuda técnica, el sistema migrará a un **Motor Documental Basado en Esquemas (Schema-Driven Template Engine)**.

### 4.1. Estructura de Directorios por Plantilla
Cada plantilla se encapsulará en un módulo autocontenido bajo `src/templates/[documentId]/`:

```text
src/templates/cuenta_cobro/
├── index.ts               # Exportación del contrato DocumentDefinition
├── schema.ts              # Definición de campos, tipos, validaciones y valores por defecto
├── calculations.ts        # Funciones puras de cálculo matemático/tributario (ej. retenciones)
├── DocumentView.tsx       # Componente puro de previsualización A4
└── docxBuilder.ts         # Generador estructurado de párrafos y tablas Word
```

### 4.2. Contrato de Definición de Documento (`DocumentDefinition<T>`)

Cada documento implementará la interfaz canónica:

```typescript
export interface DocumentDefinition<TData extends Record<string, unknown>> {
  meta: {
    id: string;
    title: string;
    shortTitle: string;
    category: 'freelance' | 'laboral' | 'inmobiliario' | 'comercial' | 'legal' | 'vehiculos';
    lawReference: string;
    description: string;
    tags: string[];
    estimatedMinutes: number;
    icon: string;
  };
  defaultData: TData;
  sampleData: TData;
  formSchema: FormSectionSchema<TData>[];
  validate?: (data: TData) => Record<string, string | undefined>;
  renderView: React.FC<{ data: TData; styleConfig: DocumentStyleConfig }>;
  buildDocx: (data: TData, meta: DocumentMeta) => Promise<Blob>;
  toPlainText: (data: TData) => string;
}
```

### 4.3. Esquema Dinámico de Formularios (`FormSchema`)
El formulario no requerirá código JSX repetitivo. Se configurará declarativamente:

```typescript
export interface FormFieldSchema<TData> {
  id: keyof TData;
  label: string;
  type: 'text' | 'number' | 'currency' | 'date' | 'select' | 'textarea' | 'switch' | 'repeater' | 'signature';
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  repeaterFields?: FormFieldSchema<any>[]; // Para conceptos, hitos, hechos, anexos
  condition?: (data: TData) => boolean; // Renderizado condicional de cláusulas
}

export interface FormSectionSchema<TData> {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  fields: FormFieldSchema<TData>[];
}
```

### 4.4. Beneficios del Estándar
1. **Adición Inmediata:** Crear un nuevo trámite legal consistirá únicamente en registrar su carpeta con el `DocumentDefinition` correspondiente.
2. **Reutilización del 100% de la UI:** Las secciones colapsables, inputs formateados para moneda colombiana (COP), selectores de tipo de documento (CC, NIT, CE, Pasaporte) y pad de firmas quedan centralizados.
3. **Mantenibilidad:** Errores tipográficos o actualizaciones de leyes (ej. reforma laboral o tributaria) se corrigen en un solo archivo aislado.

---

## 5. Estrategia de Persistencia y Migraciones de LocalStorage

Para evitar la corrupción de datos y el agotamiento de memoria en dispositivos móviles, se adopta la siguiente arquitectura de almacenamiento:

### 5.1. Segregación de Claves (Namespace Partitioning)
En lugar de serializar todo el catálogo en un mega-objeto de 1 MB, se particiona el almacenamiento:
- `tf_profile_v2`: Datos del usuario permanente (nombre, documento, firma recurrente, banco).
- `tf_doc_[docId]_v2`: Datos específicos del documento que el usuario está editando.
- `tf_settings_v2`: Preferencias de interfaz (vista, zoom, tipografía).

### 5.2. Wrapper Tipado y Resiliente (`useLocalStorage`)
- Todas las operaciones de lectura y escritura encapsuladas con `try/catch`.
- Verificación de cuota previa a la escritura (`StorageManager.estimate()`).
- Manejo seguro de firmas: las imágenes en base64 de firmas se comprimen o almacenan en formato vectorial SVG para minimizar la huella de bytes (menos de 2 KB por firma frente a más de 150 KB de un PNG rasterizado).

### 5.3. Pipeline de Migraciones
Cada registro incluye `schemaVersion`. Al cargar datos de una versión previa, un migrador secuencial ejecuta las transformaciones necesarias para garantizar la compatibilidad retroactiva sin pérdida de información del usuario.

---

## 6. Arquitectura del Pipeline de Exportación

### 6.1. Exportación PDF (Doble Estrategia)
1. **Estrategia A (Nativa / Vectorial por Defecto - `@media print`):**
   Apertura del diálogo nativo del navegador configurando estilos de página `@page { size: a4 portrait; margin: 15mm; }`. Garantiza texto 100% seleccionable, tipografía nítida en cualquier nivel de zoom, paginación automática sin cortes horizontales y peso de archivo óptimo (menos de 100 KB).
2. **Estrategia B (Descarga Directa de Blob vía jsPDF):**
   Para entornos de descarga autónoma, el DOM del elemento A4 se clona en un contenedor virtual fuera de pantalla con ancho estricto de 794px (equivalente a 210mm a 96 DPI), eliminando el zoom visual y las clases `hidden`. Se renderizan las páginas respetando los saltos de sección (`page-break-inside: avoid`).

### 6.2. Exportación DOCX Formal
El módulo de exportación Word utiliza directamente la API semántica de la librería `docx`:
- Estilos tipográficos estrictos: Tipografía *Arial* o *Calibri*, interlineado 1.15, márgenes de 2.5 cm en los 4 bordes.
- Título principal con borde inferior decorativo institucional.
- Secciones numeradas en negrita con alineación justificada.
- **Tabla de firmas invisible:** Tabla de 1 fila y 2 columnas con bordes `BorderStyle.NONE` y ancho `50%` por celda, garantizando que las firmas del emisor y receptor aparezcan alineadas y con espacio suficiente para rúbrica manual o sello notarial.

