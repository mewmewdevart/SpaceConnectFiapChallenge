(function () {
  "use strict";


  // Relógio de Telemetria
  function updateClock() {
    const clockEl = document.getElementById('relogio-telemetria');
    if (clockEl) {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      clockEl.textContent = `PRIME    SOL 0427 · ${h}:${m}:${s}`;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateClock();
  });
  setInterval(updateClock, 1000);

  // Lógica de Log da Telemetria Dinâmica
  window.telemetryQueue = ["SISTEMA INICIADO", "LEITURA NOMINAL", "AGUARDANDO COMANDOS..."];

  window.addTelemetryLog = function(message, severityClass = "") {
    window.telemetryQueue.push(`[ AÇÃO ] ${message}`);
    
    // Mantém no máximo as últimas 10 ações no histórico para não quebrar a animação
    if (window.telemetryQueue.length > 10) {
      window.telemetryQueue.shift();
    }

    const letreiroContainers = document.querySelectorAll('.barra-telemetria__letreiro');
    
    letreiroContainers.forEach(container => {
      container.innerHTML = '';
      
      // Para o marquee não ficar vazio caso a fila seja curta, podemos repetir a fila algumas vezes
      for (let i = 0; i < 3; i++) {
        window.telemetryQueue.forEach(logText => {
          const span = document.createElement('span');
          span.className = `barra-telemetria__item ${severityClass}`;
          span.textContent = logText;
          span.style.color = 'rgb(var(--color-primary))';
          container.appendChild(span);
        });
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    window.addTelemetryLog("SISTEMAS ONLINE");
  });

})();
