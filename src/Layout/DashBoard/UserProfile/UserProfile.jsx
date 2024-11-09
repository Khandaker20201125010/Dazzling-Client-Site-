import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { IoIosCamera } from "react-icons/io";
const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const {
    data: users = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email, axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  const { _id, name, photo, email, role } = users;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the file for uploading
      setPreview(URL.createObjectURL(file)); // Set the preview URL for modal
      setIsModalOpen(true); // Open the modal after selecting an image
    }
  };

  const handleImageClick = () => {
    document.getElementById("file-upload").click();
  };

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
        console.log("Response after updating photo:", res); // Debugging line
  
        if (res.data.modifiedCount > 0) {
          toast.success("Profile photo updated successfully");
          setImage(null);
          setPreview(null);
          setIsModalOpen(false);
          refetch();
        } else {
          toast.error("Profile photo not updated.");
        }
      } catch (error) {
        console.error("Error uploading the image or submitting the form:", error);
        toast.error("Failed to update profile photo.");
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal and reset preview
    setPreview(null);
  };

  return (
    <div>
      <Toaster />
      <div className="min-h-screen bg-gray-100">
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
            <h2 className="text-2xl font-bold">{user?.displayName}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <span className="mt-2 px-4 py-1 inline-block bg-sky-600 text-white rounded-full text-sm font-semibold">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
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
                onClick={handleCancel}
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

export default UserProfile;
