import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import SearchContext from '../../CONTEXT/contextSearch';
import { Container } from './style';

export function Header() {
  const location = useLocation();
  const { setSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  if (
    location.pathname === '/franchise' ||
    location.pathname === '/homeFranchise' ||
    location.pathname.startsWith('/product/find/') ||
    location.pathname.startsWith('/call/find/') ||
    location.pathname.startsWith('/customer/find/') ||
    location.pathname === '/user'
  ) {
    return (
      <Container>
        <img
          src="https://media.licdn.com/dms/image/C4D0BAQGFHTuhFonKaA/company-logo_200_200/0/1657559080278?e=2147483647&amp;v=beta&amp;t=kSjZTFwKU9qXqX3eultAXwmWVrQFsZtkLUAbErzH77Y"
          alt="logo da empresa"
        />
        <h1>Hyperlocal</h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="O que você está procurando"
          type="text"
        />
      </Container>
    );
  }
  return (
    <Container>
      <img
        src="https://media.licdn.com/dms/image/C4D0BAQGFHTuhFonKaA/company-logo_200_200/0/1657559080278?e=2147483647&amp;v=beta&amp;t=kSjZTFwKU9qXqX3eultAXwmWVrQFsZtkLUAbErzH77Y"
        alt="logo da empresa"
      />
      <h1>Hyperlocal</h1>
    </Container>
  );
}
