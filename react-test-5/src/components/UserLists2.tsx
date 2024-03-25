import { SortBy, type User } from "../types.d";

interface Props {
  users: User[];
  showColors: boolean;
  handleDeleteUser: (email: string) => void;
  handleChangeSort: (sort: SortBy) => void;
}

export function UserLists2({ users, showColors, handleDeleteUser, handleChangeSort }: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th className="pointer" onClick={() => handleChangeSort(SortBy.NAME)}>Nombre</th>
          <th className="pointer" onClick={() => handleChangeSort(SortBy.LAST)}>Apellido</th>
          <th className="pointer" onClick={() => handleChangeSort(SortBy.COUNTRY)}>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={showColors ? 'table--showColors' : ''}>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColors ? backgroundColor : "transparent";
          return (
            // <tr key={user.email} style={{ background: color }}>
            <tr key={user.email} >
              <td>
                <img src={user.picture.thumbnail} alt="" />
              </td>
              <td>
                <p>{user.name.first}</p>
              </td>
              <td>
                <p>{user.name.last}</p>
              </td>
              <td>
                <p>{user.location.country}</p>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
