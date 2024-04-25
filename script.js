document.addEventListener("DOMContentLoaded", function() {
  // Select all number buttons
  let numberButtons = document.querySelectorAll('.number');
  // Select clear button
  let clearButton = document.querySelector('.clear');
  // Select clear all button
  let clearAllButton = document.querySelector('.clearAll');
  // Select all operator buttons
  let operatorButtons = document.querySelectorAll('.operator');
  // Select equal button
  let equalButton = document.querySelector('.equal');
  // Select previous display element
  let previousDisplay = document.querySelector('.previous');
  // Select current display element
  let currentDisplay = document.querySelector('.current');
  
  // Initialize variables for input and operator
  let currentInput = '';
  let previousInput = '';
  let currentOperator = '';

  // Function to handle number button clicks
  function addNumber() {
    numberButtons.forEach(function(number) {
      number.addEventListener('click', function(e) {
        let num = e.target.textContent;
        // Check if current input length is within limit
        if (currentInput.length <= 30) {
          currentInput += num;
          // Update current display
          currentDisplay.textContent = previousInput + currentOperator + currentInput;
        }
      });
    });
  }

  // Call function to handle number button clicks
  addNumber(); 

  // Function to handle operator button clicks
  function handleOperators() {
    operatorButtons.forEach(function(operButtons) {
      operButtons.addEventListener('click', function(e) {
        // Get the clicked operator
        currentOperator = e.target.textContent;
        // Update previous input and reset current input
        previousInput = currentInput;
        currentInput = '';
        // Update current display
        currentDisplay.textContent = previousInput + currentOperator + currentInput;
      });
    });
  }

  // Call function to handle operator button clicks
  handleOperators(); 

  // Event listener for clear all button
  clearAllButton.addEventListener('click', () => {
    // Clear all inputs and operator
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    // Clear display
    currentDisplay.textContent = '';
  });

  // Event listener for clear button
  clearButton.addEventListener('click', () => {
    // Check if there is input to clear
    if (currentInput.length > 0) {
      // Remove last character from current input
      currentInput = currentInput.slice(0, -1);
    } else if (currentOperator) {
      // Remove operator if present
      currentOperator = '';
    } else if (previousInput.length > 0) {
      // Remove last character from previous input
      previousInput = previousInput.slice(0, -1);
    }
    // Update display
    currentDisplay.textContent = previousInput + currentOperator + currentInput;
  });

  // Event listener for equal button
  equalButton.addEventListener('click', () => {
    // Calculate the result
    calculate();
    // Update display with result
    currentDisplay.textContent = currentInput;
  });

  // Function to perform calculation
  function calculate() {
    // Parse inputs to numbers
    previousInput = parseFloat(previousInput);
    currentInput = parseFloat(currentInput);
    // Perform operation based on operator
    if (currentOperator === '+') {
      currentInput = previousInput + currentInput;
    } else if (currentOperator === '-') {
      currentInput = previousInput - currentInput;
    } else if (currentOperator === 'x') {
      currentInput = previousInput * currentInput;
    } else if (currentOperator === '÷') {
      // Check for division by zero
      if (currentInput != 0) {
        currentInput = previousInput / currentInput;
      } else {
        // Alert user for division by zero
        alert("You cannot divide by zero");
        currentInput = '';
        currentOperator = '';
      }
    }
    // Clear previous input and operator
    previousInput = '';
    currentOperator = '';
  }
});
