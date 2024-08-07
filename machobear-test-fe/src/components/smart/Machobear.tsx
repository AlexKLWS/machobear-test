"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import bear_img from "@/assets/images/bearchute-nq8.png";

export const Machobear = () => {
  const [positionOffset, setPositionOffset] = useState({
    right: 0,
    top: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPositionOffset({ right: e.pageX / 80, top: e.pageY / 100 });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute h-full w-full pointer-events-none">
      <Image
        src={bear_img}
        alt={"Bear with a parachute"}
        width="86"
        height="86"
        className="absolute"
        style={{
          right: 20 + positionOffset.right,
          top: 10 - positionOffset.top,
        }}
      />
    </div>
  );
};
