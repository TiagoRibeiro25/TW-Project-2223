import { addToCart, isUserLogged } from "../users.js";

function addToCardEvent(item) {
  if (!isUserLogged()) {
    // if there's no user logged in, redirect to the login page
    window.location.href = "../../html/login.html";
    return;
  }

  console.log(`Adding "${item}" to cart...`);
  addToCart(item);
  console.log("Added!");

  // show the pop up notification that the item was added to the cart
  const popup = document.querySelector("#cart-popup");
  document.querySelector(
    "#popup-message"
  ).innerText = `Added "${item}" to cart!`;

  popup.classList.add("show");

  // by default: the popup will be shown for 7 seconds
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

export function addEventListenerToBtns() {
  document.querySelectorAll(".buyBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCardEvent(btn.id);
    });
  });

  document?.querySelectorAll(".discBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCardEvent(btn.id);
    });
  });
}

document
  .querySelector("#close-popup-btn")
  .addEventListener("click", () => {
    document.querySelector("#cart-popup").classList.remove("show");
  });
