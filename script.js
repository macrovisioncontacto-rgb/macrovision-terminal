"use strict";

/* =========================
   CONFIG
========================= */

const CONFIG = {
  API_KEY: "TU_API_KEY",
  BASE_URL: "https://finnhub.io/api/v1",
  REFRESH_MS: 15000
};

/* =========================
   STATE MANAGER (mini Redux)
========================= */

const store = {
  state: {
    symbols: new Map(),
    watchlist: [],
    active: "SPY",
    loading: false,
    lastUpdate: null
  },

  listeners: new Set(),

  get(key) {
    return this.state[key];
  },

  set(key, value) {
    this.state[key] = value;
    this.emit();
  },

  patch(obj) {
    Object.assign(this.state, obj);
    this.emit();
  },

  emit() {
    this.listeners.forEach(fn => fn(this.state));
  },

  subscribe(fn) {
    this.listeners.add(fn);
  }
};

/* =========================
   INIT DATA
========================= */

const DEFAULTS = [
  "AAPL","MSFT","NVDA","TSLA","AMZN",
  "GOOGL","BTCUSD","EURUSD","XAUUSD","SPY","QQQ"
];

function initSymbols() {
  const map = new Map();

  DEFAULTS.forEach(s => {
    map.set(s, {
      symbol: s,
      price: 0,
      change: 0,
      volatility: "Media",
      liquidity: "Alta",
      range: 1
    });
  });

  store.patch({ symbols: map });
}

/* =========================
   API LAYER
========================= */

const api = {

  async quote(symbol) {

    const url = `${CONFIG.BASE_URL}/quote?symbol=${symbol}&token=${CONFIG.API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error(`API ${res.status}`);

    return res.json();
  },

  async batchQuotes(symbols) {

    return Promise.all(
      symbols.map(s => this.quote(s).then(d => ({ symbol: s, data: d })))
    );
  }
};

/* =========================
   NORMALIZER
========================= */

function normalize(symbol) {

  const map = {
    BTCUSD: "BINANCE:BTCUSDT",
    EURUSD: "OANDA:EUR_USD",
    XAUUSD: "OANDA:XAU_USD"
  };

  return map[symbol] || symbol;
}

/* =========================
   UPDATE ENGINE
========================= */

async function updateMarket() {

  try {

    const symbols = [...store.get("symbols").keys()];

    const results = await api.batchQuotes(symbols);

    const symbolsMap = store.get("symbols");

    results.forEach(({ symbol, data }) => {

      const asset = symbolsMap.get(symbol);
      if (!asset || !data) return;

      asset.price = data.c || 0;
      asset.change = data.pc
        ? (((data.c - data.pc) / data.pc) * 100).toFixed(2)
        : 0;
    });

    store.patch({
      symbols: new Map(symbolsMap),
      lastUpdate: Date.now()
    });

  } catch (e) {
    console.error("market update error", e);
  }
}

/* =========================
   UI ENGINE (REACTIVE)
========================= */

const ui = {

  mount() {

    store.subscribe((state) => {
      this.render(state);
    });

  },

  render(state) {

    this.renderHeader(state);
    this.renderTicker(state);
    this.renderWatchlist(state);
    this.renderFooter();
  },

  renderHeader(state) {

    const asset = state.symbols.get(state.active);

    if (!asset) return;

    set("selected-symbol", asset.symbol);
    set("selected-price", format(asset));
  },

  renderTicker(state) {

    const el = document.getElementById("ticker-track");
    if (!el) return;

    const html = [...state.symbols.values()]
      .map(ticker)
      .join("");

    el.innerHTML = html + html;
  },

  renderWatchlist(state) {

    const el = document.getElementById("watchlist-container");
    if (!el) return;

    el.innerHTML = state.watchlist
      .map(s => {

        const a = state.symbols.get(s);
        if (!a) return "";

        return `
          <button class="watch-item" data-symbol="${s}">
            ${s} ${format(a)} ${a.change}%
          </button>
        `;
      }).join("");

    el.querySelectorAll("[data-symbol]")
      .forEach(btn => {
        btn.onclick = () => {
          store.patch({ active: btn.dataset.symbol });
        };
      });
  },

  renderFooter() {

    const el = document.getElementById("footer-pages");
    if (!el) return;

    el.innerHTML = `
      <div class="footer-pro">
        <div>
          <h3>MacroVision Pro</h3>
          <p>Real-time market intelligence system</p>
        </div>

        <div>
          <a href="#markets">Markets</a>
          <a href="#news">News</a>
          <a href="#analytics">Analytics</a>
        </div>

        <div>
          <a href="#legal">Legal</a>
          <a href="#privacy">Privacy</a>
        </div>
      </div>

      <div class="footer-bottom">
        © ${new Date().getFullYear()} MacroVision Pro
      </div>
    `;
  }
};

/* =========================
   HELPERS
========================= */

function set(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function format(asset) {

  if (asset.symbol === "EURUSD")
    return Number(asset.price).toFixed(4);

  if (asset.symbol === "BTCUSD")
    return `$${Number(asset.price).toLocaleString()}`;

  return `$${Number(asset.price).toFixed(2)}`;
}

function ticker(asset) {

  const sign = asset.change >= 0 ? "+" : "";

  return `
    <button class="ticker-item" data-symbol="${asset.symbol}">
      ${asset.symbol}
      <span>${sign}${asset.change}% ${format(asset)}</span>
    </button>
  `;
}

/* =========================
   WATCHLIST
========================= */

function loadWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist")) || ["SPY","QQQ","BTCUSD"];
}

function saveWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(store.get("watchlist")));
}

/* =========================
   EVENTS
========================= */

function bindEvents() {

  const form = document.getElementById("watchlist-form");
  const input = document.getElementById("symbol-input");

  if (form) {
    form.onsubmit = (e) => {

      e.preventDefault();

      const symbol = input.value.toUpperCase();

      const watch = store.get("watchlist");

      if (!watch.includes(symbol)) {
        watch.push(symbol);
        store.patch({ watchlist: watch });
        saveWatchlist();
      }

      input.value = "";
    };
  }
}

/* =========================
   FOOTER / PAGES ROUTING READY
========================= */

function initRouter() {

  window.addEventListener("hashchange", () => {

    const page = location.hash.replace("#", "");

    document.querySelectorAll("[data-page]")
      .forEach(p => p.style.display = "none");

    const active = document.querySelector(`[data-page="${page}"]`);

    if (active) active.style.display = "block";
  });
}

/* =========================
   START APP
========================= */

async function start() {

  initSymbols();

  store.patch({
    watchlist: loadWatchlist()
  });

  ui.mount();
  bindEvents();
  initRouter();

  await updateMarket();

  setInterval(updateMarket, CONFIG.REFRESH_MS);
}

document.addEventListener("DOMContentLoaded", start);