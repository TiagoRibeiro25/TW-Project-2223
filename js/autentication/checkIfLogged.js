import * as userFunction from "../users.js";

if (userFunction.isUserLogged()) {
  window.location.href = "../../html/profile.html";
}
