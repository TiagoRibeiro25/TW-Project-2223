import { catalogData } from "../../getData.js";

// Add "Most Bought" games to the DOM
for (let i = 1; i < 5; i++) {
  const item = catalogData.at(0 - i); // Get the last 4 games from the catalog

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
