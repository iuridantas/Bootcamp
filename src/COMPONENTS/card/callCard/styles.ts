import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';

export const CardSection = styled.section`
  display: flex;
  padding: 8px;
  width: 320px;
  flex-direction: column;
  border-radius: 16px;
  background-color: white;
  box-shadow: #3648c5 2px 2px 10px;
  color: black;
  position: relative;
  h2 {
    margin-left: 8px;
    display: flex;
    font-size: 1rem;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #c93c3c;
  cursor: pointer;
`;

export const EditIcon = styled(BsPencilFill)`
  position: absolute;
  top: 10px;
  right: 30px;
  color: #3648c5;
  cursor: pointer;
`;
