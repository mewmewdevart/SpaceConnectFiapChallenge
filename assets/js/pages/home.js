(function () {
    "use strict";

    // Dados das miss�es
    const MISSIONS = [
        {
            id: "W-REC-01", name: "HIDRO-RECICLADOR", type: "ÁGUAS CINZAS",
            top: "35%", left: "72%", icon: "♻️", val: "4.20", unit: "t/h",
            stats: [{ l: "PUREZA", v: "99.9%" }, { l: "PH", v: "7.2" }, { l: "TEMP", v: "15°C" }],
            units: [{ n: "Filtro Osmose", p: "87%" }, { n: "Célula Deion", p: "64%" }]
        },
        {
            id: "W-RES-04", name: "RESERVA ALPHA", type: "ESTOQUE POTÁVEL",
            top: "55%", left: "32%", icon: "💧", val: "850", unit: "m³",
            stats: [{ l: "AUTONOMIA", v: "120 SOLS" }, { l: "PRESSÃO", v: "2.4 BAR" }],
            units: [{ n: "Bomba Principal", p: "100%" }, { n: "Válvula A2", p: "92%" }]
        },
        {
            id: "BIO-09", name: "BIO-CONVERSOR", type: "BIOMASSA",
            top: "75%", left: "55%", icon: "🌱", val: "1.15", unit: "kg/h",
            stats: [{ l: "CARGA", v: "420kg" }, { l: "PRODUÇÃO", v: "12kg/d" }],
            units: [{ n: "Reator", p: "45%" }, { n: "Separador", p: "100%" }]
        }
    ];

    const sidePanel = document.getElementById('side-info-panel');
    const overlay = document.getElementById('nodes-overlay');

    // Sem overlay ou painel, n�o h� nada a fazer
    if (!overlay || !sidePanel) return;

    // Vers�o de scanner (estado padr�o do painel)
    function renderScanner() {
        sidePanel.innerHTML = `
            <div class="inspetor-painel">
                <div class="inspetor-painel__cabecalho">
                    <h2><span>/</span>Telemetria</h2>
                </div>
                <div class="inspetor-painel__vazio">
                    <i class="fa-solid fa-satellite-dish" style="font-size: var(--text-hero); opacity: 0.3; margin-bottom: 10px;"></i>
                    <p>Aguardando sele��o.<br>Selecione uma miss�o na malha lunar.</p>
                </div>
            </div>`;
    }

    // Detalhes de uma miss�o selecionada
    function renderDetails(m) {
        const history = Array(70).fill().map(() =>
            `<div class="sq lv${Math.floor(Math.random() * 5)}"></div>`
        ).join('');

        sidePanel.innerHTML = `
            <div class="inspetor-painel animate-in">
                <div class="inspetor-painel__cabecalho">
                    <h2>
                        <i class="fa-solid fa-chart-line inspetor-painel__icone" style="color: rgb(var(--cyan)); margin-right: 8px;"></i>
                        <span>/</span>${m.name}
                    </h2>
                    <button id="close-hud" class="botao botao--ghost botao--icone" aria-label="Fechar painel de detalhes"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <div class="inspetor-painel__formulario">
                    <div class="inspetor-painel__grupo-form">
                        <label>Tipo de Miss�o / ID</label>
                        <input type="text" value="${m.type} // ID: ${m.id}" readonly class="input-readonly">
                    </div>

                    <div class="inspetor-painel__grupo-form hero-stat-container" style="position: relative; overflow: hidden; margin-top: 10px; padding: 15px; border-radius: 8px; background: rgba(var(--white), 0.02); border: 1px solid var(--border-color);">
                        <label style="position: relative; z-index: 2;">Taxa de Processamento Ativa</label>
                        <div class="val" style="position: relative; z-index: 2; color: rgb(var(--color-primary)); font-size: var(--text-hero); font-weight: bold; text-shadow: 0 0 10px rgba(var(--color-primary), 0.3); margin-top: 4px;">
                            ${m.val}<small style="font-size: var(--text-md); color: rgb(var(--text-secondary)); margin-left: 8px;">${m.unit}</small>
                        </div>
                        <div class="wave-wrap" aria-hidden="true">
                            <svg class="wave-line" viewBox="0 0 120 20" preserveAspectRatio="none"><path d="M0,10 C20,20 40,0 60,10 C80,20 100,0 120,10 V20 H0 Z"></path></svg>
                        </div>
                    </div>

                    <div class="grid-stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px;">
                        ${m.stats.map(s => `
                            <div class="stat-item cartao-vidro" style="padding: 12px; border-radius: 8px; background: rgba(var(--white), 0.02); border: 1px solid var(--border-color);">
                                <label style="font-size: var(--text-xs); color: rgb(var(--text-secondary)); font-weight: bold; text-transform: uppercase;">${s.l}</label>
                                <span style="display: block; font-size: var(--text-lg); font-weight: bold; margin-top: 4px; color: rgb(var(--text-primary));">${s.v}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="inspetor-painel__grupo-form" style="margin-top: 10px;">
                        <label>Unidades operacionais</label>
                        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
                            ${m.units.map(u => `
                                <div class="unit-item">
                                    <div class="unit-meta" style="display: flex; justify-content: space-between; font-size: var(--text-sm); margin-bottom: 5px; color: rgb(var(--text-primary));">
                                        <span>${u.n}</span><span style="font-weight: bold; color: rgb(var(--cyan));">${u.p}</span>
                                    </div>
                                    <div class="progress-rail" style="background: rgba(var(--white), 0.05); height: 6px; border-radius: 99px; overflow: hidden;">
                                        <div class="progress-fill" style="width:${u.p}; height: 100%; background: linear-gradient(90deg, rgb(var(--cyan)), rgb(var(--green))); box-shadow: var(--glow-cyan);"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="history-box" aria-label="Hist�rico de varia��es" style="margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-color);">
                        <label style="font-size: var(--text-xs); color: rgb(var(--text-secondary)); font-weight: bold; text-transform: uppercase;">/ HIST�RICO DE VARIA��ES</label>
                        <div class="history-grid" style="display: grid; grid-template-rows: repeat(5, 12px); grid-auto-flow: column; grid-auto-columns: 12px; gap: 4px; margin: 15px 0;">${history}</div>
                        <button class="botao botao--outline" style="width: 100%; margin-top: 10px;" onclick="window.location.href='alerts.html'">CENTRAL DE COMANDO</button>
                    </div>
                </div>
            </div>`;

        document.getElementById('close-hud').addEventListener('click', () => {
            document.querySelectorAll('.water-node').forEach(n => n.classList.remove('active'));
            renderScanner();
        });
    }

    // Inicializa��o
    function init() {
        renderScanner();

        // Cria os marcadores de miss�o
        MISSIONS.forEach(m => {
            const btn = document.createElement('button');
            btn.className = 'water-node';
            btn.style.top = m.top;
            btn.style.left = m.left;
            btn.setAttribute('aria-label', `N� de miss�o: ${m.name}`);
            btn.innerHTML = `
                <span class="node-icon" aria-hidden="true">${m.icon}</span>
                <small class="node-label">${m.id}</small>
            `;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.water-node').forEach(n => n.classList.remove('active'));
                btn.classList.add('active');
                renderDetails(m);
            });
            overlay.appendChild(btn);
        });
    }

    // Usa DOMContentLoaded em vez de setInterval polling
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
