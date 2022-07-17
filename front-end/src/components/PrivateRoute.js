import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);
  return user?.token ? children : <Navigate to="/" />;
}
