import { catalogData } from "../../getData.js";

// Get most bought games (random)
const mostBought = [];
let i = 0;
while (i < 4) {
  // get a random item from the catalogData
  const random = Math.floor(Math.random() * catalogData.length);
  const item = catalogData[random];

  // check if the item is on sale (since there's a section for that)
  if (item.onSale) continue;
  // check if the item is already in the array
  if (mostBought.includes(item)) continue;

  // add the item to the array
  mostBought.push(item);
  i++;
}

// Add "Most Bought" games to the DOM
for (const item of mostBought) {
  document.querySelector("#most-bought-catalog").innerHTML += `
    <div class="most-bought-card">
      <img src="${item.image}" alt="${item.title}" loading="lazy"/>
      <h2>${item.title}</h2>
      <h4>Platforms: ${item.platforms}</h4>
      <p>Price: ${item.price}€</p>
      <button>Buy</button>
    </div>
  `;
}

// Add "On Sale" games to the DOM
const onSale = catalogData.filter((item) => item.onSale);
onSale.forEach((item) => {
  document.querySelector("#on-sale-catalog").innerHTML += `
    <div class="on-sale-card">
      <img src="${item.image}" alt="${item.title}" loading="lazy"/>
      <h2>${item.title}</h2>
      <h4>Platform: ${item.platforms.at(2)}</h4>
      <p>
        <span class="old-price">${item.price}€</span>
        <span class="discount">
          <i class="fas fa-arrow-down"></i> ${item.discount * 100}%
        </span>
        <br />
        Price: ${item.price - item.price * item.discount}€
      </p>
      <button>Buy</button>
    </div>
  `;
});
