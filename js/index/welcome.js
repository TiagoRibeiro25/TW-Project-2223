const text = [
  "Buy your favourite games!",
  "For the best price!",
  "And get them delivered to your door!",
  "In no time!",
];

const info = document.querySelector("#welcome-info-h3");

// Variables for the text animation
let index = 0;
let count = 0;
let currentText = "";
let letter = "";

// Function to animate the text
(function type() {
  if (count === text.length) {
    count = 0;
  }

  currentText = text[count];
  letter = currentText.slice(0, ++index);

  info.textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    // If the text is finished, wait 2 seconds before going to the next one
    setTimeout(() => {
      type();
    }, 1500);
  } else {
    // Wait 0.1 seconds before going to the next letter
    setTimeout(type, 100);
  }
})();
