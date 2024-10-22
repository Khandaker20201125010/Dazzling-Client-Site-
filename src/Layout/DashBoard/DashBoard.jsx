import { BsCart4 } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import useCart from "../../Hooks/useCart";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { FaBook, FaList, FaUsersGear } from "react-icons/fa6";
const DashBoard = () => {
    const [cart] = useCart();
    const isAdmin = true;
    const adminNavLinks = (
        <>
       
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/adminProfile'><CgProfile size={25} />Admin Profile</NavLink>
            <NavLink className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/addItems'> <GiClothes size={25} />Add items</NavLink>
             <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/manageProduct'><FaList size={20} />Manage Product</NavLink>
             <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/manageBookings'><FaBook size={20} />Manage Booking</NavLink>
             <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/allUsers'><FaUsersGear />All Users</NavLink>
        </>
    )
    const navLinks = (
        <>
       
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/userProfile'><CgProfile />User Profile</NavLink>
            <NavLink className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/cart'> <BsCart4 />My Cart({cart.length})</NavLink>
             <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/reservation'><FaCalendar />Reservation</NavLink>
             <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/dashBoard/myBooking'><CgProfile />My Booking</NavLink>
        </>
    )
   
    const Links = (
        <>
            <NavLink className={({ isActive }) => {
                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }} to='/'><IoHome />Home</NavLink>
            <NavLink className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }}  to='/allCollections'> <BsCart4 />Our Collections</NavLink>
            <NavLink className={({ isActive }) => {

                return isActive
                    ? 'font-bold text-black hover:text-white'
                    : 'font-bold text-black hover:text-white';
            }}  to='/contact'> <MdConnectWithoutContact />Contact</NavLink>
        </>
    )
    return (
        <div className="flex ">
            <div className="w-72 min-h-screen bg-orange-500">
               {
                isAdmin ? <>
                 <h3 className="text-center text-2xl p-4 text-black font-extrabold flex "><IoHome size={30} /><i>Admin Dashboard</i></h3>
                </>:
                <>
                 <h3 className="text-center text-2xl p-4  text-black font-extrabold flex "><IoHome size={30} /><i>User Dashboard</i></h3>
                </>
               }
                <ul className="menu p-4 text-xl text-black font-bold">
                   {
                    isAdmin ? <>
                     <li>
                       {adminNavLinks}
                       </li>
                    
                    </>:<>
                       <li>
                       {navLinks}
                       </li>
                    </>
                   }
                </ul>
                <div className=" border-t-2 border-black my-4 max-h-screen"></div>
                <ul className="menu p-4 text-lg text-black font-bold">
                    <li>
                        {Links}
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