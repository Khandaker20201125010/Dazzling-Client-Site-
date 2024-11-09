import React from "react";
import SectionTitle from "../../../Componenets/SectionTitle/SectionTitle";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <div>
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
        <div className="container mx-auto text-center">
          <p>
            Dazzling is a premier online marketplace that brings together a
            diverse range of sellers and millions of customers across the
            region, offering a seamless shopping experience with access to over
            10 million products across 100+ categories.
             We’re committed to fast,
            reliable delivery and customer satisfaction, delivering millions of
            packages each month right to the doorsteps of our buyers. Dazzling
            isn’t just a marketplace; it’s a thriving community that empowers
            sellers and a knowledge hub that educates thousands of entrepreneurs
            on the latest e-commerce practices each month.
            <br /> To ensure smooth and
            efficient logistics, Dazzling has developed its own delivery
            network, Dazzling Express (DEX), designed to meet the unique needs
            of e-commerce. We’re raising industry standards, helping other
            logistics providers integrate digital operations, and driving
            innovation in delivery solutions. <br />
            As part of the digital
            transformation movement, Dazzling harnesses cutting-edge technology,
            secure payment systems, and robust logistics to make buying and
            selling easier and more accessible. <br />
            Join us in our mission to create
            a vibrant digital marketplace that empowers everyone to shop and
            sell with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
