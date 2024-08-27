import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import Banner from '../Pages/Shared/Banner/Banner';


const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
           
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;