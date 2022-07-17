import styled from "styled-components";
import Header from "./Header";
import {
  IoEnter,
  IoWallet,
  IoPencil,
  IoWifi,
  IoDocumentText,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import BackLink from "./BackLink";

export default function TypeCreationPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <TypeCreationPageContainer>
        <h2>Categoria</h2>
        <ul>
          <li onClick={() => navigate("/credentials/create")}>
            <Info>
              <IoEnter className="icon" />
              <p>Credenciais</p>
            </Info>
          </li>
          <li onClick={() => navigate("/notes/create")}>
            <Info>
              <IoPencil className="icon" />
              <p>Notas seguras</p>
            </Info>
          </li>
          <li>
            <Info onClick={() => navigate("/cards/create")}>
              <IoWallet className="icon" />
              <p>Cartões</p>
            </Info>
          </li>
          <li>
            <Info onClick={() => navigate("/wifis/create")}>
              <IoWifi className="icon" />
              <p>Senhas de Wi-fi</p>
            </Info>
          </li>
          <li>
            <Info onClick={() => navigate("/documents/create")}>
              <IoDocumentText className="icon" />
              <p>Documentos</p>
            </Info>
          </li>
        </ul>
        <BackLink />
      </TypeCreationPageContainer>
    </>
  );
}

const TypeCreationPageContainer = styled.div`
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
