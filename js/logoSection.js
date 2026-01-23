/* ===============================
   LOGO TRAIN – SEAMLESS LOOP
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const logoTrack = document.getElementById("logoTrainTrack");

  if (!logoTrack) return;

  // Prevent double duplication
  if (logoTrack.dataset.cloned === "true") return;

  const originalCells = Array.from(logoTrack.children);

  // Clone ONLY the original set once
  originalCells.forEach(cell => {
    const clone = cell.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    logoTrack.appendChild(clone);
  });

  // Mark as cloned to avoid re-run
  logoTrack.dataset.cloned = "true";

  // GPU hint for smooth animation
  logoTrack.style.willChange = "transform";
  logoTrack.style.transform = "translateZ(0)";
});
