import withResults from "../mocks/with-results.json";
import noResultsMovies from "../mocks/no-results.json";
import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  // const getMovies = () => {
  //   if (search) {
  //     // setResponseMovies(withResults);
  //     fetch(`http://www.omdbapi.com/?apikey=2ebfa5f9&s=${search}`)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setResponseMovies(json);
  //       });
  //   } else {
  //     setResponseMovies(noResultsMovies);
  //   }
  // };

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    if (!movies) return;
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
