import { Link } from "react-router-dom";

const Allitem = ({ product }) => {
  // Scroll to top on render
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll animation
  });

  // Determine background image based on gender
  const backgroundImage =
    product.gender === "Men"
      ? "url('https://i.ibb.co.com/Gxb8yfX/b6fc6b32352cde54fb279c3d0f57e6b4-removebg-preview.png')" // Men's background
      : "url('https://i.ibb.co.com/y8Y8VZ1/1000-F-373923425-l-PNd-O9i4s366-Egk-PDAw-Xt-Lx-SRSVLSDd4.jpg')"; // Women's background

  // Calculate 50% discount if the product is in the discount category
  const isDiscounted = product.category === "discounts";
  const discountedPrice = isDiscounted ? (product.price * 0.5).toFixed(2) : product.price;

  return (
    <div data-aos="zoom-in-up" className=" ">
      <div
        className="relative w-[18rem] h-full rounded-2xl p-3 hover:shadow-yellow-600 transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
        style={{ backgroundImage: backgroundImage }}
      >
        {/* Image Container */}
        <div className="w-full rounded-[0.7rem] rounded-tr-[6rem] mb-4 overflow-hidden relative">
          <img
            className="w-full h-[18rem] rounded-[0.7rem] rounded-tr-[6rem] mb-4 border-red-900 skeleton"
            src={product.image}
            alt={product.name}
          />
          {/* Show discounted price if applicable */}
          <span className="absolute right-3 bottom-2 border-b-2 border-s-2 border-yellow-300 bg-black hover:shadow-sm hover:shadow-yellow-300 text-yellow-400 font-bold text-sm p-2 rounded-tl-[1rem] rounded-tr-[1rem] rounded-bl-[2rem] rounded-br-[2rem] shadow-lg">
            {isDiscounted ? (
              <>
                <span className="line-through text-red-500 mr-2">TK{product.price}</span>
                TK{discountedPrice}
              </>
            ) : (
              `TK${product.price}`
            )}
          </span>
        </div>

        {/* Product Info */}
        <div className="px-3 mb-4 flex flex-col h-24 grow">
          <h3 className="text-xl text-yellow-400">{product.gender}</h3>
          <h3 className="text-white font-bold">{product.brand}</h3>
          <p className="text-white font-semibold text-xs mb-2">
            {product.name}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link to={`/details/${product?._id}`}>
            <button onClick={() => window.scrollTo(0, 0)} className="border-0 border-b-4 border-s-2 border-yellow-300 w-44 bg-black text-white font-bold rounded-tl-3xl rounded-br-xl rounded-tr-3xl rounded-bl-xl p-2 transition-colors duration-200 hover:bg-orange-400">
              Check Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Allitem;
