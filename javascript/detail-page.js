let films = [];
let articles = [];
let reviews = JSON.parse(localStorage.getItem("review")) || [];
let writeReviewStars = [];

document.addEventListener("DOMContentLoaded", async function () {
  const filmImg = document.getElementById("details");
  const filmTitle = document.getElementById("detail-title");
  const filmDescription = document.getElementById("detail-description");
  const filmStars = document.getElementById("detail-star-container");
  const articleTitle = document.getElementById("detail-article-title");
  const articleAuthor = document.getElementById("detail-article-author");
  const articleBox = document.getElementById("detail-article-div");

  // users
  const userBox = document.getElementById("user-box");
  const userBoxTwo = document.getElementById("user-box-two");
  const userBoxThree = document.getElementById("user-box-three");
  const userBoxFour = document.getElementById("user-box-four");

  // reviews
  const userOneReview = document.getElementById("user-one-review");
  const userTwoReview = document.getElementById("user-two-review");
  const userThreeReview = document.getElementById("user-three-review");
  const userFourReview = document.getElementById("user-four-review");

  // stars for each review
  const reviewStars = document.getElementById("review-stars");
  const reviewStarsTwo = document.getElementById("review-stars-two");
  const reviewStarsThree = document.getElementById("review-stars-three");
  const reviewStarsFour = document.getElementById("review-stars-four");

  // variables for wrting a review
  const submitButton = document.getElementById("submit-button");
  const writeReviewArea = document.getElementById("write-review");
  const writeReviewTitle = document.getElementById("rtitle");

  const writeStars = document.getElementsByClassName("write-review-star");

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(document.location.search);
    return urlParams.get(param);
  }

  // creating <p> and <img> to use for movie detail and article detail
  function createParagraphElement(c, text, container) {
    const para = document.createElement("p");
    para.classList.add(c);
    para.innerText = text;
    container.appendChild(para);
  }

  function createImageElement(source, container, c) {
    const image = document.createElement("img");
    image.classList.add(c);
    image.src = source;
    container.appendChild(image);
  }

  // if detail-page for movies is active
  if (document.getElementById("details")) {
    const whatFilm = getQueryParam("title");
    console.log(whatFilm);

    const filmResponse = await fetch("data/movies.json");
    const filmJSON = await filmResponse.json();
    films = filmJSON.movies;

    const film = films.find((m) => m.title == whatFilm);

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

      Array.from({ length: film.rating }, () =>
        createImageElement("icons/star-full.svg", filmStars, "film-stars")
      );
      Array.from({ length: 5 - film.rating }, () =>
        createImageElement("icons/star-hallow.svg", filmStars, "film-stars")
      );
      numberOfReviews();

      async function getRandomUser() {
        /*
        used the following video to get started with the api, fetching and accessing the elements
        https://www.youtube.com/watch?v=gD2gY2YjgyE&t=2s
        */
        const response = await fetch("https://randomuser.me/api/?results=4");
        const data = await response.json();

        let filmReviews = [];
        filmReviews = film.reviews;

        if (!active) {
          const user = data.results[0];
          createReview(
            user.picture.medium,
            userBox,
            userOneReview,
            user.login,
            filmReviews[0],
            filmReviews[0].rating,
            reviewStars
          );
        }

        const userTwo = data.results[1];
        createReview(
          userTwo.picture.medium,
          userBoxTwo,
          userTwoReview,
          userTwo.login,
          filmReviews[1],
          filmReviews[1].rating,
          reviewStarsTwo
        );

        const userThree = data.results[2];
        createReview(
          userThree.picture.medium,
          userBoxThree,
          userThreeReview,
          userThree.login,
          filmReviews[2],
          filmReviews[2].rating,
          reviewStarsThree
        );

        const userFour = data.results[3];
        createReview(
          userFour.picture.medium,
          userBoxFour,
          userFourReview,
          userFour.login,
          filmReviews[3],
          filmReviews[3].rating,
          reviewStarsFour
        );
      }

      getRandomUser();

      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      const active = reviews.find((m) => m.movie === whatFilm);

      if (loggedInUser === null) {
        submitButton.addEventListener("click", function () {
          alert("Please log in before writing a review.");
        });

        if (active) {
          createReview(
            "icons/user.jpg",
            userBox,
            userOneReview,
            active,
            active,
            4,
            reviewStars
          );
        }
      } else if (loggedInUser) {
        const activeUser = reviews.find(
          (m) => m.movie === whatFilm && m.username === loggedInUser.username
        );

        submitButton.addEventListener("click", function () {
          if (writeReviewArea.value != "" && writeReviewTitle.value != "") {
            /* 
            if active doesn't find a review with the same movie as
            whats currently being displayed, you can write a review. 
            else, you get an alert.
            */
            if (!active || loggedInUser.username != active.username) {
              const newReview = {
                username: loggedInUser.username,
                title: writeReviewTitle.value,
                text: writeReviewArea.value,
                movie: film.title,
              };

              reviews.push(newReview);
              console.log(reviews);

              localStorage.setItem("review", JSON.stringify(reviews));

              userBox.innerHTML = "";
              userOneReview.innerHTML = "";
              reviewStars.innerHTML = "";

              star = document.createElement("div");
              userBox.appendChild(star);
              star.setAttribute("id", "review-stars");

              createReview(
                "icons/user.jpg",
                userBox,
                userOneReview,
                newReview,
                newReview,
                4,
                star
              );

              // reloading page on submit to prevent user from reviewing the same movie twice
              window.location.href = window.location.href;
            } else {
              alert("You have already reviewed this movie.");
            }
          } else {
            alert("Fill in both boxes.");
          }
        });

        if (activeUser) {
          createReview(
            "icons/user.jpg",
            userBox,
            userOneReview,
            activeUser,
            activeUser,
            4,
            reviewStars
          );
        } else if (active) {
          createReview(
            "icons/user.jpg",
            userBox,
            userOneReview,
            active,
            active,
            4,
            reviewStars
          );
        }
      }

      Array.from(writeStars).forEach((star) => {
        star.addEventListener("mouseenter", () => {
          star.src = "icons/star-full.svg";
        });
      });

      document
        .getElementById("image-button")
        .addEventListener("mouseenter", function () {
          document.getElementById("image-button").src =
            "icons/post-icon-yellow.png";
        });

      document
        .getElementById("image-button")
        .addEventListener("mouseleave", function () {
          document.getElementById("image-button").src =
            "icons/post-icon-red.png";
        });

      /* 
      active finds the first review that was written for the current movie 
      activeUser finds the first review that was written by the current user & movie
      if the loggedInUser has written a review for the movie, it will be displayed for them
      */

      console.log(active);
      //console.log(activeUser);

      function createReview(
        imagesrc,
        container,
        textContainer,
        user,
        review,
        rating,
        starCon
      ) {
        createImageElement(imagesrc, container, "user-image");
        createParagraphElement("username", user.username, container);
        createParagraphElement(
          "user-review-title",
          review.title,
          textContainer
        );
        createParagraphElement("user-review-text", review.text, textContainer);
        Array.from({ length: rating }, () =>
          createImageElement("icons/star-full.svg", starCon, "review-stars")
        );
        Array.from({ length: 5 - rating }, () =>
          createImageElement("icons/star-hallow.svg", starCon, "review-stars")
        );
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

    if (article) {
      articleTitle.innerText = article.title;
      articleAuthor.innerText = article.author;

      //going through the JSON array and creating elements in order
      for (let i = 0; i < art.length; i++) {
        let type = art[i].type;
        let classes = art[i].class;
        let text = art[i].text;

        if (type == "image") {
          createImageElement(text, articleBox);
        }
        if (type == "paragraph" || type == "header1") {
          createParagraphElement(classes, text, articleBox);
        }
      }
    }
  }
});
