import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
// import required modules
import { Navigation, Pagination } from "swiper/modules";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5500/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="my-20 mt-40">
      <SectionTitle
        subHeading="What's our Client say"
        heading={"Testimonials"}
      ></SectionTitle>
      <div className="">
        <h3 className="loadero mx-auto"></h3>
        
      </div>
      <div className="mt-20 mx-20 ">
        <Swiper
          modules={[Pagination  , Navigation]}
          spaceBetween={10}
          loop={true}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((reviews) => (
            <SwiperSlide key={reviews._id}>
              <div className="flex  justify-center card bg-gradient-to-br from-blue-700 via-black to-gray-700 h-full rounded-md p-5">
              <h3 className="text-2xl text-orange-400">{reviews.name}</h3>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={reviews.rating}
                  readOnly
                />
                <span className=" mt-5"></span>
                <p className="py-8">{reviews.details}</p>
               
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
       
      </div>
    </div>
  );
};

export default Testimonials;

