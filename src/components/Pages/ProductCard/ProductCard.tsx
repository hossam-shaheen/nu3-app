import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductAttribute from "src/components/Components/ProductCard/ProductAttribute/ProductAttribute";
import ProductGallery from "src/components/Components/ProductCard/ProductGallery/ProductGallery";
import ProductVariants from "src/components/Components/ProductCard/ProductVariants/ProductVariants";
import Error from "src/components/Components/Shared/Error/Error";
import Loader from "src/components/Components/Shared/Loader/Loader";
import QrCode from "src/components/Components/Shared/QrCode/QrCode";
import {
  ErrorType,
  ProductAttributeProps,
  ProductInfoType,
  ProductVariantsProps,
} from "src/interfaces/interfaces";
import { PRODUCT_BASE_URL } from "../../../constants/APIs";
import classes from "./ProductCard.module.css";

export const ProductCard: FunctionComponent = (): JSX.Element => {
  const [productInfo, setProductInfo] = useState<ProductInfoType | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const navigate = useNavigate();

  const getCurrentProduct = useCallback(async () => {
    try {
      const response = await fetch(`${PRODUCT_BASE_URL}`);
      const data = await response.json();
      setProductInfo(data.product);
    } catch (error) {
      setError({
        icon: "fas fa-exclamation-triangle",
        message: "Failed to fetch data",
      });
    }
  }, []);

  useEffect(() => {
    getCurrentProduct();
  }, [getCurrentProduct]);

  const productAttributes: ProductAttributeProps | null = productInfo && {
    productImage: productInfo?.image,
    productImages: productInfo?.images,
    ProductTitle: productInfo?.title,
    productBodyHtml: productInfo?.body_html,
    productVendor: productInfo?.vendor,
  };

  const productVariants: ProductVariantsProps | null = productInfo && {
    variants: productInfo?.variants,
    options: productInfo?.options,
  };
  
  const back = () => {
    navigate(-1);
  };

  return (
    <div className={classes["product-card-container"]}>
      <div className={classes["product-card"]}>
        {!error && productInfo && (
          <>
            <div className={classes["product-gallery"]}>
              <ProductGallery
                mainImage={productAttributes?.productImage}
                thumbnails={productAttributes?.productImages}
              />
            </div>
            <div className={classes["product-info"]}>
              <div className={classes["product-attribute-qr"]}>
                <ProductAttribute productAttributes={productAttributes} />
                <QrCode url={`${productInfo?.url}`} />
              </div>
              <ProductVariants productVariants={productVariants} />
              <button>
                <i className="fas fa-shopping-cart"></i> Add To Cart
              </button>
            </div>
          </>
        )}

        {error && !productInfo && (
          <Error errorClass="error-message" error={error} />
        )}
        {!error && !productInfo && <Loader />}

        <button className={classes["back"]} onClick={back} data-testid="back">
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
