"use strict";

const API_KEY = "d8bmgk9r01qppd8sdnm0d8bmgk9r01qppd8sdnmg";

const marketData = [
  { symbol: "AAPL", name: "Apple", price: 189.32, change: 1.24, volatility: "Media", liquidity: "Alta", range: 1.9 },
  { symbol: "MSFT", name: "Microsoft", price: 428.18, change: 0.62, volatility: "Media", liquidity: "Alta", range: 2.1 },
  { symbol: "NVDA", name: "NVIDIA", price: 117.93, change: 2.74, volatility: "Alta", liquidity: "Alta", range: 3.8 },
  { symbol: "TSLA", name: "Tesla", price: 182.55, change: -1.18, volatility: "Alta", liquidity: "Alta", range: 3.2 },
  { symbol: "AMZN", name: "Amazon", price: 184.91, change: 0.44, volatility: "Media", liquidity: "Alta", range: 1.7 },
  { symbol: "GOOGL", name: "Alphabet", price: 176.22, change: 0.31, volatility: "Media", liquidity: "Alta", range: 1.3 },
  { symbol: "BTCUSD", name: "Bitcoin", price: 68420, change: 1.86, volatility: "Alta", liquidity: "Alta", range: 4.2 },
  { symbol: "EURUSD", name: "Euro / Dolar", price: 1.0842, change: -0.12, volatility: "Baja", liquidity: "Alta", range: 0.5 },
  { symbol: "XAUUSD", name: "Oro", price: 2352.6, change: 0.38, volatility: "Media", liquidity: "Alta", range: 1.1 },
  { symbol: "SPY", name: "S&P 500 ETF", price: 529.11, change: 0.57, volatility: "Media", liquidity: "Alta", range: 1.0 },
  { symbol: "QQQ", name: "Nasdaq 100 ETF", price: 456.8, change: 0.83, volatility: "Alta", liquidity: "Alta", range: 1.6 }
];

const fallbackNews = [
  {
    title: "Los mercados ajustan expectativas de tipos antes de nuevos datos de inflacion",
    source: "MacroVision",
    summary: "La curva de bonos mantiene una lectura prudente mientras los inversores buscan confirmacion en salarios, energia y consumo.",
    body: [
      "El mercado llega a la semana con una posicion mas selectiva. Los activos de riesgo mantienen soporte, pero la sensibilidad a cualquier sorpresa de inflacion sigue siendo elevada.",
      "En este entorno, los equipos de gestion suelen vigilar la pendiente de la curva, el dolar y la reaccion de sectores defensivos para calibrar si el movimiento tiene continuidad."
    ]
  },
  {
    title: "La rotacion sectorial favorece calidad y balances solidos",
    source: "MacroVision",
    summary: "Tecnologia de alta capitalizacion y salud concentran parte del flujo, mientras energia y financieras muestran mayor dispersion.",
    body: [
      "La lectura sectorial apunta a una preferencia por companias con margenes resilientes, liquidez y visibilidad de beneficios.",
      "La clave para las proximas sesiones sera distinguir entre toma de beneficios tactica y deterioro real del apetito por riesgo."
    ]
  },
  {
    title: "El dolar y los rendimientos vuelven al centro del tablero macro",
    source: "MacroVision",
    summary: "Divisas y deuda soberana siguen marcando el tono para materias primas, emergentes y valoraciones de crecimiento.",
    body: [
      "Los movimientos del dolar estan condicionando la lectura de commodities y activos internacionales. Un rebote sostenido podria endurecer las condiciones financieras.",
      "Para inversores de corto plazo, la confirmacion suele llegar con volumen, ruptura de niveles y consistencia entre renta fija y renta variable."
    ]
  }
];

const events = [
  { time: "09:00", title: "PMI manufacturero Eurozona", impact: "Media" },
  { time: "14:30", title: "Datos de empleo EE. UU.", impact: "Alta" },
  { time: "16:00", title: "Confianza del consumidor", impact: "Media" },
  { time: "20:00", title: "Comparecencia banco central", impact: "Alta" }
];

const videos = [
  { title: "Resumen macro semanal", meta: "Briefing editorial", url: "https://www.youtube.com/embed?listType=search&list=Noticias%20MacroVision%20mercados" },
  { title: "Claves para vigilar indices", meta: "Analisis tecnico", url: "https://www.youtube.com/embed?listType=search&list=MacroVision%20indices%20mercados" },
  { title: "Dolar, bonos y materias primas", meta: "Contexto global", url: "https://www.youtube.com/embed?listType=search&list=MacroVision%20dolar%20bonos" }
];

