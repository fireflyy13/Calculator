const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a) / Number(b);
const modulo = (a, b) => Number(a) % Number(b);

function isNumber(str) {
  if (typeof str != "string") {
    return false;
  }
  return !isNaN(str) && !isNaN(parseInt(str));
}

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  } else if (operator === "%") {
    return modulo(a, b);
  } else {
    return "Please, choose correct operator";
  }
}

function displayError() {
  errorDisplay.innerHTML = "Error ⚠️";
  // opacity = Number(
  //   window.getComputedStyle(errorDisplay).getPropertyValue("opacity")
  // );
  // setTimeout(() => {
  //   if (opacity > 0) {
  //     opacity -= 0.1;
  //     errorDisplay.style.opacity = opacity;
  //   }
  //   // errorDisplay.innerHTML = "";
  //   // myDisplay.innerHTML = "";
  // }, 3000);
  setTimeout(() => {
    errorDisplay.innerHTML = "";
  }, 800);
}

let myDisplay = document.querySelector(".display");
const numberPanel = document.querySelector(".numbers");
const errorDisplay = document.querySelector(".error-display");

let firstNumber;
let numbers = [];
let operators = [];
let result2 = [];
let operatorPressed = false;
let isResult = false;
let operator;

numberPanel.addEventListener("click", (evt) => {
  console.log(numbers);
  function populateNumbers() {
    if (operatorPressed) {
      myDisplay.innerHTML = "";
      myDisplay.innerHTML += evt.target.innerHTML;
      operatorPressed = false;
      isResult = false;
    } else if (isResult && evt.target.innerHTML != ".") {
      myDisplay.innerHTML = "";
      myDisplay.innerHTML = evt.target.innerHTML;
      isResult = false;
    } else if (isResult && evt.target.innerHTML == ".") {
      myDisplay.innerHTML = "";
      isResult = false;
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
        displayError();
        // displayError();
        // errorDisplay.style.opacity = 1;
      }

      let result = operate(operators[0], numbers[0], numbers[1]);

      if (String(result).trim().length > 9) {
        result = result.toFixed(9);
      }
      myDisplay.innerHTML = result;
      numbers = [];
      numbers.push(result);
      isResult = true;
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

    errorDisplay.style.opacity = 1;
    if (numbers[1] == 0 && operators[0] == "/") {
      // opacity = Number(
      //   window.getComputedStyle(errorDisplay).getPropertyValue("opacity")
      // );
      // setTimeout(() => {
      //   setInterval(() => {
      //     if (opacity > 0) {
      //       opacity -= 0.1;
      //       errorDisplay.style.opacity = opacity;
      //     }
      //   }, 300);
      //   // errorDisplay.innerHTML = "";
      //   // myDisplay.innerHTML = "";
      // }, 500);
      // setTimeout(() => {
      //   errorDisplay.innerHTML = "";
      // }, 500);
      displayError();
    } else if (numbers.length !== 2) {
      myDisplay.innerHTML = NaN;
      isResult = true;
      errorDisplay.innerHTML = "2 numbers required...";
      // setTimeout(() => {
      //   errorDisplay.innerHTML = "";
      //   // myDisplay.innerHTML = "";
      // }, 3000);
      displayError();
    }

    let firstNumber = numbers[0];
    let secondNumber = numbers[1];
    let result = operate(operators[0], firstNumber, secondNumber);

    if (String(result).trim().length > 9) {
      result = result.toFixed(9);
    }

    myDisplay.innerHTML = result;
    isResult = true;
    numbers = [];
    operators = [];
  }

  if (
    evt.target.classList.contains("backspace") &&
    myDisplay.innerHTML != "NaN" &&
    myDisplay.innerHTML != "Infinity"
  ) {
    content = myDisplay.innerHTML;
    myDisplay.innerHTML = content.slice(0, -1);
    // numbers.pop();
  }
});

document.addEventListener("keydown", (evt) => {
  console.log(numbers);
  console.log(isResult);
  function populateNumbers() {
    if (operatorPressed) {
      myDisplay.innerHTML = "";
      myDisplay.innerHTML += evt.key;
      operatorPressed = false;
      isResult = false;
    } else if (isResult && evt.key != ".") {
      myDisplay.innerHTML = "";
      myDisplay.innerHTML = evt.key;
      isResult = false;
    } else if (isResult && evt.key == ".") {
      myDisplay.innerHTML = "";
      isResult = false;
    } else {
      myDisplay.innerHTML += evt.key;
    }
  }

  let content = "";

  if (isNumber(evt.key) || evt.key == ".") {
    if (!String(myDisplay.innerHTML).includes(".")) {
      if (evt.key === "." && myDisplay.innerHTML === "") {
        myDisplay = "";
      } else {
        populateNumbers();
      }
    } else if (String(myDisplay.innerHTML).includes(".")) {
      if (evt.key != ".") {
        populateNumbers();
      }
    }
  } else if (
    evt.key == "+" ||
    evt.key == "-" ||
    evt.key == "*" ||
    evt.key == "/" ||
    evt.key == "%"
  ) {
    if (operatorPressed === false) {
      operators.push(evt.key);
      numbers.push(myDisplay.innerHTML);
    } else {
      operators = [];
      operators.push(evt.key);
    }

    operatorPressed = true;

    if (numbers.length === 2) {
      if (numbers[1] == 0 && operators[0] == "/") {
        displayError();
        myDisplay.innerHTML = "Infinity";
        // setTimeout(() => {
        //   errorDisplay.innerHTML = "";
        //   myDisplay.innerHTML = "";
        // }, 3000);
      }

      let result = operate(operators[0], numbers[0], numbers[1]);
      console.log(result);

      if (String(result).trim().length > 9) {
        result = result.toFixed(9);
      }
      myDisplay.innerHTML = result;
      isResult = true;
      numbers = [];
      numbers.push(result);
      operators.splice(0, 1);
      result2.push(result);
    }
  } else if (
    evt.key == "c" ||
    evt.key == "C" ||
    evt.key == "с" ||
    evt.key == "С" ||
    evt.key == "Delete"
  ) {
    content = "";
    myDisplay.innerHTML = content;
    numbers = [];
    operators = [];
  }

  if (evt.key == "=") {
    numbers.push(myDisplay.innerHTML);

    if (numbers[1] == 0 && operators[0] == "/") {
      myDisplay.innerHTML = "Infinity";
      // setTimeout(() => {
      //   errorDisplay.innerHTML = "";
      //   // myDisplay.innerHTML = "";
      // }, 3000);
      displayError();
    } else if (numbers.length !== 2) {
      myDisplay.innerHTML = NaN;
      isResult = true;
      errorDisplay.innerHTML = "2 numbers required...";
      // setTimeout(() => {
      //   errorDisplay.innerHTML = "";
      //   // myDisplay.innerHTML = "";
      // }, 3000);
      displayError();
    }
    let firstNumber = numbers[0];
    let secondNumber = numbers[1];

    let result = operate(operators[0], firstNumber, secondNumber);

    if (String(result).trim().length > 9) {
      result = result.toFixed(9);
    }

    myDisplay.innerHTML = result;
    isResult = true;
    numbers = [];
    operators = [];
  }

  if (
    evt.key == "Backspace" &&
    myDisplay.innerHTML != "NaN" &&
    myDisplay.innerHTML != "Infinity"
  ) {
    content = myDisplay.innerHTML;
    myDisplay.innerHTML = content.slice(0, -1);
    // numbers.pop();
  }
});
