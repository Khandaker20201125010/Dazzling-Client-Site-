import React from 'react';
import CoverBackground from '../../../Componenets/CoverBackground/CoverBackground';
import i from '../../../assets/images/co1.jpg'
const Intro = () => {
    return (
        <div className='mt-20'>
            <CoverBackground img={i} title={'Dazzling'} details={'At our store, we believe style is more than just a look—its an expression of who you are. From luxurious watches and timeless jewelry to chic sunglasses and premium apparel, we offer a curated selection of products that embody sophistication and quality. Whether you’re searching for the perfect accessory to complete your look or a statement piece to elevate your wardrobe, our collections are designed to cater to your unique taste. With exceptional craftsmanship and attention to detail, our products ensure you not only stand out but feel confident in every step you take. Explore our store and redefine your style today.'}></CoverBackground>
            
        </div>
    );
};

export default Intro;