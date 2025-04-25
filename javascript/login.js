const loginButton = document.getElementById("login-button");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");

loginButton.addEventListener ("click", function (event)) {
const email = loginEmail.value;
const password = loginPassword.value;

if (email && pasword){
    let users = JSON.parse(localStorage.getItem("users")) || [];
}
}
