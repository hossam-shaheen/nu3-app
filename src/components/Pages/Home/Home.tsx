import { FunctionComponent, useState, useEffect, useCallback } from "react";
import { ErrorType, ProductsType } from "src/interfaces/interfaces";
import Products from "../../Components/ProductsCards/Products/Products";
import SearchBar from "../../Components/Shared/SearchBar/SearchBar";
import ResultCount from "../../Components/Shared/ResultCount/ResultCount";
import Sort from "../../Components/Shared/Sort/Sort";
import Loader from "../../Components/Shared/Loader/Loader";
import { SEARCH_BASE_URL } from "../../../constants/APIs";
import classes from "./Home.module.css";
import useDebounce from "src/customHook/useDebounce";
import Error from "src/components/Components/Shared/Error/Error";

export const Home: FunctionComponent = (): JSX.Element => {
  const [products, setProducts] = useState<ProductsType>({
    items: [],
    totalItems: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [noResults, setNoResults] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchTerm, 500);

  const fetchSearchResults = useCallback(
    async (searchKeyWord: string): Promise<void> => {
      setError(null);
      if (searchKeyWord.length > 1) {
        setLoading(true);
        try {
          const response = await fetch(`${SEARCH_BASE_URL}`);
          const data = await response.json();
          validateResults(data.items);
          getSearchResult(searchKeyWord, data);
        } catch (error) {
          setError({
            icon: "fas fa-exclamation-triangle",
            message: "Failed to fetch data",
          });
        }
        setLoading(false);
      } else {
        setProducts({
          items: [],
          totalItems: 0,
        });
        setNoResults("");
      }
    },
    []
  );

  useEffect(() => {
    (async () => {
      fetchSearchResults(searchTerm);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const getSearchResult = (
    searchKeyWord: string,
    productResults: ProductsType
  ): void => {
    const filteredProducts = productResults.items.filter((product) =>
      product.title.toLowerCase().includes(searchKeyWord.toLowerCase())
    );
    const totalFilteredItems = filteredProducts.length;
    if (totalFilteredItems > 0) {
      setProducts({
        items: filteredProducts,
        totalItems: totalFilteredItems,
      });
    } else {
      setProducts({
        items: [],
        totalItems: 0,
      });
    }
  };

  const validateResults = (productResults: ProductsType): void => {
    if (productResults.totalItems > 0) {
      setNoResults("");
    } else {
      setNoResults("No results found");
    }
  };

  const onSearch = async (searchKeyWord: string) => {
    setSearchTerm(searchKeyWord);
  };

  const onSort = (sortKeyWord: string): void => {
    const sortedProducts = products.items.sort((a, b) => {
      switch (sortKeyWord) {
        case "Alphabetical":
          return a.title.localeCompare(b.title);
        case "Low":
          return a.price - b.price;
        case "High":
          return b.price - a.price;
        case "Random":
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });
    setProducts({
      items: sortedProducts,
      totalItems: products.totalItems,
    });
  };

  return (
    <>
      <div className={classes["search-container"]}>
        <SearchBar onSearch={onSearch} />
      </div>
      {products.totalItems > 0 && (
        <div className={classes["result-count-container"]}>
          <div className={classes["results-header"]}>
            <ResultCount count={products.totalItems} />
            <Sort onSort={onSort} />
          </div>
          <Products products={products.items} />
        </div>
      )}

      {error && !loading && !noResults && products.items.length === 0 && (
        <Error errorClass="error-message" error={error} />
      )}
      {!error && loading && !noResults && products.items.length === 0 && (
        <Loader />
      )}
      {!error && !loading && noResults && products.items.length === 0 && (
        <Error
          errorClass="no-results"
          error={{
            message: noResults,
          }}
        />
      )}
    </>
  );
};
export default Home;
