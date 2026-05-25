"use strict";

const marketData = [
  { symbol: "AAPL", name: "Apple", price: 189.32, change: 1.24, volatility: "Media", liquidity: "Alta", range: 1.8 },
  { symbol: "MSFT", name: "Microsoft", price: 412.1, change: -0.32, volatility: "Baja", liquidity: "Alta", range: 1.1 },
  { symbol: "NVDA", name: "Nvidia", price: 1210.5, change: 2.45, volatility: "Alta", liquidity: "Alta", range: 3.4 },
  { symbol: "TSLA", name: "Tesla", price: 248.1, change: -0.87, volatility: "Alta", liquidity: "Media", range: 2.9 },
  { symbol: "AMZN", name: "Amazon", price: 178.45, change: 0.78, volatility: "Media", liquidity: "Alta", range: 1.6 },
  { symbol: "GOOGL", name: "Alphabet", price: 162.3, change: -0.15, volatility: "Baja", liquidity: "Alta", range: 1.2 },
  { symbol: "BTCUSD", name: "Bitcoin", price: 67900, change: 2.11, volatility: "Alta", liquidity: "Media", range: 4.8 },
  { symbol: "EURUSD", name: "Euro/Dólar", price: 1.082, change: 0.18, volatility: "Baja", liquidity: "Alta", range: 0.7 },
  { symbol: "XAUUSD", name: "Oro", price: 2340.5, change: 0.38, volatility: "Media", liquidity: "Media", range: 1.3 }
];

const newsItems = [
  {
    slug: "wall-street-tecnologia",
    title: "Wall Street abre con sesgo mixto mientras la tecnología sostiene el índice",
    tag: "Renta variable",
    detail: "El flujo se concentra en megacaps y semiconductores, con menor apetito por valores cíclicos.",
    breaking: false,
    readTime: "4 min",
    sources: [
      { label: "Referencia: comunicados y datos de mercado públicos", url: "https://www.sec.gov/edgar/search/" },
      { label: "Contexto macro: Federal Reserve", url: "https://www.federalreserve.gov/" }
    ],
    paragraphs: [
      "La apertura con sesgo mixto refleja un mercado que no se mueve de forma uniforme. Los inversores siguen diferenciando entre compañías con crecimiento visible, balances sólidos y sectores más expuestos al ciclo económico.",
      "El liderazgo de grandes tecnológicas suele actuar como soporte para los índices, pero también puede ocultar debilidad bajo la superficie. Por eso conviene revisar amplitud de mercado, volumen y comportamiento sectorial antes de asumir que el apetito por riesgo es generalizado.",
      "Para una mesa de seguimiento, la lectura práctica pasa por vigilar si el avance se confirma con rotación hacia sectores cíclicos o si permanece concentrado en pocos nombres de gran capitalización."
    ]
  },
  {
    slug: "bitcoin-volumen-contado",
    title: "Bitcoin recupera zona clave tras aumento de volumen en contado",
    tag: "Cripto",
    detail: "La lectura técnica mejora si el precio consolida por encima de resistencias de corto plazo.",
    breaking: true,
    readTime: "3 min",
    sources: [
      { label: "Referencia: CoinMarketCap", url: "https://coinmarketcap.com/currencies/bitcoin/" },
      { label: "Contexto: Bitcoin.org", url: "https://bitcoin.org/" }
    ],
    paragraphs: [
      "El rebote de Bitcoin cobra mayor relevancia cuando viene acompañado por volumen en mercado contado, porque reduce la dependencia de movimientos puramente apalancados.",
      "La zona técnica recuperada funciona ahora como área de validación. Si el precio respeta ese nivel, el mercado puede empezar a descontar continuidad; si lo pierde con rapidez, el movimiento quedaría como ruptura fallida.",
      "En activos cripto es importante separar narrativa de ejecución: liquidez, spreads y reacción en soportes suelen aportar más información que un titular aislado."
    ]
  },
  {
    slug: "bancos-centrales-tipos",
    title: "El mercado espera nuevas pistas de bancos centrales",
    tag: "Macro",
    detail: "Tipos, salarios e inflación siguen marcando la dirección de bonos y divisas.",
    breaking: false,
    readTime: "5 min",
    sources: [
      { label: "Referencia: Banco Central Europeo", url: "https://www.ecb.europa.eu/" },
      { label: "Referencia: Federal Reserve", url: "https://www.federalreserve.gov/" }
    ],
    paragraphs: [
      "La política monetaria sigue siendo una de las principales variables para valorar bonos, divisas y renta variable. El mercado no solo mira el nivel actual de tipos, también intenta anticipar el ritmo de posibles recortes o pausas.",
      "Salarios, inflación subyacente y actividad económica determinan hasta qué punto los bancos centrales pueden suavizar su postura sin reactivar presiones de precios.",
      "Para carteras diversificadas, el impacto aparece en la curva de tipos, en el dólar y en la valoración de compañías de crecimiento, especialmente cuando cambia la tasa de descuento esperada."
    ]
  },
  {
    slug: "energia-materias-primas",
    title: "Energía y materias primas reducen momentum intradía",
    tag: "Commodities",
    detail: "El crudo pierde tracción por toma de beneficios y dudas sobre demanda global.",
    breaking: false,
    readTime: "4 min",
    sources: [
      { label: "Referencia: U.S. Energy Information Administration", url: "https://www.eia.gov/" },
      { label: "Contexto: OPEC", url: "https://www.opec.org/" }
    ],
    paragraphs: [
      "El ajuste en energía y materias primas sugiere una pausa en el momentum de corto plazo. Estos movimientos suelen aparecer cuando el mercado reevalúa expectativas de demanda, inventarios o tensión geopolítica.",
      "El crudo es especialmente sensible a cambios de percepción sobre crecimiento global. Una toma de beneficios después de subidas rápidas no implica necesariamente cambio de tendencia, pero sí exige vigilar niveles de soporte.",
      "En lectura macro, materias primas más débiles pueden aliviar expectativas de inflación, aunque también pueden apuntar a menor dinamismo económico si el movimiento se extiende."
    ]
  }
];

