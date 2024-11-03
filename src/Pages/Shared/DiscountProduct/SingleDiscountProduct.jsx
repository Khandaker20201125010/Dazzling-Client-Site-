import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import useCart from "../../../Hooks/useCart";

const SingleDiscountProduct = ({ product }) => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [, refetch] = useCart();
  const { _id, name, image, price, description } = product;

  // Calculate discounted price
  const discountedNumber = price * 0.5; // 50% off

  const handleProductAction = async () => {
    if (!user || !user.email) {
      Swal.fire("Please log in to add items to your cart.");
      return;
    }

    const cartItems = {
      ProductItem: _id,
      email: user.email,
      name,
      image,
      price,
    };

    Swal.fire({
      title: "What would you like to do?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add to Cart",
      denyButtonText: "View Details",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .post("/carts", cartItems)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${name} added to your cart`,
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong! Please try again.",
            });
          });
      } else if (result.isDenied) {
        navigate(`/details/${_id}`);
      }
    });
  };
  const handelError = () =>{
    Swal.fire({
        icon: "error",
        title: "You not logged in!",
        text: "Please log in to add items to your cart.",
      })
  }

  return (
    <div className="w-[18rem] rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 shadow-2xl relative overflow-hidden transition-all duration-300 transform hover:scale-90 cursor-pointer p-4">
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
        <p className="text-yellow-400 font-bold mt-2">
          ${discountedNumber.toFixed(2)}
        </p>
      </div>
      <div className="item-center text-center">
        {user ? (
          <button
            className="btn btn-outline mt-5 btn-md border-0 border-b-2 border-l-2 font-bold border-white hover:bg-yellow-600 w-40"
            onClick={handleProductAction} // Call the handler to decide action
          >
            Get Now
          </button>
        ) : (
          <button
            className="btn btn-outline mt-5 btn-md border-0 border-b-2 border-l-2 font-bold border-white hover:bg-yellow-600 w-40"
            onClick={handelError} // Call the handler to decide action
          >
            Get Now
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleDiscountProduct;
