import React from 'react';
import Banner from '../Shared/Banner/Banner';
import Types from '../Shared/Types/Types';
import PopularProduct from '../Shared/PopularItem/PopularProduct';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Types></Types>
            <PopularProduct></PopularProduct>
           
            
        </div>
    );
};

export default Home;