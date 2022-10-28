import * as userFunction from "../users.js";

// Get the user from session storage
const user = userFunction.getUserLogged();

// Update the DOM
document.querySelector("#profile-id").textContent = user.id;
document.querySelector("#profile-name").textContent = user.name;
document.querySelector("#profile-email").textContent = user.email;

// Add an event listener to the log out button
document.querySelector("#log-out-btn").addEventListener("click", () => {
  userFunction.logOut();
  window.location.href = "../../index.html";
});

// Add an event listener to the edit profile button
document
  .querySelector("#edit-profile-btn")
  .addEventListener("click", () => {
    document
      .querySelector("#edit-profile-modal")
      .classList.remove("hidden");

    // Append the user data to the modal form inputs
    document.querySelector("#name").value = user.name;
    document.querySelector("#email").value = user.email;
    document.querySelector("#password").value = user.password;
  });

// Add an event listener to the cancel button
document
  .querySelector("#close-modal-btn")
  .addEventListener("click", () => {
    document.querySelector("#edit-profile-modal").classList.add("hidden");
  });

// Add an event listener to the save button in the modal
document
  .querySelector("#edit-profile-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Form submitted");

    // Reset error/success colors
    document.querySelector("#password").classList.remove("error");
    document.querySelector("#confirm-password").classList.remove("error");
    document.querySelector("#email").classList.remove("error");
    document.querySelector("#name").classList.remove("success");
    document.querySelector("#email").classList.remove("success");
    document.querySelector("#password").classList.remove("success");
    document
      .querySelector("#confirm-password")
      .classList.remove("success");

    // Get the form data
    const newName = document.querySelector("#name").value;
    const newEmail = document.querySelector("#email").value;
    const newPw = document.querySelector("#password").value;
    const newPwConfirm = document.querySelector("#confirm-password").value;

    // Check if the passwords match
    if (newPw !== newPwConfirm) {
      console.log("Passwords don't match");
      document.querySelector("#password").classList.add("error");
      document.querySelector("#confirm-password").classList.add("error");
      return;
    }

    user.name = newName;
    user.email = newEmail;
    user.password = newPw;

    // Update the user in the users array
    if (!userFunction.updateUser(user)) {
      console.log("Email already exists");
      document.querySelector("#email").classList.add("error");
      return;
    }

    console.log("User updated");

    // Show success in the form fields
    document.querySelector("#name").classList.add("success");
    document.querySelector("#email").classList.add("success");
    document.querySelector("#password").classList.add("success");
    document.querySelector("#confirm-password").classList.add("success");

    // Update the DOM
    document.querySelector("#profile-name").textContent = user.name;
    document.querySelector("#profile-email").textContent = user.email;
  });
