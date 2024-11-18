import React from "react";
import Image from "next/image";

interface SplitImageProps {
  leftImage: string;
  rightImage: string;
  altLeft?: string;
  altRight?: string;
  className?: string;
}

const SplitImage = ({
  leftImage,
  rightImage,
  altLeft = "Left image",
  altRight = "Right image",
  className = "",
}: SplitImageProps) => {
  return (
    <div className={`relative w-full max-w-4xl mx-auto${className}`}>
      <div className="relative aspect-[4/3]">
        {/* Left Panel */}
        <div className="absolute inset-0 clip-path-right overflow-hidden z-[-2]">
          <Image
            crossOrigin="anonymous"
            src={rightImage}
            alt={altLeft}
            className="relative w-full h-full object-cover left-[200px]"
          />
        </div>

        {/* Right Panel */}
        <div className="absolute inset-0 clip-path-left z-[-2]">
          <Image
            crossOrigin="anonymous"
            src={leftImage}
            alt={altRight}
            className="relative w-full h-full object-cover right-[200px]"
          />
        </div>

        {/* Dividing Line */}
        <div className="absolute top-0 left-1/2 h-[800px] w-[5px] bg-black transform -translate-x-1/2 -translate-y-32 rotate-[15deg] z-[-1]" />
      </div>
    </div>
  );
};

export default SplitImage;
