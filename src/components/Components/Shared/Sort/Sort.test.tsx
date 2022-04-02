import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Sort from './Sort';

const selectedOption = (elementsIndex: number[], truthyElementIndex: number) => {
    const sortSelectOptions: any = screen.getAllByTestId('sort-select-option')
    elementsIndex.forEach((item) => {
        if (item === truthyElementIndex) {
            expect(sortSelectOptions[item].selected).toBeTruthy();
        } else {
            expect(sortSelectOptions[item].selected).toBeFalsy();
        }
    })
}

test('Sort displayed in the document: Renders', () => {
    render(<Sort onSort={jest.fn()} />);
    const sortSelect = screen.getByTestId("sort-select");
    expect(sortSelect).toBeInTheDocument();
    selectedOption([0, 1, 2, 3], 0);
});



test('Sort change to Alphabetical : Renders', () => {
    render(<Sort onSort={jest.fn()} />);
    const sortSelect = screen.getByTestId("sort-select");
    fireEvent.change(sortSelect, { target: { value: "Alphabetical" } })
    selectedOption([0, 1, 2, 3], 1);
});

test('Sort change to Random: Renders', () => {
    render(<Sort onSort={jest.fn()} />);
    const sortSelect = screen.getByTestId("sort-select");
    fireEvent.change(sortSelect, { target: { value: "Random" } })
    selectedOption([0, 1, 2, 3], 0);
});

test('Sort change to High to Low : Renders', () => {
    render(<Sort onSort={jest.fn()} />);
    const sortSelect = screen.getByTestId("sort-select");
    fireEvent.change(sortSelect, { target: { value: "Low" } })
    selectedOption([0, 1, 2, 3], 2);
});


test('Sort change to Low to High : Renders', () => {
    render(<Sort onSort={jest.fn()} />);
    const sortSelect = screen.getByTestId("sort-select");
    fireEvent.change(sortSelect, { target: { value: "High" } })
    selectedOption([0, 1, 2, 3], 3);
});

test('Sort : Snapshot', () => {
    const component = renderer.create(<Sort onSort={jest.fn()} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