const dictionary = {
  es: {
    nav_home: "Inicio",
    nav_markets: "Mercados",
    nav_analysis: "Analisis",
    nav_news: "Actualidad",
    nav_videos: "Videos",
    nav_contact: "Contacto",
    hero_title: "Analisis financiero, mercados en vivo y noticias macroeconomicas en una sola terminal.",
    hero_intro: "Centraliza vigilancia de indices, renta variable, criptomonedas, divisas y materias primas en una interfaz profesional, rapida y orientada a decisiones."
  },
  en: {
    nav_home: "Home",
    nav_markets: "Markets",
    nav_analysis: "Analysis",
    nav_news: "News",
    nav_videos: "Videos",
    nav_contact: "Contact",
    hero_title: "Financial analysis, live markets and macroeconomic news in a single terminal.",
    hero_intro: "Centralize monitoring of indices, equities, cryptocurrencies, FX and commodities in a fast professional interface built for decisions."
  }
};

const state = {
  symbols: new Map(marketData.map((item) => [item.symbol, { ...item }])),
  activeSymbol: "SPY",
  intervals: [],
  watchlist: loadWatchlist(),
  news: [...fallbackNews],
  tradingViewSymbol: null
};

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  bindNavigation();
  bindLanguage();
  bindWatchlist();
  bindNewsRefresh();
  bindContactForm();
  observeFooter();
  renderHeroData();
  renderTicker();
  renderWatchlist();
  renderEvents();
  renderVideos();
  renderNews();
  selectSymbol(state.activeSymbol, { reloadChart: false });
  loadTradingViewWhenReady(state.activeSymbol);
  fetchLiveMarketData();
  fetchMarketNews();
  startLiveUpdates();
  setLanguage(localStorage.getItem("mv_lang") || "es");
}

function bindNavigation() {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");

  toggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => scrollToTarget(button.dataset.scroll));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

    sections.forEach((section) => observer.observe(section));
  }
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  closeMenu();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  document.getElementById("menu-toggle")?.setAttribute("aria-expanded", "false");
}

function bindLanguage() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
}

function setLanguage(lang) {
  const dict = dictionary[lang] || dictionary.es;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dict[element.dataset.i18n];
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  localStorage.setItem("mv_lang", lang);
}

function renderHeroData() {
  const hour = new Date().getHours();
  let session = "Mercados cerrados";

  if (hour >= 15 && hour < 17) session = "Europa + Wall Street";
  else if (hour >= 15 && hour < 22) session = "Wall Street abierto";
  else if (hour >= 9 && hour < 17) session = "Europa abierta";

  setText("session-state", session);
  setText("risk-state", "Moderado");
  setText("signal-state", "Momentum activo");
}

function bindWatchlist() {
  const form = document.getElementById("watchlist-form");
  const input = document.getElementById("symbol-input");

  if (!form || !input) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const symbol = normalizeSymbol(input.value);
    if (!symbol) return;

    if (!state.symbols.has(symbol)) {
      state.symbols.set(symbol, {
        symbol,
        name: symbol,
        price: 0,
        change: 0,
        volatility: "Media",
        liquidity: "Media",
        range: 1
      });
    }

    if (!state.watchlist.includes(symbol)) {
      state.watchlist.push(symbol);
      saveWatchlist();
    }

    input.value = "";
    renderWatchlist();
    renderTicker();
    selectSymbol(symbol);
    await fetchSingleSymbol(symbol);
    updateUI();
  });
}

function loadWatchlist() {
  try {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    return Array.isArray(saved) && saved.length ? saved.map(normalizeSymbol).filter(Boolean) : ["SPY", "QQQ", "BTCUSD"];
  } catch {
    return ["SPY", "QQQ", "BTCUSD"];
  }
}

function saveWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
}

function renderWatchlist() {
  const container = document.getElementById("watchlist-container");
  if (!container) return;

  container.replaceChildren(...state.watchlist.map((symbol) => {
    const asset = state.symbols.get(symbol);
    const button = document.createElement("button");
    button.className = "watchlist-select";
    button.type = "button";
    button.dataset.symbol = symbol;

    const title = document.createElement("strong");
    title.textContent = symbol;

    const meta = document.createElement("span");
    const change = safeNumber(asset?.change);
    meta.innerHTML = `${formatPrice(asset)} &middot; <span class="${change >= 0 ? "positive" : "negative"}">${change >= 0 ? "+" : ""}${change.toFixed(2)}%</span>`;

    button.append(title, meta);
    button.addEventListener("click", () => selectSymbol(symbol));
    return button;
  }));
}

function renderTicker() {
  const track = document.getElementById("ticker-track");
  if (!track) return;

  const items = [...state.symbols.values()].flatMap((asset) => [createTickerItem(asset), createTickerItem(asset)]);
  track.replaceChildren(...items);
}

