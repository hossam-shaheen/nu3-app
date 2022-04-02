import { FunctionComponent, useState, ChangeEvent } from 'react';
import { ProductsSearchProps } from 'src/interfaces/interfaces';
import classes from './SearchBar.module.css';

const SearchBar: FunctionComponent<{ onSearch: ProductsSearchProps["onSearch"] }> = ({ onSearch }): JSX.Element => {
    const [searchResult, setSearchResult] = useState('');

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const searchKeyWord = e.target.value;
        setSearchResult(searchKeyWord);
        onSearch(searchKeyWord);
    }

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
