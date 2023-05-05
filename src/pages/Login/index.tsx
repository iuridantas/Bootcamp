import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Load } from './styles';
import UserContext from '../../CONTEXT/userContext';
import { loginApi } from '../../API/apiLogin';

export function Login() {
  const { tokenId, setTokenId } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const login = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    const userData = await loginApi.signIn(login);

    const userType = user?.user_type;

    setLoading(false);
    if (userData?.token) setTokenId(userData?.token);
    if (userData) {
      if (userType === 'hyperlocal') {
        navigate('/homeFranchise');
      } else if (userType === 'franquia') {
        navigate('/profile');
      }
    }
  }

  return (
    <PageContainer>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" placeholder="digite seu email" />
        <label htmlFor="password">Senha</label>
        <input name="password" type="password" placeholder="digite sua senha" />
        {loading ? <Load /> : <button type="submit">Login</button>}
      </form>
    </PageContainer>
  );
}
