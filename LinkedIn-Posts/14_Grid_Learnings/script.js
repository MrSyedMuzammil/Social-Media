/**
 * CSS GRID ESSENTIALS
 * Content based on: "Learn CSS Grid by Scrimba" (Coursera)
 * Design: High Density, Compact, Screenshot Ready.
 */

const slides = [
  {
    title: "🕸️ Defining the Grid",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Define explicit tracks (rows/cols) for your layout.</p>
        `,
    code: "grid-template-columns: repeat(3, 1fr);",
    codeLabel: "Explicit Columns",
    extraCodes: [
      { label: "Explicit Rows", cmd: "grid-template-rows: repeat(2, 50px);" },
      {
        label: "Shorthand (Rows / Cols)",
        cmd: "grid-template: 50px 50px / 1fr 1fr;",
      },
    ],
  },
  {
    title: "📍 Placing Items",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Position items on specific grid lines.</p>
        `,
    code: "grid-column: 1 / 3;",
    codeLabel: "Shorthand (Start / End)",
    extraCodes: [
      { label: "Span Keyword", cmd: "grid-column: 2 / span 2;" },
      { label: "Full Width (Negative Index)", cmd: "grid-column: 1 / -1;" },
      { label: "Specific Line", cmd: "grid-column-start: 2;" },
    ],
  },
  {
    title: "📏 Layout Systems & Units",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">The <span class="text-emerald-400 font-mono">fr</span> unit and the 12-column standard.</p>
        `,
    code: "grid-template-columns: repeat(12, 1fr);",
    codeLabel: "12-Column System",
    extraCodes: [
      { label: "Fractional Unit", cmd: "grid-template-columns: 1fr 4fr;" },
      {
        label: "Placing on 12-Col",
        cmd: "grid-column: 2 / -1; /* Sidebar to End */",
      },
    ],
  },
  {
    title: "🗺️ Areas & Implicit Names",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Visual mapping with ASCII-style layout.</p>
        `,
    code: `grid-template-areas: \n". h h h ."\n". c c c .";`,
    codeLabel: "Visual Map",
    extraCodes: [
      { label: "Assign to Area", cmd: "grid-area: h; /* Header */" },
      {
        label: "Implicit Names",
        cmd: "grid-area: content; /* If lines are named */",
      },
    ],
  },
  {
    title: "📱 Responsive & Implicit Magic",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Auto-placement and the RAM pattern.</p>
        `,
    code: "repeat(auto-fit, minmax(100px, 1fr));",
    codeLabel: "The RAM Pattern (Responsive Auto Max)",
    extraCodes: [
      { label: "Implicit Row Height", cmd: "grid-auto-rows: 100px;" },
      { label: "Fill Holes", cmd: "grid-auto-flow: dense;" },
    ],
  },
  {
    title: "🧠 Best Practices",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Why Grid matters and common mistakes.</p>
        `,
    code: "/* RAM Pattern reduces Media Queries */",
    codeLabel: "Key Benefit",
    extraCodes: [
      {
        label: "Visual Clarity",
        cmd: "/* Use Template Areas for readability */",
      },
      { label: "The -1 Trap", cmd: "/* -1 only works on Explicit grids */" },
      { label: "Full Bleed", cmd: "grid-column: 1 / -1;" },
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
                    
                    <div class="bg-slate-900 border border-slate-700 rounded-md p-2.5 shadow-md font-mono text-xs md:text-sm text-white w-full overflow-x-auto whitespace-pre-wrap text-left scrollbar-hide">
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
