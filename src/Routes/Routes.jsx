import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllCollections from "../Pages/AllCollections/AllCollections";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/signUp/SignUp";
import PriveteRoutes from "./PriveteRoutes";
import Details from "../Pages/Details/Details";
import DashBoard from "../Layout/DashBoard/DashBoard";
import DashBoardCard from "../Componenets/Carts/DashBoardCard";
import AllUsers from "../Layout/DashBoard/AllUsers/AllUsers";
import AdminRoutes from "./AdminRoutes";
import AddItems from "../Layout/DashBoard/AddItems/AddItems";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/allCollections',
            element:<PriveteRoutes><AllCollections></AllCollections></PriveteRoutes>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signUp',
            element:<SignUp></SignUp>
        },
        {
            path:'/details/:id',
            element:<PriveteRoutes><Details></Details></PriveteRoutes>
        },
      ]
    },
    {
      path: "dashboard",
      element:<PriveteRoutes><DashBoard></DashBoard></PriveteRoutes>,
      children:[
        //user routes 
        {
          path:'cart',
          element:<DashBoardCard></DashBoardCard>
        },


       //admin routes
       {
        path:'adminProfile',
        element:<AdminRoutes></AdminRoutes>
       },
       {
        path:'addItems',
        element:<AdminRoutes><AddItems></AddItems></AdminRoutes>
       },
       {
        path:'manageItems',
        element:<AdminRoutes></AdminRoutes>
       },
      {
        path:'manageBookings',
        element:<AdminRoutes></AdminRoutes>
      },
      {
        path:'allUsers',
        element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
      }
       


      ]
    }
  ]);  