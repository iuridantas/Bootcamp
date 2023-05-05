import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';

export const CardSection = styled.section`
  display: flex;
  padding: 8px;
  width: 360px;
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

  button {
    width: auto;
    padding: 0 10px 0 10px;
    margin: 0px 5px;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 1rem;
    line-height: 18px;
    color: rgb(255, 255, 255);
    background: linear-gradient(
      180.16deg,
      #36c3fa -2.7%,
      #3648c5 -2.69%,
      #3644c3 89.71%
    );
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
  }

  button:hover {
    transform: scale(1.1);
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  justify-content: space-evenly;
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
