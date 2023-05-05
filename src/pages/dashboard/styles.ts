import styled from 'styled-components';

export const PageContainer = styled.div`
  height: 100%;
  background-color: #ffffff;
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 83vh;
  box-shadow: black 2px 2px 10px;
  padding: 70px 0 10px 120px;
  margin: 20px;
`;

export const Page = styled.div`
  display: flex;
  position: relative;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  gap: 64px;
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
  background-color: navy;
  cursor: pointer;
  width: 16px;
  padding: 2px;
  margin: 0px 5px;
  height: auto;
  border-radius: 8px;
  color: white;
  a {
    text-decoration: none;
    color: white;
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0 0 0;
`;
