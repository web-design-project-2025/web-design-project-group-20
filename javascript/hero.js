// Fetch the movies JSON file
fetch('data/movies.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Now you have the movie data from the JSON file
    const movies = data.movies;

    // Choose a movie 
    const movie = movies[5];
    
    const imageElement = document.getElementById("hero-image");
    const movieTitleQuery = document.querySelector("[movie-title]");
    const ratingQuery = document.querySelector("[rating]");
    const genreQuery = document.querySelector("[genres]");
    const linkToDetailQuery = document.querySelector("[link-to-detail]"); 

    // Debugging: Check if the image element is found
    if (!imageElement) {
      console.error('Image element not found!');
      return;
    }

    // Set the hero content only if the movie data exists
    if (movie) {
      // Debugging: Log the movie image path to the console
      console.log('Setting image source to:', movie.image);

      // Set the image source and alt attribute
      imageElement.src = movie.image;
      imageElement.alt = movie.alt;

      // Set the movie title
      if (movieTitleQuery) movieTitleQuery.textContent = movie.title;

      // Set the rating (creating a simple star system)
      if (ratingQuery) ratingQuery.innerHTML = "★".repeat(movie.rating) + "☆".repeat(5 - movie.rating) + ` (${movie.nr_of_reviews})`;

      // Set the genres
      if (genreQuery) {
        genreQuery.innerHTML = movie.genres.map(genre => 
          genre.text.charAt(0).toUpperCase() + genre.text.slice(1).toLowerCase()
        ).join(" &nbsp; "); // Adds more space between genres
      }

      if (linkToDetailQuery) {
        linkToDetailQuery.href = `detail-page.html?title=${encodeURIComponent(movie.title)}`;
      
      }
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
