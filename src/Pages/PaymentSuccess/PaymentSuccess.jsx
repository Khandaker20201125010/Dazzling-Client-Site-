import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import PaymentLoading from '../Shared/PaymentLoading/PaymentLoading';

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
        <div>
            <p>{tranId}</p>
             Payment Success <h3>{allData.length}</h3>
            
        </div>
    );
};

export default PaymentSuccess;