import { useContext, useEffect, useState } from 'react';
import { PageContainer, Load, FieldsContainer, Page } from './styles';
import UserContext from '../../CONTEXT/userContext';
import { FranchisePayload } from '../../TYPES/franchise';
import { franchisesApi } from '../../API/apiFranchises';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function Profile() {
  const { user } = useContext(UserContext);
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const [franchiseName, setFranchiseName] = useState('');
  const [loading, setLoading] = useState(false);

  async function getFranchises() {
    setLoading(true);
    const franchises = (await franchisesApi.getFranchise()) ?? [];
    setFranchises(franchises);

    const franchise = franchises.find((f) => f.id === user?.franchiseId);
    setFranchiseName(franchise?.name ?? franchiseName);
    setLoading(false);
  }

  useEffect(() => {
    getFranchises();
  }, []);

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <Page>
          <Sidebar />
          <PageContainer>
            <h1>Perfil</h1>
            <FieldsContainer>
              <h2>{user?.name}</h2>
              <h3>CPF: {user?.cpf}</h3>
              <h3>Email: {user?.email}</h3>
              <h3>Franquia: {franchiseName}</h3>
              <h3>
                Cadastrado em:{' '}
                {new Date(user?.created_at ?? '').toLocaleDateString()}
              </h3>
              {user?.closed_at && new Date(user.closed_at) && (
                <h3>
                  Cadastro encerrado em:{' '}
                  {new Date(user.closed_at).toLocaleDateString()}
                </h3>
              )}
            </FieldsContainer>
          </PageContainer>
        </Page>
      )}
    </>
  );
}
