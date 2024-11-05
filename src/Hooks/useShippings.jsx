import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useShippings = () => {

    const axiosSecure = useAxiosSecure()

    const { data: shippings = [], isLoading: shippingLoading, refetch } = useQuery({
        queryKey: ['shippings', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get('/shippings')
            return res.data
        }
    })

    return [shippings, shippingLoading, refetch]
};

export default useShippings;