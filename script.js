// script.js - animations supplémentaires
document.addEventListener('DOMContentLoaded', function () {

    // 1. Animation du texte (uniquement sur la page d'accueil)
    const typedTextSpan = document.getElementById('dynamic-text');
    if (typedTextSpan) {
        const phrases = [
            "2nd year in computer engineering",
            "Creative and curious"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 90;
        let erasingDelay = 45;
        let newPhraseDelay = 1600;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, newPhraseDelay);
                return;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, typingDelay);
                return;
            }

            const delay = isDeleting ? erasingDelay : typingDelay;
            setTimeout(typeEffect, delay);
        }
        typeEffect();
    }

    // 2. Mettre en surbrillance le lien actif dans la navbar
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 3. Scroll reveal : fait apparaître les éléments avec la classe .fade-in-up
    const revealElements = document.querySelectorAll('.fade-in-up');
    if (revealElements.length === 0) {
        // Si aucun élément n'a la classe, on applique à toutes les sections et cartes
        document.querySelectorAll('section, .card, .portfolio-item, .service-card, .contact-container, .about-text, .row > .col-md-6, .row > .col-md-4, .row > .col-md-8').forEach(el => {
            el.classList.add('fade-in-up');
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // 4. Animation subtile au chargement de la page (titre de section, etc.)
    setTimeout(() => {
        document.querySelectorAll('.hero, .section-title').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});