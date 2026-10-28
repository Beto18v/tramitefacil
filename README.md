# TrámiteFácil Hub 🇨🇴

> **Generador instantáneo, offline-first y 100% en el cliente de documentos legales, laborales y comerciales estándar para Colombia.**

TrámiteFácil Hub permite a ciudadanos, trabajadores independientes, pymes y profesionales generar, parametrizar y previsualizar en tiempo real documentos jurídicamente estructurados (cuentas de cobro con retenciones, cartas de renuncia con preaviso, contratos de arrendamiento, acuerdos de confidencialidad, derechos de petición, tutelas y más) con descarga inmediata en formatos **PDF de alta resolución**, **Word (.docx) editable** y texto plano.

---

## 🌟 Principales Características

- **100% Client-Side & Privacidad Absoluta:** Todos los datos se procesan en tu navegador. Ninguna información financiera, contractual o personal es enviada a servidores externos ni almacenada en la nube.
- **Offline-First & PWA:** Totalmente operable sin conexión a internet mediante Service Workers. Se puede instalar como una aplicación nativa en Windows, macOS, Android e iOS.
- **Previsualización Tipográfica en Tiempo Real:** Hoja A4 interactiva que refleja inmediatamente cualquier cambio en el formulario, con selector de tipografía editorial (Serif / Merriweather) o corporativa (Sans / Plus Jakarta Sans) y controles de zoom.
- **Pipeline de Exportación Multiformato:**
  - 📄 **PDF Institucional:** Descarga directa y diálogo de impresión con márgenes estandarizados.
  - 📝 **Word (.docx):** Documentos formalmente maquetados con tablas invisibles de firma y estilos profesionales.
  - 📋 **Portapapeles:** Copia rápida en texto plano con un solo clic.
- **Perfil de Usuario Reutilizable:** Guarda datos personales recurrentes (nombre, documento, dirección, datos bancarios y firma digitalizada) para autocompletar cualquier trámite al instante.
- **Lógica Tributaria y Legal Colombiana Integrada:**
  - Conversión automática de cifras numéricas a letras en Pesos M/CTE.
  - Liquidación de Retención en la Fuente y ReteICA paramétricos.
  - Fundamentación legal visible (Art. 23 de la C.P., Ley 1755 de 2015, Ley 820 de 2003, Código Sustantivo del Trabajo, etc.).

---

## 📚 Catálogo de Documentos Soportados

La plataforma incluye **15 plantillas estandarizadas** distribuidas en 6 áreas clave:

| Categoría | Documento | Marco Jurídico / Uso Clave |
|---|---|---|
| **💼 Finanzas & Freelance** | **Cuenta de Cobro** | Cuentas multilínea con cálculo automático de ReteFuente e ICA, datos bancarios y declaraciones de aportes. |
| | **Propuesta de Servicios** | Cotización profesional con alcance, entregables, cronograma e hitos de pago. |
| **🏢 Laboral & Talento Humano** | **Carta de Renuncia** | Con opción de exoneración de preaviso y entrega de puesto conforme al Código Sustantivo del Trabajo. |
| | **Certificado Laboral** | Solicitud formal de constancia laboral con cargo, salario y tiempo de servicio. |
| | **Permiso Laboral** | Solicitud de permisos remunerados o no remunerados (citas médicas, calamidad, etc.). |
| **🏠 Inmobiliario & Propiedad** | **Contrato de Arrendamiento** | Vivienda urbana con fiador/codeudor solidario conforme a la Ley 820 de 2003. |
| | **Aviso de No Renovación** | Notificación con los 3 meses de antelación legal para evitar prórrogas automáticas. |
| | **Acta de Entrega de Inmueble** | Registro detallado de inventario, estado de servicios públicos y llaves. |
| **🤝 Comercial & Negocios** | **Contrato de Prestación de Servicios** | Relación civil/comercial independiente sin subordinación laboral. |
| | **Acuerdo de Confidencialidad (NDA)** | Modalidad unilateral o bilateral para protección de secretos industriales e ideas. |
| **⚖️ Trámites Ciudadanos & Legales**| **Derecho de Petición** | Conforme al Art. 23 C.P. y Ley 1755 de 2015 (EPS, entidades públicas, bancos). |
| | **Poder Especial / Autorización** | Trámites notariales, bancarios o administrativos ante terceros. |
| | **Reclamación Hábeas Data** | Rectificación o eliminación de reportes negativos ante DataCrédito / TransUnion (Ley 1266 de 2008). |
| **🚗 Vehículos & Transporte** | **Contrato Compraventa de Vehículo** | Traspaso de automotores o motocicletas con estado de impuestos y SOAT. |
| | **Autorización de Retiro de Patios** | Retiro de vehículos inmovilizados por autoridades de tránsito. |

---

