import { FunctionComponent, useEffect, useState } from 'react';
import { ProductAttributeProps } from 'src/interfaces/interfaces';
import classes from './ProductGallery.module.css';


export const ProductGallery: FunctionComponent<{ mainImage: ProductAttributeProps["productImage"] | undefined, thumbnails: ProductAttributeProps["productImages"] | undefined }> = ({ mainImage, thumbnails }): JSX.Element => {

    const [currentMainImage, setCurrentMainImage] = useState<{
        id: number,
        src: string;
        alt: string
    } | null>(null);

    useEffect(() => {
        if (mainImage) {
            setCurrentMainImage({
                id: mainImage.id,
                src: mainImage.src,
                alt: mainImage.alt,
            })
        }
    }, [mainImage]);

    const onChangeThumbnails = (id: number, src: string, alt: string): void => {
        setCurrentMainImage({
            id,
            src,
            alt,
        });
    }

    return <div className={classes["product-gallery"]}>
        <div className={classes["product-gallery-main"]}>
            {currentMainImage && <img src={currentMainImage?.src}
                alt={currentMainImage?.alt} />}
        </div>
        <ul className={classes["product-gallery-thumbnails"]}>
            {thumbnails?.map((image: { id: number; src: string, alt: string }) => {
                return (<li key={image.id}
                    className={currentMainImage?.id === image.id ? classes["active"] : ""}
                    onClick={onChangeThumbnails.bind(null, image.id, image.src, image.alt)}>
                    <img src={image.src} alt={image.alt} />
                </li>)
            })}
        </ul>
    </div>
}
export default ProductGallery;