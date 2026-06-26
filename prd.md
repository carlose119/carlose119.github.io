# Product Requirement Document (PRD)
## Proyecto: Sitio Web de Portafolio Profesional – Carlos Carrillo

### 1. Visión General del Producto
* **Objetivo:** Desarrollar un portafolio web personal, estático y de alto rendimiento para exhibir la experiencia técnica, proyectos clave y habilidades en desarrollo Full Stack y Operaciones (DevOps) de Carlos Carrillo.
* **Despliegue y Alojamiento:** Repositorio de GitHub Pages (`https://github.com/carlose119/carlose119.github.io`).
* **Público Objetivo:** Reclutadores IT, Tech Leads, CTOs y clientes potenciales.

### 2. Stack Tecnológico y Arquitectura
| Componente | Tecnología Seleccionada | Especificaciones |
| :--- | :--- | :--- |
| **Estructura** | HTML5 Semántico | Sin frameworks pesados. Estructura limpia y accesible (ARIA base). |
| **Estilos** | CSS3 / Tailwind CSS | Estilos responsivos, enfoque Mobile-First y optimizados para rendimiento. |
| **Interactividad** | Vanilla JavaScript (ES6+) | Para el filtrado dinámico de proyectos y consumo de la API de GitHub. |
| **Alojamiento** | GitHub Pages | Despliegue estático nativo y automatizado sin necesidad de pipelines complejos de build. |

### 3. UI/UX y Lineamientos de Diseño
* **Tema Principal:** **Modo Oscuro (Dark Mode) Nativo.** Colores base en tonos grises oscuros y negros (ej. `#121212`, `#1E1E1E`) con acentos de color vibrante/neón (ej. azul eléctrico, verde esmeralda o morado) para resaltar botones, tags y enlaces activos.
* **Estilo Visual:** Limpio, minimalista y orientado a un perfil técnico (estética tipo terminal moderna, IDE o dashboard de desarrollo).
* **Tipografía:** Fuentes legibles y de aspecto moderno (ej. *Inter*, *Roboto* o *Fira Code* para detalles de código y tecnologías).

### 4. Estructura de la Interfaz (Mapa de Secciones)

#### 4.1. Sección Hero (Inicio)
* **Contenido:** Saludo directo e impactante ("Hola, soy Carlos Carrillo") y título profesional principal ("Full Stack Developer & Operations").
* **CTA (Call to Action):** Botón de acción principal con scroll suave hacia "Ver mi trabajo".
* **Enlaces de Acción Rápida:** Iconos vectoriales minimalistas (SVG) enlazados a LinkedIn, GitHub, Correo Electrónico y WhatsApp.

#### 4.2. Sección: Sobre Mí
* **Contenido:** Resumen profesional breve y conciso extraído de la experiencia consolidada en LinkedIn.
* **Enfoque:** Destacar explícitamente el perfil híbrido: alta capacidad en desarrollo de software (Backend/Frontend con .NET, Node, PHP) combinado con una sólida mentalidad operativa y de infraestructura (DevOps/Operaciones).

#### 4.3. Sección: Proyectos Destacados (Hero Projects)
Sección visualmente prioritaria con tarjetas expandidas o un diseño destacado para los 3 proyectos principales, incluyendo descripción detallada del rol, retos técnicos superados y enlaces:
1. **Zolut (`zolut.com`):** E-commerce de compra de listas escolares operando en Miami. *Stack: WordPress + Next.js.*
2. **Distribución Dunlop Latam (`distribuidores.dunloplatam.com`):** Aplicativo de compras B2B para distribuidores desarrollado bajo la firma de Somosforma. *Stack: .NET Razor Pages + DevExpress.*
3. **MG Motor Chile (`mgmotor.cl`):** Portal automotriz corporativo, desarrollo de nuevas funcionalidades y optimizaciones dentro del equipo de Somosforma. *Stack: Laravel.*

#### 4.4. Sección: Portafolio Completo (Con Filtros Dinámicos)
* **Funcionalidad:** Botones interactivos controlados por JavaScript para filtrar la grilla de proyectos en tiempo real (Ej: `Todos` | `.NET` | `PHP/Laravel` | `JS/React/Next` | `CMS/WordPress`).
* **Catálogo de Proyectos a incluir en la grilla:**

