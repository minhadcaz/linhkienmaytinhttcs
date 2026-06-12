import React from "react";
import { Row, Col, Card, Typography, Button, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// Dữ liệu mẫu mô phỏng từ database (sau này sẽ lấy từ PostgreSQL qua API)
const mockProducts = [
  {
    id: 1,
    name: "ASUS ROG Strix Z790-E Gaming",
    category: "MOTHERBOARD",
    price: 449.99,
    originalPrice: 499.99,
    rating: 4.8,
    reviews: 1247,
  },
  {
    id: 2,
    name: "Corsair Vengeance RGB Pro 32GB",
    category: "RAM",
    price: 139.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 3421,
  },
  {
    id: 3,
    name: "Fractal Design Define 7 XL",
    category: "CASE",
    price: 199.99,
    originalPrice: 229.99,
    rating: 4.6,
    reviews: 1432,
  },
  {
    id: 4,
    name: "GIGABYTE GeForce NVIDIA RTX 4080 SUPER",
    category: "GPU",
    price: 999.99,
    originalPrice: 1199.99,
    rating: 4.9,
    reviews: 2156,
  },
];

const ProductGrid: React.FC = () => {
  return (
    <div style={{ padding: "0 24px 40px", backgroundColor: "#f8f9fa" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Lưới sản phẩm: 4 cột trên Desktop, 2 cột trên Tablet, 1 cột trên Mobile */}
        <Row gutter={[2, 3]}>
          {mockProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                styles={{
                  body: {
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  },
                }}
                style={{
                  borderRadius: "0px", // Khung viền vuông vức theo thiết kế
                  borderColor: "#ced4da",
                  height: "100%",
                }}
              >
                {/* 1. KHU VỰC HÌNH ẢNH CÓ NHÃN (BADGES) */}
                <div
                  style={{
                    position: "relative",
                    height: "220px",
                    border: "1px dashed #ced4da",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Nhãn SALE (Góc trên trái) */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      display: "flex",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#ff4d4f",
                        color: "white",
                        padding: "4px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      SALE
                    </span>
                    <span
                      style={{
                        color: "#adb5bd",
                        fontSize: "10px",
                        padding: "4px",
                      }}
                    >
                      t Image
                    </span>
                  </div>

                  {/* Nhãn FEATURED (Góc trên phải) */}
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "#212529",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    FEATURED
                  </span>

                  {/* Hình mô phỏng linh kiện */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#ced4da",
                      marginBottom: "8px",
                    }}
                  ></div>
                  <Text
                    type="secondary"
                    style={{ fontSize: "12px", letterSpacing: "1px" }}
                  >
                    {product.category}
                  </Text>
                </div>

                {/* 2. THÔNG TIN SẢN PHẨM */}
                <div style={{ flex: 1 }}>
                  {/* Tên sản phẩm */}
                  <Title
                    level={5}
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "14px",
                      minHeight: "40px",
                    }}
                  >
                    {product.name}
                  </Title>

                  {/* Đánh giá (Rating) dạng khối vuông */}
                  <Space
                    size={4}
                    align="center"
                    style={{ marginBottom: "8px" }}
                  >
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[4 - 8].map((star) => (
                        <div
                          key={star}
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#212529",
                          }}
                        ></div>
                      ))}
                    </div>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {product.rating} ({product.reviews})
                    </Text>
                  </Space>

                  {/* Giá tiền */}
                  <div style={{ marginBottom: "16px" }}>
                    <Text
                      strong
                      style={{ fontSize: "18px", marginRight: "8px" }}
                    >
                      ${product.price}
                    </Text>
                    <Text delete type="secondary" style={{ fontSize: "14px" }}>
                      ${product.originalPrice}
                    </Text>
                  </div>
                </div>

                {/* 3. NÚT ADD TO CART */}
                <Button
                  type="primary"
                  block
                  icon={<ShoppingCartOutlined />}
                  style={{
                    backgroundColor: "#212529",
                    borderColor: "#212529",
                    borderRadius: "0px", // Nút bấm vuông
                    height: "40px",
                    fontWeight: 500,
                  }}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductGrid;
