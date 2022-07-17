import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";

import GlobalStyle from "../theme/GlobalStyle";
import CardInfoPage from "./CardInfoPage";
import CardsPage from "./CardsPage";
import CreateCard from "./createCard";
import CreateCredential from "./CreateCredential";
import CreateNote from "./CreateNote";
import CredentialInfoPage from "./CredentialInfoPage";
import CredentialsPage from "./CredentialsPage";
import LoginPage from "./LoginPage";
import MyPassPage from "./MyPassPage";
import NoteInfoPage from "./NoteInfoPage";
import NotesPage from "./NotesPage";
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
            <Route
              path="/credentials/create"
              element={
                <PrivateRoute>
                  <CreateCredential />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <NotesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <PrivateRoute>
                  <NoteInfoPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes/create"
              element={
                <PrivateRoute>
                  <CreateNote />
                </PrivateRoute>
              }
            />
            <Route
              path="/cards"
              element={
                <PrivateRoute>
                  <CardsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/cards/:id"
              element={
                <PrivateRoute>
                  <CardInfoPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/cards/create"
              element={
                <PrivateRoute>
                  <CreateCard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
