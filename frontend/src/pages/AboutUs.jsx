import React from 'react'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 p-6 flex justify-center items-center">
      <div className="max-w-4xl bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl text-zinc-800 transform transition duration-500 hover:scale-[1.02]">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">About Book Buddies</h1>
        
        <p className="text-xl text-center mb-8 leading-relaxed">
          Welcome to <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Book Buddies</span>, where stories come alive! We're more than just a bookstore - we're your literary companions, dedicated to creating magical reading experiences for book lovers everywhere.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/60 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              We believe everyone deserves access to the transformative power of books. Our carefully curated collection spans across genres, ensuring there's a perfect read waiting for every book enthusiast.
            </p>
          </div>
          
          <div className="bg-white/90 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-2 border-purple-200">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              To create a vibrant community where readers can discover, explore, and share their love for literature, making every reading journey memorable and enriching.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-200/60 to-purple-200/60 p-8 rounded-2xl mb-12 transform transition duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl font-bold mb-6 text-center text-zinc-800">Why Choose Book Buddies?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/90 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-white">
              <div className="text-4xl mb-4 text-pink-600 animate-bounce">📚</div>
              <h3 className="font-semibold mb-2">Vast Collection</h3>
              <p>Thousands of titles across all genres</p>
            </div>
            <div className="bg-white/90 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-white">
              <div className="text-4xl mb-4 text-purple-600 animate-bounce">🚚</div>
              <h3 className="font-semibold mb-2">Swift Delivery</h3>
              <p>Books at your doorstep in no time</p>
            </div>
            <div className="bg-white/90 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-white">
              <div className="text-4xl mb-4 text-blue-600 animate-bounce">💝</div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p>Competitive prices and great deals</p>
            </div>
            <div className="bg-white/90 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-white">
              <div className="text-4xl mb-4 text-emerald-600 animate-bounce">🌟</div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p>Only authentic and high-quality books</p>
            </div>
            <div className="bg-white/90 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-white">
              <div className="text-4xl mb-4 text-cyan-600 animate-bounce">👥</div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p>Join our vibrant reader community</p>
            </div>
            <div className="bg-white/90 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-white">
              <div className="text-4xl mb-4 text-rose-600 animate-bounce">💫</div>
              <h3 className="font-semibold mb-2">Rewards Program</h3>
              <p>Earn points with every purchase</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-white/60 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Connect With Us</h2>
          <p className="text-lg mb-4">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <div className="space-x-4">
            <a href="mailto:contact@bookbuddies.com" className="inline-block px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:from-pink-700 hover:to-purple-700 transition duration-300 transform hover:scale-105">
              Email Us
            </a>
            <a href="tel:+1234567890" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs
