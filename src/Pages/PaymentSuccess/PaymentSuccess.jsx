import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import PaymentLoading from '../Shared/PaymentLoading/PaymentLoading';
import { useQuery } from '@tanstack/react-query';


const PaymentSuccess = () => {
    const {tranId} = useParams()
    const axiosSecure = useAxiosSecure()

    const { data: allData = [], isLoading} = useQuery({
        queryKey: ['order', axiosSecure, tranId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/or/${tranId}`)
            return res.data
        }
    })

    if(isLoading){
        return <PaymentLoading></PaymentLoading>
    }
    return (
        <div className='bg-gradient-to-br from-pink-500 via-black to-pink-500 text-center min-h-screen flex justify-center items-center'>
           <div className=''>
           <h3>{allData.length}</h3>
           <p className=''>{tranId}</p>
            <h3 className='text-6xl text-green-500 font-bold'> Payment Success </h3>
            <h2 className='mt-5 font-bold '>Thank you for shopping with us</h2>
            <div className='mt-5'>
           <Link to='/'>
           <button className='btn btn-xm rounded-xl bg-red-600 hover:bg-green-600'>Go Home</button></Link>
           </div>
             
           </div>
           
            
        </div>
    );
};

export default PaymentSuccess;