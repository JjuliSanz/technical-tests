const API_KEY = '2ebfa5f9'
const API_URL = 'https://www.omdbapi.com/'
export const searchMovies = async ({ search }) => {
  if (search === null) return;

  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const json = await response.json();
    
    const movies = json.Search

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
    }));
  } catch (error) {
    throw new Error("Error searching movies")
  }
};
