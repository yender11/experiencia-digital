/* ============================================
   THE JOURNEY — Galería
   Renderizado y filtros de galería
   ============================================ */

let currentPhotoIndex = 0;
let photos = [];

async function initGallery() {
  const galleryData = await loadJSON('assets/data/gallery.json');
  
  if (!galleryData) {
    console.warn('Gallery data not available');
    return;
  }
  
  // Actualizar header de la galería
  const header = document.querySelector('.gallery-header');
  if (header) {
    const titleEl = header.querySelector('.section-title');
    const subtitleEl = header.querySelector('.section-subtitle');
    
    if (titleEl && galleryData.title) {
      titleEl.textContent = galleryData.title;
    }
    
    if (subtitleEl && galleryData.description) {
      subtitleEl.textContent = galleryData.description;
    }
  }
  
  // Renderizar grid de fotos
  const grid = document.querySelector('.gallery-grid');
  if (grid && galleryData.photos) {
    photos = galleryData.photos;
    grid.innerHTML = '';
    
    photos.forEach((photo, index) => {
      const item = createGalleryItem(photo, index);
      grid.appendChild(item);
    });
  }
  
  // Renderizar momentos especiales
  const momentsGrid = document.querySelector('.moments-grid');
  if (momentsGrid && galleryData.moments) {
    galleryData.moments.forEach((moment, index) => {
      const item = createMomentItem(moment, index);
      momentsGrid.appendChild(item);
    });
  }
}

function createGalleryItem(photo, index) {
  const item = document.createElement('div');
  item.className = `gallery-item aspect-${photo.aspectRatio?.replace(':', '-') || '4-3'}`;
  item.dataset.index = index;
  item.dataset.src = photo.src;
  item.dataset.alt = photo.alt || '';
  item.dataset.caption = photo.caption || '';
  
  item.innerHTML = `
    <img 
      src="${photo.src || 'assets/images/placeholder.svg'}" 
      alt="${photo.alt || 'Gallery photograph'}"
      loading="lazy"
      onerror="this.src='assets/images/placeholder.svg';"
    >
    <div class="gallery-item-overlay">
      <p class="gallery-item-category">${getCategoryLabel(photo.category) || ''}</p>
      <p class="gallery-item-caption">${photo.caption || ''}</p>
    </div>
  `;
  
  item.addEventListener('click', () => openLightbox(index));
  
  return item;
}

function createMomentItem(moment, index) {
  const item = document.createElement('div');
  item.className = 'moment-item';
  item.dataset.index = index;
  
  item.innerHTML = `
    <div style="width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: 4px;">
      <img 
        src="${moment.image || 'assets/images/placeholder.svg'}" 
        alt="${moment.title || 'Special moment'}"
        class="moment-image"
        loading="lazy"
        onerror="this.src='assets/images/placeholder.svg';"
      >
    </div>
    <h3 class="moment-title">${moment.title || ''}</h3>
    <p class="moment-description">${moment.description || ''}</p>
  `;
  
  return item;
}

function getCategoryLabel(categoryId) {
  const categories = {
    'amigos': 'Amigos',
    'companeros': 'Compañeros',
    'profesores': 'Profesores',
    'paseos': 'Paseos',
    'actividades': 'Actividades',
    'celebraciones': 'Celebraciones',
    'divertidos': 'Momentos divertidos',
    'importantes': 'Momentos importantes'
  };
  
  return categories[categoryId] || categoryId;
}

// Hacer loadJSON disponible
async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
    return null;
  }
}

/* ============================================
   LIGHTBOX
   ============================================ */

function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  
  // Botón de cierre
  const closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  
  // Navegación
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));
  
  // Cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });
  
  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox || photos.length === 0) return;
  
  currentPhotoIndex = index;
  updateLightboxContent();
  
  lightbox.classList.add('active');
  preventBodyScroll(true);
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  
  lightbox.classList.remove('active');
  preventBodyScroll(false);
}

function navigateLightbox(direction) {
  currentPhotoIndex += direction;
  
  if (currentPhotoIndex < 0) {
    currentPhotoIndex = photos.length - 1;
  } else if (currentPhotoIndex >= photos.length) {
    currentPhotoIndex = 0;
  }
  
  updateLightboxContent();
}

function updateLightboxContent() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  
  const photo = photos[currentPhotoIndex];
  const image = lightbox.querySelector('.lightbox-image');
  const caption = lightbox.querySelector('.lightbox-caption');
  const counter = lightbox.querySelector('.lightbox-counter');
  
  if (image) {
    image.src = photo.src || '';
    image.alt = photo.alt || 'Gallery photograph';
  }
  
  if (caption) {
    caption.textContent = photo.caption || '';
  }
  
  if (counter) {
    counter.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
  }
}

// Hacer preventBodyScroll disponible desde app.js
function preventBodyScroll(prevent) {
  if (prevent) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}
