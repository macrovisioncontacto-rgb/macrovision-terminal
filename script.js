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
  { symbol: "EURUSD", name: "Euro / Dólar", price: 1.0842, change: -0.12, volatility: "Baja", liquidity: "Alta", range: 0.5 },
  { symbol: "XAUUSD", name: "Oro", price: 2352.6, change: 0.38, volatility: "Media", liquidity: "Alta", range: 1.1 },
  { symbol: "SPY", name: "S&P 500 ETF", price: 529.11, change: 0.57, volatility: "Media", liquidity: "Alta", range: 1.0 },
  { symbol: "QQQ", name: "Nasdaq 100 ETF", price: 456.8, change: 0.83, volatility: "Alta", liquidity: "Alta", range: 1.6 }
];

const localizedNews = {
  es: [
    {
      title: "Los mercados ajustan expectativas de tipos antes de nuevos datos de inflación",
      source: "Macrovisión",
      summary: "La curva de bonos mantiene una lectura prudente mientras los inversores buscan confirmación en salarios, energía y consumo.",
      body: [
        "El mercado llega a la semana con una posición más selectiva. Los activos de riesgo mantienen soporte, pero la sensibilidad a cualquier sorpresa de inflación sigue siendo elevada.",
        "En este entorno, los equipos de gestión suelen vigilar la pendiente de la curva, el dólar y la reacción de sectores defensivos para calibrar si el movimiento tiene continuidad."
      ]
    },
    {
      title: "La rotación sectorial favorece calidad y balances sólidos",
      source: "Macrovisión",
      summary: "Tecnología de alta capitalización y salud concentran parte del flujo, mientras energía y financieras muestran mayor dispersión.",
      body: [
        "La lectura sectorial apunta a una preferencia por compañías con márgenes resilientes, liquidez y visibilidad de beneficios.",
        "La clave para las próximas sesiones será distinguir entre toma de beneficios táctica y deterioro real del apetito por riesgo."
      ]
    },
    {
      title: "El dólar y los rendimientos vuelven al centro del tablero macro",
      source: "Macrovisión",
      summary: "Divisas y deuda soberana siguen marcando el tono para materias primas, emergentes y valoraciones de crecimiento.",
      body: [
        "Los movimientos del dólar están condicionando la lectura de commodities y activos internacionales. Un rebote sostenido podría endurecer las condiciones financieras.",
        "Para inversores de corto plazo, la confirmación suele llegar con volumen, ruptura de niveles y consistencia entre renta fija y renta variable."
      ]
    }
  ],
  en: [
    {
      title: "Markets adjust rate expectations ahead of new inflation data",
      source: "MacroVision",
      summary: "The bond curve remains cautious as investors look for confirmation in wages, energy and consumption.",
      body: [
        "Markets enter the week with more selective positioning. Risk assets continue to find support, but sensitivity to any inflation surprise remains high.",
        "In this environment, trading desks tend to monitor curve steepness, the dollar and defensive-sector performance to judge whether the move has staying power."
      ]
    },
    {
      title: "Sector rotation favors quality and strong balance sheets",
      source: "MacroVision",
      summary: "Large-cap technology and health care are attracting part of the flow, while energy and financials show wider dispersion.",
      body: [
        "The sector read-through points to a preference for companies with resilient margins, liquidity and clearer earnings visibility.",
        "The key for the next sessions is to separate tactical profit-taking from a genuine deterioration in risk appetite."
      ]
    },
    {
      title: "The dollar and yields return to the center of the macro board",
      source: "MacroVision",
      summary: "Currencies and sovereign debt continue to set the tone for commodities, emerging markets and growth valuations.",
      body: [
        "Dollar moves are shaping the read on commodities and international assets. A sustained rebound could tighten financial conditions.",
        "For short-term investors, confirmation usually comes through volume, level breaks and consistency across fixed income and equities."
      ]
    }
  ]
};

const localizedEvents = {
  es: [
    { time: "09:00", title: "PMI manufacturero Eurozona", impact: "Media" },
    { time: "14:30", title: "Datos de empleo EE. UU.", impact: "Alta" },
    { time: "16:00", title: "Confianza del consumidor", impact: "Media" },
    { time: "20:00", title: "Comparecencia banco central", impact: "Alta" }
  ],
  en: [
    { time: "09:00", title: "Eurozone manufacturing PMI", impact: "Medium" },
    { time: "14:30", title: "U.S. employment data", impact: "High" },
    { time: "16:00", title: "Consumer confidence", impact: "Medium" },
    { time: "20:00", title: "Central bank remarks", impact: "High" }
  ]
};

