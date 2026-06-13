import React, { useState, useEffect } from "react";
import { Card, Typography, Input, Table, Space, Button, Popconfirm, message, Tag } from "antd";
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

const { Title } = Typography;

// Định nghĩa kiểu dữ liệu khớp với Backend trả về
interface UserDataType {
  idusers: string;
  username: string;
  email: string;
  role: string;
  fullName: string;
  phone: string;
  status: string;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserDataType[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Hàm gọi API lấy danh sách user
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách người dùng!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Các hàm xử lý Action
  const handleView = (id: string) => console.log("Xem chi tiết user:", id);
  const handleEdit = (id: string) => console.log("Sửa user:", id);
  const handleDelete = async (id: string) => {
    try {
      // Gọi API xóa ở đây (ví dụ: axios.delete)
      message.success(`Đã xóa người dùng ${id} thành công!`);
      // fetchUsers(); // Tải lại danh sách sau khi xóa
    } catch (error) {
      message.error("Lỗi khi xóa người dùng!");
    }
  };

  // 3. Cấu hình các cột của bảng
  const columns: ColumnsType<UserDataType> = [
    { title: "USERNAME", dataIndex: "username", key: "username", render: (text) => <strong>{text}</strong> },
    { title: "HỌ TÊN", dataIndex: "fullName", key: "fullName" },
    { title: "EMAIL", dataIndex: "email", key: "email" },
    { title: "SĐT", dataIndex: "phone", key: "phone" },
    { 
      title: "ROLE", 
      dataIndex: "role", 
      key: "role",
      render: (role) => (
        <Tag color={role.toLowerCase() === 'admin' ? 'red' : role.toLowerCase() === 'sale' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      )
    },
    { 
      title: "TÌNH TRẠNG", 
      dataIndex: "status", 
      key: "status",
      render: (status) => (
        <Tag color={status === 'Hoat dong' ? 'success' : 'default'}>{status}</Tag>
      )
    },
    {
      title: "ACTION",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} onClick={() => handleView(record.idusers)} />
          <Button type="text" icon={<EditOutlined />} style={{ color: '#52c41a' }} onClick={() => handleEdit(record.idusers)} />
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc chắn muốn xóa tài khoản này không?"
            onConfirm={() => handleDelete(record.idusers)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Card 
        style={{ borderRadius: "12px", borderColor: "#e8e8e8", minHeight: "calc(100vh - 120px)" }} 
        bodyStyle={{ padding: "0" }}
      >
        {/* HEADER BẢNG */}
        <div style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", flexWrap: "wrap", gap: "16px" }}>
          <Title level={5} style={{ margin: 0, fontWeight: 600 }}>Quản lý Người dùng</Title>
          <Input 
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />} 
            placeholder="Tìm kiếm theo tên, email..." 
            variant="filled" 
            style={{ width: "100%", maxWidth: "400px", borderRadius: "6px", padding: "8px 12px" }} 
          />
        </div>

        {/* BẢNG DỮ LIỆU */}
        <Table 
          rowSelection={{ type: "checkbox" }} 
          columns={columns} 
          dataSource={users} 
          rowKey="idusers" // Sử dụng idusers làm khóa chính cho table
          loading={loading}
          pagination={{ 
            showSizeChanger: true, 
            defaultPageSize: 10, 
            pageSizeOptions: ["10", "20", "50"], 
            showTotal: (total, range) => `${range}-${range[5]} của ${total} người dùng` 
          }} 
          size="middle" 
          scroll={{ x: "max-content" }} 
        />
      </Card>
    </div>
  );
};

export default AdminUsersPage;