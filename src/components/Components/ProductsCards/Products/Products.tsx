import { FunctionComponent } from 'react';
import { ProductType } from 'src/interfaces/interfaces';
import Product from '../Product/Product';
import classes from './Products.module.css';

export const Products: FunctionComponent<{ products: ProductType[] }> = ({ products }): JSX.Element => {

    const renderProducts = (): JSX.Element[] => {
        return products.map((product: ProductType) => <Product key={product.id} product={product} />)
    }

    return <ul className={classes.products}>
        {products.length > 0 && renderProducts()}
    </ul>
}
export default Products;