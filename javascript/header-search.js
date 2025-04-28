const iconElement = document.getElementById("icon");
const wrapperElement = document.getElementById("search-wrapper-header");

let isVisible = false;

iconElement.addEventListener("click", () => {
  if (isVisible) {
    isVisible = false;
    wrapperElement.innerHTML = ``;
  } else {
    isVisible = true;
    wrapperElement.innerHTML = `
       <div class="search-bar-wrapper">
    <div class="search-container-header">
      <input class="input-search-header" type="search" id="search-header" data-search="header">
    </div>
  </div>
      <div class="search-show-header" data-show-container></div>
       <template data-content-template>
        <div class="title-content-home">
          <a href="" class="search-result-home" id="home-search-result" data-title> </a>
        </div>
      </template>
    `;

    // AFTER inserting the HTML
    const dataContentTemplate = wrapperElement.querySelector("[data-content-template]");
    const dataShowContainer = wrapperElement.querySelector("[data-show-container]");
    const searchInput = wrapperElement.querySelector("[data-search='header']");

    let articleTitle = [];
    let movieTitle = [];
    const MAX_RESULTS = 5;

    // Search logic
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      let visibleCount = 0;
      let hasVisibleResults = false;

      articleTitle.forEach(article => article.element.classList.add("hide"));
      movieTitle.forEach(movie => movie.element.classList.add("hide"));

      if (value === "") {
        articleTitle.forEach(articles => articles.element.classList.add("hide"));
        movieTitle.forEach(movies => movies.element.classList.add("hide"));
        dataShowContainer.classList.remove("active");
        return;
      }

      for (let i = 0; i < articleTitle.length; i++) {
        const article = articleTitle[i];
        if (article.title.toLowerCase().startsWith(value)) {
          if (visibleCount < MAX_RESULTS) {
            article.element.classList.remove("hide");
            visibleCount++;
            hasVisibleResults = true;
          }
        }
      }

      for (let i = 0; i < movieTitle.length; i++) {
        const movie = movieTitle[i];
        if (movie.title.toLowerCase().startsWith(value)) {
          if (visibleCount < MAX_RESULTS) {
            movie.element.classList.remove("hide");
            visibleCount++;
            hasVisibleResults = true;
          }
        }
      }

      dataShowContainer.classList.toggle("active", hasVisibleResults);
    });

    // ENTER to redirect
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query !== "") {
          window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
        }
      }
    });

    // Fetch data
    fetch("data/articles.json")
      .then(res => res.json())
      .then(data => {
        articleTitle = data.articles.map(article => {
          const dataContent = dataContentTemplate.content.cloneNode(true).children[0];
          const title = dataContent.querySelector("[data-title]");
          title.textContent = article.title;
          dataShowContainer.appendChild(dataContent);
          return { title: article.title, element: dataContent };
        });
      });

    fetch("data/movies.json")
      .then(res => res.json())
      .then(data => {
        movieTitle = data.movies.map(movie => {
          const dataContent = dataContentTemplate.content.cloneNode(true).children[0];
          const title = dataContent.querySelector("[data-title]");
          title.textContent = movie.title;
          dataShowContainer.appendChild(dataContent);
          return { title: movie.title, element: dataContent };
        });
      });
  }
});
