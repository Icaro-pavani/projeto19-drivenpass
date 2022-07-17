import styled from "styled-components";
import { IoLockClosed } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function logout() {
    localStorage.clear();
    setUser({ token: "" });
    navigate("/");
  }

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/mypass")}>
        <IoLockClosed className="lock" />
        <h1>DrivenPass</h1>
      </Logo>
      <IoExit className="exit" onClick={logout} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 87px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 8px;
  background-color: #fff;
  z-index: 3;

  .exit {
    font-size: 54px;
    color: #005985;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-family: "Righteous", cursive;
    font-size: 36px;
    line-height: 45px;
    letter-spacing: -0.012em;
    color: #005985;
  }

  .lock {
    font-size: 64px;
    color: #005985;
  }
`;
