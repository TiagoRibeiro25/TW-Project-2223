import { removeAll } from "../users.js";

const expirationSelect = document.querySelector("[data-expiration-year]");
const logo = document.querySelector("[data-logo]");

// Create the expiration year options
const currentYear = new Date().getFullYear();
for (let i = currentYear; i < currentYear + 10; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  expirationSelect.append(option);
}

/* Listening for keydown events and then checking if the input is a connected input. If it is, it
checks if the key is an arrow key, backspace, or a number. If it is an arrow key, it calls the
handleArrowLeft, handleArrowRight, or handleBackspace function. If it is a number, it calls the
onInputChange function. */
document.addEventListener("keydown", (e) => {
  const input = e.target;
  if (!isConnectedInput(input)) return;

  switch (e.key) {
    case "ArrowLeft":
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        handleArrowLeft(input, e);
      }
      break;
    case "ArrowRight":
      if (
        input.selectionStart === input.value.length &&
        input.selectionEnd === input.value.length
      ) {
        handleArrowRight(input, e);
      }
      break;
    case "Backspace":
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        handleBackspace(input, e);
      }
      break;
    default:
      if (
        !e.ctrlKey &&
        !e.altKey &&
        e.key.length === 1 &&
        e.key.match(/^\d$/)
      ) {
        e.preventDefault();
        onInputChange(input, e.key);
      }
  }
});

/**
 * If the input is the first input, then do nothing. Otherwise, focus on the previous input, and set
 * the cursor to the end of the input.
 * @param input - the input element that the user is currently focused on
 * @param e - The event object
 */
function handleArrowLeft(input, e) {
  const prev = input.previousElementSibling;
  prev.focus();
  prev.selectionStart = prev.value.length - 1;
  prev.selectionEnd = prev.value.length - 1;
  e.preventDefault();
}

/**
 * If the user presses the right arrow key, focus on the next input, and set the cursor to the second
 * character.
 * @param input - The input element that the user is currently typing in.
 * @param e - The event object
 */
function handleArrowRight(input, e) {
  const next = input.nextElementSibling;
  next.focus();
  next.selectionStart = 1;
  next.selectionEnd = 1;
  e.preventDefault();
}

/**
 * If the user presses backspace, we move the cursor to the previous input, delete the last character,
 * and move the cursor to the end of the input
 * @param input - The input element that the user is currently typing in.
 * @param e - The event object
 */
function handleBackspace(input, e) {
  const prev = input.previousElementSibling;
  prev.value = prev.value.substring(0, prev.value.length - 1);
  prev.focus();
  prev.selectionStart = prev.value.length;
  prev.selectionEnd = prev.value.length;
  e.preventDefault();
}

// When pasting, check if the pasted value is a number
// and then put 4 digits in each input
document.addEventListener("paste", (e) => {
  const input = e.target;
  const data = e.clipboardData.getData("text");

  if (!isConnectedInput(input)) return;
  if (!data.match(/^\d+$/)) return e.preventDefault();

  e.preventDefault();
  onInputChange(input, data);
});

/**
 * It takes the input, the new value, the start and end of the selection, updates the input value,
 * focuses the input, and then changes the logo based on the first four numbers of the input.
 * @param input - The input element that was changed
 * @param newValue - The new value of the input
 */
function onInputChange(input, newValue) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  updateInputValue(input, newValue, start, end);
  focusInput(input, newValue.length + start);
  const firstFour = input
    .closest("[data-connected-inputs]")
    .querySelector("input").value;

  if (firstFour.startsWith("4")) {
    logo.src = "../../assets/checkout-icons/visa.svg";
  } else if (firstFour.startsWith("5")) {
    logo.src = "../../assets/checkout-icons/mastercard.svg";
  }
}

function updateInputValue(input, extraValue, start = 0, end = 0) {
  const newValue = `${input.value.substring(
    0,
    start
  )}${extraValue}${input.value.substring(end, 4)}`;
  input.value = newValue.substring(0, 4);
  if (newValue > 4) {
    const next = input.nextElementSibling;
    if (next == null) return;
    updateInputValue(next, newValue.substring(4));
  }
}

/**
 * It takes the input element and the number of characters to be added to the input element and then it
 * moves the cursor to the correct position in the input element.
 * @param input - the input element that was just changed
 * @param dataLength - The length of the data that was just added to the input.
 */
function focusInput(input, dataLength) {
  let addedChars = dataLength;
  let currentInput = input;
  while (addedChars > 4 && currentInput.nextElementSibling != null) {
    addedChars -= 4;
    currentInput = currentInput.nextElementSibling;
  }
  if (addedChars > 4) addedChars = 4;

  currentInput.focus();
  currentInput.selectionStart = addedChars;
  currentInput.selectionEnd = addedChars;
}

/**
 * If the input is an input element and it has a parent with the data-connected-inputs attribute, then
 * return true.
 * @param input - The input element that was changed.
 * @returns a boolean value.
 */
function isConnectedInput(input) {
  const parent = input.closest("[data-connected-inputs]");
  return input.matches("input") && parent != null;
}

// Cancel purchase (close modal)
document.querySelector("#cancel-btn").addEventListener("click", () => {
  document.querySelector("#checkout-modal").classList.add("modal-hide");
});

// Purchase (delete all items from cart + close modal)
document.querySelector("#purchase-btn").addEventListener("click", () => {
  document.querySelector("#checkout-modal").classList.add("modal-hide");

  // reset all inputs
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  removeAll();

  document.querySelector("#cart-popup").classList.add("show");
  setTimeout(() => {
    document.querySelector("#cart-popup").classList.remove("show");
    window.location.reload();
  }, 2000);
});
