let numeros = document.querySelectorAll('.numero')
let operadores = document.querySelectorAll('.operador')
let resultado = document.querySelector('#valor-resultado')
let operador = ""
let valorAnteriorTexto= "";
let valorActualTexto = "";
let valorAnteriorNum = 0



document.addEventListener('DOMContentLoaded', function(){

    agregarEventListeners()

});

function agregarEventListeners() {
    numeros.forEach(num =>{
        num.addEventListener('click', ()=>{
            if(resultado.innerHTML == "") valorActualTexto = valorActualTexto + num.innerHTML
            else {
                reiniciar()
                valorActualTexto = valorActualTexto + num.innerHTML
            }
            actualizarTexto()
        });
    })
    operadores.forEach(ope =>{
            if(ope.innerHTML == '='){
                ope.addEventListener('click' , ()=>{
                if(valorActualTexto!="" && valorAnteriorTexto != ""){
                    console.log(valorActualTexto)
                    resultado.innerHTML = calcular(valorAnteriorNum , parseFloat(valorActualTexto))
                }else{
                    resultado.innerHTML = valorActualTexto
                }
                });
            }
            else{
                ope.addEventListener('click' , ()=>{
                    if(valorAnteriorTexto == "" && valorActualTexto!=""){ 
                        valorAnteriorTexto = valorActualTexto
                        valorAnteriorNum = parseFloat(valorActualTexto)
                        valorActualTexto = ""
                        operador = ope.innerHTML
                        actualizarTexto()
                    }
                    else if(valorAnteriorTexto != "" && valorActualTexto!=""){ //si ya hay numero anterior y actual hago el calculo
                        resultado.innerHTML = ""
                        valorAnteriorNum = calcular(valorAnteriorNum , parseFloat(valorActualTexto))
                        valorAnteriorTexto = valorAnteriorNum
                        valorActualTexto = ""
                        operador = ope.innerHTML
                        actualizarTexto()
                    }
                    else if (valorAnteriorTexto != "" && valorActualTexto==""){
                        valorActualTexto = ope.innerHTML
                        operador = ope.innerHTML
                        actualizarTexto()
                    }
                });
            }
            
    })
    let botonReiniciar = document.querySelector('.reiniciar')
    botonReiniciar.addEventListener('click' , ()=>{
        reiniciar()
        actualizarTexto()
    })

    let botonBorrar = document.querySelector('.borrar')
    botonBorrar.addEventListener('click', ()=>{
            if(valorActualTexto != ""){
                valorActualTexto = `${valorActualTexto}`
                let nuevoValor=valorActualTexto.substr(0,valorActualTexto.length-1)
                valorActualTexto = nuevoValor
            }else if(operador !=""){
                operador=""
                document.querySelector('#valor-operador').innerHTML = ""
                valorActualTexto = valorAnteriorTexto
                valorAnteriorTexto = ""
            }
        actualizarTexto()
    })
    
}

function actualizarTexto() {
    document.querySelector('#valor-anterior').innerHTML = valorAnteriorTexto;
    document.querySelector('#valor-actual').innerHTML = valorActualTexto;
    document.querySelector('#valor-operador').innerHTML = operador
}

function reiniciar() {
    operador = ""
    valorAnterior= 0
    valorAnteriorTexto = ""
    valorActualTexto = ""
    resultado.innerHTML = ""
    document.querySelector('#valor-operador').innerHTML = ""
}



function calcular(numero1 , numero2) {
    switch (operador) {
        case '+':
            return numero1 + numero2
            break;
        case '-':
            return numero1 - numero2
            break;
        case '/':
                return numero1 / numero2
                break;
        case '*':
            return numero1 * numero2
            break;
        default:
            break;
    }
}