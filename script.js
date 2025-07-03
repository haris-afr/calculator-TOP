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