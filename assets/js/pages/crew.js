// ==========================================================================
// CREW.JS - Base de Dados e Renderização Dinâmica da Tripulação
// ==========================================================================

const crewDatabase = [
  // ================= COMANDO (2) =================
  {
    id: "CMD-01",
    name: "Cmdr. Oakes",
    role: "Comandante da Missão",
    department: "Comando",
    location: "Centro de Comando",
    status: "nominal",
    vitals: { bpm: 68, spo2: "99%", fatigue: "22%", lastSleep: "7.1h", stress: "BAIXO" },
    impact: { water: "1.8L/d", o2: "14kg/s", energy: "12 kWh", efficiency: "98%" },
    mission: { name: "Supervisão Geral do Ciclo 4", progress: 95, deadline: "02h" },
    responsibilities: [
      { text: "Comunicações DSN", status: "ok" },
      { text: "Aprovação de Alocação H2O", status: "ok" }
    ],
    impactText: "Eficiência tática estável"
  },
  {
    id: "CMD-02",
    name: "Sub-Cmdr. Vance",
    role: "Oficial de Operações",
    department: "Comando",
    location: "Centro de Comando",
    status: "atencao",
    vitals: { bpm: 82, spo2: "97%", fatigue: "65%", lastSleep: "4.8h", stress: "MODERADO" },
    impact: { water: "2.1L/d", o2: "16kg/s", energy: "18 kWh", efficiency: "85%" },
    mission: { name: "Planejamento de Rota de Fuga", progress: 60, deadline: "08h" },
    responsibilities: [
      { text: "Simulações de Pressurização", status: "ok" },
      { text: "Logística de Suprimentos", status: "alert" }
    ],
    impactText: "Atraso no relatório de logística"
  },

  // ================= ENGENHARIA (6) =================
  {
    id: "ENG-01",
    name: "Sarah Jenkins",
    role: "Eng. Chefe de Suporte",
    department: "Engenharia",
    location: "Estufa Alpha",
    status: "nominal",
    vitals: { bpm: 72, spo2: "98%", fatigue: "64%", lastSleep: "5.2h", stress: "NOMINAL" },
    impact: { water: "2.4L/d", o2: "18kg/s", energy: "34 kWh", efficiency: "96%" },
    mission: { name: "Manutenção da Estufa Alpha", progress: 78, deadline: "14h" },
    responsibilities: [
      { text: "Sistema de Irrigação", status: "ok" },
      { text: "Reciclagem de Água", status: "ok" },
      { text: "Tanques H2O-03", status: "ok" }
    ],
    impactText: "+12% eficiência hídrica"
  },
  {
    id: "ENG-02",
    name: "Hiroshi Tanaka",
    role: "Engenheiro Elétrico",
    department: "Engenharia",
    location: "Reator Primário",
    status: "nominal",
    vitals: { bpm: 65, spo2: "99%", fatigue: "30%", lastSleep: "6.5h", stress: "BAIXO" },
    impact: { water: "1.9L/d", o2: "15kg/s", energy: "45 kWh", efficiency: "100%" },
    mission: { name: "Calibração da Rede Elétrica", progress: 90, deadline: "04h" },
    responsibilities: [
      { text: "Grid de Energia Central", status: "ok" }
    ],
    impactText: "+4% estabilidade energética"
  },
  {
    id: "ENG-03",
    name: "Elena Rostova",
    role: "Mecânica de Rovers",
    department: "Engenharia",
    location: "Garagem B",
    status: "atencao",
    vitals: { bpm: 88, spo2: "96%", fatigue: "75%", lastSleep: "4.1h", stress: "MODERADO" },
    impact: { water: "2.8L/d", o2: "20kg/s", energy: "22 kWh", efficiency: "78%" },
    mission: { name: "Reparo do Rover RV-04", progress: 35, deadline: "10h" },
    responsibilities: [
      { text: "Frota de Transporte", status: "alert" }
    ],
    impactText: "Disponibilidade de frota reduzida"
  },
  {
    id: "ENG-04",
    name: "Marcus Cole",
    role: "Técnico de Suporte à Vida",
    department: "Engenharia",
    location: "Módulo Habitacional",
    status: "nominal",
    vitals: { bpm: 70, spo2: "98%", fatigue: "40%", lastSleep: "7.0h", stress: "NOMINAL" },
    impact: { water: "2.0L/d", o2: "16kg/s", energy: "15 kWh", efficiency: "95%" },
    mission: { name: "Limpeza de Filtros CO2", progress: 100, deadline: "Concluído" },
    responsibilities: [
      { text: "Purificadores de Ar", status: "ok" },
      { text: "Controle Térmico", status: "ok" }
    ],
    impactText: "Qualidade do ar no máximo"
  },
  {
    id: "ENG-05",
    name: "Aisha Rahman",
    role: "Engenheira de Estruturas",
    department: "Engenharia",
    location: "Airlock 2",
    status: "nominal",
    vitals: { bpm: 74, spo2: "97%", fatigue: "50%", lastSleep: "6.0h", stress: "NOMINAL" },
    impact: { water: "2.2L/d", o2: "17kg/s", energy: "18 kWh", efficiency: "90%" },
    mission: { name: "Inspeção de Vedação", progress: 85, deadline: "05h" },
    responsibilities: [
      { text: "Airlocks Primários", status: "ok" }
    ],
    impactText: "Segurança estrutural garantida"
  },
  {
    id: "ENG-06",
    name: "David Chen",
    role: "Especialista em Robótica",
    department: "Engenharia",
    location: "Laboratório Tech",
    status: "nominal",
    vitals: { bpm: 68, spo2: "98%", fatigue: "35%", lastSleep: "6.8h", stress: "BAIXO" },
    impact: { water: "1.8L/d", o2: "14kg/s", energy: "25 kWh", efficiency: "92%" },
    mission: { name: "Atualização Drones de Mineração", progress: 50, deadline: "22h" },
    responsibilities: [
      { text: "Drones Autônomos", status: "ok" }
    ],
    impactText: "Automação operando bem"
  },

  // ================= CIÊNCIA (4) =================
  {
    id: "SCI-01",
    name: "Elara Thorne",
    role: "Geóloga Chefe (EVA)",
    department: "Ciência",
    location: "Cratera de Cabeus",
    status: "critico",
    vitals: { bpm: 134, spo2: "92%", fatigue: "88%", lastSleep: "3.2h", stress: "ALTO" },
    impact: { water: "+4.2x / hr", o2: "34%", energy: "145 kg", efficiency: "72%" },
    mission: { name: "Extração de Gelo Profundo", progress: 45, deadline: "-02:14h" },
    responsibilities: [
      { text: "Rover RV-04 (Inativo)", status: "critical" },
      { text: "Broca de Perfuração B-12", status: "ok" }
    ],
    impactText: "Atraso no ciclo H2O"
  },
  {
    id: "SCI-02",
    name: "Dr. Alistair Vance",
    role: "Astrofísico",
    department: "Ciência",
    location: "Observatório Lunar",
    status: "nominal",
    vitals: { bpm: 62, spo2: "99%", fatigue: "15%", lastSleep: "8.0h", stress: "BAIXO" },
    impact: { water: "1.5L/d", o2: "12kg/s", energy: "40 kWh", efficiency: "99%" },
    mission: { name: "Mapeamento de Tempestades Solares", progress: 80, deadline: "48h" },
    responsibilities: [
      { text: "Telescópio de Raio-X", status: "ok" },
      { text: "Escudos de Radiação", status: "ok" }
    ],
    impactText: "Previsão solar atualizada"
  },
  {
    id: "SCI-03",
    name: "Lin Wei",
    role: "Química Analítica",
    department: "Ciência",
    location: "Laboratório Químico",
    status: "nominal",
    vitals: { bpm: 70, spo2: "98%", fatigue: "45%", lastSleep: "6.2h", stress: "NOMINAL" },
    impact: { water: "2.5L/d", o2: "15kg/s", energy: "28 kWh", efficiency: "94%" },
    mission: { name: "Análise de Amostras de Regolito", progress: 65, deadline: "12h" },
    responsibilities: [
      { text: "Espectrômetros de Massa", status: "ok" }
    ],
    impactText: "Dados minerais disponíveis"
  },
  {
    id: "SCI-04",
    name: "James Holden",
    role: "Pesquisador de Materiais",
    department: "Ciência",
    location: "Módulo de Síntese",
    status: "atencao",
    vitals: { bpm: 85, spo2: "97%", fatigue: "70%", lastSleep: "4.5h", stress: "MODERADO" },
    impact: { water: "2.1L/d", o2: "16kg/s", energy: "38 kWh", efficiency: "82%" },
    mission: { name: "Impressão 3D de Peças Críticas", progress: 20, deadline: "06h" },
    responsibilities: [
      { text: "Sintetizador de Ligas", status: "alert" }
    ],
    impactText: "Falta de matéria-prima"
  },

  // ================= AGRICULTURA (3) =================
  {
    id: "AGR-01",
    name: "Dr. Maya Lin",
    role: "Botânica Chefe",
    department: "Agricultura",
    location: "Bio-Domo Principal",
    status: "nominal",
    vitals: { bpm: 66, spo2: "99%", fatigue: "25%", lastSleep: "7.5h", stress: "BAIXO" },
    impact: { water: "1.6L/d", o2: "10kg/s", energy: "15 kWh", efficiency: "110%" },
    mission: { name: "Colheita de Microverdes", progress: 95, deadline: "01h" },
    responsibilities: [
      { text: "Hidroponia Central", status: "ok" },
      { text: "Níveis de Iluminação UV", status: "ok" }
    ],
    impactText: "+25kg de biomassa gerada"
  },
  {
    id: "AGR-02",
    name: "Carlos Mendes",
    role: "Especialista em Fungos",
    department: "Agricultura",
    location: "Câmara de Compostagem",
    status: "nominal",
    vitals: { bpm: 71, spo2: "98%", fatigue: "40%", lastSleep: "6.5h", stress: "NOMINAL" },
    impact: { water: "2.0L/d", o2: "14kg/s", energy: "10 kWh", efficiency: "90%" },
    mission: { name: "Ciclo de Reciclagem Orgânica", progress: 50, deadline: "24h" },
    responsibilities: [
      { text: "Reator de Compostagem", status: "ok" }
    ],
    impactText: "Fertilizante em produção"
  },
  {
    id: "AGR-03",
    name: "Priya Patel",
    role: "Técnica de Nutrição",
    department: "Agricultura",
    location: "Bio-Domo 02",
    status: "atencao",
    vitals: { bpm: 80, spo2: "97%", fatigue: "60%", lastSleep: "5.5h", stress: "MODERADO" },
    impact: { water: "2.2L/d", o2: "15kg/s", energy: "18 kWh", efficiency: "85%" },
    mission: { name: "Equilíbrio de PH no Solo", progress: 40, deadline: "08h" },
    responsibilities: [
      { text: "Sensores de PH", status: "alert" }
    ],
    impactText: "Desvio químico detectado"
  },

  // ================= SAÚDE (2) =================
  {
    id: "MED-01",
    name: "Dr. Julian Bashir",
    role: "Oficial Médico Chefe",
    department: "Saúde",
    location: "Ala Médica",
    status: "nominal",
    vitals: { bpm: 64, spo2: "99%", fatigue: "20%", lastSleep: "7.2h", stress: "BAIXO" },
    impact: { water: "1.7L/d", o2: "13kg/s", energy: "20 kWh", efficiency: "98%" },
    mission: { name: "Check-up da Equipe de Engenharia", progress: 80, deadline: "03h" },
    responsibilities: [
      { text: "Estoque de Medicamentos", status: "ok" },
      { text: "Cápsulas de Criogenia", status: "ok" }
    ],
    impactText: "Saúde da tripulação nominal"
  },
  {
    id: "MED-02",
    name: "Enfa. Clara Oswald",
    role: "Paramédica de Resgate",
    department: "Saúde",
    location: "Ala Médica (Em prontidão)",
    status: "nominal",
    vitals: { bpm: 68, spo2: "98%", fatigue: "35%", lastSleep: "6.8h", stress: "NOMINAL" },
    impact: { water: "1.8L/d", o2: "14kg/s", energy: "12 kWh", efficiency: "95%" },
    mission: { name: "Standby para EVA da Cratera", progress: 100, deadline: "Contínuo" },
    responsibilities: [
      { text: "Veículo de Resgate Médico", status: "ok" }
    ],
    impactText: "Tempo de resposta: < 5 min"
  }
];

