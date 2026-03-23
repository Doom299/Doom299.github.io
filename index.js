// Typewriter Effect for Hero
const typeTarget = document.querySelector('.hero-content h1 .accent');
if (typeTarget) {
    const roles = ['Masterpieces', 'Experiences', 'Solutions', 'Realities'];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentRole = roles[roleIdx];
        if (isDeleting) {
            typeTarget.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 50;
        } else {
            typeTarget.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Wait at the end
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    };
    type();
}

// Staggered Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Check if it's a grid item for staggering
            const parent = entry.target.parentElement;
            if (parent.classList.contains('skills-grid') || parent.classList.contains('project-grid') || parent.classList.contains('timeline')) {
                const index = Array.from(parent.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Scroll Spy for Navbar
const sections = document.querySelectorAll('section');
// navLinks already declared above

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle (Basic logic)
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
    });
}
// --- Tech Stack Centered Highlight ---
function updateActiveTechCard() {
    const marqueeRows = document.querySelectorAll('.marquee-row');
    const centerX = window.innerWidth / 2;

    marqueeRows.forEach(row => {
        const cards = row.querySelectorAll('.tech-card');
        let closestCard = null;
        let minDistance = Infinity;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - cardCenterX);

            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
            card.classList.remove('active');
        });

        if (closestCard) {
            closestCard.classList.add('active');
        }
    });

    requestAnimationFrame(updateActiveTechCard);
}

// Initialize on load
window.addEventListener('load', () => {
    updateActiveTechCard();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Terminal Typing Effect
const terminalCode = document.querySelector('.terminal-body code');
if (terminalCode) {
    const codeLines = [
        '<span class="const">const</span> <span class="var">developer</span> = {',
        '&nbsp;&nbsp;name: <span class="string">\'Himasara Liyanage\'</span>,',
        '&nbsp;&nbsp;role: <span class="string">\'Full Stack Developer\'</span>,',
        '&nbsp;&nbsp;skills: [<span class="string">\'React\'</span>, <span class="string">\'Next.js\'</span>, <span class="string">\'Node.js\'</span>],',
        '&nbsp;&nbsp;drivenBy: <span class="string">\'Passion for Excellence\'</span>',
        '};'
    ];
    
    terminalCode.innerHTML = '';
    let lineIdx = 0;
    
    const typeLine = () => {
        if (lineIdx < codeLines.length) {
            const line = document.createElement('div');
            line.innerHTML = codeLines[lineIdx];
            terminalCode.appendChild(line);
            lineIdx++;
            setTimeout(typeLine, 400);
        }
    };

    const heroSection = document.getElementById('hero');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeLine();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(heroSection);
}
// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo template.');
        contactForm.reset();
    });
}
