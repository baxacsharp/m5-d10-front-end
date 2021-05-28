const _MOVIE_TOKEN = "c531134d";

// example
// http://www.omdbapi.com/?i=tt3896198&apikey=
// returns Guardians of the Galaxy information

export async function GET_MOVIES_BY_SEARCH(searchParam) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${_MOVIE_TOKEN}&s=${searchParam}`
  );
  const data = await response.json();
  return data;
}

export async function GET_MOVIE_BY_ID(imdbID) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${_MOVIE_TOKEN}&i=${imdbID}`
  );
  const data = await response.json();
  return data;
}
