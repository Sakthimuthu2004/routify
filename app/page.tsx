import HeroSection from "./mainPageComponents/HeroSection";
import Navbar from "./mainPageComponents/Navbar";
import Image from "next/image";
// import gsap from 'gsap';
// import { ScrollTrigger } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger)
// import { useRef, useEffect } from "react";


import { useCallback } from "react";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="flex w-full justify-center mt-20">
        {/* <Image
          src={"/appp.png"}
          alt="dashboard"
          width={900}
          height={400}
          className="shadow-xl aspect-auto sm:w-full w-[398px]  rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        /> */}
        <video src="/rrr.mp4"
          width={900}
          height={400}
          autoPlay
          muted
          loop
          controls
          className="shadow-xl aspect-auto sm:w-full w-[398px]  rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        />



      </div>
    </div>
  );
}
// function ScrollAnimation() {
//   const sectionsRef = useRef([]);

//   useEffect(() => {
//     sectionsRef.current.forEach((section) => {
//       gsap.fromTo(
//         section,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           scrollTrigger: {
//             trigger: section,
//             start: "top 80%",
//             end: "top 50%",
//             scrub: true,
//           },
//         }
//       );
//     });
//   }, []);

//   return (
//     <div className="h-[200vh] flex flex-col items-center justify-center space-y-16">
//       {["One", "Two", "Three"].map((text, index) => (
//         <div
//           key={index}
//           ref={(el) => (sectionsRef.current[index] = el)}
//           className="w-40 h-40 bg-green-500 opacity-0 flex items-center justify-center text-white text-lg font-bold"
//         >
//           {text}
//         </div>
//       ))}
//     </div>
//   );
// }
