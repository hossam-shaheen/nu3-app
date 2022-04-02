import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ProductType } from 'src/interfaces/interfaces';
import Products from './Products';

export const mockedProducts: ProductType[] = [{
    id: 4725777367121,
    image: "https://cdn.shopify.com/s/files/1/0095/2274/1329/products/8_252F1_252Fc_252Fc_252F81ccf47420c1f3a11717ff5ad7f93e3e13214556_21446_large.jpg?v=1620826303",
    link: "/products/nu3-premium-skin-and-hair-beauty",
    price: 50.99,
    title: "nu3 Premium Skin & Hair Beauty",
    vendor: "nu3",
}];

test('Products pass Empty Array : Renders', () => {
    render(<Products products={[]} />);
    const productsCards = screen.queryAllByRole("listitem");
    expect(productsCards.length).toBe(0);
});


test('Products pass array of one product : Renders', () => {
    render(<BrowserRouter>
        <Products products={mockedProducts} />
    </BrowserRouter>);
    const productsCards = screen.queryAllByRole("listitem");
    expect(productsCards.length).toBe(1);
});


test('Products pass Empty Array : Snapshot', () => {
    const component = renderer.create(<Products products={[]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('Products pass array of one product : Snapshot', () => {
    const component = renderer.create(<BrowserRouter>
        <Products products={mockedProducts} />
    </BrowserRouter>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});