import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { User } from "./pages/User";
import { Posts } from "./pages/Posts";
import { NotFound } from "./pages/NotFound";

function App(): JSX.Element | null {
  return (
    <>
      <div>
        <h1>My React</h1>

        <header>header</header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/posts" element={<Posts />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        <footer>footer</footer>
      </div>
    </>
  );
}

export default App;
