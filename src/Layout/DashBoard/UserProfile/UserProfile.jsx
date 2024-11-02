import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const UserProfile = () => {
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

export default UserProfile;