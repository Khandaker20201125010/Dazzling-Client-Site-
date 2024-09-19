import { useEffect, useState } from "react";


const useProduct = () => {
    const [product,setProduct] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() =>{
        fetch('product.json')
        .then(res => res.json())
        .then(data => {setProduct(data);
            setLoading(false);
        });         
           

    },[])
    return [product,loading]
};

export default useProduct;