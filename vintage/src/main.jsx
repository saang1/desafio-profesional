import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AdministratorPage from './pages/AdministratorPage';
import AdminListProduct from './components/AdminListProduct';
import NewProduct from './components/NewProduct';
import ProductList from './components/ProductList';
import ProductDetailPage from './pages/ProductDetailPage';
import Layout from './components/Layout';
import Categories from './components/Categories';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/administrator',
    element: (
      <Layout>
        <AdministratorPage />
      </Layout>
    ),
  },
  {
    path: '/new-product',
    element: (
      <Layout>
        <NewProduct />
      </Layout>
    ),
  },
  {
    path: '/admin-list-product',
    element: (
      <Layout>
        <AdminListProduct />
      </Layout>
    ),
  },
  {
    path: '/products',
    element: (
      <Layout>
        <ProductList />
      </Layout>
    ),
  },
  {
    path: '/categories',
    element: (
      <Layout>
        <Categories />
      </Layout>
    ),
  },
  {
    path: '/products/:id',
    element: (
      <Layout>
        <ProductDetailPage />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
