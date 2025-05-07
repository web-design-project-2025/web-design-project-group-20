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

function createMovieElement(movie) {
  const movieElement = document.createElement("a");
  movieElement.classList.add("movie-box");
  movieElement.href = `detail-page.html?title=${movie.title}`;

  const imageElement = document.createElement("img");
  imageElement.src = movie.image;
  imageElement.alt = movie.alt;
  imageElement.classList.add("posters");
  movieElement.appendChild(imageElement);

  const movieName = document.createElement("p");
  movieName.innerText = movie.title;
  movieName.classList.add("movie-name");
  movieElement.appendChild(movieName);

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
    homeContentElement.appendChild(movieElement);
  }
}

loadData();
