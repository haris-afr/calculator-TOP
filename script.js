const middleRow = document.querySelector(".calculator-mid-row");
const bottomRow = document.querySelector(".calculator-bottom-row");

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['plus','minus','multiply','divide', 'decimal', 'bracket-start', 'bracket-end', 'ans'];
const operatorSymbols = ["+", "-", "×", "÷", '.', '(', ')', 'Ans'];

function createMiddleRowButton(key, keyID){
    const btn = document.createElement("button");
    btn.textContent = key;
    btn.id = "key-" + keyID;

    if (numbers.includes(keyID) || operators.includes(keyID)){
        btn.classList.add("number-key");
    }

    btn.classList.add("middle-row-button");
    middleRow.appendChild(btn);
}

function createBottomRowButton(key, keyID){
    const btn = document.createElement("button");
    btn.textContent = key;
    btn.id = "key-" + keyID;

    if (numbers.includes(keyID) || operators.includes(keyID)){
        btn.classList.add("number-key");
    }
    btn.classList.add("bottom-row-button");
    bottomRow.appendChild(btn);
}

// these two must have either unique or blank keys!

// const middleRowKeys =   ["x²", "x³", "xʸ", "sin⁻¹", "cos⁻¹", "tan⁻¹",
//                         "²√", "³√", "ʸ√", "sin", "cos", "tan",
//                         "log", "ln", "×10", ".", "!", "x⁻¹",];

const middleRowKeys =   ["", "", "", "", "", "",
                        "", "", "", "", "", "",
                        "", "", "(", ")", "", ""];

const middleRowKeyIDs =   ["x-square", "x-cube", "x-pow-y", "sin-inv", "cos-inv", "tan-inv",
                        "sqrt", "cbrt", "y-root", "sin", "cos", "tan",
                        "log", "ln", "bracket-start","bracket-end", "x-inv", "factorial",];

const bottomRowKeys =   ["7", "8", "9", "DEL", "AC", 
                        "4", "5", "6", "×", "÷",
                        "1", "2", "3", "+", "-",
                        "0", ".", "", "Ans", "="];
const bottomRowKeyIDs =   ["7", "8", "9", "DEL", "AC", 
                        "4", "5", "6", "multiply", "divide",
                        "1", "2", "3", "plus", "minus",
                        "0", "decimal", "ten-power", "ans", "equals"];

for (i = 0; i < 18; i++){createMiddleRowButton(middleRowKeys[i], middleRowKeyIDs[i]);}

for(i = 0; i < 20; i++){createBottomRowButton(bottomRowKeys[i], bottomRowKeyIDs[i]);}


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
let clearedStack = false;

const numberKeys = document.querySelectorAll(".number-key");
const delKey = document.querySelector("#key-DEL");
const acKey = document.querySelector("#key-AC");
const equalsKey = document.querySelector("#key-equals");

numberKeys.forEach((numKey) => numKey.addEventListener("click", (e) => addToStack(e.target.textContent)));
// numberKeys.forEach((numKey) => document.addEventListener("keydown", (e) => {
//     e.preventDefault();
//     switch (e.key){
//         case '/':
//             addToStack("÷");
//             break;
//         case '*':
//             addToStack("×");
//             break;
//         case 'Enter':
//             evaluateStack();
//             break;
//         case '=':
//             evaluateStack();
//             break;
//         case 'Delete':
//             delStack();
//             break;
//         case 'Backspace':
//             delStack();
//             break;
//         case 'Escape':
//             clearStack();
//             break;
//         case numKey.textContent:
//             addToStack(e.key);
//         default:
//             break;
//     }
// }))

delKey.addEventListener("click", () => delStack());
acKey.addEventListener("click", () => clearStack());
equalsKey.addEventListener("click", () => evaluateStack());

