import { createContext, ReactNode, useContext, useState } from 'react'
import { ProductDetailDto, UserPosition } from '../../types';
import { getProductById } from '../Services/ProductService';
import { useLocalStorage } from '../hooks/useLocalStorage';

type UserProviderProps = {
    children: ReactNode;
}

type UserContext = {
    cartItems: ProductDetailDto[]
    userPosition: UserPosition | null;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    addPosition: (latitude: number, longitude: number) => void;
}

const UserContext = createContext({} as UserContext);

export function useUser() {
    return useContext(UserContext);
}

function UserProvider({ children }: UserProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<ProductDetailDto[]>("shopping-cart", []);
    const [userPosition, setUserPosition] = useState<UserPosition | null>(null);

    const addToCart = async (id: number) => {
        try {
            if (!cartItems.find((item) => item.productId === id)) {
                const detailItem: ProductDetailDto = await getProductById(id);
                console.log(detailItem);
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
        <UserContext.Provider value={{ userPosition, cartItems, addToCart, removeFromCart, addPosition }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;