const localizedVideos = {
  es: [
    { title: "Resumen macro semanal", meta: "Briefing editorial", url: "https://www.youtube.com/embed?listType=search&list=Noticias%20MacroVision%20mercados" },
    { title: "Claves para vigilar índices", meta: "Análisis técnico", url: "https://www.youtube.com/embed?listType=search&list=MacroVision%20indices%20mercados" },
    { title: "Dólar, bonos y materias primas", meta: "Contexto global", url: "https://www.youtube.com/embed?listType=search&list=MacroVision%20dolar%20bonos" }
  ],
  en: [
    { title: "Weekly macro briefing", meta: "Editorial briefing", url: "https://www.youtube.com/embed?listType=search&list=MacroVision%20markets%20macro%20briefing" },
    { title: "Key levels to watch in indices", meta: "Technical analysis", url: "https://www.youtube.com/embed?listType=search&list=MacroVision%20indices%20markets" },
    { title: "Dollar, bonds and commodities", meta: "Global context", url: "https://www.youtube.com/embed?listType=search&list=MacroVision%20dollar%20bonds" }
  ]
};

const dictionary = {
  es: {
    nav_home: "Inicio",
    nav_markets: "Mercados",
    nav_analysis: "Análisis",
    nav_news: "Actualidad",
    nav_videos: "Vídeos",
    nav_contact: "Contacto",
    cta_access: "Solicitar acceso",
    hero_eyebrow: "Terminal profesional de inteligencia macro",
    hero_title: "Análisis financiero, mercados en vivo y noticias macroeconómicas en una sola terminal.",
    hero_intro: "Centraliza vigilancia de índices, renta variable, criptomonedas, divisas y materias primas en una interfaz profesional, rápida y orientada a decisiones.",
    hero_primary: "Ver terminal",
    hero_secondary: "Explorar análisis",
    session_label: "Sesión",
    risk_label: "Riesgo",
    signal_label: "Señal principal",
    session_closed: "Mercados cerrados",
    session_europe_us: "Europa + Wall Street",
    session_us: "Wall Street abierto",
    session_europe: "Europa abierta",
    risk_moderate: "Moderado",
    signal_active: "Momentum activo",
    markets_eyebrow: "Mercados",
    markets_title: "Panel operativo de mercados en vivo",
    markets_intro: "Consulta activos financieros, gráficos, volatilidad, liquidez y rotación sectorial desde un entorno orientado a seguimiento profesional.",
    live_pill: "Datos en vivo cuando la API está disponible",
    selected_asset: "Activo seleccionado",
    chart_loading: "Cargando gráfico",
    chart_loading_text: "El panel se activará en cuanto TradingView esté disponible.",
    metric_volatility: "Volatilidad",
    metric_momentum: "Momentum",
    metric_liquidity: "Liquidez",
    metric_range: "Rango diario",
    level_low: "Baja",
    level_medium: "Media",
    level_high: "Alta",
    momentum_positive: "Constructivo",
    momentum_negative: "Defensivo",
    watchlist_kicker: "Lista de seguimiento",
    watchlist_title: "Activos vigilados",
    symbol_label: "Símbolo",
    symbol_placeholder: "Ej. SPY, EURUSD",
    heatmap_kicker: "Mapa sectorial",
    heatmap_title: "Mapa de calor",
    sector_tech: "Tecnología",
    sector_health: "Salud",
    sector_energy: "Energía",
    sector_financials: "Finanzas",
    sector_industrials: "Industria",
    sector_consumer: "Consumo",
    analysis_eyebrow: "Análisis",
    analysis_title: "Análisis macroeconómico y técnico",
    analysis_intro: "Lecturas de inflación, bancos centrales, rotación de cartera y niveles técnicos relevantes para interpretar el contexto de mercado.",
    tag_macro: "Macro",
    tag_risk: "Riesgo",
    tag_technical: "Técnico",
    insight_macro_title: "Inflación y bancos centrales",
    insight_macro_text: "El mercado descuenta una senda de tipos más estable. La clave está en salarios, energía y expectativas de crecimiento.",
    insight_risk_title: "Rotación de cartera",
    insight_risk_text: "El flujo alterna entre tecnología de alta capitalización y sectores defensivos mientras se ajustan las primas de riesgo.",
    insight_technical_title: "Niveles a vigilar",
    insight_technical_text: "La reacción en soportes semanales y rupturas con volumen ayuda a separar ruido intradía de movimiento direccional.",
    nav_smart_money: "Smart Money",
    smart_money_eyebrow: "Smart Money",
    smart_money_title: "Portfolios de los inversores más exitosos del mundo",
    smart_money_intro: "Seguimiento de Berkshire Hathaway, Pershing Square, Scion Capital y otros gestores legendarios.",
    consensus_kicker: "Consensus Portfolio",
    consensus_title: "Acciones más repetidas",
    alerts_kicker: "Smart Money Alerts",
    alerts_title: "Últimos movimientos detectados",
    news_eyebrow: "Actualidad",
    news_title: "Noticias macroeconómicas y briefing de mercado",
    news_intro: "Titulares desarrollados como síntesis editorial propia, con referencias públicas y notas de atribución para una lectura responsable.",
    refresh_news: "Actualizar",
    news_status_pending: "Última actualización: pendiente",
    news_status_loading: "Actualizando noticias...",
    news_status_updated: "Última actualización:",
    news_status_fallback: "Mostrando briefing editorial local. La API no está disponible ahora mismo.",
    calendar_kicker: "Calendario",
    calendar_title: "Eventos clave",
    event_impact: "Impacto",
    articles_eyebrow: "Lectura ampliada",
    articles_title: "Artículos de actualidad",
    article_empty_tag: "Selecciona una noticia",
    article_empty_title: "Abre cualquier titular del briefing para leer el desarrollo completo.",
    article_empty_text: "Cada artículo está redactado como síntesis editorial propia y contiene una nota de atribución para evitar reproducir material protegido.",
    source_open: "Abrir fuente",
    article_note: "Síntesis editorial con finalidad informativa. Contrasta siempre datos sensibles con fuentes oficiales o profesionales cualificados.",
    videos_eyebrow: "Canal de YouTube",
    videos_title: "Últimos vídeos de Noticias Macrovisión",
    videos_intro: "Acceso directo al canal oficial, vídeos recientes, shorts y emisiones para ampliar el seguimiento de actualidad financiera.",
    open_channel: "Abrir canal",
    video_placeholder_title: "Selecciona un vídeo",
    video_placeholder_text: "Accede a los últimos vídeos, shorts y directos publicados en el canal Noticias Macrovisión.",
    video_list_kicker: "Publicaciones recientes",
    video_list_title: "Lista editorial",
    youtube_note: "Selección editorial preparada para integrarse con el canal oficial.",
    contact_eyebrow: "Acceso profesional",
    contact_title: "Prepara tu mesa de análisis con Macrovisión.",
    contact_intro: "Solicita una demo, configura tus activos principales y define alertas para tu operativa diaria.",
    form_name: "Nombre",
    form_name_placeholder: "Tu nombre",
    form_email: "Correo electrónico",
    form_email_placeholder: "nombre@empresa.com",
    form_submit: "Enviar solicitud",
    form_success: "Solicitud registrada. Te contactaremos pronto.",
    legal_note_title: "Aviso informativo",
    legal_note_text: "La información publicada en Macrovisión tiene carácter exclusivamente informativo y educativo. No constituye asesoramiento financiero, recomendación de inversión, oferta de compra o venta de instrumentos financieros ni sustituto de una evaluación profesional independiente.",
    footer_brand_text: "Terminal profesional de mercados, análisis macroeconómico y seguimiento financiero en tiempo real.",
    footer_markets_title: "Mercados",
    footer_news: "Noticias",
    footer_legal_title: "Legal",
    footer_privacy: "Privacidad",
    footer_legal_notice: "Aviso legal",
    footer_country: "España"
  },
  en: {
    nav_home: "Home",
    nav_markets: "Markets",
    nav_analysis: "Analysis",
    nav_news: "News",
    nav_videos: "Videos",
    nav_contact: "Contact",
    cta_access: "Request access",
    hero_eyebrow: "Professional macro intelligence terminal",
    hero_title: "Financial analysis, live markets and macroeconomic news in a single terminal.",
    hero_intro: "Centralize monitoring of indices, equities, cryptocurrencies, FX and commodities in a fast professional interface built for decisions.",
    hero_primary: "View terminal",
    hero_secondary: "Explore analysis",
    session_label: "Session",
    risk_label: "Risk",
    signal_label: "Main signal",
    session_closed: "Markets closed",
    session_europe_us: "Europe + Wall Street",
    session_us: "Wall Street open",
    session_europe: "Europe open",
    risk_moderate: "Moderate",
    signal_active: "Active momentum",
    markets_eyebrow: "Markets",
    markets_title: "Live market operating panel",
    markets_intro: "Monitor financial assets, charts, volatility, liquidity and sector rotation from a professional tracking environment.",
    live_pill: "Live data when the API is available",
    selected_asset: "Selected asset",
    chart_loading: "Loading chart",
    chart_loading_text: "The panel will activate as soon as TradingView is available.",
    metric_volatility: "Volatility",
    metric_momentum: "Momentum",
    metric_liquidity: "Liquidity",
    metric_range: "Daily range",
    level_low: "Low",
    level_medium: "Medium",
    level_high: "High",
    momentum_positive: "Constructive",
    momentum_negative: "Defensive",
    watchlist_kicker: "Watchlist",
    watchlist_title: "Tracked assets",
    symbol_label: "Symbol",
    symbol_placeholder: "E.g. SPY, EURUSD",
    heatmap_kicker: "Sector map",
    heatmap_title: "Heat map",
    sector_tech: "Technology",
    sector_health: "Health Care",
    sector_energy: "Energy",
    sector_financials: "Financials",
    sector_industrials: "Industrials",
    sector_consumer: "Consumer",
    analysis_eyebrow: "Analysis",
    analysis_title: "Macroeconomic and technical analysis",
    analysis_intro: "Inflation, central-bank, portfolio-rotation and technical-level reads to interpret the market backdrop.",
    tag_macro: "Macro",
    tag_risk: "Risk",
    tag_technical: "Technical",
    insight_macro_title: "Inflation and central banks",
    insight_macro_text: "Markets are pricing a more stable rate path. The key variables are wages, energy and growth expectations.",
    insight_risk_title: "Portfolio rotation",
    insight_risk_text: "Flows alternate between large-cap technology and defensive sectors while risk premia continue to adjust.",
    insight_technical_title: "Levels to watch",
    insight_technical_text: "Reactions at weekly support levels and volume-backed breakouts help separate intraday noise from directional moves.",
    nav_smart_money: "Smart Money",
    smart_money_eyebrow: "Smart Money",
    smart_money_title: "Portfolios of the world's most successful investors",
    smart_money_intro: "Track Berkshire Hathaway, Pershing Square, Scion Capital and other legendary fund managers.",
    consensus_kicker: "Consensus Portfolio",
    consensus_title: "Most repeated positions",
    alerts_kicker: "Smart Money Alerts",
    alerts_title: "Latest detected movements",
    news_eyebrow: "Market News",
    news_title: "Macroeconomic news and market briefing",
    news_intro: "Headlines developed as proprietary editorial summaries, with public references and attribution notes for responsible reading.",
    refresh_news: "Refresh",
    news_status_pending: "Last update: pending",
    news_status_loading: "Refreshing news...",
    news_status_updated: "Last update:",
    news_status_fallback: "Showing local editorial briefing. The API is not available right now.",
    calendar_kicker: "Calendar",
    calendar_title: "Key events",
    event_impact: "Impact",
    articles_eyebrow: "Extended read",
    articles_title: "Current market articles",
    article_empty_tag: "Select a story",
    article_empty_title: "Open any briefing headline to read the full article.",
    article_empty_text: "Each article is written as a proprietary editorial summary and includes an attribution note to avoid reproducing protected material.",
    source_open: "Open source",
    article_note: "Editorial summary for informational purposes. Always verify sensitive data with official sources or qualified professionals.",
    videos_eyebrow: "YouTube channel",
    videos_title: "Latest videos from Noticias MacroVision",
    videos_intro: "Direct access to the official channel, recent videos, shorts and live streams to expand your financial-news monitoring.",
    open_channel: "Open channel",
    video_placeholder_title: "Select a video",
    video_placeholder_text: "Access the latest videos, shorts and live streams published on the Noticias MacroVision channel.",
    video_list_kicker: "Recent posts",
    video_list_title: "Editorial list",
    youtube_note: "Editorial selection prepared for integration with the official channel.",
    contact_eyebrow: "Professional access",
    contact_title: "Prepare your analysis desk with MacroVision.",
    contact_intro: "Request a demo, configure your main assets and define alerts for your daily workflow.",
    form_name: "Name",
    form_name_placeholder: "Your name",
    form_email: "Email",
    form_email_placeholder: "name@company.com",
    form_submit: "Send request",
    form_success: "Request registered. We will contact you soon.",
    legal_note_title: "Informational notice",
    legal_note_text: "The information published on MacroVision is strictly informational and educational. It does not constitute financial advice, an investment recommendation, an offer to buy or sell financial instruments, or a substitute for an independent professional assessment.",
    footer_brand_text: "Professional market terminal for macroeconomic analysis and real-time financial monitoring.",
    footer_markets_title: "Markets",
    footer_news: "News",
    footer_legal_title: "Legal",
    footer_privacy: "Privacy",
    footer_legal_notice: "Legal notice",
    footer_country: "Spain"
  }
};

