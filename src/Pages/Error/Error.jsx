import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen errorBG bg-fixed flex items-center justify-center">
      <div className="bg-black w-full h-full bg-opacity-40 flex items-center justify-center rounded-xl">
        <Link to="/">
          <button className="btn btn-outline bg-red-500 border-0 border-b-4 font-bold border-black hover:bg-red-900">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
