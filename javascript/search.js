const dataContentTemplate = document.querySelector("[data-content-template]")
const dataShowContainer = document.querySelector("[data-show-container]")

/*
sourse for the searchbar, Av Web Dev Sipmlified, retreved 23, apr - 2025.
https://www.youtube.com/watch?v=TlP5WIxVirU&list=PLYY0z1wR_QjmDCbh6DIaB6voQIPeestZ1&index=10
*/
fetch("data/articles.json")
.then(res => res.json())
.then(data => {
    data.forEach(article => {
    const dataContent = dataContentTemplate.content.cloneNode(true).children[0]
    const title = dataContent.querySelector("[data-title]")
    dataShowContainer.appendChild(dataContent)
    title.textContent = article.title;
    
    console.log(dataContent)
});
})
fetch("data/movies.json")
.then(res => res.json())
.then(data => {
    const dataContent1 = dataContentTemplate.content.cloneNode(true).children[0]
    const title1 = dataContent1.querySelector("[data-title]")
    dataShowContainer.appendChild(dataContent1)
    title1.textContent = movie.title;
    console.log(dataContent1)
})