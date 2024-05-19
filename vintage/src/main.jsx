import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import AdministratorPage from './pages/AdministratorPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import Product from './components/Product.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "Administrator",
    element: <AdministratorPage/>,
  },
  {
    path: "add-product",
    element: <Product/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
