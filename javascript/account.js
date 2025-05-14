document.addEventListener("DOMContentLoaded", () => {
  const detailElement = document.getElementById("account-details");
  const settingsElement = document.getElementById("settings");
  const contentElement = document.getElementById("account-content");

  
  const images = {
    account: {
      inactive: "icons/account-red.png",
      active: "icons/account-yellow.png",
    },
    settings: {
      inactive: "icons/settings-red.png",
      active: "icons/settings-yellow.png",
    },
  };

  function clearActiveButtons() {
    document.querySelectorAll(".list-account").forEach((el) => {
      el.classList.remove("active");
      const img = el.querySelector("img");
      if (el.id === "account-details") {
        img.src = images.account.inactive;
      } else if (el.id === "settings") {
        img.src = images.settings.inactive;
      }
    });
  }

  //this inserts html when pressing a button
  detailElement.addEventListener("click", function (event) {
    clearActiveButtons();
    detailElement.classList.add("active");
    detailElement.querySelector("img").src = images.account.active;

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      contentElement.innerHTML = `
        <section class="account-text-color">
            <h2>Your Account Details</h2>
            <div id="bowl2"> 
              <div id="settings-list3"> 
                  <h5>Your Username:</h5>
                  <p>${loggedInUser.username}</p>
              </div> 
              <div id="settings-list4"> 
                  <h5>Your Email:</h5>
                  <p>${loggedInUser.email}</p>
              </div> 
              <div id="settings-list5"> 
                <h5>Your Password:</h5>
                <p id="password-text">${"*".repeat(
                  loggedInUser.password.length
                )}</p>
              </div>
              <button id="show-password" class="button-click"> Show Password </button>
              <button id="log-out" class="button-click"> Log out </button>
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
          <section class="account-text-color">
            <h2>Your Account Details</h2>
          <div id="bowl-logged-out">
            <h3> You have been logged out.</h3>
            <p> Please log in to view your account details <a href="login.html" class="account-here"> here.</a></p>
          </section>
          </div>
        `;
      });
    } else {
      contentElement.innerHTML = `
            <section class = "account-text-color">
              <h2>Your Account Details</h2>
             <div id="bowl-logged-out">
            <h3>You are not logged in </h3>
            <p>Please log in to view your account details <a href="login.html" class="account-here"> here.</a></p>
            
            </section>
            </div>
            `;
    }
  });

  //this inserts html when pressing a button
  settingsElement.addEventListener("click", function (event) {
    clearActiveButtons();
    settingsElement.classList.add("active");
    settingsElement.querySelector("img").src = images.settings.active;
    contentElement.innerHTML = `
            <section>
              <h2>Settings</h2>
              <div id="bowl"> 
                <div id="settings-list1"> 
                  <h5>Light mode:</h5> 
                  <img class="icon" id="light" src="icons/sun-green.svg" alt="light mode button">
                </div> 
                <div id="settings-list2"> 
                  <h5>Dark mode:</h5> 
                  <img class="icon" id="dark" src="icons/moon-green.svg" alt="dark mode button">
                </div> 
              </div> 
            </section>
  `;
         // code from previus project
          const lightModeButton = document.getElementById("light");
          const darkModeButton = document.getElementById("dark");

          if (localStorage.getItem("darkMode") === "enabled") {
            enableDarkMode();
            const lightModeIconImg = document.getElementById("light");
            const darkModeIconImg = document.getElementById("dark");
            lightModeIconImg.src = "icons/sun-dm.svg";
            darkModeIconImg.src = "icons/moon-dm.svg"; 
          }

          lightModeButton.addEventListener("click", () => {
            disableDarkMode();
            const lightModeIconImg = document.getElementById("light");
            const darkModeIconImg = document.getElementById("dark");
            lightModeIconImg.src = "icons/sun-green.svg";   
            darkModeIconImg.src = "icons/moon-green.svg";  
            
            });

          darkModeButton.addEventListener("click", () => {
            enableDarkMode();
            const lightModeIconImg = document.getElementById("light");
            const darkModeIconImg = document.getElementById("dark");
            lightModeIconImg.src = "icons/sun-dm.svg";
            darkModeIconImg.src = "icons/moon-dm.svg"; 
          });

          function enableDarkMode() {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");

            const accountIconImg = document.getElementById("icon-link-account");
            const searchIconImg = document.getElementById("icon-search-header");
            const searchIconHeroImg = document.getElementById("search-icon-hero");
            if (accountIconImg) accountIconImg.querySelector("img").src = "icons/account-icon-dm.svg";
            if (searchIconImg) searchIconImg.querySelector("img").src = "icons/search-icon-dm.svg";
            if (searchIconHeroImg) searchIconHeroImg.querySelector("img").src = "icons/search-icon-hero-dm.svg";

          }

          function disableDarkMode() {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");

            const accountIconImg = document.getElementById("icon-link-account");
            const searchIconImg = document.getElementById("icon-search-header");
            const searchIconHeroImg = document.getElementById("search-icon-hero");
            if (accountIconImg) accountIconImg.querySelector("img").src = "icons/account-icon.svg";
            if (searchIconImg) searchIconImg.querySelector("img").src = "icons/search-icon.svg";
            if (searchIconHeroImg) searchIconHeroImg.querySelector("img").src = "icons/search-icon-hero.svg";

          }
     });

});
