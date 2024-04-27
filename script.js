const container = document.querySelector('.container');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
let result = 0;
let operands = [];
let prevText = '';
let isDecimal = false;

buttons.forEach(function(btn) {
    let text = '';
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        text = e.target.textContent
        console.log(text);

        // Clear
        if (text === 'C') {
            display.textContent = '';
            result = 0;
            isDecimal = false;
            operands = [];
        }
        // Operations
        else if (text === 'x' || text == '+' || text == '-') {
            isDecimal = false;
            if (result !== 0) {
                operands.push(result);
            }
            result = 0;

            // Remove previous button highlight
            const currentActiveBtn = document.querySelector(".active");
            if (currentActiveBtn) {
                currentActiveBtn.style.backgroundColor = "rgb(133, 143, 158)";
                currentActiveBtn.classList.remove("active");
            }

            // Add button highlight
            e.target.classList.add("active");
            document.querySelector('.active').style.backgroundColor = "rgb(200, 200, 200)";
            
            // If there are already 2 operands, then calculate
            if (operands.length >= 2) {
                if (text == '+')
                    result = operands[0] + operands[1]
                else if (text == '-')
                    result = operands[0] - operands[1]
                else if (text == 'x')
                    result = operands[0] * operands[1]
                
                display.textContent = result;
                operands = [];
                operands.push(result);
            }
        }
        
        // =
        else if (text === '=') {
            // Remove button highlight
            const currentActiveBtn = document.querySelector(".active");
            if (currentActiveBtn) {
                currentActiveBtn.style.backgroundColor = "rgb(133, 143, 158)";
                currentActiveBtn.classList.remove("active");
            }
            if (operands.length == 0) {
                display.textContent = result;
            }
            else {
                if (result !== 0) {
                    operands.push(result);
                }
                if (currentActiveBtn.textContent === '+') {
                    result = operands.reduce((accu, val) => accu += val, 0);
                }
                else if (currentActiveBtn.textContent === '-') {
                    result = operands.reduce((accu, val) => accu -= val);
                }
                else if (currentActiveBtn.textContent === 'x') {
                    result = operands.reduce((accu, val) => accu *= val);
                }
                
                display.textContent = result;
                console.log(operands);
                operands.length = 0;
            }
            console.log(result);
            console.log(currentActiveBtn.textContent);
        }
        // .
        else if (text === '.') {
            if (!isDecimal) {
                display.textContent = `${result}.`;
                isDecimal = true;
                console.log(result);
                prevText = text;
            }
        }
        // Numbers
        else if (Number(text) >= 0 && Number((text) <= 9)) {
            if(isDecimal) {
                if (prevText === '.') {
                    result = Number(`${result}.${text}`);
                    prevText = '';
                }
                else {
                    text = `${result}` + text;
                    result = Number(`${text}`);
                    console.log(result);
                }
            }
            else if (!isDecimal) {
                result = Number(text);
            }
            display.textContent = `${result}`;
        }
    });
});