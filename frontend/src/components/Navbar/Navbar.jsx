import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLinesLeaning } from "react-icons/fa6";
import {useSelector} from "react-redux";


const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "About Us",
            link: "/about-us"
        },
        {
            title: "All Books",
            link: "/all-books"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        },
        {
          title: "Admin Profile",
          link: "/profile"
      },
    ];
    const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn);
   if(isLoggedIn == false){
    links.splice(3,2);
   }

   const role = useSelector((state)=>state.auth.role);
   if(role === "admin"){
    links.splice(4,1)
    // 3rd k baadka ek link remove krna hai
   }

    const [MobileNav, setMobileNav] = useState("hidden");
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <nav className={`z-50 fixed w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-transparent backdrop-blur-sm shadow-lg py-2' 
        : 'bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 py-4'
    } text-zinc-800 px-8 flex items-center justify-between`}>
      <Link to="/" className='flex items-center transform transition duration-300 hover:-translate-y-1 hover:animate-[shake_0.5s_ease-in-out_3]' >
        <h1 className={`text-3xl font-bold bg-gradient-to-r ${
          scrolled
            ? 'from-blue-500 to-purple-500'
            : 'from-pink-500 to-purple-500'
        } bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-300`}>BOOK BUDDIES</h1>
      </Link>
      <div className='nav-links-bookbuddies block md:flex gap-4 items-center'>
        <div className='hidden md:flex gap-4'>
        {links.map((items,i) =>(
            <Link 
              to={items.link} 
              className={`font-medium transform transition-all duration-300 hover:scale-110 ${
                scrolled ? 'text-blue-600 hover:text-purple-500' : 'text-zinc-700 hover:text-pink-500'
              }`}
              key={i}
            >
              {items.title}
            </Link>
        ))}
        </div>
        <div className='hidden md:flex gap-4'>
        {isLoggedIn === false ? (
        <>
        <Link 
          to="/login" 
          className={`px-4 py-2 bg-gradient-to-r ${
            scrolled 
              ? 'from-purple-400 to-blue-600'
              : 'from-blue-400 to-blue-600'
          } text-white rounded-full font-semibold 
          transform transition duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-500 hover:to-blue-700`}
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className={`px-4 py-2 bg-gradient-to-r ${
            scrolled
              ? 'from-blue-400 to-purple-600'
              : 'from-pink-400 to-purple-600'
          } text-white rounded-full font-semibold
          transform transition duration-300 hover:scale-105 hover:shadow-lg hover:from-pink-500 hover:to-purple-700`}
        >
          SignUp
        </Link>
        </>
       ) : (
        <></>
       )}
        </div>
        <button 
          onClick={() => (MobileNav === "hidden"? setMobileNav("block") : setMobileNav("hidden"))} 
          className={`text-2xl transform transition duration-300 hover:rotate-180 md:hidden ${
            scrolled ? 'text-blue-600 hover:text-purple-500' : 'text-zinc-700 hover:text-pink-500'
          }`}
        >
          <FaLinesLeaning />
        </button>
      </div>
    </nav>
    <div className="h-16"></div>
    <div 
      onClick={() => (MobileNav === "hidden"? setMobileNav("block") : setMobileNav("hidden"))} 
      className={`${MobileNav} bg-gradient-to-br from-pink-100/90 via-yellow-100/90 to-blue-100/90 backdrop-blur-md h-screen flex flex-col items-center 
      justify-center gap-6 text-3xl fixed top-0 left-0 w-full z-40`}
    >
        {links.map((items,i) =>(
            <Link 
              to={items.link}  
              className={`${MobileNav} text-zinc-700 font-medium hover:text-pink-500 transform transition-all duration-300 hover:scale-110`} 
              key={i}
            >
              {items.title}
            </Link>
        ))}
       {isLoggedIn === false ? (
        <>
        <Link 
          to="/login" 
          className={`${MobileNav} px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-semibold
          transform transition duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-500 hover:to-blue-700`}
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className={`${MobileNav} px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-full font-semibold
          transform transition duration-300 hover:scale-105 hover:shadow-lg hover:from-pink-500 hover:to-purple-700`}
        >
          SignUp
        </Link>
        </>
       ) : (
        <></>
       )}
    </div>
    </>
  )
}

export default Navbar
