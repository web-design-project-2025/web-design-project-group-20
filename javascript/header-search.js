const iconElement = document.getElementById("icon");
const wrapperElement = document.getElementById("search-wrapper-header");

isVisable = false;

iconElement.addEventListener("click", function (event) {
  if (isVisable === true){
    isVisable = false;
    wrapperElement.innerHTML = ``;
  } else {
    isVisable = true;
    wrapperElement.innerHTML = `
        <div class="search-contaner2">
          <label for="search"><img class="search-img" src="icons/search-icon-green.svg" alt="search icon"></label>
          <input class="input-search" type="search" id="search" data-search>
        </div>
        <div class="search-show-home" data-show-container>
        </div>
        <template data-content-template>
        <div class="title-content-home">
          <p id="home-search-result" data-title></p>
        </div>
      </template> 
  `;
  }


  });