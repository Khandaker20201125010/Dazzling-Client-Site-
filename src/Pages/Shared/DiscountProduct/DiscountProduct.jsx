import React from "react";
import discount from "../../../assets/images/discount.jpg";
import { Link } from "react-router-dom";
import useProduct from "../../../Hooks/useProduct";
import SingleDiscountProduct from "./SingleDiscountProduct";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";

const DiscountProduct = () => {
  const [product] = useProduct();
  const disCount = product.filter(
    (product) => product.category === "discounts"
  );

  return (
    <div className="mt-10">
      <SectionTitle
        subHeading={"Discount Product"}
        heading={"Special Offer"}
      ></SectionTitle>
      <div className="mt-20 relative min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Layer with Opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-700 to-black opacity-60"></div>

        {/* Content Layer */}
        <div className="container mx-auto flex max-sm:flex-col items-center relative z-10 text-center px-4 md:px-8">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:order-2 mt-8 md:mt-0">
            <img
              className="h-[250px] md:h-[300px] lg:h-[350px] rounded-full"
              src={discount}
              alt="Discount"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-4 md:order-1 bg-black bg-opacity-30 p-4">
            <h1 className="bg-yellow-500 text-xl text-white rounded-md w-40 mx-auto md:mx-0 p-2 font-semibold -rotate-3">
              Special Offer
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold text-white flex flex-wrap justify-center md:justify-start">
              Super
              <span className="text-8xl md:text-9xl text-red-500 ml-2">
                Sale
              </span>
            </h1>
            <h1 className="-rotate-3 text-2xl text-white">
              Up to <span className="text-red-500 text-6xl">50%</span> off
            </h1>
            <div>
              <Link to="/allCollections">
                <button className="btn btn-warning mt-5 btn-sm w-40 -rotate-3">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SectionTitle subHeading={"Discount Product Collections"} heading={"Check Offer P"}></SectionTitle>
        <div  className="container mx-auto px-4 py-8 mt-10 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {disCount.map((product) => (
            <SingleDiscountProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountProduct;
