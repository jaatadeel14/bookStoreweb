import React, { useState } from 'react';
import { useCart } from '../context/CartProvider';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    });
    const [errors, setErrors] = useState({});

    const handleQuantityChange = (bookId, newQuantity) => {
        if (newQuantity >= 1) {
            updateQuantity(bookId, newQuantity);
        }
    };

    const handleRemove = (bookId) => {
        removeFromCart(bookId);
        toast.success('Item removed from cart');
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        const newErrors = {};
        if (!paymentDetails.cardNumber.match(/^\d{16}$/)) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }
        if (!paymentDetails.expiryDate.match(/^\d{2}\/\d{2}$/)) {
            newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
        }
        if (!paymentDetails.cvv.match(/^\d{3}$/)) {
            newErrors.cvv = 'Please enter a valid 3-digit CVV';
        }
        if (!paymentDetails.name.trim()) {
            newErrors.name = 'Please enter the cardholder name';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Process payment (in a real app, this would call your payment API)
        toast.success('Payment successful! Thank you for your purchase.');
        clearCart();
        navigate('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                    >
                        Continue Shopping
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item._id} className="flex gap-4 bg-white p-4 rounded-lg shadow dark:bg-slate-800">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-32 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{item.title}</p>
                                        <p className="text-pink-500 font-semibold">${item.price}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-l"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-1 bg-gray-50 dark:bg-slate-600">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-r"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item._id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow dark:bg-slate-800">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${getTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${getTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowPaymentForm(true)}
                                    className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Payment Modal */}
                    {showPaymentForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-md w-full">
                                <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            value={paymentDetails.cardNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-slate-700"
                                        />
                                        {errors.cardNumber && (
                                            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                placeholder="MM/YY"
                                                value={paymentDetails.expiryDate}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border rounded-md dark:bg-slate-700"
                                            />
                                            {errors.expiryDate && (
                                                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                placeholder="123"
                                                value={paymentDetails.cvv}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border rounded-md dark:bg-slate-700"
                                            />
                                            {errors.cvv && (
                                                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            value={paymentDetails.name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-slate-700"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowPaymentForm(false)}
                                            className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-slate-700"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                                        >
                                            Pay ${getTotal().toFixed(2)}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart; 