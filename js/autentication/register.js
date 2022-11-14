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

    // Update the message text.
    document.querySelector("#form-msg").innerText = result.message;

    if (result.success) {
      document.querySelector("#form-msg").classList.add("success");
      document.querySelector("#form-msg").classList.remove("error");
    } else {
      document.querySelector("#form-msg").classList.add("error");
      document.querySelector("#form-msg").classList.remove("success");
    }

    userFunction.logIn(email, password);
    // wait 3seconds and login the user
    setTimeout(() => {
      if (result.success) {
        window.location.href = "../../html/profile.html";
      }
    }, 2000);
  });
