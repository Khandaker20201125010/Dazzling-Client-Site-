import React from "react";
import useAuth from "../../../Hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <div>
        {
            user?.displayName ? user?.displayName : 'Welcome Back'
        }
        
        </div>
    </div>
  );
};

export default AdminProfile;
