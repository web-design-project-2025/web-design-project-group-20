let films = [];

document.addEventListener("DOMContentLoaded", async function () {
  const filmImg = document.getElementById("details");
  const filmTitle = document.getElementById("detail-title");

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

  if (film) {
    filmImg.src = film.image;
    filmTitle.innerText = film.title;
  }
});
