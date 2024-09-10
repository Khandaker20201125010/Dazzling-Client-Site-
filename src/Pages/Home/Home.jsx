import React from 'react';
import Banner from '../Shared/Banner/Banner';
import Types from '../Shared/Types/Types';
import PopularProduct from '../Shared/PopularItem/PopularProduct';
import Featured from '../Shared/Featured/Featured';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Types></Types>
            <PopularProduct></PopularProduct>
            <Featured></Featured>
           
            
        </div>
    );
};

export default Home;