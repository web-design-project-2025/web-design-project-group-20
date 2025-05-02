const containerElement = document.getElementById("header-container");
const headerListElements = document.querySelectorAll(".header-list");

function originalNav() {
  headerListElements.forEach((element) => {
    if (window.matchMedia('(max-width: 785px)').matches) {
      element.style.display = 'none';
    } else {
      element.style.display = 'list-item'; // or 'block', depending on your layout
    }
  });
}

originalNav(); // Run on page load
window.addEventListener('resize', originalNav); // Listen for resize

