/*sourse for the search-result conversion ect
https://chatgpt.com/share/6808fd89-2e7c-8002-87f0-39fa11598588*/

function getQueryParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("query")?.toLowerCase() || "";
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("search-results.js loaded");

  const searchInput = document.querySelector("[data-search]");
  const dataShowContainer = document.querySelector("[data-show-container]");
  const dataContentTemplate = document.querySelector("[data-content-template]");

  if (!searchInput || !dataShowContainer || !dataContentTemplate) {
    console.error(" Missing important DOM elements.");
    return;
  }

  let articleTitle = [];
  let movieTitle = [];

  const query = getQueryParam();
  searchInput.value = query;

  function performSearch(value) {
    // the .trim makes it so that blankspaces are treated as empty
    if (!value.trim()) {
      // If input is empty, hide all results and deactivate container
      articleTitle.forEach((article) => article.element.classList.add("hide"));
      movieTitle.forEach((movie) => movie.element.classList.add("hide"));
      dataShowContainer.classList.remove("active");
      return;
    }
    let hasVisibleResults = false;

    articleTitle.forEach((article) => {
      const match = article.title.toLowerCase().startsWith(value);
      article.element.classList.toggle("hide", !match);
      if (match) hasVisibleResults = true;
    });

    movieTitle.forEach((movie) => {
      const match = movie.title.toLowerCase().startsWith(value);
      movie.element.classList.toggle("hide", !match);
      if (match) hasVisibleResults = true;
    });

    dataShowContainer.classList.toggle("active", hasVisibleResults);
    console.log("Running performSearch with value:", value);
  }

  Promise.all([
    fetch("data/articles.json").then((res) => res.json()),
    fetch("data/movies.json").then((res) => res.json()),
  ])
    .then(([articlesData, moviesData]) => {
      articleTitle = articlesData.articles.map((article) => {
        const dataContent =
          dataContentTemplate.content.cloneNode(true).children[0];
        const title = dataContent.querySelector("[data-title]");
        title.href = `detail-page-articles.html?id=${article.id}`;
        title.textContent = article.title;
        dataShowContainer.appendChild(dataContent);
        return { title: article.title, element: dataContent };
      });

      movieTitle = moviesData.movies.map((movie) => {
        const dataContent =
          dataContentTemplate.content.cloneNode(true).children[0];
        const title = dataContent.querySelector("[data-title]");
        title.href = `detail-page.html?title=${movie.title}`;
        title.textContent = movie.title;
        dataShowContainer.appendChild(dataContent);
        return { title: movie.title, element: dataContent };
      });

      queueMicrotask(() => performSearch(query));
    })
    .catch((err) => {
      console.error("Failed to load data:", err);
    });

  // Listen for new input & enter key
  searchInput.addEventListener("input", (e) => {
    performSearch(e.target.value.toLowerCase());
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = searchInput.value.trim();
      if (value !== "") {
        window.location.href = `search-results.html?query=${encodeURIComponent(
          value
        )}`;
      }
    }
  });
});
