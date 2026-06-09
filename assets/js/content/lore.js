/**
 * LORE BIBLE: A Fonte da Verdade Narrativa
 * Define a ontologia e a hierarquia temática da base lunar.
 */

const YJaciLore = {
  hierarchy: {
    intelligence: "Inteligência Central",
    program: "Programa Estratégico",
    protocol: "Protocolo Operacional",
    system: "Sistema",
    equipment: "Equipamento",
    resource: "Recurso"
  },

  entities: {
    yjaci: {
      type: "intelligence",
      name: "Y-JACI",
      role: "Inteligência Artificial Central da Colônia",
      domain: "Gestão Global de Sobrevivência e ODS",
      description: "Sistema operacional base que rege a logística de sobrevivência e otimização de recursos na base lunar."
    },
    jaci: {
      type: "protocol",
      name: "Protocolo Jaci",
      role: "Gestão de Água Potável",
      domain: "Atmosfera e Condensação",
      description: "Protocolo de extração contínua e armazenamento seguro de umidade atmosférica."
    },
    naia: {
      type: "protocol",
      name: "Protocolo Naiá",
      role: "Tratamento de Águas Cinzas",
      domain: "Reciclagem e Reuso Hídrico",
      description: "Protocolo de purificação e reuso de efluentes, otimizando o ciclo hidrológico da colônia."
    },
    curupira: {
      type: "program",
      name: "Programa Curupira",
      role: "Sustentação Agrícola e Flora",
      domain: "Agricultura e Oxigênio",
      description: "Iniciativa global para cultivo de flora extraterrestre, sustentação de vida vegetal e geração de O2."
    },
    boitata: {
      type: "program",
      name: "Programa Boitatá",
      role: "Gestão Termo-Elétrica",
      domain: "Energia",
      description: "Monitoramento e distribuição inteligente de energia térmica e solar para a base."
    },
    yvy: {
      type: "program",
      name: "Programa Yvy",
      role: "Geração de Biomassa",
      domain: "Resíduos e Nutrientes Orgânicos",
      description: "Programa estratégico de processamento de resíduos biológicos para geração de substrato fértil."
    }
  }
};

window.YJaciLore = YJaciLore;
