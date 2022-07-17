import styled from "styled-components";
import { IoAddCircle } from "react-icons/io5";

export default function AddButton() {
  return (
    <AddButtonContainer>
      <IoAddCircle className="add-button" />
    </AddButtonContainer>
  );
}

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 18px;
  right: 11px;

  .add-button {
    font-size: 75px;
    color: #005985;
  }
`;
