import React from "react";
import { Card, Typography, Input, Table, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

// Định nghĩa kiểu dữ liệu cho Order (Dựa trên cấu trúc Database Prisma của bạn)
interface OrderDataType {
  key: string;
  orderId: string;
  paymentId: string;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  totalAmount: string;
  email: string;
  userId: string;
  orderStatus: string;
  date: string;
  action?: string;
}

const AdminOrdersPage: React.FC = () => {
  // Cấu hình các cột của bảng khớp 100% với ảnh thiết kế
  const columns: ColumnsType<OrderDataType> = [
    {
      title: <span style={{ fontWeight: 500 }}>ORDER ID</span>,
      dataIndex: "orderId",
      key: "orderId",
    },
    { title: "PAYMENT ID", dataIndex: "paymentId", key: "paymentId" },
    { title: "NAME", dataIndex: "name", key: "name" },
    { title: "PHONE NUMBER", dataIndex: "phone", key: "phone" },
    { title: "ADDRESS", dataIndex: "address", key: "address" },
    { title: "PINCODE", dataIndex: "pincode", key: "pincode" },
    { title: "TOTAL AMOUNT", dataIndex: "totalAmount", key: "totalAmount" },
    { title: "EMAIL", dataIndex: "email", key: "email" },
    { title: "USER ID", dataIndex: "userId", key: "userId" },
    { title: "ORDER STATUS", dataIndex: "orderStatus", key: "orderStatus" },
    { title: "DATE", dataIndex: "date", key: "date" },
    { title: "ACTION", dataIndex: "action", key: "action", align: "center" },
  ];

  // Dữ liệu mẫu (Hiện đang để rỗng [] để chờ gọi API)
  const data: OrderDataType[] = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Card
        style={{
          borderRadius: "12px",
          borderColor: "#e8e8e8",
          minHeight: "calc(100vh - 120px)",
        }}
        bodyStyle={{ padding: "0" }}
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
            Recent Orders
          </Title>

          <Input
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Search here..."
            variant="filled"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "6px",
              padding: "8px 12px",
              backgroundColor: "#f5f5f5",
            }}
          />
        </div>

        {/* BẢNG DỮ LIỆU: Bọc trong ConfigProvider để đổi màu Header thành nền tối */}
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#2c333e", // Màu xanh xám tối giống hệt trong ảnh
                headerColor: "#ffffff", // Chữ màu trắng
                headerBorderRadius: 0, // Bỏ bo góc của header để dán sát lề
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: 10,
              pageSizeOptions: ["10", "20", "50"],
              showTotal: (total, range) => `${range}-${range} of ${total}`,
            }}
            size="middle"
            scroll={{ x: "max-content" }} // Cho phép cuộn ngang vì bảng có rất nhiều cột
          />
        </ConfigProvider>
      </Card>
    </div>
  );
};

export default AdminOrdersPage;
