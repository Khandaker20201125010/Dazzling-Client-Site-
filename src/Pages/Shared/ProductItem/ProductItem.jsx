import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { name, image, price, description } = product;
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll animation
  });

  return (
    <div data-aos="zoom-in" className="md:flex items-center justify-between p-4 bg-slate-800 rounded-md ">
      <div className="flex gap-5">
        <div className="image-container">
          <img className="product-image" src={image} alt={name} />
        </div>
        <div>
          <h3 className="uppercase  font-bold">{name}</h3>
          <p className="w-3/4">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 max-sm:mt-12">
        <p className="text-lg text-lighting  text-white">{price}TK</p>

        <Link to={`/details/${product?._id}`}>
          {" "}
          <button
            className="buton"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth", // Smooth scroll animation
              })
            }
          >
            <span className="text-white font-bold">Get </span>
            <div className="top"></div>
            <div className="left"></div>
            <div className="bottom"></div>
            <div className="right"></div>
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
