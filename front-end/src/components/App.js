import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";

import GlobalStyle from "../theme/GlobalStyle";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import SignUpPage from "./SignUpPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/mypass"
              element={
                <PrivateRoute>
                  <h1>Test</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
