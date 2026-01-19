import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { CartProvider } from './context/CartContext';
import Products from './pages/Products';

import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import DashboardOrders from './pages/dashboard/DashboardOrders';
import DashboardOrderDetail from './pages/dashboard/DashboardOrderDetail';
import { DashboardAddress, DashboardWishlist, DashboardSettings } from './pages/dashboard/DashboardExtras';
import UserLayout from './layouts/UserLayout';
import DashboardProfile from './pages/dashboard/DashboardProfile';
import UserAddresses from './pages/dashboard/UserAddresses';
import UserActivityLogs from './pages/dashboard/UserActivityLogs';
import DashboardCart from './pages/dashboard/DashboardCart';
import DashboardShop from './pages/dashboard/DashboardShop';
import DashboardCheckout from './pages/dashboard/DashboardCheckout';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminCategories from './pages/admin/AdminCategories';
import AdminStock from './pages/admin/AdminStock';
import AdminPromos from './pages/admin/AdminPromos';
import { AdminCustomers, AdminSettings } from './pages/admin/AdminExtras';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="products" element={<Products />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>

              {/* Protected Routes */}
              <Route path="/dashboard" element={<UserLayout />}>
                <Route index element={<DashboardProfile />} />
                <Route path="shop" element={<DashboardShop />} />
                <Route path="cart" element={<DashboardCart />} />
                <Route path="checkout" element={<DashboardCheckout />} />
                <Route path="orders" element={<DashboardOrders />} />
                <Route path="orders/:id" element={<DashboardOrderDetail />} />
                <Route path="addresses" element={<UserAddresses />} />
                <Route path="wishlist" element={<DashboardWishlist />} />
                <Route path="settings" element={<DashboardSettings />} />
                <Route path="logs" element={<UserActivityLogs />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="stock" element={<AdminStock />} />
                <Route path="promos" element={<AdminPromos />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/edit/:id" element={<AdminProductForm />} />
                <Route path="customers" element={<AdminCustomers />} />

                <Route path="settings" element={<AdminSettings />} />

              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
