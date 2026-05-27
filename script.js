"use strict";

/* =========================
   FINNHUB API
========================= */

const API_KEY = "d8bmgk9r01qppd8sdnm0d8bmgk9r01qppd8sdnmg";

/* =========================
   MARKET DATA
========================= */

const marketData = [
  { symbol: "AAPL", name: "Apple", price: 0, change: 0, volatility: "Media", liquidity: "Alta", range: 1.9 },
  { symbol: "MSFT", name: "Microsoft", price: 0, change: 0, volatility: "Media", liquidity: "Alta", range: 2.1 },
  { symbol: "NVDA", name: "NVIDIA", price: 0, change: 0, volatility: "Alta", liquidity: "Alta", range: 3.8 },
  { symbol: "TSLA", name: "Tesla", price: 0, change: 0, volatility: "Alta", liquidity: "Alta", range: 3.2 },
  { symbol: "AMZN", name: "Amazon", price: 0, change: 0, volatility: "Media", liquidity: "Alta", range: 1.7 },
  { symbol: "GOOGL", name: "Alphabet", price: 0, change: 0, volatility: "Media", liquidity: "Alta", range: 1.3 },
  { symbol: "BTCUSD", name: "Bitcoin", price: 0, change: 0, volatility: "Alta", liquidity: "Alta", range: 4.2 },
  { symbol: "EURUSD", name: "Euro / Dólar", price: 0, change: 0, volatility: "Baja", liquidity: "Alta", range: 0.5 },
  { symbol: "XAUUSD", name: "Oro", price: 0, change: 0, volatility: "Media", liquidity: "Alta", range: 1.1 },
  { symbol: "SPY", name: "S&P 500 ETF", price: 0, change: 0, volatility: "Media", liquidity: "Alta", range: 1.0 },
  { symbol: "QQQ", name: "Nasdaq 100 ETF", price: 0, change: 0, volatility: "Alta", liquidity: "Alta", range: 1.6 }
];

/* =========================
   STATE
========================= */

const state = {
  symbols: new Map(marketData.map(i => [i.symbol, { ...i }])),
  activeSymbol: "SPY",
  intervals: [],
  watchlist: loadWatchlist()
};

const newsItems = [];

/* =========================
   INIT (SINGLE ENTRY POINT)
========================= */

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {

  renderHeroData();
  bindWatchlist();

  await fetchLiveMarketData();

  renderTicker();
  renderWatchlist();
  selectSymbol(state.activeSymbol);

  startLiveUpdates();
  fetchMarketNews();

  renderFooter(); // 👈 FOOTER PAGE
}

/* =========================
   HERO
========================= */

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

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* =========================
   WATCHLIST
========================= */

function loadWatchlist() {
  try {
    return JSON.parse(localStorage.getItem("watchlist")) || ["SPY", "QQQ", "BTCUSD"];
  } catch {
    return ["SPY", "QQQ", "BTCUSD"];
  }
}

function saveWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
}

function bindWatchlist() {

  const form = document.getElementById("watchlist-form");
  const input = document.getElementById("symbol-input");

  if (!form || !input) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const symbol = input.value.trim().toUpperCase();
    if (!symbol) return;

    if (!state.symbols.has(symbol)) {
      state.symbols.set(symbol, { symbol, name: symbol, price: 0, change: 0, volatility: "Media", liquidity: "Media", range: 1 });
    }

    if (!state.watchlist.includes(symbol)) {
      state.watchlist.push(symbol);
      saveWatchlist();
    }

    await fetchSingleSymbol(symbol);

    renderTicker();
    renderWatchlist();
    selectSymbol(symbol);

    input.value = "";
  });
}

/* =========================
   RENDER WATCHLIST
========================= */

