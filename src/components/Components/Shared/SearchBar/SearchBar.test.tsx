import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SearchBar from './SearchBar';

test('SearchBar displayed in the document : Renders', () => {
    render(<BrowserRouter>
        <SearchBar onSearch={jest.fn()} />
    </BrowserRouter>);
    const searchInput = screen.getByPlaceholderText('Search for a product');;
    expect(searchInput).toBeInTheDocument();
});

test(`SearchBar didn't Type product name : Renders`, () => {
    render(<BrowserRouter>
        <SearchBar onSearch={jest.fn()} />
    </BrowserRouter>);
    const searchInput = screen.getByPlaceholderText('Search for a product');;
    fireEvent.change(searchInput, { target: { value: '' } })
    const searchInputValue = searchInput.getAttribute('value');
    expect(searchInputValue).toBe('');
});


test('SearchBar Type product name : Renders', () => {
    render(<BrowserRouter>
        <SearchBar onSearch={jest.fn()} />
    </BrowserRouter>);
    const searchInput = screen.getByPlaceholderText('Search for a product');;
    fireEvent.change(searchInput, { target: { value: 'nu3' } })
    const searchInputValue = searchInput.getAttribute('value');
    expect(searchInputValue).toBe('nu3');
});

test('SearchBar displayed : Snapshot', () => {
    const component = renderer.create(<BrowserRouter>
        <SearchBar onSearch={jest.fn()} />
    </BrowserRouter>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});