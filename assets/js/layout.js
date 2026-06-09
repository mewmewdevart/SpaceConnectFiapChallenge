document.addEventListener("DOMContentLoaded", function () {
  // Configura a aba ativa baseado no path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  function getActiveClass(path) {
    return currentPath === path ? 'menu-lateral__link--ativo' : '';
  }

  // Definição do Sidebar
  const sidebarHTML = `
    <a href="#main-content" class="skip-link">Pular para o conteúdo</a>
    <aside class="menu-lateral" id="menu-lateral">
      <button type="button" class="botao botao--ghost botao--icone botao--mobile menu-lateral__hamburguer" id="btn-hamburguer" aria-expanded="false" aria-label="Abrir menu">
        <i class="fas fa-bars" aria-hidden="true"></i>
        <span class="menu-lateral__marca-mobile">Y-JACI</span>
      </button>
      <nav class="menu-lateral__navegacao" aria-label="Menu Principal">
        <a href="index.html" class="${getActiveClass('index.html')} menu-lateral__link" ${currentPath === 'index.html' ? 'aria-current="page"' : ''}>
          <span class="menu-lateral__icone"><i class="fas fa-home"></i></span>
          <span class="menu-lateral__texto">Home</span>
        </a>
        <a href="flow.html" class="${getActiveClass('flow.html')} menu-lateral__link" ${currentPath === 'flow.html' ? 'aria-current="page"' : ''}>
          <span class="menu-lateral__icone"><i class="fa-solid fa-timeline"></i></span>
          <span class="menu-lateral__texto">Fluxo de Interações</span>
        </a>
        <a href="resources.html" class="${getActiveClass('resources.html')} menu-lateral__link" ${currentPath === 'resources.html' ? 'aria-current="page"' : ''}>
          <span class="menu-lateral__icone"><i class="fa-solid fa-water"></i></span>
          <span class="menu-lateral__texto">Gestão de Recursos</span>
        </a>
        <a href="alerts.html" class="${getActiveClass('alerts.html')} menu-lateral__link" ${currentPath === 'alerts.html' ? 'aria-current="page"' : ''}>
          <span class="menu-lateral__icone"><i class="fa-solid fa-circle-exclamation"></i></span>
          <span class="menu-lateral__texto">Central de Alertas</span>
        </a>
        <a href="crew.html" class="${getActiveClass('crew.html')} menu-lateral__link" ${currentPath === 'crew.html' ? 'aria-current="page"' : ''}>
          <span class="menu-lateral__icone"><i class="fa-solid fa-user-astronaut"></i></span>
          <span class="menu-lateral__texto">Tripulação</span>
        </a>
        <a href="support.html" class="${getActiveClass('support.html')} menu-lateral__link" ${currentPath === 'support.html' ? 'aria-current="page"' : ''}>
          <span class="menu-lateral__icone"><i class="fa-regular fa-envelope"></i></span>
          <span class="menu-lateral__texto">Suporte</span>
        </a>
        <div class="menu-lateral__separador"></div>
        <a href="about.html" class="${getActiveClass('about.html')} menu-lateral__link" ${currentPath === 'about.html' ? 'aria-current="page"' : ''}>
          <span class="menu-lateral__icone"><i class="fa-solid fa-circle-info"></i></span>
          <span class="menu-lateral__texto">Sobre</span>
        </a>
      </nav>
    </aside>
  `;

  // Definição da Topbar
  const topbarHTML = `
    <header class="menu-superior">
      <div class="menu-superior__esquerda">
        <span class="menu-superior__logo">
           Y-JACI
        </span>
      </div>

      <div class="menu-superior__buscar">
        <div class="menu-superior__buscar-container">
          <i class="fa-solid fa-magnifying-glass menu-superior__buscar-icone"></i>
          <input type="text" placeholder="Buscar módulos, recursos..." aria-label="Buscar módulos e recursos">
        </div>
      </div>

      <div class="menu-superior__direita">
        <!-- Status -->
        <span class="etiqueta etiqueta--perigo">
          <span class="etiqueta__dot"></span>
          1 Alerta Crítico
        </span>
        <div class="etiqueta etiqueta--sucesso">
          <span class="etiqueta__dot"></span>
          <span class="status-text">Nominal</span>
        </div>

        <!-- Notificações -->
        <button class="botao botao--ghost botao--icone botao--mobile menu-superior__acao menu-superior__notificacoes" aria-label="Notificações">
          <i class="fa-solid fa-bell"></i>
          <span class="menu-superior__etiqueta">5</span>
        </button>

        <!-- Usuário Dropdown -->
        <div class="menu-superior__usuario-dropdown">
          <button class="botao botao--ghost menu-superior__usuario" aria-haspopup="menu" aria-expanded="false">
            <div class="menu-superior__avatar">
              <i class="fa-solid fa-user-astronaut"></i>
            </div>
            <span class="menu-superior__nome">Administrador</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div class="menu-superior__dropdown-menu cartao-vidro" role="menu">
            <a href="#" role="menuitem"><i class="fa-solid fa-id-etiqueta"></i> Meu Perfil</a>
            <a href="#" role="menuitem"><i class="fa-solid fa-sliders"></i> Preferências</a>
            <div class="dropdown-divisor"></div>
            <a href="#" role="menuitem" class="dropdown-logout"><i class="fa-solid fa-right-from-bracket"></i> Desconectar</a>
          </div>
        </div>
      </div>
    </header>
  `;

  // Definição da Bottombar (Telemetria)
  const bottombarHTML = `
    <footer class="barra-telemetria">
      <span class="barra-telemetria__titulo"><span class="barra-telemetria__ponto"></span>Logs do Sistema</span>
      <div class="barra-telemetria__janela-letreiro">
        <div class="barra-telemetria__letreiro" aria-hidden="true">
          <!-- Os itens são gerados pelo main.js -->
        </div>
      </div>
      <time class="barra-telemetria__relogio" id="relogio-telemetria" aria-live="polite">PRIME SOL 0427 � 00:00:00</time>
    </footer>
  `;

  // Injeção de componentes globais (Header/Sidebar/Footer) para simular comportamento SPA.

  const body = document.body;
  body.insertAdjacentHTML('afterbegin', topbarHTML);
  body.insertAdjacentHTML('afterbegin', sidebarHTML);
  body.insertAdjacentHTML('beforeend', bottombarHTML);

  // Inicializar listeners para o Menu Mobile que acabaram de ser injetados
  const hamburgerBtn = document.getElementById('btn-hamburguer');
  const sidenav = document.getElementById('menu-lateral');

  if (hamburgerBtn && sidenav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = sidenav.classList.toggle('menu-lateral--aberto');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
  }
});

