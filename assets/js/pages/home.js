(function () {
    "use strict";

    const MISSIONS = [
        {
            systemId: "URC-01",
            top: "35%",
            left: "72%",
            val: "4.20",
            unit: "t/h",
            stats: [
                { l: "PUREZA", v: "99.9%" },
                { l: "PH", v: "7.2" },
                { l: "TEMP", v: "15°C" }
            ],
            units: [
                { n: "Filtro Osmose", p: "87%" },
                { n: "Célula Deion", p: "64%" }
            ]
        },
        {
            systemId: "CCA-04",
            top: "55%",
            left: "32%",
            val: "850",
            unit: "m³",
            stats: [
                { l: "AUTONOMIA", v: "120 SOLS" },
                { l: "PRESSÃO", v: "2.4 BAR" }
            ],
            units: [
                { n: "Bomba Principal", p: "100%" },
                { n: "Válvula A2", p: "92%" }
            ]
        },
        {
            systemId: "CVB-09",
            top: "75%",
            left: "55%",
            val: "1.15",
            unit: "kg/h",
            stats: [
                { l: "CARGA", v: "420kg" },
                { l: "PRODUÇÃO", v: "12kg/d" }
            ],
            units: [
                { n: "Reator", p: "45%" },
                { n: "Separador", p: "100%" }
            ]
        }
    ];

    const sidePanel = document.getElementById("side-info-panel");
    const overlay = document.getElementById("nodes-overlay");

    if (!overlay || !sidePanel) return;

    function renderScanner() {
        sidePanel.innerHTML = `
            <div class="inspetor-painel">
                <div class="inspetor-painel__cabecalho">
                    <h2>
                        <span>/</span>Painel de Contexto
                    </h2>
                </div>
                <div class="inspetor-painel__vazio">
                    <i class="fa-solid fa-circle-info"></i>
                    <p>Aguardando seleção.<br>Selecione um nó na malha lunar para inspecionar.</p>
                </div>
            </div>
        `;
    }

    function renderDetails(m) {
        const sys = window.YJaciCore ? window.YJaciCore.getSystem(m.systemId) : null;
        if (!sys) return;

        const icon = sys.icon || "<i class=\"fa-solid fa-microchip\"></i>";
        const physicalName = sys.systemName;
        const protocolName = sys.initiative ? sys.initiative.name : "N/A";
        const desc = sys.initiative ? sys.initiative.description : "Descrição indisponível.";
        const sysId = sys.id;

        const history = Array(70)
            .fill()
            .map(
                () =>
                    `<div class="sq lv${Math.floor(
                        Math.random() * 5
                    )}"></div>`
            )
            .join("");

        let iconColor = "var(--steel)";
        if (m.systemId === "URC-01") iconColor = "var(--steel)";
        else if (m.systemId === "CVB-09") iconColor = "var(--warning)";
        else if (m.systemId === "SIS-02") iconColor = "var(--success)";

        sidePanel.innerHTML = `
            <div class="inspetor-painel animate-in">

                <div class="inspetor-painel__cabecalho">
                    <h2 style="display: flex; align-items: center; gap: 8px;">
                        <span class="inspetor-painel__icone" style="display: flex; align-items: center; color: rgb(${iconColor});">${icon}</span>
                        <span>/</span>${sysId}
                    </h2>
                    <span class="etiqueta inspetor-painel__etiqueta ${sys.criticality === 'critical' ? 'etiqueta--danger' : 'etiqueta--success'}">
                        ${sys.criticality === 'critical' ? 'ALERTA' : 'SISTEMA OFICIAL'}
                    </span>
                </div>

                <div class="inspetor-painel__formulario">

                    <div class="inspetor-painel__grupo-form">
                        <label>Sistema Físico</label>

                        <input
                            type="text"
                            value="${physicalName}"
                            readonly
                            class="input-readonly"
                        >
                    </div>

                    <div class="inspetor-painel__grupo-form">
                        <label>Iniciativa Estratégica</label>

                        <input
                            type="text"
                            value="${protocolName}"
                            readonly
                            class="input-readonly"
                            style="color: rgb(var(--steel)); font-weight: bold;"
                        >
                    </div>

                    <div class="inspetor-painel__grupo-form">
                        <label>Descrição da Operação</label>
                        <div class="input-readonly" style="height: auto; min-height: 40px; font-weight: normal; line-height: 1.5; white-space: normal; cursor: not-allowed;">
                            ${desc}
                        </div>
                    </div>

                    <div class="inspetor-painel__grupo-form hero-stat-container">
                        <label>Taxa de Processamento Ativa</label>

                        <div class="val">
                            ${m.val}<small>${m.unit}</small>
                        </div>

                        <div class="wave-wrap" aria-hidden="true">
                            <svg
                                class="wave-line"
                                viewBox="0 0 120 20"
                                preserveAspectRatio="none"
                            >
                                <path d="M0,10 C20,20 40,0 60,10 C80,20 100,0 120,10 V20 H0 Z"></path>
                            </svg>
                        </div>
                    </div>

                    <div class="grid-stats">
                        ${m.stats
                .map(
                    (s) => `
                            <div class="stat-item cartao-vidro">
                                <label>${s.l}</label>
                                <span>${s.v}</span>
                            </div>
                        `
                )
                .join("")}
                    </div>

                    <div class="inspetor-painel__grupo-form">
                        <label>Unidades operacionais</label>

                        <div class="unit-list-container">
                            ${m.units
                .map(
                    (u) => `
                                <div class="unit-item">

                                    <div class="unit-meta">
                                        <span>${u.n}</span>
                                        <span class="unit-meta-porcentagem">
                                            ${u.p}
                                        </span>
                                    </div>

                                    <div class="progress-rail">
                                        <div
                                            class="progress-fill"
                                            style="width: ${u.p};"
                                        ></div>
                                    </div>

                                </div>
                            `
                )
                .join("")}
                        </div>
                    </div>

                    <div
                        class="history-box"
                        aria-label="Histórico de variações"
                    >
                        <label>/ HISTÓRICO DE VARIAÇÕES</label>

                        <div class="history-grid">
                            ${history}
                        </div>
                    </div>
                    
                    <div class="inspetor-painel__acoes">
                        <button type="button" class="botao botao--secundario inspetor-painel__btn-cancelar" id="close-hud-btn">
                            <i class="fa-solid fa-xmark"></i> Fechar
                        </button>
                        <a href="flow.html?focus=${sysId}" class="botao botao--primario" style="text-align: center; text-decoration: none;">
                            <i class="fa-solid fa-diagram-project"></i> Malha
                        </a>
                    </div>

                </div>

            </div>
        `;

        document
            .getElementById("close-hud-btn")
            ?.addEventListener("click", () => {
                document
                    .querySelectorAll(".water-node")
                    .forEach((n) => n.classList.remove("active"));

                renderScanner();
            });
    }

    function init() {
        renderScanner();

        MISSIONS.forEach((m) => {
            const sys = window.YJaciCore ? window.YJaciCore.getSystem(m.systemId) : null;
            const displayId = sys ? sys.id : m.systemId;
            const icon = sys && sys.icon ? sys.icon : "<i class=\"fa-solid fa-microchip\"></i>";

            const btn = document.createElement("button");
            btn.className = "water-node";
            btn.style.top = m.top;
            btn.style.left = m.left;
            
            btn.setAttribute(
                "aria-label",
                `Nó de missão: ${displayId}`
            );

            let iconColor = "var(--steel)";
            if (m.systemId === "URC-01") iconColor = "var(--steel)";
            else if (m.systemId === "CVB-09") iconColor = "var(--warning)";
            else if (m.systemId === "SIS-02") iconColor = "var(--success)";

            btn.innerHTML = `
                <span class="node-icon" aria-hidden="true" style="color: rgb(${iconColor}); text-shadow: 0 0 10px rgb(${iconColor});">
                    ${icon}
                </span>

                <small class="node-label">
                    ${displayId}
                </small>
            `;

            btn.addEventListener("click", (e) => {
                e.stopPropagation();

                document
                    .querySelectorAll(".water-node")
                    .forEach((n) => n.classList.remove("active"));

                btn.classList.add("active");

                renderDetails(m);
            });

            overlay.appendChild(btn);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();