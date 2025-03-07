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


//Ensures we get an error if types are altered
type ProductDtoRecord = Record<(keyof ProductDto), undefined>
type ProductDetailDtoRecord = Record<(keyof ProductDetailDto), undefined>
type ProductionRecord = Record<(keyof Production), undefined>

export const ProductDtoRecordObject: ProductDtoRecord = {
    productId: undefined,
    productName: undefined,
    brand: undefined,
}
export const ProductDetailDtoRecordObject: ProductDetailDtoRecord = {
    productId: undefined,
    productName: undefined,
    brand: undefined,
    production: undefined,
}
export const ProductionRecordObject: ProductionRecord = {
    productionId: undefined,
    productionType: undefined,
    latitude: undefined,
    longitude: undefined,
    coG: undefined,
}