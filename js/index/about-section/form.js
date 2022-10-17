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
  console.log(data);

  document.querySelector("#form-message").style.display = "block";
});
