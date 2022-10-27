import * as userFunction from "../users.js";

document
  .querySelector("#register-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const result = userFunction.createUser({
      name: username,
      email,
      password,
    });

    if (!result.success) {
      document.querySelector("#form-msg").classList.add("error");
      document.querySelector("#form-msg").classList.remove("success");
      // Update the message text.
      document.querySelector("#form-msg").innerText = result.message;
      return;
    }

    document.querySelector("#form-msg").classList.add("success");
    document.querySelector("#form-msg").classList.remove("error");
    // Update the message text.
    document.querySelector("#form-msg").innerText = result.message;
  });