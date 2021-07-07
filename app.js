// DECLARATIONS

const numberBtn = document.querySelectorAll(".num");
const operatorBtn = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const screen = document.getElementById("screen");
const decimal = document.querySelector(".point");

let firstNum = "";
let secondNum = "";
let currentOperation = null;

// FUNCTIONS

const showNum = (number) => {
    if (screen.textContent === "0" || shouldResetScreen) resetScreen();

    screen.textContent += number;
}

const addDecimal = () =>{
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContent += ".";
}

function clearScreen() {
    screen.textContent = "0";
    currentOperation = null;
    firstNum = '';
    secondNum = '';
};

function resetScreen() {
    screen.textContent = "";
    shouldResetScreen = false;
  };

const deleteNum = () => {
    screen.textContent = screen.textContent.toString().slice(0, -1)
}
  
const add = ((a, b) => {
    return a + b;
});

const subtract = ((a, b) => {
    return a - b;
});

const multiply = ((a, b) => {
    return a * b;
});

const divide = ((a, b) => {
    return a / b;
});

const setOpp = (operator) => {
    if (currentOperation != null) evaluate();
    firstNum = screen.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
    
   
};

const evaluate = () => {
    if (currentOperation === null || shouldResetScreen){
        return;
    };

    if (currentOperation === "/" && screen.textContent === '0') {
        screen.textContent = "error";
        alert('Cannot Divide by Zero');
        resetScreen();
        return;
    };

    secondNum = screen.textContent;
    screen.textContent = roundNum(
        operate(currentOperation, firstNum, secondNum)
    );
    currentOperation = null;

};

const roundNum = (num) => {
    return Math.round(num *1000)/1000;
  };


function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return substract(a, b);
            break;
        case "x":
            return multiply(a, b);
            break;
        case "/":
            if (b === 0) return null;
            else return divide(a, b);
            break;
        default:
            return null;
    };
};

// EVENT LISTENERS

clearBtn.addEventListener("click", clearScreen);
equalsBtn.addEventListener("click", evaluate);
deleteBtn.addEventListener("click", deleteNum);
decimal.addEventListener("click", addDecimal)

numberBtn.forEach(button => {
    button.addEventListener("click", () => showNum(button.textContent))
});

operatorBtn.forEach(button => {
    button.addEventListener("click", () => setOpp(button.textContent))

});
