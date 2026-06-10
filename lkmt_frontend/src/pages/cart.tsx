import React, { useState } from 'react';
import { Row, Col, Typography, Button, Card, Space, Divider, Input } from 'antd';
import { 
  MinusOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  ArrowRightOutlined, 
  LockOutlined,
  ShoppingOutlined // Icon túi xách cho trạng thái trống
} from '@ant-design/icons';
import { Link } from 'react-router';

const { Title, Text } = Typography;

// Dữ liệu mẫu khởi tạo
const initialCartItems = [
  { id: 1, name: 'AMD Ryzen 7 7800X3D', category: 'Cpu', price: 449.99, originalPrice: null, quantity: 1 },
  { id: 2, name: 'GIGABYTE GeForce NVIDIA RTX 4080 SUPER', category: 'Gpu', price: 999.99, originalPrice: 1199.99, quantity: 1 },
  { id: 3, name: 'NZXT Kraken Elite 360', category: 'Cooler', price: 279.99, originalPrice: 299.99, quantity: 1 },
];

const CartPage: React.FC = () => {
  // Quản lý trạng thái giỏ hàng bằng useState
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Hàm xử lý XÓA sản phẩm
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Hàm xử lý TĂNG/GIẢM số lượng
  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  // Tính toán Order Summary động
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // Giả sử thuế 8%
  const total = subtotal + tax;

  // GIAO DIỆN KHI GIỎ HÀNG TRỐNG (Mô phỏng theo ảnh mới nhất của bạn)
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '60px 24px', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '60px', borderRadius: '8px', width: '100%', maxWidth: '800px' }}>
          {/* Icon giỏ xách */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
             <div style={{ backgroundColor: '#e2e6ea', padding: '24px', borderRadius: '16px' }}>
                <ShoppingOutlined style={{ fontSize: '64px', color: '#adb5bd' }} />
             </div>
          </div>
          <Title level={3} style={{ marginBottom: '8px' }}>Your cart is empty</Title>
          <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '32px' }}>
            Looks like you haven't added any items to your cart yet.
          </Text>
          <Link to="/products">
            <Button type="primary" size="large" style={{ backgroundColor: '#0a0a0a', borderColor: '#0a0a0a', borderRadius: '6px', padding: '0 32px' }}>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // GIAO DIỆN KHI CÓ SẢN PHẨM (Đã thiết kế từ trước)
  return (
    <div style={{ padding: '24px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0, fontWeight: 600 }}>Shopping Cart</Title>
          <Text type="secondary">{cartItems.length} items in your cart</Text>
        </div>

        <Row gutter={24}>
          <Col xs={24} lg={16}>
            {cartItems.map(item => (
              <Card key={item.id} styles={{ body: { padding: '16px' } }} style={{ marginBottom: '16px', borderRadius: '8px', borderColor: '#e8e8e8' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }}>
                    <Text type="secondary" style={{ fontSize: '10px', textAlign: 'center' }}>Image</Text>
                  </div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <Title level={5} style={{ margin: 0 }}>{item.name}</Title>
                    <Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>{item.category}</Text>
                    <div>
                      <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>${item.price}</Text>
                      {item.originalPrice && <Text delete type="secondary">${item.originalPrice}</Text>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                      <Button type="text" icon={<MinusOutlined />} onClick={() => handleQuantityChange(item.id, -1)} />
                      <div style={{ width: '40px', textAlign: 'center', fontWeight: 500 }}>{item.quantity}</div>
                      <Button type="text" icon={<PlusOutlined />} onClick={() => handleQuantityChange(item.id, 1)} />
                    </div>
                    <Text strong style={{ width: '70px', textAlign: 'right', fontSize: '16px' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    {/* Bắt sự kiện onClick để gọi hàm Xóa */}
                    <Button type="text" danger icon={<DeleteOutlined style={{ fontSize: '18px' }} />} onClick={() => handleRemoveItem(item.id)} />
                  </div>
                </div>
              </Card>
            ))}
          </Col>

          <Col xs={24} lg={8}>
            <Card style={{ borderRadius: '8px', borderColor: '#e8e8e8', backgroundColor: '#ffffff' }}>
              <Title level={4} style={{ marginBottom: '24px' }}>Order Summary</Title>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Text type="secondary">Subtotal ({cartItems.length} items)</Text>
                <Text strong>${subtotal.toFixed(2)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Text type="secondary">Shipping</Text>
                <Text strong style={{ color: '#52c41a' }}>Free</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <Text type="secondary">Tax</Text>
                <Text strong>${tax.toFixed(2)}</Text>
              </div>
              <Divider style={{ margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>Total</Title>
                <Title level={3} style={{ margin: 0 }}>${total.toFixed(2)}</Title>
              </div>
              <Button type="primary" block size="large" style={{ backgroundColor: '#212529', marginBottom: '12px', borderRadius: '4px', fontWeight: 600 }}>
                Proceed to Checkout <ArrowRightOutlined />
              </Button>
              <Link to="/products">
                 <Button block size="large" style={{ borderRadius: '4px', fontWeight: 500 }}>Continue Shopping</Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartPage;