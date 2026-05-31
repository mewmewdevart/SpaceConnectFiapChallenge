/**
 * bottombar.js — Componente compartilhado da Barra de Telemetria
 * 
 * Monta o footer de telemetria e atualiza o relógio em tempo real.
 * 
 * Uso: Adicionar <div id="bottombar-container"></div> no <body>
 *      e incluir <script src="assets/js/components/bottombar.js"></script>
 */
(function () {
  // ── HTML do componente ──
  const bottombarHTML = `
    <footer class="bottombar">
      <span class="telem telem-title"><span class="telem-dot"></span> LIVE TELEMETRY</span>
      <div class="marquee-window">
        <div class="telem-marquee">
          <span class="telem">DSN NOMINAL · 1.28s</span>
          <span class="telem">POWER 96.4 kW</span>
          <span class="telem">H₂O ACI 42.5 G</span>
          <span class="telem">SHAB SYS 14.7 V</span>
          <span class="telem">EXT 8,200 kg/h</span>
          <span class="telem">CIV 24.33 / 26.08 I</span>
        </div>
      </div>
      <span class="telem-clock" id="clock">PRIME    SOL 0427 · 00:00:00</span>
    </footer>`;

  // ── Injetar no DOM ──
  const container = document.getElementById('bottombar-container');
  if (container) {
    container.outerHTML = bottombarHTML;
  } else {
    // Se não houver container, insere antes do fechamento do body
    document.body.insertAdjacentHTML('beforeend', bottombarHTML);
  }

  // ── Relógio em tempo real ──
  function updateClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      clockEl.textContent = `PRIME    SOL 0427 · ${h}:${m}:${s}`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
})();
