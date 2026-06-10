import React, { useState } from 'react';
import { Row, Col, Card, Typography, Avatar, Tag, Menu, Divider, Form, Input, Button, Space, Checkbox } from 'antd';
import { 
  UserOutlined, 
  HistoryOutlined, 
  EnvironmentOutlined, 
  CreditCardOutlined, 
  BellOutlined, 
  SafetyCertificateOutlined, 
  SettingOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

// --- DỮ LIỆU MẪU (Mock Data) ---
const mockOrders = [
  { 
    id: 'ORD-001', status: 'Delivered', statusColor: 'success', date: '1/15/2024', total: 1299.97, 
    items: [{ name: 'NVIDIA RTX 4080 SUPER x1', price: 999.99 }, { name: 'Intel Core i7-14700K x1', price: 299.98 }] 
  },
  { 
    id: 'ORD-002', status: 'Shipped', statusColor: 'processing', date: '1/8/2024', total: 329.98, 
    items: [{ name: 'Corsair Vengeance RGB Pro 32GB x2', price: 329.98 }] 
  },
  { 
    id: 'ORD-003', status: 'Processing', statusColor: 'warning', date: '1/1/2024', total: 579.98, 
    items: [{ name: 'ASUS ROG Strix Z790-E Gaming x1', price: 449.99 }, { name: 'Noctua NH-D15 Chromax x1', price: 129.99 }] 
  }
];

const mockAddresses = [
  { id: 1, type: 'Home', isDefault: true, name: 'John Doe', street: '123 Main Street', location: 'New York, NY 10001', country: 'United States' },
  { id: 2, type: 'Work', isDefault: false, name: 'John Doe', street: '456 Business Ave', location: 'New York, NY 10002', country: 'United States' }
];

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const menuItems = [
    { key: 'Profile', icon: <UserOutlined />, label: 'Personal Info' },
    { key: 'Orders', icon: <HistoryOutlined />, label: 'Order History' },
    { key: 'Addresses', icon: <EnvironmentOutlined />, label: 'Addresses' },
    { key: 'Payment', icon: <CreditCardOutlined />, label: 'Payment Methods' },
    { key: 'Notifications', icon: <BellOutlined />, label: 'Notifications' },
    { key: 'Security', icon: <SafetyCertificateOutlined />, label: 'Security' },
    { key: 'Settings', icon: <SettingOutlined />, label: 'Settings' },
  ];

  // 1. RENDER TAB: PROFILE (Giữ nguyên từ trước)
  const renderProfile = () => (
    <div>
      <Title level={5} style={{ marginBottom: '24px' }}>Personal Information</Title>
      <Form layout="vertical" initialValues={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', dob: '01/01/1990' }}>
        <Row gutter={24}>
          <Col xs={24} sm={12}><Form.Item label={<Text strong>First Name</Text>} name="firstName"><Input variant="filled" size="large" /></Form.Item></Col>
          <Col xs={24} sm={12}><Form.Item label={<Text strong>Last Name</Text>} name="lastName"><Input variant="filled" size="large" /></Form.Item></Col>
        </Row>
        <Form.Item label={<Text strong>Email Address</Text>} name="email"><Input variant="filled" size="large" disabled /></Form.Item>
        <Form.Item label={<Text strong>Phone Number</Text>} name="phone"><Input variant="filled" size="large" /></Form.Item>
        <Form.Item label={<Text strong>Date of Birth</Text>} name="dob"><Input variant="filled" size="large" /></Form.Item>
        <Form.Item><Button type="primary" size="large" style={{ backgroundColor: '#141414', borderRadius: '6px' }}>Save Changes</Button></Form.Item>
      </Form>
    </div>
  );

  // 2. RENDER TAB: ORDERS (Hình 1)
  const renderOrders = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={5} style={{ margin: 0 }}>Order History</Title>
        <Button style={{ borderRadius: '6px' }}>Shop More</Button>
      </div>
      
      {mockOrders.map(order => (
        <Card key={order.id} style={{ marginBottom: '16px', borderRadius: '12px', borderColor: '#f0f0f0' }} bodyStyle={{ padding: '24px' }}>
          {/* Header Order */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <Space>
                <Text strong style={{ fontSize: '16px' }}>Order #{order.id}</Text>
                <Tag color={order.statusColor} style={{ borderRadius: '12px' }}>{order.status}</Tag>
              </Space>
              <div style={{ color: '#8c8c8c', fontSize: '13px', marginTop: '4px' }}>Placed on {order.date}</div>
            </div>
            <Title level={4} style={{ margin: 0 }}>${order.total}</Title>
          </div>
          
          {/* Danh sách Item */}
          <div style={{ marginBottom: '24px' }}>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#595959' }}>
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
              </div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button style={{ borderRadius: '6px' }}>Track Order</Button>
            <a href="#" style={{ color: '#212529', fontWeight: 500 }}>View Details</a>
          </div>
        </Card>
      ))}
    </div>
  );

  // 3. RENDER TAB: ADDRESSES (Hình 2)
  const renderAddresses = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={5} style={{ margin: 0 }}>Saved Addresses</Title>
        <Button type="primary" style={{ backgroundColor: '#141414', borderRadius: '6px' }}>Add New Address</Button>
      </div>

      {mockAddresses.map(address => (
        <Card key={address.id} style={{ marginBottom: '16px', borderRadius: '12px', borderColor: '#f0f0f0' }} bodyStyle={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Space style={{ marginBottom: '12px' }}>
                <Text strong style={{ fontSize: '16px' }}>{address.type}</Text>
                {address.isDefault && <Tag style={{ borderRadius: '12px', color: '#595959', backgroundColor: '#f5f5f5', border: 'none' }}>Default</Tag>}
              </Space>
              <div style={{ color: '#595959', lineHeight: '1.8' }}>
                <div>{address.name}</div>
                <div>{address.street}</div>
                <div>{address.location}</div>
                <div>{address.country}</div>
              </div>
            </div>
            <Space>
              <Button type="text" style={{ fontWeight: 500 }}>Edit</Button>
              <Button type="text" danger style={{ fontWeight: 500 }}>Delete</Button>
            </Space>
          </div>
        </Card>
      ))}
    </div>
  );

  // 4. RENDER TAB: SETTINGS (Hình 3)
  const renderSettings = () => (
    <div>
      {/* Notification Preferences */}
      <Title level={5} style={{ marginBottom: '16px' }}>Notification Preferences</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Order updates and tracking information</Text>
          <Checkbox defaultChecked />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>New product announcements</Text>
          <Checkbox defaultChecked />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Special offers and promotions</Text>
          <Checkbox />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Newsletter and blog updates</Text>
          <Checkbox />
        </div>
      </div>
      
      <Divider />

      {/* Privacy Settings */}
      <Title level={5} style={{ marginBottom: '16px' }}>Privacy Settings</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Make my profile public</Text>
          <Checkbox />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Allow data collection for personalization</Text>
          <Checkbox defaultChecked />
        </div>
      </div>

      <Divider />

      {/* Account Actions */}
      <Title level={5} style={{ marginBottom: '16px' }}>Account Actions</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Button block size="large" style={{ borderRadius: '6px', fontWeight: 500 }}>Download My Data</Button>
        <Button block size="large" type="primary" danger style={{ borderRadius: '6px', fontWeight: 500 }}>Delete Account</Button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER: Thông tin tóm tắt */}
        <Card style={{ marginBottom: '24px', borderRadius: '12px', borderColor: '#e8e8e8' }} bodyStyle={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Avatar size={72} style={{ backgroundColor: '#e9ecef', color: '#495057', fontSize: '24px' }}>JD</Avatar>
            <div>
              <Title level={4} style={{ margin: 0 }}>John Doe</Title>
              <Text type="secondary" style={{ fontSize: '14px' }}>john.doe@example.com</Text>
              <div style={{ marginTop: '8px' }}>
                <Tag style={{ borderRadius: '12px', padding: '2px 12px', backgroundColor: '#f1f3f5', border: 'none', color: '#495057' }}>Premium Member</Tag>
              </div>
            </div>
          </div>
        </Card>

        <Row gutter={24}>
          {/* SIDEBAR CỘT TRÁI */}
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: '12px', borderColor: '#e8e8e8' }} bodyStyle={{ padding: '12px 0' }}>
              <Menu 
                mode="inline" 
                selectedKeys={[activeTab]} 
                onClick={(e) => setActiveTab(e.key)}
                style={{ borderRight: 'none' }}
                items={menuItems}
              />
              <Divider style={{ margin: '12px 0' }} />
              <Menu 
                mode="inline" 
                style={{ borderRight: 'none' }}
                items={[{ key: 'logout', icon: <LogoutOutlined style={{ color: '#ff4d4f' }} />, label: <span style={{ color: '#ff4d4f', fontWeight: 500 }}>Sign Out</span> }]}
              />
            </Card>
          </Col>

          {/* NỘI DUNG CHÍNH CỘT PHẢI */}
          <Col xs={24} md={18}>
            <Card style={{ borderRadius: '12px', borderColor: '#e8e8e8', minHeight: '600px' }} bodyStyle={{ padding: '24px' }}>
              
              {/* THANH TAB CONTROL DẠNG "VIÊN THUỐC" (Giống hình 1, 2, 3) */}
              <div style={{ display: 'flex', backgroundColor: '#f0f0f0', borderRadius: '24px', padding: '4px', marginBottom: '32px' }}>
                {['Profile', 'Orders', 'Addresses', 'Settings'].map(tab => (
                  <div 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{ 
                      flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: '20px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.3s',
                      backgroundColor: activeTab === tab ? '#ffffff' : 'transparent',
                      boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              {/* RENDER NỘI DUNG DỰA VÀO TAB ĐANG CHỌN */}
              {activeTab === 'Profile' && renderProfile()}
              {activeTab === 'Orders' && renderOrders()}
              {activeTab === 'Addresses' && renderAddresses()}
              {activeTab === 'Settings' && renderSettings()}
              {/* Tạm thời hiển thị trắng nếu bấm vào các nút khác trên Sidebar chưa có UI */}
              {!['Profile', 'Orders', 'Addresses', 'Settings'].includes(activeTab) && (
                <div style={{ textAlign: 'center', color: '#8c8c8c', marginTop: '40px' }}>Content for {activeTab} is under construction...</div>
              )}

            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserProfilePage;