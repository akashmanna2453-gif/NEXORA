const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            status.textContent = 'Please complete all required fields before sending.';
            status.style.color = '#ff6b8a';
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            status.textContent = 'Enter a valid email address to continue.';
            status.style.color = '#ff6b8a';
            return;
        }
        status.textContent = 'Message sent successfully. We will follow up soon.';
        status.style.color = '#2fe8d0';
        form.reset();
    });
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
