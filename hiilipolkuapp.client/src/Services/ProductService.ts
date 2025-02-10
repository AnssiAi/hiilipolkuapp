import { ProductDto, ProductDetailDto } from "../../types";

const baseUrl = "api/product"

export const getProducts = async (): Promise<ProductDto[]> => {
    const response = await fetch(baseUrl);
    //Datan parsiminen
    const data = await response.json();
    return data;
}
export const getProductById = async (id: number): Promise<ProductDetailDto> => {
    const response = await fetch(`${baseUrl}/${id}`);
    //Datan parsiminen
    const data = await response.json();
    return data;
}