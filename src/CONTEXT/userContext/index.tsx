import { createContext, useEffect, useState } from 'react';
import { UserPayload } from '../../TYPES/user';
import { loginApi } from '../../API/apiLogin';

interface IPropsUserContext {
  user: UserPayload | undefined;
  tokenId: string;
  setUser: (user: UserPayload) => void;
  setTokenId: (token: string) => void;
}

interface IUserContextProvider {
  children: JSX.Element;
}

const DEFAULT_VALUE = {
  setUser: (user: UserPayload) => {},
  setTokenId: (token: string) => {},
  user: {},
  tokenId: '',
};

const UserContext = createContext<IPropsUserContext>(DEFAULT_VALUE);

const UserContextProvider: React.FC<IUserContextProvider> = ({ children }) => {
  const [user, setUser] = useState<UserPayload | undefined>(DEFAULT_VALUE.user);
  const [tokenId, setTokenId] = useState<string>(DEFAULT_VALUE.tokenId);
  const getToken = localStorage.getItem('token');
  useEffect(() => {
    if (getToken || tokenId !== '') {
      loginApi.auth(getToken || tokenId).then((res) => setUser(res));
    }
  }, [tokenId]);
  return (
    <UserContext.Provider value={{ user, setUser, tokenId, setTokenId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
export default UserContext;
