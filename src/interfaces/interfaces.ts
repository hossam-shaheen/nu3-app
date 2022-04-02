export interface ProductType {
    id: number;
    title: string;
    price: number;
    image: string;
    vendor: string;
    link: string;
}

export interface ProductsType {
    totalItems: number;
    items: ProductType[];
}

export interface ProductsSearchProps {
    onSearch: (searchKeyWord: string) => void;
}

export interface SortProps {
    onSort: (sortKeyWord: string) => void;
}
export interface ImageType {
    id: number;
    src: string;
    alt: string;
}
export interface ProductAttributeProps {
    productImage: ImageType;
    productImages: ImageType[];
    ProductTitle: string;
    productBodyHtml: string;
    productVendor: string;
}


export interface ProductVariantsProps {
    options: OptionsType[];
    variants: VariantType[];
}


export interface ProductInfoType {
    id: number;
    title: string;
    body_html: string;
    vendor: string;
    images: ImageType[];
    image: ImageType;
    options: OptionsType[];
    variants: VariantType[];
    url: string;
}

export interface VariantType {
    id: number,
    title: string,
    price: number,
}

export interface OptionsType {
    id: number,
    values: string[],
    name: string,
}

export interface ErrorType {
    icon?: string,
    message: string
}