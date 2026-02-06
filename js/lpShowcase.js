// Landing Page Section Animation

const lpItems = document.querySelectorAll('.reveal-lp');

const lpObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

lpItems.forEach(item => lpObserver.observe(item));
