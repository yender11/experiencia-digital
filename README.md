# THE JOURNEY — Experiencia Digital de Graduación

Una experiencia web interactiva para celebrar la graduación de 8.º básico. Una historia visual de crecimiento, amistades y momentos inolvidables.

---

## 📁 ESTRUCTURA DEL PROYECTO

```
graduacion/
│
├── index.html              # Único archivo HTML
│
├── assets/
│   ├── css/
│   │   └── styles.css      # Todos los estilos
│   │
│   ├── js/
│   │   ├── app.js          # Inicialización y utilidades
│   │   ├── timeline.js     # Lógica del timeline
│   │   ├── gallery.js      # Galería y lightbox
│   │   └── gift.js         # Juego de acertijos (regalo)
│   │
│   ├── data/
│   │   ├── site.json       # Configuración general
│   │   ├── timeline.json   # Hitos del recorrido
│   │   ├── gallery.json    # Fotografías y momentos
│   │   ├── letter.json     # Carta de papá
│   │   └── gift.json       # Acertijos y código de regalo
│   │
│   └── images/
│       ├── placeholder.svg # Imagen por defecto
│       ├── hero/           # Fotografía de portada
│       ├── timeline/       # Fotografías por hito
│       ├── gallery/        # Galería de recuerdos
│       ├── carousel/       # **Fotos del carrusel (8 fotos)**
│       ├── moments/        # Momentos especiales
│       ├── present/        # Fotografía de graduación
│       ├── letter/         # Fotografía papá e hijo
│       └── closing/        # Fotografía de cierre
```

---

## 🖼️ CÓMO REEMPLAZAR LAS FOTOGRAFÍAS

### Paso 1: Prepara tus imágenes

- **Formatos recomendados:** JPG o WebP
- **Tamaño máximo:** 500KB por imagen (para carga rápida en móviles)
- **Dimensiones sugeridas:**
  - Portada (hero): 1920x1080px o superior
  - Timeline: 800x600px (proporción 4:3)
  - Galería: Variadas (cuadradas, verticales, panorámicas)
  - **Carrusel: 1000x600px mínimo (proporción 16:9 o similar)**
  - Graduación: 1920x1080px o superior
  - Carta: 800x600px (proporción 4:3)
  - Cierre: 1920x1080px o superior

### Paso 2: Reemplaza los archivos

Copia tus imágenes en las carpetas correspondientes:

| Carpeta | Contenido | Archivo de ejemplo |
|---------|-----------|-------------------|
| `assets/images/hero/` | Fotografía de portada | `portada.jpg` |
| `assets/images/timeline/` | Fotos por etapa | `temprano.jpg`, `crecimiento.jpg`, etc. |
| `assets/images/gallery/` | Galería de recuerdos | `foto1.jpg`, `foto2.jpg`, etc. |
| `assets/images/carousel/` | **Fotos carrusel (8 fotos)** | `foto1.jpg` ... `foto8.jpg` |
| `assets/images/moments/` | Momentos destacados | `momento1.jpg`, `momento2.jpg`, etc. |
| `assets/images/present/` | Foto de graduación | `graduacion.jpg` |
| `assets/images/letter/` | Foto papá e hijo | `papa-hijo.jpg` |
| `assets/images/closing/` | Foto de cierre | `futuro.jpg` |

### Paso 3: Actualiza los JSON

Edita los archivos en `assets/data/` para que coincidan con los nombres de tus archivos.

---

## ✏️ CÓMO EDITAR LOS TEXTOS

### 1. `site.json` — Configuración general

```json
{
  "hero": {
    "title": "No fue solamente ir al colegio...",
    "highlight": "Fue crecer.",
    "subtitle": "Una historia de años, amistades..."
  },
  "present": {
    "title": "Lo lograste.",
    "description": "Ocho años de aprendizajes..."
  },
  "closing": {
    "title": "Hoy termina una etapa..."
  }
}
```

### 2. `timeline.json` — Hitos del recorrido

Cada hito representa una etapa (no necesariamente un año escolar):

```json
{
  "milestones": [
    {
      "period": "2017 - 2018",
      "label": "Los primeros años",
      "title": "Todo comenzó aquí",
      "description": "Tu descripción personalizada...",
      "image": "assets/images/timeline/temprano.jpg",
      "highlights": ["Recuerdo 1", "Recuerdo 2"]
    }
  ]
}
```

