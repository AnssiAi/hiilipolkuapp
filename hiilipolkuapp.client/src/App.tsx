import { useEffect, useState } from 'react';
import ErrorMessage from './components/ErrorMessage';
import './App.css';
import { ProductDto } from '../types';
import { getProducts } from './Services/ProductService';
import UserProvider from './context/UserContext';
import ProductSelect from './components/ProductSelect';
import ShoppingCart from './components/ShoppingCart';
import WorldMap from './components/WorldMap';
import InfoBar from './components/InfoBar';
import MapProvider from './context/MapContext';

function App() {
    const [error, setError] = useState<Error | null>(null)
    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async (): Promise<void> => {
        try {
            const response: ProductDto[] = await getProducts();
            setProducts(response);

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err)
            }
        }
    }

    return (
        <UserProvider>
            <div className="baseContainer">
                <InfoBar />
                <ErrorMessage error={error} setError={setError} />
                <MapProvider>
                <div >
                    <WorldMap />
                    <div className="container">
                        <ProductSelect products={products} />
                        <ShoppingCart />
                    </div>
                </div>
                </MapProvider>
            </div>
        </UserProvider>
    );


}

export default App;