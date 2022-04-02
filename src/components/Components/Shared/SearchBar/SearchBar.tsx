import { FunctionComponent, useState, ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsSearchProps } from 'src/interfaces/interfaces';
import classes from './SearchBar.module.css';

const SearchBar: FunctionComponent<{ onSearch: ProductsSearchProps["onSearch"] }> = ({ onSearch }): JSX.Element => {
    const [searchResult, setSearchResult] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("searchQuery");

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const searchKeyWord = e.target.value;
        setSearchResult(searchKeyWord);
        onSearch(searchKeyWord);

        if (searchKeyWord.length > 1) {
            setSearchParams({
                searchQuery: searchKeyWord
            });
        } else {
            setSearchParams({});
        }
    }

    useEffect(() => {
        if (searchQuery) {
            setSearchResult(searchQuery);
            onSearch(searchQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<div className={classes["search-bar"]}>
        <input
            type="text"
            placeholder="Search for a product"
            value={searchResult}
            onChange={onSearchChange}
        />


    </div>);

}
export default SearchBar;
