import styled from "styled-components";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import DeleteButton from "./DeleteButton";
import BackLink from "./BackLink";

export default function WifiInfoPage() {
  const [wifi, setWifi] = useState({});
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
      .get(`${URL}wifis/get/${id}`, config)
      .then(({ data }) => {
        setWifi({ ...data });
      })
      .catch((error) => console.log(error.response.data));
  }, [user, id]);

  function deleteWifi() {
    const URL = "https://ipt-drivenpass.herokuapp.com/";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (window.confirm("Você realmente deseja deletar esse wi-fi?")) {
      axios
        .delete(`${URL}wifis/delete/${id}`, config)
        .then(({ data }) => {
          navigate("/wifis");
        })
        .catch((error) => console.log(error.response.data));
    }
  }

  return (
    <>
      <Header />
      <WifiInfoPageContainer>
        <h2>Senhas de Wi-fi</h2>
        <h3>{wifi.title}</h3>
        <h4>Nome da rede Wi-fi</h4>
        <p>{wifi.wifiName}</p>
        <h4>Senha</h4>
        <p>{wifi.password}</p>
        <BackLink />
        <DeleteButton deleteFunction={deleteWifi} />
      </WifiInfoPageContainer>
    </>
  );
}

const WifiInfoPageContainer = styled.div`
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
