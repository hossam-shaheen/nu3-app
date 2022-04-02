import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ProductAttributeProps } from 'src/interfaces/interfaces';
import ProductAttribute from './ProductAttribute';

const mockedProductAttributes: ProductAttributeProps = {
    productImage: {
        id: 1,
        src: "https://cdn.shopify.com/s/files/1/0289/1534/products/product-image-large.jpg?v=1571608031",
        alt: "Product Image"
    },
    productImages: [{
        id: 1,
        src: "https://cdn.shopify.com/s/files/1/0289/1534/products/product-image-large.jpg?v=1571608031",
        alt: "Product Image"
    }],
    ProductTitle: "nu3 Bio Acerola",
    productBodyHtml: "nu3 Bio Acerola-Pulver: 100 g ✓ Natürliche Vitamin C-Quelle ✓ Ohne Zusatzstoffe wie Maltodextrin ✓ Schonend gefriergetrocknet. Jetzt im nu3 Shop bestellen!",
    productVendor: "nu3",
};


test('ProductAttribute pass ProductAttributes Props : Renders', () => {
    render(<ProductAttribute
        productAttributes={mockedProductAttributes}
    />);

    const productTitle = screen.getByRole("heading");
    expect(productTitle).toBeInTheDocument();

    const productVendor = screen.getByText("nu3");
    expect(productVendor).toHaveTextContent("nu3");

    const productHtmlList = screen.getAllByRole("listitem");
    expect(productHtmlList.length).toBe(4);

});


test(`ProductAttribute didn't pass ProductAttributes Props : Renders`, () => {
    render(<ProductAttribute
        productAttributes={null}
    />);

    const productTitle = screen.queryByRole("heading");
    expect(productTitle).not.toBeInTheDocument();

    const productVendor = screen.queryByText("nu3");
    expect(productVendor).not.toBeInTheDocument();

    const productHtmlList = screen.queryByRole("listitem");
    expect(productHtmlList).not.toBeInTheDocument();

});


test(`ProductAttribute pass ProductAttributes Props: Snapshot`, () => {
    const component = renderer.create(<ProductAttribute
        productAttributes={mockedProductAttributes}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test(`ProductAttribute didn't pass ProductAttributes Props : Snapshot`, () => {
    const component = renderer.create(<ProductAttribute
        productAttributes={null}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

