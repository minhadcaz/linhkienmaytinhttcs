import React, { useState } from "react";
import { useParams, Link } from "react-router";
import {
  Row,
  Col,
  Typography,
  Button,
  Space,
  Tag,
  Divider,
  Progress,
} from "antd";
import {
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  MinusOutlined,
  PlusOutlined,
  StarFilled,
  SafetyCertificateOutlined,
  CarOutlined,
  SyncOutlined,
} from "@ant-design/icons";

// Import mảng products từ file mock data của bạn
// Hãy chỉnh lại đường dẫn '../data/product' cho khớp với thư mục thực tế của bạn
import { products } from "../data/product";

const { Title, Text, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  // Lấy ID sản phẩm từ URL (VD: /product/mb-1)
  const { id } = useParams();

  // Quản lý số lượng và tab
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Specifications");

  // TÌM SẢN PHẨM TRONG MOCK DATA
  const product = products.find((p) => p.id === id);

  // Nếu nhập sai ID trên URL hoặc không tìm thấy sản phẩm
  if (!product) {
    return (
      <div
        style={{
          padding: "100px 24px",
          textAlign: "center",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Title level={2}>Product not found</Title>
        <Link to="/products">
          <Button type="primary" size="large">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  // TÍNH TOÁN CÁC CHỈ SỐ KHUYẾN MÃI (Discount)
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const savings = hasDiscount ? product.originalPrice! - product.price : 0;
  const discountPercentage = hasDiscount
    ? Math.round((savings / product.originalPrice!) * 100)
    : 0;

  const handleQuantityChange = (delta: number) => {
    setOrderQuantity((prev) => (prev + delta < 1 ? 1 : prev + delta));
  };

  // --- RENDER CÁC TAB NỘI DUNG ---

  // 1. Tab Specifications (Tự động map theo Object specifications của sản phẩm)
  const renderSpecifications = () => (
    <div style={{ padding: "24px 0" }}>
      <Row gutter={48}>
        {Object.entries(product.specifications).map(([key, value]) => (
          <Col xs={24} md={12} key={key}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "12px",
                marginBottom: "24px",
              }}
            >
              <Text strong>{key}:</Text>
              <Text
                type="secondary"
                style={{ textAlign: "right", maxWidth: "60%" }}
              >
                {value}
              </Text>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );

  // 2. Tab Description
  const renderDescription = () => (
    <div style={{ padding: "24px 0" }}>
      <Paragraph
        style={{
          fontSize: "16px",
          color: "#495057",
          marginBottom: "24px",
          lineHeight: "1.8",
        }}
      >
        {product.description}
      </Paragraph>
      <Divider />
      <Title level={5} style={{ marginBottom: "16px" }}>
        Key Features
      </Title>
      <ul
        style={{
          paddingLeft: "20px",
          color: "#495057",
          fontSize: "15px",
          lineHeight: "2",
        }}
      >
        <li>High-quality construction and materials</li>
        <li>Optimized for peak performance</li>
        <li>Backed by manufacturer warranty</li>
      </ul>
    </div>
  );

  // 3. Tab Reviews (Giữ nguyên cấu trúc biểu đồ đẹp mắt)
  const renderReviews = () => (
    <div style={{ padding: "24px 0" }}>
      <Row gutter={48} align="middle">
        <Col xs={24} md={6} style={{ textAlign: "center" }}>
          <Title
            level={1}
            style={{ margin: 0, fontSize: "48px", fontWeight: 800 }}
          >
            {product.rating}
          </Title>
          <div
            style={{ color: "#faad14", fontSize: "18px", marginBottom: "8px" }}
          >
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled style={{ color: "#e8e8e8" }} />
          </div>
          <Text type="secondary">{product.reviewCount} reviews</Text>
        </Col>
        <Col xs={24} md={18}>
          {[
            { s: 5, p: 85 },
            { s: 4, p: 10 },
            { s: 3, p: 3 },
            { s: 2, p: 1 },
            { s: 1, p: 1 },
          ].map((item) => (
            <div
              key={item.s}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Text style={{ width: "30px" }}>
                {item.s}{" "}
                <StarFilled style={{ fontSize: "12px", color: "#000" }} />
              </Text>
              <Progress
                percent={item.p}
                showInfo={false}
                strokeColor="#faad14"
                trailColor="#f0f0f0"
                style={{ flex: 1, margin: "0 12px" }}
              />
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* NÚT BACK TO PRODUCTS */}
        <div style={{ marginBottom: "24px" }}>
          <Link
            to="/products"
            style={{
              color: "#212529",
              fontSize: "16px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ArrowLeftOutlined /> Back to Products
          </Link>
        </div>

        <Row gutter={48}>
          {/* CỘT TRÁI: HÌNH ẢNH SẢN PHẨM THẬT TỪ MOCK DATA */}
          <Col xs={24} md={12}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "600px",
                backgroundColor: "#f8f9fa",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #f0f0f0",
                overflow: "hidden",
              }}
            >
              {/* Huy hiệu giảm giá (Nếu có) */}
              {hasDiscount && (
                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    zIndex: 10,
                  }}
                >
                  {discountPercentage}% OFF
                </div>
              )}

              {/* Huy hiệu Nổi bật (Featured) */}
              {product.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    backgroundColor: "#faad14",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    zIndex: 10,
                  }}
                >
                  FEATURED
                </div>
              )}

              {/* Ảnh sản phẩm */}
              <img
                src={product.image}
                alt={product.name}
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>

          {/* CỘT PHẢI: THÔNG TIN VÀ NÚT MUA HÀNG */}
          <Col xs={24} md={12}>
            <Tag
              style={{
                borderRadius: "16px",
                padding: "2px 12px",
                backgroundColor: "#f1f3f5",
                border: "none",
                color: "#495057",
                fontSize: "14px",
                marginBottom: "16px",
                textTransform: "capitalize",
              }}
            >
              {product.category}
            </Tag>
            <Title
              level={2}
              style={{ marginTop: 0, fontWeight: 700, fontSize: "32px" }}
            >
              {product.name}
            </Title>

            <Space align="center" style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  color: "#faad14",
                  fontSize: "16px",
                }}
              >
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled style={{ color: "#e8e8e8" }} />
              </div>
              <Text strong style={{ fontSize: "16px" }}>
                {product.rating}
              </Text>
              <Text type="secondary">({product.reviewCount} reviews)</Text>
            </Space>

            {/* Hiển thị Giá có hoặc không có khuyến mãi */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <Title level={1} style={{ margin: 0, fontWeight: 800 }}>
                ${product.price}
              </Title>
              {hasDiscount && (
                <Title
                  level={4}
                  type="secondary"
                  delete
                  style={{ margin: 0, fontWeight: 400 }}
                >
                  ${product.originalPrice}
                </Title>
              )}
            </div>

            {hasDiscount && (
              <Text
                style={{
                  color: "#52c41a",
                  fontWeight: 500,
                  fontSize: "16px",
                  display: "block",
                  marginBottom: "24px",
                }}
              >
                You save ${savings.toFixed(2)} ({discountPercentage}%)
              </Text>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
                marginTop: hasDiscount ? 0 : "24px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: product.inStock ? "#52c41a" : "#ff4d4f",
                  borderRadius: "50%",
                }}
              ></div>
              <Text
                style={{
                  color: product.inStock ? "#52c41a" : "#ff4d4f",
                  fontWeight: 500,
                }}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Text>
            </div>

            <Paragraph
              style={{
                fontSize: "16px",
                color: "#495057",
                marginBottom: "32px",
                lineHeight: "1.6",
              }}
            >
              {product.description}
            </Paragraph>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                Quantity:
              </Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  onClick={() => handleQuantityChange(-1)}
                  style={{ borderRadius: 0 }}
                />
                <div
                  style={{
                    width: "40px",
                    textAlign: "center",
                    fontWeight: 500,
                  }}
                >
                  {orderQuantity}
                </div>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => handleQuantityChange(1)}
                  style={{ borderRadius: 0 }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <Button
                type="primary"
                disabled={!product.inStock}
                icon={<ShoppingCartOutlined />}
                style={{
                  flex: 1,
                  height: "50px",
                  backgroundColor: product.inStock ? "#0a0a0a" : "#d9d9d9",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Add to Cart
              </Button>
              <Button
                icon={<HeartOutlined />}
                style={{ width: "50px", height: "50px", borderRadius: "8px" }}
              />
              <Button
                icon={<ShareAltOutlined />}
                style={{ width: "50px", height: "50px", borderRadius: "8px" }}
              />
            </div>

            <Button
              block
              disabled={!product.inStock}
              style={{
                height: "50px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                marginBottom: "40px",
              }}
            >
              Buy Now
            </Button>

            <Row
              justify="space-between"
              style={{
                textAlign: "center",
                padding: "24px 0",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <Col span={8}>
                <SafetyCertificateOutlined
                  style={{
                    fontSize: "24px",
                    marginBottom: "8px",
                    color: "#495057",
                  }}
                />
                <div style={{ fontSize: "14px", color: "#495057" }}>
                  2-Year Warranty
                </div>
              </Col>
              <Col span={8}>
                <CarOutlined
                  style={{
                    fontSize: "24px",
                    marginBottom: "8px",
                    color: "#495057",
                  }}
                />
                <div style={{ fontSize: "14px", color: "#495057" }}>
                  Free Shipping
                </div>
              </Col>
              <Col span={8}>
                <SyncOutlined
                  style={{
                    fontSize: "24px",
                    marginBottom: "8px",
                    color: "#495057",
                  }}
                />
                <div style={{ fontSize: "14px", color: "#495057" }}>
                  30-Day Returns
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* --- KHU VỰC 3 TABS THÔNG TIN CHI TIẾT --- */}
        <div
          style={{
            marginTop: "48px",
            border: "1px solid #f0f0f0",
            borderRadius: "16px",
            padding: "8px 24px 24px 24px",
            backgroundColor: "#fafafa",
          }}
        >
          <div
            style={{
              display: "flex",
              backgroundColor: "#f0f0f0",
              borderRadius: "24px",
              padding: "4px",
              marginBottom: "24px",
            }}
          >
            {["Specifications", "Description", "Reviews"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px 0",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.3s",
                  backgroundColor:
                    activeTab === tab ? "#ffffff" : "transparent",
                  boxShadow:
                    activeTab === tab ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                  border: activeTab === tab ? "1px solid #d9d9d9" : "none",
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            {activeTab === "Specifications" && renderSpecifications()}
            {activeTab === "Description" && renderDescription()}
            {activeTab === "Reviews" && renderReviews()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
