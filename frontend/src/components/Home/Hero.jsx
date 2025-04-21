import React from 'react'
import RecentlyAdded from './RecentlyAdded'

const Hero = () => {
  return (
    <div className='h-[75vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-pink-200 via-violet-100 to-blue-100 overflow-hidden'>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center p-8 animate-fadeIn transform transition-all duration-500 hover:scale-105'>
        <h1 className='text-4xl lg:text-6xl font-bold pt-12 text-center lg:text-left text-zinc-800 tracking-tight leading-tight transform transition-all duration-300 hover:-translate-y-1'>
          <span className="inline-block mx-2 animate-[fadeIn_0.5s_ease-in_forwards] [animation-delay:0.2s] hover:text-pink-400 hover:scale-110 transition-all">
            Discover
          </span>
          <span className="inline-block mx-2 animate-[fadeIn_0.5s_ease-in_forwards] [animation-delay:0.4s] hover:text-pink-300 hover:scale-110 transition-all">
            your
          </span>
          <span className="inline-block mx-2 animate-[fadeIn_0.5s_ease-in_forwards] [animation-delay:0.6s] hover:text-pink-400 hover:scale-110 transition-all">
            next
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300 inline-block mx-2 animate-[fadeIn_0.5s_ease-in_forwards] [animation-delay:0.8s] hover:from-pink-300 hover:to-pink-400 hover:scale-110 transition-all">
            Great
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300 inline-block mx-2 animate-[fadeIn_0.5s_ease-in_forwards] [animation-delay:1s] hover:from-pink-300 hover:to-pink-400 hover:scale-110 transition-all">
            read
          </span>
        </h1>
        <p className='mt-6 text-xl text-pink-700 text-center lg:text-left max-w-xl leading-relaxed transform transition-all duration-300 hover:text-pink-800 hover:scale-105'>
          Embark on a literary journey through our carefully curated collection of books. Find stories that inspire, educate, and transport you to new worlds.
        </p>
        <div className='mt-10 animate-slideUp animation-delay-400'>
          <button className='text-pink-700 text-xl font-semibold border-2 border-pink-400 
            px-10 py-3 rounded-full transition-all duration-500 ease-in-out
            hover:bg-pink-400 hover:text-white hover:shadow-lg hover:shadow-pink-400/20
            transform hover:scale-105 active:scale-95 animate-bounce animation-delay-600
            hover:rotate-2'>
            Discover Books
          </button>
        </div> 
      </div>
      <div className='w-full mt-4 items-center lg:w-3/6 h-auto lg:h-[100%] flex justify-center 
        animate-slideIn animation-delay-600'>
        <img 
          src='./hero.jpg' 
          alt='Featured Books Collection'
          className='rounded-lg shadow-2xl shadow-pink-300/50 transform hover:scale-105 
            transition-transform duration-500 ease-in-out max-w-md animate-pulse'
        />
      </div>
    </div>
  )
}

export default Hero
