import { useContext, useEffect, useState } from 'react';
import {
  PageContainer,
  Load,
  Button,
  Div,
  FieldsContainer,
  Page,
  PageTop,
} from './styles';
import { useParams } from 'react-router-dom';
import { Top } from '../../COMPONENTS/top';
import { FinancePayload } from '../../TYPES/finance';
import { financesApi } from '../../API/apiFinances';
import { CardFinance } from '../../COMPONENTS/card/financeCard';
import { Sidebar } from '../../COMPONENTS/sidebar';
import UserContext from '../../CONTEXT/userContext';

export function Finance() {
  const [finances, setFinances] = useState<FinancePayload[]>([]);
  const [control, setControl] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(UserContext);
  const [numberOfFinancesPerPage, setNumberOfFinancesPerPage] = useState(12);
  const { franchiseId = 'franchiseId' } = useParams<{ franchiseId?: string }>();
  const [showClosedFinances, setShowClosedFinances] = useState(false);

  async function getFinancesInfo() {
    setLoading(true);
    const allFinances = await financesApi.getFinance(franchiseId);
    setFinances(allFinances ?? []);
    setLoading(false);
  }

  function updatePage() {
    setControl(!control);
  }

  useEffect(() => {
    getFinancesInfo();
  }, [control]);

  const FinancesToDisplay = showClosedFinances
    ? finances.filter((user) => user.closed_at !== null)
    : finances.filter((user) => user.closed_at === null);

  const startIndex = (currentPage - 1) * numberOfFinancesPerPage;
  const endIndex = startIndex + numberOfFinancesPerPage;
  const displayedFinances = FinancesToDisplay.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    FinancesToDisplay.length / numberOfFinancesPerPage,
  );

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleShowClosedFinances() {
    setShowClosedFinances(!showClosedFinances);
    setCurrentPage(1);
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const order = event.target.value;

    if (order === 'asc') {
      const sortedFinances = [...finances]
        .filter((finance) => finance.created_at !== undefined)
        .sort(
          (a, b) =>
            new Date(a.created_at!).getTime() -
            new Date(b.created_at!).getTime(),
        );
      setFinances(sortedFinances);
    } else if (order === 'desc') {
      const sortedFinances = [...finances]
        .filter((finance) => finance.created_at !== undefined)
        .sort(
          (a, b) =>
            new Date(b.created_at!).getTime() -
            new Date(a.created_at!).getTime(),
        );
      setFinances(sortedFinances);
    }

    setCurrentPage(1);
  }

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <Page>
          <Sidebar />
          <PageContainer>
            <PageTop>
              <select onChange={handleSortChange}>
                <option value="asc">Antigo - Recente</option>
                <option value="desc">Recente - Antigo</option>
              </select>
              <button onClick={handleShowClosedFinances}>
                {showClosedFinances ? 'Finanças ativas' : 'Finanças inativas'}
              </button>
              {user?.user_type === 'hyperlocal' && <Top />}
            </PageTop>
            <h1>Financeiro</h1>
            <FieldsContainer>
              {displayedFinances.map((finance) => (
                <CardFinance
                  finance={finance}
                  key={finance.id}
                  updatePage={updatePage}
                />
              ))}
            </FieldsContainer>
            {totalPages > 1 && (
              <Div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      color="navy"
                      onClick={() => handlePageClick(page)}
                      disabled={currentPage === page}
                    >
                      {page}
                    </Button>
                  ),
                )}
              </Div>
            )}
          </PageContainer>
        </Page>
      )}
    </>
  );
}
