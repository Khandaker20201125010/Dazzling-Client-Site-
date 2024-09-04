import React from 'react';

const ProductItem = ({ product }) => {
    const { name, image, price, description } = product;

    return (
        <div className='flex items-center justify-between p-4'>
            <div className='flex'>
                <img style ={{borderRadius:'0px 200px 200px 0'}} className='w-32 h-32 object-cover mr-4' src={image} alt={name} />
                <div>
                    <h3 className='uppercase  font-bold'>{name}</h3>
                    <p className='w-3/4'>{description}</p>
                </div>
            </div>
            <p className='text-lg text-lighting  text-white'>{price}$</p>
        </div>
    );
};

export default ProductItem;
