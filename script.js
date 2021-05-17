const screen = document.querySelector(".screen p");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const decimalBtn = document.querySelector(".bdot");
const delBtn = document.querySelector(".delete");

const DIGITINPUTS = ["0","1","2","3","4","5","6","7","8","9","."];
const OPERATIONINPUTS = ["+","-","*","/"];

let currOperand = "";
let operands = [];
let operation = "";

const operators = document.querySelectorAll("[operator]");
operators.forEach((operator) => operator.addEventListener("click", () => setOperator(operator.textContent)));

const digits = document.querySelectorAll("[digit]");
digits.forEach((button) => button.addEventListener("click", () => addDigit(button.textContent)));
window.addEventListener("keydown",keyboardDigitInput);

function keyboardDigitInput(e) {
    if (DIGITINPUTS.includes(e.key)) {addDigit(e.key);}
    else if (OPERATIONINPUTS.includes(e.key)) {setOperator(e.key);}
    else if (e.key === "=") {calculate();}
}

delBtn.addEventListener("click", undo);

function undo() {
    if (currOperand.length === 0) return;
    currOperand = currOperand.slice(0, currOperand.length-1);
    screen.textContent = currOperand;
}

clearBtn.addEventListener("click", resetAll);

function resetAll() {
    decimalBtn.disabled = false;
    currOperand = "";
    operands.splice(0,2);
    operation = "";
    screen.textContent = currOperand;
    console.log(operands);
}

equalsBtn.addEventListener("click", calculate);

function calculate() {
    if (currOperand === "") {
        resetAll();
        console.log(operands);
        return;
    }
    operands.push(currOperand);
    if (operation !== "") currOperand = String(operate(+operands[0], +operands[1], operation));
    operands.splice(0, 2);
    operation = "";
    screen.textContent = currOperand;
    decimalBtn.disabled = false;
    console.log(operands);
}

function operate(a, b, operator) {
    let result;
    switch(operator) {
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case 'x':
        case '*':
            result = multiply(a,b);
            break;
        case '/':
            result = divide(a,b);
            break;
    }
    result = Math.round(result*100)/100;    // rounding results to 2 decimal places
    return result;  
}

function setOperator(operator) {
    if (currOperand === "") {
        if (operation !== "") {
            operation = operator;
            console.log(operands);
            return;
        }
        return;
    } else {
        if (operation !== "") {
            calculate();
        }
        decimalBtn.disabled = false;
        operation = operator;
        operands.push(currOperand);
        currOperand = "";
        console.log(operands);
    }                 
}

function addDigit(digit) {
    if (digit === ".") decimalBtn.disabled = true;
    if (currOperand === "" && digit === "0") return;
    currOperand += digit;
    screen.textContent = currOperand;
}

function add(a,b) {return a+b;}

function subtract(a,b) {return a-b;}

function multiply(a,b) {return a*b;}

function divide(a,b) {return a/b};




