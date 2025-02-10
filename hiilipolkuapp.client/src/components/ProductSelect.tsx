import { ProductDto } from "../../types"
import ProductSelectDisplay from "./ProductSelectDisplay";


type ProductSelectProps = {
    products: ProductDto[];
}
function ProductSelect({ products }: ProductSelectProps) {


    const content = products && products.length > 0
        ? <ul>{products.map((product: ProductDto) => <ProductSelectDisplay key={product.productId} product={product} />)}</ul>
        : <p>Loading...</p>
    return (
        <div className="productSelect">
            {content}
        </div>
    );

}

export default ProductSelect;