**Campos editables:**
- `period`: Rango de años o año específico
- `label`: Etiqueta descriptiva de la etapa
- `title`: Título del hito
- `description`: Texto emocional (puede ser largo)
- `image`: Ruta de la fotografía
- `highlights`: Lista de recuerdos destacados

### 3. `gallery.json` — Galería de recuerdos

```json
{
  "photos": [
    {
      "id": "foto-001",
      "src": "assets/images/gallery/foto1.jpg",
      "alt": "Descripción de la foto",
      "category": "amigos",
      "caption": "Texto que aparece al pasar el mouse",
      "aspectRatio": "4:3"
    }
  ]
}
```

**Categorías disponibles:**
- `amigos`
- `companeros`
- `profesores`
- `paseos`
- `actividades`
- `celebraciones`
- `divertidos`
- `importantes`

**Proporciones disponibles:**
- `1:1` — Cuadrada
- `4:3` — Horizontal
- `3:4` — Vertical
- `16:9` — Panorámica

### 4. `gallery.json` — Momentos especiales

```json
{
  "moments": [
    {
      "id": "momento-001",
      "title": "El primer día de clases",
      "image": "assets/images/moments/momento1.jpg",
      "description": "Descripción del momento..."
    }
  ]
}
```

### 5. `letter.json` — Carta de papá

```json
{
  "title": "Hay algo que quiero decirte...",
  "image": "assets/images/letter/papa-hijo.jpg",
  "content": "Tu carta completa aquí...\n\nCon saltos de línea usando \\n",
  "signature": "Papá"
}
```

**Importante:** Usa `\n\n` para párrafos nuevos en el contenido de la carta.

### 6. `gift.json` — Regalo con acertijos (GTA 6)

```json
{
  "code": "GTA6-GRAD-2024",
  "riddles": [
    {
      "id": 1,
      "question": "Tu acertijo aquí...",
      "answer": ["respuesta1", "respuesta2"],
      "hint": "Pista por si se traba..."
    }
  ]
}
```

**Cómo funciona:**
- Hay 3 acertijos por defecto
- El usuario debe responder correctamente cada uno
- No puede avanzar si se equivoca
- Al completar todos, se revela el código de regalo
- El código se puede cambiar en el campo `code`

**Respuestas múltiples:** Puedes poner varias respuestas válidas en el array `answer`. El sistema verifica si la respuesta del usuario coincide con alguna de ellas.

---

## 🎠 CÓMO EDITAR EL CARRUSEL

El carrusel tiene **8 fotos** fijas en el HTML. Para editarlas:

### En `index.html`:

Busca la sección `<!-- SECCIÓN 03.5 — CARRUSEL -->` y edita cada slide:

```html
<!-- Slide 1 -->
<div class="carousel-slide">
  <img 
    class="carousel-image" 
    src="assets/images/carousel/foto1.jpg" 
    alt="Descripción de la foto"
  >
  <div class="carousel-overlay">
    <p class="carousel-year">2017</p>
    <p class="carousel-caption">[TEXTO - editar] Tu texto aquí</p>
  </div>
</div>
```

**Campos editables por foto:**
- `src`: Ruta de la imagen
- `alt`: Descripción para accesibilidad
- `carousel-year`: Año o período
- `carousel-caption`: Texto descriptivo

**Recomendación:** Usa las mismas 8 primeras fotos de la galería (`gallery/foto1.jpg` ... `foto8.jpg`) o crea una carpeta separada `carousel/` con fotos específicas para el carrusel.

---

## 🚀 CÓMO PUBLICAR EL SITIO

### Opción 1: GitHub Pages (Recomendado)

#### Paso 1: Crea un repositorio en GitHub

1. Ve a https://github.com
2. Inicia sesión o crea una cuenta
3. Haz clic en "New repository"
4. Nombre: `graduacion` (o el que prefieras)
5. Visibilidad: **Público** (para GitHub Pages gratuito)
6. Haz clic en "Create repository"

#### Paso 2: Sube los archivos

**Opción A — Usando Git:**

```bash
cd graduacion
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/graduacion.git
git push -u origin main
```

