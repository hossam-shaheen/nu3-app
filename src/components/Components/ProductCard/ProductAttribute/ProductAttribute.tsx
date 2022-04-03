import { FunctionComponent } from "react";
import { ProductAttributeProps } from "src/interfaces/interfaces";
import classes from "./ProductAttribute.module.css";

export const ProductAttribute: FunctionComponent<{
  productAttributes: ProductAttributeProps | null;
}> = ({ productAttributes }): JSX.Element => {
  const productBodyHtml = productAttributes?.productBodyHtml.split("✓") || [];

  return (
    <div className={classes["product-attribute"]}>
      <div className={classes["product-info"]}>
        {productAttributes?.ProductTitle && (
          <h1 className={classes["product-title"]}>
            {productAttributes.ProductTitle}
          </h1>
        )}
        {productAttributes?.productVendor && (
          <p className={classes["product-vendor"]}>
            <span>Von</span>
            <span>{productAttributes.productVendor}</span>
          </p>
        )}
        {productBodyHtml.length > 0 && (
          <ul className={classes["product-html"]}>
            {productBodyHtml?.map((bodyHtml, index) => {
              return <li key={index}>✓ {bodyHtml}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default ProductAttribute;
