/* ================= ROADMAP DATA ================= */

const roadmapSteps = [
  {
    icon: "📞",
    title: "Virtual Meeting",
    desc: "We understand your business, audience, and goals.",
    tag: "Foundation"
  },
  {
    icon: "📋",
    title: "We Share a Custom Plan",
    desc: "A clear roadmap tailored for growth.",
    tag: "Blueprint"
  },
  {
    icon: "🎨",
    title: "Execution Begins",
    desc: "Visuals and UX crafted for conversion.",
    tag: "Creative"
  },
  {
    icon: "⚙️",
    title: "Development & Setup",
    desc: "Clean, scalable, high-performance builds.",
    tag: "Build"
  },
  {
    icon: "🚀",
    title: "Launch & Optimization",
    desc: "Launch, monitor, improve, and scale.",
    tag: "Growth"
  }
];

/* ================= BUILD ROADMAP ================= */

const roadmap = document.getElementById("roadmap");

roadmapSteps.forEach((step, i) => {
  const stepEl = document.createElement("div");
  stepEl.className = "step-container";

  stepEl.innerHTML = `
    <div class="step-number-badge">
      <div class="location-pin">
        <span class="step-number-text">${i + 1}</span>
      </div>
    </div>

    <div class="step-card">
      <div class="step-icon">${step.icon}</div>
      <h3 class="step-title">${step.title}</h3>
      <p class="step-description">${step.desc}</p>
      <span class="step-tag">${step.tag}</span>
    </div>

    ${
      i < roadmapSteps.length - 1
        ? `<div class="connector">
            <svg viewBox="0 0 160 100">
              <path class="connector-path"
                d="${
                  i % 2 === 0
                    ? 'M140 0 V60 H280'
                    : 'M140 0 V60 H0'
                }"
              />
            </svg>
          </div>`
        : ""
    }
  `;

  roadmap.appendChild(stepEl);
});

/* ================= INTERSECTION OBSERVER ================= */

const roadmapObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target.querySelector(".step-card");
      const pin = entry.target.querySelector(".step-number-badge");
      const connector = entry.target.querySelector(".connector-path");

      // Staggered reveal
      pin?.classList.add("visible");

      setTimeout(() => {
        card?.classList.add("visible");
      }, 200);

      setTimeout(() => {
        connector?.classList.add("animate");
      }, 450);

      roadmapObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.35
  }
);

/* ================= START OBSERVING ================= */

document.querySelectorAll(".step-container").forEach(step => {
  roadmapObserver.observe(step);
});

/* ================= OPTIONAL: CONNECTOR REDRAW ================= */
/* (only needed if you use dynamic SVG connectors elsewhere) */

function drawRoadmapConnectors() {
  const svg = document.getElementById("roadmap-svg");
  if (!svg) return;

  svg.innerHTML = "";

  const steps = document.querySelectorAll(".step-container");

  steps.forEach(step => {
    const pin = step.querySelector(".step-number-badge");
    const card = step.querySelector(".step-card");

    if (!pin || !card) return;

    const pinRect = pin.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();

    const startX = pinRect.left + pinRect.width / 2 - svgRect.left;
    const startY = pinRect.top + pinRect.height / 2 - svgRect.top;

    const endX =
      cardRect.left > pinRect.left
        ? cardRect.left - svgRect.left
        : cardRect.right - svgRect.left;

    const endY = cardRect.top + cardRect.height / 2 - svgRect.top;

    const midX = startX + (endX - startX) * 0.6;

    const path = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    path.setAttribute(
      "d",
      `M ${startX} ${startY}
       L ${midX} ${startY}
       L ${midX} ${endY}
       L ${endX} ${endY}`
    );

    path.setAttribute("class", "connector-path animate");
    svg.appendChild(path);
  });
}

window.addEventListener("load", drawRoadmapConnectors);
window.addEventListener("resize", drawRoadmapConnectors);
