import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";

import { IoLockClosed } from "react-icons/io5";

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

export default function SignUpPage() {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const URL = "https://ipt-drivenpass.herokuapp.com/";

  function triggerModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function updateSignUpInfo(event) {
    const { name, value } = event.target;
    setSignUpInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function signUpUser(event) {
    event.preventDefault();
    setDisabled(true);
    const promise = axios.post(`${URL}sign-up`, signUpInfo);
    promise.then((response) => {
      navigate("/");
    });
    promise.catch((error) => {
      triggerModal();
      setErrorMessage(error.response.data);
      //   alert(error.response.data);
      setDisabled(false);
    });
  }

  return (
    <SignUpContainer>
      <IoLockClosed className="lock" />
      <h1>DrivenPass</h1>

      <StyledForm onSubmit={signUpUser}>
        <label htmlFor="email">Usuário (e-mail)</label>
        <input
          id="email"
          type="email"
          name="email"
          disabled={disabled}
          onChange={updateSignUpInfo}
          value={signUpInfo.email}
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          name="password"
          disabled={disabled}
          onChange={updateSignUpInfo}
          value={signUpInfo.password}
        />
        <button type="submit" disabled={disabled}>
          Criar
        </button>
        <button className="return" onClick={() => navigate("/")}>
          {"< Voltar"}
        </button>
      </StyledForm>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={triggerModal}
        contentLabel="Error Message"
        style={modalStyles}
      >
        <h2 style={h2ModalStyle}>Cadastro Inválido</h2>
        <h3 style={h3ModalStyle}>{errorMessage}</h3>
        <button style={buttonModalStyle} onClick={triggerModal}>
          Ok
        </button>
      </Modal>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13px;

  .lock {
    font-size: 164px;
    color: #005985;
  }

  h1 {
    font-family: "Righteous", cursive;
    font-size: 36px;
    line-height: 45px;
    color: #005985;
    margin-bottom: 42px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    color: #000;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 10px;
  }

  input {
    width: 250px;
    height: 40px;
    border: 3px solid #005985;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    font-family: "Recursive", sans-serif;
    font-size: 14px;
    line-height: 18px;
    padding-left: 22px;
    margin-bottom: 16px;

    &:disabled {
      background-color: #c9c9c9;
    }
  }

  button {
    width: 250px;
    height: 40px;
    border-radius: 10px;
    border: 3px solid #9bfbb0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    font-family: "Recursive", sans-serif;
    color: #000;
    background-color: #9bfbb0;
    font-size: 18px;
    line-height: 22px;
    margin-top: 32px;

    &:disabled {
      opacity: 0.5;
    }

    &.return {
      background-color: #fb9b9b;
      border: 3px solid #fb9b9b;
      margin-top: 16px;
    }
  }
`;
