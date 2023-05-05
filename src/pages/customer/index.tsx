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
import { useDebounce } from 'usehooks-ts';
import SearchContext from '../../CONTEXT/contextSearch';
import { useParams } from 'react-router-dom';
import { Top } from '../../COMPONENTS/top';
import { CustomerPayload } from '../../TYPES/customer';
import { customerApi } from '../../API/apiCustomer';
import { CardCustomer } from '../../COMPONENTS/card/customerCard';
import { Sidebar } from '../../COMPONENTS/sidebar';
import UserContext from '../../CONTEXT/userContext';

export function Customer() {
  const [customers, setCustomers] = useState<CustomerPayload[]>([]);
  const [control, setControl] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { search } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const debouncedSearch = useDebounce(search, 1000);
  const [filteredCustomers, setfilteredCustomers] = useState<CustomerPayload[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCustomersPerPage, setnumberOfCustomersPerPage] = useState(15);
  const { franchiseId = 'franchiseId' } = useParams<{ franchiseId?: string }>();
  const [showClosedCustomers, setShowClosedCustomers] = useState(false);

  async function getCustomersInfo() {
    setLoading(true);
    const allCustomers = await customerApi.getCustomer(franchiseId);
    setCustomers(allCustomers ?? []);
    setLoading(false);
  }

  function updatePage() {
    setControl(!control);
  }

  useEffect(() => {
    getCustomersInfo();
  }, [control]);

  useEffect(() => {
    if (search !== '') {
      const getfilteredCustomers = customers.filter((customer) =>
        customer.name?.toUpperCase().includes(search.toUpperCase()),
      );
      setfilteredCustomers(getfilteredCustomers);
    } else {
      setfilteredCustomers([]);
    }
  }, [debouncedSearch]);

  const hasFilter = filteredCustomers.length > 0;

  const customersToDisplay = hasFilter
    ? filteredCustomers.filter((customer) =>
        showClosedCustomers
          ? customer.closed_at !== null
          : customer.closed_at === null,
      )
    : customers.filter((customer) =>
        showClosedCustomers
          ? customer.closed_at !== null
          : customer.closed_at === null,
      );

  const startIndex = (currentPage - 1) * numberOfCustomersPerPage;
  const endIndex = startIndex + numberOfCustomersPerPage;
  const displayedCustomers = customersToDisplay.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    customersToDisplay.length / numberOfCustomersPerPage,
  );

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleshowClosedCustomers() {
    setShowClosedCustomers(!showClosedCustomers);
    setCurrentPage(1);
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const order = event.target.value;

    if (order === 'asc') {
      const sortedCustomers = [...customers]
        .filter((customer) => customer.name !== undefined)
        .sort((a, b) => a.name!.localeCompare(b.name!));
      setCustomers(sortedCustomers);
    } else if (order === 'desc') {
      const sortedCustomers = [...customers]
        .filter((customer) => customer.name !== undefined)
        .sort((a, b) => b.name!.localeCompare(a.name!));
      setCustomers(sortedCustomers);
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
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
              <button onClick={handleshowClosedCustomers}>
                {showClosedCustomers ? 'Clientes ativos' : 'Clientes inativos'}
              </button>
              {user?.user_type === 'hyperlocal' && <Top />}
            </PageTop>
            <h1>Clientes</h1>
            <FieldsContainer>
              {displayedCustomers.map((customer) => (
                <CardCustomer
                  customer={customer}
                  key={customer.id}
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
