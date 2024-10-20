import { BsCart4 } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
const DashBoard = () => {
    const links = (
        <>
            <Link className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/userProfile'><CgProfile />User Profile</Link>
            <Link className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/cart'> <BsCart4 />My Cart</Link>
        </>
    )
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-500">
                <h3 className="text-center text-2xl p-4 px-8 text-black font-extrabold flex "><IoHome size={30} />User Home</h3>
                <ul className="menu p-4 text-xl text-black font-bold">
                    <li>
                        {links}
                    </li>

                </ul>
            </div>
            <div className="flex-1 p-8 min-h-screen mx-auto">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default DashBoard;