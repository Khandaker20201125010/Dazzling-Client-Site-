import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SparklesText from '../../../Componenets/Sparkle/Sparkle';
import { AuthContext } from '../../../Providers/AuthProviders';
import { BsCart4 } from "react-icons/bs";
const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handelLogOut = () => {
        logOut()
            .then(() => {
                console.log("Logged out successfully");
            })

    };
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
                    Our Collections
                </NavLink>
            </li>
            <li>
                <NavLink>

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
                            <a className="text-2xl text-white px-10 text-lighting "><i>Dazzling</i></a>
                        </SparklesText>
                    </div>


                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className=' menu-horizontal gap-5 px-1 text-yellow'>
                        {links}
                    </ul>
                </div>

                <div className="navbar-end mr-10">
                    <div className="indicator p-1 mr-20">
                        <BsCart4 size={25}/>
                        <span className="badge badge-xs rounded-full bg-red-600 h-5 w-5 p-2 indicator-item">12</span>
                    </div>
                    {
                        user ? (
                            <>
                                <button className="lButton text-xl" onClick={handelLogOut} >
                                    Leave
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="lButton text-xl">
                                        Join us
                                    </button>
                                </Link>
                            </>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default NavBar;
