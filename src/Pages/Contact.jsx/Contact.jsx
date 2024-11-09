import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
  const form = useRef();
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => {
          setFeedbackMessage("Your message was Emailed successfully!");
          setIsLoading(false);
          form.current.reset();
        },
        (error) => {
          setFeedbackMessage(
            "There was an error sending your message. Please try again."
          );
          setIsLoading(false);
          console.error("Failed to send message:", error);
        }
      );
  };

  return (
    <div className="min-h-screen  bg-gray-100 p-2">
      <div>
        <div className="contactBG bg-fixed container m-auto rounded-xl ">
          <div className="bg-blue-800 w-full h-full bg-opacity-40 flex flex-col items-center rounded-xl justify-center">
            <h1 className="text-5xl font-extrabold uppercase text-yellow-500 ">
              Contact <span className="text-yellow-400">us</span>
            </h1>
            <div className="w-full mx-auto container text-center">
            <p className="text-white font-bold ">
            Have any questions or need assistance? Reach out to us, and
            <br />         
            our team will get back to you promptly to help with your inquiry.
            </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center px-4">
        <Helmet>
          <title>Contact || Dazzling</title>
        </Helmet>
        <div className="container w-full grid grid-cols-1 md:grid-cols-2 mt-14 gap-6 ">
          <div className="w-full  bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
              Contact Us
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Your name"
                  className="w-full mt-1 px-3 py-2 border rounded-md text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Your email"
                  className="w-full mt-1 px-3 py-2 border rounded-md text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Your message"
                  rows="4"
                  className="w-full mt-1 px-3 py-2 border rounded-md text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-4 px-4 py-2 font-medium text-white rounded-md ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
              {feedbackMessage && (
                <p
                  className={`mt-4 text-center ${
                    feedbackMessage.includes("successfully")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {feedbackMessage}
                </p>
              )}
            </form>
          </div>

          <div className="bg-slate-300 p-2 rounded-lg ">
            <div className="flex flex-col justify-center mt-4 items-center">
              <FaLocationDot className="text-4xl  m-auto text-center text-red-700" />
              <h3 className="text-2xl font-semibold text-black text-center mb-2">
                Our Location
              </h3>
            </div>
            <div className="w-full  bg-sky-200 p-8 rounded-lg">
              <iframe
                className="w-full h-[300px] md:h-[400px] lg:h-[450px] max-w-lg md:max-w-xl lg:max-w-2xl "
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d919.094361843567!2d89.5253752695489!3d22.86251123445304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDUxJzQ1LjAiTiA4OcKwMzEnMzMuNyJF!5e0!3m2!1sen!2sbd!4v1731098432634!5m2!1sen!2sbd"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col justify-center items-center card bg-white text-black mt-10 mb-10 p-2 w-[500px]">
        <p>Pabla Cross Rd-2,Daulatpur Khulna</p>
        <p>Shop open:Sun-Fri:9Am -10Pm</p>
        <p>Phone:+88 0123456789</p>
        <p>Email:contact@dazzling.com</p>
      </div>
    </div>
  );
};

export default Contact;
