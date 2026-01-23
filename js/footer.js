// Footer year
document.getElementById("footerYear").textContent = new Date().getFullYear();

/* Footer particles */
const fCanvas = document.getElementById("footerParticles");
const fCtx = fCanvas.getContext("2d");

function resizeFooterCanvas() {
    fCanvas.width = fCanvas.offsetWidth;
    fCanvas.height = fCanvas.offsetHeight;
}
resizeFooterCanvas();
window.addEventListener("resize", resizeFooterCanvas);

const fParticles = Array.from({ length: 40 }, () => ({
    x: Math.random() * fCanvas.width,
    y: Math.random() * fCanvas.height,
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
}));

function animateFooterParticles() {
    fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);

    fParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > fCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > fCanvas.height) p.vy *= -1;

        fCtx.beginPath();
        fCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        fCtx.fillStyle = "rgba(255,140,0,0.35)";
        fCtx.fill();
    });

    requestAnimationFrame(animateFooterParticles);
}

animateFooterParticles();
