import { catalogData } from "../getData.js";

// get item name from the url
const urlParams = new URLSearchParams(window.location.search);
const itemName = urlParams.get("title");

const itemData = catalogData.find((item) => item.title === itemName);

console.log(itemData); // Objeto com os dados do item/jogo
