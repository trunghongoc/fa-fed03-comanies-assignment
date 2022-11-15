import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <p>Home page</p>

      <div>
        <Link to="/users">Go to Users</Link> |
        <Link to="/users/create">Go to Users create</Link> |
        <Link to="/posts">Go to Posts</Link>
      </div>
    </div>
  );
};

export default Home;
