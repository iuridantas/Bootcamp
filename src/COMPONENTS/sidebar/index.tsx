import { SMenu, SNavigateMenu } from './style';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import UserContext from '../../CONTEXT/userContext';

interface MenuItem {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
}

export function Sidebar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [activeMenu, setMode] = useState(false);

  const toggleMode = () => {
    setMode(!activeMenu);
  };

  const menuItems: MenuItem[] = [
    {
      icon: <AiOutlineHome size={23} />,
      text: 'Home',
      onClick: () => {
        navigate(
          user?.user_type === 'hyperlocal'
            ? '/homeFranchise'
            : '/homeFranchisee',
        );
        setMode(!activeMenu);
      },
    },
    {
      icon: <FaStore size={23} />,
      text: user?.user_type === 'hyperlocal' ? 'Franquias' : 'Franquia',
      onClick: () => {
        navigate(
          user?.user_type === 'hyperlocal' ? '/franchise' : '/franchisee',
        );
        setMode(!activeMenu);
      },
    },
    {
      icon:
        user?.user_type === 'hyperlocal' ? (
          <BiUserPin size={23} />
        ) : (
          <CgProfile size={23} />
        ),
      text: user?.user_type === 'hyperlocal' ? 'Usuários' : 'Perfil',
      onClick: () => {
        navigate(user?.user_type === 'hyperlocal' ? '/user' : '/profile');
        setMode(!activeMenu);
      },
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setMode(!activeMenu);
  };

  return (
    <SMenu>
      <div onClick={toggleMode} className={`icon icon-active`} />
      <div>
        <div>
          <ul>
            {menuItems.map((item, index) => (
              <SNavigateMenu key={index} onClick={item.onClick}>
                {item.icon}
                <span>{item.text}</span>
              </SNavigateMenu>
            ))}
            {localStorage.getItem('token') && (
              <SNavigateMenu onClick={handleLogout}>
                <FiLogOut size={23} />
                <span>Sair</span>
              </SNavigateMenu>
            )}
          </ul>
        </div>
      </div>
    </SMenu>
  );
}
