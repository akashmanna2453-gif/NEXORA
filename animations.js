const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach(elem => revealObserver.observe(elem));

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (event) => {
        event.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
    });
    button.addEventListener('mouseleave', (event) => {
        event.currentTarget.style.transform = 'translateY(0) scale(1)';
    });
});
