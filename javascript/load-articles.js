let articles = [];
const content = document.getElementById("articles_content");
const homeContent = document.getElementById("home-articles-content");

async function loadData() {
  const articleResponse = await fetch("data/articles.json");
  const articleJSON = await articleResponse.json();
  articles = articleJSON.articles;

  if (document.getElementById("articles_content")) {
    renderContent();
  } else if (document.getElementById("home-articles-content")) {
    homeRenderArticles();
  }
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

  const articleAuthor = document.createElement("p");
  articleAuthor.innerText = article.author;
  articleAuthor.classList.add("article-author");
  articleElement.appendChild(articleAuthor);

  return articleElement;
}

function renderContent() {
  content.innerHTML = "";

  for (let article of articles) {
    const articleElement = createArticleElement(article);
    content.appendChild(articleElement);
  }
}

function homeRenderArticles() {
  homeContent.innerHTML = "";

  while (articles.length > 3) {
    let art = Math.floor(Math.random() * articles.length);
    articles.splice(art, 1);
  }

  for (let article of articles) {
    const articleElement = createArticleElement(article);
    homeContent.appendChild(articleElement);
  }
}

loadData();
