import { API_TOKEN } from 'react-native-dotenv'
var I18n = require('react-native-i18n')

export function getFilmsFromApiWithSearchText(text, page) {
    const url= 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=en&query=' + text + '&include_adult=false&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
} 

export function getPopularFilms(page) {
  const url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_TOKEN + '&language=en&vote_count.gte=1000&sort_by=release_date.desc&sort_by=vote_average.desc&page='
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getLatestFilmsFromApi (page) {
  return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=en&page=' )
      .then((response) => response.json())
      .catch((error) => console.error(error));
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}


export function getFilmDetailFromApi (id) {
  const url= 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=en'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error)) 
}