import { addToCart, getUserLogged, isUserLogged } from "../users.js";

function addToCardEvent(item) {
  if (!isUserLogged()) {
    // if there's no user logged in, redirect to the login page
    window.location.href = "../../html/login.html";
    return;
  }

  let user = getUserLogged();

  console.log(`Adding "${item}" to cart...`);
  addToCart(item);
  
  const popup = document.querySelector("#cart-popup");
  // show the pop up notification that the item was added to the cart

  if (!user.cart.includes(item)) {
    document.querySelector(
      "#popup-message"
    ).innerText = `Added "${item}" to cart!`;
    document.querySelector("#rubberBand").innerText++;
  } else {
    document.querySelector(
      "#popup-message"
    ).innerText = `The game "${item}" is already in your cart!`;
  }

  popup.classList.add("show");

  // by default: the popup will be shown for 7 seconds
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

export function addEventListenerToBtns() {
  const btns = [
    ...document.querySelectorAll(".discBtn"),
    ...document.querySelectorAll(".buyBtn"),
  ];

  for (const btn of btns) {
    btn.addEventListener("click", () => {
      addToCardEvent(btn.id);
    });
  }
}

if (!isUserLogged()) {
  document.querySelector("#cartBtn").addEventListener("click", () => {
    document.querySelector("#cartLink").href = "../../html/login.html";
  });
}

document.querySelector("#close-popup-btn").addEventListener("click", () => {
  document.querySelector("#cart-popup").classList.remove("show");
});
