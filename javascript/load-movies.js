let movies = [];
const contentElement = document.getElementById("movies_content");
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
    reviewElement.classList.add("numberOfReviews");
    starContainer.appendChild(reviewElement);
  }
  if (movie.rating === 5) {
    fullStar();
    fullStar();
    fullStar();
    fullStar();
    fullStar();
    numberOfReviews();
  } else if (movie.rating === 4) {
    fullStar();
    fullStar();
    fullStar();
    fullStar();
    hollowStar();
    numberOfReviews();
  } else if (movie.rating === 3) {
    fullStar();
    fullStar();
    fullStar();
    hollowStar();
    hollowStar();
    numberOfReviews();
  } else if (movie.rating === 2) {
    fullStar();
    fullStar();
    hollowStar();
    hollowStar();
    hollowStar();
    numberOfReviews();
  } else if (movie.rating === 1) {
    fullStar();
    hollowStar();
    hollowStar();
    hollowStar();
    hollowStar();
    numberOfReviews();
  }

  return movieElement;
}

function renderContent() {
  contentElement.innerHTML = "";

  for (let movie of movies) {
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
