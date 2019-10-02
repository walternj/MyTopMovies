API_TOKEN= '5edf2607b4a00acba479f6e073acaec2'

export function getFilmsFromApiWithSearchText(text, page) {
    const url= 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr-FR&query=' + text + '&include_adult=false&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
} 

export function getPopularFilms(page) {
  const url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_TOKEN + '&language=fr-FR&vote_count.gte=1000&sort_by=release_date.desc&sort_by=vote_average.desc&page='
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getLatestFilmsFromApi (page) {
  return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' )
      .then((response) => response.json())
      .catch((error) => console.error(error));
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}


export function getFilmDetailFromApi (id) {
  const url= 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr-FR'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error)) 
}