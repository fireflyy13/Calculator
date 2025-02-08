const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a) / Number(b);

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  } else {
    return "Please, choose correct operator";
  }
}

const myDisplay = document.querySelector(".display");
const numberPanel = document.querySelector(".numbers");
const errorDisplay = document.querySelector(".error-display");

let firstNumber;
let numbers = [];
let operators = [];
let operatorPressed = false;
let operator;

numberPanel.addEventListener("click", (evt) => {
  function populateNumbers() {
    if (operatorPressed) {
      myDisplay.innerHTML = "";
      myDisplay.innerHTML += evt.target.innerHTML;
      operatorPressed = false;
    } else {
      myDisplay.innerHTML += evt.target.innerHTML;
    }
  }

  if (evt.target === evt.currentTarget) {
    return;
  }

  let content = "";

  if (evt.target.classList.contains("number")) {
    if (!String(myDisplay.innerHTML).includes(".")) {
      if (evt.target.innerHTML === "." && myDisplay.innerHTML === "") {
        myDisplay = "";
      } else {
        populateNumbers();
      }
    } else if (String(myDisplay.innerHTML).includes(".")) {
      if (evt.target.innerHTML != ".") {
        populateNumbers();
      }
    }
  } else if (evt.target.classList.contains("operator")) {
    if (operatorPressed === false) {
      operators.push(evt.target.innerHTML);
      numbers.push(myDisplay.innerHTML);
    } else {
      operators = [];
      operators.push(evt.target.innerHTML);
    }

    operatorPressed = true;

    if (numbers.length === 2) {
      if (numbers[1] == 0) {
        errorDisplay.innerHTML = "We are not allowed to divide by 0!";
        setTimeout(() => {
          errorDisplay.innerHTML = "";
          myDisplay.innerHTML = "";
        }, 3000);
      }

      let result = operate(operators[0], numbers[0], numbers[1]);

      if (String(result).trim().length > 9) {
        result = result.toFixed(9);
      }
      myDisplay.innerHTML = result;
      numbers = [];
      numbers.push(result);
      operators.splice(0, 1);
    }
  } else if (evt.target.classList.contains("clear")) {
    content = "";
    myDisplay.innerHTML = content;
    numbers = [];
    operators = [];
  }

  if (evt.target.classList.contains("result")) {
    numbers.push(myDisplay.innerHTML);

    if (numbers[1] == 0) {
      errorDisplay.innerHTML = "We are not allowed to divide by 0!";
      setTimeout(() => {
        errorDisplay.innerHTML = "";
        myDisplay.innerHTML = "";
      }, 3000);
    } else if (numbers.length !== 2) {
      myDisplay.innerHTML = NaN;
      errorDisplay.innerHTML = "Please, enter 2 numbers!";
      setTimeout(() => {
        errorDisplay.innerHTML = "";
        myDisplay.innerHTML = "";
      }, 3000);
    }
    let firstNumber = numbers[0];
    let secondNumber = numbers[1];
    result = operate(operators[0], firstNumber, secondNumber);

    if (String(result).trim().length > 9) {
      result = result.toFixed(9);
    }

    myDisplay.innerHTML = result;
    numbers = [];
    operators = [];
  }
});
