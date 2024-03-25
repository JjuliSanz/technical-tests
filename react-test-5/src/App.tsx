import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import { UserLists } from "./components/UserLists";
import { SortBy, User } from "./types.d";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColorClick = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  // const sortedUsers = sortByCountry
  //   ? [...users].sort((a, b) => {
  //       return a.location.country.localeCompare(b.location.country);
  //     })
  //   : users;

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });

    // if (sorting === SortBy.NONE) return filteredUsers;

    // if (sorting === SortBy.COUNTRY) {
    //   return filteredUsers.toSorted((a,b) => a.location.country.localeCompare(b.location.country))
    // }

    // if (sorting === SortBy.NAME) {
    //   return filteredUsers.toSorted((a,b) => a.name.first.localeCompare(b.name.first))
    // }

    // if (sorting === SortBy.LAST) {
    //   return filteredUsers.toSorted((a,b) => a.name.last.localeCompare(b.name.last))
    // }

  }, [filteredUsers, sorting]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((result) => result.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((error) => console.error(error));
  }, []);
  // console.log(users);

  return (
    <div className="App">
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={() => toggleColorClick()}>Colorear</button>
        <button onClick={() => toggleSortByCountry()}>
          {sorting === SortBy.COUNTRY ? "No ordenar" : "Ordenar por pais"}
        </button>
        <button onClick={() => handleReset()}>Reset</button>
        <input
          type="text"
          onChange={(e) => setFilterCountry(e.target.value)}
          placeholder="Filtrar por pais"
        />
      </header>
      <main>
        <UserLists
          users={sortedUsers}
          showColors={showColors}
          deleteUser={handleDelete}
          changeSorting={handleChangeSort}
        />
      </main>
    </div>
  );
}

export default App;
