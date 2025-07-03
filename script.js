const middleRow = document.querySelector(".calculator-mid-row");
const bottomRow = document.querySelector(".calculator-bottom-row");

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['plus','minus','multiply','divide']

function createMiddleRowButton(key, keyID){
    const btn = document.createElement("button");
    btn.textContent = key;
    if (key != ""){
        btn.id = "key-" + keyID;
    };

    btn.classList.add("middle-row-button");
    middleRow.appendChild(btn);
}

function createBottomRowButton(key, keyID){
    const btn = document.createElement("button");
    btn.textContent = key;
    if (key != ""){
        btn.id = "key-" + keyID;
    };
    if (numbers.includes(keyID)){
        btn.classList.add("number-key")
    }
    if (operators.includes(keyID)){
        btn.classList.add("operator-key");
    }
    btn.classList.add("bottom-row-button");
    bottomRow.appendChild(btn);
}

// these two must have either unique or blank keys!

const middleRowKeys =   ["x²", "x³", "xʸ", "sin⁻¹", "cos⁻¹", "tan⁻¹",
                        "²√", "³√", "ʸ√", "sin", "cos", "tan",
                        "log", "ln", "(", ")", "!", "x⁻¹",];
const middleRowKeyIDs =   ["x-square", "x-cube", "x-pow-y", "sin-inv", "cos-inv", "tan-inv",
                        "sqrt", "cbrt", "y-root", "sin", "cos", "tan",
                        "log", "ln", "bracket-start", "bracket-end", "factorial", "x-inv",];

const bottomRowKeys =   ["7", "8", "9", "DEL", "AC", 
                        "4", "5", "6", "×", "÷",
                        "1", "2", "3", "+", "-",
                        "0", ".", "10^x", "Ans", "="];
const bottomRowKeyIDs =   ["7", "8", "9", "DEL", "AC", 
                        "4", "5", "6", "multiply", "divide",
                        "1", "2", "3", "plus", "minus",
                        "0", "decimal", "10-power", "Ans", "equal"];

for (i = 0; i < 18; i++){createMiddleRowButton(middleRowKeys[i], middleRowKeyIDs[i]);}

for(i = 0; i < 20; i++){createBottomRowButton(bottomRowKeys[i], bottomRowKeyIDs[i]);}

function cprint(val) {console.log(val);}
function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {return a / b;}
function addArray(arr){
    return arr.reduce((sum, index) => sum + index);
}
function multiplyArray(arr){
    return arr.reduce((product, index) => product * index);
}
function operate (a, b, operator){
    switch (operator){
        case '+':
            add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
            break;
        default:
            print("Error in operation!");
            break;
    }
}

const onBtn = document.querySelector("#on");
onBtn.addEventListener("click", () => {calculatorOn = !calculatorOn;});

const screen = document.querySelector(".calculator-screen");
const screenText = document.querySelector(".calculator-screen-text")
let memoryOperationStack = [];
let memoryNumberStack = [];
let currentState = ""
let calculatorOn = false;
let previousAns = 0;

