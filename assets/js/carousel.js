/* ============================================
   THE JOURNEY — Carrusel de Fotos
   Slider con autoplay, touch y teclado
   ============================================ */

let currentSlide = 0;
const totalSlides = 8;
let autoplayInterval;
const AUTOPLAY_DELAY = 5000; // 5 segundos
let autoplayProgress = 0;
let progressInterval;
let isPaused = false;
let touchStartX = 0;
let touchEndX = 0;

// Elementos del DOM
let track, prevBtn, nextBtn, indicators, counter, progressBar;
let indicatorButtons = [];

function initCarousel() {
  // Obtener elementos
  track = document.getElementById('carousel-track');
  prevBtn = document.getElementById('carousel-prev');
  nextBtn = document.getElementById('carousel-next');
  indicators = document.getElementById('carousel-indicators');
  counter = document.getElementById('carousel-counter');
  progressBar = document.getElementById('carousel-progress');
  
  if (!track) return;
  
  // Obtener slides
  const slides = track.querySelectorAll('.carousel-slide');
  totalSlides = slides.length;
  
  // Crear indicadores dinámicamente
  if (indicators) {
    indicators.innerHTML = '';
    indicatorButtons = [];
    
    for (let i = 0; i < totalSlides; i++) {
      const button = document.createElement('button');
      button.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
      button.setAttribute('aria-label', `Go to slide ${i + 1}`);
      button.addEventListener('click', () => goToSlide(i));
      indicators.appendChild(button);
      indicatorButtons.push(button);
    }
  }
  
  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Teclado
  document.addEventListener('keydown', handleKeyboard);
  
  // Touch/Swipe
  track.addEventListener('touchstart', handleTouchStart, { passive: true });
  track.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Mouse drag
  track.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
  // Pausar autoplay al interactuar
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', pauseAutoplay);
    carouselContainer.addEventListener('mouseleave', resumeAutoplay);
  }
  
  // Iniciar autoplay
  startAutoplay();
  
  // Actualizar estado inicial
  updateCarousel();
}

function handleKeyboard(e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
}

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
  pauseAutoplay();
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  resumeAutoplay();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide(); // Swipe izquierda
    } else {
      prevSlide(); // Swipe derecha
    }
  }
}

let isDragging = false;
let startX = 0;
let currentX = 0;

function handleMouseDown(e) {
  isDragging = true;
  startX = e.clientX;
  currentX = startX;
  track.style.transition = 'none';
  pauseAutoplay();
}

function handleMouseMove(e) {
  if (!isDragging) return;
  
  currentX = e.clientX;
  const diff = currentX - startX;
  const slideWidth = track.offsetWidth;
  const translateX = -(currentSlide * slideWidth) + diff;
  
  track.style.transform = `translateX(${translateX}px)`;
}

function handleMouseUp() {
  if (!isDragging) return;
  
  isDragging = false;
  track.style.transition = 'transform 500ms ease';
  
  const diff = currentX - startX;
  const swipeThreshold = 50;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  } else {
    updateCarousel();
  }
  
  resumeAutoplay();
}

function startAutoplay() {
  clearInterval(autoplayInterval);
  clearInterval(progressInterval);
  
  autoplayProgress = 0;
  
  autoplayInterval = setInterval(() => {
    if (!isPaused) {
      nextSlide();
    }
  }, AUTOPLAY_DELAY);
  
  // Actualizar barra de progreso
  progressInterval = setInterval(() => {
    if (!isPaused && progressBar) {
      autoplayProgress += 100 / (AUTOPLAY_DELAY / 100);
      if (autoplayProgress > 100) autoplayProgress = 0;
      progressBar.style.width = `${autoplayProgress}%`;
    }
  }, 100);
}

function pauseAutoplay() {
  isPaused = true;
  if (progressBar) {
    progressBar.style.transition = 'none';
  }
}

function resumeAutoplay() {
  isPaused = false;
  if (progressBar) {
    progressBar.style.transition = 'width 100ms linear';
  }
  startAutoplay();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
  resetAutoplayTimer();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
  resetAutoplayTimer();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoplayTimer();
}

function resetAutoplayTimer() {
  clearInterval(autoplayInterval);
  clearInterval(progressInterval);
  autoplayProgress = 0;
  startAutoplay();
}

function updateCarousel() {
  if (!track) return;
  
  const slideWidth = track.offsetWidth;
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  
  // Actualizar indicadores
  indicatorButtons.forEach((btn, index) => {
    btn.classList.toggle('active', index === currentSlide);
  });
  
  // Actualizar contador
  if (counter) {
    counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  }
  
  // Actualizar botones de navegación (opcional, para loop infinito siempre están activos)
  if (prevBtn) prevBtn.disabled = false;
  if (nextBtn) nextBtn.disabled = false;
}

// Manejar resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateCarousel();
  }, 250);
});

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}
