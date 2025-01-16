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
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminListUsers from './components/AdminListUsers';
import ManageAttributes from './pages/ManageAttributesPage';
import SearchResults from './components/SearchResults';


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
    path: '/users',
    element: (
      <Layout>
        <AdminListUsers />
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
  {
    path: '/edit-product/:id',
    element: (
      <Layout>
        <NewProduct />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
  {
    path: '/admin/manage-attributes',
    element: (
      <Layout>
        <ManageAttributes />
      </Layout>
    ),
  },
  {
    path: '/search',
    element: (
      <Layout>
        <SearchResults />
      </Layout>
    ),
  },
  {
    path: '/product/:id',
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