// ==========================================================================
// RENDERIZAÇÃO
// ==========================================================================

// ==========================================================================
// ESTADO GLOBAL (PESQUISA E PAGINAÇÃO)
// ==========================================================================
let filteredCrew = [];
let currentPage = 1;
const itemsPerPage = 4;
let currentDepartmentFilter = 'All';

function getStatusIcon(statusText) {
  if (statusText === 'ok') return '<i class="fa-solid fa-check"></i>';
  if (statusText === 'alert') return '<i class="fa-solid fa-triangle-exclamation text-warning"></i>';
  if (statusText === 'critical') return '<i class="fa-solid fa-xmark text-critical"></i>';
  return '<i class="fa-solid fa-check"></i>';
}

function getVitalClass(value, type) {
  const strVal = String(value).toLowerCase();
  if (type === 'fatigue') {
    const num = parseInt(strVal);
    if (num > 80) return 'crew-dado__valor--critico';
    if (num > 60) return 'crew-dado__valor--alerta';
  }
  if (type === 'bpm') {
    if (value > 120) return 'crew-dado__valor--critico';
    if (value > 90) return 'crew-dado__valor--alerta';
  }
  if (strVal.includes('alto')) return 'crew-dado__valor--critico';
  if (strVal.includes('moderado')) return 'crew-dado__valor--alerta';
  return '';
}

