import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SparklesText from '../../../Componenets/Sparkle/Sparkle';
import { AuthContext } from '../../../Providers/AuthProviders';
import { BsCart4 } from "react-icons/bs";
import useCart from '../../../Hooks/useCart';
import { LiaTimesSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import MenuCarts from '../../../Componenets/Carts/MenuCarts';
const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart, refetch] = useCart();
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMenu = () => {
        setClick(false);
    };
    const handelLogOut = () => {
        logOut()
            .then(() => {
                console.log("Logged out successfully");
            })

    };
    const totalPrice = cart?.reduce((total, item) => total + item.price, 0)
    const links = (
        <>
            <li>
                <NavLink  data-tip="Home"
                    className={({ isActive }) => {
                        
                        return isActive
                            ? 'font-bold text-yellow-500 hover:text-yellow-700 tooltip tooltip-warning   tooltip-bottom'
                            : 'font-bold text-white hover:text-yellow-600 tooltip tooltip-warning tooltip-bottom';
                    }}
                    to='/'
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink  data-tip="Our Collections"
                    className={({ isActive }) =>
                        isActive
                            ? 'font-bold text-yellow-600 hover:text-yellow-700 tooltip tooltip-warning tooltip-bottom '
                            : 'font-bold text-white hover:text-yellow-600 tooltip tooltip-warning tooltip-bottom '
                    }
                    to='/allCollections'
                >
                    Our Collections
                </NavLink>
            </li>
            <li>

                <div className='hover:text-yellow-600 md:hidden lg:hidden'>
                    {
                        user ? (
                            <>
                                <button className="text-xl " onClick={handelLogOut} >
                                    Leave
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className=" text-xl">
                                        Join us
                                    </button>
                                </Link>
                            </>
                        )
                    }
                </div>

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
                            <Link to='/'><a className="text-2xl text-white px-10 text-lighting "><i>Dazzling</i></a></Link>
                        </SparklesText>
                    </div>


                </div>

                <div className="navbar-end hidden lg:flex">

                    <ul className=' menu-horizontal gap-5 px-1 text-yellow'>
                        {links}
                    </ul>
                </div>

                <div className="navbar-end md:mr-10">
                    <div  className='z-[200] '>
                        <div className="flex  gap-5 lg:gap-10 justify-center ">
                            {/* Burger Icon */}
                            <div   onClick={handleClick}>
                                <div data-tip="Cart" className="indicator p-1 md:mr-20 max-sm:mr-5 tooltip tooltip-warning tooltip-bottom">
                                    <BsCart4 size={25} className='text-yellow-600' />
                                    <span className="badge badge-xs rounded-full bg-red-600 h-6 w-6 p-2 indicator-item text-white">+{cart?.length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div
                            className={`fixed top-10 right-0 w-[500px] h-full bg-base-200 transition-transform duration-500 ease-in-out z-50 ${click ? 'translate-x-0' : 'translate-x-full'}`} // Change left to right
                        >
                            {/* Fixed Header in Burger Menu */}

                            <div className="sticky top-0 bg-base-200 px-4 py-3 md:py-4 border-b border-yellow-700">
                                <div className="text-2xl font-bold flex justify-between items-center">
                                    <a onClick={closeMenu} className="hover:text-orange-500 cursor-pointer border-2 border-orange-400">
                                        <LiaTimesSolid className="text-xl lg:text-2xl cursor-pointer" />
                                    </a>
                                </div>
                                <h3 className='mt-2 font-bold'>Total Product : {cart?.length}</h3>
                            </div>

                            {/* Scrollable Content with Hidden Scrollbar */}
                            <ul
                                className="overflow-y-scroll p-4 space-y-6 text-center  z-[1]"
                                style={{
                                    maxHeight: 'calc(100vh - 64px)',
                                    scrollbarWidth: 'none', /* For Firefox */
                                    msOverflowStyle: 'none', /* For Internet Explorer and Edge */
                                }}
                            >
                                {/* Hide Scrollbar for WebKit Browsers */}
                                <style jsx>{` ul::-webkit-scrollbar { display: none; } `}</style>
                                {cart?.map(item => <MenuCarts key={item._id} cart={item} refetch={refetch} />)}
                            </ul>
                            <div className="sticky bottom-0 bg-base-200 px-4 py-3 md:py-4 border-t border-yellow-700  ">
                                <h2 className="text-2xl font-bold  flex justify-evenly gap-20">Total Price: <span className='text-red-500'> {totalPrice}$</span> </h2>
                                <div  data-tip="Pay?" className="flex tooltip  tooltip-warning justify-end mt-2 "> {/* Add margin-top for spacing */}
                                    <button className=" h-7 w-28 rounded-xl hover:bg-orange-500 mr-10 text-black bg-orange-400 text-xl font-bold ">
                                        Pay
                                        </button> {/* You can customize button styling */}
                                </div>
                            </div>

                        </div>


                        {/* Background Shadow (Overlay) */}
                        {click && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
                                onClick={closeMenu}  // Close menu when clicking on the overlay
                            ></div>
                        )}
                    </div>

                    <div className='max-sm:hidden'>
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
        </div>
    );
};

export default NavBar;
