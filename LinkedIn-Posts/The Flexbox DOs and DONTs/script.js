/**
 * CSS FLEXBOX ESSENTIALS
 * Content based on: "Learn CSS Flexbox by Scrimba" (Coursera)
 * Design: High Density, Compact, Screenshot Ready.
 */

const slides = [
  {
    title: "📐 Layout Strategy",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Use Flexbox for 1D layouts. Use Grid for 2D.</p>
        `,
    code: "display: flex;",
    codeLabel: "Activate Flexbox",
    extraCodes: [
      { label: "Row (Default)", cmd: "flex-direction: row;" },
      { label: "Column", cmd: "flex-direction: column;" },
      { label: "Don't Use For", cmd: "/* Complex 2D Grids */" },
    ],
  },
  {
    title: "📏 Sizing & Growth",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Set base sizes clearly. Control growth explicitly.</p>
        `,
    code: "flex: 1 1 200px;",
    codeLabel: "Shorthand (Grow Shrink Basis)",
    extraCodes: [
      { label: "Set Base Size", cmd: "flex-basis: 200px;" },
      { label: "Allow Growth", cmd: "flex-grow: 1;" },
      { label: "Don't", cmd: "/* Rely on implicit sizes */" },
    ],
  },
  {
    title: "↔️ Spacing (Gap vs Margin)",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Use <span class="text-emerald-400 font-mono">gap</span>. Avoid margin hacks.</p>
        `,
    code: "gap: 1rem;",
    codeLabel: "Clean Spacing",
    extraCodes: [
      { label: "Row & Col Gap", cmd: "gap: 10px 20px;" },
      { label: "Don't", cmd: "margin-right: 10px; /* Messy */" },
    ],
  },
  {
    title: "🎯 Alignment",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Simpler and more predictable than margins.</p>
        `,
    code: "justify-content: center;",
    codeLabel: "Main Axis Alignment",
    extraCodes: [
      { label: "Cross Axis", cmd: "align-items: center;" },
      { label: "Space Between", cmd: "justify-content: space-between;" },
      { label: "Full Center", cmd: "display: flex; place-items: center;" },
    ],
  },
  {
    title: "📱 Responsiveness",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Handle wrapping and overflow on small screens.</p>
        `,
    code: "flex-wrap: wrap;",
    codeLabel: "Allow Wrapping",
    extraCodes: [
      { label: "Sensible Min Width", cmd: "min-width: 300px;" },
      { label: "Prevent Overflow", cmd: "overflow-x: hidden;" },
      { label: "Check", cmd: "/* Always test on mobile */" },
    ],
  },
  {
    title: "♿ Accessibility & Order",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Visual order should match screen reader order.</p>
        `,
    code: "order: 1;",
    codeLabel: "Reordering Items",
    extraCodes: [
      { label: "Warning", cmd: "/* Don't break focus order */" },
      { label: "Best Practice", cmd: "/* Keep source logical */" },
    ],
  },
  {
    title: "🚫 Summary of Don'ts",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Avoid these common Flexbox mistakes.</p>
        `,
    code: "/* Don't mix margin & gap randomly */",
    codeLabel: "Spacing",
    extraCodes: [
      { label: "Sizing", cmd: "/* Don't leave flex-grow implicit */" },
      { label: "Layout", cmd: "/* Don't use Flex for 2D Grids */" },
      { label: "QA", cmd: "/* Don't forget overflow checks */" },
    ],
  },
];

// STATE
let currentIndex = 0;

// ELEMENTS
const contentContainer = document.getElementById("slide-content");
const paginationContainer = document.getElementById("pagination");
const slideCounterDesktop = document.getElementById("slide-counter-desktop");
const slideCounterMobile = document.getElementById("slide-counter-mobile");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");

function init() {
  renderPagination();
  loadSlide(currentIndex);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);
}

function loadSlide(index) {
  const slide = slides[index];

  // Fade out
  contentContainer.classList.remove("fade-enter-active");
  contentContainer.classList.add("fade-enter");

  setTimeout(() => {
    // Generate HTML with COMPACT DENSITY
    let html = `
            <div class="flex flex-col gap-2 w-full text-left">
                <div class="border-l-2 border-emerald-500 pl-3">
                    <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight leading-none mb-1">${slide.title}</h2>
                    <div class="text-slate-400 font-light leading-tight">
                        ${slide.content}
                    </div>
                </div>
        `;

    if (slide.code) {
      // Main Code Block (Compact)
      html += `
                <div class="mt-2 w-full text-left">
                    <p class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        ${slide.codeLabel || "Snippet"}
                    </p>
                    
                    <div class="bg-slate-900 border border-slate-700 rounded-md p-2.5 shadow-md font-mono text-xs md:text-sm text-white w-full overflow-x-auto whitespace-nowrap text-left scrollbar-hide">
                        ${escapeHtml(slide.code)}
                    </div>
            `;

      // Extra Codes (Very Compact Loop)
      if (slide.extraCodes) {
        slide.extraCodes.forEach((item) => {
          html += `
                        <div class="mt-1.5 w-full text-left">
                            <div class="flex items-center justify-between mb-0.5">
                                <p class="text-[9px] font-bold text-slate-500 uppercase tracking-wider text-left">${
                                  item.label
                                }</p>
                            </div>
                            <div class="bg-slate-900 border border-slate-700 rounded-md p-2 shadow-sm font-mono text-xs md:text-sm text-white w-full overflow-x-auto whitespace-nowrap text-left scrollbar-hide">
                                ${escapeHtml(item.cmd)}
                            </div>
                        </div>
                    `;
        });
      }

      html += `</div>`;
    }

    html += `</div>`;

    contentContainer.innerHTML = html;

    // Fade in
    requestAnimationFrame(() => {
      contentContainer.classList.remove("fade-enter");
      contentContainer.classList.add("fade-enter-active");
    });

    // Update counters
    const countText = `${index + 1} / ${slides.length}`;
    if (slideCounterDesktop) slideCounterDesktop.textContent = countText;
    if (slideCounterMobile) slideCounterMobile.textContent = countText;

    updateControls();
    updatePaginationUI(index);
  }, 200);
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    loadSlide(currentIndex);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    loadSlide(currentIndex);
  }
}

function updateControls() {
  prevBtn.disabled = currentIndex === 0;

  if (currentIndex === slides.length - 1) {
    nextBtn.innerHTML = `Finish`;
    nextBtn.classList.add("bg-emerald-600", "border-emerald-500");
  } else {
    nextBtn.innerHTML = `
            Next
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        `;
    nextBtn.classList.remove("bg-emerald-600", "border-emerald-500");
  }
}

function renderPagination() {
  let dots = "";
  slides.forEach((_, idx) => {
    dots += `<div class="shrink-0 h-1 rounded-full transition-all duration-300 ${
      idx === 0 ? "w-4 bg-emerald-500" : "w-1 bg-slate-600"
    }" data-index="${idx}"></div>`;
  });
  paginationContainer.innerHTML = dots;
}

function updatePaginationUI(activeIdx) {
  const dots = paginationContainer.children;

  if (slides.length > 5) {
    const dotWidth = 8;
    const center =
      activeIdx * dotWidth - paginationContainer.clientWidth / 2 + dotWidth / 2;
    paginationContainer.scrollTo({ left: center, behavior: "smooth" });
  }

  Array.from(dots).forEach((dot, idx) => {
    if (idx === activeIdx) {
      dot.className =
        "shrink-0 h-1 rounded-full transition-all duration-300 w-4 bg-emerald-500";
    } else {
      dot.className =
        "shrink-0 h-1 rounded-full transition-all duration-300 w-1 bg-slate-600";
    }
  });
}

function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

init();
