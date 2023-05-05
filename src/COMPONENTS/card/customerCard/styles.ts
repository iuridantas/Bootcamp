import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';

export const CardSection = styled.section`
  display: flex;
  padding: 8px;
  width: 224px;
  flex-direction: column;
  border-radius: 16px;
  background-color: white;
  box-shadow: #3648c5 2px 2px 10px;
  color: black;
  position: relative;
  h1 {
    font-size: 1.8rem;
    display: flex;
    justify-content: center;
  }
  h2 {
    margin-left: 8px;
    display: flex;
    font-size: 1rem;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  position: absolute;
  left: 30px;
  cursor: pointer;
  color: #c93c3c;
`;

export const EditIcon = styled(BsPencilFill)`
  position: absolute;
  left: 10px;
  cursor: pointer;
  color: #3648c5;
`;
