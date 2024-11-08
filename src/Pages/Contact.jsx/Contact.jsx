import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Helmet>
        <title>Contact || Dazzling</title>
      </Helmet>
      <div className="container w-full">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
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
              <label className="block text-gray-700 font-medium">Message</label>
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
      </div>
    </div>
  );
};

export default Contact;
