import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Componenets/SectionTitle/SectionTitle';
import TopProductItem from '../TopProductItem/TopProductItem';


const TopProduct = () => {
    const [product,setProduct] = useState([])
    useEffect(() =>{
        fetch('http://localhost:5500/product')
        .then(res => res.json())
        .then(data =>          
            {const popularProduct = data.filter(product => product.category === 'famous' );
                setProduct(popularProduct)} )
    },[])
    return (
        <div className='mt-40'> 
            <div>
                <SectionTitle
                subHeading={"Top Selling Product"}
                heading={"Our Suggested Product"}></SectionTitle>
            </div>
            <div className='container grid md:grid-cols-3 m-auto mt-10'>
                {
                    product .map(product => <TopProductItem key={product._id} product={product}></TopProductItem>)
                }
            </div>
            
        </div>
    );
};

export default TopProduct;