/**
 * It returns the users from localStorage if it exists, otherwise it returns an array with one user.
 * @returns An array of objects.
 */
export function getUsers() {
  return localStorage.users
    ? JSON.parse(localStorage.users)
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

const users = getUsers();

/**
 * It returns the id of the last user in the users collection, plus one.
 * @returns The last user's id + 1
 */
function getNextId() {
  return users.at(-1).id + 1;
}

/**
 * If there is already an user with the same email, return false.
 * @param newUser - The new user object that we want to add to the users array.
 * @returns The function isUserValid is returning a boolean value.
 */
function isUserValid(newUser) {
  if (users.some((user) => user.email === newUser.email)) return false;
}

/**
 * It creates a new user if the user is valid, otherwise it returns an error message.
 * @param newUser - {
 * @returns An object with two properties: success and message.
 */
export function createUser(newUser) {
  if (isUserValid(newUser)) {
    newUser.id = getNextId();
    users.push(newUser);
    localStorage.users = JSON.stringify(users);
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
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    sessionStorage.user = JSON.stringify(user);
    return {
      success: true,
      message: `Welcome back, ${user.name}!`,
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
  sessionStorage.removeItem("user");
}

/**
 * If the user is logged in, return true, otherwise return false.
 * @returns A function that returns a boolean value.
 */
export function isUserLogged() {
  return sessionStorage.user;
}
