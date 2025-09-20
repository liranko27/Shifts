const emailInput = document.querySelector("#email");
const usernameInput = document.querySelector("#uname");
const passwordInput = document.querySelector("#psw");
const vpasswordInput = document.querySelector("#psw-repeat");
const fnameInput = document.querySelector("#fname");
const lnameInput = document.querySelector("#lname");
const ageInput = document.querySelector("#age");
const registerBtn = document.querySelector(".registerbtn");

function formValidation() {
  const numReg = /\d/;
  const alphaReg = /[A-Za-z]/;
  if (!(usernameInput.value.length >= 6)) {
    alert("Username must be at least 6 characters long");
    return false;
  }
  if (!emailInput.value.includes("@")) {
    alert("Email is not valid");
    return false;
  }
  if (!(passwordInput.value.length >= 8 && passwordInput.value)) {
    alert("Password must be at least 8 characters long");
    return false;
  }
  if (!numReg.test(passwordInput.value)) {
    alert("Password must be at least 1 Number");
    return false;
  }
  if (!alphaReg.test(passwordInput.value)) {
    alert("Password must be at least 1 letter");
    return false;
  }
  if (!(fnameInput.value.length >= 2)) {
    alert("first name must be at least 2 characters long");
    return false;
  }
  if (!(lnameInput.value.length >= 2)) {
    alert("last name must be at least 2 characters long");
    return false;
  }
  if (!(parseInt(ageInput.value) >= 18 && parseInt(ageInput.value) <= 65)) {
    alert("The ages allowed are 18 up to 65");
    return false;
  }
  if (!(passwordInput.value === vpasswordInput.value)) {
    alert("Wrong password dose not match");
    return false;
  }
  return true;
}

function createUser(e) {
  e.preventDefault();
  if (!localStorage.getItem(emailInput.value)) {
    const newUser = {
      email: emailInput.value,
      username: usernameInput.value,
      password: passwordInput.value,
      fname: fnameInput.value,
      lname: lnameInput.value,
      age: ageInput.value,
      shifts: [],
    };

    if (formValidation()) {
      localStorage.setItem(newUser.username, JSON.stringify(newUser));
      alert("User created!");
      window.location.replace("login.html");
    }
  } else {
    alert("This user exist. please login or register with other email");
    window.location.replace("login.html");
  }
}

registerBtn.addEventListener("click", createUser);
