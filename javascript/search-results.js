/*sourse for the search-result conversion ect
https://chatgpt.com/share/6808fd89-2e7c-8002-87f0-39fa11598588*/

function getQueryParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("query")?.toLowerCase() || "";
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    console.log("📦 search-results.js loaded");
  
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
      let hasVisibleResults = false;
  
      articleTitle.forEach(article => {
        const isVisible = article.title.toLowerCase().startsWith(value);
        article.element.classList.toggle("hide", !isVisible);
        if (isVisible) hasVisibleResults = true;
      });
  
      movieTitle.forEach(movie => {
        const isVisible = movie.title.toLowerCase().startsWith(value);
        movie.element.classList.toggle("hide", !isVisible);
        if (isVisible) hasVisibleResults = true;
      });
  
      dataShowContainer.classList.toggle("active", hasVisibleResults);
    }
  
    Promise.all([
      fetch("data/articles.json").then(res => res.json()),
      fetch("data/movies.json").then(res => res.json())
    ])
      .then(([articlesData, moviesData]) => {
        articleTitle = articlesData.articles.map(article => {
          const dataContent = dataContentTemplate.content.cloneNode(true).children[0];
          const title = dataContent.querySelector("[data-title]");
          title.textContent = article.title;
          dataShowContainer.appendChild(dataContent);
          return { title: article.title, element: dataContent };
        });
  
        movieTitle = moviesData.movies.map(movie => {
          const dataContent = dataContentTemplate.content.cloneNode(true).children[0];
          const title = dataContent.querySelector("[data-title]");
          title.textContent = movie.title;
          dataShowContainer.appendChild(dataContent);
          return { title: movie.title, element: dataContent };
        });
  
        // Perform search AFTER DOM is ready and data is loaded
        performSearch(query);
      })
      .catch(err => {
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
          window.location.href = `search-results.html?query=${encodeURIComponent(value)}`;
        }
      }
    });
  });
  