import { catalogData } from "../getData.js";
import { getUserLogged, removeFromCart } from "../users.js";

let user = getUserLogged();

function renderCard(game) {
  document.querySelector("#userCart").innerHTML += game.onSale
    ? `
      <tr class="all-cart-content">
        <td><a href="../../html/item.html?title=${game.title}">${
        game.title
      }</a></td>
        <td>${game.price - game.price * game.discount}€</td>
        <td><button class= "removeBtn" style="margin-top: 37px" id="${
          game.title
        }">Remove</button></td>
      </tr>
      `
    : `
      <tr class="all-cart-content">
        <td><a href="../../html/item.html?title=${game.title}">${game.title}</a></td>
        <td>${game.price}€</td>
        <td><button class= "removeBtn" style="margin-top: 37px" id="${game.title}">Remove</button></td>
      </tr>
      `;
}

function updateTotalPrice() {
  let totalPrice = 0;
  for (const cartElement of user.cart) {
    for (const catalogElement of catalogData) {
      if (catalogElement.title === cartElement) {
        totalPrice += catalogElement.onSale
          ? catalogElement.price -
            catalogElement.price * catalogElement.discount
          : catalogElement.price;
      }
    }
  }

  document.querySelector("#totalPrice").innerText = `${totalPrice}€`;
}

function updateCheckoutBtn() {
  if (user.cart.length == 0) {
    document.querySelector("#checkout-btn").style.display = "none";
  } else {
    document.querySelector("#checkout-btn").style.display = "block";
  }
}

function renderIfEmpty() {
  document.querySelector(".userCart").innerHTML = `
    <h2>You don't have any game in your cart</h2>
  `;
}

if (user.cart.length == 0) renderIfEmpty();
else {
  for (const cartElement of user.cart) {
    for (const catalogElement of catalogData) {
      if (catalogElement.title == cartElement) {
        renderCard(catalogElement);
      }
    }
  }

  document.querySelector("#userCart").innerHTML += `
    <tr class="all-cart-content">
      <td>Total Price</td>
      <td colspan = "2" id="totalPrice"></td>
    </tr>
  `;
  updateTotalPrice();
}

updateCheckoutBtn();

document.querySelectorAll(".removeBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    removeFromCart(btn.id);
    btn.parentElement.parentElement.remove();
    user = getUserLogged();
    if (user.cart.length === 0) renderIfEmpty();
    updateCheckoutBtn();
    document.querySelector("#rubberBand").innerText--;
    if (user.cart.length !== 0) updateTotalPrice();
  });
});

document.querySelector("#checkout-btn").addEventListener("click", () => {
  document.querySelector("#checkout-modal").classList.remove("modal-hide");
});
