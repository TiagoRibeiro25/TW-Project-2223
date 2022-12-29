import { catalogData } from "../getData.js";
import { addEventListenerToBtns } from "./addToCart.js";

function renderCard(item) {
  document.querySelector("#all-games-catalog").innerHTML += item.onSale
    ? `
      <div class="all-games-card">
        <img src="${item.image}" alt="${item.title}" loading="lazy"/>
        <a href="../../../html/item.html?title=${item.title}">${item.title}</a>
        <h4>Platforms: ${item.platforms}</h4>
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
        <img src="${item.image}" alt="${item.title}" loading="lazy"/>
        <a href="../../../html/item.html?title=${item.title}">${item.title}</a>
        <h4>Platforms: ${item.platforms}</h4>
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

getAllGames();

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

document.querySelector("#PC").addEventListener("click", () => {
  document.querySelector("#all-games-catalog").innerHTML = "";
  const platforms = catalogData.filter((game) => game.platforms.includes("PC"));
  platforms.forEach((game) => {
    renderCard(game);
  });
});

document.querySelector("#PS").addEventListener("click", () => {
  document.querySelector("#all-games-catalog").innerHTML = "";
  const platforms = catalogData.filter(
    (game) =>
      game.platforms.includes("Playstation 4") ||
      game.platforms.includes("Playstation 5")
  );
  platforms.forEach((game) => {
    renderCard(game);
  });
});

document.querySelector("#XBOX").addEventListener("click", () => {
  document.querySelector("#all-games-catalog").innerHTML = "";
  const platforms = catalogData.filter((game) =>
    game.platforms.includes("Xbox One")
  );
  platforms.forEach((game) => {
    renderCard(game);
  });
});

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
