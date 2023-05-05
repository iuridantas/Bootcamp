import { CardSection, EditIcon, DeleteIcon } from './styles';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import UserContext from '../../../CONTEXT/userContext';
import { CustomerPayload } from '../../../TYPES/customer';
import { customerApi } from '../../../API/apiCustomer';

interface CardProps {
  customer: CustomerPayload;
  updatePage: () => void;
}

export function CardCustomer({ customer, updatePage }: CardProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  async function DeleteCard() {
    swal({
      title: 'Tem certeza que deseja deletar o cliente?',
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
        const isDeleted = await customerApi.deleteCustomer(customer.id ?? '');
        if (isDeleted) {
          updatePage();
        }
      }
    });
  }

  return (
    <CardSection>
      {user?.user_type === 'hyperlocal' && (
        <>
          <EditIcon
            onClick={() => {
              navigate('/customer/update/' + customer.id);
            }}
          />
          <DeleteIcon onClick={DeleteCard} />
        </>
      )}
      <h1>{customer.name}</h1>
      <h2>
        Cadastrado em:{' '}
        {new Date(customer.created_at ?? '').toLocaleDateString()}
      </h2>
      {customer.closed_at && new Date(customer.closed_at) && (
        <h2>
          Encerrado em: {new Date(customer.closed_at).toLocaleDateString()}
        </h2>
      )}
    </CardSection>
  );
}
