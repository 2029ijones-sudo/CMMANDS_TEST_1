// particles.js - VsX Particle System
console.log('🧪 VsX: Particle FX loaded');

function createParticleStorm() {
    const canvas = document.getElementById('vsx-canvas');
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const particleCount = 500;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            life: 100
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            
            // Bounce off walls
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Glow effect
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // Remove dead particles
        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        // Add new particles
        while (particles.length < particleCount) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                life: 100
            });
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function createWaveEffect(frequency = 0.01, amplitude = 50) {
    const canvas = document.getElementById('vsx-canvas');
    const ctx = canvas.getContext('2d');
    
    return function animate(time) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let x = 0; x < canvas.width; x += 10) {
            const y = Math.sin(x * frequency + time * 0.001) * amplitude + canvas.height / 2;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${(x / canvas.width) * 360}, 100%, 60%)`;
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    };
}

// Make functions available to CMMANDS
window.createParticleStorm = createParticleStorm;
window.createWaveEffect = createWaveEffect;

console.log('✅ Particle FX commands registered: createParticleStorm(), createWaveEffect()');
