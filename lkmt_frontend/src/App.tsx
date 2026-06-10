import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import BaseLayout from './components/baselayout';
import HeroBanner from './components/herobanner';
import FeaturesSection from './components/feature';
import ProductGrid from './components/productgrids';
import ProductsPage from './pages/product';
import CartPage from './pages/cart';
import { CartProvider } from './context/cartcontext';
import UserProfilePage from './pages/userprofile';
import ProductDetailPage from './pages/productdetail';
import CheckoutPage from './pages/checkout';
import AdminLayout from './components/adminlayout';
import AdminDashboard from './pages/admindashboard';
import AdminUsersPage from './pages/adminusers';
import AdminOrdersPage from './pages/adminorder';
// (Tạm thời tạo các component giả để test)
const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <FeaturesSection />
      {/* Sau này chúng ta sẽ thêm Danh sách Sản phẩm (Product List) ở bên dưới này */}
      <ProductGrid />
    </div>
  );
};

const NotFoundPage = () => <h2>404 - Không tìm thấy trang</h2>;

const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Khai báo Layout gốc */}
          <Route path="/" element={<BaseLayout />}>

            {/* Các trang con sẽ chui vào thẻ <Outlet /> của BaseLayout */}
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
          <Route path='404' element={<NotFoundPage />} />
          {/* Đường dẫn cho các URL không tồn tại */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Giao diện Dashboard mặc định khi vào /admin */}
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            {/* Ví dụ trang quản lý sản phẩm */}
            <Route path="products" element={<div>Manage Products Page</div>} />
            {/* Ví dụ trang quản lý users */}
            <Route path="users" element={<div>Manage Users Page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider >
  );
};

export default App;