import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { FaArrowRight, FaImage, FaStar, FaUpload } from "react-icons/fa6";
import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useProduct from "../../Hooks/useProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import toast from "react-hot-toast";
import axios from "axios";
const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

const Details = () => {
  const { id } = useParams(); // Unconditional use of hooks
  const axiosPublic = useAxiosPublic(); // Make sure this is always called
  const { user, loading } = useAuth(); // Ensure no conditional usage of this hook
  const [, refetch] = useCart();
  const [product] = useProduct();
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch product data
  const { data: singleProductData = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product/${id}`);
      return res.data;
    },
  });
  const { data: productReviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["productReviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${id}`); // Make sure this endpoint returns reviews filtered by product ID
      return res.data;
    },
  });

  // Destructure product data
  const { _id, brand, gender, description, rating, image, price, name } =
    singleProductData;
  const suggestProduct = product.filter(
    (product) =>
      product.category === singleProductData.category && product._id !== id
  );

  useEffect(() => {
    const imagezoom = document.getElementById("imagezoom");

    if (imagezoom) {
      const handleMouseMove = (event) => {
        imagezoom.style.setProperty("--display", "block");
        let pointer = {
          x: (event.offsetX * 100) / imagezoom.offsetWidth,
          y: (event.offsetY * 100) / imagezoom.offsetHeight,
        };
        imagezoom.style.setProperty("--zoom-x", pointer.x + "%");
        imagezoom.style.setProperty("--zoom-y", pointer.y + "%");
      };

      const handleMouseOut = () => {
        imagezoom.style.setProperty("--display", "none");
      };

      // Add event listeners
      imagezoom.addEventListener("mousemove", handleMouseMove);
      imagezoom.addEventListener("mouseout", handleMouseOut);

      // Cleanup function to remove event listeners on unmount
      return () => {
        imagezoom.removeEventListener("mousemove", handleMouseMove);
        imagezoom.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [image]); // Dependency on image

  // Handle loading state
  if (isLoading) {
    return (
      <div className="circ h-screen">
        <div className="load">Loading . . . </div>
        <div className="hands"></div>
        <div className="body"></div>
        <div className="head">
          <div className="eye"></div>
        </div>
      </div>
    );
  }
  //add product //
  const handelAddProduct = async () => {
    if (user && user.email) {
      const cartItems = {
        ProductItem: _id,
        email: user.email,
        name,
        image,
        price,
      };

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
          footer;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! please try again",
          });
        });
    }
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    if (image) {
      try {
        const imageRes = await axios.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const imageUrl = imageRes?.data?.data?.url;

        const reviewData = {
          prodId: id,
          name: user?.displayName || "Anonymous",
          details: review,
          rating: ratingValue,
          image: imageUrl || user?.photoURL || "",
        };

        await axiosPublic.post("/reviews", reviewData).then((res) => {
          if (res.data.insertedId) {
            toast.success("Thank you for your review!", {
              duration: 1000,
              position: "top-center",
            });
            setReview("");
            setRatingValue(0);
            setImages(null);
            setPreview(null);
            refetchReviews(); // Refetch reviews after submitting a new one
          }
        });
      } catch (error) {
        console.error("Error uploading image or submitting review:", error);
      }
    }
  };

  // Loading state
  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container m-auto">
      <div className="m-auto card lg:card-side bg-base-100 shadow-xl p-10">
        <div
          id="imagezoom"
          className="imagezoom border-2 "
          style={{
            "--url": `url(${image})`,
            "--zoom-x": "50%",
            "--zoom-y": "25%",

            position: "relative", // Position relative for absolute positioning of pseudo-element
          }}
        >
          <img
            src={image}
            alt="Album"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Make sure image takes full width and height
          />
          <div
            className="zoom-overlay"
            style={{
              display: "var(--display)", // Show/hide based on mouse events
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              backgroundImage: "var(--url)",
              backgroundSize: "150%", // Change to fit your zoom needs
              backgroundPosition: "var(--zoom-x) var(--zoom-y)",
              pointerEvents: "none", // Prevent mouse events on the overlay
            }}
          />
        </div>
        {/* details */}

        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <h3 className="text-blue-600 text-bold">{brand}</h3>
          <p className="border-t-2 border-b-2 p-2  rounded-md">{description}</p>
          <div className="flex justify-between mb-5">
            <h3 className="text-xl font-bold gap-2">
              Price: <span className="text-red-600"> {price}TK</span>{" "}
            </h3>
            <h3 className="flex gap-2 text-xl">
              Rating: {rating}
              <FaStar color="yellow" size={22} />
            </h3>
          </div>
          <div className="card-actions justify-start">
            <button onClick={handelAddProduct} className="dbutton">
              <span className="box">
                Add Card
                <div className="star-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                        fill="#ea8b19"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="star-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                        fill="#ea8b19"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="star-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                        fill="#ea8b19"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="star-45">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                        fill="#ea8b19"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="star-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                        fill="#ea8b19"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="star-5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                        fill="#ea8b19"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="star-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                        fill="#ea8b19"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                        fill="#ea8b19"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Suggestion section */}
      <div className="mt-10 bg-gradient-to-br from-gray-700 via-slate-900 to-gray-700 p-6">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-6">
          <h2 className="text-xl font-bold">You May Also Like</h2>
          <Link to="/allCollections">
            <button className="uppercase font-bold flex gap-4">
              <FaArrowRight className="text-2xl" />
              Check Our Other Products
            </button>
          </Link>
        </div>
        <div className="mt-10 text-white relative">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            loop={true}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {suggestProduct.map((prod) => (
              <SwiperSlide className="" key={prod._id}>
                <div className="card bg-gradient-to-br from-gray-700 via-black to-gray-700 h-full rounded-md">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-48 p-4 rounded-xl object-cover"
                  />
                  <div className="p-4 h-40 flex flex-col">
                    <h3 className="font-bold">{prod.name}</h3>
                    <p>{prod.description}</p>
                    <h4 className="text-red-600">{prod.price}$</h4>
                  </div>
                  <Link to={`/details/${prod._id}`}>
                    <div className="p-2">
                      <button className="btn btn-warning ml-2 btn-sm rounded-xl text-center">
                        Check
                      </button>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom styles for Swiper navigation buttons */}
          <style>{`
            .swiper-button-next,
            .swiper-button-prev {
              color: orange; /* Change the button color to orange */
              width: 20px; /* Adjust width to make it smaller */
              height: 20px; /* Adjust height to make it smaller */
            }
            .swiper-button-next::after,
            .swiper-button-prev::after {
              font-size: 18px; /* Adjust icon size to make it smaller */
            }
          `}</style>
        </div>
      </div>
      <div className="mt-10 bg-gradient-to-br from-gray-700 via-slate-900 to-gray-700 p-6">
        <h3 className="text-2xl font-bold">Rate and Review this Product</h3>
        <form onSubmit={handleReviewSubmit}>
          <div>
            {/* Rating Component */}
            <Rating
              name="product-rating"
              style={{ maxWidth: 180 }}
              value={ratingValue} // Set the rating value from state
              onChange={setRatingValue} // Set rating value on change (no need to destructure e)
              isRequired
            />
          </div>

          <textarea
            className="textarea textarea-warning w-3/4"
            placeholder="Write your review here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="4"
            required
          ></textarea>

          <div>
            <div className="file-uploader">
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImages(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                id="file-input"
                style={{ display: "none" }} // Hide the input element
              />

              {/* Icon as button to open file dialog */}
              <button
                type="button"
                onClick={() => document.getElementById("file-input").click()}
                className="upload-icon-button"
                title="Upload Image"
              >
                <FaImage className="text-yellow-600 text-3xl ml-2"  />
              </button>
            </div>
            {preview && (
              <div>
                <img src={preview} alt="Preview" width="100" />
              </div>
            )}
          </div>

          <button className="btn btn-sm  btn-warning mt-5 mb-5" type="submit">
            Submit Review
          </button>
        </form>
      </div>

      {/* Product Reviews */}
      <div className="mt-10 bg-gradient-to-br from-gray-700 via-slate-900 to-gray-700 p-6">
        <h3 className="text-2xl font-bold mt-5 mb-5">Customer Reviews </h3>
        {isLoading ? (
          <div>Loading reviews...</div> // Show loading state
        ) : productReviews.length === 0 ? (
          <div>No reviews yet for this product.</div> // Show message when no reviews exist
        ) : (
          productReviews.map((review) => (
            <div className=" bg-gray-700 p-6  rounded-xl mb-5 " key={review._id}>
              <div className="flex lg:flex-row bg-base-300 p-5 gap-2 ">
                {review.image && (
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-28 h-32 rounded-lg shadow-2xl"
                  />
                )}
                <div className="p-4 h-40 flex flex-col">
                <div className="flex items-center">
                    <Rating
                      value={review.rating}
                      style={{ maxWidth: 180 }}
                      readOnly
                    />
                  </div>
                  <h3 className="font-bold">{review.name}</h3>
                 
                  <p className="text-gray-300 w-full">{review.details}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Details;
