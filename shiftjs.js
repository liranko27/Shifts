//login
var uname = document.getElementById("username").value;
var psw = document.getElementById("userpass").value;
var sUser = localStorage.getItem("username", uname);
var sPass =  localStorage.getItem("userpass", psw);
 localStorage.getItem("userpass", psw);
function logcheck(){
   
 if (username == sUser && sPass == userpass) {
    alert("Welcome " + username);
    console.log(sUser, rEmail, sPass);
    window.location.href = "home.html";
   
} else {
    alert("Wrong User Name or Password");  
}

}
function goregist(){
    window.location.href = "signup.html";
}  
//register
    var rUname = document.getElementById("uname").value;
    var rEmail = document.getElementById("email").value;
    var rPsw = parseInt(document.getElementById("psw").value);
    var rPswRepeat = parseInt(document.getElementById("psw-repeat").value);
function regcheck(){

    if (rUname === "" || rEmail === "" || rPsw === "" || rPswRepeat === "") {
        alert("Please fill in all fields");
    } else if (rPsw !== rPswRepeat) {
        alert("Passwords do not match");
    } else {
        window.localStorage.setItem("uname", rUname);
        window.localStorage.setItem("email", rEmail);
        window.localStorage.setItem("upass", rPsw);
        console.log(rUname, rEmail, rPsw);
        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
       
    }
}  

 