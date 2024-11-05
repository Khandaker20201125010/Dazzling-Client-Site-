import React from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddShippingMethod = () => {
  const axiosSecure = useAxiosSecure();
  const addHandleShippingMethod = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const shippingLocation = form.get("shippingLocation");
    const serviceCharge = form.get("serviceCharge");

    const data = {
      shippingLocation,
      serviceCharge: parseInt(serviceCharge),
    };

    const res = await axiosSecure.post("/shippings", data);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        title: "Shipping add successful",
        showConfirmButton: false,
        timer: 1000,
      });
      e.target.reset();
    }
  };
  return (
    <div>
        <Helmet>
            <title>Add Shipping Method</title>
        </Helmet>
      <div className="lg:w-4/5 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg shadow-md max-sm:mx-4 border border-base-300">
   
        <h3 className="text-lg md:text-2xl font-medium text-center text-orange-500 my-2">
          Add Shipping Method
        </h3>
        <form onSubmit={addHandleShippingMethod}>
          <div>
            <p className="max-sm:text-sm font-semibold mb-2">
              Shipping Location
            </p>
            <input
              type="text"
              required
              name="shippingLocation"
              placeholder="Shipping Location"
              id=""
              className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2"
            />
          </div>
          <div>
            <p className="max-sm:text-sm font-semibold mb-2">
              Shipping Service Charge
            </p>
            <input
              type="text"
              required
              name="serviceCharge"
              placeholder="Shipping Service Charge"
              id=""
              className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="max-sm:text-sm w-fit px-4 py-1 text-center  rounded-md text-orange-500 border border-orange-400 hover:shadow-lg font-medium my-3"
              type="submit"
              value="Add Shipping"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShippingMethod;
