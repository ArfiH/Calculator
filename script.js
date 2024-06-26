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
        if (text === 'AC') {
            display.textContent = '';
            result = 0;
            isDecimal = false;
            operands = [];
        }

        // Operations
        else if (text === 'x' || text === '+' || text === '-' || text === '/' || text === '%') {
            result = Number(result);
            isDecimal = false;
            if (result !== 0) {
                operands.push(result);
            }
            result = 0;

            // Remove previous button highlight
            const currentActiveBtn = document.querySelector(".active");
            if (currentActiveBtn) {
                currentActiveBtn.style.backgroundColor = "rgb(122, 153, 172)";
                currentActiveBtn.classList.remove("active");
            }

            // Add button highlight
            e.target.classList.add("active");
            document.querySelector('.active').style.backgroundColor = "rgb(166, 185, 204)";
            
            // If there are already 2 operands, then calculate
            if (operands.length >= 2) {
                if (text == '+')
                    result = operands[0] + operands[1];
                else if (text == '-')
                    result = operands[0] - operands[1];
                else if (text == 'x')
                    result = operands[0] * operands[1];
                else if (text == '/') 
                    result = operands[0] / operands[1];
                else if (text == '%')
                    result = operands[0] % operands[1];
                
                display.textContent = result;
                operands = [];
                operands.push(result);
            }
        }
        
        // =
        else if (text === '=') {
            result = Number(result);

            // Remove button highlight
            const currentActiveBtn = document.querySelector(".active");
            if (currentActiveBtn) {
                currentActiveBtn.style.backgroundColor = "rgb(122, 153, 172)";
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
                else if (currentActiveBtn.textContent === '/') {
                    result = operands.reduce((accu, val) => accu /= val);
                }
                else if (currentActiveBtn.textContent === '%') {
                    result = operands.reduce((accu, val) => accu %= val);
                }
                
                display.textContent = result;
                console.log(operands);
                operands.length = 0;
            }
            console.log(result);
            // console.log(currentActiveBtn.textContent);
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

        // Undo
        else if (text == 'C') {
            let currText = display.textContent;
            if (currText.at(-1) == ".") {
                console.log("last is .");
                prevText = '';
                isDecimal = false;
            }
            currText = currText.slice(0, currText.length - 1);
            result = Number(currText);
            console.log(result);
            display.textContent = currText;
        }

        // 00
        else if (text == '00') {
            if (prevText == '.') {
                result = result+'.'+text;
                prevText = '';
            }
            else {
                result = result + text;
            }
            display.textContent = `${result}`;
        }

        // Numbers
        else if (Number(text) >= 0 && Number((text) <= 9)) {
            if(isDecimal) {
                if (prevText === '.') {
                    result = `${result}.${text}`;
                    prevText = '';
                }
                else {
                    text = `${result}` + text;
                    result = text;
                    console.log(result);
                }
            }
            else if (!isDecimal) {
                result = Number(result+text);
            }
            display.textContent = `${result}`;
        }
    });
});