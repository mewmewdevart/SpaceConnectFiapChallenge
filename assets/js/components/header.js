/**
 * header.js — Componente compartilhado do Header
 * 
 * Monta o cabeçalho superior (header-content) nas páginas.
 * 
 * Uso: Adicionar <div id="header-container"></div> dentro de <main class="main-content">
 *      e incluir <script src="assets/js/components/header.js"></script> no final do <body>
 */
(function () {
  "use strict";

  window.initHeader = function() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const title = container.getAttribute('data-title') || 'Visão Geral do Fluxo';
    const subtitle = container.getAttribute('data-subtitle') || 'Lorem Ipsum - Mission Control';

    const headerHTML = `
      <header class="header-content">
        <p class="header-text">${subtitle}</p>
        <h1>${title}</h1>

        <div class="header-block">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

          <div>
            <span>Sistema nominal</span>
            <span>XPTO Alertas</span>
          </div>
        </div>
      </header>`;

    // ── Injetar no DOM ──
    container.outerHTML = headerHTML;
  };

  // Inicializa o header na carga inicial
  window.initHeader();
})();
