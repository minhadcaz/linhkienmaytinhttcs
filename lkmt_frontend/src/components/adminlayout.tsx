import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, theme, Drawer, Grid } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import {
  AppstoreOutlined,
  PictureOutlined,
  ShoppingOutlined,
  TagOutlined,
  UserOutlined,
  ContainerOutlined,
  LogoutOutlined,
  MenuOutlined,
  FileImageOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid; // Sử dụng hook để lấy kích thước màn hình

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  // State cho Desktop (thu gọn/mở rộng Sider)
  const [collapsed, setCollapsed] = useState(false);

  // State cho Mobile (đóng/mở Drawer)
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { token: { colorBgContainer } } = theme.useToken();

  // Lấy trạng thái kích thước màn hình hiện tại (xs, sm, md, lg, xl, xxl)
  const screens = useBreakpoint();

  const menuItems = [
    { key: 'dashboard', icon: <AppstoreOutlined />, label: 'Dashboard' },
    {
      key: 'home-slides', icon: <PictureOutlined />, label: 'Home Slides',
      children: [{ key: 'slide-list', label: 'All Slides' }, { key: 'slide-add', label: 'Add Slide' }]
    },
    {
      key: 'category', icon: <AppstoreOutlined />, label: 'Category',
      children: [{ key: 'cat-list', label: 'All Categories' }, { key: 'cat-add', label: 'Add Category' }]
    },
    {
      key: 'products', icon: <TagOutlined />, label: 'Products',
      children: [{ key: 'prod-list', label: 'All Products' }, { key: 'prod-add', label: 'Add Product' }]
    },
    { key: 'users', icon: <UserOutlined />, label: 'Users' },
    { key: 'orders', icon: <ShoppingOutlined />, label: 'Orders' },
    {
      key: 'banners', icon: <FileImageOutlined />, label: 'Banners',
      children: [{ key: 'ban-list', label: 'All Banners' }]
    },
    {
      key: 'blogs', icon: <ContainerOutlined />, label: 'Blogs',
      children: [{ key: 'blog-list', label: 'All Blogs' }]
    },
    { key: 'manage-logo', icon: <PictureOutlined />, label: 'Manage Logo' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
  ];

  // Hàm xử lý khi bấm nút Menu trên Header
  const toggleMenu = () => {
    // Nếu màn hình nhỏ hơn 'md' (tablet/mobile) -> Mở Drawer
    if (!screens.md) {
      setDrawerVisible(true);
    } else {
      // Nếu màn hình lớn (Desktop) -> Thu gọn/Mở rộng Sider
      setCollapsed(!collapsed);
    }
  };

  // TÁCH PHẦN RUỘT SIDEBAR RA MỘT BIẾN ĐỂ DÙNG CHUNG CHO CẢ SIDER VÀ DRAWER
  const sidebarContent = (
    <>
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
        {!collapsed || !screens.md ? (
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>ADMIN LOGO</div>
        ) : (
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>L</div>
        )}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        items={menuItems}
        style={{ borderRight: 0, marginTop: '16px', fontWeight: 500 }}
        onClick={(e) => {
          // Tự động đóng Drawer khi click chọn 1 mục menu trên thiết bị di động
          if (!screens.md) setDrawerVisible(false);
          if (e.key === 'dashboard') {
            navigate('/admin'); // Về trang chủ Admin
          } else if (e.key === 'users') {
            navigate('/admin/users'); // Link tới trang Users
          } else if (e.key === 'logout') {
            // Logic đăng xuất sẽ xử lý sau
            console.log('Đăng xuất...');
          } else {
            // Các trang khác lấy chính key làm URL (ví dụ: orders -> /admin/orders)
            navigate(`/admin/${e.key}`);
          }
        }}
      />
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {/* 1. HIỂN THỊ TRÊN DESKTOP: Dùng Layout.Sider */}
      {screens.md && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={260}
          style={{ borderRight: '1px solid #f0f0f0' }}
        >
          {sidebarContent}
        </Sider>
      )}

      {/* 2. HIỂN THỊ TRÊN MOBILE: Dùng Drawer đè lên màn hình */}
      <Drawer
        placement="left"
        closable={false} // Ẩn dấu X mặc định cho giống Sider
        onClose={() => setDrawerVisible(false)} // Tự động đóng khi click vào vùng tối
        open={drawerVisible}
        width={260}
        styles={{ body: { padding: 0 } }} // Xóa padding mặc định của Drawer để Menu dán sát lề
      >
        {sidebarContent}
      </Drawer>

      <Layout>
        {/* HEADER */}
        <Header style={{ padding: 0, background: colorBgContainer, borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleMenu} // Gọi hàm toggle đã cấu hình ở trên
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>

        {/* NỘI DUNG */}
        <Content
          style={{
            margin: '24px',
            padding: 24,
            minHeight: 280,
            background: '#f4f6f8',
            borderRadius: '8px'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;