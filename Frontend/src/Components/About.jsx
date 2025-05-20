import React from 'react'

function About() {
  return (
   <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white py-16 mt-14'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
        {/* Left side - Text content */}
        <div className='md:w-1/2'>
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className='text-lg mb-4'>
            Welcome to our bookstore! We are passionate about bringing the joy of reading to everyone. Our carefully curated collection includes a wide variety of books to inspire, educate, and entertain readers of all ages. Whether you’re looking for timeless classics, contemporary works, or hidden gems, we have something for you.
          </p>
          <p className='text-lg mb-4'>
            Our mission is to create a haven for book lovers, offering not only a diverse selection but also a seamless online shopping experience. We believe in the power of stories to connect people, spark imaginations, and enrich lives.
          </p>
          <p className='text-lg'>
            Thank you for choosing us as your trusted destination for books. We are dedicated to helping you discover your next great read!
          </p>
        </div>

        {/* Right side - Image */}
        <div className='md:w-1/2 flex justify-center'>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
            alt="About Us" 
            className='rounded-lg shadow-xl w-full max-w-md h-auto object-cover'
          />
        </div>
      </div>
    </div>
   
   </>
  )
}

export default About
