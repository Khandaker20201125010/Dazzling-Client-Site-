import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllCollections from "../Pages/AllCollections/AllCollections";
import Login from "../Pages/Login/Login";

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
            element:<AllCollections></AllCollections>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
      ]
    },
  ]);  