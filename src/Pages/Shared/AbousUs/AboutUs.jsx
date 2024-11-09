import React from "react";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";
import i1 from "../../../assets/images/i1.png";
import i2 from "../../../assets/images/i2.jpg";
import i3 from "../../../assets/images/i3.png";
import i4 from "../../../assets/images/i4.png";
import i5 from "../../../assets/images/i5.png";
import i6 from "../../../assets/images/i6.png";
import i7 from "../../../assets/images/i7.png";
import i8 from "../../../assets/images/i8.png";
import i9 from "../../../assets/images/i9.png";
const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <div className="mt-20">
        <div className="aboutBG bg-fixed container m-auto rounded-xl ">
          <div className="bg-yellow-900 w-full h-full bg-opacity-40 flex flex-col items-center rounded-xl justify-center">
            <h1 className="text-5xl font-extrabold uppercase text-yellow-500 ">
              About <span className="text-yellow-400">us</span>
            </h1>
            <div className="w-full mx-auto container text-center mt-5 text-3xl">
              <p className="text-white font-bold  uppercase">
                Dazzling is a mall, a marketplace
                <br />
                and a community
              </p>
            </div>
          </div>
        </div>
        <div>
          <SectionTitle heading={"Who we are"}></SectionTitle>
        </div>
        <div className="container mx-auto text-center ">
          <p className="text-xl font-bold ">
            Dazzling is a premier online marketplace that brings together a
            diverse range of sellers and millions of customers across the
            region, offering a seamless shopping experience with access to over
            10 million products across 100+ categories. We’re committed to fast,
            reliable delivery and customer satisfaction, delivering millions of
            packages each month right to the doorsteps of our buyers. Dazzling
            isn’t just a marketplace; it’s a thriving community that empowers
            sellers and a knowledge hub that educates thousands of entrepreneurs
            on the latest e-commerce practices each month.
            <br /> <br /> To ensure smooth and efficient logistics, Dazzling has
            developed its own delivery network, Dazzling Express (DEX), designed
            to meet the unique needs of e-commerce. We’re raising industry
            standards, helping other logistics providers integrate digital
            operations, and driving innovation in delivery solutions. <br />{" "}
            <br />
            As part of the digital transformation movement, Dazzling harnesses
            cutting-edge technology, secure payment systems, and robust
            logistics to make buying and selling easier and more accessible.{" "}
            <br />
            Join us in our mission to create a vibrant digital marketplace that
            empowers everyone to shop and sell with confidence.
          </p>
        </div>
        <div className="mt-20">
          <div className="aboutBG2 bg-fixed container m-auto rounded-xl ">
            <div className="bg-yellow-900 w-full h-full bg-opacity-40 flex flex-col items-center rounded-xl justify-center">
              <h1 className="text-5xl font-extrabold uppercase text-yellow-500 ">
                Our <span className="text-yellow-400">Mission</span>
              </h1>
              <div className="w-full mx-auto container text-center mt-5 text-xl">
                <p className="text-white font-bold  uppercase">
                  make it easy to do business anywhere in
                  <br />
                  the era of the digital economy .
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-20">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 items-center text-center">
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i1} alt="" />
              <h3 className="mt-5">Ownership</h3>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i2} alt="" />
              <h3 className="mt-5">Create Changes</h3>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i3} alt="" />
              <h3 className="mt-5">Customer Commitment</h3>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i4} alt="" />
              <h3 className="mt-5">Integrity</h3>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="aboutBG3 bg-fixed container m-auto rounded-xl ">
            <div className="bg-yellow-900 w-full h-full bg-opacity-40 flex flex-col items-center rounded-xl justify-center">
              <h1 className="text-5xl font-extrabold uppercase text-white ">
                Our Promise to Customers
              </h1>
              
            </div>
          </div>
        </div>
        <div>
          <SectionTitle heading={"Promise to Customers"}></SectionTitle>
        </div>
        <div className=" mt-20 mb-40">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 items-center text-center">
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i5} alt="" />
              <h3 className="mt-5">Biggest Verity</h3>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i6} alt="" />
              <h3 className="mt-5">Best Price</h3>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i7} alt="" />
              <h3 className="mt-5">Easy & Fast</h3>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i8} alt="" />
              <h3 className="mt-5">Fast Delivery</h3>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-20 h-20" src={i9} alt="" />
              <h3 className="mt-5">Secure Payment</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
