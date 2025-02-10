import { createContext, ReactNode, useContext } from 'react'
import { ProductDetailDto } from '../../types';
import { getProductById } from '../Services/ProductService';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type ShoppingCartContext = {
    cartItems: ProductDetailDto[]
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<ProductDetailDto[]>("shopping-cart", []);

    const addToCart = async (id: number) => {
        try {
            const detailItem: ProductDetailDto = await getProductById(id);;
            const newCart: ProductDetailDto[] = cartItems.concat(detailItem);
            setCartItems(newCart);

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }
    const removeFromCart = async (id: number) => {
        const newCart = cartItems.filter((item) => item.productId !== id)
        setCartItems(newCart);
    }

    return (
        <ShoppingCartContext.Provider value={{ cartItems, addToCart, removeFromCart }} >
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider;