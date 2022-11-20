import { catalogData } from "../getData.js";
import {getUserLogged, removeFromCart } from "../users.js";


let user = getUserLogged();

function renderCard(game) {
    document.querySelector("#userCart").innerHTML += game.onSale
      ? `
        <div class="all-games-card" style= "width: 10px">
          <img src="${game.image}" alt="${game.title}" loading="lazy"/>
          <h2>${game.title}</h2>
          <h4>Platforms: ${game.platforms}</h4>
          <p>
            <span class="old-price">${game.price}€</span>
            <span class="discount">
              <i class="fas fa-arrow-down"></i> ${game.discount * 100}%
            </span>
            <br />
            Price: ${game.price - game.price * game.discount}€
          </p>
          <button class="removeDiscBtn" id="${game.title}">Remove</button>
        </div>`
      : `
        <div class="all-games-card">
          <img src="${game.image}" alt="${game.title}" loading="lazy"/>
          <h2>${game.title}</h2>
          <h4>Platforms: ${game.platforms}</h4>
          <p>Price: ${game.price}€</p>
          <button class= "removeBtn" style="margin-top: 37px" id="${game.title}">Remove</button>
        </div>
        `;
  }


  function getUserGames() {
    if (user.cart.length == 0) {
        document.querySelector("#userCart").innerHTML += `
        <h2>You don't have any game in your cart :(</h2>`
    }else{
        document.querySelector("#userCart").innerHTML = "";
        for (let i = 0; i < user.cart.length; i++) {
            for (let j = 0; j < catalogData.length; j++) {
                if (catalogData[j].title == user.cart[i]) {
                    renderCard(catalogData[j])
                }
            }
        }
        
    }
  }
  getUserGames()

 
    document.querySelectorAll(".removeBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(btn.id);
        window.location.reload()
      });
    });
  
    document?.querySelectorAll(".removeDiscBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(btn.id);
        window.location.reload()
      });
    });
  