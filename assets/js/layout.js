document.addEventListener("DOMContentLoaded", function () {
  // Inicializar listeners para o Menu Mobile que estão no DOM
  const hamburgerBtn = document.getElementById('btn-hamburguer');
  const sidenav = document.getElementById('menu-lateral');

  if (hamburgerBtn && sidenav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = sidenav.classList.toggle('menu-lateral--aberto');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
  }
});
