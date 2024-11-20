import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-black py-4 shadow-[rgba(0,0,15,0.5)_0px_-3px_5px_0px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full text-white">
        <p className="text-left flex-1">
          &copy; {new Date().getFullYear()} NHL Gameday Generator
        </p>

        <div className="flex-1 flex justify-center">
          <Image
            src="/images/rvd logo.png"
            alt="Logo"
            width={50}
            height={50}
            className=""
          />
        </div>

        <div className="flex-1 flex justify-end">
          <a
            href="https://github.com/ryanvandrunen/nhl-gameday-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
