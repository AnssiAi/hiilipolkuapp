export type ProductDto = {
    productId: number;
    productName: string;
    brand: string;
}
export type ProductDetailDto = {
    productId: number;
    productName: string;
    brand: string;
}
export type UserPosition = {
    latitude: number;
    longitude: number;
}

export type NewProductDto = Omit<ProductDto, "ProductId">