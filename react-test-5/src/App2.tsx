import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import { SortBy, User } from "./types.d";
import { UserLists2 } from "./components/UserLists2";

function App2() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColor, setShowColor] = useState(false);
  // const [sortByCountry, setSortByCountry] = useState(false);
  const originalsUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((res) => {
        setUsers(res.results);
        originalsUsers.current = res.results;
      })
      .catch((error) => console.error(error));
  }, []);
  // console.log(users);

  const toggleColors = () => {
    setShowColor(!showColor);
  };

  const toggleSortByCountry = () => {
    // if (sorting === SortBy.NONE) setSorting(SortBy.COUNTRY);
    // else setSorting(SortBy.NONE);
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const usersFilteredByCountry = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsersByCountry = useMemo(() => {
    // return sortByCountry
    //   ? usersFilteredByCountry.toSorted((a, b) =>
    //       a.location.country.localeCompare(b.location.country)
    //     )
    //   : usersFilteredByCountry;

    if (!usersFilteredByCountry) return []; // Provide a default value if undefined

    if (sorting === SortBy.NONE) return usersFilteredByCountry;

    if (sorting === SortBy.COUNTRY)
      return usersFilteredByCountry.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
    if (sorting === SortBy.NAME)
      return usersFilteredByCountry.toSorted((a, b) =>
        a.name.first.localeCompare(b.name.first)
      );
    if (sorting === SortBy.LAST)
      return usersFilteredByCountry.toSorted((a, b) =>
        a.name.last.localeCompare(b.name.last)
      );
   return usersFilteredByCountry;
  }, [usersFilteredByCountry, sorting]);

  const handleDeleteUser = (email: string) => {
    const deletedUsers = users.filter((user) => user.email !== email);
    setUsers(deletedUsers);
  };

  const handleResetUser = () => {
    setUsers(originalsUsers.current);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  return (
    <div className="App">
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? "No ordenar" : "Ordenar por pais"}
        </button>
        <button onClick={handleResetUser}>Reset</button>
        <input
          type="text"
          placeholder="Filtrar por pais"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        <UserLists2
          users={sortedUsersByCountry}
          showColors={showColor}
          handleDeleteUser={handleDeleteUser}
          handleChangeSort={handleChangeSort}
        />
      </main>
    </div>
  );
}

export default App2;
