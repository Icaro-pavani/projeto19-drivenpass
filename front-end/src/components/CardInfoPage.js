import styled from "styled-components";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import DeleteButton from "./DeleteButton";
import BackLink from "./BackLink";

export default function CardInfoPage() {
  const [card, setCard] = useState({});
  const { user } = useContext(UserContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const types = {
    credit: "Crédito",
    debit: "Débito",
    both: "Crédito e Débito",
  };

  useEffect(() => {
    const URL = "https://ipt-drivenpass.herokuapp.com/";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get(`${URL}cards/get/${id}`, config)
      .then(({ data }) => {
        setCard({ ...data });
      })
      .catch((error) => console.log(error.response.data));
  }, [user, id]);

  function deleteCard() {
    const URL = "https://ipt-drivenpass.herokuapp.com/";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (window.confirm("Você realmente deseja deletar esse cartão?")) {
      axios
        .delete(`${URL}cards/delete/${id}`, config)
        .then(({ data }) => {
          navigate("/cards");
        })
        .catch((error) => console.log(error.response.data));
    }
  }

  return (
    <>
      <Header />
      <CardInfoPageContainer>
        <h2>Cartões</h2>
        <h3>{card.title}</h3>
        <h4>Número do cartão</h4>
        <p>{card.cardNumber}</p>
        <h4>Nome no cartão</h4>
        <p>{card.cardholderName}</p>
        <h4>CVV</h4>
        <p>{card.CVV}</p>
        <h4>Válido até</h4>
        <p>{card.expirationDate}</p>
        <h4>Senha</h4>
        <p>{card.password}</p>
        <h4>É virtual</h4>
        <p>{card.isVirtual ? "Sim" : "Não"}</p>
        <h4>Tipo</h4>
        <p>{types[card.type]}</p>
        <BackLink />
        <DeleteButton deleteFunction={deleteCard} />
      </CardInfoPageContainer>
    </>
  );
}

const CardInfoPageContainer = styled.div`
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
