import { addEventListenerToBtns } from "../catalog/addToCart.js";
import { catalogData } from "../getData.js";


// get item name from the url
const urlParams = new URLSearchParams(window.location.search);
const itemName = urlParams.get("title");

const itemData = catalogData.find((item) => item.title === itemName);

// if item not found, redirect to 404 page
if (!itemData) window.location.href = "../html/404.html";

console.log(itemData); // Objeto com os dados do item/jogo
document.querySelector("h1").innerHTML = itemData.title
document.querySelector("img").src = itemData.image
document.querySelector(".gameDescription").innerHTML = itemData.description
document.querySelector(".gameDetails").innerHTML += `
    <p class="gamePrice">${itemData.rating}</p>
    <p class="gamePrice">${itemData.price - itemData.price * itemData.discount}</p>
    <p class="gamePrice">${itemData.releaseDate}</p>
    <button id="${itemData.title}" class= "buyBtn">Add to Cart</button>
`

let result = []
for (let i = 0; i < itemData.platforms.length; i++) {
    result.push(" " + itemData.platforms[i] + " ")  
}
document.querySelector(".gamePlatforms").innerHTML += result.join(" | ")

addEventListenerToBtns();