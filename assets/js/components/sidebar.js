/**
 * sidebar.js — Componente compartilhado da Sidebar
 * 
 * Monta o menu lateral (sidenav) em qualquer página.
 * Destaca automaticamente o link da página atual.
 * 
 * Uso: Adicionar <div id="sidebar-container"></div> no <body>
 *      e incluir <script src="assets/js/components/sidebar.js"></script>
 */
(function () {
  // ── Definição dos itens do menu ──
  const menuItems = [
    { href: 'index.html', icon: 'fas fa-home', label: 'Home' },
    { href: './flow.html', icon: 'fa-solid fa-timeline', label: 'Fluxo de Interações' },
    { href: './resources.html', icon: 'fa-solid fa-water', label: 'Gestão de Recursos' },
    { href: './alerts.html', icon: 'fa-solid fa-circle-exclamation', label: 'Central de Alertas' },
    { href: './support.html', icon: 'fa-regular fa-envelope', label: 'Suporte' },
  ];

  // ── Detectar página ativa ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // ── Montar HTML ──
  const linksHTML = menuItems.map(item => {
    // Limpa o href (ex: "./tela-de-fluxos.html" vira "tela-de-fluxos.html")
    const cleanHref = item.href.replace(/^.\//, '');
    const isActive = currentPage === cleanHref ? ' active' : '';
    return `
      <a href="${item.href}" class="${isActive}">
        <span class="icon"><i class="${item.icon}"></i></span>
        <span class="text">${item.label}</span>
      </a>`;
  }).join('');

  const sidenavHTML = `
    <div class="sidenav" id="sidenav">
      <div class="hamburger-menu" id="hamburger-btn">
        <i class="fas fa-bars"></i>
        <span class="brand-mobile">Space Connect</span>
      </div>
      <div class="nav-links">
        ${linksHTML}
      </div>
    </div>`;

  // ── Injetar no DOM ──
  const container = document.getElementById('sidebar-container');
  if (container) {
    container.outerHTML = sidenavHTML;
  } else {
    // Se não houver container, insere no início do body
    document.body.insertAdjacentHTML('afterbegin', sidenavHTML);
  }

  // ── Lógica do Menu Mobile ──
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidenav = document.getElementById('sidenav');
  if (hamburgerBtn && sidenav) {
    hamburgerBtn.addEventListener('click', () => {
      sidenav.classList.toggle('mobile-open');
    });
  }
})();
