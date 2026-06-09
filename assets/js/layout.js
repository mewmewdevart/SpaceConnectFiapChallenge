document.addEventListener("DOMContentLoaded", function () {
  // ======================================================
  // Menu Mobile — Hamburger Toggle
  // ======================================================
  const hamburgerBtn = document.getElementById('btn-hamburguer');
  const sidenav = document.getElementById('menu-lateral');

  if (hamburgerBtn && sidenav) {
    const icon = hamburgerBtn.querySelector('i');
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = sidenav.classList.toggle('menu-lateral--aberto');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // ======================================================
  // Dropdown de perfil — funciona em todos os contextos
  // Usa querySelectorAll para capturar tanto o dropdown
  // desktop (dentro de .menu-superior) quanto o mobile
  // (dentro de .menu-lateral__topbar-mobile).
  // ======================================================
  const allUserBtns = document.querySelectorAll('.menu-superior__usuario');
  const allDropdowns = document.querySelectorAll('.menu-superior__dropdown-menu');

  allUserBtns.forEach(function (userBtn) {
    const parentDropdown = userBtn.closest('.menu-superior__usuario-dropdown');
    if (!parentDropdown) return;

    const dropdownMenu = parentDropdown.querySelector('.menu-superior__dropdown-menu');
    if (!dropdownMenu) return;

    userBtn.addEventListener('click', function (e) {
      e.stopPropagation();

      // Fecha todos os outros dropdowns abertos antes de abrir este
      allDropdowns.forEach(function (dd) {
        if (dd !== dropdownMenu) {
          dd.classList.remove('menu-superior__dropdown-menu--aberto');
          const btn = dd.closest('.menu-superior__usuario-dropdown')?.querySelector('.menu-superior__usuario');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      const isExpanded = userBtn.getAttribute('aria-expanded') === 'true';
      userBtn.setAttribute('aria-expanded', !isExpanded);
      dropdownMenu.classList.toggle('menu-superior__dropdown-menu--aberto');
    });
  });

  // Fecha todos os dropdowns ao clicar fora
  document.addEventListener('click', function () {
    allDropdowns.forEach(function (dd) {
      dd.classList.remove('menu-superior__dropdown-menu--aberto');
      const btn = dd.closest('.menu-superior__usuario-dropdown')?.querySelector('.menu-superior__usuario');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
});
