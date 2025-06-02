// import React from 'react';

// function Contact() {
//   return (
//     <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white'>
//       <div className='mt-28 items-center justify-center'>
//         <div className="max-w-md mx-auto space-y-6">
//           <h1 className="text-3xl font-bold text-left mb-8">Contact Us</h1>
          
//           <form className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Name</label>
//               <input 
//                 type="text" 
//                 placeholder="Enter your name" 
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-600"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email</label>
//               <input 
//                 type="email" 
//                 placeholder="Email address" 
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-600"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Message</label>
//               <textarea 
//                 rows="4" 
//                 placeholder="Type your message" 
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-600"
//               ></textarea>
//             </div>
            
//             <button 
//               type="submit" 
//               className="py-2 px-6 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 text-sm"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;



















import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getformEndpoint = 'https://getform.io/f/azylqyyb'; // Your Getform endpoint

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid.';
      isValid = false;
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    // Clear status message on new input
    if (statusMessage) {
        setStatusMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(''); // Clear previous status messages
    setErrors({});      // Clear previous errors

    if (validate()) {
      setIsSubmitting(true);
      setStatusMessage('Sending...');

      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      // You can add more fields here if needed for Getform
      // data.append('_gotcha', ''); // Optional: for spam protection if enabled in Getform

      try {
        const response = await fetch(getformEndpoint, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json', // Getform might return JSON
          },
        });

        if (response.ok) {
          // const result = await response.json(); // If Getform returns JSON
          setStatusMessage('Message sent successfully! Thank you.');
          setFormData({ name: '', email: '', message: '' }); // Clear form
          setErrors({});
        } else {
          // Try to get error message from Getform if available
          let errorText = 'An error occurred. Please try again.';
          try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
              errorText = `Error: ${errorData.error}`;
            } else if (response.statusText) {
              errorText = `Error ${response.status}: ${response.statusText}`;
            }
          } catch (jsonError) {
            // If response is not JSON, use statusText
             if (response.statusText) {
              errorText = `Error ${response.status}: ${response.statusText}`;
            }
          }
          setStatusMessage(errorText);
        }
      } catch (error) {
        console.error('Submission error:', error);
        setStatusMessage('An error occurred while sending the message. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStatusMessage('Please correct the errors above.');
    }
  };

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white'>
      <div className='mt-28 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-10'> {/* Added min-h and py for better spacing */}
        <div className="w-full max-w-md mx-auto space-y-6"> {/* Ensured w-full for responsiveness */}
          <h1 className="text-3xl font-bold text-center md:text-left mb-8">Contact Us</h1> {/* Centered on small screens */}
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate> {/* noValidate to prevent browser default validation */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 dark:bg-slate-800 dark:border-gray-600 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 dark:bg-slate-800 dark:border-gray-600 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Type your message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 dark:bg-slate-800 dark:border-gray-600 ${
                  errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              ></textarea>
              {errors.message && <p id="message-error" className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.message}</p>}
            </div>
            
            {statusMessage && (
              <div className={`p-3 rounded text-sm ${
                statusMessage.includes('successfully') ? 'bg-green-100 border border-green-400 text-green-700 dark:bg-green-700 dark:text-green-100 dark:border-green-600' 
                : statusMessage.includes('Sending...') ? 'bg-blue-100 border border-blue-400 text-blue-700 dark:bg-blue-700 dark:text-blue-100 dark:border-blue-600'
                : 'bg-red-100 border border-red-400 text-red-700 dark:bg-red-700 dark:text-red-100 dark:border-red-600'
              }`}
              role="alert"
              >
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 px-6 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

