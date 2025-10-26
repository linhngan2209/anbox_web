'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

export type CartItem = {
    itemId: string;
    name: string;
    category?: string;
    url: string;
    quantity: number;
    servings?: '1' | '2' | '4';
    price?: number;
    type: 'dish' | 'appliance';
};

type CartContextType = {
    items: CartItem[];
    maxMeals: number;
    setMaxMeals: (num: number) => void;
    addItem: (item: CartItem) => void;
    removeItem: (itemId: string, type: 'dish' | 'appliance') => void;
    updateQuantity: (itemId: string, type: 'dish' | 'appliance', quantity: number) => void;
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
            localStorage.setItem('weekly_menu_cart', JSON.stringify(items));
            localStorage.setItem('weekly_menu_maxMeals', maxMeals.toString());
        }
    }, [items, maxMeals, isClient]);


    const addItem = (item: CartItem) => {
        if (item.type === 'dish' && items.filter(i => i.type === 'dish').length >= maxMeals) {
            toast.error(`Bạn chỉ có thể chọn tối đa ${maxMeals} món ăn`);
            return;
        }

        const isExisting = items.some(i => i.itemId === item.itemId && i.type === item.type);
        if (isExisting) {
            toast.error(`"${item.name}" đã có trong giỏ hàng!`);
            return;
        }

        setItems(prev => [...prev, item]);
        toast.success(`Đã thêm ${item.name} vào giỏ hàng!`);
    };

    const removeItem = (itemId: string, type: 'dish' | 'appliance') => {
        setItems(prev => prev.filter(i => !(i.itemId === itemId && i.type === type)));
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    };

    const updateQuantity = (itemId: string, type: 'dish' | 'appliance', quantity: number) => {
        setItems(prev =>
            prev.map(i =>
                i.itemId === itemId && i.type === type
                    ? { ...i, quantity }
                    : i
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        toast.success('Đã xóa toàn bộ giỏ hàng');
    };

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
