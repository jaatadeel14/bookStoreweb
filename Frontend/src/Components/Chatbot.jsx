import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const messagesEndRef = useRef(null);

  // Fetch all books once when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:4001/book');
        setAllBooks(res.data || []);
      } catch (error) {
        console.error("Error fetching books for chatbot:", error);
        // Handle error, maybe set a default message or disable chatbot
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Initial greeting when chat opens for the first time
      setMessages([{ sender: 'ai', text: 'Hello! How can I help you find a book today?' }]);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const processUserMessage = (messageText) => {
    const lowerCaseMessage = messageText.toLowerCase();
    let responseText = "I'm sorry, I can only provide information about our books. Try asking about authors, titles, or genres!";

    if (allBooks.length === 0 && !(lowerCaseMessage.includes('founder') || lowerCaseMessage.includes('ceo'))) {
        return "I'm still loading our book catalog. Please try again in a moment.";
    }

    // Specific check for founder/CEO question
    if (lowerCaseMessage.includes('founder') || lowerCaseMessage.includes('ceo') || lowerCaseMessage.includes('owner')) {
        responseText = "The founder and CEO of this website is Adeel Jaat and his assistant name is Faiza Adeel.";
        return responseText; // Return immediately as this is a specific non-book query
    }

    const foundBooks = allBooks.filter(book =>
        (book.name && book.name.toLowerCase().includes(lowerCaseMessage)) ||
        (book.category && book.category.toLowerCase().includes(lowerCaseMessage)) ||
        (book.title && book.title.toLowerCase().includes(lowerCaseMessage)) // Assuming 'title' might be different from 'name'
    );

    if (lowerCaseMessage.includes('all books') || lowerCaseMessage.includes('show me books')) {
        if (allBooks.length > 0) {
            const bookList = allBooks.slice(0, 5).map(b => `${b.name} (Category: ${b.category})`).join('\n'); // Removed author assuming it might not always be present
            responseText = `Here are some books we have:\n${bookList}\nThere are ${allBooks.length} books in total. You can ask for more details!`;
        } else {
            responseText = "We don't seem to have any books in our catalog right now.";
        }
    } else if (foundBooks.length > 0) {
      if (foundBooks.length === 1) {
        const book = foundBooks[0];
        responseText = `Found: ${book.name}. Price: $${book.price}. Category: ${book.category}. ${book.title || ''}. Would you like to know more?`;
      } else {
        const bookNames = foundBooks.slice(0, 3).map(b => b.name).join(', ');
        responseText = `I found a few books matching your query: ${bookNames}. Can you be more specific or ask about one?`;
      }
    } else {
        // More specific keyword checks
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            responseText = 'Hello there! Looking for a book?';
        } else if (lowerCaseMessage.includes('thanks') || lowerCaseMessage.includes('thank you')) {
            responseText = 'You\'re welcome! Happy reading!';
        } else if (lowerCaseMessage.includes('bye')) {
            responseText = 'Goodbye! Feel free to ask if you need anything else.';
        }
    }
    return responseText;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = { sender: 'user', text: inputValue };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // Simulate AI response
    const aiResponseText = processUserMessage(inputValue);
    const newAiMessage = { sender: 'ai', text: aiResponseText };

    setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, newAiMessage]);
    }, 500); // Simulate delay

    setInputValue('');
  };


  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"
        aria-label="Open chat"
      >
        {/* Using a simple chat icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.078.464.126.938.126 1.423 0 3.028-2.472 5.489-5.522 5.489S9.334 13.022 9.334 10c0-.484.048-.959.126-1.423m10.792 0c-.078-.464-.126-.938-.126-1.423 0-3.028-2.472-5.489-5.522-5.489S9.334 3.978 9.334 7c0 .484.048.959.126 1.423m0 0C9.619 9.064 10.238 10 10.857 10h2.286c.619 0 1.238-.936 1.393-1.489M10.5 17.25h3M12 21V11.25" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 sm:w-96 h-[400px] sm:h-[500px] bg-white dark:bg-slate-800 shadow-2xl rounded-lg flex flex-col z-50 border dark:border-slate-700">
      <div className="bg-blue-600 dark:bg-blue-700 text-white p-3 flex justify-between items-center rounded-t-lg">
        <h3 className="font-semibold">Bookstore Bot</h3>
        <button onClick={toggleChat} className="text-white hover:text-gray-200" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-grow p-3 overflow-y-auto space-y-2 bg-gray-50 dark:bg-slate-700">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] p-2 rounded-lg shadow ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-gray-200 text-gray-800 dark:bg-slate-600 dark:text-white'
              }`}
            >
              {/* Ensure text is treated as pre-wrap to respect newlines from response */}
              {msg.text.split('\\n').map((line, i) => (<p key={i} style={{whiteSpace: "pre-wrap"}}>{line}</p>))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t dark:border-slate-600 bg-white dark:bg-slate-800 flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about books..."
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 