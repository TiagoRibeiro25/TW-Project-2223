import { catalogData } from "../getData.js";

// get item name from the url
const urlParams = new URLSearchParams(window.location.search);
const itemName = urlParams.get("title");

const itemData = catalogData.find((item) => item.title === itemName);

// if item not found, redirect to 404 page
if (!itemData) window.location.href = "../html/404.html";

console.log(itemData); // Objeto com os dados do item/jogo
