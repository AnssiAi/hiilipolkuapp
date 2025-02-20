export type ProductDto = {
    productId: number;
    productName: string;
    brand: string;
}
export type ProductDetailDto = {
    productId: number;
    productName: string;
    brand: string;
    production: Production;
}
export type Production = {
    productionId: number;
    productionType: ProductionType;
    latitude: number;
    longitude: number;
    coG: number;

}
export type UserPosition = {
    latitude: number;
    longitude: number;
}

export enum ProductionType {
    factory,
    farm,
}

export type NewProductDto = Omit<ProductDto, "productId">