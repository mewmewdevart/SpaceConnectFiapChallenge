(function() {
    // Dados das missões
    const MISSIONS = [
        { 
            id: "W-REC-01", name: "HIDRO-RECICLADOR", type: "ÁGUAS CINZAS", 
            top: "35%", left: "72%", icon: "♻️", val: "4.20", unit: "t/h",
            stats: [{l: "PUREZA", v: "99.9%"}, {l: "PH", v: "7.2"}, {l: "TEMP", v: "15°C"}],
            units: [{n: "Filtro Osmose", p: "87%"}, {n: "Célula Deion", p: "64%"}]
        },
        { 
            id: "W-RES-04", name: "RESERVA ALPHA", type: "ESTOQUE POTÁVEL", 
            top: "55%", left: "32%", icon: "💧", val: "850", unit: "m³",
            stats: [{l: "AUTONOMIA", v: "120 SOLS"}, {l: "PRESSÃO", v: "2.4 BAR"}],
            units: [{n: "Bomba Principal", p: "100%"}, {n: "Válvula A2", p: "92%"}]
        },
        { 
            id: "BIO-09", name: "BIO-CONVERSOR", type: "BIOMASSA", 
            top: "75%", left: "55%", icon: "🌱", val: "1.15", unit: "kg/h",
            stats: [{l: "CARGA", v: "420kg"}, {l: "PRODUÇÃO", v: "12kg/d"}],
            units: [{n: "Reator", p: "45%"}, {n: "Separador", p: "100%"}]
        }
    ];

    const sidePanel = document.getElementById('side-info-panel');
    const overlay = document.getElementById('nodes-overlay');
    let moonInitialized = false;
    let initDone = false;

    // Cria a Lua central no overlay 
    function createMoon() {
        if (!overlay) return;
        let moon = document.getElementById('central-moon');
        if (!moon) {
            moon = document.createElement('div');
            moon.id = 'central-moon';
            moon.className = 'moon-core';
            overlay.appendChild(moon);
        }

        moonInitialized = true;
    }

    // Versão de scanner (no painel)
    function renderScanner() {
        sidePanel.innerHTML = `
            <div class="scanner-container">
                <div class="scan-line"></div>
                <div class="center-hud" style="text-align:center; z-index:5;">
                    <p class="telemetry-title" aria-label="Tel tempo">BUSCANDO TELEMETRIA QUÂNTICA...</p>
                    <p class="telemetry-sub" aria-label="Aguardando fluxo">A GUARDANDO INPUT DE FLUXO</p>
                </div>
            </div>`;
    }

    // Detalhes de uma missão selecionada
    function renderDetails(m) {
        const history = Array(70).fill().map(() => `<div class="sq lv${Math.floor(Math.random()*5)}"></div>`).join('');
        
        sidePanel.innerHTML = `
            <div class="panel-content animate-in">
                <header>
                    <div class="row" style="display:flex; justify-content:space-between; align-items:center;">
                        <small class="hud-tag" aria-label="Link de dados">MISSION_DATA_LINK</small>
                        <button id="close-hud" class="btn-close" aria-label="Fechar">[X] FECHAR</button>
                    </div>
                    <h2 class="title" style="color:white; font-size:28px; margin:10px 0; font-weight:900;">${m.name}</h2>
                    <small class="subtitle" style="color:var(--hud-green); font-weight:bold; letter-spacing:1px; font-family: monospace;">${m.type} // ID: ${m.id}</small>
                </header>

                <div class="hud-block hero-stat" aria-label="Taxa de processamento">
                    <label class="label-small" style="color:var(--hud-cyan); font-size:9px; font-weight:bold;">TAXA DE PROCESSAMENTO ATIVA</label>
                    <div class="val" style="font-weight:700; font-size:32px; display:flex; align-items:baseline; gap:6px;">
                        ${m.val}<small>${m.unit}</small>
                    </div>
                    <div class="wave-wrap" aria-hidden="true">
                        <svg class="wave-line" viewBox="0 0 120 20" preserveAspectRatio="none"><path d="M0,10 C20,20 40,0 60,10 C80,20 100,0 120,10 V20 H0 Z"></path></svg>
                    </div>
                </div>

                <div class="grid-stats" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    ${m.stats.map(s => `
                        <div class="hud-block stat-item" style="padding:12px;">
                            <label class="label-small" style="font-size:8px; color:#81afb5; display:block;">${s.l}</label>
                            <span class="value" style="color:#fff; font-weight:bold; font-size:12px;">${s.v}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="hud-block">
                    <label class="label-small" style="color:#81afb5; font-size:8px; display:block; margin-bottom:12px; text-transform:uppercase; letter-spacing: 1px;">Unidades operacionais</label>
                    ${m.units.map(u => `
                        <div class="unit-item" style="display:flex; align-items:center; justify-content:space-between; padding:6px 0;">
                            <div class="unit-meta"><span>${u.n}</span><span>${u.p}</span></div>
                            <div class="progress-rail" style="flex:1; margin-left:12px; height:6px; background:#1f2b35; border-radius:6px; overflow:hidden;">
                                <div class="progress-fill" style="width:${u.p}; height:100%; background: linear-gradient(90deg, #00ffd9, #007aff);"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="history-box" aria-label="Histórico de variações">
                    <h4 style="color:white; font-size:11px; margin-bottom:10px;">/ HISTÓRICO DE VARIAÇÕES</h4>
                    <div class="history-grid">${history}</div>
                    <button class="btn-hud" onclick="window.location.href='alerts.html'">CENTRAL DE COMANDO</button>
                </div>
            </div>`;

        document.getElementById('close-hud').onclick = () => {
            document.querySelectorAll('.water-node').forEach(n => n.classList.remove('active'));
            renderScanner();
        };
    }

    // Inicialização: cria nós, a Lua e os conteúdos
    function init() {
        // Evita re-inicializar
        if (!overlay || initDone) return;

        renderScanner();
        createMoon();

        // Cria os marcadores de água
        MISSIONS.forEach(m => {
            const btn = document.createElement('button');
            btn.className = 'water-node';
            btn.style.top = m.top; btn.style.left = m.left;
            btn.innerHTML = `
                <span class="node-icon" style="font-size:24px; filter:grayscale(1) brightness(2.5);">${m.icon}</span>
                <small class="node-label" style="position:absolute; bottom:-18px; color:var(--hud-green); font-size:8px; font-family:monospace; white-space:nowrap;">${m.id}</small>
            `;
            btn.onclick = (e) => {
                e.stopPropagation();
                document.querySelectorAll('.water-node').forEach(n => n.classList.remove('active'));
                btn.classList.add('active');
                renderDetails(m);
            };
            overlay.appendChild(btn);
        });

        initDone = true;
        // Mantemos a Lua centrada em reflows
        positionMoon();
    }

    // Mantém a Lua centrada ao redimensionar
    function positionMoon() {
        // A Lua é posicionada via CSS (transform translate(-50%, -50%)).
        // Este wrapper pode ser usado para ajustes adicionais se necessário.
        const moon = document.getElementById('central-moon');
        if (moon) {
            // Garantir que o tamanho responda bem ao viewport
            moon.style.width = "clamp(180px, 28vw, 320px)";
            moon.style.height = "auto";
        }
    }

    // Observador simples para re-positionar a Lua em mudanças de layout
    window.addEventListener('resize', positionMoon);

    // Início: tenta inicializar repetidamente até o overlay existir
    setInterval(init, 500);

    // Exporta para que o usuário possa reusá-lo (opcional)
})();
