/**
 * header.js — Componente compartilhado do Header
 * 
 * Monta o cabeçalho superior (header-content) nas páginas.
 * 
 * Uso: Adicionar <div id="header-container"></div> dentro de <main class="main-content">
 *      e incluir <script src="assets/js/components/header.js"></script> no final do <body>
 */
(function () {
  const headerHTML = `
      <header class="header-content">
        <p class="header-text">Lorem Ipsum - Mission Control</p>
        <h1>Visao Geral do Fluxo</h1>

        <div class="header-block">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

          <div>
            <span>Sistema nominal</span>
            <span>XPTO Alertas</span>
          </div>
        </div>
      </header>`;

  // ── Injetar no DOM ──
  const container = document.getElementById('header-container');
  if (container) {
    container.outerHTML = headerHTML;
  }
})();
