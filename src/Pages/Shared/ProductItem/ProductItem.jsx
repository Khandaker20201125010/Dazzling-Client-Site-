import React from 'react';

const ProductItem = ({ product }) => {
    const { name, image, price, description } = product;

    return (
        <div className='flex items-center justify-between p-2'>
            <div className='flex gap-5'>
            <div className='image-container'>
                    <img className='product-image' src={image} alt={name} />
                </div>
                <div>
                    <h3 className='uppercase  font-bold'>{name}</h3>
                    <p className='w-3/4'>{description}</p>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
            <p className='text-lg text-lighting  text-white'>{price}$</p>
            <button className='text-lg text-lighting text-white rounded-full  bg-black w-20 h-8'>Get</button>

            </div>
          
        </div>
    );
};

export default ProductItem;
