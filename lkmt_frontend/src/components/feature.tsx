import React from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import {
  CarOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const FeaturesSection: React.FC = () => {
  // Dữ liệu cho 3 thẻ tiện ích
  const features = [
    {
      icon: <CarOutlined style={{ fontSize: "28px", color: "#ff4d4f" }} />, // Biểu tượng xe tải/giao hàng
      title: "Free Shipping",
      desc: "Free shipping on orders over $100",
    },
    {
      icon: (
        <SafetyCertificateOutlined
          style={{ fontSize: "28px", color: "#52c41a" }}
        />
      ), // Biểu tượng khiên bảo hành
      title: "2-Year Warranty",
      desc: "Extended warranty on all components",
    },
    {
      icon: <StarOutlined style={{ fontSize: "28px", color: "#faad14" }} />, // Biểu tượng sao hỗ trợ
      title: "Expert Support",
      desc: "24/7 technical support from our experts",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* KHU VỰC 1: 3 Thẻ Tiện Ích */}
        <Row gutter={[2, 2]} style={{ marginBottom: "60px" }}>
          {features.map((item, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                bordered={true}
                style={{
                  textAlign: "center",
                  borderRadius: "0px", // Đặt viền vuông vức theo thiết kế
                  borderColor: "#ced4da",
                }}
              >
                <div style={{ marginBottom: "12px" }}>{item.icon}</div>
                <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
                  {item.title}
                </Title>
                <Text type="secondary">{item.desc}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* KHU VỰC 2: Tiêu đề danh sách Sản phẩm Nổi bật */}
        {/* Viền xám mờ ngăn cách phía trên tiêu đề như trong ảnh */}
        <div
          style={{
            borderTop: "1px solid #ced4da",
            paddingTop: "40px",
            paddingBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap", // Hỗ trợ rớt dòng trên màn hình điện thoại
              gap: "16px",
            }}
          >
            <div>
              <Title level={3} style={{ margin: 0, fontWeight: "bold" }}>
                Featured Products
              </Title>
              <Text type="secondary">
                Hand-picked components for your build
              </Text>
            </div>

            <Button
              style={{
                borderRadius: "0px",
                borderColor: "#ced4da",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              View All <ArrowRightOutlined />
            </Button>
          </div>
        </div>

        {/* LƯU Ý: Phần lưới hiển thị danh sách sản phẩm thực tế sẽ được code và ghép vào ngay dưới thẻ div này */}
      </div>
    </div>
  );
};

export default FeaturesSection;
