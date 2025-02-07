export type ProductDto = {
    ProductId: number,
    ProductName: string,
    Brand: string,
}

export type NewProductDto = Omit<ProductDto, "ProductId">