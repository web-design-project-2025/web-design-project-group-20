let movies = [];
const contentElement = document.getElementById("movies_content");

async function loadData() {
  const movieResponse = await fetch("data/movies.json");
  const movieJSON = await movieResponse.json();
  movies = movieJSON.movies;

  renderContent();
}

function createMovieElement(movie) {
  const movieElement = document.createElement("article");
  movieElement.classList.add("movie-box");

  const imageElement = document.createElement("img");
  imageElement.src = movie.image;
  movieElement.appendChild(imageElement);

  return movieElement;
}

function renderContent() {
  contentElement.innerHTML = "";

  for (let movie of movies) {
    const movieElement = createMovieElement(movie);
    contentElement.appendChild(movieElement);
  }
}

loadData();
