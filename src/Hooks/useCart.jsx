import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useCart = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const {refetch,data :cart = []} = useQuery ({
        queryKey:['cart' , user?.email],
        queryFn: async () => {
            const res  = await axiosPublic.get(`/carts?email=${user?.email}`);
            return res.data;
        }

    })
    return[cart ,refetch]
};

export default useCart;