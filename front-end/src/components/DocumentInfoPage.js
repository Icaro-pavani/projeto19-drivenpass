import styled from "styled-components";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import DeleteButton from "./DeleteButton";
import BackLink from "./BackLink";

export default function DocumentInfoPage() {
  const [document, setDocument] = useState({});
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
      .get(`${URL}documents/get/${id}`, config)
      .then(({ data }) => {
        setDocument({ ...data });
      })
      .catch((error) => console.log(error.response.data));
  }, [user, id]);

  function deleteDocument() {
    const URL = "https://ipt-drivenpass.herokuapp.com/";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (window.confirm("Você realmente deseja deletar esse documento?")) {
      axios
        .delete(`${URL}documents/delete/${id}`, config)
        .then(({ data }) => {
          navigate("/documents");
        })
        .catch((error) => console.log(error.response.data));
    }
  }

  return (
    <>
      <Header />
      <DocumentInfoPageContainer>
        <h2>Documentos</h2>
        <h3>{document.title}</h3>
        <h4>Tipo do documento</h4>
        <p>{document.type}</p>
        <h4>Nome completo</h4>
        <p>{document.fullName}</p>
        <h4>Data de emissão</h4>
        <p>{document.expeditionDate}</p>
        <h4>Válido até</h4>
        <p>{document.expirationDate}</p>
        <h4>Número do documento</h4>
        <p>{document.docNumber}</p>
        <h4>Orgão emissor</h4>
        <p>{document.issuer}</p>
        <BackLink />
        <DeleteButton deleteFunction={deleteDocument} />
      </DocumentInfoPageContainer>
    </>
  );
}

const DocumentInfoPageContainer = styled.div`
  margin-top: 87px;
  margin-bottom: 100px;

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
