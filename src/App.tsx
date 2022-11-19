import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
// import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { User } from "./pages/User";
import { UserEdit } from "./pages/UserEdit";
import { UserCreate } from "./pages/UserCreate";
import { Posts } from "./pages/Posts";
import { NotFound } from "./pages/NotFound";
import { Header } from "./components/Header";
import { Todo } from "./pages/Todo";
import { PrivateRoute } from "./components/PrivateRoute";
import { Bootstrap } from "./pages/Bootstrap";
import { Companies } from "./pages/Companies";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = lazy(() => import("./pages/Home"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<>loading ...</>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "posts",
    element: <Posts />,
  },

  {
    path: "users",
    element: <Users />,
    children: [
      {
        path: ":id",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
      {
        path: ":id/edit",
        element: (
          <PrivateRoute>
            <UserEdit />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "users/create",
    element: <UserCreate />,
  },

  {
    path: "todo",
    element: <Todo />,
  },
  {
    path: "bootstrap",
    element: <Bootstrap />,
  },
  {
    path: "companies",
    element: <Companies />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

function App(): JSX.Element {
  return (
    <>
      <div>
        <h1>My React</h1>

        <Header />

        {/* <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />

            <Route path="users" element={<Users />}>
              <Route path=":id" element={<User />} />
              <Route path=":id/edit" element={<UserEdit />} />
            </Route>

            <Route path="posts" element={<Posts />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter> */}

        <Suspense>
          <RouterProvider
            router={routes}
            fallbackElement={<div>Loading ...</div>}
          />
        </Suspense>

        <footer>footer</footer>
      </div>
    </>
  );
}

export default App;
