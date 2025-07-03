const middleRow = document.querySelector(".calculator-mid-row");
const bottomRow = document.querySelector(".calculator-bottom-row");


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

function createMiddleRowButton(){
    const btn = document.createElement("button");
    btn.classList.add("middle-row-button");
    middleRow.appendChild(btn);
}

function createBottomRowButton(key){
    const btn = document.createElement("button");
    btn.textContent = key;
    btn.id = key + "-key";
    btn.classList.add("bottom-row-button");
    bottomRow.appendChild(btn);
}

const bottomRowKeys =   ["7", "8", "9", "DEL", "AC", 
                        "4", "5", "6", "X", "/",
                        "1", "2", "3", "+", "-",
                        "0", ".", "10^x", "Ans", "="];

for (i = 0; i < 18; i++){createMiddleRowButton();}

for(i = 0; i < 20; i++){
    createBottomRowButton(bottomRowKeys[i]);
}