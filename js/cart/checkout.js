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
      if (!e.ctrlKey && !e.altKey && e.key.length === 1 && e.key.match(/^\d$/)) {
        e.preventDefault();
        onInputChange(input, e.key);
      }
  }
});

function handleArrowLeft(input, e) {
  const prev = input.previousElementSibling;
  prev.focus();
  prev.selectionStart = prev.value.length - 1;
  prev.selectionEnd = prev.value.length - 1;
  e.preventDefault();
}

function handleArrowRight(input, e) {
  const next = input.nextElementSibling;
  next.focus();
  next.selectionStart = 1;
  next.selectionEnd = 1;
  e.preventDefault();
}

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
  if (!data.match(/^[0-9]+$/)) return e.preventDefault();

  e.preventDefault();
  onInputChange(input, data);
});

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
    logo.src = "../../assets/checkout-icons/";
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
