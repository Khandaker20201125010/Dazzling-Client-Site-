import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMoneyBill, FaUsers } from "react-icons/fa6";
import { MdBorderColor } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { IoIosCamera } from "react-icons/io";

// Image hosting API details
const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

// Admin Profile Component
const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch admin statistics
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats");
      return res.data;
    },
  });

  // Fetch user data based on email
  const { data: users = {}, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const { _id, name, photo, email, role } = users;

  // Handle image selection and preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setIsModalOpen(true);
    }
  };

  // Handle saving updated profile image
  const handleSave = async () => {
    if (image) {
      try {
        const imageData = new FormData();
        imageData.append("image", image);

        const imageRes = await axios.post(image_hosting_api, imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const imageUrl = imageRes?.data?.data?.url;
        if (!imageUrl) throw new Error("Image upload failed.");

        const data = { photo: imageUrl || photo || "" };

        const res = await axiosSecure.patch(`/users/users/${_id}`, data);
        if (res.data.modifiedCount > 0) {
          toast.success("Profile photo updated successfully");
          setImage(null);
          setPreview(null);
          setIsModalOpen(false);
          refetch(); // Refetch to update the component with new data
        } else {
          toast.error("Profile photo not updated.");
        }
      } catch (error) {
        console.error("Error uploading the image or submitting the form:", error);
        toast.error("Failed to update profile photo.");
      }
    }
  };

  const handleCancelImage = () => {
    setImage(null);
    setPreview(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      <div className="container m-auto p-4 min-h-screen bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-700 h-40 relative">
          {/* Profile Image */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <img
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              src={photo || "/default-profile.jpg"}
              alt="User Profile"
            />
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-upload">
                <span className="text-blue-500">
                  <IoIosCamera />
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="pt-16 pb-6 text-center">
          <h2 className="text-2xl font-bold">{name || user?.displayName}</h2>
          <p className="text-gray-600">{email || user?.email}</p>
          <span className="mt-2 px-4 py-1 inline-block bg-sky-600 text-white rounded-full text-sm font-semibold">
            {role}
          </span>
        </div>

        {/* Stats Section */}
        <div className="text-center p-2 mb-2 text-black font-bold text-2xl">
          <h3>Website Stats</h3>
        </div>
        <div className="flex justify-center items-center">
          <div className="mx-auto stats shadow bg-gradient-to-br from-black via-sky-500 to-black">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaMoneyBill className="text-2xl text-white" />
              </div>
              <div className="stat-title">Revenue</div>
              <div className="stat-value">{stats?.revenue} TK</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaUsers className="text-2xl text-white" />
              </div>
              <div className="stat-title">Users</div>
              <div className="stat-value">{stats?.users}</div>
              <div className="stat-desc">Customers</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <GiClothes className="text-2xl text-white" />
              </div>
              <div className="stat-title">Total</div>
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

      {/* Modal for Image Preview and Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
           <div className="bg-transparent p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl text-black text-center font-semibold mb-4">Confirm Profile Image</h3>
            <div className="mb-4">
              <img
                src={preview}
                alt="Selected Preview"
                className="w-80 h-80 rounded-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 btn btn-sm text-white  rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 btn btn-sm text-white  rounded-lg"
                onClick={handleCancelImage}
              >
                Cancel 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
