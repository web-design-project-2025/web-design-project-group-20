const loginButton = document.getElementById("login-button");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");

loginButton.addEventListener("click", function (event) {
  const email = loginEmail.value;
  const password = loginPassword.value;

  if (email && password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    /* the lines 15-16 and 19-20 are taken from chatgpt,
here is the link : https://chatgpt.com/share/680ba771-1378-800a-89eb-d31095089275 */

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login Successul!");
      loginEmail.value = "";
      loginPassword.value = "";
    } else {
      alert("Invalid email or password, please retry.");
    }
  } else {
    alert("Please enter both mail and password to log in.");
  }
});
