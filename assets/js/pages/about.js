document.addEventListener('DOMContentLoaded', () => {
    // Configura botão de perda de DSN
    const btnDsnLoss = document.getElementById('btn-dsn-loss');
    
    if (btnDsnLoss) {
        // Verifica se já estava em DSN Loss pelo localStorage
        const isCurrentlyLoss = localStorage.getItem('dsnLoss') === 'true';
        if (isCurrentlyLoss) {
            document.body.classList.add('dsn-loss');
            updateDsnButton(btnDsnLoss, true);
        }

        btnDsnLoss.addEventListener('click', () => {
            const isLoss = document.body.classList.toggle('dsn-loss');
            localStorage.setItem('dsnLoss', isLoss);
            updateDsnButton(btnDsnLoss, isLoss);
        });
    }

    function updateDsnButton(btn, isLoss) {
        if (isLoss) {
            btn.innerHTML = '<i class="fa-solid fa-satellite-dish"></i> Restaurar Sinal DSN';
            btn.style.background = 'rgba(var(--green), 0.2)';
            btn.style.borderColor = 'rgb(var(--green))';
            btn.style.color = 'rgb(var(--green))';
            btn.style.boxShadow = '0 0 10px rgba(var(--green), 0.2)';
        } else {
            btn.innerHTML = '<i class="fa-solid fa-satellite-dish"></i> Simular Perda de DSN';
            btn.style.background = 'rgba(var(--magenta), 0.2)';
            btn.style.borderColor = 'rgb(var(--magenta))';
            btn.style.color = 'rgb(var(--magenta))';
            btn.style.boxShadow = '0 0 10px rgba(var(--magenta), 0.2)';
        }
    }
});
