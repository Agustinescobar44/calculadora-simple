class Calculadora{
    constructor() {
        this.valorA =""
        this.valorB =""
        this.operador =""
        this.resultado = ""
    }
    agregarValor(valor){
        if((valor === "+" || valor==="-")){
            if(this.valorA =="") {
                this.valorA+=valor
            }
            else if(this.valorB =="" && this.operador !=""){
                this.valorB = valor
            }
            else {
                this.operador = valor
            }
        }
        else if((valor === "/" || valor==="*")) this.operador = valor
        else if (!isNaN(valor) || valor==='.'){
            if(this.operador === "") {
                this.valorA+=valor
            }
            else {
                this.valorB += valor
            }
        }
    }

    tieneValorA() {
        const resultado = parseFloat(this.valorA);
        return !isNaN(resultado);
    }
    tieneValorB() {
        const resultado = parseFloat(this.valorB);
        return !isNaN(resultado);
    }

    calcular(){
        var numero1 = parseFloat(this.valorA)
        var numero2 = parseFloat(this.valorB)
        switch (this.operador) {
            case '+':
                this.resultado = numero1 + numero2
                break;
            case '-':
                this.resultado = numero1 - numero2
                break;
            case '/':
                this.resultado = numero1 / numero2

                    break;
            case '*':
                this.resultado = numero1 * numero2
                break;
            default:
                break;
        }
        if(!isNaN(this.valorDecimal())){
            if(this.valorDecimal().length>2){
                this.resultado = parseFloat(this.resultado).toFixed(4)
            }
        }
        return this.resultado;
    }
    reiniciar() {
        this.operador = ""
        this.valorA = ""
        this.valorB = ""
        this.resultado = ""
    }
    borrar(){
        // si tiene valor B
        if(this.valorB.length>0) {
            this.valorB = this.valorB.substring(0,this.valorB.length-1);
        }
        //no tiene valor b y tiene operador
        else if (this.operador !== "" ){
            this.operador=""
        }
        //no tiene operador ni valor B
        else{
            this.valorA = this.valorA.substring(0,this.valorA.length-1);
        }
    }
    puedeCalcular(){
        return this.tieneValorA() && this.operador !== "" && this.tieneValorB()
    }

    valorDecimal(){
        var decimos = (this.resultado + "").split('.')
        return decimos[1]
    }
}

const calculadora = new Calculadora();

document.addEventListener('DOMContentLoaded', function(){
    agregarEventListeners()

});

function agregarEventListeners() {
    let numeros = document.querySelectorAll('.numero')
    numeros.forEach(num =>{
        num.addEventListener('click', ()=>{
            if(calculadora.resultado !== "") calculadora.reiniciar()

            calculadora.agregarValor(num.innerHTML)
            actualizarTexto(calculadora)
        });
    })

    let operadores = document.querySelectorAll('.operador')
    operadores.forEach(ope =>{
            if(ope.innerHTML == '='){
                ope.addEventListener('click' , ()=>{
                    if(calculadora.puedeCalcular()){
                        if(calculadora.resultado != ""){
                            calculadora.valorA = calculadora.resultado;
                            calculadora.calcular()
                        }
                        else{
                            calculadora.calcular()
                        }
                    }
                    actualizarTexto()
                });

            }
            else{
                ope.addEventListener('click' , ()=>{
                    if(calculadora.resultado !="") {
                        let temp = calculadora.resultado
                        calculadora.reiniciar()
                        calculadora.valorA = temp
                    }
                    calculadora.agregarValor(ope.textContent)

                    actualizarTexto()
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
        calculadora.borrar()
        actualizarTexto()
    })
    
}

function actualizarTexto() {
    document.querySelector('#valor-anterior').innerHTML = calculadora.valorA;
    document.querySelector('#valor-actual').innerHTML = calculadora.valorB;
    document.querySelector('#valor-operador').innerHTML = calculadora.operador
    document.querySelector('#valor-resultado').innerHTML = calculadora.resultado
}

function reiniciar() {
    calculadora.reiniciar();
    actualizarTexto()
}