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
               
                <button className='buton'>
                    <span className='text-white font-bold'>Get </span>
                    <div class="top"></div>
                    <div class="left"></div>
                    <div class="bottom"></div>
                    <div class="right"></div>
                </button>   

            </div>

        </div>
    );
};

export default ProductItem;
