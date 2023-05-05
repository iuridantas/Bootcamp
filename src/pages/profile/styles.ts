import styled from 'styled-components';

export const PageContainer = styled.div`
  height: 100%;
  background-color: #ffffff;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: black 2px 2px 10px;
  row-gap: 24px;
  padding: 20px 0 10px 400px;
  margin: 20px;

  h1 {
    font-size: 2.5rem;
    padding: 0 0 50px 170px;
  }
  h2 {
    font-size: 1.8rem;
    padding: 0 0 0 170px;
  }
  h3 {
    font-size: 1.4rem;
  }
`;

export const Page = styled.div`
  display: flex;
  position: relative;
`;

export const FieldsContainer = styled.div`
  display: flex;
  padding: 10px;
  width: 50%;
  border-radius: 16px;
  background-color: white;
  box-shadow: navy 2px 2px 10px;
  color: black;
  flex-direction: column;
  gap: 5px;
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
