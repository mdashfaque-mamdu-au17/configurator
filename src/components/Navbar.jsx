import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="h-[5vh] bg-white shadow-lg sticky top-0 z-20">
      <div className="max-w-[1280px] mx-auto bg-white flex justify-between">
        <h2 className="text-4xl text-black font-extrabold">Arcz</h2>

        <div className="flex gap-4 items-center">
          <Link to="/konva" className="w-fit hover:underline text-blue-500">
            Automatic
          </Link>
          <Link
            to="/konva-dynamic"
            className="w-fit hover:underline text-blue-500"
          >
            Dynamic
          </Link>
          <Link
            to="/konva-new-strat"
            className="w-fit hover:underline text-blue-500"
          >
            With Plus button approach
          </Link>
        </div>
      </div>
    </nav>
  );
}
