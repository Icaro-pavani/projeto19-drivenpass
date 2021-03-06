import styled from "styled-components";
import Header from "./Header";
import { IoDocumentText } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import AddButton from "./AddButton";
import BackLink from "./BackLink";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
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
      .get(`${URL}documents`, config)
      .then(({ data }) => {
        setDocuments([...data]);
      })
      .catch((error) => console.log(error.response.data));
  }, [user]);

  return (
    <>
      <Header />
      <DocumentsPageContainer>
        <h2>Cartões</h2>
        <ul>
          {documents.map((document, index) => {
            return (
              <li
                key={index}
                onClick={() => navigate(`/documents/${document.id}`)}
              >
                <Info>
                  <IoDocumentText className="icon" />
                  <p>{document.title}</p>
                </Info>
              </li>
            );
          })}
        </ul>
        <AddButton redirectFunction={() => navigate("/documents/create")} />
        <BackLink />
      </DocumentsPageContainer>
    </>
  );
}

const DocumentsPageContainer = styled.div`
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
