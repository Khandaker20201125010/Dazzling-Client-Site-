import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Routes.jsx'
import {
  RouterProvider,
} from "react-router-dom";
import AuthProviders from './Providers/AuthProviders.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders> <RouterProvider router={router} /></AuthProviders>
  </StrictMode>,
)
