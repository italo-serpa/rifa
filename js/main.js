function criaTabelaDeNumeros () {
    const gradeDeNumeros = document.querySelector("[data-numeros]")
    for(let i = 1; i < 151; i++) {
        gradeDeNumeros.innerHTML += `<div class="numero" id="${i}">${i}</div>`
    }
}
criaTabelaDeNumeros()

const tabelaDeNumeros = document.querySelectorAll(".numero")

const cabecalho = document.querySelector(".cabecalho")
const conteudo = document.querySelector(".conteudo")

const formulario = document.querySelector("[data-form]")
const valorNumero = document.querySelector("#numero")
const valorNome = document.querySelector("#nome")
const valorTelefone = document.querySelector("#telefone")

const infoNumero = document.querySelector(".info__numero")
const infoGeral = document.querySelector(".info__geral")

const totalVendido = document.querySelector(".info__geral--vendido")
const totalArrecadado = document.querySelector(".info__geral--arrecadado")
const totalPorcentagem = document.querySelector(".info__geral--porcetagem")

const numeros = JSON.parse(localStorage.getItem("numeros")) || []

numeros.forEach((elemento) => {
    const filtro = tabelaDeNumeros.item(elemento.numero-1)
    filtro.classList.add("brilhofinal")
})

cabecalho.addEventListener("click", () => {
    escondeFormulario()
    fazNumeroApagar()
})

tabelaDeNumeros.forEach((numero) => numero.addEventListener("click", (evento) => {
    valorNumero.value = evento.target.id
    valorNome.value = ""
    valorTelefone.value = ""

    fazNumeroApagar()

    fazNumeroBrilhar(numero)

    mostraFormulario()

    numeros.forEach((elemento) => {
        if(valorNumero.value === elemento.numero) {
            valorNome.value = elemento.nome
            valorTelefone.value = elemento.telefone
        }
    })
}))

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    const numero = evento.target.elements['numero']
    const nome = evento.target.elements['nome']
    const telefone = evento.target.elements['telefone']

    const jaExiste = numeros.find(elemento => elemento.numero === numero.value)

    if ((nome.value).length > 0) {
        if (jaExiste) {
            removeNoLocalStorage(numero.value)
            adicionaNoLocalStorage(numero.value, nome.value, telefone.value)
            escondeFormulario()
            fazNumeroApagar()
            console.log("Cadastro atualizado")
        } else {
            adicionaNoLocalStorage(numero.value, nome.value, telefone.value)
            escondeFormulario()
            fazNumeroApagar()
            console.log("Novo cadastro feito")
        }
    } else {
        console.log("Nome inválido")
        escondeFormulario()
        fazNumeroApagar()
    }

    numeros.forEach((elemento) => {
        const filtro = tabelaDeNumeros.item(elemento.numero-1)
        filtro.classList.add("brilhofinal")
    })

    numero.value = ""
    nome.value = ""
    telefone.value = ""
})

function adicionaNoLocalStorage (numero, nome, telefone) {
    const numeroAtual = {
        "numero": numero,
        "nome": nome,
        "telefone": telefone
    }

    numeros.push(numeroAtual)

    localStorage.setItem("numeros", JSON.stringify(numeros))
}

function removeNoLocalStorage(idNumero) {
    numeros.splice(numeros.findIndex(elemento => elemento.numero == idNumero), 1)
}

function mostraFormulario () {
    infoGeral.classList.add("escondido")
    infoNumero.classList.remove("escondido")
}

function escondeFormulario () {
    infoGeral.classList.remove("escondido")
    infoNumero.classList.add("escondido")
    atualizaInfoGeral()
}

function fazNumeroBrilhar (numero) {
    numero.classList.add("brilhoclick")
}

function fazNumeroApagar() {
    const selecionados = document.querySelectorAll(".brilhoclick")
    selecionados.forEach((numeroselecionados) => {
        numeroselecionados.classList.remove("brilhoclick")
    })
}

function atualizaInfoGeral () {
    totalVendido.innerHTML = `<p>${numeros.length}/150</p>`
    totalArrecadado.innerHTML = `<p>R$ ${numeros.length*20},00</p>`
    totalPorcentagem.innerHTML = `<p>${(numeros.length/150*100).toFixed(1)}%</p>`
}

atualizaInfoGeral()