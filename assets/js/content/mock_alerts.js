/**
 * MOCK ALERTS: Estado Global de Alertas
 * Usado para sincronizar as telas "Central de Alertas" e "Mesa de Suporte".
 */

window.YJaciAlerts = [
    {
        id: "A-241",
        systemId: "RV-04", 
        type: "critico",
        time: "T-00:02:47",
        message: "Perda de telemetria por 2m47s durante aproximação.",
        source: "Sensor Externo (Haworth)",
        requiresConfirm: false
    },
    {
        id: "A-240",
        systemId: "SIS-02", 
        type: "aviso",
        time: "T-00:10:02",
        message: "Pressão de linha divergente do baseline operacional.",
        source: "Subsistema de Irrigação",
        requiresConfirm: false
    },
    {
        id: "A-239",
        systemId: "CCA-04",
        type: "aviso",
        time: "T-01:04:11",
        message: "Reservatório excedendo 78%. Agendar ciclo de purificação no protocolo correspondente.",
        source: "Telemetria H2O Principal",
        requiresConfirm: true
    },
    {
        id: "A-238",
        systemId: "CVB-09",
        type: "info",
        time: "T-01:42:30",
        message: "Iniciou ciclo ótimo de compostagem.",
        source: "Sensor Biológico",
        requiresConfirm: false
    },
    {
        id: "A-237",
        systemId: "URC-01", 
        type: "aviso",
        time: "T-02:10:55",
        message: "Taxa de influxo de águas cinzas oscilando +4.2%.",
        source: "Coletor de Efluentes",
        requiresConfirm: false
    }
];
