(function () {
    "use strict";

    function hexToRGBA(hex, alpha) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    window.initFlow = function () {
        const board = document.querySelector('.fluxo-quadro');
        const boardContent = document.getElementById('fluxo-quadro__conteudo');
        const svg = document.querySelector('.fluxo-svg');
        const mainContent = document.querySelector('.conteudo__principal');
        if (!board || !svg || !boardContent) return;

        // Clear existing elements (prevent duplication in SPA routing)
        boardContent.querySelectorAll('.fluxo-cartao').forEach(c => c.remove());
        boardContent.querySelectorAll('.fluxo-valvula-btn').forEach(v => v.remove());
        svg.innerHTML = '';

        // Zoom & Pan State
        let zoom = 0.8;
        let panX = 20;
        let panY = 20;
        let boardMoved = false;

        function updateTransform() {
            boardContent.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
        }

        const getCSSVar = (varName, fallback) => {
            const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
            return val || fallback;
        };

        // Initial system modules and connection lines
        let modules = [
            { id: "greywater_tank", name: "Tanque de Água Cinza", subtitle: "Captação de pias e chuveiros", category: "source", icon: "fa-sink", level: 65, status: "nominal", x: 20, y: 20, fluid: "greywater", color: getCSSVar("--fluid-color-gray", "#81afb5") },
            { id: "atm_collector", name: "Coletor de Umidade", subtitle: "Condensador de vapor ambiental", category: "source", icon: "fa-cloud", level: 40, status: "nominal", x: 20, y: 165, fluid: "pure_water", color: getCSSVar("--fluid-color-pure", "#00d2ff") },
            { id: "biomass_collector", name: "Coletor de Biomassa", subtitle: "Matéria orgânica sintotrópica", category: "source", icon: "fa-leaf", level: 88, status: "warning", x: 20, y: 310, fluid: "organic", color: getCSSVar("--fluid-color-organic", "#f7e476") },

            { id: "ro_purifier", name: "Purificador Osmose Reversa", subtitle: "Filtragem de membrana avançada", category: "treatment", icon: "fa-filter", level: 55, status: "nominal", x: 330, y: 30, fluid: "pure_water", color: getCSSVar("--fluid-color-pure", "#00d2ff") },
            { id: "uv_sterilizer", name: "Esterilizador UV", subtitle: "Eliminação de patógenos por UV", category: "treatment", icon: "fa-sun", level: 92, status: "warning", x: 330, y: 175, fluid: "disinfected", color: getCSSVar("--fluid-color-disinfected", "#a55eea") },
            { id: "comp_reactor", name: "Reator Compostador", subtitle: "Decomposição bioativa sintólica", category: "treatment", icon: "fa-recycle", level: 30, status: "nominal", x: 330, y: 310, fluid: "fertilizer", color: getCSSVar("--fluid-color-fertilizer", "#a1e55a") },

            { id: "potable_tank", name: "Tanque de Água Potável", subtitle: "Rede de abastecimento humano", category: "destination", icon: "fa-glass-water", level: 75, status: "nominal", x: 620, y: 30, fluid: "potable", color: getCSSVar("--fluid-color-potable", "#0984e3") },
            { id: "irrigation_tank", name: "Tanque de Irrigação", subtitle: "Subsistema agrícola hidropônico", category: "destination", icon: "fa-seedling", level: 20, status: "warning", x: 620, y: 175, fluid: "agricultural", color: getCSSVar("--fluid-color-agricultural", "#38b764") },
            { id: "biotic_fert", name: "Fertilizante Biótico", subtitle: "Rede de distribuição nutritiva", category: "destination", icon: "fa-flask", level: 50, status: "nominal", x: 620, y: 320, fluid: "nutrient", color: getCSSVar("--fluid-color-nutrient", "#26de81") }
        ];

        let connections = [
            { id: "conn_1", from: "greywater_tank", to: "ro_purifier", status: "open" },
            { id: "conn_2", from: "atm_collector", to: "uv_sterilizer", status: "open" },
            { id: "conn_3", from: "biomass_collector", to: "comp_reactor", status: "open" },
            { id: "conn_4", from: "ro_purifier", to: "potable_tank", status: "open" },
            { id: "conn_5", from: "uv_sterilizer", to: "irrigation_tank", status: "open" },
            { id: "conn_6", from: "comp_reactor", to: "biotic_fert", status: "open" },
            { id: "conn_emergency", from: "potable_tank", to: "irrigation_tank", status: "open" }
        ];

        let selectedElement = null;
        let activeSocketFrom = null;

        function renderCards() {
            boardContent.querySelectorAll('.fluxo-cartao').forEach(c => c.remove());

            modules.forEach(module => {
                const card = document.createElement('div');
                card.classList.add('fluxo-cartao', 'cartao-vidro', 'hud-corners');
                card.id = `card-${module.id}`;
                card.style.left = `${module.x}px`;
                card.style.top = `${module.y}px`;

                card.style.setProperty('--level-percent', `${module.level}%`);
                card.style.setProperty('--fluid-color', module.color);
                card.style.setProperty('--fluid-color-alpha', hexToRGBA(module.color, 0.12));
                card.style.setProperty('--fluid-color-alpha-more', hexToRGBA(module.color, 0.05));

                if (module.status === 'warning') card.classList.add('fluxo-cartao--aviso');

                card.innerHTML = `
                    <div class="fluxo-cartao__onda-container">
                        <div class="fluxo-cartao__onda"></div>
                        <div class="fluxo-cartao__onda-tras"></div>
                    </div>
                    <div class="fluxo-cartao__interior">
                        <div class="fluxo-cartao__meta">
                            <span>${module.category.toUpperCase()}</span>
                            <div class="fluxo-cartao__ponto-status"></div>
                        </div>
                        <div class="fluxo-cartao__conteudo">
                            <div class="fluxo-cartao__icone"><i class="fa-solid ${module.icon}"></i></div>
                            <div class="fluxo-cartao__texto">
                                <div class="fluxo-cartao__titulo">${module.name}</div>
                                <div class="fluxo-cartao__subtitulo">${module.subtitle}</div>
                            </div>
                        </div>
                        <div class="fluxo-cartao__estatisticas">
                            <span class="fluxo-cartao__rotulo-nivel">VOLUME</span>
                            <span class="fluxo-cartao__valor-nivel">${module.level}%</span>
                        </div>
                    </div>
                `;

                // Add connector sockets dynamically
                if (module.category !== 'destination') {
                    const socketOut = document.createElement('div');
                    socketOut.className = 'fluxo-soquete fluxo-soquete--saida';
                    socketOut.title = "Criar conexão (Saída)";
                    socketOut.setAttribute("aria-label", `Soquete de saída de ${module.name}`);
                    socketOut.setAttribute("role", "button");
                    socketOut.setAttribute("tabindex", "0");
                    socketOut.addEventListener('click', (e) => {
                        e.stopPropagation();
                        handleSocketOutClick(module.id, socketOut);
                    });
                    card.appendChild(socketOut);
                }

                if (module.category !== 'source') {
                    const socketIn = document.createElement('div');
                    socketIn.className = 'fluxo-soquete fluxo-soquete--entrada';
                    socketIn.title = "Engatar conexão (Entrada)";
                    socketIn.setAttribute("aria-label", `Soquete de entrada de ${module.name}`);
                    socketIn.setAttribute("role", "button");
                    socketIn.setAttribute("tabindex", "0");
                    socketIn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        handleSocketInClick(module.id, socketIn);
                    });
                    card.appendChild(socketIn);
                }

                setupDragAndDrop(card, module);

                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectElement({ type: 'module', data: module, el: card });
                });

                boardContent.appendChild(card);
            });
        }

        // Unified Drag & Drop using Pointer Events (supports mouse and touch smoothly)
        function setupDragAndDrop(cardEl, module) {
            cardEl.addEventListener('pointerdown', (e) => {
                if (e.target.classList.contains('fluxo-soquete')) return;
                cardEl.setPointerCapture(e.pointerId);
                e.preventDefault();
                e.stopPropagation();

                const startX = e.clientX;
                const startY = e.clientY;
                const origX = module.x;
                const origY = module.y;

                board.classList.add('arrastando');

                function onPointerMove(ev) {
                    const dx = (ev.clientX - startX) / zoom;
                    const dy = (ev.clientY - startY) / zoom;
                    module.x = origX + dx;
                    module.y = origY + dy;
                    cardEl.style.left = `${module.x}px`;
                    cardEl.style.top = `${module.y}px`;
                    drawConnections();
                }

                function onPointerUp() {
                    board.classList.remove('arrastando');
                    cardEl.releasePointerCapture(e.pointerId);
                    cardEl.removeEventListener('pointermove', onPointerMove);
                    cardEl.removeEventListener('pointerup', onPointerUp);
                    cardEl.removeEventListener('pointercancel', onPointerUp);
                }

                cardEl.addEventListener('pointermove', onPointerMove);
                cardEl.addEventListener('pointerup', onPointerUp);
                cardEl.addEventListener('pointercancel', onPointerUp);
            });
        }

        /**
         * Renderiza as linhas SVG conectando os módulos.
         * Calcula o caminho utilizando Curvas de Bézier e posiciona a válvula no ponto médio (t=0.5).
         */
        function drawConnections() {
            svg.innerHTML = '';
            boardContent.querySelectorAll('.fluxo-valvula-btn').forEach(v => v.remove());

            connections.forEach((conn) => {
                const fromMod = modules.find(m => m.id === conn.from);
                const toMod = modules.find(m => m.id === conn.to);
                if (!fromMod || !toMod) return;

                const x_out = fromMod.x + 200;
                const y_out = fromMod.y + 115 / 2;
                const x_in = toMod.x;
                const y_in = toMod.y + 115 / 2;

                // Cubic Bezier curve control points definition
                const dx = Math.max(60, Math.abs(x_in - x_out) / 2);
                const pathData = `M ${x_out} ${y_out} C ${x_out + dx} ${y_out}, ${x_in - dx} ${y_in}, ${x_in} ${y_in}`;

                const pathBg = document.createElementNS("http://www.w3.org/2000/svg", "path");
                pathBg.setAttribute("d", pathData);
                pathBg.setAttribute("class", "fluxo-tubo-bg interativo");
                if (selectedElement && selectedElement.type === 'connection' && selectedElement.data.id === conn.id) {
                    pathBg.classList.add('selecionado');
                }
                pathBg.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectElement({ type: 'connection', data: conn, el: pathBg });
                });
                svg.appendChild(pathBg);

                const pathFlow = document.createElementNS("http://www.w3.org/2000/svg", "path");
                pathFlow.setAttribute("d", pathData);
                pathFlow.setAttribute("class", "fluxo-tubo-fluxo");
                pathFlow.style.stroke = fromMod.color;
                if (conn.status === 'closed') pathFlow.classList.add('bloqueado');
                svg.appendChild(pathFlow);

                // Algebraic midpoint calculation of the Cubic Bezier curve (t = 0.5) to place the valve button
                const mid_x = 0.125 * x_out + 0.375 * (x_out + dx) + 0.375 * (x_in - dx) + 0.125 * x_in;
                const mid_y = 0.125 * y_out + 0.375 * y_out + 0.375 * y_in + 0.125 * y_in;

                const valveBtn = document.createElement('button');
                valveBtn.className = `fluxo-valvula-btn botao botao--sm ${conn.status === 'open' ? 'botao--sucesso' : 'botao--alerta'}`;
                valveBtn.setAttribute('aria-label', `Alternar válvula de ${fromMod.name} para ${toMod.name}. Status atual: ${conn.status === 'open' ? 'Livre' : 'Bloqueada'}`);
                valveBtn.innerHTML = conn.status === 'open'
                    ? '<i class="fa-solid fa-play" aria-hidden="true"></i> LIVRE'
                    : '<i class="fa-solid fa-pause" aria-hidden="true"></i> BLOQ.';
                valveBtn.style.left = `${mid_x}px`;
                valveBtn.style.top = `${mid_y}px`;
                valveBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleValve(conn);
                });
                boardContent.appendChild(valveBtn);
            });
        }

        function toggleValve(conn) {
            conn.status = conn.status === 'open' ? 'closed' : 'open';

            drawConnections();

            if (selectedElement && selectedElement.type === 'connection' && selectedElement.data.id === conn.id) {
                selectElement(selectedElement);
            }
            updateMobileView();

            const fromMod = modules.find(m => m.id === conn.from);
            const toMod = modules.find(m => m.id === conn.to);
            if (fromMod && toMod && window.addTelemetryLog) {
                const acao = conn.status === 'open' ? 'ABERTA' : 'FECHADA';
                window.addTelemetryLog(`Válvula de ${fromMod.name} para ${toMod.name} foi ${acao}`);
            }
        }

        function handleSocketOutClick(moduleId, socketEl) {
            const prevSocket = boardContent.querySelector('.fluxo-soquete--selecionado');
            if (prevSocket) prevSocket.classList.remove('fluxo-soquete--selecionado');

            activeSocketFrom = moduleId;
            socketEl.classList.add('fluxo-soquete--selecionado');
            board.classList.add('modo-conexao');
        }

        function handleSocketInClick(moduleId, socketEl) {
            if (!activeSocketFrom) return;
            if (activeSocketFrom === moduleId) {
                resetConnectionMode();
                return;
            }

            if (connections.some(c => c.from === activeSocketFrom && c.to === moduleId)) {
                resetConnectionMode();
                return;
            }

            connections.push({
                id: `conn_${Date.now()}`,
                from: activeSocketFrom,
                to: moduleId,
                status: "open"
            });

            resetConnectionMode();
            drawConnections();
            updateMobileView();
        }

        function resetConnectionMode() {
            activeSocketFrom = null;
            board.classList.remove('modo-conexao');
            const prevSocket = boardContent.querySelector('.fluxo-soquete--selecionado');
            if (prevSocket) prevSocket.classList.remove('fluxo-soquete--selecionado');
        }

        // Zoom on mouse wheel (centered on pointer position)
        board.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomSpeed = 0.06;
            let newZoom = Math.max(0.4, Math.min(2.0, zoom + (e.deltaY < 0 ? zoomSpeed : -zoomSpeed)));

            const rect = board.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const xs = (mouseX - panX) / zoom;
            const ys = (mouseY - panY) / zoom;

            zoom = newZoom;
            panX = mouseX - xs * zoom;
            panY = mouseY - ys * zoom;
            updateTransform();
        }, { passive: false });

        // Unified Board Panning using Pointer Events
        board.addEventListener('pointerdown', (e) => {
            const target = e.target;
            if (target !== board && target !== boardContent && target.tagName !== 'svg') return;
            if (e.button !== 0 && e.pointerType === 'mouse') return;

            board.setPointerCapture(e.pointerId);
            e.preventDefault();
            boardMoved = false;

            const startX = e.clientX - panX;
            const startY = e.clientY - panY;
            const pointerStartX = e.clientX;
            const pointerStartY = e.clientY;

            board.style.cursor = 'grabbing';

            function onPointerMove(ev) {
                panX = ev.clientX - startX;
                panY = ev.clientY - startY;
                if (Math.hypot(ev.clientX - pointerStartX, ev.clientY - pointerStartY) > 3) {
                    boardMoved = true;
                }
                updateTransform();
            }

            function onPointerUp() {
                board.style.cursor = 'grab';
                board.releasePointerCapture(e.pointerId);
                board.removeEventListener('pointermove', onPointerMove);
                board.removeEventListener('pointerup', onPointerUp);
                board.removeEventListener('pointercancel', onPointerUp);
            }

            board.addEventListener('pointermove', onPointerMove);
            board.addEventListener('pointerup', onPointerUp);
            board.addEventListener('pointercancel', onPointerUp);
        });

        board.addEventListener('click', (e) => {
            if (boardMoved) return;
            const target = e.target;
            if (target !== board && target !== boardContent && target.tagName !== 'svg') return;

            if (activeSocketFrom) {
                resetConnectionMode();
                addTelemetryLog("Instalação rápida cancelada.", "log-info");
            }
            selectElement(null);
        });

        // Interactive Zoom Panel controls
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        const zoomResetBtn = document.getElementById('zoom-reset-btn');

        function zoomCenter(factor) {
            let newZoom = Math.max(0.4, Math.min(2.0, zoom * factor));
            const rect = board.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const xs = (centerX - panX) / zoom;
            const ys = (centerY - panY) / zoom;

            zoom = newZoom;
            panX = centerX - xs * zoom;
            panY = centerY - ys * zoom;
            updateTransform();
        }

        if (zoomInBtn) zoomInBtn.addEventListener('click', () => zoomCenter(1.15));
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => zoomCenter(0.85));
        if (zoomResetBtn) {
            zoomResetBtn.addEventListener('click', () => {
                zoom = 1;
                panX = 0;
                panY = 0;
                updateTransform();
                addTelemetryLog("Visualização resetada para 1:1.", "log-info");
            });
        }

        // Sidebar Inspector management
        const inspectorPanel = document.querySelector('.painel-direito');

        function selectElement(elementObj) {
            const prevSelectedCard = boardContent.querySelector('.fluxo-cartao.selecionado');
            if (prevSelectedCard) prevSelectedCard.classList.remove('selecionado');

            const prevSelectedMobile = document.querySelector('.fluxo-mobile-cartao.selecionado');
            if (prevSelectedMobile) prevSelectedMobile.classList.remove('selecionado');

            const prevSelectedPipe = svg.querySelector('.fluxo-tubo-bg.selecionado');
            if (prevSelectedPipe) prevSelectedPipe.classList.remove('selecionado');

            selectedElement = elementObj;
            if (!inspectorPanel) return;

            if (!elementObj) {
                inspectorPanel.innerHTML = `
                    <div class="inspetor-painel">
                        <div class="inspetor-painel__cabecalho">
                            <h2><span>/</span>Painel Inspetor</h2>
                        </div>
                        <div class="inspetor-painel__vazio">
                            <i class="fa-solid fa-circle-info"></i>
                            <p>Nenhum elemento selecionado.<br>Clique em um módulo ou tubulação para calibrar.</p>
                        </div>
                    </div>
                `;
                return;
            }

            if (elementObj.type === 'module') {
                const moduleId = elementObj.id || (elementObj.data && elementObj.data.id);
                const module = elementObj.data || modules.find(m => m.id === moduleId);

                const card = boardContent.querySelector(`#card-${moduleId}`);
                if (card) card.classList.add('selecionado');

                const mobileCard = document.querySelector(`.fluxo-mobile-cartao[data-mod-id="${moduleId}"]`);
                if (mobileCard) mobileCard.classList.add('selecionado');

                const moduleData = modules.find(m => m.id === moduleId);
                inspectorPanel.innerHTML = `
                    <div class="inspetor-painel">
                        <div class="inspetor-painel__cabecalho">
                            <h2>
                                <i class="fa-solid ${moduleData.icon} inspetor-painel__icone text-fluid-${moduleData.fluid}"></i>
                                <span>/</span>Calibração
                            </h2>
                            <span class="etiqueta inspetor-painel__etiqueta">MÓDULO</span>
                        </div>
                        <form class="inspetor-painel__formulario" onsubmit="event.preventDefault();">
                            <div class="inspetor-painel__grupo-form">
                                <label>Nome do Módulo</label>
                                <input type="text" id="inspect-mod-name" value="${module.name}">
                            </div>
                            <div class="inspetor-painel__grupo-form">
                                <label>Subtítulo / Descrição</label>
                                <input type="text" id="inspect-mod-sub" value="${module.subtitle}">
                            </div>
                            <div class="inspetor-painel__grupo-form">
                                <label>Categoria Física</label>
                                <select id="inspect-mod-cat" disabled>
                                    <option value="source" ${module.category === 'source' ? 'selected' : ''}>Fontes e Coletores</option>
                                    <option value="treatment" ${module.category === 'treatment' ? 'selected' : ''}>Sistemas de Tratamento</option>
                                    <option value="destination" ${module.category === 'destination' ? 'selected' : ''}>Destinos de Consumo</option>
                                </select>
                            </div>
                            <div class="inspetor-painel__acoes">
                                <button type="button" class="botao botao--secundario inspetor-painel__btn-cancelar" id="inspect-inspetor-painel__btn-cancelar">
                                    <i class="fa-solid fa-xmark"></i> Cancelar
                                </button>
                                <button type="button" class="botao botao--primario inspetor-painel__btn-salvar" id="inspect-inspetor-painel__btn-salvar">
                                    <i class="fa-solid fa-floppy-disk"></i> Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                `;

                const nameInput = document.getElementById('inspect-mod-name');
                const subInput = document.getElementById('inspect-mod-sub');
                const levelSlider = document.getElementById('inspect-mod-level');
                const levelVal = document.getElementById('inspect-mod-level-val');
                const btnSave = document.getElementById('inspect-inspetor-painel__btn-salvar');
                const btnCancel = document.getElementById('inspect-inspetor-painel__btn-cancelar');

                // Visual-only updates during slider drag
                levelSlider.addEventListener('input', (e) => {
                    levelVal.textContent = `${e.target.value}%`;
                });

                // Cancel button deselects the current module
                btnCancel.addEventListener('click', () => {
                    selectElement(null);
                });

                // Save button applies the changes
                btnSave.addEventListener('click', () => {
                    const newName = nameInput.value.trim();
                    const newSub = subInput.value.trim();
                    const newLvl = parseInt(levelSlider.value);

                    if (!newName) {
                        alert("O nome do módulo não pode ser vazio.");
                        return;
                    }

                    const oldLvl = module.level;
                    const oldName = module.name;
                    const oldSub = module.subtitle;
                    const oldStatus = module.status;

                    // Update module data
                    module.name = newName;
                    module.subtitle = newSub;
                    module.level = newLvl;
                    module.status = (newLvl < 25 || newLvl > 80) ? 'warning' : 'nominal';

                    // Update card visually
                    if (card) {
                        const cardTitle = card.querySelector('.fluxo-cartao__titulo');
                        if (cardTitle) cardTitle.textContent = module.name;

                        const cardSub = card.querySelector('.fluxo-cartao__subtitulo');
                        if (cardSub) cardSub.textContent = module.subtitle;

                        card.style.setProperty('--level-percent', `${newLvl}%`);
                        const cardLvlVal = card.querySelector('.fluxo-cartao__valor-nivel');
                        if (cardLvlVal) cardLvlVal.textContent = `${newLvl}%`;

                        if (module.status === 'warning') {
                            card.classList.add('fluxo-cartao--aviso');
                        } else {
                            card.classList.remove('fluxo-cartao--aviso');
                        }
                    }

                    drawConnections();
                    updateMobileView();
                });

            } else if (elementObj.type === 'connection') {
                const conn = elementObj.data;
                const fromMod = modules.find(m => m.id === conn.from);
                const toMod = modules.find(m => m.id === conn.to);

                elementObj.el.classList.add('selecionado');

                inspectorPanel.innerHTML = `
                    <div class="inspetor-painel">
                        <div class="inspetor-painel__cabecalho">
                            <h2><i class="fa-solid fa-arrow-right-arrow-left inspetor-painel__icone"></i><span>/</span>Calibração</h2>
                            <span class="etiqueta inspetor-painel__etiqueta">TUBULAÇÃO</span>
                        </div>
                        <div class="inspetor-painel__formulario">
                            <div class="inspetor-painel__grupo-form">
                                <label>Origem do Fluxo</label>
                                <input type="text" value="${fromMod.name}" readonly class="input-readonly">
                            </div>
                            <div class="inspetor-painel__grupo-form">
                                <label>Destino do Abastecimento</label>
                                <input type="text" value="${toMod.name}" readonly class="input-readonly">
                            </div>
                            <div class="inspetor-painel__grupo-form">
                                <label>Controle de Fluxo</label>
                                <div class="inspetor-painel__container-valvula">
                                    <span>Válvula de Fechamento</span>
                                    <button class="botao botao--outline botao--valvula inspetor-painel__btn-valvula ${conn.status === 'open' ? 'valvula-aberta' : 'valvula-fechada'}" id="inspect-valve-toggle" aria-pressed="${conn.status === 'open' ? 'true' : 'false'}">
                                        ${conn.status === 'open' ? 'LIVRE' : 'BLOQUEADA'}
                                    </button>
                                </div>
                            </div>
                            
                            <button class="botao botao--perigo inspetor-painel__btn-perigo" id="inspect-delete-conn">
                                <i class="fa-solid fa-trash"></i> Desconectar Tubulação
                            </button>
                        </div>
                    </div>
                `;

                document.getElementById('inspect-valve-toggle').addEventListener('click', () => {
                    toggleValve(conn);
                });

                document.getElementById('inspect-delete-conn').addEventListener('click', () => {
                    connections = connections.filter(c => c.id !== conn.id);
                    selectElement(null);
                    drawConnections();
                    updateMobileView();
                });
            }
        }

        selectElement(null);
        // Mobile list view
        const mobileViewContainer = document.querySelector('.fluxo-mobile-container');
        const flowContainer = document.querySelector('.fluxo-container');

        function updateMobileView() {
            if (!mobileViewContainer) return;
            mobileViewContainer.innerHTML = '';

            const categories = [
                { key: 'source', title: 'Fontes e Coletores' },
                { key: 'treatment', title: 'Sistemas de Tratamento' },
                { key: 'destination', title: 'Destinos de Consumo' }
            ];

            categories.forEach(cat => {
                const catModules = modules.filter(m => m.category === cat.key);
                if (catModules.length === 0) return;

                const section = document.createElement('div');
                section.className = 'fluxo-mobile-categoria';
                section.innerHTML = `<h2>${cat.title}</h2>`;

                const list = document.createElement('div');
                list.className = 'fluxo-mobile-lista';

                catModules.forEach(mod => {
                    const cardItem = document.createElement('div');
                    cardItem.className = `fluxo-mobile-cartao cartao-vidro  ${mod.status === 'warning' ? 'fluxo-cartao--aviso' : ''}`;
                    cardItem.setAttribute('data-mod-id', mod.id);
                    if (selectedElement && selectedElement.type === 'module' && selectedElement.id === mod.id) {
                        cardItem.classList.add('selecionado');
                    }

                    const outgoingConns = connections.filter(c => c.from === mod.id);
                    let valveActionsHTML = '';

                    if (outgoingConns.length > 0) {
                        valveActionsHTML = `
                            <div class="fluxo-mobile-cartao__acoes">
                                <div class="fluxo-mobile-cartao__status-valvula">
                                    Válvulas de Saída:
                                    ${outgoingConns.map(c => {
                            const dest = modules.find(m => m.id === c.to);
                            const statusClass = c.status === 'open' ? 'valvula-aberta' : 'valvula-fechada';
                            const statusText = c.status === 'open' ? 'LIVRE' : 'BLOQ';
                            return `<div class="fluxo-mobile-cartao__item-valvula">↳ <b>${dest.name}</b>: <span class="${statusClass}">${statusText}</span></div>`;
                        }).join('')}
                                </div>
                                <div>
                                    ${outgoingConns.map(c => {
                            const dest = modules.find(m => m.id === c.to);
                            const btnLabel = c.status === 'open' ? 'Bloquear' : 'Liberar';
                            return `
                                            <button class="botao botao--outline botao--valvula botao--sm inspetor-painel__btn-valvula inspetor-painel__btn-valvula-sm ${c.status === 'open' ? 'valvula-aberta' : 'valvula-fechada'}" 
                                                    data-conn-id="${c.id}" aria-pressed="${c.status === 'open' ? 'true' : 'false'}">
                                                ${btnLabel} ${dest.name.split(' ')[0]}
                                            </button>
                                        `;
                        }).join('')}
                                </div>
                            </div>
                        `;
                    }

                    cardItem.innerHTML = `
                        <div class="fluxo-mobile-cartao__cabecalho">
                            <span class="fluxo-mobile-cartao__nome">
                                <i class="fa-solid ${mod.icon} fluxo-mobile-cartao__nome-icone text-fluid-${mod.fluid}"></i>${mod.name}
                            </span>
                            <span class="fluxo-mobile-cartao__nivel text-fluid-${mod.fluid}">${mod.level}%</span>
                        </div>
                        <div class="fluxo-mobile-cartao__subtitulo">${mod.subtitle}</div>
                        ${valveActionsHTML}
                    `;

                    cardItem.querySelectorAll('.inspetor-painel__btn-valvula').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const conn = connections.find(c => c.id === btn.getAttribute('data-conn-id'));
                            if (conn) toggleValve(conn);
                        });
                    });

                    cardItem.addEventListener('click', () => {
                        selectElement({ type: 'module', id: mod.id });
                        // Add a small delay so the DOM can paint the new inspector HTML before scrolling
                        setTimeout(() => {
                            const rightPanel = document.querySelector('.painel-direito');
                            if (rightPanel) {
                                rightPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }, 100);
                    });

                    list.appendChild(cardItem);
                });

                section.appendChild(list);
                mobileViewContainer.appendChild(section);
            });
        }

        // Safe window resize listener setup to prevent SPA memory leak
        if (window.flowResizeHandler) {
            window.removeEventListener('resize', window.flowResizeHandler);
        }
        window.flowResizeHandler = () => {
            if (flowContainer && window.innerWidth >= 1024) {
                drawConnections();
            }
        };
        window.addEventListener('resize', window.flowResizeHandler);

        /* ==========================================================================
           SIMULAÇÃO DE FÍSICA DE FLUIDOS E BACKPRESSURE
           ========================================================================== */
        /**
         * Calcula o fluxo de transferência e recalcula os volumes a cada tick.
         * Considera pressão de retorno (backpressure) quando o fluxo atinge capacidade total.
         */
        function simulateFlow() {
            const transferRate = 6;

            const getModule = (id) => modules.find(m => m.id === id);

            modules.forEach(m => {
                const incomings = connections.filter(c => c.to === m.id);
                const outgoings = connections.filter(c => c.from === m.id);

                // isReceiving: se for fonte primária (sem entradas) ou tiver alguma entrada aberta
                const isReceiving = incomings.length === 0 || incomings.some(c => c.status === 'open');

                // canDischarge: se for destino final (sem saídas, simula consumo da colônia) ou tiver alguma saída livre indo para um tanque não-cheio (< 100)
                const canDischarge = outgoings.length === 0 || outgoings.some(c => c.status === 'open' && getModule(c.to).level < 100);

                if (!isReceiving) {
                    // CONDIÇÃO 1: PAUSADO (Sem suprimento)
                    // Fica pausado na numeração exata em que estava
                } else if (isReceiving && !canDischarge) {
                    // CONDIÇÃO 2: ACÚMULO E BACKPRESSURE (Sem ter pra onde escoar)
                    // O tanque recebe mas não descarrega (ou porque bloquearam a saída, ou porque o tanque da frente está 100%).
                    m.level += transferRate;
                    if (m.level >= 100) m.level = 100;
                } else if (isReceiving && canDischarge) {
                    // CONDIÇÃO 3: FLUXO NORMAL LIVRE
                    // Caso venha de um destravamento recente (estava em 100), reduz um pouco para mostrar que destravou
                    if (m.level >= 100) m.level -= transferRate;

                    // Oscila levemente
                    m.level += (Math.random() * 2 - 1);

                    if (m.level < 1) m.level = 1;
                    if (m.level > 99) m.level = 99;
                }

                // Renderização visual
                const card = boardContent.querySelector(`#card-${m.id}`);
                if (card) {
                    const displayLevel = Math.round(m.level);
                    card.style.setProperty('--level-percent', `${displayLevel}%`);
                    const cardLvlVal = card.querySelector('.fluxo-cartao__valor-nivel');
                    if (cardLvlVal) cardLvlVal.textContent = `${displayLevel}%`;

                    // Alerta apenas quando entupir por completo
                    if (m.level === 100) {
                        card.classList.add('fluxo-cartao--aviso');
                    } else {
                        card.classList.remove('fluxo-cartao--aviso');
                    }
                }
            });

            if (selectedElement && selectedElement.type === 'module') {
                const m = selectedElement.data;
                const levelSlider = document.getElementById('inspect-mod-level');
                const levelVal = document.getElementById('inspect-mod-level-val');
                if (levelSlider && levelVal) {
                    const roundedLvl = Math.round(m.level);
                    levelSlider.value = roundedLvl;
                    levelVal.textContent = `${roundedLvl}%`;
                }
            }
        }

        if (window.flowSimulationInterval) {
            clearInterval(window.flowSimulationInterval);
        }
        window.flowSimulationInterval = setInterval(simulateFlow, 1000);
        // --- FIM DA SIMULAÇÃO ---

        renderCards();
        drawConnections();
        updateTransform();
        updateMobileView();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initFlow);
    } else {
        window.initFlow();
    }
})();


