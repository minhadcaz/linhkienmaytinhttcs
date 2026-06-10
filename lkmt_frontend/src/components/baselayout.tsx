import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Layout } from 'antd';
import Navbar from './navbar';

const { Content, Footer } = Layout;

const BaseLayout: React.FC = () => {
  // 1. Quản lý dữ liệu giỏ hàng trực tiếp tại Layout gốc
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Các hàm thao tác với giỏ hàng
  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 2. Truyền thẳng mảng cartItems vào Navbar thông qua props */}
      <Navbar cartItems={cartItems} />

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        {/* 3. Truyền state và các hàm xử lý xuống các trang con thông qua Outlet */}
        <Outlet context={{ cartItems, addToCart, removeFromCart, updateQuantity }} /> 
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        TechTrendz Online ©{new Date().getFullYear()} Created by Bạn
      </Footer>
    </Layout>
  );
};

export default BaseLayout;