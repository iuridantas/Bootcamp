import styled from 'styled-components';

export const PageContainer = styled.main`
  height: 100%;
  background-color: #ffffff;
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 83vh;
  row-gap: 24px;
  box-shadow: black 2px 2px 10px;
  row-gap: 24px;
  padding: 48px 48px 0 48px;
  margin: 20px;

  h1 {
    font-size: 2.5rem;
    line-height: 54px;
  }

  button {
    margin-right: 20px;
    padding: 8px 32px 12px 32px;
    width: auto;
    align-items: center;
    height: 50px;
    font-size: 1.6rem;
    line-height: 18px;
    color: rgb(255, 255, 255);
    background: linear-gradient(
      180.16deg,
      #36c3fa -2.7%,
      #3648c5 -2.69%,
      #3644c3 89.71%
    );
    border: none;
    border-radius: 2.4rem;
    cursor: pointer;
    transition: all 0.2s ease 0s;
  }

  button:hover {
    transform: scale(1.1);
  }
`;

export const Page = styled.div`
  display: flex;
  position: relative;
`;

export const FieldsContainer = styled.div`
  display: flex;
  gap: 64px;
  margin-bottom: 40px;
`;

export const FieldsColumn = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 24px;
  margin: 16px 0px 0px;
  gap: 4.8px;
  flex-direction: column;

  label {
    margin: 10px 0 5px 0;
    font-size: 1.4rem;
    line-height: 17.6px;
  }

  input {
    font-size: 1.1rem;
    border: 1px solid #b5b5b5;
    padding: 3.2px 4.8px;
    border-radius: 5px;
    filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25));
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  select {
    font-size: 1.1rem;
    border: 1px solid #b5b5b5;
    padding: 3.2px 4.8px;
    border-radius: 5px;
    filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25));
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
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
