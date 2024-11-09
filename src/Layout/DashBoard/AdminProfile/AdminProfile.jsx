import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMoneyBill,  FaUsers } from "react-icons/fa6";
import { MdBorderColor } from "react-icons/md";
import { GiClothes } from "react-icons/gi";


const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats");
      return res.data;
    },
  });
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (user?.email && users.length > 0) {
      // Find the current user's role based on email
      const currentUser = users.find((u) => u.email === user.email);
      if (currentUser) {
        setUserRole(currentUser.role); // Set role from user data
      }
    }
  }, [user, users]);
  return (
    <div className="min-h-screen bg-gray-100  ">
      <div className="container m-auto p-4 min-h-screen bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-700 h-40 relative">
          {/* Profile Image */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <img
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              src={user?.photoURL}
              alt="User Profile"
            />
          </div>
        </div>

        {/* User Info Section */}
        
        <div className="pt-16 pb-6 text-center">
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <h3 className="text-2xl"> </h3>

          {/* Admin Role Badge */}
          <span className="mt-2 px-4 py-1 inline-block bg-sky-600 text-white rounded-full text-sm font-semibold">
            {userRole}
          </span>
        </div>

        {/* Stats Section */}
        <div className="text-center p-2 mb-2 text-black font-bold text-2xl ">
          <h3>Website Stats</h3>
        </div>
        <div className="flex justify-center items-center ">
          <div className="mx-auto stats shadow  bg-gradient-to-br from-black via-sky-500 to-black ">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaMoneyBill className="text-2xl text-white"></FaMoneyBill>
              </div>
              <div className="stat-title">Revenue</div>
              <div className="stat-value">{stats?.revenue}TK</div>
             
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaUsers  className="text-2xl text-white"></FaUsers >
              </div>
              <div className="stat-title">Users</div>
              <div className="stat-value">{stats?.users}</div>
              <div className="stat-desc">Customers</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <GiClothes  className="text-2xl text-white"></GiClothes >
              </div>
              <div className="stat-title">Total </div>
              <div className="stat-value">{stats?.productItem}</div>
              <div className="stat-desc">Product</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
              <MdBorderColor className="text-2xl text-white" />
              </div>
              <div className="stat-title">Orders</div>
              <div className="stat-value">{stats?.orders}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
