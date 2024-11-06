import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { IoMdCheckmarkCircle } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const ManageBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: order = [], refetch } = useQuery({
    queryKey: ["order", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/order");
      return res.data;
    },
  });
  const handleUpdate = async (id) => {
    try {
      const res = await axiosSecure.put(`/order/${id}`, { status: "Paid" });
      if (res.data.modifiedCount > 0) {
        toast.success("Successfully toasted!", {
          style: {
            backgroundColor: "#000",
            color: "#fff",
          },
        });
        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  const [searchEmail, setSearchEmail] = useState(""); // State for search input
  const [statusFilter, setStatusFilter] = useState("All"); // State for status filter

  // Filter orders based on search input
  const filteredOrders = order.filter((singleOrder) => {
    const matchesEmail = singleOrder.data.email
      .toLowerCase()
      .includes(searchEmail.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || singleOrder.status === statusFilter;
    return matchesEmail && matchesStatus;
  });

  return (
    <div className="container m-auto p-6  bg-gradient-to-br from-sky-900 via-black to-sky-500 min-h-full">
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          className="bg-black"
        />
      </div>

      <h2 className="text-3xl mb-5">Total Payments: {filteredOrders.length}</h2>

      <div className="flex justify-between container m-auto px-16">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by email..."
          className="mb-4 p-2 rounded-md"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)} // Update searchEmail on change
        />
        {/* Status Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="mb-4 p-2 ml-2 rounded-md"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="hover:bg-red-500 text-white">
            <tr>
              <th>No</th>
              <th>User Email</th>
              <th>Phone Number</th>
              <th>Total Price</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((singleOrder, index) => (
              <tr className="hover:bg-red-500" key={singleOrder._id}>
                <th>{index + 1}</th>
                <td>{singleOrder.data.email}</td>
                <td>{singleOrder.data.phone}</td>
                <td>${singleOrder.data.total}</td>
                <td>{singleOrder.data.date || "N/A"}</td>
                <td>{singleOrder.status}</td>
                <td>
                  <button onClick={() => handleUpdate(singleOrder._id)}>
                    <IoMdCheckmarkCircle className="text-3xl text-green-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
