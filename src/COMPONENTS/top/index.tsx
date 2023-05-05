import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderComponent } from './style';

export function Top() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFranchise = () => {
    navigate('/registerFranchise');
  };

  const handleProduct = () => {
    navigate('/registerProduct');
  };

  const handleFinance = () => {
    navigate('/registerFinance');
  };

  const handleUser = () => {
    navigate('/registerUser');
  };

  const handleCustomer = () => {
    navigate('/registerCustomer');
  };

  const handleCall = () => {
    navigate('/registerCall');
  };

  if (location.pathname === '/franchise') {
    return (
      <HeaderComponent>
        <div>
          <button onClick={handleFranchise}>Cadastrar Franquia</button>
        </div>
      </HeaderComponent>
    );
  } else if (location.pathname.startsWith('/product/find/')) {
    return (
      <HeaderComponent>
        <div>
          <button onClick={handleProduct}>Cadastrar Serviço</button>
        </div>
      </HeaderComponent>
    );
  } else if (location.pathname.startsWith('/finance/find/')) {
    return (
      <HeaderComponent>
        <div>
          <button onClick={handleFinance}>Cadastrar Financeiro</button>
        </div>
      </HeaderComponent>
    );
  } else if (location.pathname === '/user') {
    return (
      <HeaderComponent>
        <div>
          <button onClick={handleUser}>Cadastrar Usuário</button>
        </div>
      </HeaderComponent>
    );
  } else if (location.pathname.startsWith('/customer/find/')) {
    return (
      <HeaderComponent>
        <div>
          <button onClick={handleCustomer}>Cadastrar Cliente</button>
        </div>
      </HeaderComponent>
    );
  } else if (location.pathname.startsWith('/call/find/')) {
    return (
      <HeaderComponent>
        <div>
          <button onClick={handleCall}>Cadastrar Chamado</button>
        </div>
      </HeaderComponent>
    );
  }
  return <></>;
}
