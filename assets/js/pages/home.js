(function () {
    "use strict";

    const MISSIONS = [
        {
            id: "NAIA-01",
            name: "NAIÁ (CICLO DE RECICLAGEM)",
            type: "ÁGUAS CINZAS",
            top: "35%",
            left: "72%",
            icon: "<i class=\"fa-solid fa-recycle \"></i>",
            desc: "Processamento e filtragem de águas cinzas para reuso contínuo.",
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
            id: "JACI-04",
            name: "JACI (CENTRO DE CONDENSADORES)",
            type: "ESTOQUE POTÁVEL",
            top: "55%",
            left: "32%",
            icon: "<i class=\"fa-solid fa-droplet text-fluid-pure\"></i>",
            desc: "Coleta e monitoramento da umidade atmosférica e condensação.",
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
            id: "YVY-09",
            name: "YVY (CONVERSOR DE BIOMASSA)",
            type: "BIOMASSA",
            top: "75%",
            left: "55%",
            icon: "<i class=\"fa-solid fa-seedling text-fluid-organic\"></i>",
            desc: "Conversão de resíduos orgânicos em nutrientes e umidade para sustentar a vida.",
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
                <div class="inspetor-painel__vazio">
                    <i class="fa-solid fa-satellite-dish inspetor-painel__vazio-icone"></i>
                    <p>
                        Aguardando seleção.<br>
                        Selecione uma missão na malha lunar.
                    </p>
                </div>
            </div>
        `;
    }

    function renderDetails(m) {
        const history = Array(70)
            .fill()
            .map(
                () =>
                    `<div class="sq lv${Math.floor(
                        Math.random() * 5
                    )}"></div>`
            )
            .join("");

        sidePanel.innerHTML = `
            <div class="inspetor-painel animate-in">

                <div class="inspetor-painel__cabecalho">
                    <h2>
                        ${m.icon}
                        <span> /</span>${m.name}
                    </h2>

                    <button
                        id="close-hud"
                        class="botao botao--ghost botao--icone"
                        aria-label="Fechar painel de detalhes"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div class="inspetor-painel__formulario">

                    <div class="inspetor-painel__grupo-form">
                        <label>Tipo de Missão</label>

                        <input
                            type="text"
                            value="${m.type}"
                            readonly
                            class="input-readonly"
                        >
                    </div>

                    <div class="inspetor-painel__grupo-form">
                        <label>ID</label>

                        <input
                            type="text"
                            value="${m.id}"
                            readonly
                            class="input-readonly"
                        >
                    </div>

                    <div class="inspetor-painel__grupo-form">
                        <label>Descrição Operacional</label>
                        <div class="input-readonly" style="height: auto; min-height: 40px; font-weight: normal; line-height: 1.5; white-space: normal;">
                            ${m.desc}
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

                    <div class="inspetor-painel__grupo-form" style="margin-top: 10px;">
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

                        <button
                            class="botao botao--outline"
                            style="width: 100%; margin-top: 10px;"
                            onclick="window.location.href='alerts.html'"
                        >
                            CENTRAL DE COMANDO
                        </button>
                    </div>

                </div>

            </div>
        `;

        document
            .getElementById("close-hud")
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
            const btn = document.createElement("button");

            btn.className = "water-node";
            btn.style.top = m.top;
            btn.style.left = m.left;

            btn.setAttribute(
                "aria-label",
                `Nó de missão: ${m.name}`
            );

            btn.innerHTML = `
                <span class="node-icon" aria-hidden="true">
                    ${m.icon}
                </span>

                <small class="node-label">
                    ${m.id}
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