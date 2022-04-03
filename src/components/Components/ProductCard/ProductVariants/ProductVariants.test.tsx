import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ProductVariantsProps } from "src/interfaces/interfaces";
import ProductVariants from "./ProductVariants";

const mockedProductVariants: ProductVariantsProps = {
  variants: [
    {
      id: 1,
      title: "150 g",
      price: 18.99,
    },
    {
      id: 2,
      title: "3 x 150 g",
      price: 51.99,
    },
  ],
  options: [
    {
      id: 1,
      name: "amount",
      values: ["150 g", "3 x 150 g"],
    },
  ],
};
const validateProductVariantsAndPrice = (selection: string, price: number) => {
  const productSelectVariants = screen.getByTestId("product-variants-select");

  expect(productSelectVariants).toHaveValue(selection);
  const productPrice = screen.getByText(`${price}`, { exact: false });
  expect(productPrice).toBeInTheDocument();
};

test("ProductVariants pass productVariants Props : Renders", () => {
  render(<ProductVariants productVariants={mockedProductVariants} />);

  const productSelectVariants = screen.getByTestId("product-variants-select");
  expect(productSelectVariants).toBeInTheDocument();

  validateProductVariantsAndPrice("150 g", 18.99);
});

test(`ProductVariants didn't pass productVariants Props : Renders`, () => {
  render(<ProductVariants productVariants={null} />);

  const productSelectVariants = screen.queryByTestId("product-variants-select");
  expect(productSelectVariants).not.toBeInTheDocument();
});

test("ProductVariants change select Variants  : Renders", () => {
  render(<ProductVariants productVariants={mockedProductVariants} />);

  const productSelectVariants = screen.getByTestId("product-variants-select");

  validateProductVariantsAndPrice("150 g", 18.99);

  fireEvent.change(productSelectVariants, { target: { value: "3 x 150 g" } });

  validateProductVariantsAndPrice("3 x 150 g", 51.99);

  fireEvent.change(productSelectVariants, { target: { value: "150 g" } });

  validateProductVariantsAndPrice("150 g", 18.99);
});

test(`ProductVariants pass ProductAttributes Props: Snapshot`, () => {
  const component = renderer.create(
    <ProductVariants productVariants={mockedProductVariants} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test(`ProductVariants didn't pass productVariants Props : Snapshot`, () => {
  const component = renderer.create(<ProductVariants productVariants={null} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
