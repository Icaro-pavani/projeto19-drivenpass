import styled from "styled-components";
import Header from "./Header";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import { UserContext } from "../contexts/UserContext";
import BackLink from "./BackLink";
import ConfirmButton from "./ConfirmButton";

Modal.setAppElement(document.querySelector(".root"));

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "10%",
    bottom: "20%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #DBDBDB",
    display: "flex",
    flexDirection: "column",
    alignItens: "center",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "29px",
  },
  overlay: {
    backgroundColor: "rgba(0.5, 0.5,0.5, 0.6)",
  },
};

const h2ModalStyle = {
  fontSize: "18px",
  fontWeight: "700",
};

const h3ModalStyle = {
  fontSize: "18px",
  padding: "0 30px 0",
};

const buttonModalStyle = {
  fontSize: "18px",
  backgroundColor: "#9bfbb0",
  width: "250px",
  height: "40px",
  border: "3px solid #9BFBB0",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
  borderRadius: "5px",
  margin: "0 auto",
  fontFamily: `"Recursive", sans-serif`,
};

export default function CreateCredential() {
  const [credentialInfo, setCredentialInfo] = useState({
    title: "",
    url: "",
    username: "",
    password: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  function triggerModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function updateCredentialInfo(event) {
    const { name, value } = event.target;
    setCredentialInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function createCredential() {
    const URL = "https://ipt-drivenpass.herokuapp.com/";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .post(`${URL}credentials/create`, credentialInfo, config)
      .then(({ data }) => {
        triggerModal();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        triggerModal();
      });
  }

  return (
    <>
      <Header />
      <CreateCredentialContainer>
        <h2>Credenciais</h2>
        <h3>Cadastro</h3>
        <InputsContainer>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={updateCredentialInfo}
            value={credentialInfo.title}
          />
          <label htmlFor="url">URL</label>
          <input
            id="url"
            type="url"
            name="url"
            onChange={updateCredentialInfo}
            value={credentialInfo.url}
            placeholder="Inicie com https:// ou http://"
          />
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            name="username"
            onChange={updateCredentialInfo}
            value={credentialInfo.username}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="text"
            name="password"
            onChange={updateCredentialInfo}
            value={credentialInfo.password}
          />
        </InputsContainer>
        <BackLink />
        <ConfirmButton sendFunction={createCredential} />
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Credential Message"
          style={modalStyles}
        >
          {errorMessage !== "" ? (
            <>
              <h2 style={h2ModalStyle}>Ooooopss!</h2>
              <h3 style={h3ModalStyle}>{errorMessage}</h3>
              <button style={buttonModalStyle} onClick={triggerModal}>
                Ok
              </button>
            </>
          ) : (
            <>
              <h2 style={h2ModalStyle}>Muito bem!</h2>
              <h3 style={h3ModalStyle}>Cadastro feito com sucesso!</h3>
              <button
                style={buttonModalStyle}
                onClick={() => navigate("/mypass")}
              >
                Ok
              </button>
            </>
          )}
        </Modal>
      </CreateCredentialContainer>
    </>
  );
}

const CreateCredentialContainer = styled.div`
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
    margin-top: 15px;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 16px 0;

  label {
    color: #000;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    height: 40px;
    border: 3px solid #005985;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    font-family: "Recursive", sans-serif;
    font-size: 14px;
    line-height: 18px;
    padding-left: 22px;
    margin-bottom: 16px;
  }
`;
