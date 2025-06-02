import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    // Initialize cart from localStorage or empty array
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const addToCart = (book) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === book._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === book._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...book, quantity: 1 }];
        });
    };

    // Remove item from cart
    const removeFromCart = (bookId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== bookId));
    };

    // Update item quantity
    const updateQuantity = (bookId, quantity) => {
        if (quantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === bookId ? { ...item, quantity } : item
            )
        );
    };

    // Calculate total price
    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getTotal,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext); 