import { addToCart, isUserLogged } from "../users.js";

function addToCardEvent(item) {
  console.log("clicked");

  if (!isUserLogged()) {
    // if there's no user logged in, redirect to the login page
    window.location.href = "../../html/login.html";
    return;
  }

  console.log(`Adding "${item}" to cart...`);

  addToCart(item);
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
