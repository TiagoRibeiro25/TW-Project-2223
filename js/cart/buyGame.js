import { getUserLogged, isUserLogged } from "../users.js";

let user;

if (isUserLogged()) {
  user = getUserLogged();
}

export function cartNotification() {
  let mark = document.querySelector("#rubberBand");
  if (!isUserLogged() || user.cart.length == 0) {
    mark.style.display = "none";
  } else {
    mark.innerText = user.cart.length;
  }
}

cartNotification();
