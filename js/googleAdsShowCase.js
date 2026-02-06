const gadCards = document.querySelectorAll('.gad-card');
const gadModal = document.getElementById('gadModal');
const gadModalImg = document.getElementById('gadModalImg');
const gadClose = document.querySelector('.gad-close');

gadCards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img').src;
    gadModalImg.src = img;
    gadModal.style.display = "flex";
  });
});

gadClose.addEventListener('click', () => {
  gadModal.style.display = "none";
});

window.addEventListener('click', (e) => {
  if (e.target === gadModal) {
    gadModal.style.display = "none";
  }
});
