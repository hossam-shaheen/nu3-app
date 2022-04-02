import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from 'src/interfaces/interfaces';
import classes from './Product.module.css';


export const Product: FunctionComponent<{ product: ProductType }> = ({ product }): JSX.Element => {
    const productTitleDashed = product.title.replace(/\s+/g, '-').toLowerCase();

    return <li className={classes.product}>
        <div className={classes["product-image"]}>
            <Link to={`/product/${productTitleDashed}`}><img src={product.image} alt={product.title} /></Link>
        </div>
        <div className={classes["product-content"]}>
            <h3>{product.title}</h3>
            <p className={classes["product-price"]}>{product.price} &#x20AC;</p>
            <button> <i className="fas fa-shopping-cart"></i> Add To Cart</button>
        </div>
    </li>
}
export default Product;
