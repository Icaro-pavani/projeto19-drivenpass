import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";

import GlobalStyle from "../theme/GlobalStyle";
import CredentialInfoPage from "./CredentialInfoPage";
import CredentialsPage from "./CredentialsPage";
import LoginPage from "./LoginPage";
import MyPassPage from "./MyPassPage";
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
                  <MyPassPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/credentials"
              element={
                <PrivateRoute>
                  <CredentialsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/credentials/:id"
              element={
                <PrivateRoute>
                  <CredentialInfoPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
