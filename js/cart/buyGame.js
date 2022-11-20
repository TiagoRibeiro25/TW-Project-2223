import {isUserLogged, getUserLogged } from "../users.js"; 


let user;


function myFunction() {
  if (isUserLogged()) {
    user = getUserLogged()
    const userCart = user.cart
    console.log(userCart);
  }
}

myFunction()

function cartNotification() {
  let mark = document.querySelector(".rubberBand")
  if (!isUserLogged()) {
    mark.style.display = "none" 
  }
  else {
    if (user.cart.length < 1) {
      mark.style.display = "none"
    }
  }
  if (isUserLogged() && user.cart.length > 0) {
    mark.innerHTML = user.cart.length
  }
}

cartNotification()
