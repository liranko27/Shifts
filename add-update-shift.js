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

  greetP.innerHTML = currentLoggedIn
    ? `Welcome, ${currentLoggedIn.fname}`
    : "Welcome, guest";
}

greetUser();

function showLogin() {
  window.location.replace("login.html");
}

function handleShiftSubmit() {
  //   e.preventDefault();
  const date = document.getElementById("shift-date").value;
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const hourlyRate = parseFloat(document.getElementById("hourly-rate").value);
  const position = document.getElementById("position").value;
  const branch = document.getElementById("branch").value;
  let currentShiftId;
  const currentUser = JSON.parse(
    localStorage.getItem(localStorage.getItem("loggedIn"))
  );
  const shifts = currentUser.shifts;
  // Validation
  if (
    !date ||
    !startTime ||
    !endTime ||
    isNaN(hourlyRate) ||
    !position ||
    !branch
  ) {
    alert("shift-error-alert נא למלא את כל השדות");
    return;
  }

  if (hourlyRate < 0) {
    alert("shift-error-alert שכר שעתי לא תקין");
    return;
  }

  //   if (
  //     new Date(`2000-01-01T${endTime}:00) <= new Date(2000-01-01T${startTime}:00`)
  //   ) {
  //     alert("shift-error-alert שעת סיום חייבת להיות אחרי שעת התחלה");
  //     return;
  //   }

  if (currentShiftId) {
    // Update existing shift
    const shiftIndex = shifts.findIndex((s) => s.id === currentShiftId);
    if (shiftIndex !== -1) {
      shifts[shiftIndex] = {
        id: currentShiftId,
        date,
        startTime,
        endTime,
        hourlyRate,
        position,
        branch,
      };
      alert("success-alert המשמרת עודכנה בהצלחה!");
    }
  } else {
    // Add new shift
    const newShift = {
      id: shifts.length ? Math.max(...shifts.map((s) => s.id)) + 1 : 1,
      date,
      startTime,
      endTime,
      hourlyRate,
      position,
      branch,
    };
    currentUser.shifts.push(newShift);
    localStorage.setItem(
      localStorage.getItem("loggedIn"),
      JSON.stringify(currentUser)
    );
    alert("success-alert המשמרת נוספה בהצלחה!");
  }

  // Reset form and state
  //   currentShiftId = null;
  //   document.getElementById("shift-form").reset();
  //   document.getElementById("shift-form-title").textContent = "הוספת משמרת חדשה";
  //   loadShifts();
  //   showPage("home");
}
