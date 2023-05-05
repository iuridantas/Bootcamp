import React from 'react';
import {
  FieldsColumn,
  FieldsContainer,
  PageContainer,
  Load,
  Page,
} from './style';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { franchisesApi } from '../../API/apiFranchises';
import { FranchisePayload } from '../../TYPES/franchise';
import { ProductPayload } from '../../TYPES/product';
import { productsApi } from '../../API/apiProducts';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function RegisterProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductPayload>();
  const [loading, setLoading] = useState(false);
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getProductsById();
  }, []);

  async function getProductsById() {
    setLoading(true);
    if (id) {
      const products = await productsApi.getProductById(id);
      setProducts(products);
    }
    setLoading(false);
  }

  async function getFranchises() {
    const franchises = (await franchisesApi.getFranchise()) ?? [];
    setFranchises(franchises);
  }

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getProductsById(), getFranchises()]);
    }
    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newProduct = {
      name: formData.get('name')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      price: Number(formData.get('price')),
      franchiseId: formData.get('franchiseId')?.toString() || '',
      created_at: new Date(),
    };

    let productResponse;
    if (id) {
      const productToUpdate = { ...newProduct, id: id };
      const updatedProduct = {
        ...productToUpdate,
        created_at: products?.created_at,
      };
      productResponse = await productsApi.updateProduct(updatedProduct);
      navigate(`/product/find/${newProduct.franchiseId}`);
    } else {
      productResponse = await productsApi.createProduct(newProduct);
      setLoading(false);
      navigate(`/product/find/${newProduct.franchiseId}`);
    }
  }

  const handleCancel = () => {
    const franchiseId = products?.franchiseId;
    navigate(`/product/find/${franchiseId}`);
  };

  async function handleDeactivate() {
    const updatedProduct = {
      ...products,
      closed_at: new Date(),
    };
    const response = await productsApi.activateProduct(updatedProduct.id ?? '');
    setProducts({ ...updatedProduct, closed_at: new Date() });
  }

  async function handleActivate() {
    const updatedProduct = {
      ...products,
      closed_at: undefined,
    };
    const response = await productsApi.deactivateProduct(
      updatedProduct.id ?? '',
    );
    setProducts(updatedProduct);
  }

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <Page>
          <Sidebar />
          <PageContainer>
            <form onSubmit={handleSubmit}>
              <h1>{id ? 'Atualizar Produto' : 'Registar Novo Produto'}</h1>
              <FieldsContainer>
                <FieldsColumn>
                  <label htmlFor="name">Nome</label>
                  <input
                    defaultValue={products?.name}
                    required={!id}
                    type="text"
                    name="name"
                    placeholder="Nome"
                  />
                  <label htmlFor="description">Descrição</label>
                  <input
                    defaultValue={products?.description}
                    required={!id}
                    type="text"
                    name="description"
                    placeholder="Descrição"
                  />
                </FieldsColumn>
                <FieldsColumn>
                  <label htmlFor="price">Preço</label>
                  <input
                    defaultValue={products?.price}
                    required={!id}
                    type="number"
                    name="price"
                    placeholder="Preço"
                  />
                  <label htmlFor="franchiseId">Franquia</label>
                  {franchises.length ? (
                    <select
                      name="franchiseId"
                      defaultValue={products?.franchiseId}
                    >
                      <option value="">Sem franquia</option>
                      {franchises.map((franchise) => (
                        <option key={franchise.id} value={franchise.id}>
                          {franchise.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>Carregando...</p>
                  )}
                </FieldsColumn>
              </FieldsContainer>
              {id ? (
                <>
                  <button type="submit">Editar</button>
                  {products?.closed_at ? (
                    <button type="submit" onClick={handleActivate}>
                      Ativar
                    </button>
                  ) : (
                    <button type="submit" onClick={handleDeactivate}>
                      Desativar
                    </button>
                  )}
                </>
              ) : (
                <button type="submit">Criar</button>
              )}
              <button onClick={handleCancel}>Cancelar</button>
            </form>
          </PageContainer>
        </Page>
      )}
    </>
  );
}
