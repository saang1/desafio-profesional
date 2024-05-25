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
import NewProduct from './components/NewProduct.jsx';

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
    path: "new-product",
    element: <NewProduct/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
