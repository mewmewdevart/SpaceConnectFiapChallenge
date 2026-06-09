/**
 * UTILS: core.js
 * Funções auxiliares para recuperar dados cruzados entre o Glossary e a Lore.
 */

const YJaciCore = {
  /**
   * Retorna os dados completos de um sistema físico (Equipamento), 
   * populando automaticamente os dados da Iniciativa (Lore) vinculada.
   * 
   * @param {string} systemId - O ID físico (ex: "CCA-04")
   * @returns {Object|null} Objeto unificado ou null se não encontrado
   */
  getSystem: function(systemId) {
    if (!window.YJaciGlossary || !window.YJaciLore) {
      console.warn("YJaciCore: Glossary ou Lore não carregados.");
      return null;
    }

    const system = window.YJaciGlossary[systemId];
    if (!system) return null;

    // Popula a iniciativa associada
    let initiativeData = null;
    if (system.initiativeId && window.YJaciLore.entities[system.initiativeId]) {
      initiativeData = window.YJaciLore.entities[system.initiativeId];
    }

    return {
      ...system,
      initiative: initiativeData
    };
  },

  /**
   * Retorna os dados puros de uma entidade da Lore.
   * 
   * @param {string} entityId - O ID da lore (ex: "jaci")
   * @returns {Object|null}
   */
  getEntity: function(entityId) {
    if (!window.YJaciLore) return null;
    return window.YJaciLore.entities[entityId] || null;
  }
};

window.YJaciCore = YJaciCore;

// ==========================================
// BREADCRUMB GLOBAL (EFEITO INVESTIGATIVO)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const focusId = params.get("focus");
    if (!focusId) return;

    let sys = YJaciCore.getSystem(focusId.toUpperCase());
    let entity = null;
    
    // Fallback se o focusId for o ID da Initiative em vez do System (ex: ?focus=jaci)
    if (!sys) {
        entity = YJaciCore.getEntity(focusId.toLowerCase());
    } else {
        entity = sys.initiative;
    }

    const subtituloEl = document.querySelector(".cabecalho-conteudo__subtitulo");
    if (subtituloEl) {
        let breadcrumb = `Y-JACI`;
        
        if (sys) {
            breadcrumb += ` <span class="cabecalho-conteudo__separador">/</span> ${sys.resource}`;
            breadcrumb += ` <span class="cabecalho-conteudo__separador">/</span> <span style="font-family: var(--font-mono); color: var(--steel);">${sys.id}</span>`;
        }
        
        if (entity) {
            breadcrumb += ` <span class="cabecalho-conteudo__separador">/</span> <span style="font-weight: bold; color: var(--success);">${entity.name}</span>`;
        }

        subtituloEl.innerHTML = breadcrumb;
    }
});
