import { useContext, useEffect, useState } from 'react';
import {
  PageContainer,
  Load,
  Button,
  Div,
  FieldsContainer,
  PageTop,
} from './styles';
import { useDebounce } from 'usehooks-ts';
import SearchContext from '../../CONTEXT/contextSearch';
import { useParams } from 'react-router-dom';
import { Top } from '../../COMPONENTS/top';
import { CardCall } from '../../COMPONENTS/card/callCard';
import { callsApi } from '../../API/apiCalls';
import { CallPayload } from '../../TYPES/call';
import { Page } from '../Franchise/styles';
import { Sidebar } from '../../COMPONENTS/sidebar';
import UserContext from '../../CONTEXT/userContext';

export function Call() {
  const [control, setControl] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { search } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const debouncedSearch = useDebounce(search, 1000);
  const [calls, setCalls] = useState<CallPayload[]>([]);
  const { franchiseId = 'franchiseId' } = useParams<{ franchiseId?: string }>();
  const [filteredCall, setFilteredCall] = useState<CallPayload[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCallsPerPage, setNumberOfCallsPerPage] = useState(12);
  const [showClosedCalls, setShowClosedCalls] = useState(false);

  async function getCallFranchiseInfo() {
    setLoading(true);
    const allCalls = await callsApi.getCallsFranchise(franchiseId);
    setCalls(allCalls ?? []);
    setLoading(false);
  }

  function updatePage() {
    setControl(!control);
  }

  useEffect(() => {
    getCallFranchiseInfo();
  }, [control]);

  useEffect(() => {
    if (search !== '') {
      const getFilteredCalls = calls.filter((call) =>
        call.status?.toUpperCase().includes(search.toUpperCase()),
      );
      setFilteredCall(getFilteredCalls);
    } else {
      setFilteredCall([]);
    }
  }, [debouncedSearch]);

  const hasFilter = filteredCall.length > 0;

  const callsToDisplay = hasFilter
    ? filteredCall.filter((call) =>
        showClosedCalls ? call.closed_at !== null : call.closed_at === null,
      )
    : calls.filter((call) =>
        showClosedCalls ? call.closed_at !== null : call.closed_at === null,
      );

  const startIndex = (currentPage - 1) * numberOfCallsPerPage;
  const endIndex = startIndex + numberOfCallsPerPage;
  const displayedCalls = callsToDisplay.slice(startIndex, endIndex);

  const totalPages = Math.ceil(callsToDisplay.length / numberOfCallsPerPage);

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleshowClosedCalls() {
    setShowClosedCalls(!showClosedCalls);
    setCurrentPage(1);
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const order = event.target.value;

    if (order === 'asc') {
      const sortedCalls = [...calls]
        .filter((call) => call.created_at !== undefined)
        .sort(
          (a, b) =>
            new Date(a.created_at!).getTime() -
            new Date(b.created_at!).getTime(),
        );
      setCalls(sortedCalls);
    } else if (order === 'desc') {
      const sortedCalls = [...calls]
        .filter((call) => call.created_at !== undefined)
        .sort(
          (a, b) =>
            new Date(b.created_at!).getTime() -
            new Date(a.created_at!).getTime(),
        );
      setCalls(sortedCalls);
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
              <button onClick={handleshowClosedCalls}>
                {showClosedCalls ? 'Chamadas ativas' : 'Chamadas inativas'}
              </button>
              {user?.user_type === 'hyperlocal' && <Top />}
            </PageTop>
            <h1>Chamados</h1>
            <FieldsContainer>
              {displayedCalls.map((call) => (
                <CardCall call={call} key={call.id} updatePage={updatePage} />
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
