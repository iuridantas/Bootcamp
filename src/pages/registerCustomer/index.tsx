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
import { CustomerPayload } from '../../TYPES/customer';
import { customerApi } from '../../API/apiCustomer';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function RegisterCustomer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerPayload>();
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getCustomersById();
  }, []);

  async function getCustomersById() {
    setLoading(true);
    if (id) {
      const customers = await customerApi.getCustomerById(id);
      setCustomers(customers);
    }
    setLoading(false);
  }

  async function getFranchises() {
    const franchises = (await franchisesApi.getFranchise()) ?? [];
    setFranchises(franchises);
  }

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getCustomersById(), getFranchises()]);
    }
    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newCustomer = {
      name: formData.get('name')?.toString() || '',
      franchiseId: formData.get('franchiseId')?.toString() || '',
      created_at: new Date(),
    };

    let productResponse;
    if (id) {
      const customerToUpdate = { ...newCustomer, id: id };
      const updatedCustomer = {
        ...customerToUpdate,
        created_at: customers?.created_at,
      };
      productResponse = await customerApi.updateCustomer(updatedCustomer);
      navigate(`/customer/find/${newCustomer.franchiseId}`);
    } else {
      productResponse = await customerApi.createCustumer(newCustomer);
      setLoading(false);
      navigate(`/customer/find/${newCustomer.franchiseId}`);
    }
  }

  const handleCancel = () => {
    const franchiseId = customers?.franchiseId;
    navigate(`/customer/find/${franchiseId}`);
  };

  async function handleDeactivate() {
    const updatedCustomer = {
      ...customers,
      closed_at: new Date(),
    };
    const response = await customerApi.activateCustomer(
      updatedCustomer.id ?? '',
    );
    setCustomers({ ...updatedCustomer, closed_at: new Date() });
  }

  async function handleActivate() {
    const updatedCustomer = {
      ...customers,
      closed_at: undefined,
    };
    const response = await customerApi.deactivateCustomer(
      updatedCustomer.id ?? '',
    );
    setCustomers(updatedCustomer);
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
              <h1>{id ? 'Atualizar Cliente' : 'Registar Novo Cliente'}</h1>
              <FieldsContainer>
                <FieldsColumn>
                  <label htmlFor="name">Nome</label>
                  <input
                    defaultValue={customers?.name}
                    required={!id}
                    type="text"
                    name="name"
                    placeholder="Nome"
                  />
                </FieldsColumn>
                <FieldsColumn>
                  <label htmlFor="franchiseId">Franquia</label>
                  {franchises.length ? (
                    <select
                      name="franchiseId"
                      defaultValue={customers?.franchiseId}
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
                  {customers?.closed_at ? (
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
