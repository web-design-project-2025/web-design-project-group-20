let movies = [];

const contentElement = document.getElementById("movies_content");
const clearFilter = document.getElementById("movie-filter-clear");

const homeContentElement = document.getElementById("home-movie-content");

async function loadData() {
  const movieResponse = await fetch("data/movies.json");
  const movieJSON = await movieResponse.json();
  movies = movieJSON.movies;

  if (document.getElementById("movies_content")) {
    renderContent();
  } else if (document.getElementById("home-movie-content")) {
    homeRenderContent();
  }
  if (localStorage.getItem("darkMode") === "enabled") {
    // Re-apply dark mode to update dynamically loaded icons
    if (typeof enableDarkMode === "function") {
      enableDarkMode();
    }
  }
}

/* added/changed lines 31-32, 39-40 with 
the help of chatgpt: https://chatgpt.com/share/6818ac61-8934-800a-aa6d-3a57c3cc048f  */

function createMovieElement(movie) {
  const movieElement = document.createElement("a");
  movieElement.classList.add("movie-box");

  const detailLinkElement = document.createElement("a");
  detailLinkElement.href = `detail-page.html?title=${movie.title}`;

  const imageElement = document.createElement("img");
  imageElement.src = movie.image;
  imageElement.alt = movie.alt;
  imageElement.classList.add("posters");

  detailLinkElement.appendChild(imageElement);
  movieElement.appendChild(detailLinkElement);

  const movieWatchlist = document.createElement("div");
  movieWatchlist.classList.add("movie-watchlist");

  const movieName = document.createElement("p");
  movieName.innerText = movie.title;
  movieName.classList.add("movie-name");

  const watchlistIcon = document.createElement("img");
  watchlistIcon.alt = "add to watchlist button";
  watchlistIcon.classList.add("watchlist-icon");

  /* 
Added 15 lines (59,60,62,63,64,78,79,86,103,107,108,109,114,115,116)
from chatgpt: https://chatgpt.com/share/682321f8-2e70-800a-9288-e4debaf2ce09 */

  let isDarkMode = false;
  let watchlistIconDarkMode = "icons/watchlist-icon.svg";

  if (localStorage.getItem("darkMode") === "enabled") {
    isDarkMode = true;
    watchlistIconDarkMode = "icons/watchlist-icon-white.svg";
  }

  /* Added 10 lines (60,64,66,67,79,80,82,83,86,90) from
chatgpt https://chatgpt.com/share/681ccfa9-42a4-800a-a4ee-bc38c5c96870 :*/

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let userWatchlist = [];

  if (loggedInUser) {
    const userEmail = loggedInUser.email;
    userWatchlist = JSON.parse(localStorage.getItem(userEmail)) || [];

    if (userWatchlist.includes(movie.id)) {
      if (isDarkMode) {
        watchlistIconDarkMode = "icons/watchlist-icon-full-white.svg";
      } else {
        watchlistIconDarkMode = "icons/watchlist-icon-full.svg";
      }
    }
  }

  watchlistIcon.src = watchlistIconDarkMode;

  movieWatchlist.appendChild(movieName);
  movieWatchlist.appendChild(watchlistIcon);
  movieElement.appendChild(movieWatchlist);

  watchlistIcon.addEventListener("click", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      alert("You need to log in to add movies to the watchlist");
      return;
    }

    const userEmail = loggedInUser.email;
    let watchlist = JSON.parse(localStorage.getItem(userEmail)) || [];

    const isDarkMode = localStorage.getItem("darkMode") === "enabled";

    if (watchlist.includes(movie.id)) {
      watchlist = watchlist.filter((id) => id !== movie.id);
      if (isDarkMode) {
        watchlistIcon.src = "icons/watchlist-icon-white.svg";
      } else {
        watchlistIcon.src = "icons/watchlist-icon.svg";
      }
    } else {
      watchlist.push(movie.id);
      if (isDarkMode) {
        watchlistIcon.src = "icons/watchlist-icon-full-white.svg";
      } else {
        watchlistIcon.src = "icons/watchlist-icon-full.svg";
      }
    }

    localStorage.setItem(userEmail, JSON.stringify(watchlist));
  });

  const starContainer = document.createElement("div");
  starContainer.innerHTML = "";
  starContainer.classList.add("movie-stars");
  movieElement.appendChild(starContainer);

  function createImageElement(c, source, container) {
    const image = document.createElement("img");
    image.classList.add(c);
    image.src = source;
    container.appendChild(image);
  }

  function numberOfReviews() {
    const reviewElement = document.createElement("p");
    reviewElement.innerHTML = movie.nr_of_reviews;
    reviewElement.classList.add("number-of-reviews");
    starContainer.appendChild(reviewElement);
  }

  Array.from({ length: movie.rating }, () =>
    createImageElement("stars", "icons/star-full.svg", starContainer)
  );
  Array.from({ length: 5 - movie.rating }, () =>
    createImageElement("stars", "icons/star-hallow.svg", starContainer)
  );
  numberOfReviews();

  return movieElement;
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(document.location.search);
  return urlParams.get(param);
}

function renderContent() {
  contentElement.innerHTML = "";

  const genre = getQueryParam("genre");
  let movieList = movies;
  if (genre && genre !== "") {
    movieList = movies.filter(
      (m) => m.genres.filter((g) => g.text === genre).length > 0
    );

    clearFilter.style.visibility = "visible";

    if (genre === "science fiction") {
      document.getElementById("movie-filter-scifi").href = `movie-list.html`;
      document.getElementById("movie-filter-scifi").style.fontWeight = "bold";
    } else if (genre === "action") {
      document.getElementById("movie-filter-action").href = `movie-list.html`;
      document.getElementById("movie-filter-action").style.fontWeight = "bold";
    } else if (genre === "animation") {
      document.getElementById(
        "movie-filter-animation"
      ).href = `movie-list.html`;
      document.getElementById("movie-filter-animation").style.fontWeight =
        "bold";
    } else if (genre === "comedy") {
      document.getElementById("movie-filter-comedy").href = `movie-list.html`;
      document.getElementById("movie-filter-comedy").style.fontWeight = "bold";
    }
  }

  for (let movie of movieList) {
    const movieElement = createMovieElement(movie);
    contentElement.appendChild(movieElement);
  }
}

function homeRenderContent() {
  homeContentElement.innerHTML = "";

  while (movies.length > 5) {
    let mov = Math.floor(Math.random() * movies.length);
    movies.splice(mov, 1);
  }

  for (let movie of movies) {
    const movieElement = createMovieElement(movie);

    // Changeing box style
    movieElement.classList.remove("movie-box");
    movieElement.classList.add("movie-box-home");

    // find existing number-of-reviews element inside movieElement
    const reviewElement = movieElement.querySelector(".number-of-reviews");
    if (reviewElement) {
      reviewElement.classList.remove("number-of-reviews");
      reviewElement.classList.add("number-of-reviews-home");
    }

    homeContentElement.appendChild(movieElement);
  }
}

loadData();
