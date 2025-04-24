const signUpButton = document.getElementById("sign-up-button");
const emailText = document.getElementById("email");
const nameText = document.getElementById("name1");
const userNameText = document.getElementById("username");
const passWordText = document.getElementById("password");
const reEnterPassWordText = document.getElementById("re-enter-password");

signUpButton.addEventListener("click", function (event) {
  if (
    emailText.value &&
    nameText.value &&
    userNameText.value &&
    passWordText.value &&
    reEnterPassWordText.value
  ) {
    /* I've used 12 lines from chatgpt 
    (not counting the lonely parenthases,lonely curly bracket 
    and the alerts and elses  
    (since I already know how to use them)). 
    The lines used were : 26-30, 32, 34-36, 39, 44-45.
    here is the link: 
    https://chatgpt.com/share/680a0801-a674-800a-85c9-4dee41d57d00 */

    if (passWordText.value === reEnterPassWordText.value) {
      const newUser = {
        email: emailText.value,
        name: nameText.value,
        username: userNameText.value,
        password: passWordText.value,
      };
      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some(
        (user) =>
          user.username === newUser.username || user.email === newUser.email
      );

      if (userExists) {
        alert(
          "A user with this username or mail already exists, please write something else"
        );
      } else {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Sign in successful! Please log in");
      }
    } else {
      alert("Passwords are not matching, please retry");
    }
  } else {
    alert("Please fill in all the boxes to sign in");
  }
});
