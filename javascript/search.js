/*
sourse for the searchbar, Av Web Dev Sipmlified, retreved 23, apr - 2025.
https://www.youtube.com/watch?v=TlP5WIxVirU&list=PLYY0z1wR_QjmDCbh6DIaB6voQIPeestZ1&index=10
edited to fit senario and bug fixes:
https://chatgpt.com/share/6808d0fd-3138-8002-a242-f760ef828899
*/

const dataContentTemplate = document.querySelector("[data-content-template]")
const dataShowContainer = document.querySelector("[data-show-container]")
const searchInput = document.querySelector("[data-search]")

let contentTitles =[]
let articleTitle = []; // Declareing globally so the event listener can access them
let movieTitle = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase()
  articleTitle.forEach(articles=>{
    const isVisible = articles.title.toLowerCase().includes(value)
    articles.element.classList.toggle("hide", !isVisible)
  })
  movieTitle.forEach(movies=>{
    const isVisible = movies.title.toLowerCase().includes(value)
    movies.element.classList.toggle("hide", !isVisible)
  })

  console.log(articleTitle, movieTitle)
})


fetch("data/articles.json")
  .then(res => res.json())
  .then(data => {
    console.log(data); 
    const articles = data.articles; // Access the articles array inside the object
    articleTitle = articles.map(article => {
      const dataContent = dataContentTemplate.content.cloneNode(true).children[0];
      const title = dataContent.querySelector("[data-title]");
      title.textContent = article.title;
      dataShowContainer.appendChild(dataContent);
      return {title: article.title, element: dataContent}
    });
  })
  .catch(err => console.error("Failed to load articles:", err));

fetch("data/movies.json")
  .then(res => res.json())
  .then(data => {
    console.log(data); 
    const movies = data.movies; // Assuming similar structure for movies (i.e., `movies` key)
    movieTitle = movies.map(movie => {
      const dataContent = dataContentTemplate.content.cloneNode(true).children[0];
      const title = dataContent.querySelector("[data-title]");
      title.textContent = movie.title;
      dataShowContainer.appendChild(dataContent);
      return {title: movie.title, element: dataContent}
    });
  })
  .catch(err => console.error("Failed to load movies:", err));