function renderWatchlist() {

  const container = document.getElementById("watchlist-container");
  if (!container) return;

  container.innerHTML = state.watchlist.map(symbol => {

    const asset = state.symbols.get(symbol);
    if (!asset) return "";

    const sign = asset.change >= 0 ? "+" : "";
    const cls = asset.change >= 0 ? "positive" : "negative";

    return `
      <button class="watchlist-select" data-symbol="${symbol}">
        <strong>${symbol}</strong>
        <span>
          ${formatPrice(asset)} · 
          <span class="${cls}">${sign}${Number(asset.change || 0).toFixed(2)}%</span>
        </span>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".watchlist-select")
    .forEach(btn => btn.addEventListener("click", () => selectSymbol(btn.dataset.symbol)));
}

/* =========================
   TICKER
========================= */

function renderTicker() {

  const track = document.getElementById("ticker-track");
  if (!track) return;

  const html = [...state.symbols.values()].map(createTicker).join("");

  track.innerHTML = html + html;

  track.querySelectorAll(".ticker-item")
    .forEach(i => i.addEventListener("click", () => selectSymbol(i.dataset.symbol)));
}

function createTicker(asset) {

  const sign = asset.change >= 0 ? "+" : "";
  const cls = asset.change >= 0 ? "positive" : "negative";

  return `
    <button class="ticker-item" data-symbol="${asset.symbol}">
      <strong>${asset.symbol}</strong>
      <span class="${cls}">
        ${sign}${asset.change.toFixed(2)}% ${formatPrice(asset)}
      </span>
    </button>
  `;
}

/* =========================
   API
========================= */

async function fetchLiveMarketData() {
  await Promise.all([...state.symbols.keys()].map(fetchSingleSymbol));
  updateUI();
}

async function fetchSingleSymbol(symbol) {

  try {

    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.warn("API error", symbol, res.status);
      return;
    }

    const data = await res.json();

    if (!data || typeof data.c !== "number") return;

    const asset = state.symbols.get(symbol);
    if (!asset) return;

    asset.price = data.c;
    asset.change = data.pc ? (((data.c - data.pc) / data.pc) * 100).toFixed(2) : 0;

  } catch (e) {
    console.error("fetch error", symbol, e);
  }
}

/* =========================
   UI UPDATE
========================= */

function updateUI() {

  renderTicker();
  renderWatchlist();

  const asset = state.symbols.get(state.activeSymbol);
  if (!asset) return;

  setText("selected-symbol", state.activeSymbol);
  setText("selected-price", formatPrice(asset));

  const el = document.getElementById("selected-change");
  if (el) {
    el.textContent = `${asset.change >= 0 ? "+" : ""}${asset.change}%`;
    el.className = asset.change >= 0 ? "positive" : "negative";
  }
}

/* =========================
   SELECT
========================= */

function selectSymbol(symbol) {
  state.activeSymbol = symbol;
  updateUI();
}

/* =========================
   FORMAT
========================= */

function formatPrice(a) {

  if (a.symbol === "EURUSD") return Number(a.price).toFixed(4);

  if (a.symbol === "BTCUSD")
    return `$${Number(a.price).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return `$${Number(a.price).toFixed(2)}`;
}

/* =========================
   NEWS
========================= */

async function fetchMarketNews() {

  try {

    const res = await fetch(`https://finnhub.io/api/news?token=${API_KEY}`);
    const data = await res.json();

    newsItems.length = 0;

    data.slice(0, 6).forEach((n, i) => {
      newsItems.push({
        title: n.headline,
        summary: n.summary,
        slug: "n" + i
      });
    });

    renderNews();

  } catch (e) {
    console.error(e);
  }
}

function renderNews() {

  const el = document.getElementById("news-track");
  if (!el) return;

  el.innerHTML = newsItems.map(n => `
    <div class="news-item">
      <strong>${n.title}</strong>
      <p>${n.summary}</p>
    </div>
  `).join("");
}

/* =========================
   FOOTER PAGES (NUEVO)
========================= */

function renderFooter() {

  const footer = document.getElementById("footer-pages");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-grid">

      <div>
        <h4>MacroVisión</h4>
        <p>Plataforma de análisis de mercados en tiempo real.</p>
      </div>

      <div>
        <h4>Pages</h4>
        <a href="#markets">Markets</a><br>
        <a href="#news">News</a><br>
        <a href="#analysis">Analysis</a><br>
        <a href="#contact">Contact</a>
      </div>

      <div>
        <h4>Legal</h4>
        <a href="#privacy">Privacy Policy</a><br>
        <a href="#terms">Terms</a>
      </div>

    </div>

    <div class="footer-bottom">
      © ${new Date().getFullYear()} MacroVisión. Todos los derechos reservados.
    </div>
  `;
}

/* =========================
   LIVE LOOP
========================= */

function startLiveUpdates() {
  state.intervals.push(setInterval(fetchLiveMarketData, 15000));
}