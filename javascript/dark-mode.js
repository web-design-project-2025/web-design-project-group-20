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

   // changing icons
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

   //Icons reset
   const accountIconImg = document.getElementById("icon-link-account");
   const searchIconImg = document.getElementById("icon-search-header");
   const searchIconHeroImg = document.getElementById("search-icon-hero");
   if (accountIconImg) accountIconImg.querySelector("img").src = "icons/account-icon.svg";
   if (searchIconImg) searchIconImg.querySelector("img").src = "icons/search-icon.svg";
   if (searchIconHeroImg) searchIconHeroImg.querySelector("img").src = "icons/search-icon-hero.svg";
 

 }
});