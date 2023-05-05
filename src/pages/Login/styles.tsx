import styled from 'styled-components';

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 660px;
  width: 100%;

  h1 {
    font-size: 4rem;
    line-height: 36px;
    color: #3644c3;
    margin: 0 0 60px;
  }

  form {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    line-height: 20px;
  }

  label {
    color: #5a5a5f;
    font-size: 2rem;
  }

  input {
    padding: 12px;
    border-color: #b6b6bb;
    border-radius: 8px;
    background-color: #ffffff;
    width: 480px;
  }

  button {
    padding: 8px 0 8px 0;
    margin: 20px 0 0 180px;
    font-size: 1.5rem;
    color: #ffff;
    background-color: #004eda;
    border-radius: 8px;
    cursor: pointer;
    width: 120px;
  }
`;

export const Load = styled.div`
  position: fixed;
  margin: 250px 0 0 0;
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
