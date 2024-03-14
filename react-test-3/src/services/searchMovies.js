const API_KEY = import.meta.env.VITE_OMBD_API_KEY
const API_URL = import.meta.env.VITE_API_URL

export const searchMovies = async ({ search }) => {
  if (search === null) return;

  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`);
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
