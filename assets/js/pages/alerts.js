document.addEventListener('DOMContentLoaded', () => {

    // Lógica para confirmar alertas
    const confirmButtons = document.querySelectorAll('.alerta__botao-acao--confirmar');
    
    confirmButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const alerta = e.target.closest('.alerta');
            if (alerta) {
                // Adiciona animação de resolução
                alerta.classList.add('alerta--resolvido');
                
                // Modifica o botão
                e.target.innerHTML = '<i class="fa-solid fa-check"></i> Confirmado';
                e.target.disabled = true;
                e.target.classList.add('alerta__botao-acao--desabilitado');

                // Atualiza o contador de alertas macro card
                // Simples simulação de diminuição de número se possível
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
});
