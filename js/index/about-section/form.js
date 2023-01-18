/* Listening for the submit event on the form. When the submit event is triggered, it will prevent the
default action of the form, which is to submit the form. It will then grab the values of the name,
email, and message fields and store them in variables. It will then create an object called data and
store the name, email, and message variables in it. It will then log the data object to the console.
Finally, it will display the form message. */
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
  const data = {
    name,
    email,
    message,
  };
  console.table(data);

  document.querySelector("#form-message").style.display = "block";
});
