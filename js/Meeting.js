document.addEventListener("DOMContentLoaded", function () {

  // ===== Scroll Reveal Animation =====
  const vmItems = document.querySelectorAll('.vm-item');

  const vmObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 120);
      }
    });
  }, { threshold: 0.2 });

  vmItems.forEach(item => vmObserver.observe(item));


  // ===== Mobile Swipe Fix =====
  const vmGrid = document.querySelector(".vm-grid");

  if (vmGrid) {

    // Enable native touch scrolling
    vmGrid.style.overflowX = "auto";
    vmGrid.style.webkitOverflowScrolling = "touch";

    // Allow horizontal swipe without blocking
    vmGrid.addEventListener("touchmove", function (e) {
      e.stopPropagation();
    }, { passive: true });

  }

});
