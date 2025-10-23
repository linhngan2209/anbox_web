'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

export type CartItem = {
    recipeId: string;
    name: string;
    category: string;
    url: string;
    quantity: number;
    servings: '1' | '2' | '4';
    price?: number;
};

type CartContextType = {
    items: CartItem[];
    maxMeals: number;
    setMaxMeals: (num: number) => void;
    addItem: (item: CartItem) => void;
    removeItem: (recipeId: string) => void;
    updateQuantity: (recipeId: string, quantity: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [maxMeals, setMaxMeals] = useState(1);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const savedItems = localStorage.getItem('weekly_menu_cart');
            const savedMax = localStorage.getItem('weekly_menu_maxMeals');
            if (savedItems) setItems(JSON.parse(savedItems));
            if (savedMax) setMaxMeals(parseInt(savedMax));
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('weekly_menu_cart', JSON.stringify(items));
            localStorage.setItem('weekly_menu_maxMeals', maxMeals.toString());
        }
    }, [items, maxMeals, isClient]);

    const addItem = (item: CartItem) => {
        if (items.length >= maxMeals) {
            toast.error(`Bạn chỉ có thể chọn tối đa ${maxMeals} món`);
            return;
        }
        const isExisting = items.some((i) => i.recipeId === item.recipeId);
        if (isExisting) {
            toast.error(`Món "${item.name}" đã có trong giỏ hàng!`);
            return;
        }
        setItems([...items, item]);
        toast.success(`Đã thêm ${item.name} vào giỏ hàng!`);
    };

    const removeItem = (recipeId: string) => {
        setItems((prev) => prev.filter((i) => i.recipeId !== recipeId));
    };

    const updateQuantity = (recipeId: string, quantity: number) => {
        setItems((prev) =>
            prev.map((i) => (i.recipeId === recipeId ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => setItems([]);

    return (
        <CartContext.Provider
            value={{ items, maxMeals, setMaxMeals, addItem, removeItem, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
