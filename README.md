<div align="center">
  <img src="https://github.com/user-attachments/assets/592444d4-dd4c-440b-b3b6-738d2ff2c236" width="200" alt="Space Connect Logo" />


<h1>Space Connect 🌌</h1>

<p>
    🛰️ | Protótipo web navegável de gestão de recursos para colônia lunar e cidades inteligentes, desenvolvido para o Global Solution 2026 (FIAP).
  </p>

  <p align="center">
    <a href="">🔗 Acesse o protótipo (Em breve)</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Global_Solution-FIAP-0A1128?style=for-the-badge&logo=rocket&logoColor=white" />
    <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-1F487E?style=for-the-badge&logo=github&logoColor=white" />
    <img src="https://img.shields.io/badge/Acessibilidade-WCAG_2.1-3772FF?style=for-the-badge&logo=w3c&logoColor=white" />
  </p>
  </div>


## Introdução e Contexto

O **Space Connect** foi desenvolvido como parte do **Global Solution (FIAP) | Indústria Espacial**, focando na interseção entre tecnologia, web design e a economia espacial.

### 🎯 O Foco: Controle de Água e Reaproveitamento
Nossa solução foca na criação de uma interface para o **tratamento e reaproveitamento de água e resíduos** em uma colônia lunar. Em vez de painéis estáticos, o sistema é desenhado em torno de um **diagrama de fluxo interativo**, permitindo que o usuário compreenda e controle o caminho dos recursos em tempo real.

O fluxo é dividido em:
- **Entradas (Coleta):** Umidade do ar (condensadores), água cinza (pias/banheiros) e resíduos sólidos (biomassa).
- **Processamento:** O "motor" do sistema, mostrando a saúde e status de purificadores, filtros de osmose reversa e reatores de compostagem.
- **Saídas (Distribuição):** Roteamento da água limpa para consumo humano ou estufas, e direcionamento de fertilizante orgânico para a produção agrícola.

### 🎛️ Elementos Interativos e UX
A interface garante clareza visual e foca na tomada de decisão rápida e resolução de gargalos operacionais:
- **Válvulas de Direcionamento:** Controles interativos (switches) para priorizar extrações (ex: maximizar extração de água em detrimento de adubo sólido em picos de necessidade).
- **Indicadores em Cascata:** Níveis representados por contêineres interligados. Transbordamentos visuais exigem respostas ativas do usuário, como a ativação de filtros auxiliares.
- **Log de Decisões:** Painel de histórico demonstrando o impacto de métricas das últimas ações (ex: "-20% de adubo gerado, +15% de água recuperada nos últimos 3 ciclos").

### ♿ Acessibilidade (UX Técnica)
Devido à complexidade dos fluxos de tratamento de resíduos, a experiência visual vai além das cores:
- **Padrões Visuais (Patterns):** Texturas distintas (tracejados, pontos, ondas) são aplicadas para diferenciar os fluidos (água limpa, água cinza, biomassa).
- **Semântica HTML e ARIA:** Navegação operável via teclado e status audíveis por screen readers (ex: "Válvula de Água Cinza, status: Aberta para purificador principal").
- **Estados de Alerta:** Modais de alto contraste com chamadas de ação imediatas ("Isolar Tanque 2") para situações emergenciais, como risco de contaminação.

### 🌍 Conexão com o Mundo Real e ODS
A mesma lógica projetada para a Lua reflete diretamente o conceito de cidades sustentáveis e infraestrutura inteligente na Terra. A interface pode ser facilmente adaptada para uma estação moderna de tratamento de esgoto para monitorar o reaproveitamento de água industrial e a conversão de lodo em biogás.

Nossa solução dialoga diretamente com os Objetivos de Desenvolvimento Sustentável da ONU:
- **ODS 2** — Fome zero e agricultura sustentável
- **ODS 6** — Água potável e saneamento
- **ODS 9** — Indústria, inovação e infraestrutura
- **ODS 11** — Cidades e comunidades sustentáveis
- **ODS 12** — Consumo e produção responsáveis

---

## Estrutura do Projeto

```bash
.
├── assets/
│   ├── css/            # Estilos modulares da aplicação (padrão 7-1 adaptado)
│   │   ├── base/       # Resets e variáveis root
│   │   ├── layout/     # Estrutura principal e grids
│   │   ├── components/ # Estilos de componentes (Sidebar, Bottombar, etc)
│   │   └── pages/      # CSS específico por página
│   ├── img/            # Imagens e ícones
│   └── js/             # Scripts lógicos
│       ├── components/ # Scripts isolados (ex: head.js para injeção de CSS)
│       └── pages/      # Lógicas específicas por página (ex: home.js)
├── index.html          # Página principal (Dashboard de Monitoramento)
├── alerts.html         # Central de Alertas
├── flow.html           # Central de Fluxo
├── resources.html      # Gestão de Recursos
├── support.html        # Página de Suporte
├── LICENSE             # Licença do projeto
└── README.md           # Documentação principal do repositório
````


## Instruções de Uso

### Pré-requisitos

❗ Certifique-se de ter as seguintes ferramentas instaladas:

* Git
* Navegador (Google Chrome, Firefox, Opera, etc.)

### Como executar

1. Clone o repositório:

   ```sh
   git clone https://github.com/mewmewdevart/SpaceConnectFiapChallenge.git
   ```

2. Acesse o diretório do projeto:

   ```sh
   cd SpaceConnectFiapChallenge/
   ```

3. Abra o arquivo `index.html` no navegador.

## 🛠️ Tecnologias Utilizadas

<div align="left">
  <img src="https://skillicons.dev/icons?i=html" height="54" alt="html logo"  />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=css" height="54" alt="css logo"  />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=js" height="54" alt="js logo"  />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=figma" height="54" alt="figma logo"  />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=git" height="54" alt="git logo"  />
  <img width="11" />
  <img src="https://skillicons.dev/icons?i=canva" height="54" alt="git logo"  />
</div>

## Integrantes

* **Ingrid Silva de Lima** — [rm570149@fiap.com.br](mailto:rm570149@fiap.com.br)
* **Larissa Cristina Benedito** — [rm570970@fiap.com.br](mailto:rm570970@fiap.com.br)
* **Mayla Mayumi Motobe** — [rm571213@fiap.com.br](mailto:rm571213@fiap.com.br)

## Referências
