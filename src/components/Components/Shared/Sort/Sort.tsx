import { FunctionComponent, useState, ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortProps } from 'src/interfaces/interfaces';
import classes from './Sort.module.css';

export const Sort: FunctionComponent<{ onSort: SortProps["onSort"] }> = ({ onSort }): JSX.Element => {
    const [sort, setSort] = useState("Random");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("searchQuery");
    const sortQuery = searchParams.get("sortQuery");

    const onSortChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const sortKeyWord = e.target.value;
        setSort(sortKeyWord);
        onSort(sortKeyWord);
        if (searchQuery) {
            setSearchParams({
                searchQuery: searchQuery,
                sortQuery: sortKeyWord
            });
        } else {
            setSearchParams({});
        }
    }

    useEffect(() => {
        if (sortQuery) {
            setSort(sortQuery);
            onSort(sortQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={classes.sort}>
        <select value={sort} onChange={e => onSortChange(e)} data-testid="sort-select">
            <option value={"Random"} data-testid="sort-select-option">Random</option>
            <option value={"Alphabetical"} data-testid="sort-select-option">Alphabetical</option>
            <option value={"Low"} data-testid="sort-select-option">Price: Low to High</option>
            <option value={"High"} data-testid="sort-select-option">Price: High to Low</option>
        </select>
    </div>
}
export default Sort;