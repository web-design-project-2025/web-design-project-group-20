let movies = [];

const watchlistWarningElement = document.getElementById("watchlist-warning");
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
  watchlistIcon.alt = "add to watchlist button";
  watchlistIcon.classList.add("watchlist-icon");

  /* Added 15 lines (45,46,48,49,60,61,83,84,85,91,92,93,99,100,101)
  from chatgpt: https://chatgpt.com/share/682321f8-2e70-800a-9288-e4debaf2ce09 */

  let isDarkMode = false;
  let watchlistIconDarkMode = "icons/watchlist-icon-dark.svg";

  if (localStorage.getItem("darkMode") === "enabled") {
    isDarkMode = true;
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let userWatchlist = [];

  if (loggedInUser) {
    const userEmail = loggedInUser.email;
    userWatchlist = JSON.parse(localStorage.getItem(userEmail)) || [];

    if (userWatchlist.includes(movie.id)) {
      if (isDarkMode) {
        watchlistIcon.src = "icons/watchlist-icon-full-white.svg";
      } else {
        watchlistIcon.src = "icons/watchlist-icon-full.svg";
      }
    }
  }

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

    let darkModeActivate = false;
    if (localStorage.getItem("darkMode") === "enabled") {
      darkModeActivate = true;
    }

    if (watchlist.includes(movie.id)) {
      watchlist = watchlist.filter((id) => id !== movie.id);

      if (darkModeActivate) {
        watchlistIcon.src = "icons/watchlist-icon-white.svg";
      } else {
        watchlistIcon.src = "icons/watchlist-icon.svg";
      }
    } else {
      watchlist.push(movie.id);

      if (darkModeActivate) {
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

function renderContent() {
  watchlistContentElement.innerHTML = "";

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    watchlistWarningElement.innerHTML =
      "<p class='watchlist-text-container'>Log in to view your watchlist.</p>";
    return;
  }

  const userEmail = loggedInUser.email;
  let userWatchlist = JSON.parse(localStorage.getItem(userEmail)) || [];

  if (userWatchlist.length === 0) {
    watchlistWarningElement.innerHTML =
      "<p class='watchlist-text-container'>Your watchlist is empty.</p>";
    return;
  }

  /*Added line 161-162 with the help of chatgpt :
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
