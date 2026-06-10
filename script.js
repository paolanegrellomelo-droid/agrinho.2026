
// script.js

// ----- BOTÃO DE ACESSIBILIDADE (painel flutuante) -----
const btnAcess = document.getElementById('btnAcessibilidade');
const painelAcess = document.getElementById('painelAcess');

btnAcess.addEventListener('click', () => {
    const estaVisivel = painelAcess.hidden === false;
    painelAcess.hidden = estaVisivel;
    btnAcess.setAttribute('aria-expanded', !estaVisivel);
});

// Fechar painel se clicar fora (opcional, melhoria)
document.addEventListener('click', (event) => {
    if (!btnAcess.contains(event.target) && !painelAcess.contains(event.target)) {
        painelAcess.hidden = true;
        btnAcess.setAttribute('aria-expanded', 'false');
    }
});

// 1. Aumentar fonte
const aumentarFonte = document.getElementById('aumentarFonte');
aumentarFonte.addEventListener('click', () => {
    document.body.classList.remove('fonte-pequena');
    document.body.classList.add('fonte-grande');
});

// 2. Diminuir fonte
const diminuirFonte = document.getElementById('diminuirFonte');
diminuirFonte.addEventListener('click', () => {
    document.body.classList.remove('fonte-grande');
    document.body.classList.add('fonte-pequena');
});

// 3. Alto contraste
const btnContraste = document.getElementById('altoContraste');
btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
});

// ----- FUNCIONALIDADE PRINCIPAL: CALCULADORA DE ECONOMIA DE ENERGIA -----
const btnCalcular = document.getElementById('calcularEconomia');
const consumoMensalInput = document.getElementById('consumoMensal');
const custoInstalacaoInput = document.getElementById('custoInstalacao');
const economiaMensalSpan = document.getElementById('economiaMensal');
const paybackSpan = document.getElementById('payback');
const economia10anosSpan = document.getElementById('economia10anos');

function calcularEconomiaSolar() {
    // Obter valores inseridos pelo usuário
    let consumoMensal = parseFloat(consumoMensalInput.value);
    let custoInstalacao = parseFloat(custoInstalacaoInput.value);
    
    // Validação simples
    if (isNaN(consumoMensal) || consumoMensal <= 0) {
        economiaMensalSpan.innerHTML = "❌ Digite um valor válido para o custo mensal.";
        paybackSpan.innerHTML = "";
        economia10anosSpan.innerHTML = "";
        return;
    }
    if (isNaN(custoInstalacao) || custoInstalacao <= 0) {
        economiaMensalSpan.innerHTML = "❌ Digite um valor válido para o custo de instalação.";
        paybackSpan.innerHTML = "";
        economia10anosSpan.innerHTML = "";
        return;
    }
    
    // Suposição: com energia solar, a economia mensal é 95% do custo atual
    const percentualEconomia = 0.95;
    const economiaPorMes = consumoMensal * percentualEconomia;
    
    // Payback: tempo (em meses) para recuperar o investimento
    const paybackMeses = custoInstalacao / economiaPorMes;
    const paybackAnos = (paybackMeses / 12).toFixed(1);
    
    // Economia em 10 anos (120 meses)
    const economiaDezAnos = economiaPorMes * 120;
    
    // Exibir resultados formatados
    economiaMensalSpan.innerHTML = `💰 Economia mensal: <strong>R$ ${economiaPorMes.toFixed(2)}</strong>`;
    paybackSpan.innerHTML = `⏱️ Tempo de retorno do investimento: aproximadamente <strong>${paybackMeses.toFixed(1)} meses</strong> (${paybackAnos} anos)`;
    economia10anosSpan.innerHTML = `🌞 Em 10 anos, você economizaria cerca de <strong>R$ ${economiaDezAnos.toFixed(2)}</strong>!`;
}

btnCalcular.addEventListener('click', calcularEconomiaSolar);

// Executar cálculo inicial com valores padrão ao carregar a página
window.addEventListener('DOMContentLoaded', calcularEconomiaSolar);

// ----- FUNÇÃO PARA BOTÕES DE CONTATO (empresas) -----
const botoesContato = document.querySelectorAll('.btn-contato');
const mensagemDiv = document.getElementById('mensagemContato');

botoesContato.forEach(botao => {
    botao.addEventListener('click', (event) => {
        const empresa = botao.getAttribute('data-empresa');
        mensagemDiv.innerHTML = `✅ Solicitação enviada para ${empresa}. Em breve eles entrarão em contato! 🌱`;
        mensagemDiv.style.color = '#2e7d32';
        mensagemDiv.style.fontWeight = 'bold';
        
        // Limpar mensagem após 4 segundos
        setTimeout(() => {
            mensagemDiv.innerHTML = '';
        }, 4000);
    });
});
