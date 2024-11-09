import { createBrowserRouter } from "react-router-dom";
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
import ManageProduct from "../Layout/DashBoard/ManageProduct/ManageProduct";
import UpdateProduct from "../Layout/DashBoard/UpdateProduct/UpdateProduct";
import AdminProfile from "../Layout/DashBoard/AdminProfile/AdminProfile";
import UserProfile from "../Layout/DashBoard/UserProfile/UserProfile";
import AddShippingMethod from "../Layout/DashBoard/AddShippingMethod/AddShippingMethod";
import OrderInfo from "../Pages/OrderInfo/OrderInfo";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../Pages/Shared/PaymentFailed/PaymentFailed";
import PaymentHistory from "../Layout/DashBoard/PaymentHistory/PaymentHistory";
import ManageBookings from "../Layout/DashBoard/ManageBookings/ManageBookings";
import Contact from "../Pages/Contact.jsx/Contact";

export const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allCollections",
        element: (
          <PriveteRoutes>
            <AllCollections></AllCollections>
          </PriveteRoutes>
        ),
      },
      {
        path: "/Contacts",
        element: (
          <PriveteRoutes>
            <Contact></Contact>
          </PriveteRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/details/:id",
        element: (
          <PriveteRoutes>
            <Details></Details>
          </PriveteRoutes>
        ),
      },
      {
        path: "/orderInfo",
        element: (
          <PriveteRoutes>
            <OrderInfo></OrderInfo>
          </PriveteRoutes>
        ),
      },
      {
        path: "payment/success/:tranId",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment/fail/:tranId",
        element: (
          <PriveteRoutes>
            <PaymentFailed></PaymentFailed>
          </PriveteRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PriveteRoutes>
        <DashBoard></DashBoard>
      </PriveteRoutes>
    ),
    children: [
      //user routes
      {
        path: "userProfile",
        element: (
          <PriveteRoutes>
            <UserProfile></UserProfile>
          </PriveteRoutes>
        ),
      },
      {
        path: "cart",
        element: <DashBoardCard></DashBoardCard>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      //admin routes
      {
        path: "adminProfile",
        element: (
          <AdminRoutes>
            <AdminProfile></AdminProfile>
          </AdminRoutes>
        ),
      },
      {
        path: "addShippings",
        element: (
          <AdminRoutes>
            <AddShippingMethod></AddShippingMethod>
          </AdminRoutes>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoutes>
            <AddItems></AddItems>
          </AdminRoutes>
        ),
      },
      {
        path: "manageProduct",
        element: (
          <AdminRoutes>
            <ManageProduct></ManageProduct>
          </AdminRoutes>
        ),
      },
      {
        path: "updateProduct/:id",
        element: (
          <AdminRoutes>
            <UpdateProduct></UpdateProduct>
          </AdminRoutes>
        ),
      },
      {
        path: "manageBookings",
        element: (
          <AdminRoutes>
            <ManageBookings></ManageBookings>
          </AdminRoutes>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
    ],
    
  },
],
);
