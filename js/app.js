const wines = window.WINE_DATA;
let current = 1;

const nav = document.getElementById("nav");
const main = document.getElementById("main");
const searchInput = document.getElementById("q");

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );

function createInfoBox(title, content, className = "") {
  return `
    <div class="mini ${className}">
      <b>${escapeHtml(title)}</b>
      ${content}
    </div>
  `;
}

function renderNavigation() {
  const query = searchInput.value.toLowerCase();
  nav.innerHTML = "";

  const groups = [...new Set(wines.map((wine) => wine.group))];

  groups.forEach((group) => {
    const matchingWines = wines
      .map((wine, index) => [wine, index])
      .filter(
        ([wine]) =>
          wine.group === group && wine.name.toLowerCase().includes(query),
      );

    if (!matchingWines.length) return;

    nav.insertAdjacentHTML(
      "beforeend",
      `<div class="group">${escapeHtml(group)} · ${matchingWines.length}</div>`,
    );

    matchingWines.forEach(([wine, index]) => {
      nav.insertAdjacentHTML(
        "beforeend",
        `
          <button
            class="nav ${index === current ? "active" : ""}"
            type="button"
            onclick="selectWine(${index})"
          >
            ${escapeHtml(wine.vintage)} · ${escapeHtml(wine.name)}
          </button>
        `,
      );
    });
  });
}

function selectWine(index) {
  current = index;
  renderWine();
  renderNavigation();

  // On mobile, move from the wine list to the newly rendered details.
  if (window.matchMedia("(max-width: 860px)").matches) {
    window.setTimeout(() => {
      main.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
}

function backToList() {
  const listTarget = document.querySelector(".side") || nav;

  listTarget.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function renderWine() {
  const wine = wines[current];

  main.innerHTML = `
    <section class="hero">
      <div class="kicker">V12.3 · Tier 1 Core Knowledge</div>
      <h2>${escapeHtml(wine.name)}</h2>
      <div class="sub">${escapeHtml(wine.vintage)}</div>
    </section>

    <section class="card">
      <div class="facts">
        <div class="fact">
          <b>Region</b>
          ${escapeHtml(wine.region)}
        </div>
        <div class="fact">
          <b>Grape Variety</b>
          ${escapeHtml(wine.grape)}
        </div>
        <div class="fact">
          <b>Style</b>
          ${escapeHtml(wine.style)}
        </div>
      </div>

      <h3>Why It Matters</h3>
      <p>${escapeHtml(wine.why)}</p>

      <h3>Tasting Profile</h3>
      <div class="taste">
        ${createInfoBox("Appearance", escapeHtml(wine.appearance))}
        ${createInfoBox("Aromas", escapeHtml(wine.aromas))}
        ${createInfoBox("Palate", escapeHtml(wine.palate))}
        ${createInfoBox("Guest-Friendly Description", escapeHtml(wine.guest))}
      </div>
    </section>

    <details>
      <summary>Tier 2 · Tin Lung Heen Pairing Strategy</summary>
      <div class="inside">
        <div class="progrid">
          ${createInfoBox("Best With", escapeHtml(wine.bestwith), "wide")}

          <div class="mini wide">
            <b>Recommended Dishes</b>
            <ul class="points">
              ${wine.bestdishes
                .map((dish) => `<li>${escapeHtml(dish)}</li>`)
                .join("")}
            </ul>
          </div>

          <div class="mini wide">
            <b>Flagship Pairing</b>
            <div class="pairname">★ ${escapeHtml(wine.flagship.dish)}</div>
            <p>${escapeHtml(wine.flagship.why)}</p>
          </div>

          ${createInfoBox("Why It Wins", escapeHtml(wine.whywins), "wide")}
        </div>
      </div>
    </details>

    <details>
      <summary>Tier 3 · Professional Knowledge</summary>
      <div class="inside">
        <div class="progrid">
          ${createInfoBox("Producer Story", escapeHtml(wine.story), "wide")}
          ${createInfoBox("Why This Wine Matters", escapeHtml(wine.matters))}
          ${createInfoBox(
            "Why It Is On The Tin Lung Heen List",
            escapeHtml(wine.list),
          )}
          ${createInfoBox("Guest Profile", escapeHtml(wine.guestprofile))}
          ${createInfoBox("Service Strategy", escapeHtml(wine.strategy))}
          ${createInfoBox("Ageing Potential", escapeHtml(wine.age))}

          <div class="mini">
            <b>Key Selling Points</b>
            <ul class="points">
              ${wine.points
                .map((point) => `<li>${escapeHtml(point)}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
      </div>
    </details>

    <button
      id="backToListBtn"
      class="back-to-list"
      type="button"
      onclick="backToList()"
      aria-label="Back to wine list"
    >
      ↑ Wine List
    </button>
  `;

}

searchInput.addEventListener("input", renderNavigation);
renderNavigation();
renderWine();
