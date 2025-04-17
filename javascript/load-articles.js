let articles = [];
const contentElement = document.getElementById("articles_content");

async function loadData() {
  const articleResponse = await fetch("data/articles.json");
  const articleJSON = await articleResponse.json();
  articles = articleJSON.articles;

  renderContent();
}

function createArticleElement(article) {
  const articleElement = document.createElement("article");
  articleElement.classList.add("article-box");

  const iconElement = document.createElement("img");
  iconElement.src = article.icon;
  iconElement.classList.add("icons");
  articleElement.appendChild(iconElement);

  const articleTitle = document.createElement("p");
  articleTitle.innerText = article.title;
  articleTitle.classList.add("article-name");
  articleElement.appendChild(articleTitle);

  return articleElement;
}

function renderContent() {
  contentElement.innerHTML = "";

  for (let article of articles) {
    const articleElement = createArticleElement(article);
    contentElement.appendChild(articleElement);
  }
}

loadData();
