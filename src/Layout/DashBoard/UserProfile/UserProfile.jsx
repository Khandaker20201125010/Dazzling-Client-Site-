import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = {}, isLoading, refetch } = useQuery({
        queryKey: ["users", user?.email, axiosSecure],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users/${user?.email}`);
          return res.data;
        },
      });
      const { name, photo, email, role } = users;

    return (
        <div>
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
            {role}
          </span>
        </div>
        
      </div>
      
      

    </div>
        </div>
    );
};

export default UserProfile;