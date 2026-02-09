// SELECT ALL CARDS
const cards = document.querySelectorAll(".network-pro-card");

// ----- STAGGERED REVEAL ANIMATION -----
cards.forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(60px) scale(0.9)";
  card.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0) scale(1)";
      revealObserver.unobserve(entry.target);   // stops observing after reveal
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => revealObserver.observe(card));


// ----- PARALLAX TILT EFFECT -----
cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 18;
    const rotateY = (centerX - x) / 18;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});


// ----- CLICK FEEDBACK EFFECT -----
cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.add("active");
    setTimeout(() => card.classList.remove("active"), 400);
  });
});