const state = {
  symbols: new Map(marketData.map((item) => [item.symbol, { ...item }])),
  activeSymbol: "SPY",
  intervals: [],
  watchlist: loadWatchlist(),
  currentLang: localStorage.getItem("mv_lang") || "es",
  news: [],
  liveNews: [],
  selectedArticle: null,
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
  state.news = getLocalizedNews();
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
  setLanguage(state.currentLang);
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
  state.currentLang = dictionary[lang] ? lang : "es";
  const dict = dictionary[state.currentLang] || dictionary.es;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dict[element.dataset.i18n];
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = dict[element.dataset.i18nPlaceholder];
    if (value) element.setAttribute("placeholder", value);
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.currentLang);
  });

  localStorage.setItem("mv_lang", state.currentLang);
  document.documentElement.lang = state.currentLang;
  document.title = state.currentLang === "en"
    ? "MacroVision | Financial analysis and live markets"
    : "Macrovisión | Análisis financiero y mercados en vivo";

  if (!state.liveNews.length) state.news = getLocalizedNews();
  renderHeroData();
  updateUI();
  renderEvents();
  renderVideos();
  renderNews();
  renderSelectedArticle();
}

function renderHeroData() {
  const hour = new Date().getHours();
  let session = t("session_closed");

  if (hour >= 15 && hour < 17) session = t("session_europe_us");
  else if (hour >= 15 && hour < 22) session = t("session_us");
  else if (hour >= 9 && hour < 17) session = t("session_europe");

  setText("session-state", session);
  setText("risk-state", t("risk_moderate"));
  setText("signal-state", t("signal_active"));
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
    console.warn("No se pudieron actualizar los datos de mercado", symbol, error);
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
  setText("metric-volatility", translateLevel(asset.volatility));
  setText("metric-momentum", change >= 0 ? t("momentum_positive") : t("momentum_negative"));
  setText("metric-liquidity", translateLevel(asset.liquidity));
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
  setText("news-status", t("news_status_loading"));

  try {
    const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const liveNews = Array.isArray(data) ? data.slice(0, 6).map((item) => ({
      title: item.headline || (state.currentLang === "en" ? "Market headline" : "Titular de mercado"),
      source: item.source || (state.currentLang === "en" ? "Public source" : "Fuente pública"),
      summary: item.summary || (state.currentLang === "en" ? "Summary not available." : "Resumen no disponible."),
      url: item.url,
      body: [
        item.summary || (state.currentLang === "en" ? "The source did not provide an expanded summary." : "La noticia no incluye un resumen ampliado desde la fuente consultada."),
        state.currentLang === "en"
          ? "MacroVision shows this content as an informational reference and recommends checking the original source before making decisions."
          : "Macrovisión muestra este contenido como referencia informativa y recomienda contrastarlo con la fuente original antes de tomar decisiones."
      ],
      isLive: true
    })) : [];

    if (liveNews.length) {
      state.liveNews = liveNews;
      state.news = liveNews;
    }
    renderNews();
    setText("news-status", `${t("news_status_updated")} ${new Date().toLocaleTimeString(state.currentLang === "en" ? "en-US" : "es-ES", { hour: "2-digit", minute: "2-digit" })}`);
  } catch (error) {
    console.warn("No se pudieron cargar noticias en vivo", error);
    state.liveNews = [];
    state.news = getLocalizedNews();
    renderNews();
    if (status) status.textContent = t("news_status_fallback");
  }
}

