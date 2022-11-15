import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setIsLoading(true);

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response: any) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <p>Users page</p>
      <Link to="/">Go to Home</Link>

      {isLoading && <p>Loading ....</p>}

      <button onClick={fetchUsers}>Load data</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.email}</td>
              <td>
                <Link to={`/users/${user.id}`}>View detail</Link> |
                <Link to={`/users/${user.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}

          {isLoading && (
            <tr>
              <td colSpan={4}>Loading ...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* vi tri hien thi user detail */}
      <Outlet />
    </div>
  );
};
