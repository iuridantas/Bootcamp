import { CardSection, ButtonDiv, EditIcon, DeleteIcon } from './styles';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { FranchisePayload } from '../../../TYPES/franchise';
import { franchisesApi } from '../../../API/apiFranchises';
import { useContext } from 'react';
import UserContext from '../../../CONTEXT/userContext';

interface CardProps {
  franchise: FranchisePayload;
  updatePage: () => void;
}

export function CardFranchise({ franchise, updatePage }: CardProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  async function DeleteCard() {
    swal({
      title: 'Tem certeza que deseja deletar a franquia?',
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
        const isDeleted = await franchisesApi.deleteFranchise(
          franchise.id ?? '',
        );
        if (isDeleted) {
          updatePage();
        }
      }
    });
  }

  const handleCalls = () => {
    navigate('/call/find/' + franchise.id);
  };

  const handleCustomers = () => {
    navigate('/customer/find/' + franchise.id);
  };

  const handleFinance = () => {
    navigate('/finance/find/' + franchise.id);
  };

  const handleProducts = () => {
    navigate('/product/find/' + franchise.id);
  };

  const handleDashboard = () => {
    navigate('/dashboard/find/' + franchise.id);
  };

  return (
    <CardSection>
      {user?.user_type === 'hyperlocal' && (
        <>
          <EditIcon
            onClick={() => {
              navigate('/franchise/update/' + franchise.id);
            }}
          />
          <DeleteIcon onClick={DeleteCard} />
        </>
      )}
      <h1>{franchise.name}</h1>
      <h2>CNPJ: {franchise.cnpj}</h2>
      <h2>Plano: {franchise.plan}</h2>
      <h2>Score: {franchise.score}</h2>
      <h2>
        Endereço: {franchise.address}, {franchise.city} - {franchise.state},{' '}
        {franchise.zip_code}
      </h2>
      <h2>Descrição: {franchise.description}</h2>
      <h2>Ramo de atividade: {franchise.field_of_activity}</h2>
      <h2>
        Cadastrado em:{' '}
        {new Date(franchise.created_at ?? '').toLocaleDateString()}
      </h2>
      {franchise.closed_at && new Date(franchise.closed_at) && (
        <h2>
          Encerrado em: {new Date(franchise.closed_at).toLocaleDateString()}
        </h2>
      )}
      <ButtonDiv>
        <button onClick={handleCalls}>Chamadas</button>
        <button onClick={handleCustomers}>Clientes</button>
        <button onClick={handleFinance}>Financeiro</button>
        <button onClick={handleProducts}>Serviços</button>
      </ButtonDiv>
      <ButtonDiv>
        {user?.user_type === 'hyperlocal' && (
          <button onClick={handleDashboard}>Dashboard</button>
        )}
      </ButtonDiv>
    </CardSection>
  );
}