function createTickerItem(asset) {
  const change = safeNumber(asset.change);
  const button = document.createElement("button");
  button.className = `ticker-item${asset.symbol === state.activeSymbol ? " active" : ""}`;
  button.type = "button";
  button.dataset.symbol = asset.symbol;
  button.innerHTML = `<strong>${escapeHtml(asset.symbol)}</strong><span class="${change >= 0 ? "positive" : "negative"}">${change >= 0 ? "+" : ""}${change.toFixed(2)}% ${escapeHtml(formatPrice(asset))}</span>`;
  button.addEventListener("click", () => selectSymbol(asset.symbol));
  return button;
}

async function fetchLiveMarketData() {
  await Promise.all([...state.symbols.keys()].map(fetchSingleSymbol));
  updateUI();
}

async function fetchSingleSymbol(symbol) {
  if (!API_KEY) return;

  try {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${API_KEY}`, {
      cache: "no-store"
    });

    if (!response.ok) return;

    const data = await response.json();
    if (!data || typeof data.c !== "number" || data.c <= 0) return;

    const asset = state.symbols.get(symbol);
    if (!asset) return;

    asset.price = data.c;
    asset.change = data.pc ? ((data.c - data.pc) / data.pc) * 100 : 0;
  } catch (error) {
    console.warn("No se pudieron actualizar datos de mercado", symbol, error);
  }
}

function updateUI() {
  renderTicker();
  renderWatchlist();

  const asset = state.symbols.get(state.activeSymbol);
  if (!asset) return;

  const change = safeNumber(asset.change);
  setText("selected-symbol", state.activeSymbol);
  setText("selected-price", formatPrice(asset));
  setText("metric-volatility", asset.volatility || "Media");
  setText("metric-momentum", change >= 0 ? "Constructivo" : "Defensivo");
  setText("metric-liquidity", asset.liquidity || "Media");
  setText("metric-range", `${safeNumber(asset.range).toFixed(1)}%`);

  const changeElement = document.getElementById("selected-change");
  if (changeElement) {
    changeElement.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
    changeElement.className = change > 0 ? "positive" : change < 0 ? "negative" : "neutral";
  }
}

function selectSymbol(symbol, options = {}) {
  const normalized = normalizeSymbol(symbol);
  if (!normalized || !state.symbols.has(normalized)) return;

  state.activeSymbol = normalized;
  updateUI();

  if (options.reloadChart !== false) {
    loadTradingViewWhenReady(normalized);
  }
}

function loadTradingViewWhenReady(symbol) {
  const container = document.getElementById("tv_chart");
  if (!container) return;

  if (state.tradingViewSymbol === symbol && container.querySelector("iframe")) return;

  if (typeof TradingView === "undefined") {
    window.setTimeout(() => loadTradingViewWhenReady(symbol), 500);
    return;
  }

  state.tradingViewSymbol = symbol;
  container.replaceChildren();

  new TradingView.widget({
    container_id: "tv_chart",
    autosize: true,
    symbol: getTradingViewSymbol(symbol),
    interval: "60",
    timezone: "Europe/Madrid",
    theme: "dark",
    style: "1",
    locale: "es",
    toolbar_bg: "#0b1019",
    enable_publishing: false,
    allow_symbol_change: true,
    withdateranges: true,
    hide_side_toolbar: false,
    hide_top_toolbar: false,
    save_image: false,
    studies: ["Volume@tv-basicstudies", "MASimple@tv-basicstudies"],
    overrides: {
      "paneProperties.background": "#0b1019",
      "paneProperties.vertGridProperties.color": "rgba(255,255,255,0.04)",
      "paneProperties.horzGridProperties.color": "rgba(255,255,255,0.04)",
      "scalesProperties.textColor": "#98a5b8"
    }
  });
}

function getTradingViewSymbol(symbol) {
  const symbols = {
    BTCUSD: "BINANCE:BTCUSDT",
    EURUSD: "FX:EURUSD",
    XAUUSD: "OANDA:XAUUSD",
    SPY: "AMEX:SPY",
    QQQ: "NASDAQ:QQQ",
    AAPL: "NASDAQ:AAPL",
    NVDA: "NASDAQ:NVDA",
    TSLA: "NASDAQ:TSLA",
    MSFT: "NASDAQ:MSFT",
    AMZN: "NASDAQ:AMZN",
    GOOGL: "NASDAQ:GOOGL"
  };

  return symbols[symbol] || symbol;
}

function bindNewsRefresh() {
  document.getElementById("refresh-news")?.addEventListener("click", fetchMarketNews);
}

async function fetchMarketNews() {
  const status = document.getElementById("news-status");
  setText("news-status", "Actualizando noticias...");

  try {
    const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const liveNews = Array.isArray(data) ? data.slice(0, 6).map((item) => ({
      title: item.headline || "Titular de mercado",
      source: item.source || "Fuente publica",
      summary: item.summary || "Resumen no disponible.",
      url: item.url,
      body: [
        item.summary || "La noticia no incluye un resumen ampliado desde la fuente consultada.",
        "MacroVision muestra este contenido como referencia informativa y recomienda contrastarlo con la fuente original antes de tomar decisiones."
      ]
    })) : [];

    if (liveNews.length) state.news = liveNews;
    renderNews();
    setText("news-status", `Ultima actualizacion: ${new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`);
  } catch (error) {
    console.warn("No se pudieron cargar noticias en vivo", error);
    state.news = [...fallbackNews];
    renderNews();
    if (status) status.textContent = "Mostrando briefing editorial local. La API no esta disponible ahora mismo.";
  }
}

function renderNews() {
  const container = document.getElementById("news-track");
  if (!container) return;

  container.replaceChildren(...state.news.map((item, index) => {
    const button = document.createElement("button");
    button.className = `news-item${index === 0 ? " breaking" : ""}`;
    button.type = "button";

    const source = document.createElement("span");
    source.className = "news-source";
    source.textContent = item.source || "MacroVision";

    const title = document.createElement("strong");
    title.textContent = item.title;

    const summary = document.createElement("p");
    summary.textContent = item.summary;

    button.append(source, title, summary);
    button.addEventListener("click", () => renderArticle(item));
    return button;
  }));
}

function renderArticle(item) {
  const article = document.getElementById("article-view");
  if (!article) return;

  const sourceLink = item.url
    ? `<div class="source-list"><a href="${escapeAttribute(item.url)}" target="_blank" rel="noopener noreferrer">Abrir fuente</a></div>`
    : "";

  article.innerHTML = `
    <span class="tag">${escapeHtml(item.source || "MacroVision")}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <div class="article-body">
      ${(item.body || [item.summary]).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </div>
    <p class="copyright-note">Sintesis editorial con finalidad informativa. Contrasta siempre datos sensibles con fuentes oficiales o profesionales cualificados.</p>
    ${sourceLink}
  `;
}

function renderEvents() {
  const container = document.getElementById("event-list");
  if (!container) return;

  container.replaceChildren(...events.map((event) => {
    const item = document.createElement("article");
    item.className = "event-item";
    item.innerHTML = `<strong>${escapeHtml(event.title)}</strong><span>${escapeHtml(event.time)} · Impacto ${escapeHtml(event.impact)}</span>`;
    return item;
  }));
}

function renderVideos() {
  const list = document.getElementById("video-list");
  const featured = document.getElementById("featured-video");
  if (!list || !featured) return;

  setText("youtube-note", "Seleccion editorial preparada para integrarse con el canal oficial.");
  list.replaceChildren(...videos.map((video, index) => {
    const button = document.createElement("button");
    button.className = `video-item${index === 0 ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(video.title)}</strong><small>${escapeHtml(video.meta)}</small>`;
    button.addEventListener("click", () => selectVideo(video, button));
    return button;
  }));

  selectVideo(videos[0], list.querySelector(".video-item"));
}

function selectVideo(video, button) {
  const featured = document.getElementById("featured-video");
  if (!featured) return;

  document.querySelectorAll(".video-item").forEach((item) => item.classList.remove("active"));
  button?.classList.add("active");

  featured.innerHTML = `<iframe src="${escapeAttribute(video.url)}" title="${escapeAttribute(video.title)}" loading="lazy" allowfullscreen></iframe>`;
}

function bindContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    setText("form-status", "Solicitud registrada. Te contactaremos pronto.");
  });
}

function observeFooter() {
  const footer = document.querySelector(".mv-footer");
  if (!footer || !("IntersectionObserver" in window)) {
    footer?.classList.add("show");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      footer.classList.add("show");
      observer.disconnect();
    });
  }, { threshold: 0.15 });

  observer.observe(footer);
}

function startLiveUpdates() {
  state.intervals.push(window.setInterval(fetchLiveMarketData, 30000));
}

function formatPrice(asset) {
  if (!asset) return "--";
  const price = safeNumber(asset.price);

  if (asset.symbol === "EURUSD") return price.toFixed(4);
  if (asset.symbol === "BTCUSD") return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function normalizeSymbol(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9.:-]/g, "").slice(0, 12);
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

window.MacroVision = {
  setLanguage,
  selectSymbol
};
