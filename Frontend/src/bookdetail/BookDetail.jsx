import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useCart } from '../context/CartProvider';
import toast from 'react-hot-toast';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    if (book.price === 0) {
      toast.error("Free books cannot be added to cart");
      return;
    }
    addToCart(book);
    toast.success('Added to cart successfully!');
    navigate('/cart');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Book not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Book Image */}
            <div className="flex justify-center items-start">
              <img
                src={book.image}
                alt={book.name}
                className="rounded-lg shadow-xl max-w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
                <div className="badge badge-secondary mb-4">{book.category}</div>
                <p className="text-xl mb-4">{book.title}</p>
                <p className="text-2xl font-semibold text-pink-500">
                  {book.price === 0 ? 'Free' : `$${book.price}`}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {book.description || "No description available."}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Category</p>
                    <p className="text-gray-600 dark:text-gray-300">{book.category}</p>
                  </div>
                  <div>
                    <p className="font-medium">Format</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {book.format || "Digital"}
                    </p>
                  </div>
                </div>
              </div>

              {book.price > 0 ? (
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary w-full"
                >
                  Add to Cart - ${book.price}
                </button>
              ) : (
                <button 
                  className="btn btn-success w-full"
                  onClick={() => toast.success('Enjoy your free book!')}
                >
                  Download Free
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetail; 