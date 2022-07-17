import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";

export default function DeleteButton({ deleteFunction }) {
  return (
    <DeleteButtonContainer onClick={() => deleteFunction()}>
      <IoCloseCircle className="delete-button" />
    </DeleteButtonContainer>
  );
}

const DeleteButtonContainer = styled.div`
  position: fixed;
  bottom: 18px;
  right: 11px;
  z-index: 3;

  .delete-button {
    font-size: 75px;
    color: #f52424;
  }
`;
