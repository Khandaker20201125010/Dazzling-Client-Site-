import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Componenets/SectionTitle/SectionTitle';
import ProductItem from '../ProductItem/ProductItem';
import useProduct from '../../../Hooks/useProduct';

const PopularProduct = () => {
     const [product] = useProduct();
     const popular = product.filter(product => product.category === 'popular' )
    return (
        <div className='mt-40'> 
        
            <div>
                <SectionTitle
                subHeading={"Popular Product"}
                heading={"From Our Product"}></SectionTitle>
            </div>
            <div className='container grid md:grid-cols-2 gap-8 m-auto mt-10'>
                {
                    popular.map(product => <ProductItem key={product._id} product={product}></ProductItem>)
                }
            </div>
            
        </div>
    );
};

export default PopularProduct;