import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { setupServer } from "msw/node";
import { rest } from "msw";
import ProductCard from "./ProductCard";
import { mockedProduct } from "src/mockedData/MockedProduct";
import { PRODUCT_BASE_URL } from "src/constants/APIs";
import { BrowserRouter } from "react-router-dom";

const server = setupServer(
  rest.get(`${PRODUCT_BASE_URL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedProduct));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("ProductCard product data should be displayed : Renders", async () => {
  render(
    <BrowserRouter>
      <ProductCard />
    </BrowserRouter>
  );

  const productTitle = await screen.findByRole("heading");
  expect(productTitle).toBeInTheDocument();

  const productVendor = await screen.findByText("nu3");
  expect(productVendor).toBeInTheDocument();

  const productQrCode = await screen.findByTestId("QR-Code-SVG");
  expect(productQrCode).toBeInTheDocument();

  const productHtmlList = screen.getAllByRole("listitem");
  expect(productHtmlList.length).toBeGreaterThan(0);

  const productImages = screen.queryAllByRole("img");
  expect(productImages.length).toBeGreaterThan(0);

  const productButton = screen.getByText("Add to cart", { exact: false });
  expect(productButton).toBeInTheDocument();

  const backButton = screen.getByTestId("back");
  expect(backButton).toBeInTheDocument();
});

test("ProductCard : Snapshot", () => {
  const component = renderer.create(
    <BrowserRouter>
      <ProductCard />
    </BrowserRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
