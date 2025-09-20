const logoutBtn = document.querySelector("#logout");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const registerBtn = document.querySelector("#register-btn");

function checkIfLoggedIn() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.replace("login.html");
  }
}
// checkIfLoggedIn();

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("loggedIn");
  window.location.replace("login.html");
});

function greetUser() {
  const greetP = document.querySelector("#greet");
  const logoutBtn = document.querySelector("#logout");
  const loginBtn = document.querySelector("#login-btn");
  const shiftTable = document.querySelector("#shifts-content");
  const guestMode = document.querySelector("#guest-notice");
  const currentLoggedIn = JSON.parse(
    localStorage.getItem(localStorage.getItem("loggedIn"))
  );

  logoutBtn.style = currentLoggedIn ? "display:block" : "display:none";
  loginBtn.style = currentLoggedIn ? "display:none" : "display:block";
  shiftTable.style = currentLoggedIn ? "display:block" : "display:none";
  guestMode.style = currentLoggedIn ? "display:none" : "display:block";

  greetP.innerHTML = currentLoggedIn
    ? `Welcome, ${currentLoggedIn.fname}`
    : "Welcome, guest";
}

greetUser();

function showLogin() {
  window.location.replace("login.html");
}

function closeLogin() {
  document.getElementById("login-modal").style.display = "none";
  document.getElementById("login-form").reset();
}

function showRegister() {
  closeLogin();
  document.getElementById("register-modal").style.display = "block";
}

function closeRegister() {
  document.getElementById("register-modal").style.display = "none";
  document.getElementById("register-form").reset();
}

function login(e) {
  e.preventDefault();
  const currentUser = JSON.parse(localStorage.getItem(usernameInput.value));
  console.log(currentUser);
  if (currentUser) {
    if (currentUser.password === passwordInput.value) {
      alert("Logged In moving to homepage");
      localStorage.setItem("loggedIn", currentUser.username);
      // window.location.replace("home.html");
    } else {
      alert("Password is wrong!");
    }
  } else {
    alert("this user dose not exist");
  }
}

function getUserShifts() {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? JSON.parse(localStorage.getItem(loggedIn)).shifts : [];
}
function calculateTotalSalary() {
  const total = getUserShifts().reduce(
    (sum, shift) => sum + calculateShiftSalary(shift),
    0
  );
  document.getElementById(
    "total-salary"
  ).textContent = ` שכר כולל: ₪${total.toFixed(2)}`;
}
function calculateShiftSalary(shift) {
  const start = new Date(`2000-01-01T${shift.startTime}:00`);
  const end = new Date(`2000-01-01T${shift.endTime}:00`);

  // Handle shifts that end the next day
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }

  const hours = (end - start) / (1000 * 60 * 60);
  return hours * shift.hourlyRate;
}

function renderShifts(shiftsToRender) {
  const tbody = document.getElementById("shifts-tbody");
  tbody.innerHTML = "";

  shiftsToRender.forEach((shift) => {
    const totalSalary = calculateShiftSalary(shift);
    const row = document.createElement("tr");
    row.innerHTML = `
                  <td>${shift.date}</td>
                  <td>${shift.startTime}</td>
                  <td>${shift.endTime}</td>
                  <td>₪${shift.hourlyRate}</td>
                  <td>${shift.position}</td>
                  <td>${shift.branch}</td>
                  <td>₪${totalSalary.toFixed(2)}</td>
                  <td class="actions">
                      <button class="btn btn-warning" onclick="editShift(${
                        shift.id
                      })">עדכן</button>
                      <button class="btn btn-danger" onclick="showDeleteModal(${
                        shift.id
                      })">מחק</button>
                  </td>
              `;
    tbody.appendChild(row);
  });
}

renderShifts(getUserShifts());
calculateTotalSalary();