**Opción B — Subir desde la web:**

1. En tu repositorio, haz clic en "uploading an existing file"
2. Arrastra toda la carpeta `graduacion`
3. Haz clic en "Commit changes"

#### Paso 3: Activa GitHub Pages

1. Ve a "Settings" en tu repositorio
2. Haz clic en "Pages" en el menú lateral
3. En "Source", selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
4. Haz clic en "Save"

#### Paso 4: Obtén tu URL

Después de unos minutos, tu sitio estará disponible en:

```
https://TU-USUARIO.github.io/graduacion/
```

---

### Opción 2: Netlify

#### Paso 1: Crea una cuenta en Netlify

1. Ve a https://www.netlify.com
2. Regístrate gratuitamente (puedes usar GitHub)

#### Paso 2: Sube tu sitio

**Opción A — Drag & Drop (Más fácil):**

1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `graduacion` completa
3. ¡Listo! Tu sitio se publicará automáticamente

**Opción B — Conectar con GitHub:**

1. Haz clic en "Add new site" → "Import an existing project"
2. Conecta con GitHub
3. Selecciona tu repositorio `graduacion`
4. Configuración:
   - Build command: (dejar vacío)
   - Publish directory: `/`
5. Haz clic en "Deploy site"

#### Paso 3: Personaliza tu URL

Por defecto será algo como:

```
https://nombre-aleatorio.netlify.app
```

Para cambiarlo:
1. Ve a "Site settings"
2. Haz clic en "Change site name"
3. Elige un nombre personalizado (ej: `journey-tu-nombre.netlify.app`)

---

## 📱 CÓMO GENERAR EL CÓDIGO QR

Una vez publicado el sitio:

### Opción 1: Usando un generador online gratuito

1. Ve a https://www.qr-code-generator.com
2. Pega la URL de tu sitio publicado
3. Descarga el QR en PNG o SVG
4. Imprímelo en la tarjeta física

### Opción 2: Usando Google Charts (Rápido)

```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://TU-URL-AQUI
```

Reemplaza `https://TU-URL-AQUI` con la URL real de tu sitio.

---

## ✅ CHECKLIST ANTES DE PUBLICAR

- [ ] Todas las fotografías están reemplazadas
- [ ] Los nombres de archivos en JSON coinciden con las imágenes
- [ ] Los textos del timeline están personalizados
- [ ] La galería tiene las fotos correctas
- [ ] La carta de papá está escrita completamente
- [ ] Probaste el sitio en un teléfono móvil
- [ ] Probaste el sitio en desktop
- [ ] El lightbox funciona correctamente
- [ ] Todas las secciones hacen scroll suavemente

---

## 🎨 PERSONALIZACIÓN AVANZADA

### Cambiar colores

Edita `assets/css/styles.css` y modifica las variables:

```css
:root {
  --color-bg-primary: #080B12;      /* Fondo principal */
  --color-bg-secondary: #101D32;    /* Fondo secciones alternas */
  --color-text-primary: #FFFFFF;    /* Texto principal */
  --color-text-secondary: #A5ADBA;  /* Texto secundario */
  --color-accent: #C9B99B;          /* Color de acento (dorado) */
}
```

### Cambiar tipografías

En `index.html`, cambia la importación de Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=INTER-NEW:wght@300;400&family=PLAYFAIR-NEW:wght@400;700&display=swap" rel="stylesheet">
```

Y en `styles.css`:

```css
:root {
  --font-serif: 'Playfair New', serif;
  --font-sans: 'Inter New', sans-serif;
}
```

### Ajustar animaciones

En `styles.css`, busca las animaciones y modifica:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);  /* Cambia la distancia */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 📞 SOPORTE

Si tienes problemas:

1. **Las imágenes no cargan:** Verifica que las rutas en los JSON sean correctas
2. **El sitio no se ve bien en móvil:** Asegúrate de tener el viewport meta tag correcto
3. **Los JSON no se cargan:** Verifica que estén en la carpeta `assets/data/`
4. **GitHub Pages no funciona:** Asegúrate de que el repositorio sea público

---

## 📄 LICENCIA

Este proyecto es de uso personal. Úsalo libremente para celebrar la graduación de tu hijo/a.

---

**Hecho con ❤️ por Papá**
