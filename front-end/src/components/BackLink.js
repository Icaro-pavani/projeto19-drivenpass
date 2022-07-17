import styled from "styled-components";
import { Link } from "react-router-dom";

export default function BackLink() {
  return <BackLinkContainer to={-1}>{"< Voltar"}</BackLinkContainer>;
}

const BackLinkContainer = styled(Link)`
  position: fixed;
  left: 16px;
  bottom: 44px;
  font-size: 18px;
  line-height: 22px;
  color: #000;
`;
