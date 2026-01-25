/* ================= ROADMAP DATA ================= */

const roadmapSteps = [
  {
    icon: "icon-call",
    title: "Virtual Meeting",
    desc: "We understand your business, audience, and goals.",
    tag: "Foundation"
  },
  {
    icon: "icon-plan",
    title: "We Share a Custom Plan",
    desc: "A clear roadmap tailored for growth.",
    tag: "Blueprint"
  },
  {
    icon: "icon-execution",
    title: "Execution Begins",
    desc: "Campaign creatives and content production starts.",
    tag: "Creative"
  },
  {
    icon: "icon-setup",
    title: "Development & Setup",
    desc: "Ads, tracking, and automation are configured.",
    tag: "Build"
  },
  {
    icon: "icon-growth",
    title: "Launch & Optimization",
    desc: "We scale, optimize, and maximize ROI continuously.",
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
        <div class="step-icon">
          ${getRoadmapIcon(step.icon)}
        </div>

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
function getRoadmapIcon(type) {
  const icons = {
    "icon-call": `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2
        A19.8 19.8 0 0 1 3 5.18
        A2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72
        c.12.81.3 1.6.54 2.36
        a2 2 0 0 1-.45 2.11L9 10
        a16 16 0 0 0 6 6l.81-.81
        a2 2 0 0 1 2.11-.45
        c.76.24 1.55.42 2.36.54
        A2 2 0 0 1 22 16.92Z"
        stroke="currentColor" stroke-width="2"/>
      </svg>
    `,
    "icon-plan": `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="2"/>
        <path d="M8 2v4M16 2v4M8 10h8M8 14h6"
        stroke="currentColor" stroke-width="2"/>
      </svg>
    `,
    "icon-execution": `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14 3l7 7-11 11H3v-7z"
        stroke="currentColor" stroke-width="2"/>
      </svg>
    `,
    "icon-setup": `
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3"
        stroke="currentColor" stroke-width="2"/>
        <path d="M19.4 15a7.9 7.9 0 0 0 .1-6
        l2-1-2-3-2 1a8 8 0 0 0-4-2V2h-4v3
        a8 8 0 0 0-4 2l-2-1-2 3 2 1
        a7.9 7.9 0 0 0 0 6l-2 1 2 3 2-1
        a8 8 0 0 0 4 2v3h4v-3
        a8 8 0 0 0 4-2l2 1 2-3z"
        stroke="currentColor" stroke-width="2"/>
      </svg>
    `,
    "icon-growth": `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 17l6-6 4 4 7-7"
        stroke="currentColor" stroke-width="2"/>
        <path d="M14 7h7v7"
        stroke="currentColor" stroke-width="2"/>
      </svg>
    `
  };
  return icons[type] || "";
}
