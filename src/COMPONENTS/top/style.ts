import styled from 'styled-components';

export const HeaderComponent = styled.section`
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: linear-gradient(
      180.16deg,
      #36c3fa -2.7%,
      #3648c5 -2.69%,
      #3644c3 89.71%
    );
    cursor: pointer;
    width: 224px;
    padding: 5px;
    height: 50px;
    border-radius: 2.4rem;
    color: rgb(255, 255, 255);
    font-size: 1.6rem;
    transition: all 0.2s ease 0s;
  }

  button:hover {
    transform: scale(1.1);
  }
`;
