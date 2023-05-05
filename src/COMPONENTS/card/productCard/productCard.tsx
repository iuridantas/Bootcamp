import { CardSection, EditIcon, DeleteIcon } from './styles';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { ProductPayload } from '../../../TYPES/product';
import { productsApi } from '../../../API/apiProducts';
import { useContext } from 'react';
import UserContext from '../../../CONTEXT/userContext';

interface CardProps {
  product: ProductPayload;
  updatePage: () => void;
}

export function CardProduct({ product, updatePage }: CardProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  async function DeleteCard() {
    swal({
      title: 'Tem certeza que deseja deletar o produto?',
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
        const isDeleted = await productsApi.deleteProduct(product.id ?? '');
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
              navigate('/product/update/' + product.id);
            }}
          />
          <DeleteIcon onClick={DeleteCard} />
        </>
      )}
      <h1>{product.name}</h1>
      <h2>Descrição: {product.description}</h2>
      <h2>
        R${' '}
        {product.price?.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h2>
      <h2>
        Cadastrado em: {new Date(product.created_at ?? '').toLocaleDateString()}
      </h2>
      {product.closed_at && new Date(product.closed_at) && (
        <h2>
          Encerrado em: {new Date(product.closed_at).toLocaleDateString()}
        </h2>
      )}
    </CardSection>
  );
}
