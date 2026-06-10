<div align="center">
  <img src="https://github.com/user-attachments/assets/35ad9fb6-fec8-4fd0-b6c9-c72acc9896e6" width="200" alt="Y-JACI Logo" />
  
<h1>Y-JACI 🌌</h1>

<p>
    🛰️ | Protótipo web navegável de gestão de recursos para colônia lunar e cidades inteligentes, desenvolvido para o Global Solution 2026 (FIAP).
  </p>

  <p align="center">
    <a href="https://mewmewdevart.github.io/SpaceConnectFiapChallenge/">🔗 Acesse o protótipo </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Global_Solution-FIAP-0A1128?style=for-the-badge&logo=rocket&logoColor=white" />
    <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-1F487E?style=for-the-badge&logo=github&logoColor=white" />
    <img src="https://img.shields.io/badge/Acessibilidade-WCAG_2.1-3772FF?style=for-the-badge&logo=w3c&logoColor=white" />
    <img src="https://img.shields.io/badge/Vanilla_JS-SPA-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  </p>
  </div>


## 📖 Índice

- [📖 Introdução e Contexto](#-introdução-e-contexto)
- [🎯 O Foco: Controle de Água e Reaproveitamento](#-o-foco-controle-de-água-e-reaproveitamento)
- [⚡ Alta Performance & SPA (Single Page Application)](#-alta-performance--spa-single-page-application)
- [♿ Acessibilidade (a11y) e SEO (Search Engine Optimization)](#-acessibilidade-a11y-e-seo-search-engine-optimization)
- [🖥️ As Telas do Sistema](#️-as-telas-do-sistema)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Instruções de Uso](#-instruções-de-uso)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [👥 Integrantes](#-integrantes)
- [📚 Referências](#-referências)

---

## 📖 Introdução e Contexto

O **Y-JACI** foi desenvolvido como parte do **Global Solution (FIAP) | Indústria Espacial**, focando na interseção entre tecnologia, web design e a economia espacial.

### 🎯 O Foco: Controle de Água e Reaproveitamento
Nossa solução foca na criação de uma interface para o **tratamento e reaproveitamento de água e resíduos** em uma colônia lunar. Em vez de painéis estáticos, o sistema é desenhado em torno de um **diagrama de fluxo interativo**, permitindo que o usuário compreenda e controle o caminho dos recursos em tempo real.

O fluxo é dividido em:
- **Entradas (Coleta):** Umidade do ar (condensadores), água cinza (pias/banheiros) e resíduos sólidos (biomassa).
- **Processamento:** O "motor" do sistema, mostrando a saúde e status de purificadores, filtros de osmose reversa e reatores de compostagem.
- **Saídas (Distribuição):** Roteamento da água limpa para consumo humano ou estufas, e direcionamento de fertilizante orgânico para a produção agrícola.

### ⚡ Alta Performance & SPA (Single Page Application)
O projeto foi inteiramente re-arquitetado como uma **Single Page Application (SPA)** usando JavaScript puro (Vanilla JS). Ao transitar entre as diferentes telas do sistema, não há recarregamento da página (eliminação de "piscadas"). Um `router.js` intercepta a navegação e faz a injeção do novo conteúdo de forma assíncrona, preservando a interface de telemetria base (footer) e o menu lateral (sidebar) já renderizados.

### ♿ Acessibilidade (a11y) e SEO (Search Engine Optimization)
A aplicação é fortemente otimizada para acessibilidade e motores de busca:
- **Semântica:** Utilização de tags HTML5 como `<main>`, `<nav>`, `<aside>`, `<time>`, `<data>` e `<article>`, garantindo uma hierarquia coesa da página.
- **Leitores de Tela:** Suporte avançado via atributos ARIA (`aria-label`, `aria-hidden="true"`, `aria-current="page"`, `aria-live="polite"` em componentes dinâmicos de telemetria) permitindo que o foco e os anúncios sejam precisos e amigáveis para deficientes visuais.
- **SEO & Metadados Avançados:** Implementação de Open Graph tags (`og:title`, `og:description`, `og:url`) e `Twitter Cards` para previews ricos em redes sociais e indexação robusta, além de marcação de link `canonical` em todas as páginas e `h1` semântico gerenciado em toda a aplicação SPA.

### 🖥️ As Telas do Sistema
O sistema é composto pelas seguintes interfaces (navegáveis):
- **`index.html`** — Dashboard principal de Monitoramento Geral.
- **`flow.html`** — Central de Fluxo Interativo (Controle de Água e Reaproveitamento).
- **`alerts.html`** — Central de Alertas e Log de Decisões.
- **`resources.html`** — Gestão Detalhada de Recursos e Níveis de Reservatórios.
- **`support.html`** — Página de Suporte Técnico da Colônia.


## 🛠️ Tecnologias Utilizadas

<div align="left">
  <img src="https://skillicons.dev/icons?i=html" height="54" alt="html logo" />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=css" height="54" alt="css logo" />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=js" height="54" alt="js logo" />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=figma" height="54" alt="figma logo" />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=git" height="54" alt="git logo" />
</div>


## 🚀 Instruções de Uso

### Pré-requisitos
❗ Certifique-se de ter as seguintes ferramentas instaladas:
* Git
* Navegador moderno (Google Chrome, Firefox, Edge, etc.)

### Como executar

1. Clone o repositório:
   ```sh
   git clone https://github.com/mewmewdevart/SpaceConnectFiapChallenge.git
   ```

2. Acesse o diretório do projeto:
   ```sh
   cd SpaceConnectFiapChallenge/
   ```

3. Abra o arquivo `index.html` no seu navegador.



## 📂 Estrutura do Projeto

Abaixo apresentamos a arquitetura do projeto após a refatoração modular:

```bash
.
├── assets/
│   ├── css/            # Estilos modulares da aplicação (padrão 7-1 adaptado)
│   │   ├── base/       # Resets e variáveis root
│   │   ├── layout/     # Estrutura principal e grids
│   │   ├── components/ # Estilos de componentes (Sidebar, Bottombar, etc)
│   │   └── pages/      # CSS específico por página
│   ├── img/            # Imagens e ícones
│   └── js/             # Scripts lógicos (Modo Estrito / Strict Mode)
│       ├── components/ # Scripts isolados (ex: router.js para SPA, sidebar.js)
│       └── pages/      # Lógicas específicas por página (ex: home.js)
├── index.html          # Página principal (Dashboard de Monitoramento)
├── alerts.html         # Central de Alertas
├── flow.html           # Central de Fluxo
├── resources.html      # Gestão de Recursos
├── support.html        # Página de Suporte
├── LICENSE             # Licença do projeto
└── README.md           # Documentação principal do repositório
```



## 👥 Integrantes

* **Ingrid Silva de Lima** — [rm570149@fiap.com.br](mailto:rm570149@fiap.com.br)
* **Larissa Cristina Benedito** — [rm570970@fiap.com.br](mailto:rm570970@fiap.com.br)
* **Mayla Mayumi Motobe** — [rm571213@fiap.com.br](mailto:rm571213@fiap.com.br)


## 📚 Referências

- [Agência Espacial Europeia (ESA)](https://www.esa.int)
- [NASA](https://www.nasa.gov/)
- [International Charter Space and Major Disasters](https://disasterscharter.org)
