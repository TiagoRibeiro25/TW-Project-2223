import { catalogData } from "../getData.js";
import { addEventListenerToBtns } from "./addToCart.js";

const PLATFORMS = ["PC", "PS", "XBOX"];

function renderCard(item) {
  document.querySelector("#all-games-catalog").innerHTML += item.onSale
    ? `
      <div class="all-games-card">
        <img src="${item.image}" alt="${item.title}" />
        <a href="../../../html/item.html?title=${item.title}">${item.title}</a>
        <h4>${item.platforms}</h4>
        <p>
          <span class="old-price">${item.price}€</span>
          <span class="discount">
            <i class="fas fa-arrow-down"></i> ${item.discount * 100}%
          </span>
          <br />
          Price: ${item.price - item.price * item.discount}€
        </p>
        <button class="discBtn" id="${item.title}">Add to Cart</button>
      </div>`
    : `
      <div class="all-games-card">
        <img src="${item.image}" alt="${item.title}" />
        <a href="../../../html/item.html?title=${item.title}">${item.title}</a>
        <h4>${item.platforms}</h4>
        <p>Price: ${item.price}€</p>
        <button class= "buyBtn" style="margin-top: 37px" id="${item.title}">Add to Cart</button>
      </div>
      `;

  addEventListenerToBtns();
}

function getAllGames() {
  document.querySelector("#all-games-catalog").innerHTML = "";
  for (const game of catalogData) {
    renderCard(game);
  }
}

document.querySelector("#AZ").addEventListener("click", () => {
  document.querySelector("#all-games-catalog").innerHTML = "";
  let newCatalogData = [];
  for (const game of catalogData) {
    newCatalogData.push(game);
  }
  newCatalogData.sort((a, b) => {
    let titleA = a.title;
    let titleB = b.title;
    return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
  });

  for (let i = 1; i < newCatalogData.length + 1; i++) {
    const game = newCatalogData.at(0 - i);
    renderCard(game);
  }
});

document.querySelector("#ZA").addEventListener("click", () => {
  document.querySelector("#all-games-catalog").innerHTML = "";
  let newCatalogData = [];
  for (const game of catalogData) {
    newCatalogData.push(game);
  }
  newCatalogData.sort((a, b) => {
    let titleA = a.title;
    let titleB = b.title;
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  });

  for (let i = 1; i < newCatalogData.length + 1; i++) {
    const game = newCatalogData.at(0 - i);
    renderCard(game);
  }
});

document.querySelector("#priceUp").addEventListener("click", () => {
  document.querySelector("#all-games-catalog").innerHTML = "";
  let newCatalogData = [];
  for (const game of catalogData) {
    newCatalogData.push(game);
  }
  newCatalogData.sort((a, b) => {
    let priceA = a.price - a.price * a.discount;
    let priceB = b.price - b.price * b.discount;
    return priceA > priceB ? -1 : priceA < priceB ? 1 : 0;
  });

  for (let i = 1; i < newCatalogData.length + 1; i++) {
    const game = newCatalogData.at(0 - i);
    renderCard(game);
  }
});

document.querySelector("#priceDown").addEventListener("click", () => {
  document.querySelector("#all-games-catalog").innerHTML = "";
  let newCatalogData = [];
  for (const game of catalogData) {
    newCatalogData.push(game);
  }
  newCatalogData.sort((a, b) => {
    let priceA = a.price - a.price * a.discount;
    let priceB = b.price - b.price * b.discount;
    return priceA < priceB ? -1 : priceA > priceB ? 1 : 0;
  });

  for (let i = 1; i < newCatalogData.length + 1; i++) {
    const game = newCatalogData.at(0 - i);
    renderCard(game);
  }
});

document.querySelector("#sales").addEventListener("click", () => {
  document.querySelector("#all-games-catalog").innerHTML = "";
  const onSale = catalogData.filter((game) => game.onSale);
  onSale.forEach((game) => {
    renderCard(game);
  });
});

document.querySelector("#reset").addEventListener("click", () => {
  getAllGames();
  document.querySelector("#myInput").value = "";
});

// Filter by Platform
for (const platform of PLATFORMS) {
  document.getElementById(platform).addEventListener("click", () => {
    document.querySelector("#all-games-catalog").innerHTML = "";

    let platformType = [];
    if (platform === "PS") platformType = ["Playstation 4", "Playstation 5"];
    else if (platform === "XBOX") platformType = ["Xbox One"];
    else if (platform === "PC") platformType = ["PC"];

    const games = catalogData.filter((game) => {
      return game.platforms.some((platform) => platformType.includes(platform));
    });

    games.forEach((game) => {
      renderCard(game);
    });
  });
}

document.querySelector("#myInput").addEventListener("keyup", () => {
  if (document.getElementById("myInput").value.toUpperCase() !== null) {
    document.querySelector("#all-games-catalog").innerHTML = "";
    let input = document.getElementById("myInput").value.toUpperCase();
    for (const game of catalogData) {
      if (game.title.toUpperCase().includes(input)) {
        renderCard(game);
      }
    }
  }

  // if there's no results, show custom message
  if (document.querySelector("#all-games-catalog").innerHTML === "") {
    document.querySelector("#all-games-catalog").innerHTML = `
    <h1 class="title-not-found">
    No results found
    </h1>
    `;
  }
});

// Filter games if there's a query string (PC)
const urlParams = new URLSearchParams(window.location.search);
const filterPlatform = urlParams.get("platform");

if (filterPlatform) {
  if (!PLATFORMS.includes(filterPlatform)) window.location.href = "../../html/404.html";
  document.querySelector(`#${filterPlatform}`).click();
} else getAllGames();