const youtubeChannel = {
  name: "MacroVision",
  url: "https://www.youtube.com/@NoticiasMacroVision",
  videosUrl: "https://www.youtube.com/@NoticiasMacroVision/videos",
  shortsUrl: "https://www.youtube.com/@NoticiasMacroVision/shorts",
  streamsUrl: "https://www.youtube.com/@NoticiasMacroVision/streams",
  note: "Acceso directo al canal oficial @NoticiasMacroVision. La pestaña Vídeos muestra las publicaciones más recientes disponibles en YouTube."
};

const videoItems = [
  {
    id: "videos",
    title: "Últimos vídeos del canal",
    date: "YouTube",
    summary: "Abre la pestaña de vídeos publicados por Noticias MacroVision.",
    url: "https://www.youtube.com/@NoticiasMacroVision/videos"
  },
  {
    id: "shorts",
    title: "Shorts recientes",
    date: "YouTube Shorts",
    summary: "Acceso rápido al formato corto del canal.",
    url: "https://www.youtube.com/@NoticiasMacroVision/shorts"
  },
  {
    id: "streams",
    title: "Directos y emisiones",
    date: "YouTube Live",
    summary: "Consulta directos, emisiones y contenido en vivo, si el canal los publica.",
    url: "https://www.youtube.com/@NoticiasMacroVision/streams"
  }
];

const events = [
  { time: "10:00", title: "PMI de la eurozona", impact: "Impacto medio" },
  { time: "14:30", title: "Peticiones de desempleo de EE. UU.", impact: "Impacto alto" },
  { time: "16:00", title: "Confianza del consumidor", impact: "Impacto medio" },
  { time: "20:00", title: "Comparecencia banco central", impact: "Impacto alto" }
];

const state = {
  symbols: new Map(marketData.map((item) => [item.symbol, { ...item }])),
  activeSymbol: "AAPL",
  intervals: [],
  chart: null,
  watchlist: loadWatchlist()
};

document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  renderWatchlist();
  renderNews();
  renderEvents();
  renderVideos();
  bindNavigation();
  bindWatchlist();
  bindContactForm();
  bindNewsRefresh();
  selectSymbol(state.activeSymbol);
  startMarketSimulation();
});

function loadWatchlist() {
  try {
    const saved = JSON.parse(localStorage.getItem("macrovision-watchlist"));
    return Array.isArray(saved) && saved.length ? saved : ["AAPL", "NVDA", "BTCUSD"];
  } catch {
    return ["AAPL", "NVDA", "BTCUSD"];
  }
}

function saveWatchlist() {
  localStorage.setItem("macrovision-watchlist", JSON.stringify(state.watchlist));
}

function renderTicker() {
  const track = document.getElementById("ticker-track");
  if (!track) return;

  const items = [...state.symbols.values()].map(createTickerItem).join("");
  track.innerHTML = items + items;
  track.querySelectorAll(".ticker-item").forEach((item) => {
    item.addEventListener("click", () => selectSymbol(item.dataset.symbol));
  });
}

function createTickerItem(asset) {
  const movementClass = asset.change >= 0 ? "positive" : "negative";
  const sign = asset.change >= 0 ? "+" : "";

  return `
    <button class="ticker-item" type="button" data-symbol="${asset.symbol}">
      <strong>${asset.symbol}</strong>
      <span class="${movementClass}">${sign}${asset.change.toFixed(2)}% ${formatPrice(asset)}</span>
    </button>
  `;
}

