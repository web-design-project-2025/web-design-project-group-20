document.addEventListener("DOMContentLoaded", () => {
  const detailElement = document.getElementById("account-details");
  const settingsEliment = document.getElementById("settings");
  const contentElement = document.getElementById("account-content");

  //this inserts html when pressing a button
  detailElement.addEventListener("click", function (event) {
    contentElement.innerHTML = `
            <section>
                 <h2>Account Details</h2>
        
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
                  <p>Light mode:</p> 
                  <img class="account-icons" id="light" src="icons/sun-green.svg" alt="light mode button">
                </div> 
                <div id="settings-list2"> 
                  <p>Dark mode:</p> 
                  <img class="account-icons" id="dark" src="icons/moon-green.svg" alt="dark mode button">
                </div> 
              </div> 
            </section>
  `;

    //change icons to light and dark mode icons
  });
});
