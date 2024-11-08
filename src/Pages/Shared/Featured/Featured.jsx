import React from "react";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/images/240_F_670733669_FRqw6ovSSwUWwgLbq93E1NTPjGCCdx02.jpg";
import moment from "moment";
import { Link } from "react-router-dom";
const Featured = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll animation
      });
  return (
    <div className="mt-10">
      <SectionTitle
        subHeading="Check It Out"
        heading="Featured Item"
      ></SectionTitle>
      <div className="md:flex md:justify-center md:items-center md:py-20 md:px-36 featured-Item  ">
        <div className="featured-Item-content w-full md:flex md:justify-center md:items-center ">
          <div className="md:w-[1000px] h-full ">
            <img className="w-full" src={featuredImage} alt="" />
          </div>
          <div className="md:ml-10 w-full">
            <p className="text-white">{moment().format("LL")}</p>
            <p className="uppercase font-bold text-white">
              Where can I get some
            </p>
            <p className="text-white">
              Welcome to our Website! Discover a wide range of stylish dresses,
              exquisite jewelry, premium watches, and trendy sunglasses all in
              one place...
            </p>
            <Link to='/allCollections'>
              <button onClick={() => window.scrollTo(0, 0)} className="btn btn-outline mt-5  border-0 border-b-4  font-bold border-black hover:bg-red-900">
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
