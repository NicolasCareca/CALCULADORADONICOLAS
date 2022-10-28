const previousOperationText = document.querySelector("#opAnterior");
const currentOperationText = document.querySelector("#opAtual");
const buttons = document.querySelectorAll("#botao button");
class Calculator{
  constructor(previousOperationText, currentOperationText){
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }
  addDigit(digito){
    console.log(digito);
    if(digito === "." && this.currentOperationText.innerText.includes(".")){
      return;
    }
    this.currentOperation = digito;
    this.updateScreen();
  }
  processOperation(operacao){
    if (this.currentOperationText.innerText === "" && operacao !== "C"){
      if (this.previousOperationText.innerText !== ""){
        this.changeOperation(operacao);
      }
      return;
    }
    let operationValue;
    let anterior = +this.previousOperationText.innerText.split(" ")[0];
    let atual = +this.currentOperationText.innerText;
    switch (operacao){
      case "+":
        operationValue = anterior + atual;
        this.updateScreen(operationValue, operacao, atual, anterior);break;
      case "-":
        operationValue = anterior - atual;
        this.updateScreen(operationValue, operacao, atual, anterior);break;
      case "*":
        operationValue = anterior * atual;
        this.updateScreen(operationValue, operacao, atual, anterior);break;
      case "/":
        operationValue = anterior / atual;
        this.updateScreen(operationValue, operacao, atual, anterior);break;
      case "DEL":
        this.processDelOperator();break;
      case "CE":
        this.processClearCurrentOperator();break;
      case "C":
        this.processClearOperator();break;
      case "=":
        this.processEqualOperator();break;
      default:
        return;
    }
  }
  updateScreen(
    operationValue = null,
    operacao = null,
    atual = null,
    anterior = null
  ) {
    if (operationValue === null){  
      this.currentOperationText.innerText += this.currentOperation;
    } else {   
      if (anterior === 0){
        operationValue = atual;
      }
      this.previousOperationText.innerText = `${operationValue} ${operacao}`;
      this.currentOperationText.innerText = "";
    }
  }
  changeOperation(operacao){
    const mathOperations = ["*", "-", "+", "/"];
    if (!mathOperations.includes(operacao)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operacao;
  }
  processDelOperator(){
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  } 
  processClearCurrentOperator(){
    this.currentOperationText.innerText = "";
  }
  processClearOperator(){
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  processEqualOperator(){
    let operacao = this.previousOperationText.innerText.split(" ")[1];
    this.processOperation(operacao);
  }
}
const calc = new Calculator(previousOperationText, currentOperationText);
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) =>{
    const value = e.target.innerText;

    if (+value >= 0 || value === "."){
      console.log(value);
      calc.addDigit(value);
    } else{
      calc.processOperation(value);
    }
  });
});