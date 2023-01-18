import { getUserLogged, isUserLogged } from "../users.js";

let user;

if (isUserLogged()) {
  user = getUserLogged();
}

/**
 * If the user is logged in, display the number of items in the cart. Otherwise, hide the cart
 * notification.
 */
export function cartNotification() {
  let mark = document.querySelector("#rubberBand");
  if (!isUserLogged()) {
    mark.style.display = "none";
  } else {
    mark.innerText = user.cart.length;
  }
}

cartNotification();
