/**
 * SUPPORT.JS
 * Gera tickets de manutenção com base nos alertas globais e lida
 * com o formulário de abertura pré-preenchido via URL (?create_ticket).
 */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lista-chamados-container");
    if (!container) return;

    const alerts = window.YJaciAlerts || [];
    let html = "";

    alerts.forEach((alerta, index) => {
        // Obter contexto ontológico
        const sys = window.YJaciCore ? window.YJaciCore.getSystem(alerta.systemId) : null;

        let protocolText = sys && sys.initiative ? ` — ${sys.initiative.name}` : "";
        let titulo = `Manutenção: ${alerta.systemId}${protocolText}`;

        let badgeClass = "danger";
        let badgeLabel = "Aberto";

        if (alerta.type === "info") {
            badgeClass = "success";
            badgeLabel = "Resolvido";
        } else if (index === 1) {
            badgeClass = "warning";
            badgeLabel = "Em Andamento";
        }

        html += `
            <article class="chamado-cartao cartao-vidro" id="tkt-${alerta.id}">
                <div class="chamado-cartao__cabecalho">
                    <span class="chamado-cartao__id">#TKT-${alerta.id.replace('A-', '9')}</span>
                    <span class="etiqueta etiqueta--${badgeClass}">${badgeLabel}</span>
                </div>
                <h3 class="chamado-cartao__titulo">${titulo}</h3>
                <p class="chamado-cartao__meta" style="margin-bottom: 8px;">Origem: <strong>${alerta.source}</strong> | Ref: ${alerta.time}</p>
                <div style="font-size: 0.9em; color: var(--text-muted); margin-bottom: 12px; font-style: italic;">
                    "${alerta.message}"
                </div>
                <div class="chamado-cartao__acoes">
                    <button class="botao botao--secundario botao--sm">Ver Detalhes</button>
                    ${sys ? `<button disabled href="resources.html?focus=${sys.id}" class="botao botao--secundario botao--sm"><i class="fa-solid fa-water"></i> Ver Módulo</button>` : ''}
                </div>
            </article>
        `;
    });

    container.innerHTML = html;

    // Verificar se viemos pelo Efeito Dominó de Acionar Protocolo
    const urlParams = new URLSearchParams(window.location.search);
    const createTicketId = urlParams.get('create_ticket');

    if (createTicketId) {
        const sys = window.YJaciCore ? window.YJaciCore.getSystem(createTicketId) : null;
        const matchingAlert = alerts.find(a => a.systemId === createTicketId);

        const assuntoSelect = document.getElementById('assunto');
        const descTextarea = document.getElementById('descricao');

        if (assuntoSelect) assuntoSelect.value = "hardware"; // Default para máquina
        if (descTextarea) {
            let desc = `[AUTO-DISPATCH] Solicitação de intervenção.\n\n`;
            desc += `Módulo Afetado: ${createTicketId}\n`;
            if (sys) desc += `Sistema: ${sys.systemName}\nProtocolo Vinculado: ${sys.initiative ? sys.initiative.name : 'N/A'}\n`;
            if (matchingAlert) desc += `\nLogs do Alerta:\n- Timestamp: ${matchingAlert.time}\n- Evento: ${matchingAlert.message}\n- Sensor: ${matchingAlert.source}`;

            descTextarea.value = desc;
            descTextarea.style.border = "1px solid var(--critical)";
            setTimeout(() => {
                descTextarea.style.border = "";
            }, 2000);
        }

        // Highlight visual no form
        const formSec = document.querySelector('.formulario-suporte');
        if (formSec) {
            formSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
            formSec.style.boxShadow = "0 0 30px var(--steel)";
            setTimeout(() => formSec.style.boxShadow = "", 2000);
        }
    }
});
