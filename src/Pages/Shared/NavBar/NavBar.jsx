import React from 'react';
import { NavLink } from 'react-router-dom';
import SparklesText from '../../../Componenets/Sparkle/Sparkle';

const NavBar = () => {
    const links = (
        <>
            <li>
                <NavLink
                    className={({ isActive }) => {
                        console.log('Is Active:', isActive);
                        return isActive
                            ? 'font-bold text-yellow-500 hover:text-yellow-700'
                            : 'font-bold text-white hover:text-yellow-600';
                    }}
                    to='/'
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'font-bold text-yellow-600 hover:text-yellow-700'
                            : 'font-bold text-white hover:text-yellow-600'
                    }
                    to='/allCollections'
                >
                    All Collections
                </NavLink>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-transparent ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow nav-link">
                            {links}
                        </ul>
                    </div>
                    <div className="">
                        <SparklesText>
                        <a className="text-xl text-white px-10 text-lighting">Dazzling</a>
                        </SparklesText>
                    </div>
                   
                   
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className=' menu-horizontal gap-5 px-1 text-yellow'>
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
