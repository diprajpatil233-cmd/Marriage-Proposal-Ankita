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

const popupMessages = [
    "Oh no you don't! 😄",
    "Nice try! 😉",
    "Not happening! 💪",
    "You can't escape destiny! 🎯",
    "This button has a mind of its own! 🏃",
    "The only right answer is YES! 💕",
    "Let's be real... say YES! ✨",
    "I see what you're trying to do... 😏"
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
noBtn.addEventListener('mouseover', makeNoButtonFlee);
noBtn.addEventListener('mouseout', resetNoButtonPosition);
noBtn.addEventListener('click', showPopupMessage);

// Desktop: Mouse move to detect trying to click
document.addEventListener('mousemove', (e) => {
    if (!proposalScreen.classList.contains('active')) return;
    
    const noRect = noBtn.getBoundingClientRect();
    const distance = Math.sqrt(
        Math.pow(e.clientX - (noRect.left + noRect.width / 2), 2) +
        Math.pow(e.clientY - (noRect.top + noRect.height / 2), 2)
    );

    // If cursor is within 100px of the button, make it flee
    if (distance < 100) {
        makeNoButtonFleeFromPoint(e.clientX, e.clientY);
    }
});

// Touch support for mobile
noBtn.addEventListener('touchstart', (e) => {
    if (!proposalScreen.classList.contains('active')) return;
    
    const touch = e.touches[0];
    const noRect = noBtn.getBoundingClientRect();
    
    // Make it flee from touch
    const angle = Math.atan2(
        (noRect.top + noRect.height / 2) - touch.clientY,
        (noRect.left + noRect.width / 2) - touch.clientX
    );
    
    makeNoButtonFleeInDirection(angle);
    
    // Show popup
    setTimeout(() => showPopupMessage(), 300);
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

// ========== Make No Button Flee from Point ==========
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
    const distance = 150 + Math.random() * 50; // Random distance 150-200px
    const newX = Math.cos(angle) * distance;
    const newY = Math.sin(angle) * distance;
    
    // Make sure button stays within viewport
    const maxX = window.innerWidth - noBtn.offsetWidth - 10;
    const maxY = window.innerHeight - noBtn.offsetHeight - 10;
    
    const finalX = Math.max(10, Math.min(window.innerWidth / 2 + newX, maxX));
    const finalY = Math.max(10, Math.min(window.innerHeight / 2 + newY, maxY));
    
    noBtn.style.left = finalX + 'px';
    noBtn.style.top = finalY + 'px';
}

function makeNoButtonFlee(e) {
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
    makeNoButtonFleeFromPoint(x, y);
}

function resetNoButtonPosition() {
    // Optional: uncomment to reset position when mouse leaves
    // noBtn.style.position = 'relative';
    // noBtn.style.left = '0';
    // noBtn.style.top = '0';
}

// ========== Show Popup Message ==========
function showPopupMessage(e) {
    if (e) {
        e.preventDefault();
    }

    const randomMessage = popupMessages[Math.floor(Math.random() * popupMessages.length)];
    
    // Create a custom popup
    createCustomPopup(randomMessage);
}

function createCustomPopup(message) {
    // Check if popup already exists
    const existingPopup = document.getElementById('custom-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup container
    const popupOverlay = document.createElement('div');
    popupOverlay.id = 'custom-popup-overlay';
    popupOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;

    const popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.style.cssText = `
        background: linear-gradient(135deg, #fff5f7 0%, #ffe4e9 100%);
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        animation: popupBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 2px solid #ff1493;
    `;

    const message_text = document.createElement('p');
    message_text.textContent = message;
    message_text.style.cssText = `
        font-size: 24px;
        color: #d81b60;
        font-weight: 600;
        margin: 0 0 20px 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    const emoji = document.createElement('div');
    emoji.textContent = '😄';
    emoji.style.cssText = `
        font-size: 60px;
        margin-bottom: 15px;
        animation: bounce 0.6s ease-in-out infinite;
    `;

    const button = document.createElement('button');
    button.textContent = 'OK, I\'ll click YES! 😊';
    button.style.cssText = `
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 15px;
        transition: all 0.3s ease;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    button.onmouseover = () => {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 6px 15px rgba(76, 175, 80, 0.4)';
    };

    button.onmouseout = () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = 'none';
    };

    button.onclick = () => {
        popupOverlay.remove();
    };

    popup.appendChild(emoji);
    popup.appendChild(message_text);
    popup.appendChild(button);
    popupOverlay.appendChild(popup);
    document.body.appendChild(popupOverlay);

    // Close popup if clicking outside
    popupOverlay.onclick = (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.remove();
        }
    };

    // Auto close after 5 seconds if not clicked
    setTimeout(() => {
        if (document.getElementById('custom-popup-overlay')) {
            document.getElementById('custom-popup-overlay').remove();
        }
    }, 5000);
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

    @keyframes popupBounce {
        0% {
            opacity: 0;
            transform: scale(0.5) rotateX(-20deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotateX(0);
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
    if (e.target === noBtn) {
        e.preventDefault();
    }
}, { passive: false });
