/* ============================================
   THE JOURNEY — Aplicación Principal
   Inicialización y utilidades
   ============================================ */

(async function init() {
  await initSite();
  await initTimeline();
  await initGallery();
  await initLetter();
  initScrollAnimations();
  initLightbox();
})();

/* ============================================
   CARGA DE DATOS
   ============================================ */
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
   INICIALIZACIÓN DEL SITIO
   ============================================ */
async function initSite() {
  const siteData = await loadJSON('assets/data/site.json');
  
  if (siteData) {
    // Actualizar meta tags
    document.title = siteData.meta?.title || 'THE JOURNEY';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && siteData.meta?.description) {
      metaDesc.setAttribute('content', siteData.meta.description);
    }
    
    // Actualizar contenido del hero
    const heroTitle = document.querySelector('.hero-title');
    const heroHighlight = document.querySelector('.hero-highlight');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroSignature = document.querySelector('.hero-signature');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroTitle && siteData.hero?.title) {
      heroTitle.textContent = siteData.hero.title;
    }
    
    if (heroHighlight && siteData.hero?.highlight) {
      heroHighlight.textContent = siteData.hero.highlight;
    }
    
    if (heroSubtitle && siteData.hero?.subtitle) {
      heroSubtitle.textContent = siteData.hero.subtitle;
    }
    
    if (heroSignature && siteData.hero?.signature) {
      heroSignature.textContent = siteData.hero.signature;
    }
    
    if (heroBg && siteData.hero?.image) {
      heroBg.src = siteData.hero.image;
      heroBg.alt = 'Photograph of the journey';
      heroBg.onerror = () => {
        if (siteData.hero?.fallbackImage) {
          heroBg.src = siteData.hero.fallbackImage;
        }
      };
    }
    
    // Actualizar sección presente
    const presentTitle = document.querySelector('.present-title');
    const presentDesc = document.querySelector('.present-description');
    const presentBg = document.querySelector('.present-bg');
    
    if (presentTitle && siteData.present?.title) {
      presentTitle.textContent = siteData.present.title;
    }
    
    if (presentDesc && siteData.present?.description) {
      presentDesc.textContent = siteData.present.description;
    }
    
    if (presentBg && siteData.present?.image) {
      presentBg.src = siteData.present.image;
      presentBg.alt = 'Graduation photograph';
      presentBg.onerror = () => {
        if (siteData.present?.fallbackImage) {
          presentBg.src = siteData.present.fallbackImage;
        }
      };
    }
    
    // Actualizar sección de cierre
    const closingTitle = document.querySelector('.closing-title');
    const closingSignature = document.querySelector('.closing-signature');
    const closingBg = document.querySelector('.closing-bg');
    
    if (closingTitle && siteData.closing?.title) {
      closingTitle.textContent = siteData.closing.title;
    }
    
    if (closingSignature && siteData.closing?.signature) {
      closingSignature.textContent = siteData.closing.signature;
    }
    
    if (closingBg && siteData.closing?.image) {
      closingBg.src = siteData.closing.image;
      closingBg.alt = 'Future photograph';
      closingBg.onerror = () => {
        if (siteData.closing?.fallbackImage) {
          closingBg.src = siteData.closing.fallbackImage;
        }
      };
    }
  }
}

/* ============================================
   ANIMACIONES AL SCROLL
   ============================================ */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Dejar de observar una vez animado
        if (!entry.target.classList.contains('timeline-line')) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);
  
  // Observar elementos animables
  const animatableElements = document.querySelectorAll(
    '.timeline-item, .present-title, .present-description, ' +
    '.moment-item, .closing-title, .closing-signature'
  );
  
  animatableElements.forEach(el => observer.observe(el));
  
  // Línea del timeline especial
  const timelineLine = document.querySelector('.timeline-line');
  if (timelineLine) {
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });
    
    lineObserver.observe(timelineLine);
  }
}

/* ============================================
   PREVENIR SCROLL DEL BODY CON LIGHTBOX ABIERTO
   ============================================ */
function preventBodyScroll(prevent) {
  if (prevent) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

/* ============================================
   UTILIDADES
   ============================================ */

// Manejo de errores de imágenes
function handleImageError(img) {
  img.style.display = 'none';
  const placeholder = img.nextElementSibling;
  if (placeholder && placeholder.classList.contains('img-placeholder')) {
    placeholder.style.display = 'flex';
  }
}

// Crear placeholder para imágenes
function createPlaceholder(text, aspectRatio = '4/3') {
  const placeholder = document.createElement('div');
  placeholder.className = 'img-placeholder';
  placeholder.style.aspectRatio = aspectRatio;
  placeholder.innerHTML = `<span>${text}</span>`;
  return placeholder;
}

// Lazy loading nativo
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
  initLazyLoading();
}

console.log('THE JOURNEY — Experience loaded successfully');

/* ============================================
   CARTA DE PAPÁ
   ============================================ */
async function initLetter() {
  const letterData = await loadJSON('assets/data/letter.json');
  
  if (!letterData) return;
  
  const letterContent = document.getElementById('letter-content');
  const letterTitle = document.querySelector('.letter-title');
  
  if (letterTitle && letterData.title) {
    letterTitle.textContent = letterData.title;
  }
  
  if (letterContent && letterData.content) {
    letterContent.textContent = letterData.content;
  }
}
