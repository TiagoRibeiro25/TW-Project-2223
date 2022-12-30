const PRE_KEY = "game-store-";

/**
 * It returns the users from localStorage if it exists, otherwise it returns an array with one user.
 * @returns An array of objects.
 */
export function getUsers() {
  const key = PRE_KEY + "users";
  return localStorage[key]
    ? JSON.parse(localStorage[key])
    : [
        {
          id: 1,
          name: "John",
          email: "john@email.com",
          password: "123",
          cart: ["Ghost of Tsushima", "Cyberpunk 2077"],
        },
      ];
}

/**
 * It returns the id of the last user in the users collection, plus one.
 * @returns The last user's id + 1
 */
function getNextId() {
  return getUsers().at(-1).id + 1;
}

/**
 * If there is already an user with the same email, return false.
 * @param newUser - The new user object that we want to add to the users array.
 * @returns The function isUserValid is returning a boolean value.
 */
function isUserValid(newUser) {
  return !getUsers().some((user) => user.email === newUser.email);
}

/**
 * It creates a new user if the user is valid, otherwise it returns an error message.
 * @param newUser - {
 * @returns An object with two properties: success and message.
 */
export function createUser(newUser) {
  if (isUserValid(newUser)) {
    const users = getUsers();
    newUser.id = getNextId();
    newUser.cart = [];
    users.push(newUser);

    const key = PRE_KEY + "users";

    localStorage[key] = JSON.stringify(users);
    return {
      success: true,
      message: `User ${newUser.name} created successfully.`,
    };
  }
  return {
    success: false,
    message: "There's already an account with that same email.",
  };
}

/**
 * It takes an email and password, checks if they match a user in the users array, and if they do, it
 * stores the user in sessionStorage and returns a success message. If they don't match a user, it
 * returns a failure message
 * @param email - The email address of the user.
 * @param password - "12345"
 * @returns An object with two properties: success and message.
 */
export function logIn(email, password) {
  const user = getUsers().find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    const key = PRE_KEY + "user";

    sessionStorage[key] = JSON.stringify(user);
    return {
      success: true,
      message: `Welcome back, ${user.name}`,
    };
  }
  return {
    success: false,
    message: "Wrong email or password.",
  };
}

/**
 * It removes the user from the session storage.
 */
export function logOut() {
  const key = PRE_KEY + "user";

  sessionStorage.removeItem(key);
}

/**
 * If the user is logged in, return true, otherwise return false.
 * @returns A function that returns a boolean value.
 */
export function isUserLogged() {
  const key = PRE_KEY + "user";
  return sessionStorage[key];
}

/**
 * It returns the user object from the sessionStorage.
 * @returns The user object.
 */
export function getUserLogged() {
  const key = PRE_KEY + "user";
  return JSON.parse(sessionStorage[key]);
}

/**
 * If the new email is the same as the old one, update the data.
 * If the new email is different from the old one, check if it's already in use.
 * If it's not, update the data.
 * @param newUser - {
 * @returns a boolean value.
 */
export function updateUser(newUser) {
  // If the new email is the same as the old one:
  if (getUserLogged().email === newUser.email) {
    updateData(newUser);
    return true;
  }
  // If the new email is different from the old one:

  // If the new email is already in use:
  if (!isUserValid(newUser)) return false;

  // If the new email is not in use:
  updateData(newUser);
  return true;
}

/**
 * It updates the current user in session storage and the user in local storage.
 * @param newUser - The new user object that will be used to update
 * the session storage and local storage.
 */
function updateData(newUser) {
  let key = PRE_KEY + "user";

  // Update Session Storage (current user logged in)
  sessionStorage[key] = JSON.stringify(newUser);

  const users = getUsers();

  // Update Local Storage
  const userIndex = users.findIndex((user) => user.id === newUser.id);
  users[userIndex] = newUser;

  key = PRE_KEY + "users";
  localStorage[key] = JSON.stringify(users);
}

/**
 * It adds an item to the cart of the logged in user.
 * @param item - The item to be added to the cart.
 * @returns the user object.
 */
export function addToCart(item) {
  const user = getUserLogged();

  if (user.cart.includes(item)) return;

  user.cart.push(item);
  updateData(user);
}

/**
 * It removes an item from the cart of the user logged in.
 * @param item - the item to be removed from the cart
 */
export function removeFromCart(item) {
  const user = getUserLogged();
  for (let i = 0; i < user.cart.length; i++) {
    if (user.cart[i] == item) {
      user.cart.splice(i, 1);
      updateData(user);
    }
  }
}

/**
 * It gets the user logged, then it sets the cart to an empty array, and then it updates the data
 */
export function removeAll() {
  const user = getUserLogged();
  user.cart = [];
  updateData(user);
}
