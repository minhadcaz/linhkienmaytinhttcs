import React, { useState, useContext, useEffect } from "react";
import { Card, Typography, Button, Row, Col, Select, Input, Table, Dropdown, Space, Popconfirm, message } from "antd";
import { LogoutOutlined, PlusOutlined, SearchOutlined, UserOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddProduct from "../components/adminaddproduct";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/authcontext";



import axios from "axios";
const { Title, Text } = Typography;

// --- DỮ LIỆU MẪU CHO BẢNG PRODUCTS ---
const productColumns = (handleView: any, handleEdit: any, handleDelete: any) => [
  {
    title: "TÊN SẢN PHẨM",
    dataIndex: "tensp",
    key: "tensp",
    render: (text: string) => <strong>{text}</strong> // In đậm tên sản phẩm
  },
  {
    title: "DANH MỤC",
    dataIndex: "idcate",
    key: "idcate"
  },
  {
    title: "HÃNG SX",
    dataIndex: "idnsx",
    key: "idnsx"
  },
  {
    title: "GIÁ BÁN",
    dataIndex: "giakm",
    key: "giakm",
    // Format tiền tệ VNĐ
    render: (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0)
  },
  {
    title: "TỒN KHO",
    dataIndex: "soluong",
    key: "soluong"
  },
  {
    title: "HÀNH ĐỘNG",
    key: "action",
    align: 'center' as const,
    render: (_: any, record: any) => (
      <Space size="middle">
        {/* Nút XEM */}
        <Button
          type="text"
          icon={<EyeOutlined />}
          style={{ color: '#1890ff' }}
          title="Xem chi tiết"
          onClick={() => handleView(record.idsp)}
        />

        {/* Nút SỬA */}
        <Button
          type="text"
          icon={<EditOutlined />}
          style={{ color: '#52c41a' }}
          title="Chỉnh sửa"
          onClick={() => handleEdit(record.idsp)}
        />

        {/* Nút XÓA (Có popup xác nhận an toàn) */}
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
          onConfirm={() => handleDelete(record.idsp)}
          okText="Có, Xóa"
          cancelText="Hủy"
        >
          <Button type="text" icon={<DeleteOutlined />} danger title="Xóa" />
        </Popconfirm>
      </Space>
    ),
  },
];
const productData: any[] = []; // Tạm thời để mảng rỗng để hiển thị "No Data" như trong ảnh

// --- DỮ LIỆU MẪU CHO BẢNG RECENT ORDERS ---
const orderColumns = [
  { title: "ORDER ID", dataIndex: "orderId", key: "orderId" },
  { title: "PAYMANT ID", dataIndex: "paymentId", key: "paymentId" },
  { title: "NAME", dataIndex: "name", key: "name" },
  { title: "PHONE NUMBER", dataIndex: "phone", key: "phone" },
  { title: "ADDRESS", dataIndex: "address", key: "address" },
  { title: "PINCODE", dataIndex: "pincode", key: "pincode" },
  { title: "TOTAL AMOUNT", dataIndex: "total", key: "total" },
  { title: "EMAIL", dataIndex: "email", key: "email" },
  { title: "USER ID", dataIndex: "userId", key: "userId" },
  { title: "ORDER STATUS", dataIndex: "status", key: "status" },
  { title: "DATE", dataIndex: "date", key: "date" },
];

const orderData: any[] = [];

const AdminDashboard: React.FC = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productData, setProductData] = useState<any[]>([]); // State chứa dữ liệu sản phẩm
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Gọi API GET từ Backend
      const response = await axios.get('http://localhost:8080/api/products');
      // Lưu mảng sản phẩm vào State
      setProductData(response.data); 
    } catch (error) {
      message.error("Lỗi khi tải danh sách sản phẩm!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
    fetchProducts();
  }, []);
  const handleView = (idsp: string) => {
    console.log("Xem chi tiết sản phẩm:", idsp);
    // TODO: Mở modal xem chi tiết hoặc chuyển hướng sang trang chi tiết
  };

  const handleEdit = (idsp: string) => {
    console.log("Sửa sản phẩm:", idsp);
    // TODO: Mở modal sửa với dữ liệu load từ Backend
  };

  const handleDelete = async (idsp: string) => {
    try {
      const token = localStorage.getItem('access_token');
      // Gọi API xóa sản phẩm xuống backend
      // await axios.delete(`http://localhost:8080/api/products/${idsp}`, { headers: { Authorization: `Bearer ${token}` } });
      message.success(`Đã xóa sản phẩm ${idsp} thành công!`);
      // fetchProducts(); // Gọi lại hàm load danh sách để table tự biến mất dòng đã xóa
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm!");
    }
  };
  const columns = productColumns(handleView, handleEdit, handleDelete);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout(); // Xóa token
    navigate('/login'); // Đẩy về trang đăng nhập
  };

  // Cấu hình các nút bấm trong Dropdown
  const userDropdownItems = [
    {
      key: 'profile',
      label: <span style={{ fontWeight: 600 }}>Xin chào, {user?.username || 'Admin'}</span>,
      disabled: true, // Dòng này chỉ để hiển thị chữ, không bấm được
    },
    {
      type: 'divider' as const, // Đường kẻ ngang
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true, // Tô màu đỏ cho nút đăng xuất
      onClick: handleLogout,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Dropdown menu={{ items: userDropdownItems }} placement="bottomRight" arrow>
          <Button
            shape="circle"
            icon={<UserOutlined style={{ fontSize: '18px' }} />}
            style={{ width: '40px', height: '40px', backgroundColor: '#e6f4ff', color: '#1677ff', border: 'none' }}
          />
        </Dropdown>
      </div>
      <AddProduct
        open={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />

      {/* 1. WELCOME BANNER */}
      <Card
        style={{
          backgroundColor: "#f0f7ff",
          borderRadius: "12px",
          border: "none",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: "32px" }}
        styles={{ body: { padding: "32px" } }}
      >
        <Row
          align="middle"
          justify="space-between"
          wrap={false}
          gutter={[24, 24]}
        >
          <Col>
            <Title level={2} style={{ marginTop: 0, fontWeight: 800 }}>
              Welcome,
            </Title>
            <Text
              style={{
                fontSize: "16px",
                color: "#595959",
                display: "block",
                marginBottom: "24px",
              }}
            >
              Here's What happening on your store today. See the statistics at
              once.
            </Text>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              style={{ borderRadius: "6px", fontWeight: 500 }}
              onClick={() => setIsAddProductOpen(true)}
            >
              Add Product
            </Button>
          </Col>
          <Col>
            {/* Vùng chứa hình ảnh minh họa giả lập */}
            <div
              style={{
                width: "200px",
                height: "120px",
                backgroundColor: "#bae0ff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text type="secondary">Illustration</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 2. PRODUCTS SECTION */}
      <Card style={{ borderRadius: "12px", borderColor: "#e8e8e8" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Products
          </Title>
          <Button
            type="primary"
            style={{
              borderRadius: "6px",
              backgroundColor: "#3b82f6",
              fontWeight: 500,
            }}
            onClick={() => setIsAddProductOpen(true)}
          >
            ADD PRODUCT
          </Button>
        </div>

        {/* Các bộ lọc (Filters) */}
        <Row gutter={16} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} lg={6}>
            <Text
              type="secondary"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Lọc theo Danh Mục
            </Text>
            <Select style={{ width: "100%" }} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Text
              type="secondary"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Lọc theo Hãng
            </Text>
            <Select style={{ width: "100%" }} />
          </Col>
         
          <Col
            xs={24}
            sm={12}
            lg={6}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Search here..."
              style={{ width: "100%" }}
            />
          </Col>
        </Row>

        {/* Bảng Products có Checkbox */}
        <Table
          rowSelection={{ type: "checkbox" }}
          columns={columns} // Sử dụng columns mới
          dataSource={productData} // Truyền dữ liệu state vào
          rowKey="idsp" // Khóa chính của bảng sanpham là idsp
          loading={loading}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`
          }}
          size="middle"
        />
      </Card>

      {/* 3. RECENT ORDERS SECTION */}
      <Card style={{ borderRadius: "12px", borderColor: "#e8e8e8" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Recent Orders
          </Title>
          <Input
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Search here..."
            style={{ width: "300px" }}
          />
        </div>

        {/* Bảng Orders với nền Header màu tối */}
        <Table
          columns={orderColumns}
          dataSource={orderData}
          pagination={false}
          size="middle"
          scroll={{ x: "max-content" }} // Cho phép scroll ngang nếu bảng có quá nhiều cột
        />
      </Card>

      {/* 4. TOTAL USERS & TOTAL SALES CHART (Placeholder) */}
      <Card style={{ borderRadius: "12px", borderColor: "#e8e8e8" }}>
        <Title level={5} style={{ marginBottom: "16px" }}>
          Total Users & Total Sales
        </Title>
        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#3b82f6",
                borderRadius: "50%",
              }}
            ></div>
            <Text type="secondary">Total Users</Text>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#22c55e",
                borderRadius: "50%",
              }}
            ></div>
            <Text type="secondary">Total Sales</Text>
          </div>
        </div>
        {/* Vùng chứa biểu đồ sẽ được gắn vào đây sau (có thể dùng Recharts hoặc Ant Design Charts) */}
        <div
          style={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fafafa",
            border: "1px dashed #d9d9d9",
          }}
        >
          <Text type="secondary">Chart Area</Text>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
