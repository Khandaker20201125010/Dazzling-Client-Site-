import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Componenets/SectionTitle/SectionTitle';
import ProductItem from '../ProductItem/ProductItem';

const PopularProduct = () => {
    const [product,setProduct] = useState([])
    useEffect(() =>{
        fetch('product.json')
        .then(res => res.json())
        .then(data =>          
            {const popularProduct = data.filter(product => product.category === 'popular' );
                setProduct(popularProduct)} )
    },[])
    return (
        <div className='mt-40'> 
            <div>
                <SectionTitle
                subHeading={"Popular Product"}
                heading={"From Our Product"}></SectionTitle>
            </div>
            <div className='container grid md:grid-cols-2 gap-10 m-auto mt-10'>
                {
                    product .map(product => <ProductItem key={product._id} product={product}></ProductItem>)
                }
            </div>
            
        </div>
    );
};

export default PopularProduct;