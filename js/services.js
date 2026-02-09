(function () {
  const serviceCards = document.querySelectorAll("[data-animate]");

  if (!serviceCards.length) return;

  const serviceObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          serviceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  serviceCards.forEach(card => serviceObserver.observe(card));
})();
