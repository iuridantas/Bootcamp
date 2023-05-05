import { useContext, useEffect, useState } from 'react';
import {
  PageContainer,
  Load,
  Button,
  FieldsContainer,
  Page,
  Div,
} from './styles';
import { FranchisePayload } from '../../TYPES/franchise';
import { franchisesApi } from '../../API/apiFranchises';
import { useDebounce } from 'usehooks-ts';
import SearchContext from '../../CONTEXT/contextSearch';
import { CardDashboardById } from '../../COMPONENTS/card/dashboardByIdCard';
import { useParams } from 'react-router-dom';
import { CardDashboard } from '../../COMPONENTS/card/dashboardCard';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function Dashboard() {
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [control, setControl] = useState<boolean>(false);
  const { search } = useContext(SearchContext);
  const debouncedSearch = useDebounce(search, 1000);
  const [filteredFranchises, setFilteredFranchises] = useState<
    FranchisePayload[]
  >([]);
  const { franchiseId } = useParams<{ franchiseId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfFranchisesPerPage, setNumberOfFranchisesPerPage] = useState(13);

  async function getFranchiseInfo() {
    setLoading(true);
    const franchise = await franchisesApi.getFranchiseById(franchiseId ?? '');
    if (franchise) {
      setFranchises([franchise]);
    }
    setLoading(false);
  }

  async function getAllFranchisesInfo() {
    setLoading(true);
    const allFranchises = await franchisesApi.getFranchiseByUser();
    setFranchises(allFranchises ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (franchiseId) {
      getFranchiseInfo();
    } else {
      getAllFranchisesInfo();
    }
  }, [control, franchiseId]);

  useEffect(() => {
    if (search !== '') {
      const getFilteredFranchises = franchises.filter((franchise) =>
        franchise.name?.toUpperCase().includes(search.toUpperCase()),
      );
      setFilteredFranchises(getFilteredFranchises);
    } else {
      setFilteredFranchises([]);
    }
  }, [debouncedSearch]);

  const hasFilter = filteredFranchises.length > 0;

  const franchisesToDisplay = hasFilter ? filteredFranchises : franchises;

  const startIndex = (currentPage - 1) * numberOfFranchisesPerPage;
  const endIndex = startIndex + numberOfFranchisesPerPage;
  const displayedFranchises = franchisesToDisplay.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    franchisesToDisplay.length / numberOfFranchisesPerPage,
  );

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  const isHomeFranchisee = location.pathname === '/homeFranchisee';
  const isDashboardFind = location.pathname.startsWith('/dashboard/find');

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <Page>
          <Sidebar />
          <PageContainer>
            <FieldsContainer>
              {displayedFranchises.map((franchise) =>
                isHomeFranchisee || isDashboardFind ? (
                  <CardDashboardById key={franchise.id} franchise={franchise} />
                ) : (
                  !franchise.closed_at && (
                    <CardDashboard key={franchise.id} franchise={franchise} />
                  )
                ),
              )}
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
