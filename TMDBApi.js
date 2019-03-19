const API_TOKEN = "8a6c06be55d90e92219feff360f72815"

export function getFilmsFromApiWithSearchedText (text){
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  return fetch(url)//fetch = librairy js inclut dans l'application
    .then((response) => response.json())
    .catch((error) => console.log(error))

}//methode appele API TMDB et retourne les film en fonction d'un texte recherche
