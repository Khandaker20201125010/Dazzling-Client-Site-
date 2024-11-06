import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: order = []  } = useQuery({
        queryKey: ['order', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/${user.email}`)
            return res.data
          
        }
       
        
    })
    return (
        <div>
            <h2 className='text-3xl'>Total Payments :{order.length}</h2>
            
        </div>
    );
};

export default PaymentHistory;