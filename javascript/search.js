/*
sourses for the searchbar, Av Web Dev Sipmlified, retreved 23, apr - 2025.
https://www.youtube.com/watch?v=TlP5WIxVirU&list=PLYY0z1wR_QjmDCbh6DIaB6voQIPeestZ1&index=10
edited to fit senario and bug fixes:
https://chatgpt.com/share/6808d0fd-3138-8002-a242-f760ef828899
sligt edits regarding visability
https://chatgpt.com/share/6808f37e-08ac-8002-b37d-6f0941dd8589 
edits to max visability
https://chatgpt.com/share/6808fac7-2550-8002-a76e-f02d7789adc5

*/

const dataContentTemplate = document.querySelector("[data-content-template]")
const dataShowContainer = document.querySelector("[data-show-container]")
const searchInput = document.querySelector("[data-search='home']")

let contentTitles =[]
let articleTitle = []; // Declareing globally so the event-listener can access them
let movieTitle = [];  // Declareing globally so the event listener can access them

const MAX_RESULTS = 5;   //makes it so that the home page does not get overwelmed by the titles

    // Search logic
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase()
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

  console.log(articleTitle, movieTitle)
})

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
    console.log(data); 
    const articles = data.articles; 
    articleTitle = articles.map(article => {
      const dataContent = dataContentTemplate.content.cloneNode(true).children[0];
      const title = dataContent.querySelector("[data-title]");
      title.href = `detail-page-articles.html?id=${article.id}`;
      title.textContent = article.title;
      dataShowContainer.appendChild(dataContent);
      return {title: article.title, element: dataContent}
    });
  });
 
fetch("data/movies.json")
  .then(res => res.json())
  .then(data => {
    console.log(data); 
    const movies = data.movies; 
    movieTitle = movies.map(movie => {
      const dataContent = dataContentTemplate.content.cloneNode(true).children[0];
      const title = dataContent.querySelector("[data-title]");
      title.href = `detail-page.html?title=${movie.title}`;
      title.textContent = movie.title;
      dataShowContainer.appendChild(dataContent);
      return {title: movie.title, element: dataContent}
    });
  })