## 🛠️ Stack Tecnológico

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling:** [Vite 8](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) con `@tailwindcss/vite`
- **Iconografía:** [Lucide Icons](https://lucide.dev/) (`lucide-react`)
- **PWA & Cache:** [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/)
- **Generación de Documentos:**
  - [`docx`](https://docx.js.org/) para documentos Word enriquecidos
  - [`jspdf`](https://github.com/parallax/jsPDF) & [`html2canvas`](https://html2canvas.hertzen.com/) para PDF en cliente
  - [`file-saver`](https://github.com/eligrey/FileSaver.js) para descargas de blobs

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js:** Versión 18.0 o superior (recomendado Node 20 LTS o 22 LTS).
- **Gestor de Paquetes:** `npm`, `pnpm` o `bun`.

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Beto18v/tramitefacil.git
cd tramitefacil
```

### 2. Instalar Dependencias
```bash
npm install
# O con pnpm:
pnpm install
```

### 3. Iniciar el Servidor de Desarrollo
```bash
npm run dev
# O con pnpm:
pnpm run dev
```
La aplicación estará disponible de inmediato en `http://localhost:3000`.

### 4. Compilar para Producción
```bash
npm run build
```
Generará el bundle optimizado y minificado en la carpeta `dist/`.

### 5. Probar el Bundle de Producción Localmente
```bash
npm run preview
```

### 6. Chequeo de Tipos y Calidad
```bash
npm run lint
```

---

## 📂 Estructura del Proyecto

```text
tramitefacil/
├── public/                 # Favicons, iconografía PWA y manifest
│   └── icon.svg
├── src/
│   ├── components/         # Componentes de presentación y layout
│   │   ├── forms/          # Formularios específicos por trámite (15 documentos)
│   │   ├── templates/      # Vistas de previsualización A4 por trámite
│   │   ├── CatalogView.tsx # Catálogo general con búsqueda y filtros por categoría
│   │   ├── DocumentCard.tsx# Tarjeta interactiva de selección de trámite
│   │   ├── DocumentPreview.tsx # Contenedor A4 con zoom y tipografía
│   │   ├── EditorView.tsx  # Vista dividida (Formulario + Previsualización)
│   │   ├── Header.tsx      # Barra de navegación institucional y perfil
│   │   ├── Hero.tsx        # Sección de bienvenida y buscador rápido
│   │   ├── SignaturePad.tsx# Lienzo interactivo de captura de firma
│   │   └── UserProfileModal.tsx # Modal de configuración de datos recurrentes
│   ├── data/               # Modelos de datos iniciales y ejemplos
│   │   └── initialData.ts
│   ├── hooks/              # Custom hooks (PWA, almacenamiento)
│   │   └── usePWAInstall.ts
│   ├── types/              # Definiciones de tipos y metadatos
│   │   └── documents.ts
│   ├── utils/              # Utilidades de negocio, formateo y exportación
│   │   ├── exportDocx.ts   # Pipeline de exportación a Microsoft Word
│   │   ├── exportPdf.ts    # Pipeline de exportación a PDF
│   │   ├── numberToWords.ts# Conversión de números a letras en pesos colombianos
│   │   ├── plainTextGenerator.ts # Generador de texto plano para portapapeles
│   │   └── profileInjector.ts    # Inyección de perfil guardado en documentos
│   ├── App.tsx             # Orquestador principal de estado y vistas
│   ├── index.css           # Configuración de Tailwind CSS y reglas @media print
│   └── main.tsx            # Punto de entrada de la aplicación React
├── ARCHITECTURE.md         # Documento de arquitectura de software y diseño
├── TECH_DEBT.md            # Registro priorizado de deuda técnica y bugs
├── package.json            # Manifiesto de dependencias y scripts
├── tsconfig.json           # Configuración de compilador TypeScript
└── vite.config.ts          # Configuración de Vite, PWA y Tailwind
```

---

## 🤝 Guía de Contribución

1. Haz un Fork del repositorio.
2. Crea una rama descriptiva para tu funcionalidad (`git checkout -b feature/nueva-plantilla-tutela`).
3. Sigue las convenciones arquitectónicas detalladas en [`ARCHITECTURE.md`](./ARCHITECTURE.md).
4. Asegúrate de que el chequeo de tipos no arroje errores (`npm run lint`).
5. Abre un Pull Request detallando los cambios introducidos.

---

## ⚖️ Aviso Legal (Disclaimer)

*TrámiteFácil Hub* es una herramienta tecnológica de asistencia para la redacción y maquetación de minutas y documentos estándar conforme al ordenamiento jurídico colombiano. No sustituye la asesoría legal personalizada de un abogado profesional ni constituye una relación cliente-abogado. Se recomienda revisar el contenido final antes de firmar o radicar cualquier documento.

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

