import { ProductDto, ProductDetailDto } from "../../types";
import { productDetailDTOParser, productListParser } from "../utilities/TypeParser";

const baseUrl = "api/product"

/**
 * Fetch ProductDto list from api
 * @returns
 */
export const getProducts = async (): Promise<ProductDto[]> => {
    const response = await fetch(baseUrl);
    const data: ProductDto[] = await response.json();
    return productListParser(data);
}
/**
 * Fetch ProductDetailDto by id from api
 * @param id
 * @returns
 */
export const getProductById = async (id: number): Promise<ProductDetailDto> => {
    const response = await fetch(`${baseUrl}/${id}`);
    const data: ProductDetailDto = await response.json();
    return productDetailDTOParser(data);
}