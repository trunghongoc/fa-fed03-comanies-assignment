import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const isLogedIn = false;

  return <div>{isLogedIn ? children : <Navigate to="/login" />}</div>;
};
