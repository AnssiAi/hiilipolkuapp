import { ProductDetailDto, ProductDetailDtoRecordObject, ProductDto, ProductDtoRecordObject, Production, ProductionRecordObject } from "../../types";
/**
 * Verifies parameter is of type number with typeof and instanceof comparison
 * @param val
 * @returns
 */
const isNumber = (val: unknown): val is number => typeof val === "number" || val instanceof Number;
/**
 * Verifies parameter is of type string with typeof and instanceof comparison
 * @param val
 * @returns
 */
const isString = (val: unknown): val is string => typeof val === "string" || val instanceof String;
/**
 * Verifies parameter is of type object with typeof and instanceof comparison
 * @param val
 * @returns 
 */
const isObject = (val: unknown): val is object => typeof val === "object" || val instanceof Object;

/**
 * Verifies object has keys of ProductDto
 * @param object
 * @returns
 */
const isProductDto = (object: object): object is ProductDto => {
    const dtoKeys = Object.keys(ProductDtoRecordObject);
    const objectKeys = Object.keys(object);

    return dtoKeys.every((key) => objectKeys.includes(key));
}

/**
 * Verifies object has keys of ProductDetailDto
 * @param object
 * @returns
 */
const isProductDetailDto = (object: object): object is ProductDetailDto => {
    const dtoKeys = Object.keys(ProductDetailDtoRecordObject);
    const objectKeys = Object.keys(object);

    return dtoKeys.every((key) => objectKeys.includes(key));
}

/**
 * Verifies object has keys of Production
 * @param object
 * @returns
 */
const isProduction = (object: object): object is Production => {
    const dtoKeys = Object.keys(ProductionRecordObject);
    const objectKeys = Object.keys(object);

    return dtoKeys.every((key) => objectKeys.includes(key));
}

/**
 * Parses unknown type into a number type
 * Throws error if parsing fails
 * @param val
 * @returns
 */
const parseNumber = (val: unknown): number => {
    if (!isNumber(val)) {
        throw new Error("Incorrect type: Expected number");
    }
    return val;
}
/**
 * Parses unknown type into a string type
 * Throws error if parsing fails
 * @param val
 * @returns
 */
const parseString = (val: unknown): string => {
    if (!isString(val)) {
        throw new Error("Incorrect type: Expected string");
    }
    return val;
}
/**
 * Parses unknown type into a object type
 * Throws error if parsing fails
 * @param val
 * @returns
 */
const parseObject = (val: unknown): object => {
    if (!isObject(val)) {
        throw new Error("Incorrect type: Expected object");
    }
    return val;
}
/**
 * Parses object list of unknown type into a ProductDto list
 * Throws error if parsing fails
 * @param objects
 * @returns
 */
export const productListParser = (objects: unknown[]): ProductDto[] => {
    return objects.map((object) => productDTOParser(object));
}

/**
 * Parses unknown object into a ProductDto object
 * Throws error if parsing fails
 * @param object
 * @returns
 */
const productDTOParser = (object: unknown): ProductDto => {
    const verifiedObject = parseObject(object);
    if (!isProductDto(verifiedObject)) {
        throw new Error("Missing product data");
    }
    return {
        productId: parseNumber(verifiedObject.productId),
        productName: parseString(verifiedObject.productName),
        brand: parseString(verifiedObject.brand),
    }

}

/**
 * Parses unknown object into a ProductDetailDto object
 * Throws error if parsing fails
 * @param object
 * @returns
 */
export const productDetailDTOParser = (object: unknown): ProductDetailDto => {
    const verifiedObject = parseObject(object);
    if (!isProductDetailDto(verifiedObject)) {
        throw new Error("Missing product detail data");
    }
    return {
        productId: parseNumber(verifiedObject.productId),
        productName: parseString(verifiedObject.productName),
        brand: parseString(verifiedObject.brand),
        production: productionParser(verifiedObject.production)
    }
}

/**
 * Parses unknown object into a Production object
 * Throws error if parsing fails
 * @param object
 * @returns
 */
const productionParser = (object: unknown): Production => {
    const verifiedObject = parseObject(object);
    if (!isProduction(verifiedObject)) {
        throw new Error("Missing production data");
    }
    return {
        productionId: parseNumber(verifiedObject.productionId),
        productionType: parseNumber(verifiedObject.productionType),
        latitude: parseNumber(verifiedObject.latitude),
        longitude: parseNumber(verifiedObject.longitude),
        coG: parseNumber(verifiedObject.coG),
    }
}