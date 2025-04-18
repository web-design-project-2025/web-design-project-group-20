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
                 <div class="settings-list"> 
                    <p>Light mode:</p> 
                    <img class="account-icons" id="light" src="icons/star-full.svg" alt="light mode button">
                <div> 
                <div class="settings-list"> 
                    <p>Dark mode:</p> 
                     <img class="account-icons" id="dark" src="icons/star-hallow.svg" alt="dark mode button">
                <div> 
            </section>
  `;

    //change icons to light and dark mode icons
  });
});
