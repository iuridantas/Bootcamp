import { createContext, useState } from 'react';

interface PropsSearchContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<any>>;
}

interface SearchContextProviderType {
  children: any;
}

const DEFAULT_VALUE: PropsSearchContext = {
  setSearch: (value: string) => '',
  search: '',
};

const SearchContext = createContext<PropsSearchContext>(DEFAULT_VALUE);

const SearchContextProvider: React.FC<SearchContextProviderType> = ({
  children,
}) => {
  const [search, setSearch] = useState(DEFAULT_VALUE.search);
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContextProvider };
export default SearchContext;
