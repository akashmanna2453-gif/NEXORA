document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const revealItems = document.querySelectorAll('.reveal');
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const heroCanvas = document.getElementById('heroCanvas');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinkItems.forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    navLinkItems.forEach((link) => {
        link.addEventListener('click', () => {
            navLinkItems.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18
    });

    revealItems.forEach((item) => revealObserver.observe(item));

    if (form && formStatus) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (!name || !email || !message) {
                formStatus.textContent = 'Please complete all required fields before sending.';
                formStatus.style.color = '#ff6b8a';
                return;
            }

            const nameValue = name.value.trim();
            const emailValue = email.value.trim();
            const messageValue = message.value.trim();

            if (!nameValue || !emailValue || !messageValue) {
                formStatus.textContent = 'Please complete all required fields before sending.';
                formStatus.style.color = '#ff6b8a';
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailValue)) {
                formStatus.textContent = 'Enter a valid email address to continue.';
                formStatus.style.color = '#ff6b8a';
                return;
            }

            formStatus.textContent = 'Message sent successfully. We will follow up soon.';
            formStatus.style.color = '#2fe8d0';
            form.reset();
        });
    }

    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            const rect = heroCanvas.getBoundingClientRect();
            const ratio = window.devicePixelRatio || 1;
            heroCanvas.width = rect.width * ratio;
            heroCanvas.height = rect.height * ratio;
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            createParticles();
        };

        const createParticles = () => {
            const rect = heroCanvas.getBoundingClientRect();
            const count = Math.min(80, Math.max(35, Math.floor((rect.width * rect.height) / 14)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                radius: Math.random() * 2.2 + 1,
                speedX: (Math.random() - 0.5) * 0.7,
                speedY: (Math.random() - 0.5) * 0.7,
                alpha: Math.random() * 0.7 + 0.2
            }));
        };

        const drawParticles = () => {
            const rect = heroCanvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0 || particle.x > rect.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > rect.height) particle.speedY *= -1;

                ctx.beginPath();
                ctx.fillStyle = `rgba(80, 227, 255, ${particle.alpha})`;
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.beginPath();
            const gradient = ctx.createRadialGradient(
                rect.width * 0.5,
                rect.height * 0.38,
                10,
                rect.width * 0.5,
                rect.height * 0.38,
                rect.width * 0.52
            );
            gradient.addColorStop(0, 'rgba(80, 227, 255, 0.22)');
            gradient.addColorStop(1, 'rgba(80, 227, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, rect.width, rect.height);

            requestAnimationFrame(drawParticles);
        };

        resizeCanvas();
        requestAnimationFrame(drawParticles);
        window.addEventListener('resize', resizeCanvas);
    }
});
