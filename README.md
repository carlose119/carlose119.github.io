# Carlos Carrillo — Portafolio Profesional

> Full Stack Developer & Operations

Sitio web portafolio personal, estático y de alto rendimiento para exhibir la experiencia técnica, proyectos clave y habilidades en desarrollo Full Stack y Operaciones (DevOps).

**Live Demo:** [carlose119.github.io](https://carlose119.github.io)

---

## Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Secciones del Sitio](#secciones-del-sitio)
- [Funcionalidades Clave](#funcionalidades-clave)
- [API de GitHub](#api-de-github)
- [Diseño y Tema](#diseño-y-tema)
- [Responsive Design](#responsive-design)
- [Accesibilidad](#accesibilidad)
- [Instalación y Desarrollo](#instalación-y-desarrollo)
- [Despliegue](#despliegue)
- [Proyectos Incluidos](#proyectos-incluidos)
- [Contacto](#contacto)
- [Licencia](#licencia)

---

## Características

- **Modo oscuro nativo** con acentos neón (#00D4FF)
- **Diseño responsive** mobile-first (375px → 1280px+)
- **Filtros dinámicos** de proyectos por tecnología
- **Carousel de GitHub** con todos los repositorios públicos
- **API de GitHub** en tiempo real con caché de 1 hora
- **Smooth scroll** en navegación
- **Hamburger menu** para dispositivos móviles
- **Accesibilidad** con ARIA labels, focus states y reduced-motion
- **Zero dependencias** — vanilla HTML, CSS y JavaScript
- **Alto rendimiento** — sin frameworks, sin build tools, carga instantánea

---

## Stack Tecnológico

| Componente | Tecnología | Descripción |
|:---|:---|:---|
| Estructura | HTML5 Semántico | Estructura limpia, accesible con ARIA |
| Estilos | CSS3 Vanilla | Custom properties, Grid, Flexbox, Mobile-First |
| Interactividad | JavaScript ES6+ | Filtros, API GitHub, carousel, smooth scroll |
| Tipografía | Inter + Fira Code | Google Fonts CDN |
| Imágenes | Unsplash CDN | Placeholders optimizados con lazy loading |
| Alojamiento | GitHub Pages | Despliegue estático nativo |
| Analytics | Google Analytics | Tracking de visitas (G-J12PL3BERM) |

---

## Estructura del Proyecto

```
carlose119/
├── index.html      # Estructura HTML5 semántica (629 líneas)
├── styles.css      # Estilos CSS con dark mode (460 líneas)
├── app.js          # JavaScript vanilla ES6+ (309 líneas)
├── carlos.jpg      # Foto de perfil
├── prd.md          # Product Requirement Document
└── README.md       # Esta documentación
```

**Total:** ~1,400 líneas de código modular y documentado.

---

## Secciones del Sitio

### 1. Hero (Inicio)
- Saludo personalizado con foto de perfil
- Título profesional: "Full Stack Developer & Operations"
- Botones CTA: "Ver mi trabajo" / "Contactar"
- Iconos sociales: LinkedIn, GitHub, Email, WhatsApp

### 2. Sobre Mí
- Resumen profesional del perfil híbrido (Dev + Ops)
- Estadísticas: 15+ años, 95+ proyectos, 10+ tecnologías

### 3. Proyectos Destacados
- 3 proyectos principales en tarjetas expandidas
- Imágenes de Unsplash como placeholders
- Stack tecnológico y enlace directo

### 4. Portafolio Completo (con Filtros)
- 14 proyectos en grilla responsive
- 6 categorías de filtrado:
  - Todos
  - .NET
  - PHP/Laravel
  - JS/React/Next
  - CMS/WordPress
  - CakePHP
- Filtro en tiempo sin recarga

### 5. Actividad en GitHub (Carousel)
- Carousel scrollable con todos los repos públicos
- Navegación: flechas prev/next + dots indicadores
- Cada card muestra: nombre, descripción, lenguaje, estrellas
- Caché en sessionStorage (1 hora TTL)

### 6. Habilidades Técnicas
- Badges organizados por categoría:
  - **Backend:** .NET, Node.js, Laravel, CakePHP
  - **Frontend:** React, Next.js, JavaScript, DevExpress
  - **CMS:** WordPress, Strapi
  - **Infraestructura:** SQL Server, MySQL, CI/CD, DevOps

### 7. Contacto
- Enlaces directos sin formularios backend
- LinkedIn, GitHub, Email, WhatsApp

---

## Funcionalidades Clave

### Filtros Dinámicos

```javascript
// Filtrado por atributo data-category
// Cada .project-card tiene un data-category que coincide con los data-filter de los botones
<button data-filter="dotnet">.NET</button>
<article data-category="dotnet">...</article>
```

- Event delegation en el contenedor `.filter-buttons`
- Toggle de clase `.hidden` para mostrar/ocultar
- Atributo `aria-hidden` para accesibilidad

### Carousel de GitHub

```javascript
// Fetch de todos los repos con scroll-snap
// Navegación con flechas y dots
// Responsive: 1-3 cards visibles según viewport
```

- CSS `scroll-snap-type: x mandatory` para snap nativo
- Cálculo dinámico de páginas basado en cards visibles
- Recalculación automática en resize

### Caché de API

```javascript
// sessionStorage con TTL de 1 hora
const CACHE_KEY = 'gh_repos_v2';
const CACHE_TTL = 3600000; // 1 hour
```

- Evita llamadas innecesarias a la API
- Invalidación automática después de 1 hora
- Fallback a datos frescos si el caché está corrupto

---

## API de GitHub

**Endpoint:** `https://api.github.com/users/carlose119/repos`

**Parámetros:**
- `sort=updated` — Ordenar por última actualización
- `per_page=30` — Traer hasta 30 repositorios

**Límites:**
- 60 requests/hora sin autenticación
- Caché local reduce llamadas significativamente

** Datos renderizados por repo:**
- Nombre del repositorio
- Descripción (o "Sin descripción" si es null)
- Lenguaje principal con indicador de color
- Cantidad de estrellas
- Enlace directo a GitHub

---

## Diseño y Tema

### Paleta de Colores

| Token | Valor | Uso |
|:---|:---|:---|
| `--color-bg` | `#121212` | Fondo principal |
| `--color-bg-secondary` | `#1E1E1E` | Tarjetas y secciones |
| `--color-bg-card` | `#2A2A2A` | Elementos elevados |
| `--color-accent` | `#00D4FF` | Acentos neón |
| `--color-text` | `#E0E0E0` | Texto principal |
| `--color-border` | `#333333` | Bordes |

### Tipografía

- **Inter** (300-700): Texto general, headings, navegación
- **Fira Code** (400-500): Tags, badges, logo, código

### Componentes

- **Botones:** Primary (accent fill), Secondary (accent outline), Small, Icon
- **Cards:** Border radius 8px, borde sutil, hover lift effect
- **Tags:** Monospace, background secundario, bordes redondeados
- **Spinner:** Borde accent, animación de rotación

---

## Responsive Design

| Breakpoint | Comportamiento |
|:---|:---|
| `< 768px` | Mobile: stack vertical, hamburger menu, 1 columna |
| `≥ 768px` | Tablet: nav horizontal, about 2 columnas, featured 2 columnas |
| `≥ 1024px` | Desktop: featured 3 columnas, hero centrado |

**Mobile-First:** Estilos base para mobile, `min-width` para desktop.

---

## Accesibilidad

- **ARIA labels** en navegación y botones interactivos
- **`aria-expanded`** en hamburger menu toggle
- **`aria-hidden`** en proyectos filtrados
- **Focus states** visibles con `outline: 2px solid var(--color-accent)`
- **`prefers-reduced-motion`** desactiva animaciones
- **Semantic HTML5** con `nav`, `section`, `article`, `footer`
- **Alt texts** en todas las imágenes

---

## Instalación y Desarrollo

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/carlose119/carlose119.github.io.git

# 2. Entrar al directorio
cd carlose119.github.io

# 3. Abrir en el navegador (sin servidor necesario)
# Simplemente abre index.html en tu navegador

# O usar Live Server en VS Code
# Click derecho → Open with Live Server
```

### Estructura para Desarrollo

```bash
# Editar estilos
styles.css          # Todos los estilos del sitio

# Editar interactividad
app.js              # Filtros, GitHub API, carousel, scroll

# Editar estructura
index.html          # Todo el contenido HTML
```

### Variables CSS para Personalización

```css
:root {
  --color-accent: #00D4FF;    /* Cambiar color accent */
  --color-bg: #121212;         /* Cambiar fondo principal */
  --font-sans: 'Inter', sans-serif;  /* Cambiar tipografía */
  --border-radius: 8px;        /* Cambiar radio de bordes */
}
```

---

## Despliegue

### GitHub Pages (Automático)

El sitio se despliega automáticamente al hacer push a la rama `main`:

```bash
# 1. Hacer cambios
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# 2. GitHub Pages despliega automáticamente
# El sitio estará disponible en: https://carlose119.github.io
```

### Dominio Personalizado (Opcional)

1. Crear archivo `CNAME` en la raíz con tu dominio
2. Configurar DNS para apuntar a GitHub Pages
3. Habilitar HTTPS en Settings → Pages

---

## Proyectos Incluidos

### Destacados

| Proyecto | URL | Stack |
|:---|:---|:---|
| Zolut | [zolut.com](https://zolut.com) | WordPress + Next.js |
| Distribución Dunlop Latam | [distribuidores.dunloplatam.com](https://distribuidores.dunloplatam.com) | .NET Razor Pages + DevExpress |
| MG Motor Chile | [mgmotor.cl](https://mgmotor.cl) | Laravel |

### Portafolio Completo

| Proyecto | URL | Stack | Empresa |
|:---|:---|:---|:---|
| CoopeCaja | [coopecaja.fi.cr](https://www.coopecaja.fi.cr/) | .NET MVC, OData, Node.js | Somosforma |
| SQM Corporativo | [sqm.com](http://sqm.com/) | WordPress | Somosforma |
| SQM Nutrition | [sqmnutrition.com](https://www.sqmnutrition.com/) | WordPress, Next.js | Somosforma |
| Isinergia | [isinergia.cl](https://isinergia.cl/) | WordPress | Somosforma |
| Inspira | [inspira.cl](https://inspira.cl/) | WordPress | Somosforma |
| Evanhub | [evanhub.com](https://evanhub.com/) | Next.js, Strapi, .NET | Somosforma |
| MG Argentina | [mgargentina.ar](https://mgargentina.ar/) | Laravel | Somosforma |
| MG Uruguay | [mguruguay.com.uy](https://mguruguay.com.uy/) | Laravel | Somosforma |
| Toursnation | [toursnation.com](http://www.toursnation.com/) | CakePHP | Independiente |
| DACE Postgrado UNERG | [dace-postgrado.miunerg.com](https://dace-postgrado.miunerg.com/) | Laravel, Filament | UNERG |

---

## Contacto

- **LinkedIn:** [carlos-carrillo-dev](https://www.linkedin.com/in/carlos-carrillo-dev)
- **GitHub:** [carlose119](https://github.com/carlose119/)
- **Email:** [carlos.e119@gmail.com](mailto:carlos.e119@gmail.com)

---

## Licencia

Este es un proyecto personal. El código fuente está disponible para fines educativos y de referencia.

---

**Desarrollado por Carlos Carrillo** — Full Stack Developer & Operations
