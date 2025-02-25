// "use client";

// import React from "react";
// import AppIcon from "../SVG_Icons/AppIcon";
// import Link from "next/link";
// import { useAuth } from "@clerk/nextjs";
// import LogoAnName from "../Components/LogoAnName";

// function Navbar() {
//   const { userId } = useAuth();
//   // const defaultColor = "#d90429";
//   const defaultColor = "#064e3b"
//   const backgroundColorObject = { backgroundColor: defaultColor };
//   return (
//     <header>
//       <div className=" p-8 px-20  ">
//         <div className="sm:flex sm:items-center sm:justify-between ">
//           <div className="text-center  sm:text-left mb-7 sm:mb-0">
//             {/* Icon + Name of The App */}
//             {/* ----------------------- */}
//             <LogoAnName />
//           </div>
//           {/*  */}
//           {/* The buttons */}

//           <div>
//             {userId ? (
//               <Link href={"/dashboard"}>
//                 <button
//                   style={backgroundColorObject}
//                   className={`block    rounded-lg  px-9 py-3 text-sm font-medium hover:text-white transition  text-black 
//                `}
//                   type="button"
//                 >
//                   Dashboard
//                 </button>
//               </Link>
//             ) : (
//               <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
//                 <Link href={"/sign-in"}>
//                   <button
//                     // style={backgroundColorObject}
//                     className={`block sm:w-32 w-full border rounded-lg  px-9 py-3 text-sm font-medium  transition   focus:outline-none  hover:bg-green-900 hover:text-white  border-green-900  text-green-900`}
//                     type="button"
//                   >
//                     Sign In
//                   </button>
//                 </Link>

//                 <Link href={"/sign-up"}>
//                   <button
//                     className={`block sm:w-32 w-full border rounded-lg  px-9 py-3 text-sm font-medium   transition   
//               focus:outline-none hover:bg-green-900 hover:text-white  border-green-900 text-green-900 `}
//                     type="button"
//                   >
//                     Sign Up
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

"use client";
import React, { useState } from "react";
import AppIcon from "../SVG_Icons/AppIcon";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import LogoAnName from "../Components/LogoAnName";

function Navbar() {
  const { userId } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const defaultColor = "#064e3b";
  const backgroundColorObject = { backgroundColor: defaultColor };

  return (
    <header>
      <div className="p-8 px-20 flex justify-between items-center">
        <div className="flex items-center">
          <LogoAnName />
        </div>

        <nav className="hidden md:block">
          {userId ? (
            <Link href={"/dashboard"}>
              <button
                style={backgroundColorObject}
                className="rounded-lg px-9 py-3 text-sm font-medium text-black hover:text-white transition"
                type="button"
              >
                Dashboard
              </button>
            </Link>
          ) : (
            <div className="flex gap-4">
              <Link href={"/sign-in"}>
                <button
                  className="border rounded-lg px-9 py-3 text-sm font-medium hover:bg-green-900 hover:text-white transition border-green-900 text-green-900"
                  type="button"
                >
                  Sign In
                </button>
              </Link>
              <Link href={"/sign-up"}>
                <button
                  className="border rounded-lg px-9 py-3 text-sm font-medium hover:bg-green-900 hover:text-white transition border-green-900 text-green-900"
                  type="button"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </nav>

        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden block"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden px-8 pb-4">
          {userId ? (
            <Link href={"/dashboard"}>
              <button
                style={backgroundColorObject}
                className="w-full text-left rounded-lg px-4 py-2 text-sm font-medium text-black hover:text-white transition"
                type="button"
              >
                Dashboard
              </button>
            </Link>
          ) : (
            <div className="flex flex-col gap-4">
              <Link href={"/sign-in"}>
                <button
                  className="w-full border rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-900 hover:text-white transition border-green-900 text-green-900"
                  type="button"
                >
                  Sign In
                </button>
              </Link>
              <Link href={"/sign-up"}>
                <button
                  className="w-full border rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-900 hover:text-white transition border-green-900 text-green-900"
                  type="button"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;

