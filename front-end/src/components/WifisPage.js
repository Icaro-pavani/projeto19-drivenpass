import styled from "styled-components";
import Header from "./Header";
import { IoWifi } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import AddButton from "./AddButton";
import BackLink from "./BackLink";

export default function WifisPage() {
  const [wifis, setWifis] = useState([]);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const URL = "https://ipt-drivenpass.herokuapp.com/";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get(`${URL}wifis`, config)
      .then(({ data }) => {
        setWifis([...data]);
      })
      .catch((error) => console.log(error.response.data));
  }, [user]);

  return (
    <>
      <Header />
      <WifisPageContainer>
        <h2>Senhas de Wi-fi</h2>
        <ul>
          {wifis.map((wifi, index) => {
            return (
              <li key={index} onClick={() => navigate(`/wifis/${wifi.id}`)}>
                <Info>
                  <IoWifi className="icon" />
                  <p>{wifi.title}</p>
                </Info>
              </li>
            );
          })}
        </ul>
        <AddButton redirectFunction={() => navigate("/wifis/create")} />
        <BackLink />
      </WifisPageContainer>
    </>
  );
}

const WifisPageContainer = styled.div`
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
