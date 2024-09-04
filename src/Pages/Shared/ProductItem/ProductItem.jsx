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
            <p className='text-lg text-lighting  text-white'>{price}$</p>
        </div>
    );
};

export default ProductItem;