function bindNavigation() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");

  menuToggle?.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-45% 0px -48% 0px" });

  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

function bindWatchlist() {
  const form = document.getElementById("watchlist-form");
  const input = document.getElementById("symbol-input");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const symbol = input.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!symbol) return;

    if (!state.symbols.has(symbol)) {
      state.symbols.set(symbol, {
        symbol,
        name: symbol,
        price: Number((80 + Math.random() * 420).toFixed(2)),
        change: Number(((Math.random() - 0.45) * 3).toFixed(2)),
        volatility: "Media",
        liquidity: "Media",
        range: Number((0.8 + Math.random() * 2.8).toFixed(1))
      });
      renderTicker();
    }

    if (!state.watchlist.includes(symbol)) {
      state.watchlist.push(symbol);
      saveWatchlist();
      renderWatchlist();
    }

    input.value = "";
    selectSymbol(symbol);
  });
}

function renderWatchlist() {
  const container = document.getElementById("watchlist-container");
  if (!container) return;

  container.innerHTML = state.watchlist.map((symbol) => {
    const asset = state.symbols.get(symbol) || { symbol, price: 0, change: 0 };
    const movementClass = asset.change >= 0 ? "positive" : "negative";
    const sign = asset.change >= 0 ? "+" : "";

    return `
      <div class="watchlist-row" data-symbol="${symbol}">
        <button type="button" class="watchlist-select" data-action="select" data-symbol="${symbol}">
          <strong>${symbol}</strong>
          <span>${formatPrice(asset)} · <span class="${movementClass}">${sign}${asset.change.toFixed(2)}%</span></span>
        </button>
        <button type="button" data-action="remove" data-symbol="${symbol}" aria-label="Eliminar ${symbol}">x</button>
      </div>
    `;
  }).join("");

  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const symbol = button.dataset.symbol;
      if (button.dataset.action === "remove") {
        state.watchlist = state.watchlist.filter((item) => item !== symbol);
        saveWatchlist();
        renderWatchlist();
        return;
      }
      selectSymbol(symbol);
    });
  });
}

function renderNews() {
  const container = document.getElementById("news-track");
  if (!container) return;

  container.innerHTML = newsItems.map((item) => `
    <a class="news-item ${item.breaking ? "breaking" : ""}" href="#articulos" data-article="${item.slug}">
      <span>${item.tag}</span>
      <strong>${item.title}</strong>
      <p>${item.detail}</p>
      <span>Leer artículo · ${item.readTime}</span>
    </a>
  `).join("");

  container.querySelectorAll("[data-article]").forEach((link) => {
    link.addEventListener("click", () => renderArticle(link.dataset.article));
  });
}

function renderEvents() {
  const container = document.getElementById("event-list");
  if (!container) return;

  container.innerHTML = events.map((event) => `
    <article class="event-item">
      <span>${event.time} · ${event.impact}</span>
      <strong>${event.title}</strong>
    </article>
  `).join("");
}

function renderArticle(slug) {
  const article = newsItems.find((item) => item.slug === slug);
  const container = document.getElementById("article-view");
  if (!article || !container) return;

  container.innerHTML = `
    <span class="tag">${article.tag}</span>
    <h3>${article.title}</h3>
    <div class="article-meta">${article.readTime} de lectura · Síntesis editorial propia</div>
    <div class="article-body">
      ${article.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </div>
    <div class="source-list">
      ${article.sources.map((source) => `
        <a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a>
      `).join("")}
    </div>
    <p class="copyright-note">
      Nota de copyright: este contenido es una redacción original de MacroVision con fines informativos. No copia ni reproduce artículos de terceros; las fuentes enlazadas sirven como referencia pública y atribución contextual.
    </p>
  `;
}

function bindNewsRefresh() {
  document.getElementById("refresh-news")?.addEventListener("click", () => {
    newsItems.unshift(newsItems.pop());
    renderNews();
  });
}

function renderVideos() {
  const channelLink = document.getElementById("youtube-channel-link");
  const note = document.getElementById("youtube-note");
  const list = document.getElementById("video-list");
  if (channelLink) {
    channelLink.href = youtubeChannel.url;
    channelLink.setAttribute("aria-label", `Abrir canal de YouTube ${youtubeChannel.name}`);
  }
  if (note) {
    note.textContent = youtubeChannel.note;
  }
  if (!list) return;

  list.innerHTML = videoItems.map((video, index) => `
    <button class="video-item ${index === 0 ? "active" : ""}" type="button" data-video="${video.id}">
      <span>${video.date}</span>
      <strong>${video.title}</strong>
      <small>${video.summary}</small>
    </button>
  `).join("");

  list.querySelectorAll("[data-video]").forEach((button) => {
    button.addEventListener("click", () => selectVideo(button.dataset.video));
  });

  selectVideo(videoItems[0].id);
}