function renderPagination() {
  const pagContainer = document.getElementById('crew-pagination');
  if (!pagContainer) return;

  const totalPages = Math.ceil(filteredCrew.length / itemsPerPage);

  // Se houver 0 ou 1 página, e não tiver itens, pode limpar
  if (totalPages <= 1) {
    pagContainer.innerHTML = '';
    return;
  }

  let html = '';

  // Botão Anterior
  html += `<button class="botao botao--terciario botao--icone botao--sm crew-btn-page" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fa-solid fa-chevron-left"></i>
          </button>`;

  // Botões numéricos (simplificado para mostrar todos se forem poucos)
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="botao ${currentPage === i ? 'botao--primario' : 'botao--terciario'} botao--icone botao--sm crew-btn-page" onclick="changePage(${i})">${i}</button>`;
  }

  // Botão Próximo
  html += `<button class="botao botao--terciario botao--icone botao--sm crew-btn-page" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <i class="fa-solid fa-chevron-right"></i>
          </button>`;

  pagContainer.innerHTML = html;
}

// Expõe a função globalmente para os botões inline
window.changePage = function (page) {
  const totalPages = Math.ceil(filteredCrew.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderCrew();
  }
};

function renderCrew() {
  const container = document.getElementById('crew-roster-container');
  if (!container) return;

  container.innerHTML = '';

  if (filteredCrew.length === 0) {
    container.innerHTML = '<p class="crew-no-results">Nenhum tripulante encontrado.</p>';
    renderPagination();
    return;
  }

  // Lógica de Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const crewToRender = filteredCrew.slice(startIndex, endIndex);

  crewToRender.forEach(member => {
    // Definir cores globais do card baseadas no status
    const isCritical = member.status === 'critico';
    const isAlert = member.status === 'atencao';

    let cardClass = 'crew-card cartao-vidro ';
    let statusIcon = '<i class="fa-solid fa-location-dot"></i>';
    let etiquetaClass = 'etiqueta--success';

    if (isCritical) {
      cardClass += ' crew-card--alerta';
      etiquetaClass = 'etiqueta--danger';
      statusIcon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    } else if (isAlert) {
      etiquetaClass = 'etiqueta--warning';
      statusIcon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    }

    // Montar HTML de responsabilidades
    // Mapeamento Dinâmico Y-JACI Lore
    let assignedInitiatives = [];
    if (member.department === "Engenharia" && member.role.includes("Suporte")) assignedInitiatives = ["jaci", "naia"];
    else if (member.department === "Engenharia") assignedInitiatives = ["boitata"];
    else if (member.department === "Agricultura") assignedInitiatives = ["curupira", "yvy"];
    else if (member.department === "Comando") assignedInitiatives = ["yjaci"];
    else if (member.department === "Saúde") assignedInitiatives = ["jaci"];
    else if (member.department === "Ciência") assignedInitiatives = ["yvy", "naia"];

    const loreHTML = assignedInitiatives.map(initId => {
        const entity = window.YJaciCore ? window.YJaciCore.getEntity(initId) : null;
        if (entity) {
            return `
                <li class="crew-card__resp-item" style="background: rgba(43, 255, 209, 0.05); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(43, 255, 209, 0.1);">
                    <i class="fa-solid fa-link" style="color: var(--success);"></i>
                    <a href="flow.html?focus=${initId}" style="color: var(--success); text-decoration: none; font-weight: bold; font-family: var(--font-mono); transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Especialista: ${entity.name}</a>
                </li>`;
        }
        return '';
    }).join("");

    const responsibilitiesHTML = loreHTML + member.responsibilities.map(r => `
        <li class="crew-card__resp-item">
            <i class="fa-solid ${r.status === 'alert' ? 'fa-triangle-exclamation' : 'fa-check'}" 
               style="color: var(--${r.status === 'alert' ? 'warning' : 'success'});"></i>
            ${r.text}
        </li>
    `).join("");

    // Montar HTML do cartão
    const cardHTML = `
      <article class="${cardClass}">
        <header class="crew-card__header">
          <div class="crew-card__perfil">
            <div class="crew-card__avatar">
              <i class="fa-solid fa-user-astronaut"></i>
              <div class="crew-card__status-dot ${isAlert ? 'crew-card__status-dot--warning' : ''}"></div>
            </div>
            <div class="crew-card__info">
              <h2 class="crew-card__nome">${member.name}</h2>
              <span class="crew-card__funcao">${member.role}</span>
            </div>
          </div>
          <div class="etiqueta ${etiquetaClass}">
            ${statusIcon} ${member.location}
          </div>
        </header>

        <div class="crew-card__body">
          <!-- Coluna 1: Vitais e Saúde -->
          <div class="crew-coluna">
            <h3 class="crew-coluna__titulo">Biometria e Fadiga</h3>
            
            <div class="crew-dado">
              <span class="crew-dado__label"><i class="fa-solid fa-heart-pulse"></i> BPM</span>
              <span class="crew-dado__valor ${getVitalClass(member.vitals.bpm, 'bpm')}">${member.vitals.bpm}</span>
            </div>
            <div class="crew-dado">
              <span class="crew-dado__label"><i class="fa-solid fa-lungs"></i> SpO2</span>
              <span class="crew-dado__valor ${isCritical ? 'crew-dado__valor--alerta' : ''}">${member.vitals.spo2}</span>
            </div>
            <div class="crew-dado">
              <span class="crew-dado__label"><i class="fa-solid fa-battery-quarter"></i> Fadiga</span>
              <span class="crew-dado__valor ${getVitalClass(member.vitals.fatigue, 'fatigue')}">${member.vitals.fatigue}</span>
            </div>
            <div class="crew-dado">
              <span class="crew-dado__label"><i class="fa-solid fa-bolt"></i> Estresse</span>
              <span class="crew-dado__valor ${getVitalClass(member.vitals.stress, 'stress')}">${member.vitals.stress}</span>
            </div>
          </div>

          <!-- Coluna 2: Impacto Operacional -->
          <div class="crew-coluna">
            <h3 class="crew-coluna__titulo">Impacto na Colônia</h3>
            
            <div class="crew-impacto ${isCritical ? 'crew-impacto--critical' : ''}">
              <div class="crew-dado">
                <span class="crew-dado__label">Consumo Hídrico</span>
                <span class="crew-dado__valor ${isCritical ? 'crew-dado__valor--critico' : ''}">${member.impact.water}</span>
              </div>
              <div class="crew-dado">
                <span class="crew-dado__label">Consumo de O2</span>
                <span class="crew-dado__valor ${isAlert ? 'crew-dado__valor--alerta' : ''}">${member.impact.o2}</span>
              </div>
              <div class="crew-dado">
                <span class="crew-dado__label">Energia Util.</span>
                <span class="crew-dado__valor">${member.impact.energy}</span>
              </div>
              <div class="crew-dado">
                <span class="crew-dado__label">Eficiência Oper.</span>
                <span class="crew-dado__valor ${isCritical ? '' : 'crew-dado__valor--positivo'}">${member.impact.efficiency}</span>
              </div>
            </div>
          </div>

          <!-- Coluna 3: Contexto Sistêmico -->
          <div class="crew-coluna">
            <h3 class="crew-coluna__titulo">Contexto Sistêmico</h3>
            
            <div class="crew-missao">
              <div class="crew-missao__card ${isCritical ? 'crew-missao__card--critical' : ''}">
                <span class="crew-missao__nome ${isCritical ? 'crew-missao__nome--critical' : ''}">${member.mission.name}</span>
                <div class="crew-missao__progresso">
                  <div class="crew-missao__barra">
                    <div class="crew-missao__fill ${isCritical ? 'crew-missao__fill--critical' : ''}" style="width: ${member.mission.progress}%;"></div>
                  </div>
                  <span class="crew-missao__pct ${isCritical ? 'crew-missao__pct--critical' : ''}">${member.mission.progress}%</span>
                </div>
                <span class="crew-dado__label crew-prazo-label"><i class="fa-regular fa-clock"></i> Prazo: ${member.mission.deadline}</span>
              </div>

              <div class="crew-responsabilidades">
                <span class="crew-coluna__titulo crew-responsavel-titulo">Responsável Por</span>
                ${responsibilitiesHTML}
                <span class="crew-dado__valor ${isCritical ? 'crew-dado__valor--critico' : (isAlert ? 'crew-dado__valor--alerta' : 'crew-dado__valor--positivo')} crew-responsavel-valor">
                  Impacto: ${member.impactText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;

    container.innerHTML += cardHTML;
  });

  renderPagination();
}

function applyFilters() {
  const searchInput = document.getElementById('crew-search');
  const term = searchInput ? searchInput.value.toLowerCase() : '';

  filteredCrew = crewDatabase.filter(m => {
    const matchesText = m.name.toLowerCase().includes(term) ||
                        m.role.toLowerCase().includes(term) ||
                        m.department.toLowerCase().includes(term) ||
                        m.location.toLowerCase().includes(term);
    
    const matchesDept = currentDepartmentFilter === 'All' || m.department === currentDepartmentFilter;

    return matchesText && matchesDept;
  });

  currentPage = 1;
  renderCrew();
}

// Inicializar na carga da página
document.addEventListener('DOMContentLoaded', () => {
  filteredCrew = [...crewDatabase];
  renderCrew();

  const searchInput = document.getElementById('crew-search');
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  const filterButtons = document.querySelectorAll('#crew-filters button');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => {
        b.classList.remove('crew-distribuicao__tag--ativo');
        b.setAttribute('aria-pressed', 'false');
      });
      const target = e.currentTarget;
      target.classList.add('crew-distribuicao__tag--ativo');
      target.setAttribute('aria-pressed', 'true');
      
      currentDepartmentFilter = target.getAttribute('data-department');
      applyFilters();
    });
  });
});

