import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ProductType } from 'src/interfaces/interfaces';
import Product from './Product';

const mockedProduct: ProductType = {
    id: 4725777367121,
    image: "https://cdn.shopify.com/s/files/1/0095/2274/1329/products/8_252F1_252Fc_252Fc_252F81ccf47420c1f3a11717ff5ad7f93e3e13214556_21446_large.jpg?v=1620826303",
    link: "/products/nu3-premium-skin-and-hair-beauty",
    price: 50.99,
    title: "nu3 Premium Skin & Hair Beauty",
    vendor: "nu3",
};


test('Products pass product : Renders', () => {
    render(<BrowserRouter>
        <Product product={mockedProduct} />
    </BrowserRouter>);
    const productsCard = screen.getByRole("listitem");
    expect(productsCard).toBeInTheDocument();
});

test('Product pass product and validate all card element is displayed : Renders', () => {
    render(<BrowserRouter>
        <Product product={mockedProduct} />
    </BrowserRouter>);

    const productImage = screen.getByRole("img");
    expect(productImage).toHaveAttribute("alt", mockedProduct.title);

    const productTitle = screen.getByRole("heading");
    expect(productTitle).toHaveTextContent(mockedProduct.title);

    const productPrice = screen.getByText('50.99', { exact: false });
    expect(productPrice).toHaveTextContent(String(mockedProduct.price));

    const productButton = screen.getByRole("button");
    expect(productButton).toHaveTextContent("Add To Cart");
});

test('Products pass product : Snapshot', () => {
    const component = renderer.create(<BrowserRouter>
        <Product product={mockedProduct} />
    </BrowserRouter>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});