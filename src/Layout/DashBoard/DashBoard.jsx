import { BsCart4 } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import useCart from "../../Hooks/useCart";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { FaBook, FaList, FaUsersGear } from "react-icons/fa6";
import { useState } from "react";
import { SlMenu } from 'react-icons/sl';
import { LiaTimesSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
const DashBoard = () => {
    const [cart] = useCart();
    const isAdmin = true;
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMenu = () => {
        setClick(false);
    };

    const adminNavLinks = (
        <>

            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/adminProfile'><CgProfile size={25} />Admin Profile</NavLink>
            <NavLink className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/addItems'> <GiClothes size={25} />Add items</NavLink>
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/manageProduct'><FaList size={20} />Manage Product</NavLink>
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/manageBookings'><FaBook size={20} />Manage Booking</NavLink>
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/allUsers'><FaUsersGear />All Users</NavLink>
        </>
    )
    const navLinks = (
        <>

            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/userProfile'><CgProfile />User Profile</NavLink>
            <NavLink className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/cart'> <BsCart4 />My Cart({cart.length})</NavLink>
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/reservation'><FaCalendar />Reservation</NavLink>
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/dashBoard/myBooking'><CgProfile />My Booking</NavLink>
        </>
    )

    const Links = (
        <>
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/'><IoHome />Home</NavLink>
            <NavLink className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/allCollections'> <BsCart4 />Our Collections</NavLink>
            <NavLink className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-white hover:text-orange-600'
                    : 'font-bold text-gray-500 hover:text-orange-600';
            }} to='/contact'> <MdConnectWithoutContact />Contact</NavLink>
        </>
    )
    return (
        <div className="flex ">
            <div className="flex py-6 navbar-start fixed z-30 lg:hidden md:hidden">
                <div className="flex mx-10 gap-5 lg:gap-10 justify-center items-center">
                    {/* Burger Icon */}
                    <div onClick={handleClick}>
                        {click ? (
                            <AiOutlineClose size={30} className="text-xl text-yellow-500 lg:text-2xl cursor-pointer" />
                        ) : (
                            <SlMenu size={30} className="text-xl lg:text-2xl text-yellow-500 font-bold cursor-pointer" />
                        )}
                    </div>
                </div>

                {/* Menu Items */}
                <div
                    className={`fixed top-0 left-0 w-[350px] h-full bg-base-200 transition-transform duration-500 ease-in-out z-50 ${click ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    {/* Fixed Header in Burger Menu */}
                    <div className="sticky top-0 bg-base-200 px-4 py-3 md:py-4 border-b border-gray-700">
                        <div className="text-2xl font-bold flex justify-between items-center">
                            <a onClick={closeMenu} className="hover:text-orange-500 cursor-pointer border-2 border-orange-400">
                                <LiaTimesSolid className="text-xl lg:text-2xl cursor-pointer" />
                            </a>
                        </div>
                    </div>

                    {/* Scrollable Content with Hidden Scrollbar */}
                    <ul
                        className="overflow-y-scroll p-4 space-y-6 text-center text-3xl  bg-gradient-to-r from-gray-800 via-black to-gray-800  "
                        style={{
                            maxHeight: 'calc(100vh - 64px)',
                            scrollbarWidth: 'none', /* For Firefox */
                            msOverflowStyle: 'none' /* For Internet Explorer and Edge */
                        }}
                    >
                        {/* Hide Scrollbar for WebKit Browsers */}
                        <style jsx>{` ul::-webkit-scrollbar { display: none; } `}</style>

                        {
                            isAdmin ? <>
                                <h3 className="text-center text-2xl p-4 text-white font-extrabold flex "><IoHome size={30} /><i>Admin Dashboard</i></h3>
                            </> :
                                <>
                                    <h3 className="text-center text-2xl p-4  text-white font-extrabold flex "><IoHome size={30} /><i>User Dashboard</i></h3>
                                </>
                        }
                        <ul className="menu p-4 text-xl text-white font-bold">
                            {
                                isAdmin ? <>
                                    <li>
                                        {adminNavLinks}
                                    </li>

                                </> : <>
                                    <li>
                                        {navLinks}
                                    </li>
                                </>
                            }
                        </ul>
                        <div className=" border-t-2 border-black my-4 max-h-screen"></div>
                        <ul className="menu p-4 text-lg text-white font-bold">
                            <li>
                                {Links}
                            </li>
                        </ul>
                    </ul>
                </div>

                {/* Background Shadow (Overlay) */}
                {click && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
                        onClick={closeMenu}  // Close menu when clicking on the overlay
                    ></div>
                )}
            </div>
            {/* Lg dashBoard */}
            <div className="w-72 min-h-screen bg-gradient-to-r from-gray-800 via-black to-gray-800 border-x-2 shadow-xl border-orange-500 shadow-orange-500 max-sm:hidden max-md:hidden">
                {
                    isAdmin ? <>
                        <h3 className="text-center text-2xl p-4 text-white font-extrabold flex "><IoHome size={30} /><i>Admin Dashboard</i></h3>
                    </> :
                        <>
                            <h3 className="text-center text-2xl p-4  text-white font-extrabold flex "><IoHome size={30} /><i>User Dashboard</i></h3>
                        </>
                }
                <ul className="menu p-4 text-xl text-white font-bold">
                    {
                        isAdmin ? <>
                            <li>
                                {adminNavLinks}
                            </li>

                        </> : <>
                            <li>
                                {navLinks}
                            </li>
                        </>
                    }
                </ul>
                <div className=" border-t-2 border-orange-500 my-4 max-h-screen"></div>
                <ul className="menu p-4 text-lg text-white font-bold">
                    <li>
                        {Links}
                    </li>
                </ul>

            </div>
            <div className="flex-1 p-6 min-h-screen mx-auto max-sm:px-4">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default DashBoard;