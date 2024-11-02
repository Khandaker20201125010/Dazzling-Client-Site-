import React from 'react';
import Banner from '../Shared/Banner/Banner';
import Types from '../Shared/Types/Types';
import PopularProduct from '../Shared/PopularItem/PopularProduct';
import Featured from '../Shared/Featured/Featured';

import TopProduct from '../Shared/TopProduct/TopProduct';
import Testimonials from '../Shared/Testimonials/Testimonials';
import Intro from '../Shared/Intro/Intro';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Dazzling</title>
            </Helmet>
            <Banner></Banner>
            <Types></Types>
           
            <PopularProduct></PopularProduct>
            <Intro></Intro>
            <TopProduct></TopProduct>
            <Featured></Featured>
            <Testimonials></Testimonials>
           
            
        </div>
    );
};

export default Home;