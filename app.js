
// Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.
// add
// subtract
// multiply
// divide

let sign, num1 = "", num2 = "", isFirst = true, decimalInput = false, queue;
let output_string = '';
let operation_str;
const output = document.querySelector('p.answer');
const buttons = document.querySelectorAll('button');
const last_operation = document.querySelector('p.last_operation');
const add = (a, b)=> a+b;
const subtract = (a,b)=>a-b;
const divide = (a,b) => a/b;
const multiply = (a,b)=> a*b;
const operate = (operator, a, b) => {
    if(operator === "+"){
        return add(a,b);
    } else if (operator === "-"){
        return subtract(a,b);
    } else if (operator === "/"){
        return divide(a,b);
    } else if (operator === "*"){
        return multiply(a,b);
    }
}



console.log(add(1,2));
console.log(multiply(4, 5));
console.log(operate("-", 5, 6));


const calculator = ()=>{
    buttons.forEach((button) =>{
        button.addEventListener('click', ()=>{
            // Taking in first number until sign is pressed
            if (button.classList.contains("num") && isFirst === true){
                if(!num1){
                    output_string = "";
                    queue = "";
                }
                num1 += button.textContent;
                output_string += button.textContent;
            } 
            // Taking in second number until sign is pressed
            else if(button.classList.contains("num") && isFirst === false){
                num2 += button.textContent;
                output_string += button.textContent;
            } 
            // If decimal point is pressed
            else if(button.classList.contains("decimal")){
                if(isFirst){
                    num1 += button.textContent;
                    output_string += button.textContent;
                    decimalInput = true;
                } else {
                    num2 += button.textContent;
                    output_string += button.textContent;
                    decimalInput = true;
                }
            }
            // If delete button is pressed
            else if(button.id === "remove"){
                if(isFirst){
                    num1 = num1.substring(0, num1.length - 1);
                    output_string = num1;
                } else {
                    num2 = num2.substring(0, num2.length - 1);
                    output_string = num1 + sign + num2;
                }
            }
            //If reset button is pressed
            else if(button.id === "reset"){
                queue = "";
                output_string = ""; //Rounded to the nearst .00001 point
                num1 = "";
                num2 = "";
                isFirst = true;
                decimalInput = false;
            }
            // If Sign input is made
            else if (button.classList.contains("sign")){
                // If the first number is empty (User didn't input a number previously)
                if(!num1){
                    output.textContent = "Select a number first!";
                } // If the second number is empty (First time sign is pressed) 
                else if(!num2) {
                    sign = button.textContent;
                    isFirst = false;
                    output_string += sign;
                    decimalInput = false;
                } // If the first and second number are both not empty (user has signed before)
                else {
                    // Operate the first and second, and then set first number to the return value.
                    num1 = operate(sign, parseFloat(num1), parseFloat(num2));
                    sign = button.textContent;
                    num2 = "";
                    queue = output_string;
                    output_string = num1 + sign;
                    decimalInput = false;
                }
            } 
            // If the Submit button is clicked
            else if (button.id === "submit"){
                // If there is a second value, then perform operation, and put back to default values.
                if(num2){
                    queue = output_string;
                    output_string = Math.round(operate(sign, parseFloat(num1), parseFloat(num2)) * 100000)/100000; //Rounded to the nearst .00001 point
                    num1 = "";
                    num2 = "";
                    isFirst = true;
                    decimalInput = false;
                } else {
                    // If there is no 2nd value, then tell the user something is wrong.
                    output.textContent = "INVALID: The input is faulty";
                }
    
            }
            last_operation.textContent = queue;
            output.textContent = output_string;
        });
    });
}

calculator();
