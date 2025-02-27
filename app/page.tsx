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
