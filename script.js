// Кастомный курсор
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Эффект печатающегося текста
const typingText = document.querySelector('.typing-text');
const phrases = [
    'знаю, что вы думаете...',
    'между строк кода...',
    'в параллельных реальностях...',
    'там, где никто не ищет...'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 1000);

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Анимация при скролле (AOS)
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Анимация счетчиков
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const target = counter.getAttribute('data-count');
        
        if (target === '???' || target === '∞' || target === '?') {
            let count = 0;
            const interval = setInterval(() => {
                count++;
                if (count > 20) {
                    counter.textContent = target;
                    clearInterval(interval);
                } else {
                    counter.textContent = Math.floor(Math.random() * 999);
                }
            }, 100);
        }
    });
};

// Наблюдаем за статистикой
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const stats = document.querySelector('.stats');
if (stats) {
    statsObserver.observe(stats);
}

// Matrix эффект
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const charArray = chars.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 5, 8, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Изменение размера canvas при ресайзе окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Параллакс эффект для героя
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const glitch = document.querySelector('.glitch-container');
    if (glitch) {
        glitch.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Hover эффект для карточек навыков
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animationDelay = (index * 100) + 'ms';
    
    card.addEventListener('mouseenter', () => {
        skillCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.5';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        skillCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// Эффект глитча при наведении на навигацию
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        let iterations = 0;
        const originalText = this.textContent;
        
        const interval = setInterval(() => {
            this.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    });
});

// Случайные мигания на странице
setInterval(() => {
    const elements = document.querySelectorAll('.skill-icon, .hexagon, .stat-value');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    if (randomElement) {
        randomElement.style.opacity = '0.3';
        setTimeout(() => {
            randomElement.style.opacity = '1';
        }, 100);
    }
}, 3000);

// Скрыть/показать навигацию при скролле
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll) {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

nav.style.transition = 'transform 0.3s ease';

// Пасхалка - Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateSecretMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateSecretMode() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// Система частиц
const particlesCanvas = document.getElementById('particles');
const particlesCtx = particlesCanvas.getContext('2d');

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.y > particlesCanvas.height) this.y = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
    }
    
    draw() {
        particlesCtx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        particlesCtx.beginPath();
        particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particlesCtx.fill();
    }
}

const particlesArray = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
}

function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Соединение близких частиц
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particlesCtx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance / 100)})`;
                particlesCtx.lineWidth = 0.5;
                particlesCtx.beginPath();
                particlesCtx.moveTo(particlesArray[i].x, particlesArray[i].y);
                particlesCtx.lineTo(particlesArray[j].x, particlesArray[j].y);
                particlesCtx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Изменение размера для частиц
window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// 3D эффект при наведении на карточки проектов
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Анимация появления элементов таймлайна с задержкой
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// Интерактивные звуковые эффекты при наведении (визуальная обратная связь)
const interactiveElements = document.querySelectorAll('.nav-link, .contact-btn, .skill-card, .project-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // Создаем рябь при наведении
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '5px';
        ripple.style.height = '5px';
        ripple.style.background = 'var(--primary)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-effect 0.6s ease-out';
        
        const rect = element.getBoundingClientRect();
        ripple.style.left = rect.left + rect.width / 2 + 'px';
        ripple.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Добавляем CSS для эффекта ряби
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
            transform: translate(-50px, -50px);
        }
    }
`;
document.head.appendChild(rippleStyle);

// Анимация для карточек философии
const philosophyCards = document.querySelectorAll('.philosophy-card');
philosophyCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        philosophyCards.forEach((otherCard, otherIndex) => {
            if (otherIndex !== index) {
                otherCard.style.filter = 'blur(2px)';
                otherCard.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        philosophyCards.forEach(otherCard => {
            otherCard.style.filter = '';
            otherCard.style.opacity = '';
        });
    });
});

// Случайное изменение эмодзи настроения в мыслях
const thoughtMoods = ['🤔', '💭', '✨', '🌙', '⚡', '🎯', '🔮', '🌊', '🎨', '🚀'];
const moodElements = document.querySelectorAll('.thought-mood');

setInterval(() => {
    moodElements.forEach(element => {
        if (Math.random() > 0.7) {
            const currentEmoji = element.textContent;
            let newEmoji = thoughtMoods[Math.floor(Math.random() * thoughtMoods.length)];
            while (newEmoji === currentEmoji) {
                newEmoji = thoughtMoods[Math.floor(Math.random() * thoughtMoods.length)];
            }
            element.style.opacity = '0';
            setTimeout(() => {
                element.textContent = newEmoji;
                element.style.opacity = '0.7';
            }, 300);
        }
    });
}, 5000);

// Динамическое обновление времени в мыслях
const thoughtDates = document.querySelectorAll('.thought-date');
thoughtDates.forEach(dateElement => {
    const originalDate = dateElement.textContent;
    dateElement.addEventListener('mouseenter', function() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        this.textContent = `Сейчас • ${hours}:${minutes}`;
    });
    dateElement.addEventListener('mouseleave', function() {
        this.textContent = originalDate;
    });
});