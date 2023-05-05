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
import { CardUser } from '../../COMPONENTS/card/userCard';
import { UserPayload } from '../../TYPES/user';
import { userApi } from '../../API/apiUser';
import { Sidebar } from '../../COMPONENTS/sidebar';
import UserContext from '../../CONTEXT/userContext';
import { Top } from '../../COMPONENTS/top';

export function User() {
  const [users, setUsers] = useState<UserPayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [control, setControl] = useState<boolean>(false);
  const { search } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const debouncedSearch = useDebounce(search, 1000);
  const [filteredUsers, setFilteredUsers] = useState<UserPayload[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfUsersPerPage, setnumberOfUsersPerPage] = useState(9);
  const [showClosedUsers, setShowClosedUsers] = useState(false);

  async function getUsersInfo() {
    setLoading(true);
    const allUsers = await userApi.getUser();
    setUsers(allUsers ?? []);
    setLoading(false);
  }

  function updatePage() {
    setControl(!control);
  }

  useEffect(() => {
    getUsersInfo();
  }, [control]);

  useEffect(() => {
    if (search !== '') {
      const getfilteredUsers = users.filter((user) =>
        user.name?.toUpperCase().includes(search.toUpperCase()),
      );
      setFilteredUsers(getfilteredUsers);
    } else {
      setFilteredUsers([]);
    }
  }, [debouncedSearch]);

  const hasFilter = filteredUsers.length > 0;

  const usersToDisplay = hasFilter
    ? filteredUsers.filter((user) =>
        showClosedUsers ? user.closed_at !== null : user.closed_at === null,
      )
    : users.filter((user) =>
        showClosedUsers ? user.closed_at !== null : user.closed_at === null,
      );

  const startIndex = (currentPage - 1) * numberOfUsersPerPage;
  const endIndex = startIndex + numberOfUsersPerPage;
  const displayedUsers = usersToDisplay.slice(startIndex, endIndex);

  const totalPages = Math.ceil(usersToDisplay.length / numberOfUsersPerPage);

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleShowClosedUsers() {
    setShowClosedUsers(!showClosedUsers);
    setCurrentPage(1);
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const order = event.target.value;

    if (order === 'asc') {
      const sortedUsers = [...users]
        .filter((user) => user.name !== undefined)
        .sort((a, b) => a.name!.localeCompare(b.name!));
      setUsers(sortedUsers);
    } else if (order === 'desc') {
      const sortedUsers = [...users]
        .filter((user) => user.name !== undefined)
        .sort((a, b) => b.name!.localeCompare(a.name!));
      setUsers(sortedUsers);
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
            {user?.user_type === 'hyperlocal' && (
              <>
                <PageTop>
                  <select onChange={handleSortChange}>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                  </select>
                  <button onClick={handleShowClosedUsers}>
                    {showClosedUsers ? 'Usuários ativos' : 'Usuários inativos'}
                  </button>
                  <Top />
                </PageTop>
              </>
            )}
            <h1>Usuários</h1>
            <FieldsContainer>
              {displayedUsers.map((user) => (
                <CardUser users={user} key={user.id} updatePage={updatePage} />
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
