import React from "react";

const SingleDiscountProduct = ({ product }) => {
  const { name, image, price, description } = product;
  const discountPercentage = (price / 100) * 50;
  const discountedNumber = parseFloat(discountPercentage.toFixed(1));
  return (
    <div className="">
      <div className="w-[18rem]  rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 shadow-2xl relative overflow-hidden transition-all duration-300 transform hover:scale-90 cursor-pointer p-4">
        {/* Ribbon */}
        <div className="absolute w-36 h-36 -top-2 -left-2 flex items-center justify-center">
          <span className="absolute w-[150%] h-10 -rotate-45 -translate-y-2 bg-gradient-to-r from-[#ff6547] via-[#ffb144] to-[#ff7053] flex items-center justify-center text-white font-semibold tracking-wider text-sm uppercase shadow-md">
            50% OFF
          </span>
        </div>

        {/* Product Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover rounded-lg"
        />

        {/* Product Details */}
        <div className="mt-4 text-center">
          <h2 className="text-white text-lg font-semibold">{name}</h2>
          <p className="text-gray-400 text-sm">{description}</p>
          <p className="text-yellow-400 font-bold mt-2">${discountedNumber}</p>
        </div>
        <div className="item-center text-center">
          <button className="btn btn-outline mt-5 btn-md border-0 border-b-2 border-l-2 font-bold border-white hover:bg-yellow-600 w-40  ">
            Get Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleDiscountProduct;