function addToStack(number){
    if (operatorSymbols.includes(number) && memoryStack.length == 0 && number != "." & number != '(' && clearedStack == false){
        previousAns.toString().split("").forEach((element) => memoryStack.push(element));
    }
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
    clearedStack = true;
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

function evaluateStack(isRecursive = false, givenStack = []){
    let errorInStack = false;
    let divisionByZero = false;
    let unitsStack = [];
    if (isRecursive){
        unitsStack = givenStack;
    }
    else{
        organiseStack(unitsStack);
    }
    console.log(unitsStack);

    //handle operations in priority of ans-key -> decimals -> brackets -> unary plus/unary minus -> multiplication/division -> addition/subtraction from left to right
    //handle ans-key
    for (i = 0; i < unitsStack.length; i++){
        if (unitsStack[i] == "Ans"){
            unitsStack.splice(i, 1, ')');
            unitsStack.splice(i, 0, previousAns);
            unitsStack.splice(i, 0, '(');
        }
    }
    //handle decimals
    for (i = 0; i < unitsStack.length; i++){
        if (unitsStack[i] == "."){
            if (operatorSymbols.includes(unitsStack[i-1]) || unitsStack[i-1] == undefined){
                unitsStack.splice(i, 0, 0);
                i++;
            }
            if (operatorSymbols.includes(unitsStack[i+1]) || unitsStack[i+1] == undefined){
                unitsStack.splice(i+1, 0, 0);
            }
            if (!(Number.isInteger(unitsStack[i-1]) && Number.isInteger(unitsStack[i+1]))){
                errorInStack = true;
            }
            const wholeNum = unitsStack[i - 1];
            let decimalVal = (unitsStack[i + 1] / Math.pow(10, Math.floor(Math.log10(unitsStack[i+1]) + 1) ));

            //log doesnt work if decimal val is 0, so we hard code it to be equal to 0 in that case
            if (unitsStack[i+1] == 0){
                decimalVal = 0;
            }
            
            const val =  wholeNum + decimalVal;
            
            unitsStack.splice(i-1, 3, val);
            i--;
        }
    }

    //handle inner bracket operations as seperate stacks using recursion, return the answer then use that
    for (i = 0; i < unitsStack.length; i++){
        if (unitsStack[i] =="("){
            
            let startBracketPos = i;
            let endBracketPos = -1;
            let newStartBrackets = 0;

            //check if start bracket has an end bracket
            for (j = i + 1; j < unitsStack.length; j++){
                if (unitsStack[j] == "("){
                    newStartBrackets++;
                }
                else if (unitsStack[j] == ")" && newStartBrackets == 0){
                    endBracketPos = j;
                    break;
                }
                else if (unitsStack[j] == ")" && newStartBrackets > 0){
                    newStartBrackets--;
                }
            }

            if(endBracketPos == -1){
                errorInStack = true;
                break;
            }
            
            const iVal = i;
            const startBracketVal = startBracketPos;
            const endBracketVal = endBracketPos;

            const val = evaluateStack(true, unitsStack.slice(startBracketPos + 1, endBracketPos));

            i = iVal;
            startBracketPos = startBracketVal;
            endBracketPos = endBracketVal;
            
            if (val == undefined){
                errorInStack = true;
            }
            unitsStack.splice(startBracketPos, 1 + (endBracketPos - startBracketPos), val);
            
            if (!operatorSymbols.includes(unitsStack[i-1]) && unitsStack[i-1] != undefined){
                unitsStack.splice(i, 0, '×');
                i++;
            }
            if (!operatorSymbols.includes(unitsStack[i+1]) && unitsStack[i+1] != undefined){
                unitsStack.splice(i+1, 0, '×');
            }

            i--;
        }
    }

    //handle unary-plus/unary-minus
    for (i = 0; i < unitsStack.length; i++){
        const operatorToTheLeft = (operatorSymbols.includes(unitsStack[i-1]));
        const undefinedToTheLeft = (unitsStack[i-1] == undefined);
        const numberToTheRight = (typeof unitsStack[i+1] == "number");
        if (unitsStack[i] == "+"){
            if (!((operatorToTheLeft || undefinedToTheLeft) && numberToTheRight)) {break;}
            const val = unitsStack[i + 1];
            unitsStack.splice(i, 2, val);
            i--;
        }
        else if (unitsStack[i] == "-"){
            if (!((operatorToTheLeft || undefinedToTheLeft) && numberToTheRight)) {break;}
            const val = -unitsStack[i + 1];
            unitsStack.splice(i, 2, val);
            i--;
        }
    }

    //handle multiplication and division
    for (i = 0; i < unitsStack.length; i++){
        const operatorToTheLeftOrRight = (operatorSymbols.includes(unitsStack[i-1]) || operatorSymbols.includes(unitsStack[i+1]))
        const undefinedToTheLeftOrRight = (unitsStack[i-1] == undefined) || (unitsStack[i+1] == undefined);
        if (unitsStack[i] == "×"){
            if (operatorToTheLeftOrRight || undefinedToTheLeftOrRight) {errorInStack = true;}
            const val = unitsStack[i - 1] * unitsStack[i + 1];
            unitsStack.splice(i-1, 3, val);
            i--;
        }
        else if (unitsStack[i] == "÷"){
            if (operatorToTheLeftOrRight || undefinedToTheLeftOrRight) {errorInStack = true;}
            if (unitsStack[i+1] == 0){divisionByZero = true;break;}
            const val = unitsStack[i - 1] / unitsStack[i + 1];
            unitsStack.splice(i-1, 3, val);
            i--
        }
    }

    //handle addition and subtraction
    for (i = 0; i < unitsStack.length; i++){
        const operatorToTheLeftOrRight = (operatorSymbols.includes(unitsStack[i-1]) || operatorSymbols.includes(unitsStack[i+1]));
        const undefinedToTheLeftOrRight = (unitsStack[i-1] == undefined) || (unitsStack[i+1] == undefined);
        if (unitsStack[i] == "+"){
            if (operatorToTheLeftOrRight || undefinedToTheLeftOrRight) {errorInStack = true;}
            const val = unitsStack[i - 1] + unitsStack[i + 1];
            unitsStack.splice(i-1, 3, val);
            i--;
        }
        else if (unitsStack[i] == "-"){
            if (operatorToTheLeftOrRight || undefinedToTheLeftOrRight) {errorInStack = true;}
            const val = unitsStack[i - 1] - unitsStack[i + 1];
            unitsStack.splice(i-1, 3, val);
            i--;
        }
    }
    
    if (isRecursive){
        if (errorInStack){
            return undefined;
        }
        else{
            return unitsStack[0];
        }
    }
    
    console.log("Units Stack " + unitsStack);
    if (errorInStack){
        clearStack();
        screenText.textContent = "Invalid Operation!";
    }
    else if (divisionByZero){
        clearStack();
        screenText.textContent = "Nice try.";
    }
    else{
        previousAns = unitsStack[0];
        clearStack();
        clearedStack = false;
        screenText.textContent = previousAns;
    }
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
        else if(operatorSymbols.includes(memoryStack[i]) || memoryStack[i] == previousAns){
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


