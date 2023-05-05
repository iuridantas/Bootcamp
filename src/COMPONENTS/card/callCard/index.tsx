import { CardSection, EditIcon, DeleteIcon } from './styles';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../../CONTEXT/userContext';
import { CallPayload } from '../../../TYPES/call';
import { callsApi } from '../../../API/apiCalls';

interface CardProps {
  call: CallPayload;
  updatePage: () => void;
}

export function CardCall({ call, updatePage }: CardProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  async function DeleteCard() {
    swal({
      title: 'Tem certeza que deseja deletar o chamado?',
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
        const isDeleted = await callsApi.deleteCall(call.id ?? '');
        if (isDeleted) {
          updatePage();
        }
      }
    });
  }

  return (
    <CardSection>
      <h2>Status: {call.status}</h2>
      <h2> Descrição: {call.description}</h2>
      <h2>
        Cadastrado em: {new Date(call.created_at ?? '').toLocaleDateString()}
      </h2>
      {call.closed_at && new Date(call.closed_at) && (
        <h2>Encerrado em: {new Date(call.closed_at).toLocaleDateString()}</h2>
      )}
      {user?.user_type === 'hyperlocal' && (
        <>
          <EditIcon
            onClick={() => {
              navigate('/call/update/' + call.id);
            }}
          />
          <DeleteIcon onClick={DeleteCard} />
        </>
      )}
    </CardSection>
  );
}
