import React, { useState } from 'react';
import { Card, Typography, Button, Row, Col, Select, Input, Table } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import AddProduct from '../components/adminaddproduct';

const { Title, Text } = Typography;

// --- DỮ LIỆU MẪU CHO BẢNG PRODUCTS ---
const productColumns = [
    { title: 'PRODUCT', dataIndex: 'product', key: 'product' },
    { title: 'CATEGORY', dataIndex: 'category', key: 'category' },
    { title: 'SUB CATEGORY', dataIndex: 'subCategory', key: 'subCategory' },
    { title: 'PRICE', dataIndex: 'price', key: 'price' },
    { title: 'SALES', dataIndex: 'sales', key: 'sales' },
    { title: 'STOCK', dataIndex: 'stock', key: 'stock' },
    { title: 'RATING', dataIndex: 'rating', key: 'rating' },
    { title: 'ACTION', dataIndex: 'action', key: 'action' },
];

const productData: any[] = []; // Tạm thời để mảng rỗng để hiển thị "No Data" như trong ảnh

// --- DỮ LIỆU MẪU CHO BẢNG RECENT ORDERS ---
const orderColumns = [
    { title: 'ORDER ID', dataIndex: 'orderId', key: 'orderId' },
    { title: 'PAYMANT ID', dataIndex: 'paymentId', key: 'paymentId' },
    { title: 'NAME', dataIndex: 'name', key: 'name' },
    { title: 'PHONE NUMBER', dataIndex: 'phone', key: 'phone' },
    { title: 'ADDRESS', dataIndex: 'address', key: 'address' },
    { title: 'PINCODE', dataIndex: 'pincode', key: 'pincode' },
    { title: 'TOTAL AMOUNT', dataIndex: 'total', key: 'total' },
    { title: 'EMAIL', dataIndex: 'email', key: 'email' },
    { title: 'USER ID', dataIndex: 'userId', key: 'userId' },
    { title: 'ORDER STATUS', dataIndex: 'status', key: 'status' },
    { title: 'DATE', dataIndex: 'date', key: 'date' },
];

const orderData: any[] = [];

const AdminDashboard: React.FC = () => {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <AddProduct
                open={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
            />

            {/* 1. WELCOME BANNER */}
            <Card
                style={{
                    backgroundColor: '#f0f7ff',
                    borderRadius: '12px',
                    border: 'none',
                    overflow: 'hidden'
                }}
                bodyStyle={{ padding: '32px' }}
            >
                <Row align="middle" justify="space-between" wrap={false} gutter={[24, 24]}>
                    <Col>
                        <Title level={2} style={{ marginTop: 0, fontWeight: 800 }}>Welcome,</Title>
                        <Text style={{ fontSize: '16px', color: '#595959', display: 'block', marginBottom: '24px' }}>
                            Here's What happening on your store today. See the statistics at once.
                        </Text>
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            style={{ borderRadius: '6px', fontWeight: 500 }}
                            onClick={() => setIsAddProductOpen(true)}
                        >
                            Add Product
                        </Button>
                    </Col>
                    <Col>
                        {/* Vùng chứa hình ảnh minh họa giả lập */}
                        <div style={{ width: '200px', height: '120px', backgroundColor: '#bae0ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Text type="secondary">Illustration</Text>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* 2. PRODUCTS SECTION */}
            <Card style={{ borderRadius: '12px', borderColor: '#e8e8e8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <Title level={5} style={{ margin: 0 }}>Products</Title>
                    <Button type="primary" style={{ borderRadius: '6px', backgroundColor: '#3b82f6', fontWeight: 500 }} onClick={() => setIsAddProductOpen(true)}>
                        ADD PRODUCT
                    </Button>
                </div>

                {/* Các bộ lọc (Filters) */}
                <Row gutter={16} style={{ marginBottom: '24px' }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Text type="secondary" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>Category By</Text>
                        <Select style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Text type="secondary" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>Sub Category By</Text>
                        <Select style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Text type="secondary" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>Third Level Sub Category By</Text>
                        <Select style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search here..." style={{ width: '100%' }} />
                    </Col>
                </Row>

                {/* Bảng Products có Checkbox */}
                <Table
                    rowSelection={{ type: 'checkbox' }}
                    columns={productColumns}
                    dataSource={productData}
                    pagination={{
                        showSizeChanger: true,
                        defaultPageSize: 50,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showTotal: (total, range) => `${range}-${range[1]} of ${total}`
                    }}
                    size="middle"
                />
            </Card>

            {/* 3. RECENT ORDERS SECTION */}
            <Card style={{ borderRadius: '12px', borderColor: '#e8e8e8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <Title level={5} style={{ margin: 0 }}>Recent Orders</Title>
                    <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Search here..." style={{ width: '300px' }} />
                </div>

                {/* Bảng Orders với nền Header màu tối */}
                <Table
                    columns={orderColumns}
                    dataSource={orderData}
                    pagination={false}
                    size="middle"
                    scroll={{ x: 'max-content' }} // Cho phép scroll ngang nếu bảng có quá nhiều cột
                />
            </Card>

            {/* 4. TOTAL USERS & TOTAL SALES CHART (Placeholder) */}
            <Card style={{ borderRadius: '12px', borderColor: '#e8e8e8' }}>
                <Title level={5} style={{ marginBottom: '16px' }}>Total Users & Total Sales</Title>
                <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>
                        <Text type="secondary">Total Users</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
                        <Text type="secondary">Total Sales</Text>
                    </div>
                </div>
                {/* Vùng chứa biểu đồ sẽ được gắn vào đây sau (có thể dùng Recharts hoặc Ant Design Charts) */}
                <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa', border: '1px dashed #d9d9d9' }}>
                    <Text type="secondary">Chart Area</Text>
                </div>
            </Card>

        </div>
    );
};

export default AdminDashboard;