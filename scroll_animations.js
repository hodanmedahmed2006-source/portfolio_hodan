// ========== SCROLL ANIMATIONS ==========

// Observer pour les animations au défilement
const observerOptions = {
    threshold: 0.15,  // Déclenche quand 15% de l'élément est visible
    rootMargin: "0px 0px -50px 0px"
};

// Callback pour l'observateur
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Optionnel : continuer à observer ou arrêter
            // observer.unobserve(entry.target);
        }
    });
};

// Créer l'observateur
const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

// Fonction pour ajouter les animations aux éléments
function initScrollAnimations() {
    // Sélectionner tous les éléments à animer
    const elementsToAnimate = [
        '.card',
        '.section-title',
        'section',
        'main > .row > *',
        '.hero',
        '.about-content',
        '.profile-pic',
        '.lead',
        '.btn-outline-custom',
        '.placeholder-card',
        '.portfolio-img',
        '.service-icon'
    ];
    
    // Ajouter les classes d'animation
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Éviter d'ajouter plusieurs fois la même classe
            if (!element.classList.contains('fade-in-up') && 
                !element.classList.contains('fade-in-left') &&
                !element.classList.contains('fade-in-right') &&
                !element.classList.contains('zoom-in')) {
                
                // Appliquer différentes animations selon le type d'élément
                if (element.classList.contains('card')) {
                    element.classList.add('fade-in-up');
                } else if (element.classList.contains('profile-pic')) {
                    element.classList.add('zoom-in');
                } else if (element.classList.contains('lead')) {
                    element.classList.add('fade-in-left');
                } else {
                    element.classList.add('fade-in-up');
                }
            }
            
            // Observer l'élément
            scrollObserver.observe(element);
        });
    });
    
    // Animer les éléments spécifiques avec des classes particulières
    const specialElements = document.querySelectorAll('.col-md-4, .col-md-6, .col-md-8, .col-lg-4');
    specialElements.forEach((element, index) => {
        if (index % 2 === 0) {
            element.classList.add('fade-in-left');
        } else {
            element.classList.add('fade-in-right');
        }
        scrollObserver.observe(element);
    });
}

// ========== BOUTON RETOUR EN HAUT ==========

function initScrollTopButton() {
    // Créer le bouton
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // Action au clic
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== BARRE DE PROGRESSION ==========

function initScrollProgressBar() {
    // Créer la barre de progression
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Mettre à jour la barre au défilement
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ========== EFFET PARALLAXE LÉGER ==========

function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.hero, .portfolio-img');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========== COMPTAGE DES PROJETS (effet nombre qui s'affiche) ==========

function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 30);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ========== RÉVÉLER LES ÉLÉMENTS AU SCROLL ==========

function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Écouter l'événement scroll pour révéler au fur et à mesure
window.addEventListener('scroll', revealOnScroll);

// ========== INITIALISATION ==========

// Démarrer quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initScrollTopButton();
    initScrollProgressBar();
    initParallaxEffect();
    initCounterAnimation();
    revealOnScroll(); // Vérifier les éléments déjà visibles
});

// Réinitialiser les animations quand on navigue (pour les pages SPA)
if (typeof window.history.pushState === 'function') {
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
        originalPushState.apply(this, arguments);
        setTimeout(() => {
            initScrollAnimations();
            revealOnScroll();
        }, 100);
    };
}