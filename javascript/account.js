document.addEventListener("DOMContentLoaded", () => {
  const detailElement = document.getElementById("account-details");
  const settingsEliment = document.getElementById("settings");
  const contentElement = document.getElementById("account-content");

  //this inserts html when pressing a button
  detailElement.addEventListener("click", function (event) {
    contentElement.innerHTML = `
            <section>
              <h2>Your Account Details</h2>
              <div id="bowl2"> 
                <div id="settings-list3"> 
                <h5>Your Username:</h5>
                <p>iho3i73jh</p>
                </div> 
                <div id="settings-list3"> 
                <h5>Your Email:</h5>
                <p>nonreal@email.com</p>
                </div> 
                <div id="settings-list5"> 
                <h5>Your Password:</h5>
                <p>***********</p>
                </div> 
              </div> 
            </section>
  `;
  });

  //this inserts html when pressing a button
  settingsEliment.addEventListener("click", function (event) {
    contentElement.innerHTML = `
            <section>
              <h2>Settings</h2>
              <div id="bowl"> 
                <div id="settings-list1"> 
                  <h5>Light mode:</h5> 
                  <img class="icon"" id="light" src="icons/sun-green.svg" alt="light mode button">
                </div> 
                <div id="settings-list2"> 
                  <h5>Dark mode:</h5> 
                  <img class="icon" id="dark" src="icons/moon-green.svg" alt="dark mode button">
                </div> 
              </div> 
            </section>
  `;

    //change icons to light and dark mode icons
  });
});
