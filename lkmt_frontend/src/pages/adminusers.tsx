import React from "react";
import { Card, Typography, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

// Định nghĩa kiểu dữ liệu cho User (Dành cho việc ghép API sau này)
interface UserDataType {
  key: string;
  user: string;
  phone: string;
  created: string;
  action?: string;
}

const AdminUsersPage: React.FC = () => {
  // Cấu hình các cột của bảng giống chính xác với ảnh
  const columns: ColumnsType<UserDataType> = [
    {
      title: <span style={{ fontWeight: 500 }}>USER</span>,
      dataIndex: "user",
      key: "user",
    },
    {
      title: "USER PHONE NO",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "CREATED",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      align: "center",
    },
  ];

  // Dữ liệu mẫu (Hiện đang để rỗng [] để hiển thị giống trạng thái "1-NaN of NaN" trong ảnh)
  // Khi kết nối với Backend Node.js, bạn sẽ fetch dữ liệu và gán vào biến này
  const data: UserDataType[] = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Card
        style={{
          borderRadius: "12px",
          borderColor: "#e8e8e8",
          minHeight: "calc(100vh - 120px)",
        }}
        bodyStyle={{ padding: "0" }} // Xóa padding mặc định để Table tràn đẹp hơn
      >
        {/* HEADER BẢNG: Tiêu đề và Thanh tìm kiếm */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
            Users List
          </Title>

          <Input
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Search here..."
            variant="filled" // Kiểu nền xám mờ giống thiết kế
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "6px",
              padding: "8px 12px",
            }}
          />
        </div>

        {/* BẢNG DỮ LIỆU */}
        <Table
          rowSelection={{ type: "checkbox" }} // Tạo cột Checkbox ở lề trái
          columns={columns}
          dataSource={data}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total, range) => `${range}-${range[1]} of ${total}`, // Format chữ hiển thị số trang giống ảnh
          }}
          size="middle"
          scroll={{ x: "max-content" }} // Cho phép cuộn ngang trên màn hình nhỏ
        />
      </Card>
    </div>
  );
};

export default AdminUsersPage;
