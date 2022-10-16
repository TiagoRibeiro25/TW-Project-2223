const sourceBtn = document.querySelector("#source-code-link");
const info = document.querySelector("#source-code-info");

sourceBtn.addEventListener("mouseover", () => {
  sourceBtn.classList.add("hover");
  info.classList.add("visible");
  info.classList.remove("invisible");
});

sourceBtn.addEventListener("mouseout", () => {
  sourceBtn.classList.remove("hover");
  info.classList.add("invisible");
  info.classList.remove("visible");
});