function selectVideo(id) {
  const video = videoItems.find((item) => item.id === id);
  const frame = document.getElementById("featured-video");
  if (!video || !frame) return;

  frame.innerHTML = `
    <a class="video-placeholder video-link" href="${video.url}" target="_blank" rel="noopener noreferrer">
      <strong>${video.title}</strong>
      <span>${video.summary}</span>
      <em>Abrir en YouTube</em>
    </a>
  `;

  document.querySelectorAll(".video-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.video === id);
  });
}

function bindContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    status.textContent = `Solicitud recibida, ${name}. Te contactaremos para configurar la demo.`;
    form.reset();
  });
}

function selectSymbol(symbol) {
  const asset = state.symbols.get(symbol);
  if (!asset) return;

  state.activeSymbol = symbol;
  document.getElementById("selected-symbol").textContent = symbol;
  document.getElementById("selected-price").textContent = formatPrice(asset);
  updateMovementText(document.getElementById("selected-change"), asset.change);
  document.getElementById("metric-volatility").textContent = asset.volatility;
  document.getElementById("metric-liquidity").textContent = asset.liquidity;
  document.getElementById("metric-range").textContent = `${asset.range.toFixed(1)}%`;
  document.getElementById("metric-momentum").textContent = asset.change >= 0 ? "Constructivo" : "Presión bajista";

  document.querySelectorAll(".ticker-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.symbol === symbol);
  });

  loadTradingView(symbol);
}

function loadTradingView(symbol) {
  const target = document.getElementById("tv_chart");
  if (!target || typeof TradingView === "undefined") return;

  target.innerHTML = "";
  state.chart = new TradingView.widget({
    autosize: true,
    symbol: normalizeTradingViewSymbol(symbol),
    interval: "D",
    timezone: "Europe/Madrid",
    theme: "dark",
    style: "1",
    locale: "es",
    toolbar_bg: "#0b1019",
    enable_publishing: false,
    allow_symbol_change: true,
    hide_side_toolbar: false,
    container_id: "tv_chart"
  });
}

function normalizeTradingViewSymbol(symbol) {
  const aliases = {
    BTCUSD: "COINBASE:BTCUSD",
    EURUSD: "FX:EURUSD",
    XAUUSD: "OANDA:XAUUSD"
  };

  return aliases[symbol] || `NASDAQ:${symbol}`;
}

function startMarketSimulation() {
  const id = window.setInterval(() => {
    const assets = [...state.symbols.values()];
    assets.forEach((asset) => {
      const priceNoise = asset.price * (Math.random() - 0.49) * 0.0025;
      const changeNoise = (Math.random() - 0.5) * 0.08;
      asset.price = Math.max(0.01, Number((asset.price + priceNoise).toFixed(asset.price < 10 ? 4 : 2)));
      asset.change = Number((asset.change + changeNoise).toFixed(2));
    });

    updateLiveUI();
  }, 1800);

  state.intervals.push(id);
  window.addEventListener("beforeunload", () => state.intervals.forEach(window.clearInterval));
}

function updateLiveUI() {
  document.querySelectorAll(".ticker-item").forEach((item) => {
    const asset = state.symbols.get(item.dataset.symbol);
    if (!asset) return;
    const span = item.querySelector("span");
    updateMovementText(span, asset.change, `${formatPrice(asset)}`);
  });

  const active = state.symbols.get(state.activeSymbol);
  if (active) {
    document.getElementById("selected-price").textContent = formatPrice(active);
    updateMovementText(document.getElementById("selected-change"), active.change);
    document.getElementById("metric-momentum").textContent = active.change >= 0 ? "Constructivo" : "Presión bajista";
  }

  renderWatchlist();
  updateExecutiveState();
}

function updateMovementText(element, change, suffix = "") {
  if (!element) return;
  const sign = change >= 0 ? "+" : "";
  element.className = change >= 0 ? "positive" : "negative";
  element.textContent = `${sign}${change.toFixed(2)}%${suffix ? ` ${suffix}` : ""}`;
}

function updateExecutiveState() {
  const assets = [...state.symbols.values()];
  const average = assets.reduce((sum, asset) => sum + asset.change, 0) / assets.length;
  const risk = document.getElementById("risk-state");
  const signal = document.getElementById("signal-state");

  if (risk) risk.textContent = average > 0.7 ? "Apetito por riesgo" : average < -0.4 ? "Defensivo" : "Moderado";
  if (signal) signal.textContent = average >= 0 ? "Momentum positivo" : "Cobertura activa";
}

function formatPrice(asset) {
  const value = asset.price || 0;
  if (asset.symbol === "EURUSD") return value.toFixed(4);
  if (asset.symbol.includes("USD") && value > 1000) return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
