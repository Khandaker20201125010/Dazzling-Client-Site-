import { useInstantTransition } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RiLoader2Fill } from "react-icons/ri";

const PaymentLoading = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000) // Simulate loading for 3 seconds
  
      return () => clearTimeout(timer)
    }, [])
  
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <RiLoader2Fill className="h-16 w-16 text-blue-500 animate-spin" />
              <h2 className="mt-4 text-xl font-semibold text-gray-700">
                Processing Payment
              </h2>
              <p className="mt-2 text-gray-500">
                Please wait while we confirm your payment...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <IoMdCheckmarkCircle className="h-16 w-16 text-green-500" />
              <h2 className="mt-4 text-2xl font-bold text-gray-700">
                Payment Successful!
              </h2>
              <p className="mt-2 text-center text-gray-500">
                Thank you for your purchase. Your payment has been processed
                successfully.
              </p>
              <button className="mt-6" variant="default">
              Return to Dashboard
              </button>
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentLoading;
