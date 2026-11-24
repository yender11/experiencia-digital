# 🎓 THE JOURNEY — Instrucciones Rápidas

## ✅ LO QUE YA ESTÁ LISTO

1. **Estructura completa** del proyecto
2. **Placeholders visuales** en todas las imágenes (SVG elegante)
3. **Acertijos GTA 6** configurados (3 acertijos + código de regalo)
4. **Diseño responsive** mobile-first
5. **Animaciones** al scroll
6. **Lightbox** para galería

---

## 📍 DÓNDE PONER TUS FOTOS

### Carpeta: `graduacion/assets/images/`

| Carpeta | Qué poner | Tamaño sugerido |
|---------|-----------|-----------------|
| `hero/` | 1 foto de portada | 1920x1080px |
| `timeline/` | 5 fotos (una por hito) | 800x600px |
| `gallery/` | 12 fotos variadas | Cualquiera |
| `carousel/` | **8 fotos para el carrusel** | 1000x600px |
| `moments/` | 3 fotos destacadas | 1600x900px |
| `present/` | 1 foto de graduación | 1920x1080px |
| `letter/` | 1 foto papá e hijo | 800x600px |
| `closing/` | 1 foto final | 1920x1080px |

**Nombres de archivo sugeridos:**

```
hero/portada.jpg
timeline/temprano.jpg
timeline/crecimiento.jpg
timeline/adolescencia.jpg
timeline/septimo.jpg
timeline/octavo.jpg
gallery/foto1.jpg
gallery/foto2.jpg
... (hasta foto12)
carousel/foto1.jpg
carousel/foto2.jpg
... (hasta foto8)
moments/momento1.jpg
moments/momento2.jpg
moments/momento3.jpg
present/graduacion.jpg
letter/papa-hijo.jpg
closing/futuro.jpg
```

---

## ✏️ EDITAR TEXTOS (5 MINUTOS)

### 1. Timeline (`assets/data/timeline.json`)

Abre el archivo y edita:

```json
"milestones": [
  {
    "period": "2017 - 2018",  ← Los años
    "label": "Los primeros años",  ← Título corto
    "title": "Todo comenzó aquí",  ← Título emocional
    "description": "Tu texto aquí...",  ← Descripción
    "image": "assets/images/timeline/temprano.jpg",  ← Tu foto
    "highlights": ["Recuerdo 1", "Recuerdo 2"]  ← Recuerdos
  }
]
```

### 2. Galería (`assets/data/gallery.json`)

```json
"photos": [
  {
    "src": "assets/images/gallery/foto1.jpg",
    "alt": "Descripción de la foto",
    "category": "amigos",  ← amigos, companeros, profesores, etc.
    "caption": "Texto al pasar el mouse"
  }
]
```

### 3. Carta (`assets/data/letter.json`)

```json
{
  "content": "Tu carta completa aquí...\n\nUsa \\n\\n para párrafos nuevos"
}
```

### 4. Regalo GTA 6 (`assets/data/gift.json`)

```json
{
  "code": "TU-CÓDIGO-AQUÍ",  ← El código real de GTA 6
  "riddles": [
    {
      "question": "Tu acertijo aquí",
      "answer": ["respuesta1", "respuesta2"],  ← Múltiples respuestas válidas
      "hint": "Pista opcional"
    }
  ]
}
```

---

## 🚀 PUBLICAR (10 MINUTOS)

### Opción Rápida: Netlify Drop

1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `graduacion` completa
3. ¡Listo! Te da una URL tipo: `https://algo-aleatorio.netlify.app`
4. Puedes personalizar el nombre en Site Settings

### Opción Profesional: GitHub Pages

1. Crea repositorio en GitHub
2. Sube los archivos
3. Activa Pages en Settings
4. URL: `https://tu-usuario.github.io/graduacion/`

---

## 📱 CÓDIGO QR

Una vez publicado:

1. Copia la URL de tu sitio
2. Ve a https://www.qr-code-generator.com
3. Pega la URL y descarga el QR
4. Imprímelo en la tarjeta física

---

## ✅ CHECKLIST FINAL

- [ ] Puse todas las fotos en las carpetas correctas
- [ ] Edité el `timeline.json` con mis 5 hitos
- [ ] Edité la `gallery.json` con mis 12 fotos
- [ ] Escribí la carta real en `letter.json`
- [ ] Cambié el código de GTA 6 en `gift.json`
- [ ] Probé el sitio en mi teléfono
- [ ] Probé los acertijos del regalo
- [ ] Publiqué el sitio
- [ ] Generé el QR

---

## 🎨 PERSONALIZACIÓN EXTRA

### Cambiar el código del regalo

Abre `assets/data/gift.json` y edita:

```json
{
  "code": "MI-CÓDIGO-PERSONALIZADO"
}
```

### Cambiar los acertijos

En el mismo archivo, edita los `riddles`:

```json
"riddles": [
  {
    "question": "¿Tu pregunta aquí?",
    "answer": ["respuesta válida 1", "respuesta válida 2"],
    "hint": "Pista por si se atasca"
  }
]
```

### Cambiar colores

Abre `assets/css/styles.css` y busca `:root`:

```css
--color-accent: #C9B99B;  ← Cambia este color dorado
```

---

## 🆘 PROBLEMAS COMUNES

**Las fotos no se ven:**
- Verifica que los nombres en JSON coincidan con los archivos
- Los archivos deben estar en `assets/images/...`

**El sitio no funciona:**
- Abre `index.html` directamente en tu navegador
- Presiona F12 y revisa la consola por errores

**Los acertijos no funcionan:**
- Asegúrate de que `gift.js` esté en `assets/js/`
- Revisa que `gift.json` tenga el formato correcto

---

## 📞 NECESITAS AYUDA?

Revisa el `README.md` completo para instrucciones detalladas.

**¡Tu hijo va a amar esto!** 🎉
