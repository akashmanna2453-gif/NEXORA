const canvas = document.getElementById('heroCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 65;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.8 + 1.2;
            this.speed = Math.random() * 0.55 + 0.1;
            this.alpha = Math.random() * 0.35 + 0.15;
            this.angle = Math.random() * Math.PI * 2;
            this.color = Math.random() > 0.5 ? 'rgba(80,227,255,' + this.alpha + ')' : 'rgba(217,60,255,' + this.alpha + ')';
        }
        update() {
            this.y -= this.speed;
            this.x += Math.sin(this.angle) * 0.3;
            this.angle += 0.01;
            if (this.y < -20) {
                this.reset();
                this.y = canvas.height + 20;
            }
            if (this.x > canvas.width + 20 || this.x < -20) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 12;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i += 1) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    resizeCanvas();
    createParticles();
    animate();
}
