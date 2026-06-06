/**
 * head.js — Componente compartilhado do <head>
 * 
 * Injeta meta tags SEO, Open Graph, Twitter Cards, favicons,
 * fontes externas e CSS comum em qualquer página.
 * 
 * Uso: <script src="assets/js/components/head.js"></script>
 *      (colocar logo após <meta charset> e <meta viewport> no <head>)
 */
(function () {
  "use strict";
  const head = document.head;

  // ── Configuração da página ──
  // Cada página pode definir window.PAGE_CONFIG antes de carregar este script
  const config = window.PAGE_CONFIG || {};
  const pageTitle = config.title || 'Space Connect - Gestão Inteligente de Recursos Lunares';
  const pageDescription = config.description || 'Space Connect é o sistema definitivo para monitoramento e gestão de recursos em colônias lunares. Acompanhe energia, água e oxigênio em tempo real.';
  const pageUrl = config.url || 'https://spaceconnect.com.br/';

  // ── Helper para criar e injetar tags ──
  function addMeta(attrs) {
    const meta = document.createElement('meta');
    for (const [key, value] of Object.entries(attrs)) {
      meta.setAttribute(key, value);
    }
    head.appendChild(meta);
  }

  function addLink(attrs) {
    const link = document.createElement('link');
    for (const [key, value] of Object.entries(attrs)) {
      link.setAttribute(key, value);
    }
    head.appendChild(link);
  }

  // ── Title ──
  if (!document.title) {
    document.title = pageTitle;
  }

  // ── SEO Meta Tags ──
  addMeta({ name: 'description', content: pageDescription });
  addMeta({ name: 'keywords', content: 'Gestão de recursos, colônia lunar, monitoramento de energia, sustentabilidade espacial, dashboard espacial, ODS, inovação espacial, Space Connect' });
  addMeta({ name: 'author', content: 'Space Connect' });
  addMeta({ name: 'application-name', content: 'Space Connect' });
  addMeta({ name: 'robots', content: 'index, follow' });
  addMeta({ name: 'referrer', content: 'strict-origin-when-cross-origin' });
  addMeta({ name: 'theme-color', content: '#0b1021' });
  addMeta({ name: 'color-scheme', content: 'light dark' });

  // ── Canonical ──
  addLink({ rel: 'canonical', href: pageUrl });

  // ── Preconnects ──
  addLink({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
  addLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' });
  addLink({ rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' });

  // ── Open Graph ──
  addMeta({ property: 'og:type', content: 'website' });
  addMeta({ property: 'og:title', content: pageTitle });
  addMeta({ property: 'og:description', content: pageDescription });
  addMeta({ property: 'og:url', content: pageUrl });
  addMeta({ property: 'og:site_name', content: 'Space Connect' });
  addMeta({ property: 'og:locale', content: 'pt_BR' });
  addMeta({ property: 'og:image', content: '#' });
  addMeta({ property: 'og:image:width', content: '1200' });
  addMeta({ property: 'og:image:height', content: '630' });
  addMeta({ property: 'og:image:alt', content: 'Space Connect - Dashboard de Gestão Lunar' });

  // ── Twitter Cards ──
  addMeta({ name: 'twitter:card', content: 'summary_large_image' });
  addMeta({ name: 'twitter:title', content: pageTitle });
  addMeta({ name: 'twitter:description', content: pageDescription });
  addMeta({ name: 'twitter:image', content: '#' });

  // ── Favicon ──
  addLink({ rel: 'apple-touch-icon', sizes: '180x180', href: 'assets/img/favicon_io/apple-touch-icon.png' });
  addLink({ rel: 'icon', type: 'image/png', sizes: '32x32', href: 'assets/img/favicon_io/favicon-32x32.png' });
  addLink({ rel: 'icon', type: 'image/png', sizes: '16x16', href: 'assets/img/favicon_io/favicon-16x16.png' });
  addLink({ rel: 'manifest', href: 'assets/img/favicon_io/site.webmanifest' });
  addLink({ rel: 'shortcut icon', href: 'assets/img/favicon_io/favicon.ico' });

  // ── Icon Libraries ──
  addLink({ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css' });
  addLink({ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' });

  // ── CSS Customizado ──
  addLink({ rel: 'stylesheet', href: 'assets/css/base/variables.css' });
  addLink({ rel: 'stylesheet', href: 'assets/css/base/reset.css' });
  addLink({ rel: 'stylesheet', href: 'assets/css/layout/grid.css' });
  addLink({ rel: 'stylesheet', href: 'assets/css/components/sidebar.css' });
  addLink({ rel: 'stylesheet', href: 'assets/css/components/bottombar.css' });
  addLink({ rel: 'stylesheet', href: 'assets/css/pages/home.css' });
  addLink({ rel: 'stylesheet', href: 'assets/css/pages/flow.css' });

  // ── Structured Data (JSON-LD) ──
  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Space Connect",
    "url": "https://spaceconnect.com.br/",
    "description": "Sistema de gestão de recursos para colônias lunares e sustentabilidade espacial.",
    "inLanguage": "pt-BR",
    "publisher": {
      "@type": "Organization",
      "name": "Space Connect",
      "url": "https://spaceconnect.com.br/"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://spaceconnect.com.br/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });
  head.appendChild(jsonLd);
})();
