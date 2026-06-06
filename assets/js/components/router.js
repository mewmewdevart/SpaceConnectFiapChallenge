/**
 * router.js — Roteador SPA Vanilla JS
 * 
 * Intercepta cliques em links locais e carrega o conteúdo via fetch,
 * substituindo apenas a <section class="content">.
 */
(function () {
  "use strict";
  // Inicializa a navegação
  document.addEventListener('click', e => {
    // Procura por uma tag <a> no caminho do clique
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    // Ignora links externos ou com target="_blank"
    const url = new URL(link.href);
    if (url.origin !== window.location.origin) return;
    if (link.getAttribute('target') === '_blank') return;
    if (link.hasAttribute('download')) return;

    // Apenas intercepta se for um HTML ou a raiz
    if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
      e.preventDefault();
      const targetUrl = link.getAttribute('href'); // mantém o formato relativo/absoluto original
      window.history.pushState(null, '', targetUrl);
      loadPage(targetUrl);
    }
  });

  // Lida com botões de voltar/avançar
  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
  });

  async function loadPage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao carregar página');
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Atualiza o título
      document.title = doc.title;

      // Substitui o conteúdo
      const newContent = doc.querySelector('.content');
      const currentContent = document.querySelector('.content');
      
      if (newContent && currentContent) {
        currentContent.innerHTML = newContent.innerHTML;
      }

      // Remonta componentes que vivem dentro do .content
      if (typeof window.initHeader === 'function') {
        window.initHeader();
      }

      // Atualiza a sidebar
      if (typeof window.updateSidebarActive === 'function') {
        window.updateSidebarActive(url);
      }

      // Trata scripts de página (ex: pages/home.js)
      const scripts = doc.querySelectorAll('script');
      scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src && src.includes('pages/')) {
          // Extrai o nome do script (ex: "home" de "assets/js/pages/home.js")
          const pageName = src.split('/').pop().replace('.js', '');
          const initFnName = 'init' + pageName.charAt(0).toUpperCase() + pageName.slice(1);

          // Verifica se já não foi carregado
          if (!document.querySelector(`script[src="${src}"]`)) {
            const newScript = document.createElement('script');
            newScript.src = src;
            newScript.onload = () => {
              if (typeof window[initFnName] === 'function') {
                window[initFnName]();
              }
            };
            document.body.appendChild(newScript);
          } else {
            // Se já existe no DOM, apenas executa a inicialização
            if (typeof window[initFnName] === 'function') {
              window[initFnName]();
            }
          }
        }
      });

    } catch (error) {
      console.error('Falha no roteamento SPA:', error);
      // Fallback: faz o recarregamento tradicional se falhar
      window.location.href = url;
    }
  }
})();
