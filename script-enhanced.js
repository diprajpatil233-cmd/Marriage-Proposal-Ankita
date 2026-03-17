// ========== DOM Elements ==========
const proposalScreen = document.getElementById('proposalScreen');
const successScreen = document.getElementById('successScreen');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebrateBtn = document.getElementById('celebrateBtn');
const resetBtn = document.getElementById('resetBtn');
const confettiContainer = document.getElementById('confetti-container');
const encouragement = document.getElementById('encouragement');
const encouragementText = document.getElementById('encouragementText');
const dateStamp = document.getElementById('dateStamp');

// ========== State ==========
let noClickCount = 0;
const encouragements = [
    "Come on, you know you want to! 😊",
    "Think about it... 💭",
    "Give it another thought! 💕",
    "Don't be shy! 😉",
    "I KNOW you want to say yes! 🎉",
    "Please? 🥺",
    "You're breaking my heart here... 💔",
    "Say YES already! 💕"
];

// ========== Initialization ==========
function init() {
    noClickCount = 0;
    proposalScreen.classList.add('active');
    successScreen.classList.remove('active');
    encouragement.classList.add('hidden');
    noBtn.style.position = 'absolute';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
}

// ========== Event Listeners ==========
yesBtn.addEventListener('click', handleYes);
noBtn.addEventListener('mouseover', makeNoButtonFlee);
noBtn.addEventListener('click', handleNo);
celebrateBtn.addEventListener('click', createMassConfetti);
resetBtn.addEventListener('click', resetGame);

// ========== Yes Button Handler ==========
function handleYes() {
    // Switch screens
    proposalScreen.classList.remove('active');
    successScreen.classList.add('active');

    // Set date stamp
    setDateStamp();

    // Create celebrations
    createConfetti();
    createHearts();
}

// ========== No Button Handler ==========
function handleNo(e) {
    e.preventDefault();
    noClickCount++;

    // Show encouragement message
    if (noClickCount <= encouragements.length) {
        showEncouragement(encouragements[noClickCount - 1]);
    }

    // Make button flee to random position
    fleeToRandomPosition();
}

// ========== Make No Button Flee ==========
function makeNoButtonFlee() {
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function fleeToRandomPosition() {
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// ========== Show Encouragement ==========
function showEncouragement(message) {
    encouragementText.textContent = message;
    encouragement.classList.remove('hidden');

    setTimeout(() => {
        encouragement.classList.add('hidden');
    }, 2500);
}

// ========== Create Confetti ==========
function createConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff8c42'];
    const confettiPieces = 50;

    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';

        const duration = 2 + Math.random() * 1.5;
        confetti.style.animation = `confettiFall ${duration}s ease-in forwards`;

        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// ========== Create Mass Confetti (Celebrate Button) ==========
function createMassConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff8c42', '#ff69b4', '#00bfff'];
    const confettiPieces = 100;

    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        confetti.style.width = (5 + Math.random() * 10) + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;

        const duration = 3 + Math.random() * 2;
        confetti.style.animation = `confettiSpin ${duration}s ease-out forwards`;

        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), duration * 1000);
    }

    // Add haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
    }
}

// ========== Create Hearts ==========
function createHearts() {
    const heartEmojis = ['💕', '❤️', '💗', '💖', '💝'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '5';
            
            const duration = 3 + Math.random();
            heart.style.animation = `float-up ${duration}s ease-out forwards`;

            confettiContainer.appendChild(heart);

            setTimeout(() => heart.remove(), duration * 1000);
        }, i * 100);
    }
}

// ========== Set Date Stamp ==========
function setDateStamp() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    };
    const dateStr = now.toLocaleDateString('en-US', options);
    dateStamp.textContent = `Proposed on: ${dateStr}`;
}

// ========== Reset Game ==========
function resetGame() {
    // Clear all animations
    document.querySelectorAll('.confetti').forEach(el => el.remove());
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        if (el.style.animation && el.style.animation.includes('float-up')) {
            el.remove();
        }
    });

    // Reset state
    init();
}

// ========== Additional Animation for Success Screen ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add hearts following cursor on success screen
    successScreen.addEventListener('mousemove', (e) => {
        if (!successScreen.classList.contains('active')) return;

        // Randomly create hearts that follow cursor
        if (Math.random() < 0.15) {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = '24px';
            heart.style.pointerEvents = 'none';
            heart.style.opacity = '0.8';
            heart.style.animation = 'fadeInUp 0.5s ease-out forwards';
            heart.style.zIndex = '8';

            confettiContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 500);
        }
    });

    // Initialize
    init();
});

// ========== Add float-up animation dynamically ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) scale(0.5);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(5px);
        }
        to {
            opacity: 0.8;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========== Mobile Touch Support ==========
document.addEventListener('touchmove', (e) => {
    if (e.target === noBtn) {
        e.preventDefault();
    }
}, { passive: false });