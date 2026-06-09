/**
 * RESOURCES.JS
 * Renderiza dinamicamente os cards da "Reserva Estratégica" 
 * consumindo dados do motor central YJaciCore.
 */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("resources-grid");
  if (!grid || !window.YJaciCore) return;

  const telemetryData = {
    "CCA-04": { level: "87%", bar: "87%", consumo: "4.2 t/h", autonomia: "43 dias", alert: false, fluid: "pure_water" },
    "URC-01": { level: "52%", bar: "52%", consumo: "380 L/d", autonomia: "SOL+0.5", alert: false, fluid: "greywater" },
    "CVB-09": { level: "97%", bar: "97%", consumo: "45 kg/d", autonomia: "Ativa", alert: false, fluid: "organic" },
    "SIS-02": { level: "25%", bar: "25%", consumo: "150 L/d", autonomia: "Crítica", alert: true, fluid: "agricultural" }
  };

  const systemsToRender = ["CCA-04", "URC-01", "CVB-09", "SIS-02"];

  systemsToRender.forEach(sysId => {
    const sys = window.YJaciCore.getSystem(sysId);
    if (!sys) return;

    const tel = telemetryData[sysId];
    const isCritical = sys.criticality === "critical" || tel.alert;
    const cardClass = isCritical ? "recursos-cofre recursos-cofre--alerta" : "recursos-cofre";

    // Nome da iniciativa via Join relacional
    const initiativeName = sys.initiative ? sys.initiative.name : "N/A";
    const initiativeId = sys.initiativeId || "";

    let barColorClass = `recursos-cofre__preenchimento-progresso--${tel.fluid}`;
    let tankColorClass = `recursos-cofre__preenchimento-tanque--${tel.fluid}`;

    let rateColor = "var(--steel)";
    let iconColor = "rgba(var(--steel), 0.5)";

    if (tel.fluid === "organic") {
      rateColor = "var(--warning)";
      iconColor = "rgba(var(--warning), 0.5)";
    } else if (tel.fluid === "agricultural") {
      rateColor = "var(--success)";
      iconColor = "rgba(var(--success), 0.5)";
    } else if (tel.fluid === "greywater") {
      rateColor = "var(--steel)";
      iconColor = "rgba(var(--steel), 0.5)";
    }

    const inlineGrad = tel.alert ? 'background: linear-gradient(90deg, rgb(var(--energy)), rgb(var(--brand-primary))) !important;' : '';
    if (tel.alert) tankColorClass += " recursos-cofre__preenchimento-tanque--baixo";

    const cardHTML = `
          <article class="${cardClass} cartao-vidro" id="tank-${sysId.toLowerCase()}">
            <div class="recursos-cofre__cabecalho" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
              <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                  <span class="etiqueta etiqueta--info">${sys.id}</span>
                  <span style="font-size: var(--text-xs); color: rgb(var(--text-secondary)); text-transform: uppercase; letter-spacing: 1px;">${sys.resource}</span>
                </div>
                <h2 class="recursos-cofre__nome">${sys.systemName}</h2>
              </div>
              <div style="color: rgb(${rateColor}); font-family: var(--font-mono); font-size: var(--text-sm); font-weight: bold; background: rgba(var(--bg-main), 0.5); padding: 5px 10px; border-radius: 4px; border: 1px solid rgba(${rateColor}, 0.2); white-space: nowrap;">
                <i class="fa-solid fa-arrow-trend-down"></i> ${tel.consumo}
              </div>
            </div>

            <div class="recursos-cofre__corpo">
              <div class="recursos-cofre__informacoes">
                <div class="recursos-cofre__massa">
                  <span class="recursos-cofre__valor-massa">${tel.level.replace('%', '')}</span>
                  <span class="recursos-cofre__massa-maxima">% NÍVEL</span>
                </div>

                <div class="recursos-cofre__barra-progresso">
                  <div class="recursos-cofre__preenchimento-progresso ${barColorClass}" style="width: ${tel.bar}; ${inlineGrad}"></div>
                  <div class="recursos-cofre__marcacoes-progresso">
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>
                </div>

                <div class="recursos-cofre__metricas">
                  <div class="recursos-cofre__metrica">
                    <span class="recursos-cofre__icone-metrica"><i class="fa-solid fa-hourglass-half"></i></span>
                    <span class="recursos-cofre__rotulo-metrica">AUTONOMIA</span>
                    <span class="recursos-cofre__valor-metrica" style="color: ${isCritical ? 'rgb(var(--critical))' : 'rgb(var(--text-primary))'};">${tel.autonomia}</span>
                  </div>
                  <div class="recursos-cofre__metrica">
                    <span class="recursos-cofre__icone-metrica"><i class="fa-solid fa-water"></i></span>
                    <span class="recursos-cofre__rotulo-metrica">ODS VINCULADO</span>
                    <span class="recursos-cofre__valor-metrica">${sys.ods}</span>
                  </div>
                </div>

                <div class="recursos-cofre__rodape" style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;">
                  <span class="recursos-cofre__rotulo-transferencia" style="font-size: var(--text-xs);">STATUS DO RESERVATÓRIO</span>
                  <div class="etiqueta etiqueta--${isCritical ? 'danger' : 'success'}"><span class="etiqueta__dot"></span> ${isCritical ? 'ALERTA' : 'OPERACIONAL'}</div>
                </div>
              </div>

              <div class="recursos-cofre__tanque">
                <div class="recursos-cofre__corpo-tanque">
                  <div class="recursos-cofre__preenchimento-tanque ${tankColorClass}" style="height: ${tel.bar}">
                    <div class="recursos-cofre__bolhas-tanque">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                  <div class="recursos-cofre__icone-tanque" style="color: ${iconColor}; text-shadow: 0 0 15px ${iconColor};">${sys.icon}</div>
                </div>
              </div>
            </div>

            <div class="recursos-cofre__percentual" style="margin-bottom: 20px;">
              <a href="flow.html?focus=${initiativeId}" class="botao botao--secundario" style="width: 100%; justify-content: center; text-decoration: none; font-size: var(--text-xs);">
                <i class="fa-solid fa-diagram-project"></i> INICIATIVA ${initiativeName.toUpperCase()}
              </a>
            </div>
          </article>
        `;

    grid.innerHTML += cardHTML;
  });

  // Handle cross-linking from other pages (e.g. ?focus=CCA-04)
  const urlParams = new URLSearchParams(window.location.search);
  const focusId = urlParams.get('focus');
  if (focusId) {
    setTimeout(() => {
      const targetCard = document.getElementById(`tank-${focusId.toLowerCase()}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.boxShadow = "0 0 30px var(--steel)";
        targetCard.style.transform = "scale(1.02)";
        setTimeout(() => {
          targetCard.style.boxShadow = "";
          targetCard.style.transform = "";
        }, 2000);
      }
    }, 500);
  }

  // SIMULAÇÃO DE TELEMETRIA EM TEMPO REAL
  function simulateTelemetry() {
    systemsToRender.forEach(sysId => {
      const card = document.getElementById(`tank-${sysId.toLowerCase()}`);
      if (!card) return;

      const tel = telemetryData[sysId];
      let currentLevel = parseFloat(tel.level);

      // Flutuação entre -1.5 e +1.5 inteiros
      const fluc = (Math.random() * 3) - 1.5;
      currentLevel = Math.min(100, Math.max(0, currentLevel + fluc));

      const roundedLevelStr = String(Math.round(currentLevel)).padStart(2, '0');
      tel.level = roundedLevelStr + "%";
      tel.bar = currentLevel + "%";

      // Atualiza DOM
      const valMassa = card.querySelector('.recursos-cofre__valor-massa');
      const progresso = card.querySelector('.recursos-cofre__preenchimento-progresso');
      const tanque = card.querySelector('.recursos-cofre__preenchimento-tanque');

      if (valMassa) valMassa.textContent = roundedLevelStr;
      if (progresso) progresso.style.width = tel.bar;
      if (tanque) tanque.style.height = tel.bar;

      // Lógica de alerta visual baseada em limiares
      const isCriticalSystem = tel.alert || currentLevel < 30;
      const rodapeEtiqueta = card.querySelector('.recursos-cofre__rodape .etiqueta');

      if (rodapeEtiqueta) {
        if (isCriticalSystem) {
          rodapeEtiqueta.className = 'etiqueta etiqueta--danger';
          rodapeEtiqueta.innerHTML = '<span class="etiqueta__dot"></span> ALERTA';

          if (progresso) {
            progresso.className = 'recursos-cofre__preenchimento-progresso';
            progresso.style.background = 'linear-gradient(90deg, rgb(var(--energy)), rgb(var(--brand-primary)))';
          }
          if (tanque) {
            tanque.className = 'recursos-cofre__preenchimento-tanque recursos-cofre__preenchimento-tanque--baixo';
          }
          card.classList.add('recursos-cofre--alerta');
        } else {
          rodapeEtiqueta.className = 'etiqueta etiqueta--success';
          rodapeEtiqueta.innerHTML = '<span class="etiqueta__dot"></span> OPERACIONAL';

          if (progresso) {
            progresso.style.background = '';
            // Restaura classes baseadas no fluido original do sistema
            progresso.className = `recursos-cofre__preenchimento-progresso recursos-cofre__preenchimento-progresso--${tel.fluid}`;
          }
          if (tanque) {
            tanque.className = `recursos-cofre__preenchimento-tanque recursos-cofre__preenchimento-tanque--${tel.fluid}`;
          }
          card.classList.remove('recursos-cofre--alerta');
        }
      }
    });
  }

  if (window.resourcesSimulationInterval) {
    clearInterval(window.resourcesSimulationInterval);
  }
  window.resourcesSimulationInterval = setInterval(simulateTelemetry, 1000);

});
