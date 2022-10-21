export function getUsers() {
  return (
    JSON.parse(localStorage.users) || [
      {
        id: 1,
        name: "John",
        email: "john@email.com",
        password: "123",
        cart: ["Ghost of Tsushima", "Cyberpunk 2077"],
      },
    ]
  );
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