function renderNews() {
  const container = document.getElementById("news-track");
  if (!container) return;

  container.replaceChildren(...state.news.map((item, index) => {
    item.localIndex = Number.isInteger(item.localIndex) ? item.localIndex : index;
    const button = document.createElement("button");
    button.className = `news-item${index === 0 ? " breaking" : ""}`;
    button.type = "button";

    const source = document.createElement("span");
    source.className = "news-source";
    source.textContent = item.source || (state.currentLang === "es" ? "Macrovisión" : "MacroVision");

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
  state.selectedArticle = item;

  const sourceLink = item.url
    ? `<div class="source-list"><a href="${escapeAttribute(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("source_open"))}</a></div>`
    : "";

  article.innerHTML = `
    <span class="tag">${escapeHtml(item.source || (state.currentLang === "es" ? "Macrovisión" : "MacroVision"))}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <div class="article-body">
      ${(item.body || [item.summary]).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </div>
    <p class="copyright-note">${escapeHtml(t("article_note"))}</p>
    ${sourceLink}
  `;
}

function renderSelectedArticle() {
  if (state.selectedArticle) {
    if (!state.selectedArticle.isLive) {
      const localized = getLocalizedNews()[state.selectedArticle.localIndex]
        || getLocalizedNews()[0];
      state.selectedArticle = localized;
    }
    renderArticle(state.selectedArticle);
  }
}

function renderEvents() {
  const container = document.getElementById("event-list");
  if (!container) return;

  container.replaceChildren(...getLocalizedEvents().map((event) => {
    const item = document.createElement("article");
    item.className = "event-item";
    item.innerHTML = `<strong>${escapeHtml(event.title)}</strong><span>${escapeHtml(event.time)} · ${escapeHtml(t("event_impact"))} ${escapeHtml(event.impact)}</span>`;
    return item;
  }));
}

function renderVideos() {
  const list = document.getElementById("video-list");
  const featured = document.getElementById("featured-video");
  if (!list || !featured) return;

  const videos = getLocalizedVideos();
  setText("youtube-note", t("youtube_note"));
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
    setText("form-status", t("form_success"));
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

function t(key) {
  return dictionary[state.currentLang]?.[key] || dictionary.es[key] || key;
}

function getLocalizedNews() {
  return (localizedNews[state.currentLang] || localizedNews.es).map((item, index) => ({ ...item, localIndex: index }));
}

function getLocalizedEvents() {
  return localizedEvents[state.currentLang] || localizedEvents.es;
}

function getLocalizedVideos() {
  return localizedVideos[state.currentLang] || localizedVideos.es;
}

function translateLevel(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "alta") return t("level_high");
  if (normalized === "media") return t("level_medium");
  if (normalized === "baja") return t("level_low");
  return value || t("level_medium");
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
const smartMoneyData = [

{
name:"Warren Buffett",
fund:"Berkshire Hathaway",
holdings:[
["Apple",22],
["American Express",17],
["Coca-Cola",12],
["Bank of America",10],
["Chevron",7]
]
},

{
name:"Bill Ackman",
fund:"Pershing Square",
holdings:[
["Uber",19],
["Alphabet",18],
["Hilton",16],
["Chipotle",14],
["Restaurant Brands",11]
]
},

{
name:"Michael Burry",
fund:"Scion Capital",
holdings:[
["Alibaba",18],
["JD.com",14],
["Baidu",12],
["Estée Lauder",10],
["HCA Healthcare",9]
]
}

];

renderSmartMoney();

function renderSmartMoney(){

const grid =
document.getElementById("smart-grid");

if(!grid) return;

grid.innerHTML="";

smartMoneyData.forEach(investor=>{

const card=document.createElement("div");

card.className="investor-card";

card.innerHTML=`

<div class="investor-header">

<div>

<div class="investor-name">
${investor.name}
</div>

<div>
${investor.fund}
</div>

</div>

</div>

${investor.holdings.map(h=>`

<div class="holding">

<div class="holding-label">

<span>${h[0]}</span>

<span>${h[1]}%</span>

</div>

<div class="holding-bar">

<div
class="holding-fill"
style="width:${h[1]}%">
</div>

</div>

</div>

`).join("")}

`;

grid.appendChild(card);

});

renderConsensus();

renderAlerts();

}
function renderConsensus(){

const consensus = [

["Microsoft",95],
["Amazon",92],
["Alphabet",91],
["Meta",89],
["Visa",84]

];

const container =
document.getElementById(
"consensus-list"
);

container.innerHTML="";

consensus.forEach(stock=>{

container.innerHTML += `

<div class="consensus-stock">

<span>${stock[0]}</span>

<strong>${stock[1]}</strong>

</div>

`;

});

}
function renderAlerts(){

const alerts=[

"Buffett reduce Chevron",

"Ackman aumenta Uber",

"Scion incrementa Alibaba",

"Nueva posición detectada en Alphabet"

];

const container=
document.getElementById(
"smart-alerts"
);

container.innerHTML="";

alerts.forEach(alert=>{

container.innerHTML +=

`<div class="smart-alert">
🚨 ${alert}
</div>`;

});

}