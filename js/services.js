/* =========================
   BOOK DATA
========================= */

const spreads = [
  [
    {
      chapter: "Chapter 01",
      title: "WhatsApp Marketing & CRM",
      desc: "Turn conversations into predictable revenue.",
       image: "images/watsapp_img.jpg",
      points: [
        "Automated follow-ups & broadcasts",
        "CRM pipelines & lead tracking",
        "Retention & repeat revenue flows"
      ],
    
    },
    {
      chapter: "Chapter 02",
      title: "Google Ads",
      desc: "Capture high-intent demand at scale.",
       image: "images/google ads.jpg",
      points: [
        "Search intent funnels",
        "YouTube performance ads",
        "ROAS-focused scaling"
      ],
     
    }
  ],
  [
    {
      chapter: "Chapter 03",
      title: "Facebook & Instagram Ads",
      desc: "Scale demand using creative-led paid media.",
       image: "images/facebook_img.jpg",
      points: [
        "High-converting creatives",
        "Audience & funnel structuring",
        "Performance scaling systems"
      ],
     
    },
    {
      chapter: "Chapter 04",
      title: "Landing Pages & Websites",
      desc: "Turn traffic into conversions.",
       image: "images/lp.jpg",
      points: [
        "Conversion-focused layouts",
        "Speed & UX optimization",
        "Analytics & tracking setup"
      ],
    
    }
  ],
  [
    {
      chapter: "Chapter 05",
      title: "Marketing Automation & SEO",
      desc: "Build compounding growth assets.",
       image: "images/seo.jpg",
      points: [
        "Automation workflows",
        "SEO foundations & scaling",
        "Tracking & analytics"
      ],
      
    },
    {
      chapter: "Chapter 06",
      title: "Social Media Marketing",
      desc: "Build brand trust and visibility.",
       image: "images/googleads.jpg",
      points: [
        "Content strategy",
        "Community growth",
        "Consistency systems"
      ],
      
    }
  ],
  [
    {
      chapter: "Chapter 07",
      title: "E-commerce Growth & Scaling",
      desc: "Scale revenue across channels.",
       image: "images/meta_tags_image.jpg",
      points: [
        "Full-funnel optimization",
        "AOV & LTV growth",
        "Profit-first scaling"
      ],
    
    },
    {
      chapter: "Final Chapter",
      title: "Let’s Build Your Growth System",
      desc: "A system tailored to your business.",
       image: "images/groth.jpg",
      points: [
        "Custom strategy",
        "Execution roadmap",
        "Clear KPIs"
      ],
     
    }
  ]
];/* =========================
   STATE
========================= */

let desktopIndex = 0;
let mobileIndex = 0;
let isFlipping = false;

function isMobileView() {
  return window.matchMedia("(max-width: 900px)").matches;
}

const mobileChapters = spreads.flat();

/* =========================
   DOM REFERENCES
========================= */

const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const flipSheet = document.getElementById("flipSheet");

/* =========================
   RENDER
========================= */

function renderPage(el, data) {
  if (!el || !data) return;

  el.innerHTML = `
    <div class="page-image">
      <img src="${data.image}" alt="${data.title}" loading="lazy">
    </div>

    <span class="chapter">${data.chapter}</span>

    <h3>${data.title}</h3>
    <p class="desc">${data.desc}</p>

    <ul class="feature-list">
      ${data.points.map(p => `
        <li>
          <span class="dot"></span>
          ${p}
        </li>
      `).join("")}
    </ul>

  `;
}

function loadPages() {
  if (isMobileView()) {
    renderPage(rightPage, mobileChapters[mobileIndex]);
  } else {
    renderPage(leftPage, spreads[desktopIndex][0]);
    renderPage(rightPage, spreads[desktopIndex][1]);
  }
}

/* =========================
   INITIAL LOAD
========================= */

loadPages();

/* =========================
   FLIP
========================= */

function flipForward(e) {
  e.preventDefault();
  if (isFlipping) return;
  isFlipping = true;

  rightPage.style.pointerEvents = "none";
  flipSheet.classList.add("turn");

  setTimeout(() => {
    if (isMobileView()) {
      mobileIndex = (mobileIndex + 1) % mobileChapters.length;
    } else {
      desktopIndex = (desktopIndex + 1) % spreads.length;
    }
    loadPages();
  }, 700);

  setTimeout(() => {
    flipSheet.classList.remove("turn");
    rightPage.style.pointerEvents = "auto";
    isFlipping = false;
  }, 1500);
}

rightPage.addEventListener("pointerdown", flipForward, { passive: false });

/* =========================
   RESET ON RESIZE
========================= */

window.addEventListener("resize", () => {
  desktopIndex = 0;
  mobileIndex = 0;
  loadPages();
});

/* =========================
   TAP HINT – HIDE AFTER FIRST TAP
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const pageHint = document.getElementById("pageHint");
  if (!rightPage || !pageHint) return;

  let hintUsed = false;

  rightPage.addEventListener("click", () => {
    if (!hintUsed) {
      pageHint.style.opacity = "0";
      pageHint.style.transition = "opacity 0.4s ease";
      hintUsed = true;
    }
  });
});

  document.addEventListener("DOMContentLoaded", () => {
    const rightPage = document.getElementById("rightPage");
    const pageHint = document.getElementById("pageHint");

    if (!rightPage || !pageHint) return;

    let hintUsed = false;

    rightPage.addEventListener("click", () => {
      if (!hintUsed) {
        pageHint.style.transition = "opacity 0.4s ease";
        pageHint.style.opacity = "0";
        hintUsed = true;
      }
    });
  });

