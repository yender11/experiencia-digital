/* ============================================
   THE JOURNEY — Timeline
   Renderizado de hitos temporales
   ============================================ */

async function initTimeline() {
  const timelineData = await loadJSON('assets/data/timeline.json');
  
  if (!timelineData) {
    console.warn('Timeline data not available');
    return;
  }
  
  const container = document.querySelector('.timeline-container');
  if (!container) return;
  
  // Actualizar header del timeline
  const header = document.querySelector('.timeline-header');
  if (header) {
    const titleEl = header.querySelector('.section-title');
    const subtitleEl = header.querySelector('.section-subtitle');
    
    if (titleEl && timelineData.title) {
      titleEl.textContent = timelineData.title;
    }
    
    if (subtitleEl && timelineData.description) {
      subtitleEl.textContent = timelineData.description;
    }
  }
  
  // Renderizar hitos
  const milestones = timelineData.milestones || [];
  
  milestones.forEach((milestone, index) => {
    const item = createTimelineItem(milestone, index);
    container.appendChild(item);
  });
}

function createTimelineItem(milestone, index) {
  const item = document.createElement('div');
  item.className = 'timeline-item';
  item.dataset.index = index;
  
  const isOdd = index % 2 === 0;
  
  item.innerHTML = `
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <p class="timeline-period">${milestone.period || ''}</p>
      <p class="timeline-label">${milestone.label || ''}</p>
      <h3 class="timeline-title">${milestone.title || ''}</h3>
      <p class="timeline-description">${milestone.description || ''}</p>
      ${renderHighlights(milestone.highlights, isOdd)}
      <div class="timeline-image-container" style="width: 100%; max-width: 320px; aspect-ratio: 4/3;">
        <img 
          src="${milestone.image || 'assets/images/placeholder.svg'}" 
          alt="${milestone.title || 'Timeline photograph'}"
          class="timeline-image"
          loading="lazy"
          onerror="this.src='assets/images/placeholder.svg';"
        >
      </div>
    </div>
  `;
  
  return item;
}

function renderHighlights(highlights, isOdd) {
  if (!highlights || highlights.length === 0) return '';
  
  const listItems = highlights
    .map(h => `<li>${h}</li>`)
    .join('');
  
  return `<ul class="timeline-highlights">${listItems}</ul>`;
}

// Hacer loadJSON disponible desde este módulo
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