| Proyecto / Cliente | URL / Acceso | Descripción Breve | Stack / Tecnologías | Contexto (Empresa) |
| :--- | :--- | :--- | :--- | :--- |
| **CoopeCaja** | `https://www.coopecaja.fi.cr/` | Intranet corporativa y aplicativo de mensajería interno, servicios paralelos y microservicios. | .NET MVC, OData, Node.js, .NET Minimal API, DevExpress | Somosforma (Grupo MMG) |
| **SQM Corporativo** | `http://sqm.com/` | Mantenimiento correctivo, evolutivo y optimización de rendimiento del portal global. | WordPress | Somosforma (Grupo MMG) |
| **SQM Nutrition** | `https://www.sqmnutrition.com/` | Soporte y mantenimiento continuo de la plataforma digital híbrida. | WordPress, Next.js | Somosforma (Grupo MMG) |
| **Isinergia** | `https://isinergia.cl/` | Desarrollo web y mantenimiento de módulos para el portal de la inmobiliaria. | WordPress | Somosforma (Grupo MMG) |
| **Inspira** | `https://inspira.cl/` | Mantenimiento general y desarrollo exclusivo del módulo "My Depto" para seguimiento de compras. | WordPress | Somosforma (Grupo MMG) |
| **Evanhub** | `https://evanhub.com/` | Portal de salud mental (Next.js + Strapi) y aplicativo robusto para la gestión y agendamiento de citas médicas. | Next.js, Strapi CMS, .NET, ReactJS | Somosforma (Grupo MMG) |
| **MG Argentina** | `https://mgargentina.ar/` | Localización, mantenimiento y despliegue de la variante regional basada en la arquitectura de MG Motor. | Laravel | Somosforma (Grupo MMG) |
| **MG Uruguay** | `https://mguruguay.com.uy/` | Adaptación regional, mantenimiento de catálogo y nuevas funcionalidades para el mercado uruguayo. | Laravel | Somosforma (Grupo MMG) |
| **Toursnation** | `http://www.toursnation.com/` | Plataforma e-commerce dedicada a la venta de paquetes turísticos y reservas. | CakePHP | Proyecto Independiente |

#### 4.5. Sección: Actividad en GitHub (Automatizada)
* **Funcionalidad:** Script asíncrono en Vanilla JS que consuma la API pública de GitHub (`https://api.github.com/users/carlose119/repos`).
* **Regla de Negocio:** Ordenar y renderizar dinámicamente los 3 o 4 repositorios más recientes o con mayor cantidad de estrellas de la cuenta `carlose119`.
* **Diseño:** Tarjetas simplificadas con el nombre del repositorio, descripción, lenguaje principal detectado y un botón de enlace directo al código en GitHub.

#### 4.6. Sección: Habilidades Técnicas (Skills)
Nube de etiquetas (Badges) interactivas u organizadas en categorías bien diferenciadas:
* **Backend:** .NET (MVC, Minimal API, Razor Pages), Node.js, Laravel (PHP), CakePHP.
* **Frontend / UI:** ReactJS, Next.js, JavaScript (ES6+), HTML5/CSS3, DevExpress.
* **CMS & Headless:** WordPress, Strapi.
* **Protocolos e Infraestructura:** OData, SQL Server, MySQL, Prácticas CI/CD / DevOps / Operaciones.

#### 4.7. Sección: Contacto y Footer
* Un cierre limpio y minimalista que evite formularios con backend.
* **Enlaces Directos de Comunicación (Action Links):**
  * **LinkedIn:** `https://www.linkedin.com/in/carlos-carrillo-dev`
  * **GitHub:** `https://github.com/carlose119/`
  * **Correo Electrónico:** Enlace directo vía `mailto:` con marcador para configuración final.
  * **WhatsApp:** Enlace directo a API de mensajería instantánea (`https://wa.me/`) con marcador para el número telefónico.

### 5. Requisitos Técnicos y de Calidad para el Agente de IA
1. **Estructura del Proyecto:** Generar código modular pero directo, preferiblemente separado de la siguiente forma: `index.html` (estructura), `styles.css` (estilos o enlace a CDN de Tailwind) y `app.js` (lógica de filtros y API de GitHub).
2. **Rendimiento e Imágenes:** Utilizar selectores y URLs de marcadores (*placeholders* optimizados de Unsplash o similares) para las imágenes de portada de los proyectos, facilitando que el usuario pueda reemplazarlas de manera ágil.
3. **Mantenibilidad:** El código de JavaScript debe estar rigurosamente documentado con comentarios que detallen cómo funciona el filtrado por atributos `data-*` y la llamada fetch a GitHub.
4. **Responsive Design:** Garantizar la perfecta visualización e interactividad fluida en pantallas móviles, tablets y monitores de escritorio (enfoque mobile-first).
