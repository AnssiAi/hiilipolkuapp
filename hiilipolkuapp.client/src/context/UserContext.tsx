import { createContext, ReactNode, useContext, useState } from 'react'
import { ProductDetailDto, ProductDto, UserPosition } from '../../types';
import { getProductById, getProducts, queryProducts } from '../Services/ProductService';
import { useLocalStorage } from '../hooks/useLocalStorage';

type UserProviderProps = {
    children: ReactNode;
}

type UserContext = {
    products: ProductDto[];
    error: Error | null;
    cartItems: ProductDetailDto[];
    userPosition: UserPosition | null;
    fetchProducts: () => void;
    setError: (err: Error | null) => void;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    addPosition: (latitude: number, longitude: number) => void;
    fetchByQuery: (value: string) => void;
}

const UserContext = createContext({} as UserContext);

export function useUser() {
    return useContext(UserContext);
}

function UserProvider({ children }: UserProviderProps) {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [error, setError] = useState<Error | null>(null)
    const [cartItems, setCartItems] = useLocalStorage<ProductDetailDto[]>("shopping-cart", []);
    const [userPosition, setUserPosition] = useState<UserPosition | null>(null);

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
    const fetchByQuery = async (query: string): Promise<void> => {
        try {
            const response: ProductDto[] = await queryProducts(query);
            setProducts(response);
            
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err)
            }
        }
    }
    
    const addToCart = async (id: number) => {
        try {
            if (!cartItems.find((item) => item.productId === id)) {
                const detailItem: ProductDetailDto = await getProductById(id);
                const newCart: ProductDetailDto[] = cartItems.concat(detailItem);
                setCartItems(newCart);
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }
    const removeFromCart = (id: number) => {
        const newCart = cartItems.filter((item) => item.productId !== id)
        setCartItems(newCart);
    }
    const addPosition = (latitude: number, longitude: number) => {
        setUserPosition({
            latitude: latitude,
            longitude: longitude,
        })
    }

    return (
        <UserContext.Provider value={{ products, error, fetchProducts, setError, userPosition, cartItems, addToCart, removeFromCart, addPosition, fetchByQuery }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;