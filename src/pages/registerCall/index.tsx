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
import { CallPayload } from '../../TYPES/call';
import { callsApi } from '../../API/apiCalls';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function RegisterCall() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [calls, setCalls] = useState<CallPayload>();
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getCallsById();
  }, []);

  async function getCallsById() {
    setLoading(true);
    if (id) {
      const customers = await callsApi.getCallById(id);
      setCalls(customers);
    }
    setLoading(false);
  }

  async function getFranchises() {
    const franchises = (await franchisesApi.getFranchise()) ?? [];
    setFranchises(franchises);
  }

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getCallsById(), getFranchises()]);
    }
    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newCall = {
      description: formData.get('description')?.toString() || '',
      status: formData.get('status')?.toString() || '',
      franchiseId: formData.get('franchiseId')?.toString() || '',
      created_at: new Date(),
    };

    let callResponse;
    if (id) {
      const callToUpdate = { ...newCall, id: id };
      const updatedCall = {
        ...callToUpdate,
        created_at: calls?.created_at,
      };
      callResponse = await callsApi.updateCall(updatedCall);
      navigate(`/call/find/${newCall.franchiseId}`);
    } else {
      callResponse = await callsApi.createCall(newCall);
      setLoading(false);
      navigate(`/call/find/${newCall.franchiseId}`);
    }
  }

  const handleCancel = () => {
    const franchiseId = calls?.franchiseId;
    navigate(`/call/find/${franchiseId}`);
  };

  async function handleDeactivate() {
    const updatedCall = {
      ...calls,
      closed_at: new Date(),
    };
    const response = await callsApi.activateCall(updatedCall.id ?? '');
    setCalls({ ...updatedCall, closed_at: new Date() });
  }

  async function handleActivate() {
    const updatedCall = {
      ...calls,
      closed_at: undefined,
    };
    const response = await callsApi.deactivateCall(updatedCall.id ?? '');
    setCalls(updatedCall);
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
              <h1>{id ? 'Atualizar Chat' : 'Registar Novo Chat'}</h1>
              <FieldsContainer>
                <FieldsColumn>
                  <label htmlFor="description">Descrição</label>
                  <input
                    defaultValue={calls?.description}
                    required={!id}
                    type="text"
                    name="description"
                    placeholder="Descrição"
                  />
                </FieldsColumn>
                <FieldsColumn>
                  <label htmlFor="status">Status</label>
                  <select
                    required={!id}
                    name="status"
                    defaultValue={calls?.status}
                  >
                    <option
                      value="Aberto"
                      selected={calls?.status === 'Aberto'}
                    >
                      Aberto
                    </option>
                    <option
                      value="Em andamento"
                      selected={calls?.status === 'Em andamento'}
                    >
                      Em andamento
                    </option>
                    <option
                      value="Concluído"
                      selected={calls?.status === 'Concluído'}
                    >
                      Concluído
                    </option>
                  </select>
                </FieldsColumn>
                <FieldsColumn>
                  <label htmlFor="franchiseId">Franquia</label>
                  {franchises.length ? (
                    <select
                      name="franchiseId"
                      defaultValue={calls?.franchiseId}
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
                  {calls?.closed_at ? (
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
