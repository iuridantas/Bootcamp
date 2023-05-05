import styled from 'styled-components';

export const PageContainer = styled.div`
  height: 100%;
  background-color: #ffffff;
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: black 2px 2px 10px;
  row-gap: 24px;
  padding: 0 0 10px 120px;
  margin: 20px;

  h1 {
    font-size: 2.5rem;
    line-height: 54px;
  }
`;

export const Page = styled.div`
 display:flex;
 position: relative;
`;
