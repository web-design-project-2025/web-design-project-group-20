let movies = [];

const contentElement = document.getElementById("movies_content");
const comedyContent = document.getElementById("movies-comedy-content");
const animationContent = document.getElementById("movies-animation-content");
const actionContent = document.getElementById("movies-action-content");
const scifiContent = document.getElementById("movies-scifi-content");
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
  movieElement.appendChild(movieName);

  const watchlistIcon = document.createElement("img");
  watchlistIcon.src = "icons/watchlist-icon.svg";
  watchlistIcon.alt = "add to watchlist button";
  watchlistIcon.classList.add("watchlist-icon");
  movieElement.appendChild(watchlistIcon);

  movieWatchlist.appendChild(movieName);
  movieWatchlist.appendChild(watchlistIcon);
  movieElement.appendChild(movieWatchlist);

  watchlistIcon.addEventListener("click", function () {
    if (watchlistIcon.src.includes("watchlist-icon.svg")) {
      watchlistIcon.src = "icons/watchlist-icon-full.svg";
    } else {
      watchlistIcon.src = "icons/watchlist-icon.svg";
    }
  });

  const starContainer = document.createElement("div");
  starContainer.innerHTML = "";
  starContainer.classList.add("movie-stars");
  movieElement.appendChild(starContainer);

  function fullStar() {
    const starElement = document.createElement("img");
    starElement.classList.add("stars");
    starElement.src = "icons/star-full.svg";
    starContainer.appendChild(starElement);
  }

  function hollowStar() {
    const starElement = document.createElement("img");
    starElement.classList.add("stars");
    starElement.src = "icons/star-hallow.svg";
    starContainer.appendChild(starElement);
  }

  function numberOfReviews() {
    const reviewElement = document.createElement("p");
    reviewElement.innerHTML = movie.nr_of_reviews;
    reviewElement.classList.add("number-of-reviews");
    starContainer.appendChild(reviewElement);
  }

  Array.from({ length: movie.rating }, () => fullStar());
  Array.from({ length: 5 - movie.rating }, () => hollowStar());
  numberOfReviews();

  return movieElement;
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(document.location.search);
  return urlParams.get(param);
}

function filterMovie(movie) {
  const genre = getQueryParam("genre");
  const filter = movie.genres;

  if (genre === "comedy") {
    contentElement.style.display = "none";
    comedyContent.style.display = "grid";
    clearFilter.style.visibility = "visible";
    const comedy = filter.filter((filter) => filter.text === "comedy");

    // for of loop or the one on animation?
    for (let m of comedy) {
      const movieElement = createMovieElement(movie);
      comedyContent.appendChild(movieElement);
    }

    document.getElementById("movie-filter-comedy").href = `movie-list.html`;
    document.getElementById("movie-filter-comedy").style.fontWeight = "bold";
  }

  if (genre === "animation") {
    contentElement.style.display = "none";
    animationContent.style.display = "grid";
    clearFilter.style.visibility = "visible";
    const animation = filter.filter((filter) => filter.text === "animation");

    for (let i = 0; i < animation.length; i++) {
      const movieElement = createMovieElement(movie);
      animationContent.appendChild(movieElement);
    }

    document.getElementById("movie-filter-animation").href = `movie-list.html`;
    document.getElementById("movie-filter-animation").style.fontWeight = "bold";
  }

  if (genre === "action") {
    contentElement.style.display = "none";
    actionContent.style.display = "grid";
    clearFilter.style.visibility = "visible";
    const action = filter.filter((filter) => filter.text === "action");

    for (let m of action) {
      const movieElement = createMovieElement(movie);
      actionContent.appendChild(movieElement);
    }

    document.getElementById("movie-filter-action").href = `movie-list.html`;
    document.getElementById("movie-filter-action").style.fontWeight = "bold";
  }

  if (genre === "science fiction") {
    contentElement.style.display = "none";
    scifiContent.style.display = "grid";
    clearFilter.style.visibility = "visible";
    const scifi = filter.filter((filter) => filter.text === "science fiction");

    for (let m of scifi) {
      const movieElement = createMovieElement(movie);
      scifiContent.appendChild(movieElement);
    }

    document.getElementById("movie-filter-scifi").href = `movie-list.html`;
    document.getElementById("movie-filter-scifi").style.fontWeight = "bold";
  }
}

function renderContent() {
  contentElement.innerHTML = "";

  for (let movie of movies) {
    const movieElement = createMovieElement(movie);
    contentElement.appendChild(movieElement);
    filterMovie(movie);
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
    homeContentElement.appendChild(movieElement);
  }
}

loadData();
