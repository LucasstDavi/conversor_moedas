// evento do botão converter
const converter_btn = document.querySelector('#converter-btn').addEventListener('click', function(ev) {
    ev.preventDefault();

    // pegando as variáveis para este evento
    const valor = getValor();
    const siglaMoedaD = getMoedaDestino();
    const areaResultado = document.querySelector("#resultado");
    const sigla1 = getMoedaOrigem();
    const sigla2 = getMoedaDestino();

    if (valor <= 0) {
        return alert("Por favor digite um valor maior que 0");
    }
    // verificação a se o usuário selecionou as mesmas moedas de origem e destino
    if (sigla1 === sigla2) {
        return areaResultado.textContent = `${valor} ${siglaMoedaD}`;
    }

    // obtém a moeda convertida através de uma requisição à API externa
    getMoedaConvertida().then((moedaConvertida) => {
        // verifica se houve algum erro na requisição à API
        // se "moedaConvertida" for igual a string quer dizer que a requisição a api deu erro
        if (typeof moedaConvertida === 'string') { 
            areaResultado.style.color = 'red';
            areaResultado.style.fontSize = '20px';
            return areaResultado.textContent = moedaConvertida;
        }  else { // imprimindo na tela o valor convertido
            const larguraTela = window.innerWidth;
            const valorConvertido = valor * moedaConvertida;
            areaResultado.style.color = '';
            areaResultado.style.fontSize = '';
            if (larguraTela > 425) {
                areaResultado.textContent = `= ${valorConvertido.toFixed(2)} ${siglaMoedaD}`;
            } else {
                areaResultado.style.border = '1px solid red';
                areaResultado.textContent = `${valorConvertido.toFixed(2)} ${siglaMoedaD}`;
            }      
        }
    })
})

// função para pegar a moeda atual do valor que o usuário quer converter
function getMoedaOrigem() {
    const moedaOrigem = document.querySelector('#moedaO');
    const moedaA = moedaOrigem.value;
    return moedaA;
}

// função para pegar a moeda que o usuário quer converter
function getMoedaDestino() {
    const moedaDestino = document.querySelector('#moedaD');
    const moedaD = moedaDestino.value;
    return moedaD;
}

async function getMoedaConvertida() {
    // recebendo as moedas selecionas
    const moedaA = getMoedaOrigem();
    const moedaD = getMoedaDestino();

    // fazendo a requisição com api
    try {
        const resposta = await fetch(`https://economia.awesomeapi.com.br/last/${moedaA}-${moedaD}`);
        const valores = await resposta.json();
        // pegando o valor atual convertido
        const sigla = moedaA + moedaD;
        const moedaConvertida = valores[sigla].ask;

        return Number(moedaConvertida);
    } catch (error) {
        return "Falha ao converter o valor! Por favor tente mais tarde";
    }
}

function getValor() {
    // pegando o valor digitado pelo usuário
    const input = document.querySelector("#valor");
    const valor = Number(input.value);
    return valor;
}