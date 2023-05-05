import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';

export const Table = styled.table`
  border-collapse: collapse;
  box-shadow: #3648c5 2px 2px 10px;
  th,
  td {
    padding: 8px;
    text-align: center;
    border: 1px solid black;
  }
  th {
    font-size: 1rem;
    color: white;
    background: linear-gradient(
      180.16deg,
      #36c3fa -2.7%,
      #3648c5 -2.69%,
      #3644c3 89.71%
    );
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
export const CardSection = styled.section``;

export const DeleteIcon = styled(FaTrashAlt)`
  cursor: pointer;
  color: #c93c3c;
`;

export const EditIcon = styled(BsPencilFill)`
  cursor: pointer;
  color: #3648c5;
`;
