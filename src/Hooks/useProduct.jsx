  import { useQuery } from "@tanstack/react-query";
  import useAxiosPublic from "./useAxiosPublic";


  const useProduct = () => {
    const axiosPublic = useAxiosPublic();
    
    const { data: product = [], refetch } = useQuery({
      queryKey: ["product"],
      queryFn: async () => {
        const res = await axiosPublic.get("/product");
        return res.data;
      },
    });

    return [product, refetch];
  };

  export default useProduct;
