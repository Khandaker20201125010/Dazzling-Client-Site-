import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: order = [] } = useQuery({
    queryKey: ["order", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order/${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="container m-auto p-6  bg-gradient-to-br from-sky-900 via-black to-sky-500 min-h-full">
      <h2 className="text-3xl mb-5">Total Payments :{order.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="hover:bg-red-500 text-white">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Total Price</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody >
            {order.map((singleOrder, index) => (
              <tr className="hover:bg-red-500" key={singleOrder._id}>
                <th>{index + 1}</th>
                <td>{singleOrder.data.name}</td>
                <td>${singleOrder.data.total}</td>
                <td>{singleOrder.data.date || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
