import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { ProductAttributeProps } from "src/interfaces/interfaces";
import ProductGallery from "./ProductGallery";

const mockedMainImage: ProductAttributeProps["productImage"] = {
  id: 4725777367121,
  src: "https://cdn.shopify.com/s/files/1/0095/2274/1329/products/8_252F1_252Fc_252Fc_252F81ccf47420c1f3a11717ff5ad7f93e3e13214556_21446_large.jpg?v=1620826303",
  alt: "nu3 Premium Skin & Hair Beauty",
};

const mockedThumbnails: ProductAttributeProps["productImages"] = [
  {
    id: 4725777367121,
    src: "https://cdn.shopify.com/s/files/1/0095/2274/1329/products/8_252F1_252Fc_252Fc_252F81ccf47420c1f3a11717ff5ad7f93e3e13214556_21446_large.jpg?v=1620826303",
    alt: "nu3 Premium Skin Beauty",
  },
  {
    id: 4725777367122,
    src: "https://cdn.shopify.com/s/files/1/0095/2274/1328/products/8_252F1_252Fc_252Fc_252F81ccf47420c1f3a11717ff5ad7f93e3e13214556_21446_large.jpg?v=1620826303",
    alt: "nu3 Premium Hair Beauty",
  },
];

test("ProductGallery pass mainImage and thumbnails : Renders", () => {
  render(
    <ProductGallery mainImage={mockedMainImage} thumbnails={mockedThumbnails} />
  );

  const productGalleryThumbnails = screen.queryAllByRole("listitem");
  expect(productGalleryThumbnails.length).toBe(2);
  const productMainImage = screen.queryAllByRole("img")[0];
  expect(productMainImage).toBeInTheDocument();
  expect(productMainImage).toHaveAttribute("alt", mockedMainImage.alt);
});

test(`ProductGallery did't pass mainImage and thumbnails : Renders`, () => {
  render(<ProductGallery mainImage={undefined} thumbnails={undefined} />);
  const productsImages = screen.queryAllByRole("img");
  expect(productsImages.length).toBe(0);
});

test(`ProductGallery click in thumbnails should main image changing : Renders`, () => {
  render(
    <ProductGallery mainImage={mockedMainImage} thumbnails={mockedThumbnails} />
  );

  const productGalleryThumbnails = screen.queryAllByRole("listitem");
  expect(productGalleryThumbnails.length).toBe(2);

  const productMainImage = screen.queryAllByRole("img")[0];

  const firstThumbnail = productGalleryThumbnails[0];
  userEvent.click(firstThumbnail);
  expect(firstThumbnail).toHaveClass("active");
  expect(productMainImage).toHaveAttribute("alt", mockedThumbnails[0].alt);

  const secondThumbnail = productGalleryThumbnails[1];
  userEvent.click(secondThumbnail);
  expect(secondThumbnail).toHaveClass("active");
  expect(productMainImage).toHaveAttribute("alt", mockedThumbnails[1].alt);
});

test("Products pass product : Snapshot", () => {
  const component = renderer.create(
    <ProductGallery mainImage={mockedMainImage} thumbnails={mockedThumbnails} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test(`ProductGallery did't pass mainImage and thumbnails: Snapshot`, () => {
  const component = renderer.create(
    <ProductGallery mainImage={undefined} thumbnails={undefined} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
