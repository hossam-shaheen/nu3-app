import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import SearchBar from './SearchBar';

test('SearchBar displayed in the document : Renders', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText('Search for a product');;
    expect(searchInput).toBeInTheDocument();
});

test(`SearchBar didn't Type product name : Renders`, () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText('Search for a product');;
    userEvent.type(searchInput, '');
    const searchInputValue = searchInput.getAttribute('value');
    expect(searchInputValue).toBe('');
});


test('SearchBar Type product name : Renders', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText('Search for a product');;
    userEvent.type(searchInput, 'nu3');
    const searchInputValue = searchInput.getAttribute('value');
    expect(searchInputValue).toBe('nu3');
});

test('SearchBar displayed : Snapshot', () => {
    const component = renderer.create(<SearchBar onSearch={jest.fn()} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});