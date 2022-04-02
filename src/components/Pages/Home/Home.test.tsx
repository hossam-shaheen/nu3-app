import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { setupServer } from "msw/node";
import { rest } from "msw";
import { mockedProducts } from 'src/mockedData/MockedProducts';
import { SEARCH_BASE_URL } from 'src/constants/APIs';
import Home from './Home';


const server = setupServer(
    rest.get(`${SEARCH_BASE_URL}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockedProducts));
    }));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
test('Home type search and products should be displayed : Renders', () => {
    render(<Home />);

    const searchInput = screen.getByPlaceholderText("Search for a product");
    expect(searchInput).toBeInTheDocument();
});

test('Home type in search and 1 result should be displayed in the document: Renders', async () => {
    render(<BrowserRouter>
        <Home />
    </BrowserRouter>);


    const searchInput = screen.getByPlaceholderText("Search for a product");
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'nu3');
    const searchInputValue = searchInput.getAttribute('value');
    expect(searchInputValue).toBe('nu3');

    const productCards = await screen.findAllByRole("listitem");
    expect(productCards.length).toBe(1);

    const productResult = await screen.findByText("1 result");
    expect(productResult).toBeInTheDocument();

    const sortSelect = await screen.findByTestId("sort-select");
    expect(sortSelect).toBeInTheDocument();
});


test('Home : Snapshot', () => {
    const component = renderer.create(<Home />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});