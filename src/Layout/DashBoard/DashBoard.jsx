import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                  <ul className="menu">
                    <li>
                        <NavLink to='/dashBoard/cart'></NavLink>
                    </li>
                  </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default DashBoard;