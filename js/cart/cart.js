import { catalogData } from "../getData.js";
import {getUserLogged, removeFromCart, removeAll } from "../users.js";


let user = getUserLogged();

function renderCard(game) {
    // document.querySelector("#userCart").innerHTML += game.onSale
    //   ? `
    //     <div class="all-games-card" style= "width: 10px">
    //       <img src="${game.image}" alt="${game.title}" loading="lazy"/>
    //       <h2>${game.title}</h2>
    //       <h4>Platforms: ${game.platforms}</h4>
    //       <p>
    //         <span class="old-price">${game.price}€</span>
    //         <span class="discount">
    //           <i class="fas fa-arrow-down"></i> ${game.discount * 100}%
    //         </span>
    //         <br />
    //         Price: ${game.price - game.price * game.discount}€
    //       </p>
    //       <button class="removeDiscBtn" id="${game.title}">Remove</button>
    //     </div>`
    //   : `
    //     <div class="all-games-card">
    //       <img src="${game.image}" alt="${game.title}" loading="lazy"/>
    //       <h2>${game.title}</h2>
    //       <h4>Platforms: ${game.platforms}</h4>
    //       <p>Price: ${game.price}€</p>
    //       <button class= "removeBtn" style="margin-top: 37px" id="${game.title}">Remove</button>
    //     </div>
    //     `;

    
     document.querySelector("#userCart").innerHTML += game.onSale
       ? `
       <tr class="all-cart-content">
         <th>${game.title}</th>
         <th><img src="${game.image}" alt="${game.title}" loading="lazy"/></th>
         <th>${game.price - game.price * game.discount}€</th>
         <th><button class= "removeDiscBtn" style="margin-top: 37px" id="${game.title}">Remove</button></th>
       </tr>
     `:
       `
       <tr class="all-cart-content">
         <th>${game.title}</th>
         <th><img src="${game.image}" alt="${game.title}" loading="lazy"/></th>
         <th>${game.price}€</th>
         <th><button class= "removeBtn" style="margin-top: 37px" id="${game.title}">Remove</button></th>
       </tr>
     `;
  }




  function getUserGames() {
    if (user.cart.length == 0) {
        document.querySelector("#userCart").innerHTML += `
        <h2>You don't have any game in your cart :(</h2>`
    }else{
        document.querySelector("#userCart").innerHTML = "";
        document.querySelector("#all-games-section").innerHTML += `
        <div class="scroll-down">
        <a href="#buyAll">
          <i class="fas fa-chevron-down fa-3x scroll-icon"></i>
        </a>
      </div>`
        for (let i = 0; i < user.cart.length; i++) {
            for (let j = 0; j < catalogData.length; j++) {
                if (catalogData[j].title == user.cart[i]) {
                    renderCard(catalogData[j])
                }
            }
        }
        document.querySelector(".cartDiv").innerHTML += `
        <button class="buyAll" id="buyAll">Buy</button>
        `
        
    }
  }
  getUserGames()
 
    document.querySelectorAll(".removeBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log(btn.id);
        removeFromCart(btn.id);
        window.location.reload()
      });
    });
  
    document.querySelectorAll(".removeDiscBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(btn.id);
        window.location.reload()
      });
    });
    
    document.querySelector(".buyAll").addEventListener("click", () => {
      const popup = document.querySelector("#cart-popup");
      popup.classList.add("show");

      // by default: the popup will be shown for 7 seconds
      setTimeout(() => {
        popup.classList.remove("show");
        removeAll();
        window.location.reload()
      }, 3000);
    })