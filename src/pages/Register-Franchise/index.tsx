import React from 'react';
import {
  FieldsColumn,
  FieldsContainer,
  PageContainer,
  Load,
  Page,
} from './style';
import UserContext from '../../CONTEXT/userContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FranchisePayload } from '../../TYPES/franchise';
import { franchisesApi } from '../../API/apiFranchises';
import { formatCEP, formatCNPJ } from '../../COMPONENTS/mask/index';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function RegisterFranchise() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [franchises, setFranchises] = useState<FranchisePayload>();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getFranchiseById();
  }, []);

  async function getFranchiseById() {
    setLoading(true);
    if (id) {
      const franchise = await franchisesApi.getFranchiseById(id);
      setFranchises(franchise);
    }
    setLoading(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newFranchise = {
      userId: user?.id ?? '',
      name: formData.get('name')?.toString() || '',
      cnpj: formData.get('cnpj')?.toString() || '',
      plan: formData.get('plan')?.toString() || '',
      score: Number(formData.get('score')),
      description: formData.get('description')?.toString() || '',
      address: formData.get('address')?.toString() || '',
      city: formData.get('city')?.toString() || '',
      state: formData.get('state')?.toString() || '',
      zip_code: formData.get('zip_code')?.toString() || '',
      field_of_activity: formData.get('field_of_activity')?.toString() || '',
      created_at: new Date(),
    };

    let FranchiseResponse;
    if (id) {
      const franchiseToUpdate = { ...newFranchise, id: id };
      const updatedFranchise = {
        ...franchiseToUpdate,
        created_at: franchises?.created_at,
      };
      FranchiseResponse = await franchisesApi.updateFranchise(updatedFranchise);
      navigate('/franchise');
    } else {
      FranchiseResponse = await franchisesApi.creatFranchise(newFranchise);
      setLoading(false);
      navigate('/franchise');
    }
  }

  const handleCancel = () => {
    navigate('/franchise');
  };

  async function handleDeactivate() {
    const updatedFranchise = {
      ...franchises,
      closed_at: new Date(),
    };
    const response = await franchisesApi.activateFranchise(
      updatedFranchise.id ?? '',
    );
    setFranchises({ ...updatedFranchise, closed_at: new Date() });
  }

  async function handleActivate() {
    const updatedFranchise = {
      ...franchises,
      closed_at: undefined,
    };
    const response = await franchisesApi.deactivateFranchise(
      updatedFranchise.id ?? '',
    );
    setFranchises(updatedFranchise);
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
              <h1>{id ? 'Atualizar Franquia' : 'Registar Nova Franquia'}</h1>
              <FieldsContainer>
                <FieldsColumn>
                  <label htmlFor="name">Nome</label>
                  <input
                    defaultValue={franchises?.name}
                    required={!id}
                    type="text"
                    name="name"
                    placeholder="Nome"
                  />
                  <label htmlFor="cnpj">CNPJ</label>
                  <input
                    defaultValue={franchises?.cnpj}
                    required={!id}
                    type="text"
                    name="cnpj"
                    placeholder="CNPJ"
                    maxLength={18}
                    onChange={(event) => {
                      const formattedValue = formatCNPJ(event.target.value);
                      event.target.value = formattedValue;
                    }}
                  />
                  <label htmlFor="plan">Plano</label>
                  <input
                    defaultValue={franchises?.plan}
                    required={!id}
                    type="text"
                    name="plan"
                    placeholder="Plano"
                  />
                </FieldsColumn>
                <FieldsColumn>
                  <label htmlFor="state">Estado</label>
                  <input
                    defaultValue={franchises?.state}
                    required={!id}
                    type="text"
                    name="state"
                    placeholder="Estado"
                  />
                  <label htmlFor="city">Cidade</label>
                  <input
                    defaultValue={franchises?.city}
                    required={!id}
                    type="text"
                    name="city"
                    placeholder="Cidade"
                  />
                  <label htmlFor="zip_code">CEP</label>
                  <input
                    defaultValue={franchises?.zip_code}
                    required={!id}
                    type="text"
                    name="zip_code"
                    maxLength={9}
                    placeholder="CEP"
                    onChange={(event) => {
                      const formattedValue = formatCEP(event.target.value);
                      event.target.value = formattedValue;
                    }}
                  />
                </FieldsColumn>
                <FieldsColumn>
                  <label htmlFor="address">Endereço</label>
                  <input
                    defaultValue={franchises?.address}
                    required={!id}
                    type="text"
                    name="address"
                    placeholder="Endereço"
                  />
                  <label htmlFor="description">Descrição</label>
                  <input
                    defaultValue={franchises?.description}
                    required={!id}
                    type="text"
                    name="description"
                    placeholder="Descrição"
                  />
                  <label htmlFor="field_of_activity">Ramo de atividade</label>
                  <select
                    defaultValue={franchises?.field_of_activity}
                    required={!id}
                    name="field_of_activity"
                  >
                    <option value="Indústria">Indústria</option>
                    <option value="Comércio">Comércio</option>
                    <option value="Serviço">Serviço</option>
                  </select>
                </FieldsColumn>
              </FieldsContainer>
              {id ? (
                <>
                  <button type="submit">Editar</button>
                  {franchises?.closed_at ? (
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
