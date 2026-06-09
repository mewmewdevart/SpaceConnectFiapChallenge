document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("alerts-container");
    if (!container) return;

    // Dados dinâmicos de alertas (agora vindo da Store Global)
    const activeAlerts = window.YJaciAlerts || [];

    const icons = {
        "critico": '<i class="fa-solid fa-triangle-exclamation alerta__icone-svg"></i>',
        "aviso": '<svg class="alerta__icone-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a1 1 0 0 1 .993.883L13 3v10a1 1 0 0 1-1.993.117L11 13V3a1 1 0 0 1 1-1zm0 18a1.5 1.5 0 1 1-.001-2.999A1.5 1.5 0 0 1 12 20z"></path></svg>',
        "info": '<i class="fa-solid fa-circle-info alerta__icone-svg"></i>'
    };

    const labels = {
        "critico": "Crítico",
        "aviso": "Aviso",
        "info": "Info"
    };

    const colors = {
        "critico": "danger",
        "aviso": "warning",
        "info": "info"
    };

    let html = "";

    activeAlerts.forEach(alerta => {
        // Obter os dados do Core (caso exista)
        const sys = window.YJaciCore && window.YJaciCore.getSystem ? window.YJaciCore.getSystem(alerta.systemId) : null;
        
        // Se o sistema for conhecido, usamos o nome e geramos os links investigativos.
        // Se não (ex: rover genérico), usamos texto simples.
        const systemDisplay = sys 
            ? `<a href="resources.html?focus=${sys.id}" style="color: var(--steel); text-decoration: none; font-family: var(--font-mono); font-weight: bold; font-size: 1.1em; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">${sys.id}</a>` 
            : `<span style="font-family: var(--font-mono); font-weight: bold; font-size: 1.1em;">${alerta.systemId}</span>`;

        const equipmentDisplay = sys ? sys.systemName : "Sistema Externo / Não Especificado";

        const initiativeDisplay = (sys && sys.initiative)
            ? `<a href="flow.html?focus=${sys.initiativeId}" style="color: var(--success); font-weight: bold; text-decoration: none; border-bottom: 1px dashed var(--success); transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">${sys.initiative.name}</a>`
            : `<span style="font-weight: bold;">N/A</span>`;

        const contextualMessage = `
            <div style="font-size: 1.15em; font-weight: bold; color: var(--text-light); margin-bottom: 12px;">${alerta.message}</div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
                <div>
                    <small style="color: var(--text-muted); text-transform: uppercase; font-size: 0.7em; letter-spacing: 1px;">Sistema</small><br>
                    ${systemDisplay}
                </div>
                <div>
                    <small style="color: var(--text-muted); text-transform: uppercase; font-size: 0.7em; letter-spacing: 1px;">Associado</small><br>
                    ${initiativeDisplay}
                </div>
                <div style="grid-column: span 2;">
                    <small style="color: var(--text-muted); text-transform: uppercase; font-size: 0.7em; letter-spacing: 1px;">Equipamento</small><br>
                    <span style="color: var(--text-light);">${equipmentDisplay}</span>
                </div>
            </div>
        `;

        let acoesHTML = `<button class="botao botao--secundario botao--sm" aria-label="Ver detalhes do evento ${alerta.id}">Detalhes</button>`;
        
        if (alerta.type === "critico" || alerta.requiresConfirm) {
            acoesHTML += ` <a href="support.html?create_ticket=${alerta.systemId}" class="botao botao--primario botao--icone" style="text-decoration: none;" aria-label="Acionar protocolo de emergência">Acionar Protocolo</a>`;
        }

        html += `
            <article class="alerta alerta--${alerta.type}">
                <div class="alerta__indicador-lateral" aria-hidden="true">${icons[alerta.type]}</div>
                <div class="alerta__corpo">
                    <div class="alerta__linha-topo">
                        <div class="alerta__grupo-esquerdo">
                            <span class="etiqueta etiqueta--${colors[alerta.type]}">${labels[alerta.type]}</span>
                            <span class="alerta__codigo-evento">${alerta.id}</span>
                        </div>
                        <time class="alerta__tempo-evento" aria-label="Tempo decorrido: ${alerta.time}">${alerta.time}</time>
                    </div>
                    <p class="alerta__texto-evento">${contextualMessage}</p>
                    <span class="alerta__fonte-evento">Fonte: ${alerta.source}</span>
                    <div class="alerta__acoes">${acoesHTML}</div>
                </div>
            </article>
        `;
    });

    container.innerHTML = html;

    // Religar Lógica de Confirmação
    const confirmButtons = document.querySelectorAll('.alerta__botao-acao--confirmar');
    confirmButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const alerta = e.target.closest('.alerta');
            if (alerta) {
                alerta.classList.add('alerta--resolvido');
                e.target.innerHTML = '<i class="fa-solid fa-check"></i> Confirmado';
                e.target.disabled = true;
                e.target.classList.add('alerta__botao-acao--desabilitado');

                const cardetiqueta = document.querySelector('.cartao-macro--yellow .cartao-macro__valor');
                if (alerta.classList.contains('alerta--aviso') && cardetiqueta) {
                    let num = parseInt(cardetiqueta.textContent);
                    if (!isNaN(num) && num > 0) {
                        cardetiqueta.textContent = num - 1;
                    }
                }
            }
        });
    });

    // Efeito Dominó: Destacar alertas se viermos via URL (ex: ?focus=CCA-04)
    const urlParams = new URLSearchParams(window.location.search);
    const focusId = urlParams.get('focus');
    if (focusId) {
        setTimeout(() => {
            const allAlerts = document.querySelectorAll('.alerta');
            allAlerts.forEach(alerta => {
                const systemLink = alerta.querySelector('a[href^="resources.html?focus="]');
                const rawSystemText = alerta.querySelector('.alerta__texto-evento span');
                
                let belongsToFocus = false;
                if (systemLink && systemLink.textContent.trim().toUpperCase() === focusId.toUpperCase()) {
                    belongsToFocus = true;
                } else if (rawSystemText && rawSystemText.textContent.trim().toUpperCase() === focusId.toUpperCase()) {
                    belongsToFocus = true;
                }

                if (belongsToFocus) {
                    alerta.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    alerta.style.boxShadow = "0 0 30px rgba(var(--critical), 0.3)";
                    alerta.style.transform = "scale(1.02)";
                    alerta.style.transition = "all 0.5s ease";
                    setTimeout(() => {
                        alerta.style.boxShadow = "";
                        alerta.style.transform = "";
                    }, 2000);
                } else {
                    alerta.style.opacity = "0.3"; // Diminui o destaque dos outros
                    setTimeout(() => {
                        alerta.style.opacity = "1";
                    }, 2000);
                }
            });
        }, 500);
    }
});
