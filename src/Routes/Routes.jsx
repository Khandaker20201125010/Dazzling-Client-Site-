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
  ]);  