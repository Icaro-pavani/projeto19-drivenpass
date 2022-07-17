import styled from "styled-components";
import Header from "./Header";
import {
  IoEnter,
  IoWallet,
  IoPencil,
  IoWifi,
  IoDocumentText,
} from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import AddButton from "./AddButton";

export default function MyPassPage() {
  const [passwords, setPasswords] = useState({
    credentials: [],
    notes: [],
    cards: [],
    wifis: [],
    documents: [],
  });
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    function getPasswords(type) {
      const URL = "https://ipt-drivenpass.herokuapp.com/";
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .get(`${URL}${type}`, config)
        .then(({ data }) => {
          setPasswords((prevState) => ({ ...prevState, [type]: data }));
        })
        .catch((error) => console.log(error.response.data));
    }

    getPasswords("credentials");
    getPasswords("notes");
    getPasswords("cards");
    getPasswords("wifis");
    getPasswords("documents");
  }, [user]);

  return (
    <>
      <Header />
      <MyPassPageContainer>
        <h2>Minhas senhas</h2>
        <ul>
          <li onClick={() => navigate("/credentials")}>
            <Info>
              <IoEnter className="icon" />
              <p>Credenciais</p>
            </Info>
            <Quantity>{passwords.credentials.length}</Quantity>
          </li>
          <li onClick={() => navigate("/notes")}>
            <Info>
              <IoPencil className="icon" />
              <p>Notas seguras</p>
            </Info>
            <Quantity>{passwords.notes.length}</Quantity>
          </li>
          <li>
            <Info onClick={() => navigate("/cards")}>
              <IoWallet className="icon" />
              <p>Cartões</p>
            </Info>
            <Quantity>{passwords.cards.length}</Quantity>
          </li>
          <li>
            <Info onClick={() => navigate("/wifis")}>
              <IoWifi className="icon" />
              <p>Senhas de Wi-fi</p>
            </Info>
            <Quantity>{passwords.wifis.length}</Quantity>
          </li>
          <li>
            <Info onClick={() => navigate("/documents")}>
              <IoDocumentText className="icon" />
              <p>Documentos</p>
            </Info>
            <Quantity>{passwords.documents.length}</Quantity>
          </li>
        </ul>
        <AddButton />
      </MyPassPageContainer>
    </>
  );
}

const MyPassPageContainer = styled.div`
  margin-top: 87px;
  h2 {
    width: 100%;
    background-color: #005985;
    height: 41px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    line-height: 22px;
    padding-left: 16px;
  }

  ul {
    width: 100%;
    padding: 0 16px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;

  .icon {
    font-size: 48px;
    color: #005985;
  }

  p {
    font-size: 18px;
    line-height: 22px;
    color: #222;
    margin-left: 18px;
  }
`;

const Quantity = styled.h3`
  width: 35px;
  height: 35px;
  background-color: #005985;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
`;
