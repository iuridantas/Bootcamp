import { CardSection, EditIcon, DeleteIcon } from './styles';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../CONTEXT/userContext';
import { UserPayload } from '../../../TYPES/user';
import { userApi } from '../../../API/apiUser';
import { FranchisePayload } from '../../../TYPES/franchise';
import { franchisesApi } from '../../../API/apiFranchises';

interface CardProps {
  users: UserPayload;
  updatePage: () => void;
}

export function CardUser({ users, updatePage }: CardProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const [franchiseName, setFranchiseName] = useState('');

  async function DeleteCard() {
    swal({
      title: 'Tem certeza que deseja deletar o usuário?',
      icon: 'warning',
      dangerMode: true,
      buttons: {
        cancel: {
          text: 'Cancelar',
          value: null,
          visible: true,
          closeModal: true,
          className: '',
        },
        confirm: {
          text: 'Confirmar',
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    }).then(async (res) => {
      if (res) {
        const isDeleted = await userApi.deleteUser(users.id ?? '');
        if (isDeleted) {
          updatePage();
        }
      }
    });
  }

  async function getFranchises() {
    const franchises = (await franchisesApi.getFranchise()) ?? [];
    setFranchises(franchises);

    const franchise = franchises.find((f) => f.id === users.franchiseId);
    setFranchiseName(franchise?.name ?? '');
  }

  useEffect(() => {
    getFranchises();
  }, []);

  return (
    <CardSection>
      {user?.user_type === 'hyperlocal' && (
        <>
          <EditIcon
            onClick={() => {
              navigate('/user/update/' + users.id);
            }}
          />
          <DeleteIcon onClick={DeleteCard} />
        </>
      )}
      <h1>{users.name}</h1>
      <h2>CPF: {users.cpf}</h2>
      <h2>Email: {users.email}</h2>
      <h2>tipo de usuário: {users.user_type}</h2>
      {franchiseName ? <h2>Franquia: {franchiseName}</h2> : null}
      <h2>
        Cadastrado em: {new Date(users.created_at ?? '').toLocaleDateString()}
      </h2>
      {users.closed_at && new Date(users.closed_at) && (
        <h2>Encerrado em: {new Date(users.closed_at).toLocaleDateString()}</h2>
      )}
    </CardSection>
  );
}
