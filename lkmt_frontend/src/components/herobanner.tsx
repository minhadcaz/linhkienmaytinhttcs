import React from "react";
import { Link } from "react-router";
import { Row, Col, Typography, Button, Space, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const HeroBanner: React.FC = () => {
  return (
    <div style={{ padding: "40px 24px", backgroundColor: "#ffffff" }}>
      <Row
        gutter={[3]}
        align="middle"
        justify="space-between"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* CỘT BÊN TRÁI: Nội dung chữ và Nút bấm */}
        <Col xs={24} md={12}>
          <Tag
            style={{
              backgroundColor: "#e9ecef",
              color: "#495057",
              border: "none",
              padding: "4px 12px",
              fontSize: "14px",
              marginBottom: "16px",
            }}
          >
            New Collection
          </Tag>

          <Title
            level={1}
            style={{
              fontSize: "48px",
              fontWeight: 900,
              marginTop: 0,
              marginBottom: "16px",
              color: "#212529",
            }}
          >
            Build Your Dream PC
          </Title>

          <Paragraph
            style={{
              fontSize: "16px",
              color: "#6c757d",
              marginBottom: "32px",
              maxWidth: "90%",
            }}
          >
            Premium gaming components at unbeatable prices. From motherboards to
            cases, we have everything you need for your next build.
          </Paragraph>

          <Space size="middle">
            <Link to="/products">
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#212529",
                  borderColor: "#212529",
                  borderRadius: "4px",
                  padding: "0 24px",
                }}
              >
                Shop Now <ArrowRightOutlined />
              </Button>
            </Link>
            <Button
              size="large"
              style={{ borderRadius: "4px", padding: "0 24px" }}
            >
              View Deals
            </Button>
          </Space>
        </Col>

        {/* CỘT BÊN PHẢI: Khung Hình ảnh Sản phẩm */}
        <Col xs={24} md={12}>
          <div
            style={{
              position: "relative",
              width: "100%",
              minHeight: "350px",
              border: "1px dashed #ced4da",
              backgroundColor: "#f8f9fa",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                color: "#adb5bd",
                fontSize: "12px",
              }}
            >
              Hero Product Image
            </span>

            {/* Khối vuông đại diện cho GPU */}
            <div
              style={{
                width: "120px",
                height: "120px",
                backgroundColor: "#adb5bd",
                marginBottom: "16px",
                borderRadius: "4px",
              }}
            ></div>
            <span style={{ color: "#495057", fontWeight: 500 }}>
              Featured GPU
            </span>

            {/* Nhãn Top Seller ở góc dưới phải */}
            <div
              style={{
                position: "absolute",
                bottom: -1,
                right: -1,
                backgroundColor: "#212529",
                color: "white",
                padding: "8px 16px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Top Seller
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeroBanner;
