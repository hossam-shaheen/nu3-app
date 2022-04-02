import { FunctionComponent, useState, ChangeEvent, useEffect } from 'react';
import { OptionsType, ProductVariantsProps, VariantType } from 'src/interfaces/interfaces';
import classes from './ProductVariants.module.css';


export const ProductVariants: FunctionComponent<{ productVariants: (ProductVariantsProps | null) }> = ({ productVariants }): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>();
    const [selectedVariant, setSelectedVariant] = useState<VariantType | undefined>();

    const optionValues = productVariants?.options.map((option: OptionsType) => option.values).flat(1) || [];

    useEffect((): void => {
        optionValues && setSelectedOption(optionValues[0]);
        //eslint-disable-next-line
    }, []);

    useEffect((): void => {
        setSelectedVariant(productVariants?.variants.find((variant: VariantType) => variant.title === selectedOption));
        //eslint-disable-next-line
    }, [selectedOption]);

    const onSelectVariants = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    }

    return <div className={classes["product-variants"]}>
        {optionValues.length > 0 && <select value={selectedOption} onChange={onSelectVariants} data-testid="product-variants-select">
            {optionValues?.length > 0 && optionValues.map((option) => {
                return <option key={option} value={option}>
                    {option}
                </option>
            })}
        </select>}
        <div className={classes["product-price"]}>
            <p>&#x20AC; {selectedVariant?.price}</p>
        </div>
    </div>
}
export default ProductVariants;