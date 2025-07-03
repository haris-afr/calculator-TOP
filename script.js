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

function createBottomRowButton(isGreen=false){
    const btn = document.createElement("button");
    btn.classList.add("bottom-row-button");
    if (isGreen){
        btn.classList.add("green-btn");
    }
    bottomRow.appendChild(btn);
}

for (i = 0; i < 18; i++){createMiddleRowButton();}
for(i = 0; i < 20; i++){
    if (i != 3 && i != 4){
        createBottomRowButton();
    }
    else{
        createBottomRowButton(true);
    }
}