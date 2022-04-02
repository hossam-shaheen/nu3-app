import { FunctionComponent, useState } from 'react';
import { ErrorType, ProductsType } from 'src/interfaces/interfaces';
import Products from '../../Components/ProductsCards/Products/Products';
import SearchBar from '../../Components/Shared/SearchBar/SearchBar';
import ResultCount from '../../Components/Shared/ResultCount/ResultCount';
import Sort from '../../Components/Shared/Sort/Sort';
import { SEARCH_BASE_URL } from '../../../constants/APIs';
import classes from "./Home.module.css";

export const Home: FunctionComponent = (): JSX.Element => {

    const [products, setProducts] = useState<ProductsType>({
        items: [],
        totalItems: 0
    });

    const [error, setError] = useState<ErrorType | null>(null);

    const getSearchResult = (searchKeyWord: string, productResults: ProductsType): void => {
        const filteredProducts = productResults.items.filter(product => product.title.toLowerCase().includes(searchKeyWord.toLowerCase()));
        const totalFilteredItems = filteredProducts.length;
        setProducts({
            items: filteredProducts,
            totalItems: totalFilteredItems
        });
    }

    const onSearch = async (searchKeyWord: string) => {
        if (searchKeyWord.length > 1) {
            try {
                const response = await fetch(`${SEARCH_BASE_URL}`);
                const data = await response.json();
                getSearchResult(searchKeyWord, data);
            } catch (error) {
                setError({
                    icon: "fas fa-exclamation-triangle",
                    message: "Failed to fetch data"
                })
            }
        } else {
            setProducts({
                items: [],
                totalItems: 0
            });
        }
    }

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
            totalItems: products.totalItems
        });
    }

    return <>
        <div className={classes["search-container"]}>
            <SearchBar onSearch={onSearch} />
        </div>
        {products.totalItems > 0 && <div className={classes["result-count-container"]}>
            <div className={classes["results-header"]}>
                <ResultCount count={products.totalItems} />
                <Sort onSort={onSort} />
            </div>
            <Products products={products.items} />
        </div>}

        {error && <div className='error-message'><i className={error?.icon}></i>{error?.message}</div>}
    </>
}
export default Home;
