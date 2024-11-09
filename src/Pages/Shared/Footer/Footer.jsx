import React from "react";
import { Link } from "react-router-dom";
import icon from "../../../../public/lago.png";
import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="mt-10">
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-52">
          <Link to='/aboutUs'>
            <div className="bg-transparent">
              <img className="w-20 h-20  rounded-full" src={icon} alt="" />
              <h3>About Us</h3>
            </div>
          </Link>
          <div className="text-center md:text-left">
            <Link to="/Contacts">
              {" "}
              <button className="text-xl font-bold mb-2 mx-16 ">
                Contact Us
              </button>
            </Link>
            <p className="mx-10"> Feel free to contact us</p>
            <p className="mx-12">+88 123456789</p>
            <p className="mx-8">Mon - Fri: 08:00 - 22:00</p>
            <p className="mx-8">Sat - Sun: 10:00 - 23:00</p>
          </div>
          <div className="text-center md:text-left ">
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <p className="mt-4">Join us on social media</p>
            <div className="grid grid-flow-col gap-2 mt-5 ">
              <Link to="https://twitter.com">
              <a>
              <BsTwitterX className="text-xl" />
              </a>
              </Link>
             <Link to="https://www.youtube.com/">
             <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
             </Link>
            <Link to="https://www.facebook.com">
            <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            
            </Link>
            </div>
            <div></div>
          </div>
        </div>
      </footer>
      <div>
        <footer className="footer footer-center bg-yellow-300 text-base-content p-4">
          <aside>
            <p className="text-black">
              Copyright © {new Date().getFullYear()} - All right reserved by
              ACME Industries Ltd
            </p>
          </aside>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
