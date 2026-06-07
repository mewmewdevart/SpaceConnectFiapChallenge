(function () {
  "use strict";

  // Lógica do Menu Mobile
  const hamburgerBtn = document.getElementById('btn-hamburguer');
  const sidenav = document.getElementById('menu-lateral');
  
  if (hamburgerBtn && sidenav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = sidenav.classList.toggle('menu-lateral--aberto');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Relógio de Telemetria
  function updateClock() {
    const clockEl = document.getElementById('relogio-telemetria');
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
