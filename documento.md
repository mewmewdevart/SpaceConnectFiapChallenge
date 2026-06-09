# Documentação Executiva: Projeto Y-JACI
**Global Solution 2026 | Tecnólogo em Web Design – FIAP**

**Equipe:** Ingrid Silva de Lima, Larissa Cristina Benedito e Mayla Mayumi Motobe.

## 1. Visão Geral e Storytelling (A Narrativa de Sobrevivência)
O Y-JACI (do Tupi-Guarani: Y = Água; Jaci = Lua) é um protótipo front-end de gestão e monitoramento hídrico projetado para colônias lunares, com arquitetura escalável para cidades inteligentes na Terra.

Inspirado na sabedoria ancestral que reconhece a água como a origem da vida, o sistema opera sob o lema "Y Porã, Vida Porã" (Água boa, vida boa). Em um ambiente extraplanetário extremo, onde o desperdício significa falha crítica, o Y-JACI não é apenas um painel de dados, mas um ecossistema de suporte à vida. Ele orquestra três grandes módulos narrativos e operacionais:

- **JACI (Condensação):** Captação de umidade atmosférica e reserva de água potável.
- **NAIÁ (Reciclagem):** Tratamento de águas cinzas via osmose reversa e desinfecção.
- **YVY (Biomassa):** Conversão de resíduos orgânicos em nutrientes para agricultura.

## 2. Usabilidade e Design System (UX/UI)
A interface foi concebida como um autêntico sistema de sobrevivência. O objetivo primário da usabilidade é reduzir a carga cognitiva do operador, permitindo respostas rápidas em momentos de crise.

- **Estética HUD (Heads-Up Display) e Glassmorphism:** O design simula painéis translúcidos em terminais de comando aeroespaciais. O uso de profundidade e brilho direciona a atenção sem poluição visual.
- **Psicologia das Cores:** As cores são semânticas e operacionais. Tons de Ciano e Menta indicam estabilidade; Salmão e Magenta acionam alertas críticos de perda de recursos.
- **Tipografia Híbrida:** A fonte Inter foi aplicada para garantir legibilidade em descrições humanas, enquanto tipografias Monoespaçadas são exclusivas para telemetria e dados técnicos, permitindo escaneabilidade imediata de indicadores vitais.
- **Navegação por "Efeito Dominó":** Em vez de menus profundos e complexos, o sistema utiliza navegação cruzada via Query Strings nas URLs. Clicar em um alerta crítico na tela de falhas leva o operador diretamente ao tanque afetado na matriz de recursos, otimizando o tempo de resolução de incidentes.

## 3. Acessibilidade Inclusiva (a11y)
Projetar para o futuro exige que a interface seja operável por todos. O desenvolvimento do Y-JACI adotou práticas modernas de acessibilidade, garantindo que a base técnica suporte tecnologias assistivas:

- **Semântica e ARIA Labels:** Uso rigoroso de tags estruturais do HTML5 (`<header>`, `<main>`, `<aside>`) combinadas com atributos `aria-live`, `aria-label` e `aria-expanded` para informar leitores de tela sobre atualizações dinâmicas na telemetria.
- **Navegação por Teclado:** Implementação de Skip Links invisíveis (que surgem ao usar o Tab) para pular menus repetitivos, além do uso de `tabindex` em elementos interativos vitais (como válvulas e soquetes), permitindo operação total sem uso de mouse.

## 4. Arquitetura Técnica e Simulação (Visão de Alto Nível)
Para garantir alta performance e demonstrar o domínio dos fundamentos da web, o projeto foi desenvolvido em Javascript Vanilla (Modo Estrito), sem dependência de frameworks pesados, estruturado sob uma Multi-Page Application (MPA).

- **Estilização Modular:** O CSS foi arquitetado utilizando o padrão 7-1 (Adaptado), separando responsabilidades (layout, componentes, variáveis) e utilizando tokens globais no `:root` para gerenciar o Design System.
- **Motor de Simulação Física:** O painel de fluxo interativo abriga um motor que calcula retropressão (backpressure) em tempo real. Os operadores podem arrastar nós e criar novas conexões hidráulicas renderizadas via curvas de Bézier em SVG, visualizando o impacto de fechar ou abrir válvulas instantaneamente.
- **Telemetria Dinâmica:** Bancos de dados locais em JS alimentam um sistema contínuo de oscilação hídrica e geração de logs no rodapé, simulando o estresse ambiental e o consumo humano com precisão.

## 5. Impacto e Sustentabilidade (ODS - ONU)
A lógica operacional do Y-JACI atende diretamente aos Objetivos de Desenvolvimento Sustentável da ONU, servindo como laboratório para soluções terrestres:

- **ODS 6 (Água e Saneamento):** O core da plataforma é o reaproveitamento contínuo (desperdício zero) e monitoramento de pureza.
- **ODS 2 (Fome Zero):** O gerenciamento de biomassa garante insumos para hidroponia e estufas em ambientes estéreis.
- **ODS 11 (Cidades Sustentáveis):** A telemetria preventiva constrói o modelo ideal para o saneamento inteligente nas metrópoles do futuro, conectando gestão de falhas e automação de reparos.

## Links Oficiais

- **Repositório GitHub:** https://github.com/mewmewdevart/SpaceConnectFiapChallenge
- **Vídeo Pitch:** [Inserir Link do YouTube Aqui]