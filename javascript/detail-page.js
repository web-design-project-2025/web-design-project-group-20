let films = [];

document.addEventListener("DOMContentLoaded", async function () {
  const filmImg = document.getElementById("details");
  const filmTitle = document.getElementById("detail-title");
  const filmDescription = document.getElementById("detail-description");
  const filmStars = document.getElementById("detail-star-container");

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(document.location.search);
    return urlParams.get(param);
  }

  const whatFilm = getQueryParam("title");
  console.log(whatFilm);

  const filmResponse = await fetch("data/movies.json");
  const filmJSON = await filmResponse.json();
  films = filmJSON.movies;

  const film = films.find((m) => m.title == whatFilm);

  function filmFullStar() {
    const filmFullStar = document.createElement("img");
    filmFullStar.classList.add("film-stars");
    filmFullStar.src = "icons/star-full.svg";
    filmStars.appendChild(filmFullStar);
  }

  function filmHollowStar() {
    const filmHollowStar = document.createElement("img");
    filmHollowStar.classList.add("film-stars");
    filmHollowStar.src = "icons/star-hallow.svg";
    filmStars.appendChild(filmHollowStar);
  }

  function numberOfReviews() {
    const reviewElement = document.createElement("p");
    reviewElement.innerHTML = film.nr_of_reviews;
    reviewElement.classList.add("film-number-of-reviews");
    filmStars.appendChild(reviewElement);
  }

  if (film) {
    filmImg.src = film.image;
    filmTitle.innerText = film.title;
    filmDescription.innerText = film.description;

    if (film.rating === 1) {
      filmFullStar();
      filmHollowStar();
      filmHollowStar();
      filmHollowStar();
      filmHollowStar();
      numberOfReviews();
    } else if (film.rating === 2) {
      filmFullStar();
      filmFullStar();
      filmHollowStar();
      filmHollowStar();
      filmHollowStar();
      numberOfReviews();
    } else if (film.rating === 3) {
      filmFullStar();
      filmFullStar();
      filmFullStar();
      filmHollowStar();
      filmHollowStar();
      numberOfReviews();
    } else if (film.rating === 4) {
      filmFullStar();
      filmFullStar();
      filmFullStar();
      filmFullStar();
      filmHollowStar();
      numberOfReviews();
    } else if (film.rating === 5) {
      filmFullStar();
      filmFullStar();
      filmFullStar();
      filmFullStar();
      filmFullStar();
      numberOfReviews();
    }
  }
});
