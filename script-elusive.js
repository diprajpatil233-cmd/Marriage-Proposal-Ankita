// ========== DOM Elements ==========
const container = document.getElementById('container');
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
    noBtn.style.position = 'relative';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
}

// ========== Event Listeners ==========
yesBtn.addEventListener('click', handleYes);

// Make No button elusive - flee from hover
noBtn.addEventListener('mouseover', makeNoButtonFlee);

// Make No button flee from nearby mouse movement (on proposal screen)
document.addEventListener('mousemove', (e) => {
    if (!proposalScreen.classList.contains('active')) return;
    
    const noRect = noBtn.getBoundingClientRect();
    const noCenterX = noRect.left + noRect.width / 2;
    const noCenterY = noRect.top + noRect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(e.clientX - noCenterX, 2) +
        Math.pow(e.clientY - noCenterY, 2)
    );

    // If cursor gets close (within 100px), button flees
    if (distance < 100) {
        makeNoButtonFleeFromPoint(e.clientX, e.clientY);
    }
});

// Touch support - button flees from touch
noBtn.addEventListener('touchstart', (e) => {
    if (!proposalScreen.classList.contains('active')) return;
    
    const touch = e.touches[0];
    const noRect = noBtn.getBoundingClientRect();
    
    const angle = Math.atan2(
        (noRect.top + noRect.height / 2) - touch.clientY,
        (noRect.left + noRect.width / 2) - touch.clientX
    );
    
    makeNoButtonFleeInDirection(angle);
});

// Prevent default click behavior and make it flee
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    noClickCount++;

    // Show encouragement message
    if (noClickCount <= encouragements.length) {
        showEncouragement(encouragements[noClickCount - 1]);
    }

    // Make button flee
    makeNoButtonFleeRandomly();
    
    return false;
});

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

// ========== Make No Button Flee ==========
function makeNoButtonFleeFromPoint(x, y) {
    const noRect = noBtn.getBoundingClientRect();
    const noCenter = {
        x: noRect.left + noRect.width / 2,
        y: noRect.top + noRect.height / 2,
    };

    const angle = Math.atan2(noCenter.y - y, noCenter.x - x);
    makeNoButtonFleeInDirection(angle);
}

function makeNoButtonFleeInDirection(angle) {
    noBtn.style.position = 'fixed';
    const distance = 150 + Math.random() * 100; // Random distance 150-250px
    const newX = Math.cos(angle) * distance;
    const newY = Math.sin(angle) * distance;
    
    // Get button center
    const buttonCenterX = window.innerWidth / 2;
    const buttonCenterY = window.innerHeight / 2;
    
    // Calculate final position
    let finalX = buttonCenterX + newX;
    let finalY = buttonCenterY + newY;
    
    // Keep button within viewport with padding
    const padding = 10;
    finalX = Math.max(padding, Math.min(finalX, window.innerWidth - noBtn.offsetWidth - padding));
    finalY = Math.max(padding, Math.min(finalY, window.innerHeight - noBtn.offsetHeight - padding));
    
    noBtn.style.left = finalX + 'px';
    noBtn.style.top = finalY + 'px';
}

function makeNoButtonFleeRandomly() {
    noBtn.style.position = 'fixed';
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20) + 10;
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20) + 10;
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function makeNoButtonFlee(e) {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (x && y) {
        makeNoButtonFleeFromPoint(x, y);
    }
}

// ========== Show Encouragement Messages ==========
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

// ========== Create Mass Confetti ==========
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
        confetti.style.animation = `confettiFall ${duration}s ease-in forwards`;

        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), duration * 1000);
    }

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
    document.querySelectorAll('.confetti').forEach(el => el.remove());
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        if (el.style.animation && el.style.animation.includes('float-up')) {
            el.remove();
        }
    });

    init();
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add hearts following cursor on success screen
    successScreen.addEventListener('mousemove', (e) => {
        if (!successScreen.classList.contains('active')) return;

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

    init();
});

// ========== Add Animations ==========
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

    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes bounce {
        0%, 100% {
            transform: scale(1) translateY(0);
        }
        50% {
            transform: scale(1.1) translateY(-15px);
        }
    }
`;
document.head.appendChild(style);

// ========== Mobile Touch Support ==========
document.addEventListener('touchmove', (e) => {
    if (e.target === noBtn || noBtn.contains(e.target)) {
        e.preventDefault();
    }
}, { passive: false });