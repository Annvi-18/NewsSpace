import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 text-zinc-800 px-12 py-8'>
      <div className='container mx-auto flex flex-col items-center'>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-300'>
          BOOK BUDDIES
        </h1>
        <p className='mt-4 text-zinc-600 text-center max-w-xl leading-relaxed'>
          Your trusted companion in the world of books. Discover, read, and connect with fellow book lovers.
        </p>
        <div className='mt-6 flex gap-6'>
          <a href="#" className='text-zinc-600 hover:text-pink-500 transition-colors duration-300'>About Us</a>
          <a href="#" className='text-zinc-600 hover:text-pink-500 transition-colors duration-300'>Contact</a>
          <a href="#" className='text-zinc-600 hover:text-pink-500 transition-colors duration-300'>Privacy Policy</a>
        </div>
        <p className='mt-8 text-zinc-600 font-medium'>
          &copy; {new Date().getFullYear()} Book Buddies. Made with 
          <span className='text-pink-500 mx-1'>♥</span> 
          for book lovers
        </p>
      </div>
    </div>
  )
}

export default Footer
