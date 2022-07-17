import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { IoLockClosed } from "react-icons/io5";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const URL = "https://ipt-drivenpass.herokuapp.com/";

  function updateLoginInfo(event) {
    const { name, value } = event.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function loginUser(event) {
    event.preventDefault();
    setDisabled(true);
    const promise = axios.post(`${URL}login`, loginInfo);
    promise.then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser({ ...data });
      navigate("/mylinks");
    });
    promise.catch((error) => {
      alert(error.response.data);
      setDisabled(false);
    });
  }

  if (!!user) {
    navigate("/mypass");
  }

  return (
    <LoginContainer>
      <IoLockClosed className="lock" />
      <h1>DrivenPass</h1>

      <StyledForm onSubmit={loginUser}>
        <label htmlFor="email">Usuário (e-mail)</label>
        <input
          id="email"
          type="email"
          name="email"
          disabled={disabled}
          onChange={updateLoginInfo}
          value={loginInfo.email}
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          name="password"
          disabled={disabled}
          onChange={updateLoginInfo}
          value={loginInfo.password}
        />
        <button type="submit" disabled={disabled}>
          Acessar
        </button>
      </StyledForm>
      <Link to="/sign-up">Primeiro acesso? Crei sua conta!</Link>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
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
  padding: 0 15px 48px;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 38px;

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
  }
`;
