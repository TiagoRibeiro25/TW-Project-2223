import * as userFunction from "../users.js";

document.querySelector("#log-in-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const result = userFunction.logIn(email, password);

  // Update the message text.
  document.querySelector("#form-msg").innerText = result.message;

  // Update the message color depending on the result.
  if (result.success) {
    document.querySelector("#form-msg").classList.add("success");
    document.querySelector("#form-msg").classList.remove("error");

    // Add "..." to the message text before redirecting.
    let i = 3;
    setInterval(() => {
      if (i === 0) window.location.href = "../../html/profile.html";

      document.querySelector("#form-msg").innerText += ".";
      i--;
    }, 500);
  } else {
    document.querySelector("#form-msg").classList.add("error");
    document.querySelector("#form-msg").classList.remove("success");
  }
});
