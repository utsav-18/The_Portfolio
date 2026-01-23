// CERTIFICATE CARD 3D TILT
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        card.style.transform = `
            rotateY(${x / 15}deg)
            rotateX(${-y / 15}deg)
            translateY(-12px)
            scale(1.03)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('.cert-item').forEach(item => {
    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});