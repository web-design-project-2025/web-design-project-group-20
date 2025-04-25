let films = [];
let articles = [];

document.addEventListener("DOMContentLoaded", async function () {
  const filmImg = document.getElementById("details");
  const filmTitle = document.getElementById("detail-title");
  const filmDescription = document.getElementById("detail-description");
  const filmStars = document.getElementById("detail-star-container");
  const articleTitle = document.getElementById("detail-article-title");
  const articleAuthor = document.getElementById("detail-article-author");
  const articleBox = document.getElementById("detail-article-div");

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(document.location.search);
    return urlParams.get(param);
  }

  if (document.getElementById("details")) {
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
  } else if (document.getElementById("detail-article-div")) {
    //checking for which article is active, and loading data
    const whatArticle = getQueryParam("id");

    const articleResponse = await fetch("data/articles.json");
    const articleJSON = await articleResponse.json();
    articles = articleJSON.articles;

    const article = articles.find((a) => a.id == whatArticle);

    const art = article.content;

    function createParagraphElement(c, text) {
      const para = document.createElement("p");
      para.classList.add(c);
      para.innerText = text;
      articleBox.appendChild(para);
    }

    function createImageElement(source) {
      const image = document.createElement("img");
      image.src = source;
      articleBox.appendChild(image);
    }

    if (article) {
      articleTitle.innerText = article.title;
      articleAuthor.innerText = article.author;

      //going through the JSON array and creating elements in order
      for (let i = 0; i < art.length; i++) {
        let type = art[i].type;
        let classes = art[i].class;
        let text = art[i].text;

        if (type == "image") {
          createImageElement(text);
        }
        if (type == "paragraph" || type == "header1") {
          createParagraphElement(classes, text);
        }
      }
    }
  }
});
