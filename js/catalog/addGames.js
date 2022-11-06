import { catalogData } from "../getData.js";
import { getUserLogged } from "../users.js";

getAllGames();

// Add "all games" to the DOM
function getAllGames() {
  document.querySelector("#all-games-catalog").innerHTML = "";
  for (let i = 1; i < catalogData.length + 1; i++) {
    const game = catalogData.at(0 - i);

    if (game.onSale) {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
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
          <button class="buyDiscBtn">Buy</button>
        </div>
        `;
    } else {
      document.querySelector("#all-games-catalog").innerHTML += `
          <div class="all-games-card">
            <img src="${game.image}" alt="${game.title}" loading="lazy"/>
            <h2>${game.title}</h2>
            <h4>Platforms: ${game.platforms}</h4>
            <p>Price: ${game.price}€</p>
            <button class= "buyBtn" style="margin-top: 37px">Buy</button>
          </div>
          `;
    }
  }
}

document.querySelector("#AZ").addEventListener("click", function () {
  document.querySelector("#all-games-catalog").innerHTML = "";
  let newCatalogData = [];
  for (const game of catalogData) {
    newCatalogData.push(game);
  }
  newCatalogData.sort(function (a, b) {
    let titleA = a.title;
    let titleB = b.title;
    return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
  });

  for (let i = 1; i < newCatalogData.length + 1; i++) {
    const game = newCatalogData.at(0 - i);
    if (game.onSale) {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
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
          <button class="buyDiscBtn">Buy</button>
        </div>
        `;
    } else {
      document.querySelector("#all-games-catalog").innerHTML += `
          <div class="all-games-card">
            <img src="${game.image}" alt="${game.title}" loading="lazy"/>
            <h2>${game.title}</h2>
            <h4>Platforms: ${game.platforms}</h4>
            <p>Price: ${game.price}€</p>
            <button class="buyBtn" style="margin-top: 37px">Buy</button>
          </div>
          `;
    }
  }
});

document.querySelector("#ZA").addEventListener("click", function () {
  document.querySelector("#all-games-catalog").innerHTML = "";
  let newCatalogData = [];
  for (const game of catalogData) {
    newCatalogData.push(game);
  }
  newCatalogData.sort(function (a, b) {
    let titleA = a.title;
    let titleB = b.title;
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  });

  for (let i = 1; i < newCatalogData.length + 1; i++) {
    const game = newCatalogData.at(0 - i);
    if (game.onSale) {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
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
          <button class="buyDiscBtn">Buy</button>
        </div>
        `;
    } else {
      document.querySelector("#all-games-catalog").innerHTML += `
          <div class="all-games-card">
            <img src="${game.image}" alt="${game.title}" loading="lazy"/>
            <h2>${game.title}</h2>
            <h4>Platforms: ${game.platforms}</h4>
            <p>Price: ${game.price}€</p>
            <button class="buyBtn" style="margin-top: 37px">Buy</button>
          </div>
          `;
    }
  }
});

document.querySelector("#priceUp").addEventListener("click", function () {
  document.querySelector("#all-games-catalog").innerHTML = "";
  let newCatalogData = [];
  for (const game of catalogData) {
    newCatalogData.push(game);
  }
  newCatalogData.sort(function (a, b) {
    let priceA = a.price - a.price * a.discount;
    let priceB = b.price - b.price * b.discount;
    return priceA > priceB ? -1 : priceA < priceB ? 1 : 0;
  });

  for (let i = 1; i < newCatalogData.length + 1; i++) {
    const game = newCatalogData.at(0 - i);
    if (game.onSale) {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
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
          <button class="buyDiscBtn">Buy</button>
        </div>
        `;
    } else {
      document.querySelector("#all-games-catalog").innerHTML += `
          <div class="all-games-card">
            <img src="${game.image}" alt="${game.title}" loading="lazy"/>
            <h2>${game.title}</h2>
            <h4>Platforms: ${game.platforms}</h4>
            <p>Price: ${game.price}€</p>
            <button class="buyBtn" style="margin-top: 37px">Buy</button>
          </div>
          `;
    }
  }
});

document
  .querySelector("#priceDown")
  .addEventListener("click", function () {
    document.querySelector("#all-games-catalog").innerHTML = "";
    let newCatalogData = [];
    for (const game of catalogData) {
      newCatalogData.push(game);
    }
    newCatalogData.sort(function (a, b) {
      let priceA = a.price - a.price * a.discount;
      let priceB = b.price - b.price * b.discount;
      return priceA < priceB ? -1 : priceA > priceB ? 1 : 0;
    });

    for (let i = 1; i < newCatalogData.length + 1; i++) {
      const game = newCatalogData.at(0 - i);
      if (game.onSale) {
        document.querySelector("#all-games-catalog").innerHTML += `
          <div class="all-games-card">
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
            <button class="buyDiscBtn">Buy</button>
          </div>
          `;
      } else {
        document.querySelector("#all-games-catalog").innerHTML += `
          <div class="all-games-card">
            <img src="${game.image}" alt="${game.title}" loading="lazy"/>
            <h2>${game.title}</h2>
            <h4>Platforms: ${game.platforms}</h4>
            <p>Price: ${game.price}€</p>
            <button class="buyBtn" style="margin-top: 37px">Buy</button>
          </div>
          `;
      }
    }
  });

