import { Table, DeleteIcon, EditIcon, CardSection } from './style';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../../CONTEXT/userContext';
import { FinancePayload } from '../../../TYPES/finance';
import { financesApi } from '../../../API/apiFinances';

interface CardProps {
  finance: FinancePayload;
  updatePage: () => void;
}

export function CardFinance({ finance, updatePage }: CardProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  async function DeleteCard() {
    swal({
      title: 'Tem certeza que deseja deletar o financeiro?',
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
        const isDeleted = await financesApi.deleteFinance(finance.id ?? '');
        if (isDeleted) {
          updatePage();
        }
      }
    });
  }

  return (
    <>
      <CardSection>
        {user?.user_type === 'hyperlocal' && (
          <>
            <EditIcon
              onClick={() => {
                navigate('/finance/update/' + finance.id);
              }}
            >
              Editar
            </EditIcon>
            <DeleteIcon onClick={DeleteCard}>Deletar</DeleteIcon>
          </>
        )}
        <Table>
          <thead>
            <tr>
              <th>Comissão</th>
              <th>MDR</th>
              <th>MRR</th>
              <th>Nível</th>
              <th>Score</th>
              <th>Cadastrado em</th>
              {finance.closed_at && new Date(finance.closed_at) && (
                <th>Encerrado em:</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                R${' '}
                {finance.commission?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>
                R${' '}
                {finance.MDR?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>
                R${' '}
                {finance.MRR?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>{finance.tier}</td>
              <td>{finance.score_performed}</td>
              <td>{new Date(finance.created_at ?? '').toLocaleDateString()}</td>
              {finance.closed_at && new Date(finance.closed_at) && (
                <td>{new Date(finance.closed_at).toLocaleDateString()}</td>
              )}
            </tr>
          </tbody>
        </Table>
      </CardSection>
    </>
  );
}
