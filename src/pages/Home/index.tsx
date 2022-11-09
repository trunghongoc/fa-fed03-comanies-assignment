import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <p>Home page</p>

      <div>
        <Link to="/users">Go to Users</Link> |
        <Link to="/posts">Go to Users</Link>
      </div>
    </div>
  );
};
