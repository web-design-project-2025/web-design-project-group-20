# web-design-project-group-20

Hello! Welcome to the Web Design Project of group 20.

We have made a movie review site, focused on classic movies from the 20th century!

Features on our site consists of:

♦ A search-bar on the home page hero image, and a smaller search-bar dynamically inserted in the header. You can search
for the titles of movies and articles.

♦ Dark mode and light mode. The standard is the light mode, and through account settings you can change between the two.
If you were to add another page and want to keep the dark mode you have to use "body.dark-mode _insert ruleset_{}",
for example: "body.dark-mode .home-movies{}".

♦ Two pages focused on showing the movies you can review and featured articles available to read more about.
For movie list: "movie-list.html" and article list: "article-list.html". When interacting with a movie or review,
you navigate to a detailed page about the object clicked.

♦ You can sign up and log in to an account that gets stored in your local storage. While you are logged in you can review
movies and add movies to, and delete movies from, your watch list.

♦ Writing reviews is possible from movie detail pages. You can write a title, some text, and leave a rating by clicking on
the stars. You can only leave one review per movie. If the logged in user have already written a review, this will be displayed
to them. Otherwise the first written review (by users on the local storage) for each movie will be shown.

♦ The reviews for movies that already exists are written in the "data/movies.json", and can be added in the same way,
as long as you also add another user in the "javascript/detail-page.js" and "detail-page.html".

♦ The users for the reviews are called using "Random User Generator API". Where we use an image and username. The number
of users can be altered in the "javascript/detail-page.js" fetch.

♦ The home page have a hero image that changes between four movies, the number of movies can be altered through the "javascript/hero.js".

♦ When the screen gets smaller a drop down menu will be available with the same options as the header.

If you want to add more movies to the movie list, you can access the current movie data in "data/movies.json" and
follow the same setup as what's currently being used. We also have the same setup of data for articles in "data/articles.json",
where you can add images, and text in different paragraphs.

If you want to experience the website as a user, you should:

1. create an account.
2. sign in.
3. add your favorite movies to your watch list.
4. watch them!
5. then review the movie as you wish.
6. if the movie was to your liking, look if there is a matching article to read further.
