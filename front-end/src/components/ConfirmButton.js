import styled from "styled-components";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function ConfirmButton({ sendFunction }) {
  return (
    <ConfirmButtonContainer onClick={() => sendFunction()}>
      <IoCheckmarkCircle className="confirm-button" />
    </ConfirmButtonContainer>
  );
}

const ConfirmButtonContainer = styled.div`
  position: fixed;
  bottom: 18px;
  right: 11px;
  z-index: 3;

  .confirm-button {
    font-size: 75px;
    color: #9bfbb0;
  }
`;
