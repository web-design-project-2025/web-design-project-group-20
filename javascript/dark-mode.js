 // code from previus project
 document.addEventListener("DOMContentLoaded", () => {

 const lightModeButton = document.getElementById("light");
 const darkModeButton = document.getElementById("dark");

 if (localStorage.getItem("darkMode") === "enabled") {
   enableDarkMode();
 }

 function enableDarkMode() {
   document.body.classList.add("dark-mode");
   localStorage.setItem("darkMode", "enabled");
 }

 function disableDarkMode() {
   document.body.classList.remove("dark-mode");
   localStorage.setItem("darkMode", "disabled");
 }
});