document.querySelector("#sales").addEventListener("click", function () {
  document.querySelector("#all-games-catalog").innerHTML = "";
  const onSale = catalogData.filter((game) => game.onSale);
  onSale.forEach((game) => {
    document.querySelector("#all-games-catalog").innerHTML += `
      <div class="all-games-card">
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
        <button class="buyDiscBtn" >Buy</button>
      </div>
      `;
  });
});

document.querySelector("#reset").addEventListener("click", function () {
  getAllGames();
  document.querySelector("#myInput").value = "";
});

document.querySelector("#PC").addEventListener("click", function () {
  document.querySelector("#all-games-catalog").innerHTML = "";
  const platforms = catalogData.filter((game) =>
    game.platforms.includes("PC")
  );
  platforms.forEach((game) => {
    if (game.onSale) {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
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
          <button class="buyDiscBtn">Buy</button>
        </div>
        `;
    } else {
      document.querySelector("#all-games-catalog").innerHTML += `
          <div class="all-games-card">
            <img src="${game.image}" alt="${game.title}" loading="lazy"/>
            <h2>${game.title}</h2>
            <h4>Platforms: ${game.platforms}</h4>
            <p>Price: ${game.price}€</p>
            <button class="buyBtn" style="margin-top: 37px">Buy</button>
          </div>
          `;
    }
  });
});

document.querySelector("#PS").addEventListener("click", function () {
  document.querySelector("#all-games-catalog").innerHTML = "";
  const platforms = catalogData.filter(
    (game) =>
      game.platforms.includes("Playstation 4") ||
      game.platforms.includes("Playstation 5")
  );
  platforms.forEach((game) => {
    if (game.onSale) {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
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
          <button class="buyDiscBtn">Buy</button>
        </div>
        `;
    } else {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
          <img src="${game.image}" alt="${game.title}" loading="lazy"/>
          <h2>${game.title}</h2>
          <h4>Platforms: ${game.platforms}</h4>
          <p>Price: ${game.price}€</p>
          <button class="buyBtn" style="margin-top: 37px">Buy</button>
        </div>
        `;
    }
  });
});

document.querySelector("#XBOX").addEventListener("click", function () {
  document.querySelector("#all-games-catalog").innerHTML = "";
  const platforms = catalogData.filter((game) =>
    game.platforms.includes("Xbox One")
  );
  platforms.forEach((game) => {
    if (game.onSale) {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
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
          <button class="buyDiscBtn">Buy</button>
        </div>
        `;
    } else {
      document.querySelector("#all-games-catalog").innerHTML += `
        <div class="all-games-card">
          <img src="${game.image}" alt="${game.title}" loading="lazy"/>
          <h2>${game.title}</h2>
          <h4>Platforms: ${game.platforms}</h4>
          <p>Price: ${game.price}€</p>
          <button class="buyBtn" style="margin-top: 37px">Buy</button>
        </div>
        `;
    }
  });
});

document.querySelector("#myInput").addEventListener("keyup", function () {
  if (document.getElementById("myInput").value.toUpperCase() != null) {
    document.querySelector("#all-games-catalog").innerHTML = "";
    let input = document.getElementById("myInput").value.toUpperCase();
    for (let i = 0; i < catalogData.length; i++) {
      if (catalogData[i].title.toUpperCase().includes(input)) {
        let game = catalogData[i];
        if (game.onSale) {
          document.querySelector("#all-games-catalog").innerHTML += `
            <div class="all-games-card">
              <img src="${game.image}" alt="${game.title}" loading="lazy"/>
                <h2>${game.title}</h2>
                <h4>Platforms: ${game.platforms}</h4>
                <p>
                  <span class="old-price">${game.price}€</span>
                  <span class="discount">
                    <i class="fas fa-arrow-down"></i> ${
                      game.discount * 100
                    }%
                  </span>
                  <br />
                  Price: ${game.price - game.price * game.discount}€
                </p>
                <button class="buyDiscBtn">Buy</button>
            </div>
            `;
        } else {
          document.querySelector("#all-games-catalog").innerHTML += `
            <div class="all-games-card">
              <img src="${game.image}" alt="${game.title}" loading="lazy"/>
              <h2>${game.title}</h2>
              <h4>Platforms: ${game.platforms}</h4>
              <p>Price: ${game.price}€</p>
              <button class="buyBtn" style="margin-top: 37px">Buy</button>
            </div>
            `;
        }
      }
    }
  }
});

let buyButtons = document.querySelectorAll(".buyBtn, .buyDiscBtn");

for (let button = 0; button < buyButtons.length; button++) {
  buyButtons[button].addEventListener("click", function myFunction() {
    const userCart = getUserLogged().cart;
    console.log(buyButtons[button]);
    console.log(userCart);
    //userCart.push()
  });
}
