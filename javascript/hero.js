fetch("data/movies.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const movies = data.movies;

    // Choose 3 movies by index (posible to ad mor just ad a ", ")
    const selectedMovieIndexes = [7, 37, 6, 5];
    let currentIndex = 0;

    const imageElement = document.getElementById("hero-image");
    const movieTitleQuery = document.querySelector("[movie-title]");
    const ratingQuery = document.querySelector("[rating]");
    const genreQuery = document.querySelector("[genres]");
    const linkToDetailQuery = document.querySelector("[link-to-detail]");

    let isFirstLoad = true; // Start by assuming it's the first load

    function updateHero(movie) {
      if (!movie) return;

      if (!isFirstLoad) {
        // Only fade out when switching between movies (not on first load)
        imageElement.classList.add("fade-out");
      }

      setTimeout(
        () => {
          console.log("Setting image source to:", movie.image);

          imageElement.src = movie.image;
          imageElement.alt = movie.alt;

          if (movieTitleQuery) movieTitleQuery.textContent = movie.title;

          //stars here
          if (ratingQuery) {
            ratingQuery.innerHTML = "";
            Array.from({ length: movie.rating }, () => fullStarHero());
            Array.from({ length: 5 - movie.rating }, () => hollowStarHero());
          }

          function fullStarHero() {
            const starElementHero = document.createElement("img");
            starElementHero.classList.add("stars");
            starElementHero.src = "icons/star-full.svg";
            ratingQuery.appendChild(starElementHero);
          }

          function hollowStarHero() {
            const hollowStarElementHero = document.createElement("img");
            hollowStarElementHero.classList.add("stars");
            hollowStarElementHero.src = "icons/star-hallow.svg";
            ratingQuery.appendChild(hollowStarElementHero);
          }

          if (genreQuery) {
            genreQuery.innerHTML = movie.genres
              .map(
                (genre) =>
                  genre.text.charAt(0).toUpperCase() +
                  genre.text.slice(1).toLowerCase()
              )
              .join("&nbsp;&nbsp;");
          }

          if (linkToDetailQuery) {
            linkToDetailQuery.href = `detail-page.html?title=${encodeURIComponent(
              movie.title
            )}`;
          }

          if (!isFirstLoad) {
            // Only fade back in if not the first load
            imageElement.classList.remove("fade-out");
          }

          isFirstLoad = false; // After first load, set to false
        },
        isFirstLoad ? 0 : 2000
      );
      // If first load: 0 ms delay, otherwise: 1000 ms for fade
    }

    // Initial update
    updateHero(movies[selectedMovieIndexes[currentIndex]]);

    // Set interval, cycle every 5 seconds (5000 ms)
    setInterval(() => {
      currentIndex = (currentIndex + 1) % selectedMovieIndexes.length;
      updateHero(movies[selectedMovieIndexes[currentIndex]]);
    }, 4000);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
