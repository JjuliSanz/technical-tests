import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se pueden buscar peliculas vacias");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se pueden buscar peliculas con numeros");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const { movies } = useMovies();
  const inputRef = useRef();
  // const [error, setError] = useState(null);
  // const [search, updateSearch] = useState("");
  const { search, updateSearch, error } = useSearch();

  // Whit useRef
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const inputEl = inputRef.current;
  //   const inputValue = inputEl.value;
  //   alert(inputValue)
  // };

  // No controlled version
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // const field = Objet.fromEntries(new window.FormData(event.target)) Get object of multiple inputs
  //   const fields = new window.FormData(event.target);
  //   const query = fields.get("query");
  //   alert(query);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
            placeholder="Star Wars, Harry Potter, ..."
          />
          <button type="submit">Search</button>
        </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
