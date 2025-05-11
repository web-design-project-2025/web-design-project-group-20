let movies = [];

const watchlistContentElement = document.getElementById("watchlist-content");

async function loadData() {
  const movieResponse = await fetch("data/movies.json");
  const movieJSON = await movieResponse.json();
  movies = movieJSON.movies;

  if (document.getElementById("watchlist-content")) {
    renderContent();
  }
}

function createMovieElement(movie) {
  const movieElement = document.createElement("div");
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
  watchlistIcon.src = "icons/watchlist-icon.svg";
  watchlistIcon.alt = "add to watchlist button";
  watchlistIcon.classList.add("watchlist-icon");

  movieWatchlist.appendChild(movieName);
  movieWatchlist.appendChild(watchlistIcon);
  movieElement.appendChild(movieWatchlist);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let userWatchlist = [];

  if (loggedInUser) {
    const userEmail = loggedInUser.email;
    userWatchlist = JSON.parse(localStorage.getItem(userEmail)) || [];

    if (userWatchlist.includes(movie.id)) {
      watchlistIcon.src = "icons/watchlist-icon-full.svg";
    }
  }

  watchlistIcon.addEventListener("click", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      alert("You need to log in to add movies to the watchlist");
      return;
    }

    const userEmail = loggedInUser.email;
    let watchlist = JSON.parse(localStorage.getItem(userEmail)) || [];

    if (watchlist.includes(movie.id)) {
      watchlist = watchlist.filter((id) => id !== movie.id);
      watchlistIcon.src = "icons/watchlist-icon.svg";
    } else {
      watchlist.push(movie.id);
      watchlistIcon.src = "icons/watchlist-icon-full.svg";
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

function renderContent() {
  watchlistContentElement.innerHTML = "";

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    watchlistContentElement.innerHTML =
      "<div class='watchlist-text-container'><p>Log in to view your watchlist.</p></div>";
    return;
  }

  const userEmail = loggedInUser.email;
  let userWatchlist = JSON.parse(localStorage.getItem(userEmail)) || [];

  if (userWatchlist.length === 0) {
    watchlistContentElement.innerHTML =
      "<div class='watchlist-text-container'><p>Your watchlist is empty.</p></div>";
    return;
  }

  /*Added line 131-132 with the help of chatgpt :
  https://chatgpt.com/share/681e592e-23b0-800a-a0c0-b218e1c47eb5 */

  const watchlistMovies = movies.filter((movie) =>
    userWatchlist.includes(movie.id)
  );

  for (let movie of watchlistMovies) {
    const movieElement = createMovieElement(movie);
    watchlistContentElement.appendChild(movieElement);
  }
}

loadData();
