import styled from 'styled-components';

export const Container = styled.div`
  justify-content: center;
  align-items: center;
  padding: 16px;
  display: flex;
  background: linear-gradient(
    180.16deg,
    #36c3fa -2.7%,
    #3648c5 -2.69%,
    #3644c3 89.71%
  );

  input {
    text-align: center;
    position: absolute;
    width: 50%;
    height: 10px;
    padding: 16px 24px;
    border-radius: 8px;
    margin-left: 18%;
  }

  h1 {
    color: rgb(255, 255, 255);
    width: 100%;
    font-size: 2rem;
  }

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;
