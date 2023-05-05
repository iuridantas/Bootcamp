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
import { ProductPayload } from '../../TYPES/product';
import { productsApi } from '../../API/apiProducts';
import { CardProduct } from '../../COMPONENTS/card/productCard/productCard';
import { useParams } from 'react-router-dom';
import { Top } from '../../COMPONENTS/top';
import { Sidebar } from '../../COMPONENTS/sidebar';
import UserContext from '../../CONTEXT/userContext';

export function Product() {
  const [products, setProducts] = useState<ProductPayload[]>([]);
  const [control, setControl] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { search } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const debouncedSearch = useDebounce(search, 1000);
  const [filteredProducts, setFilteredProducts] = useState<ProductPayload[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfProductsPerPage, setNumberOfProductsPerPage] = useState(12);
  const { franchiseId = 'franchiseId' } = useParams<{ franchiseId?: string }>();
  const [showClosedProducts, setshowClosedProducts] = useState(false);

  async function getProductsInfo() {
    setLoading(true);
    const allProducts = await productsApi.getProduct(franchiseId);
    setProducts(allProducts ?? []);
    setLoading(false);
  }

  function updatePage() {
    setControl(!control);
  }

  useEffect(() => {
    getProductsInfo();
  }, [control]);

  useEffect(() => {
    if (search !== '') {
      const getFilteredProducts = products.filter((product) =>
        product.name?.toUpperCase().includes(search.toUpperCase()),
      );
      setFilteredProducts(getFilteredProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [debouncedSearch]);

  const hasFilter = filteredProducts.length > 0;

  const productsToDisplay = hasFilter
    ? filteredProducts.filter((product) =>
        showClosedProducts
          ? product.closed_at !== null
          : product.closed_at === null,
      )
    : products.filter((product) =>
        showClosedProducts
          ? product.closed_at !== null
          : product.closed_at === null,
      );

  const startIndex = (currentPage - 1) * numberOfProductsPerPage;
  const endIndex = startIndex + numberOfProductsPerPage;
  const displayedProducts = productsToDisplay.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    productsToDisplay.length / numberOfProductsPerPage,
  );

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleshowClosedProducts() {
    setshowClosedProducts(!showClosedProducts);
    setCurrentPage(1);
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const order = event.target.value;

    if (order === 'asc') {
      const sortedProducts = [...products]
        .filter((product) => product.name !== undefined)
        .sort((a, b) => a.name!.localeCompare(b.name!));
      setProducts(sortedProducts);
    } else if (order === 'desc') {
      const sortedProducts = [...products]
        .filter((product) => product.name !== undefined)
        .sort((a, b) => b.name!.localeCompare(a.name!));
      setProducts(sortedProducts);
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
              <button onClick={handleshowClosedProducts}>
                {showClosedProducts ? 'Serviços ativos' : 'Serviços inativos'}
              </button>
              {user?.user_type === 'hyperlocal' && <Top />}
            </PageTop>
            <h1>Serviços</h1>
            <FieldsContainer>
              {displayedProducts.map((product) => (
                <CardProduct
                  product={product}
                  key={product.id}
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
