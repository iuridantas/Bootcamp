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
import { FranchisePayload } from '../../TYPES/franchise';
import { franchisesApi } from '../../API/apiFranchises';
import { useDebounce } from 'usehooks-ts';
import SearchContext from '../../CONTEXT/contextSearch';
import { CardFranchise } from '../../COMPONENTS/card/franchiseCard/franchisecard';
import { Top } from '../../COMPONENTS/top';
import UserContext from '../../CONTEXT/userContext';
import { Sidebar } from '../../COMPONENTS/sidebar';

export function Franchise() {
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [control, setControl] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { search } = useContext(SearchContext);
  const debouncedSearch = useDebounce(search, 1000);
  const [filteredFranchises, setFilteredFranchises] = useState<
    FranchisePayload[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfFranchisesPerPage, setNumberOfFranchisesPerPage] = useState(6);
  const [showClosedFranchises, setshowClosedFranchises] = useState(false);

  async function getFranchisesInfo() {
    setLoading(true);
    const allFranchises = await franchisesApi.getFranchiseByUser();
    setFranchises(allFranchises ?? []);
    setLoading(false);
  }

  function updatePage() {
    setControl(!control);
  }

  useEffect(() => {
    getFranchisesInfo();
  }, [control]);

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

  const franchisesToDisplay = hasFilter
    ? filteredFranchises.filter((franchise) =>
        showClosedFranchises
          ? franchise.closed_at !== null
          : franchise.closed_at === null,
      )
    : franchises.filter((franchise) =>
        showClosedFranchises
          ? franchise.closed_at !== null
          : franchise.closed_at === null,
      );

  const startIndex = (currentPage - 1) * numberOfFranchisesPerPage;
  const endIndex = startIndex + numberOfFranchisesPerPage;
  const displayedFranchises = franchisesToDisplay.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    franchisesToDisplay.length / numberOfFranchisesPerPage,
  );

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleshowClosedFranchises() {
    setshowClosedFranchises(!showClosedFranchises);
    setCurrentPage(1);
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const order = event.target.value;

    if (order === 'asc') {
      const sortedFranchises = [...franchises]
        .filter((franchise) => franchise.name !== undefined)
        .sort((a, b) => a.name!.localeCompare(b.name!));
      setFranchises(sortedFranchises);
    } else if (order === 'desc') {
      const sortedFranchises = [...franchises]
        .filter((franchise) => franchise.name !== undefined)
        .sort((a, b) => b.name!.localeCompare(a.name!));
      setFranchises(sortedFranchises);
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
              {user?.user_type === 'hyperlocal' && (
                <>
              <select onChange={handleSortChange}>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
                  <button onClick={handleshowClosedFranchises}>
                    {showClosedFranchises
                      ? 'Franquias ativas'
                      : 'Franquias inativas'}
                  </button>
                  <Top />
                </>
              )}
            </PageTop>
            {user && (
              <h1>
                {user.user_type === 'hyperlocal' ? 'Franquias' : 'Franquia'}
              </h1>
            )}
            <FieldsContainer>
              {displayedFranchises.map((franchise) => (
                <CardFranchise
                  franchise={franchise}
                  key={franchise.id}
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
