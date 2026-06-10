import React from 'react';
import { Layout, Input, Button, Space, Typography, Badge, Dropdown } from 'antd';
import { LoginOutlined, SearchOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
// 1. Import useLocation và Link từ react-router
import { useLocation, Link, useNavigate } from 'react-router';
import { useCart } from '../context/cartcontext';

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = true;

  // Khai báo menu cho ô User (Dropdown)
  const userDropdownItems = [
    {
      key: 'login',
      icon: <LoginOutlined />,
      label: 'Đăng nhập',
      onClick: () => navigate('/login'), // Chuyển hướng sang trang Login
    },
    {
      key: 'register',
      icon: <UserAddOutlined />,
      label: 'Đăng ký',
      onClick: () => navigate('/register'), // Chuyển hướng sang trang Register
    },
  ];
  // 2. Khởi tạo hook lấy đường dẫn URL hiện tại
  const location = useLocation();
  // // Lấy dữ liệu từ Context
  const { cartItems } = useCart();

  // // Tính tổng số lượng thực tế (VD: 2 CPU + 1 GPU = 3)
  const totalItemCount = cartItems.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
  // Hàm hỗ trợ để set style động (Tô đen nếu active)
  const getButtonStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      backgroundColor: isActive ? '#212529' : 'transparent',
      borderColor: isActive ? '#212529' : '#d9d9d9',
      color: isActive ? '#fff' : 'rgba(0, 0, 0, 0.88)',
      borderRadius: '4px',
    };
  };

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff',
        padding: '0 24px',
        borderBottom: '1px solid #e8e8e8',
        height: '64px'
      }}
    >
      {/* Khu vực Logo bên trái */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ border: '1px solid #d9d9d9', padding: '4px 10px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', lineHeight: '1' }}>
          T
        </div>
        <Title level={4} style={{ margin: 0 }}>TechTrendz Online</Title>
      </div>

      {/* Khu vực Tìm kiếm ở giữa */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 40px' }}>
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          style={{ maxWidth: '500px', height: '36px', borderRadius: '4px' }}
        />
      </div>

      {/* Khu vực Menu và Icon bên phải */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>

        {/* NHÓM NÚT ĐIỀU HƯỚNG CÓ XỬ LÝ ACTIVE ĐỘNG */}
        <Space size="small">
          <Link to="/">
            <Button
              type={location.pathname === '/' ? 'primary' : 'default'}
              style={getButtonStyle('/')}
            >
              Home
            </Button>
          </Link>

          <Link to="/products">
            <Button
              type={location.pathname === '/products' ? 'primary' : 'default'}
              style={getButtonStyle('/products')}
            >
              Products
            </Button>
          </Link>

          <Button style={{ borderRadius: '4px' }}>Help</Button>
        </Space>

        {/* Nhóm Icon Giỏ hàng & User */}
        <Space size="small">
          <Link to="/cart">
            <Badge count={totalItemCount} size="small" offset={[-2, 2]}>
              <Button
                icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />}
                // Gộp hàm getButtonStyle và kích thước vào chung 1 object style
                style={{
                  ...getButtonStyle('/cart'),
                  width: '40px',
                  height: '40px'
                }}
              />
            </Badge>
          </Link>
          <Link to="/profile">

          </Link>
          {isAuthenticated ? (
            <Link to="/profile">
              <Badge count={totalItemCount} size="small" offset={[-2, 2]}>
                <Button
                  icon={<UserOutlined style={{ fontSize: '18px' }} />}
                  // Gộp hàm getButtonStyle và kích thước vào chung 1 object style
                  style={{
                    ...getButtonStyle('/profile'),
                    width: '40px',
                    height: '40px'
                  }}
                />
              </Badge>
            </Link>
          ) : (
            <Dropdown menu={{ items: userDropdownItems }} placement="bottomRight" arrow>
              <Button
                icon={<UserOutlined style={{ fontSize: '18px' }} />}
                // Gộp hàm getButtonStyle để icon tự động tô đen khi ở trang /profile
                style={{
                  ...getButtonStyle('/profile'),
                  width: '40px',
                  height: '40px'
                }}
              />
            </Dropdown>
          )};


        </Space>
      </div>
    </Header>
  );
};

export default Navbar;