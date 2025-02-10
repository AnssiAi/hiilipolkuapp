import { useEffect, useState } from 'react';
import ErrorMessage from './components/ErrorMessage';
import './App.css';
import { ProductDto } from '../types';
import { getProducts } from './Services/ProductService';
import ShoppingCartProvider from './context/ShoppingCartContext';
import ProductSelect from './components/ProductSelect';
import ShoppingCart from './components/ShoppingCart';

function App() {
    const [error, setError] = useState<Error | null>(null)
    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async (): Promise<void> => {
        try {
            const response: ProductDto[] = await getProducts();
            console.log(response)
            setProducts(response);

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err)
            }
        }
    }

    return (
        <ShoppingCartProvider>
            <div>
                <h1 id="tableLabel">Hiilipolku</h1>
                <ErrorMessage error={error} setError={setError} />
                <div className="container">
                    <ProductSelect products={products} />
                    <ShoppingCart />
                </div>
            </div>
        </ShoppingCartProvider>
    );


}

export default App;