const middleRow = document.querySelector(".calculator-mid-row");
const bottomRow = document.querySelector(".calculator-bottom-row");

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['plus','minus','multiply','divide'];
const operatorSymbols = ["+", "-", "×", "÷"];

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
    if (numbers.includes(keyID) || operators.includes(keyID)){
        btn.classList.add("number-key");
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
                        "0", ".", "×10ˣ", "Ans", "="];
const bottomRowKeyIDs =   ["7", "8", "9", "DEL", "AC", 
                        "4", "5", "6", "multiply", "divide",
                        "1", "2", "3", "plus", "minus",
                        "0", "decimal", "ten-power", "ans", "equals"];

for (i = 0; i < 18; i++){createMiddleRowButton(middleRowKeys[i], middleRowKeyIDs[i]);}

for(i = 0; i < 20; i++){createBottomRowButton(bottomRowKeys[i], bottomRowKeyIDs[i]);}

function cprint(val) {console.log(val);}
function add(a = 0, b = 0) {return a + b;}
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
const screenText = document.querySelector(".calculator-screen-text");
let memoryStack = [];
// let calculatorOn = false;
let previousAns = 0;

const numberKeys = document.querySelectorAll(".number-key");
const delKey = document.querySelector("#key-DEL");
const acKey = document.querySelector("#key-AC");
const equalsKey = document.querySelector("#key-equals");
// const tenPowerKey = document.querySelector("#key-ten-power");
// const decimalKey = document.querySelector("#key-decimal");
const ansKey = document.querySelector("#key-ans");

numberKeys.forEach((numKey) => numKey.addEventListener("click", (e) => addToStack(e.target.textContent)));
delKey.addEventListener("click", () => delStack());
acKey.addEventListener("click", () => clearStack());
equalsKey.addEventListener("click", () => evaluateStack());

function addToStack(number){
    memoryStack.push(number);
    updateDisplay();
    console.log(memoryStack);
}
function delStack(){
    memoryStack.pop();
    updateDisplay();
}
function clearStack(){
   memoryStack = [];
   updateDisplay();
}
function updateDisplay(){
    if (memoryStack.length == 0){
        screenText.textContent = "_";
        return;
    }

    let screenStr = memoryStack.join("");
    screenText.textContent = screenStr;
    if (screenText.offsetWidth > 420){
        screenStr = "_" + memoryStack.slice(-14).join("");
        screenText.textContent = screenStr;
    }
}

function evaluateStack(){
    let errorInStack = false; //TODO
    let unitsStack = [];
    organiseStack(unitsStack);
    console.log(unitsStack);

    //handle multiplication and division from left to right
    for (i = 0; i < unitsStack.length; i++){
        if (unitsStack[i] == "×"){
            const val = unitsStack[i - 1] * unitsStack[i + 1];
            // unitsStack[i-1] = val;
            unitsStack.splice(i-1, 3, val);
        }
        else if (unitsStack[i] == "÷"){
            const val = unitsStack[i - 1] / unitsStack[i + 1];
            // unitsStack[i-1] = val;
            unitsStack.splice(i-1, 3, val);
        }
    }
    for (i = 0; i < unitsStack.length; i++){
        if (unitsStack[i] == "+"){
            const val = unitsStack[i - 1] + unitsStack[i + 1];
            // unitsStack[i-1] = val;
            unitsStack.splice(i-1, 3, val);
        }
        else if (unitsStack[i] == "-"){
            const val = unitsStack[i - 1] - unitsStack[i + 1];
            // unitsStack[i-1] = val;
            unitsStack.splice(i-1, 3, val);
        }
    }
    console.log(unitsStack);
    previousAns = unitsStack[0];


    clearStack();
    screenText.textContent = previousAns;
}

function organiseStack(unitsStack){
    // Join the seperate digits and operators together into units so we can evaluate them
    // E.G. [1,2,3,+,3,5,/,2,4] => [123, '+', 35, '/', 24]
    let tempStack = [];
    for (i = 0; i < memoryStack.length; i++){
        if (numbers.includes(memoryStack[i]) && i == memoryStack.length - 1){
            tempStack.push(memoryStack[i]);
            tempToUnitStack(tempStack, unitsStack);
        }
        else if (numbers.includes(memoryStack[i])){
            tempStack.push(memoryStack[i]);
        }
        else if(operatorSymbols.includes(memoryStack[i])){
            tempToUnitStack(tempStack, unitsStack);
            unitsStack.push(memoryStack[i]);
        }
    }
}

function tempToUnitStack(tempStack, unitsStack){
    // Convert the digits in the temp stack to a single number
    if (tempStack.length != 0){
        unitsStack.push( Number(tempStack.join("")) );
        tempStack.length = 0; //clears array, doing tempStack = [] creates reference problems
    }
    else{
        return -1;
    }
}


