const iconElementMenu = document.getElementById("drop-down-icon");
const containerQuery = document.querySelector("[data-enter-list-items]")

function listItems (){
    containerQuery.innerHTML =`
    <ul class="header-ul-menu">
        <li class="header-list-menu">
            <a class="header-text" href="index.html">Home</a>
        </li>
        <li class="header-list-menu">
            <a class="header-text" href="movie-list.html">Movies</a>
        </li>
        <li class="header-list-menu">
            <a class="header-text" href="article-list.html">Articles</a>
        </li>
        <li class="header-list-menu">
            <a class="header-text" href="login.html">Login</a>
        </li>
        <li class="header-list-menu">
            <a class="header-text" href="watch-list.html">Watch List</a>
        </li>
    </ul>
    `;
}
function listEmpty (){
    containerQuery.innerHTML =``;
}



let menuActive = false;

iconElementMenu.addEventListener ("click", function (event){
    if(!menuActive){
        iconElementMenu.classList.add("active");
       listItems();
    } else{
        iconElementMenu.classList.remove("active");
        listEmpty();
    }
    menuActive = !menuActive;
});
