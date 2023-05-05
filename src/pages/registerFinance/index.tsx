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
import { FinancePayload } from '../../TYPES/finance';
import { financesApi } from '../../API/apiFinances';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function RegisterFincance() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [finances, setFinances] = useState<FinancePayload>();
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getfinancesById();
  }, []);

  async function getfinancesById() {
    setLoading(true);
    if (id) {
      const finances = await financesApi.getFinanceById(id);
      setFinances(finances);
    }
    setLoading(false);
  }

  async function getFranchises() {
    const franchises = (await franchisesApi.getFranchise()) ?? [];
    setFranchises(franchises);
  }

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getfinancesById(), getFranchises()]);
    }
    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const score = Number(formData.get('score_performed'));

    let tier = '';
    let mrrMultiplier = 0;
    let mdrMultiplier = 0.15;

    if (score >= 0 && score <= 35) {
      tier = 'Tier 0';
      mrrMultiplier = 0.16;
    } else if (score <= 60) {
      tier = 'Tier 1';
      mrrMultiplier = 0.2;
    } else if (score <= 73) {
      tier = 'Tier 2';
      mrrMultiplier = 0.25;
    } else if (score <= 86) {
      tier = 'Tier 3';
      mrrMultiplier = 0.27;
    } else if (score <= 112) {
      tier = 'Tier 4';
      mrrMultiplier = 0.29;
    } else if (score <= 125) {
      tier = 'Tier 5';
      mrrMultiplier = 0.31;
    } else if (score <= 162) {
      tier = 'Tier 6';
      mrrMultiplier = 0.33;
    } else if (score <= 178) {
      tier = 'Tier 7';
      mrrMultiplier = 0.35;
    } else if (score <= 216) {
      tier = 'Tier 8';
      mrrMultiplier = 0.38;
    } else if (score > 216) {
      tier = 'Tier 9';
      mrrMultiplier = 0.41;
    }

    const MRR = Number(formData.get('MRR'));
    const MDR = Number(formData.get('MDR'));
    const commission = MRR * mrrMultiplier + MDR * mdrMultiplier;

    const newFinance = {
      tier: tier,
      score_performed: Number(formData.get('score_performed')),
      MRR: MRR,
      MDR: MDR,
      commission: commission,
      franchiseId: formData.get('franchiseId')?.toString() || '',
      created_at: new Date(),
    };

    let financeResponse;
    if (id) {
      const financeToUpdate = { ...newFinance, id: id };
      const updatedFinance = {
        ...financeToUpdate,
        created_at: finances?.created_at,
      };
      financeResponse = await financesApi.updateFinance(updatedFinance);
      navigate(`/finance/find/${newFinance.franchiseId}`);
    } else {
      financeResponse = await financesApi.createFinance(newFinance);
      setLoading(false);
      navigate(`/finance/find/${newFinance.franchiseId}`);
    }
  }

  const handleCancel = () => {
    const franchiseId = finances?.franchiseId;
    navigate(`/finance/find/${franchiseId}`);
  };

  async function handleDeactivate() {
    const updatedFinance = {
      ...finances,
      closed_at: new Date(),
    };
    const response = await financesApi.activateFinance(updatedFinance.id ?? '');
    setFinances({ ...updatedFinance, closed_at: new Date() });
  }

  async function handleActivate() {
    const updatedFinance = {
      ...finances,
      closed_at: undefined,
    };
    const response = await financesApi.deactivateFinance(
      updatedFinance.id ?? '',
    );
    setFinances(updatedFinance);
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
              <h1>
                {id ? 'Atualizar Financeiro' : 'Registar Novo Financeiro'}
              </h1>
              <FieldsContainer>
                <FieldsColumn>
                  <label htmlFor="score_performed">Pontuação</label>
                  <input
                    defaultValue={finances?.score_performed}
                    required={!id}
                    type="number"
                    name="score_performed"
                    placeholder="Pontuação"
                  />
                  <label htmlFor="MRR">MRR</label>
                  <input
                    defaultValue={finances?.MRR}
                    required={!id}
                    type="number"
                    name="MRR"
                    placeholder="MRR"
                  />
                </FieldsColumn>
                <FieldsColumn>
                  <label htmlFor="MDR">MDR</label>
                  <input
                    defaultValue={finances?.MDR}
                    required={!id}
                    type="number"
                    name="MDR"
                    placeholder="MDR"
                  />
                  <label htmlFor="franchiseId">Franquia</label>
                  {franchises.length ? (
                    <select
                      name="franchiseId"
                      defaultValue={finances?.franchiseId}
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
                  {finances?.closed_at ? (
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
