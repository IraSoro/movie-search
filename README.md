# Movie search

This application allows users to view a list of films and TV series, as well as information about a specific film or TV series, using the KinoPoisk API.

## Setup instructions

```shell
npm install
TOKEN=<Token_for_access_to_API> npm start
```

You can get a token [here](https://kinopoisk.dev/).

API documentation [here](https://kinopoiskdev.readme.io/reference/%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D1%8B-%D1%81%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B-%D0%B8-%D1%82%D0%B4).

## Technology stack

- Frontend Framework: React (version 18)
- Component Library: Material-UI (MUI)
- Bundler: Webpack
- Node.js: 18 or higher
- Package Manager: npm
- Routing: React Router v6
- Programming Language: TypeScript

## Functional Features

### Movie List Page

- Display a list of movies and TV shows.
- Pagination.
- Option to select the number of movies to display per page (default is 10).
- Filtering results (by year, country, and age rating).
- Search by movie title.
- Navigate to the movie details page from the list.

### Movie Details Page

- Display information about the movie or TV show: title, description, rating, list of actors, list of seasons, user reviews, posters (in a carousel).
- Display a list of similar movies (in a carousel).
- "Back" button to return to the list with saved filters and page number.

### Additional Features

- Ability to share search results via a link.
- Debounced search with a 1-second delay after the last character is typed.
