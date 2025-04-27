document.addEventListener("DOMContentLoaded", () => {
  const detailElement = document.getElementById("account-details");
  const settingsEliment = document.getElementById("settings");
  const contentElement = document.getElementById("account-content");

  //this inserts html when pressing a button
  detailElement.addEventListener("click", function (event) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      contentElement.innerHTML = `
            <section>
              <h2>Your Account Details</h2>
              <div id="bowl2"> 
                <div id="settings-list3"> 
                <h5>Your Username:</h5>
                <p>${loggedInUser.username}</p>
                </div> 
                <div id="settings-list3"> 
                <h5>Your Email:</h5>
                <p>${loggedInUser.email}</p>
                </div> 
                <div id="settings-list5"> 
                <h5>Your Password:</h5>
                <p id="password-text">${"*".repeat(
                  loggedInUser.password.length
                )}</p>
                </div> 

                <ul id="account-detail-buttons">
      <li id="show-password" class="list-account">
        <img src="icons/show-password.png" alt="Button for showing the password" />
      </li>
      <li id="log-out" class="list-account">
        <img src="icons/log-out.png" alt="Button for logging out" />
      </li>
      </ul>
              </div> 
            </section>
  `;

      /* Clicking the buttin will make the password appear, 
and clicking it again will make it dissapear */

      const showPasswordButton = document.getElementById("show-password");
      const logoutButton = document.getElementById("log-out");
      const passwordText = document.getElementById("password-text");

      showPasswordButton.addEventListener("click", function (event) {
        if (
          passwordText.textContent === "*".repeat(loggedInUser.password.length)
        ) {
          passwordText.textContent = loggedInUser.password;
        } else {
          passwordText.textContent = "*".repeat(loggedInUser.password.length);
        }
      });

      //Logout button that removes the loggedInUser from localstorage
      logoutButton.addEventListener("click", function (event) {
        localStorage.removeItem("loggedInUser");
        contentElement.innerHTML = `
          <section>
            <h5> You have been logged out</h5>
            <p> Please log in to view your account details.</p>
          </section>
        `;
      });
    } else {
      contentElement.innerHTML = `
            <section>
            <h5>You are not logged in </h5>
            <p>Please log in to view your account details</p>
            </section>
            `;
    }
  });

  //this inserts html when pressing a button
  settingsEliment.addEventListener("click", function (event) {
    contentElement.innerHTML = `
            <section>
              <h2>Settings</h2>
              <div id="bowl"> 
                <div id="settings-list1"> 
                  <h5>Light mode:</h5> 
                  <img class="account-icons" id="light" src="icons/sun-green.svg" alt="light mode button">
                </div> 
                <div id="settings-list2"> 
                  <h5>Dark mode:</h5> 
                  <img class="account-icons" id="dark" src="icons/moon-green.svg" alt="dark mode button">
                </div> 
              </div> 
            </section>
  `;

    //change icons to light and dark mode icons
  });
});
