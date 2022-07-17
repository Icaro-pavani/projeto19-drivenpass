import styled from "styled-components";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import DeleteButton from "./DeleteButton";
import BackLink from "./BackLink";

export default function CredentialInfoPage() {
  const [credential, setCredential] = useState({});
  const { user } = useContext(UserContext);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const URL = "https://ipt-drivenpass.herokuapp.com/";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get(`${URL}credentials/get/${id}`, config)
      .then(({ data }) => {
        setCredential({ ...data });
      })
      .catch((error) => console.log(error.response.data));
  }, [user, id]);

  function deleteCredential() {
    const URL = "https://ipt-drivenpass.herokuapp.com/";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (window.confirm("Você realmente deseja deletar essa credencial?")) {
      axios
        .delete(`${URL}credentials/delete/${id}`, config)
        .then(({ data }) => {
          navigate("/credentials");
        })
        .catch((error) => console.log(error.response.data));
    }
  }

  return (
    <>
      <Header />
      <CredentialInfoPageContainer>
        <h2>Credenciais</h2>
        <h3>{credential.title}</h3>
        <h4>URL</h4>
        <p>{credential.url}</p>
        <h4>Usuário</h4>
        <p>{credential.username}</p>
        <h4>Senha</h4>
        <p>{credential.password}</p>
        <BackLink />
        <DeleteButton deleteFunction={deleteCredential} />
      </CredentialInfoPageContainer>
    </>
  );
}

const CredentialInfoPageContainer = styled.div`
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

  h3 {
    font-size: 20px;
    line-height: 24px;
    color: #222222;
    margin-left: 16px;
    margin-top: 17px;
  }

  h4 {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #222222;
    margin-left: 16px;
    margin-top: 21px;
  }

  p {
    font-size: 20px;
    line-height: 24px;
    color: #222222;
    margin-left: 16px;
    margin-top: 8px;
  }
`;
