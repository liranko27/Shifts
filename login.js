const registerBtn = document.querySelector("#register-btn");
const loginBtn = document.querySelector(".logbtn");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

registerBtn.addEventListener("click", () => {
  window.location.replace("signup.html");
});

function login(e) {
  // e.preventDefault();
  console.log(usernameInput, passwordInput);
  const currentUser = JSON.parse(localStorage.getItem(usernameInput.value));
  if (currentUser) {
    if (currentUser.password === passwordInput.value) {
      alert("Logged In moving to homepage");
      localStorage.setItem("loggedIn", currentUser.username);
      window.location.replace("home.html");
    } else {
      alert("Password is wrong!");
    }
  } else {
    alert("this user dose not exist");
  }
}
