const spreads = [
  [
    {
      chapter: "Chapter 01",
      title: "WhatsApp Marketing & CRM",
      desc: "Turn conversations into predictable revenue.",
      points: [
        "Automated follow-ups & broadcasts",
        "CRM pipelines & lead tracking",
        "Retention & repeat revenue flows"
      ],
      intent: "Retention • Automation"
    },
    {
      chapter: "Chapter 02",
      title: "Google Ads",
      desc: "Capture high-intent demand at scale.",
      points: [
        "Search intent funnels",
        "YouTube performance ads",
        "ROAS-focused scaling"
      ],
      intent: "Intent • Scale • ROAS"
    }
  ],
  [
    {
      chapter: "Chapter 03",
      title: "Facebook & Instagram Ads",
      desc: "Scale demand using creative-led paid media.",
      points: [
        "High-converting creatives",
        "Audience & funnel structuring",
        "Performance scaling systems"
      ],
      intent: "Creative • Scale"
    },
    {
      chapter: "Chapter 04",
      title: "Landing Pages & Websites",
      desc: "Turn traffic into conversions.",
      points: [
        "Conversion-focused layouts",
        "Speed & UX optimization",
        "Analytics & tracking setup"
      ],
      intent: "Conversion • UX"
    }
  ],
  [
    {
      chapter: "Chapter 05",
      title: "Marketing Automation & SEO",
      desc: "Build compounding growth assets.",
      points: [
        "Automation workflows",
        "SEO foundations & scaling",
        "Tracking & analytics"
      ],
      intent: "Systems • Efficiency"
    },
    {
      chapter: "Chapter 06",
      title: "Social Media Marketing",
      desc: "Build brand trust and visibility.",
      points: [
        "Content strategy",
        "Community growth",
        "Consistency systems"
      ],
      intent: "Brand • Trust"
    }
  ],
  [
    {
      chapter: "Chapter 07",
      title: "E-commerce Growth & Scaling",
      desc: "Scale revenue across channels.",
      points: [
        "Full-funnel optimization",
        "AOV & LTV growth",
        "Profit-first scaling"
      ],
      intent: "Revenue • Scale"
    },
    {
      chapter: "Final Chapter",
      title: "Let’s Build Your Growth System",
      desc: "A system tailored to your business.",
      points: [
        "Custom strategy",
        "Execution roadmap",
        "Clear KPIs"
      ],
      intent: "Start • Scale • Win"
    }
  ]
];
let index = 0;
let isFlipping = false;

const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const flipSheet = document.getElementById("flipSheet");

/* ---------- RENDER ---------- */
function renderPage(el, data) {
  el.innerHTML = `
    <span class="chapter">${data.chapter}</span>
    <h3>${data.title}</h3>
    <p class="desc">${data.desc}</p>
    <ul>${data.points.map(p => `<li>${p}</li>`).join("")}</ul>
    <span class="intent">${data.intent}</span>
  `;
}

function loadSpread(i) {
  renderPage(leftPage, spreads[i][0]);
  renderPage(rightPage, spreads[i][1]);
}

loadSpread(index);

/* ---------- FLIP ---------- */
function flipForward(e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  if (isFlipping) return;
  isFlipping = true;

  // 🔒 HARD DOM LOCK
  rightPage.style.pointerEvents = "none";

  flipSheet.classList.add("turn");

  // Change content at midpoint
  setTimeout(() => {
    index = (index + 1) % spreads.length;
    loadSpread(index);
  }, 700);

  // Unlock after animation
  setTimeout(() => {
    flipSheet.classList.remove("turn");
    rightPage.style.pointerEvents = "auto";
    isFlipping = false;
  }, 1500); // MUST match CSS animation
}

/* ---------- SINGLE EVENT ONLY ---------- */

// ❌ DO NOT USE click
// ❌ DO NOT USE touchstart
// ✅ POINTERDOWN ONLY

rightPage.addEventListener("pointerdown", flipForward, {
  passive: false
});

