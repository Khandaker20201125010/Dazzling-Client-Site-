import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
const UserProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
      setImage(file); // Store the actual file for uploading
      setPreview(URL.createObjectURL(file)); // Set the preview URL for display
    }
  };

  const handleImageClick = () => {
    document.getElementById("file-upload").click();
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = new FormData();
      imageData.append("image", image);

      if (image?.name) {
        var imageRes = await axios.post(image_hosting_api, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image upload response:", imageRes); // Debugging line

        const imageUrl = imageRes?.data?.data?.url;
        console.log("Image URL:", imageUrl); // Check if URL is correct

        const data = {
          photo: imageUrl || photo || "",
        };

        const res = await axiosSecure.patch(`/users/users/${_id}`, data);
        if (res.data.modifiedCount > 0) {
          toast.success("Profile photo updated successfully", {
            duration: 1000,
            position: "top-center",
          });
          console.log("success");
          setImage(null);
          setPreview(null);
          refetch(); // Refetch user data to reflect updated photo
        }
      }
    } catch (error) {
      console.error("Error uploading the image or submitting the form:", error);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="min-h-screen bg-gray-100  ">
        <div className="container m-auto p-4 min-h-screen bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Banner Section */}
          <div className="bg-gradient-to-r from-sky-500 to-sky-700 h-40 relative">
            {/* Profile Image */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
              <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg skeleton"
                src={photo}
                alt="User Profile"
              />
              <form onSubmit={handelSubmit}>
                <div>
                  <div className="image-file-input">
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="  cursor-pointer">
                            <FiUpload
                              onClick={handleImageClick}
                              className="text-4xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {preview && <button type="submit">Upload</button>}
                </div>
              </form>
            </div>
          </div>
          {/* User Info Section */}
          <div className="pt-16 pb-6 text-center">
            <h2 className="text-2xl font-bold">{user?.displayName}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <h3 className="text-2xl"> </h3>

            {/* Admin Role Badge */}
            <span className="mt-2 px-4 py-1 inline-block bg-sky-600 text-white rounded-full text-sm font-semibold">
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
