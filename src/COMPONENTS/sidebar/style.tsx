import styled from 'styled-components';

export const SMenu = styled.div`
  width: 184px;
  max-height: 100%;
  min-height: 89vh;
  display: flex;
  flex-grow: 1;
  position: relative;
  color: rgb(255, 255, 255);
  background: linear-gradient(
    180.16deg,
    #36c3fa -2.7%,
    #3648c5 -2.69%,
    #3644c3 89.71%
  );

  span {
    font-size: 1.4rem;
  }
`;

export const SNavigateMenu = styled.div`
  padding: 32px;
  height: 112px;
  width: 184px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: rgb(255, 255, 255);
    color: #3648c5;
    transform: scale(1.1);
    cursor: pointer;
  }
`;
