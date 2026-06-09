/**
 * GLOSSARY: O Dicionário Central
 * Mapeia os sistemas físicos, tags e IDs baseados no Lore Bible.
 * Utiliza chaves relacionais (initiativeId) para conectar com YJaciLore.
 */

const YJaciGlossary = {
  // --- Sistemas Hídricos e Potáveis ---
  "CCA-04": {
    id: "CCA-04",
    systemName: "Centro de Condensação Atmosférica",
    equipmentClass: "Tanque de Extração Criogênica",
    resource: "Água Potável",
    initiativeId: "jaci", // Relacionamento com YJaciLore.entities.jaci
    icon: "<i class=\"fa-solid fa-droplet\"></i>",
    ods: "ODS 6",
    statusTags: ["Pressurizado", "Nominal"],
    criticality: "low"
  },

  // --- Reciclagem de Água ---
  "URC-01": {
    id: "URC-01",
    systemName: "Unidade de Reciclagem de Águas Cinzas",
    equipmentClass: "Filtro de Osmose Reversa",
    resource: "Águas Cinzas / Reuso",
    initiativeId: "naia", // Relacionamento com YJaciLore.entities.naia
    icon: "<i class=\"fa-solid fa-recycle\"></i>",
    ods: "ODS 6",
    statusTags: ["Ciclo Contínuo", "Alerta Térmico"],
    criticality: "medium"
  },

  // --- Agricultura e Botânica ---
  "SIS-02": {
    id: "SIS-02",
    systemName: "Sistema de Irrigação Setorial",
    equipmentClass: "Malha Hidropônica",
    resource: "Microverdes e Nutrientes",
    initiativeId: "curupira", // Relacionamento com YJaciLore.entities.curupira
    icon: "<i class=\"fa-solid fa-leaf\"></i>",
    ods: "ODS 2",
    statusTags: ["Drenagem Crítica", "Intervenção Requerida"],
    criticality: "critical"
  },

  // --- Biomassa e Orgânicos ---
  "CVB-09": {
    id: "CVB-09",
    systemName: "Reator de Conversão Biológica",
    equipmentClass: "Silo Sintotrópico",
    resource: "Biomassa e Substratos",
    initiativeId: "yvy", // Relacionamento com YJaciLore.entities.yvy
    icon: "<i class=\"fa-solid fa-seedling\"></i>",
    ods: "ODS 2",
    statusTags: ["Fermentação Ativa", "Nominal"],
    criticality: "low"
  }
};

window.YJaciGlossary = YJaciGlossary;
