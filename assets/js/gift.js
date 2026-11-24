/* ============================================
   THE JOURNEY — Juego de Acertijos (GTA 6)
   Sistema de regalos con acertijos
   ============================================ */

// Configuración de acertijos
const riddles = [
  {
    id: 1,
    question: "Soy el protagonista de tu historia escolar. Fui 8 años contigo y ahora termino. ¿Qué soy?",
    answer: ["colegio", "el colegio", "school", "mi colegio"],
    hint: "Piensa en el lugar donde pasaste 8 años..."
  },
  {
    id: 2,
    question: "Tengo ciudades pero no casas, tengo montañas pero no árboles, tengo agua pero no peces. ¿Qué soy?",
    answer: ["mapa", "un mapa", "maps"],
    hint: "En los videojuegos me usas para navegar..."
  },
  {
    id: 3,
    question: "Cuanto más me compartes, más feliz te hago. Soy el sentimiento de lograr algo importante. ¿Qué soy?",
    answer: ["orgullo", "el orgullo", "pride"],
    hint: "Es lo que papá siente por ti hoy..."
  }
];

// Estado del juego
let currentRiddleIndex = 0;
let attempts = 0;
let completedRiddles = [];

// Elementos del DOM
let riddleContainer, riddleNumber, riddleText, riddleInput, riddleButton, riddleFeedback, riddleHint;
let riddleProgress, giftReveal, giftCode;

async function initGift() {
  // Cargar configuración del regalo desde JSON si existe
  const giftData = await loadJSON('assets/data/gift.json');
  
  if (giftData && giftData.riddles) {
    // Usar acertijos personalizados si existen
    riddles.length = 0;
    riddles.push(...giftData.riddles);
  }
  
  if (giftData && giftData.code) {
    // Actualizar código del regalo
    const codeElement = document.getElementById('gift-code');
    if (codeElement) {
      codeElement.textContent = giftData.code;
    }
  }
  
  // Inicializar elementos del DOM
  riddleContainer = document.getElementById('riddle-container');
  riddleNumber = document.getElementById('riddle-number');
  riddleText = document.getElementById('riddle-text');
  riddleInput = document.getElementById('riddle-input');
  riddleButton = document.getElementById('riddle-button');
  riddleFeedback = document.getElementById('riddle-feedback');
  riddleHint = document.getElementById('riddle-hint');
  riddleProgress = document.getElementById('riddle-progress');
  giftReveal = document.getElementById('gift-reveal');
  giftCode = document.getElementById('gift-code');
  
  if (!riddleContainer || !riddleInput || !riddleButton) return;
  
  // Cargar primer acertijo
  loadRiddle(currentRiddleIndex);
  
  // Event listeners
  riddleButton.addEventListener('click', checkAnswer);
  riddleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
  });
  
  // Mostrar pista después de 3 intentos fallidos
  setInterval(() => {
    if (attempts >= 3 && !riddleHint.classList.contains('visible')) {
      riddleHint.classList.add('visible');
    }
  }, 1000);
  
  // Observer para hacer focus solo cuando el usuario ve la sección
  const giftObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && riddleInput && !riddleInput.disabled) {
        setTimeout(() => riddleInput.focus(), 500);
      }
    });
  }, { threshold: 0.3 });
  
  if (riddleContainer) {
    giftObserver.observe(riddleContainer);
  }
}

function loadRiddle(index) {
  if (index >= riddles.length) {
    showGift();
    return;
  }
  
  const riddle = riddles[index];
  
  riddleNumber.textContent = `Acertijo ${index + 1} de ${riddles.length}`;
  riddleText.textContent = riddle.question;
  riddleInput.value = '';
  riddleFeedback.textContent = '';
  riddleFeedback.className = 'riddle-feedback';
  riddleHint.textContent = riddle.hint;
  riddleHint.classList.remove('visible');
  riddleInput.disabled = false;
  riddleButton.disabled = false;
  
  // Solo hacer focus si el usuario ya está viendo la sección
  const isSectionVisible = riddleContainer.getBoundingClientRect().top < window.innerHeight;
  if (isSectionVisible) {
    setTimeout(() => riddleInput.focus(), 300);
  }
  
  attempts = 0;
  updateProgress();
}

function checkAnswer() {
  const userAnswer = riddleInput.value.trim().toLowerCase();
  
  if (!userAnswer) {
    riddleFeedback.textContent = 'Escribe una respuesta';
    riddleFeedback.className = 'riddle-feedback error';
    return;
  }
  
  const currentRiddle = riddles[currentRiddleIndex];
  const isCorrect = currentRiddle.answer.some(answer => 
    userAnswer.includes(answer) || answer.includes(userAnswer)
  );
  
  if (isCorrect) {
    riddleFeedback.textContent = '¡Correcto! 🎉';
    riddleFeedback.className = 'riddle-feedback success';
    completedRiddles.push(currentRiddleIndex);
    
    // Esperar un momento y pasar al siguiente
    setTimeout(() => {
      currentRiddleIndex++;
      loadRiddle(currentRiddleIndex);
    }, 1000);
  } else {
    attempts++;
    riddleFeedback.textContent = 'Inténtalo de nuevo';
    riddleFeedback.className = 'riddle-feedback error';
    riddleInput.value = '';
    
    // Solo hacer focus si la sección es visible
    const isSectionVisible = riddleContainer.getBoundingClientRect().top < window.innerHeight;
    if (isSectionVisible) {
      riddleInput.focus();
    }
    
    // Mostrar pista después de 3 intentos
    if (attempts >= 3) {
      riddleHint.classList.add('visible');
    }
  }
}

function updateProgress() {
  if (!riddleProgress) return;
  
  const dots = riddleProgress.querySelectorAll('.riddle-progress-dot');
  
  dots.forEach((dot, index) => {
    dot.classList.remove('current', 'completed');
    
    if (index < currentRiddleIndex) {
      dot.classList.add('completed');
    } else if (index === currentRiddleIndex) {
      dot.classList.add('current');
    }
  });
}

function showGift() {
  if (!riddleContainer || !giftReveal) return;
  
  riddleContainer.style.display = 'none';
  riddleProgress.style.display = 'none';
  giftReveal.classList.add('visible');
  
  // Efecto de celebración
  createConfetti();
}

function createConfetti() {
  const colors = ['#C9B99B', '#FFFFFF', '#A5ADBA', '#FFD700'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = '1000';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    // Remover confetti después de la animación
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
  
  // Agregar keyframes para la animación de caída
  if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
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

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGift);
} else {
  initGift();
}
