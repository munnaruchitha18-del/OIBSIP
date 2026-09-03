// DOM Element References
const tempInput = document.getElementById('tempInput');
const unitSelect = document.getElementById('unitSelect');
const convertBtn = document.getElementById('convertBtn');
const errorMessage = document.getElementById('errorMessage');

const celsiusResult = document.getElementById('celsiusResult');
const fahrenheitResult = document.getElementById('fahrenheitResult');
const kelvinResult = document.getElementById('kelvinResult');

// Absolute Zero Limits in respective units
const ABSOLUTE_ZERO = {
  celsius: -273.15,
  fahrenheit: -459.67,
  kelvin: 0
};

// Conversion Logic Function
function convertTemperature() {
  const rawValue = tempInput.value.trim();
  const selectedUnit = unitSelect.value;

  // Clear previous error message
  showError('');

  // 1. Validation: Check empty or non-numeric input
  if (rawValue === '' || isNaN(rawValue)) {
    showError('Please enter a valid numeric temperature value.');
    resetResults();
    return;
  }

  const numericValue = parseFloat(rawValue);

  // 2. Absolute Zero Validation
  if (numericValue < ABSOLUTE_ZERO[selectedUnit]) {
    const limitLabel = selectedUnit === 'celsius' ? '−273.15°C' :
                       selectedUnit === 'fahrenheit' ? '−459.67°F' : '0 K';
    showError(`Temperature cannot be below Absolute Zero (${limitLabel}).`);
    resetResults();
    return;
  }

  // 3. Calculation Logic (Normalize to Celsius first)
  let celsius;

  if (selectedUnit === 'celsius') {
    celsius = numericValue;
  } else if (selectedUnit === 'fahrenheit') {
    celsius = (numericValue - 32) * (5 / 9);
  } else if (selectedUnit === 'kelvin') {
    celsius = numericValue - 273.15;
  }

  // Compute remaining values from Celsius
  const fahrenheit = (celsius * (9 / 5)) + 32;
  const kelvin = celsius + 273.15;

  // 4. Update UI Display
  celsiusResult.textContent = `${celsius.toFixed(2)} °C`;
  fahrenheitResult.textContent = `${fahrenheit.toFixed(2)} °F`;
  kelvinResult.textContent = `${kelvin.toFixed(2)} K`;
}

// Display error messages
function showError(msg) {
  if (msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.add('visible');
  } else {
    errorMessage.textContent = '';
    errorMessage.classList.remove('visible');
  }
}

// Reset display values
function resetResults() {
  celsiusResult.textContent = '-- °C';
  fahrenheitResult.textContent = '-- °F';
  kelvinResult.textContent = '-- K';
}

// Event Listeners
convertBtn.addEventListener('click', convertTemperature);

// Allow pressing 'Enter' inside the input field to convert
tempInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    convertTemperature();
  }
});
