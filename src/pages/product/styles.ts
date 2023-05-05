import styled from 'styled-components';

export const PageContainer = styled.div`
  height: 100%;
  background-color: #ffffff;
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 83vh;
  box-shadow: black 2px 2px 10px;
  row-gap: 24px;
  padding: 0 0 10px 88px;
  margin: 20px;
  h1 {
    margin-top: 15px;
    font-size: 2.5rem;
    line-height: 54px;
  }
`;

export const Page = styled.div`
  display: flex;
  position: relative;
`;

export const PageTop = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 50px 30px 0 0;

  select {
    appearance: none;
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
    width: 70px;
    height: 50px;
    color: rgb(255, 255, 255);
    border-radius: 2.4rem;
    font-size: 1.6rem;
    padding: 5px 5px 5px 12px;
    option {
      color: #000;
      background-color: #fff;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    border: none;
    background: linear-gradient(
      180.16deg,
      #36c3fa -2.7%,
      #3648c5 -2.69%,
      #3644c3 89.71%
    );
    cursor: pointer;
    width: 224px;
    padding: 0 0 5px 0;
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

export const FieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  gap: 32px;
`;

export const Load = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 50px;
    margin: 20px auto;
    border-radius: 50%;
    border: 6px solid #ccc;
    border-top-color: #000;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  width: 16px;
  padding: 2px;
  margin: 0px 5px;
  height: auto;
  border-radius: 8px;
  color: rgb(255, 255, 255);
  background: linear-gradient(
    180.16deg,
    #36c3fa -2.7%,
    #3648c5 -2.69%,
    #3644c3 89.71%
  );
  a {
    text-decoration: none;
    color: rgb(255, 255, 255);
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0 0 0;
`;
