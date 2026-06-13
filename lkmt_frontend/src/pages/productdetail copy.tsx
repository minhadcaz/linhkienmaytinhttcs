import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router"; // Lưu ý: React Router v6+ dùng react-router-dom, nhưng mình giữ theo code của bạn
import { Row, Col, Typography, Button, Space, Tag, Progress, Spin, message, Carousel } from "antd";
import { 
  SafetyCertificateOutlined, 
  CarOutlined, 
  SyncOutlined, 
  StarFilled, 
  MinusOutlined, 
  PlusOutlined, 
  ShoppingCartOutlined 
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams(); 
  
  // 1. CÁC STATE QUẢN LÝ DỮ LIỆU VÀ GIAO DIỆN
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Specifications");

  // 2. FETCH DỮ LIỆU TỪ BACKEND
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Gọi API lấy thông tin chi tiết sản phẩm
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm", error);
        message.error("Không thể tải thông tin sản phẩm!");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Hiển thị vòng xoay Loading trong lúc đợi API trả dữ liệu
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#f8f9fa" }}>
        <Spin size="large" tip="Đang tải thông tin sản phẩm..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "100px 24px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <Title level={3}>Không tìm thấy sản phẩm</Title>
        <Link to="/products"><Button type="primary">Quay lại danh sách</Button></Link>
      </div>
    );
  }

  // 3. XỬ LÝ CÁC BIẾN LOGIC KHUYẾN MÃI VÀ TỒN KHO
  const currentPrice = product.giakm || product.gianiemyet;
  const originalPrice = product.gianiemyet;
  const hasDiscount = originalPrice && originalPrice > currentPrice;
  const savings = hasDiscount ? originalPrice - currentPrice : 0;
  const discountPercentage = hasDiscount ? Math.round((savings / originalPrice) * 100) : 0;
  
  const inStock = product.soluong > 0;

  // Xử lý thông số kỹ thuật (Parse JSON an toàn)
  let specs = product.thongsokythuat;
  if (typeof specs === 'string') {
    try { specs = JSON.parse(specs); } catch (e) { specs = null; }
  }

  // Hàm xử lý tăng giảm số lượng
  const handleQuantityChange = (delta: number) => {
    setOrderQuantity((prev) => {
      const newQty = prev + delta;
      if (newQty < 1) return 1;
      if (newQty > product.soluong) {
        message.warning(`Chỉ còn ${product.soluong} sản phẩm trong kho!`);
        return product.soluong;
      }
      return newQty;
    });
  };

  // --- RENDER CÁC TAB NỘI DUNG ---
  const renderSpecifications = () => (
    <div style={{ padding: "24px 0" }}>
      {specs && typeof specs === 'object' && Object.keys(specs).length > 0 ? (
        Object.entries(specs).map(([key, value]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0", paddingBottom: "12px", marginBottom: "24px" }}>
            <Text strong style={{ textTransform: "capitalize" }}>{key}:</Text>
            <Text type="secondary" style={{ textAlign: "right", maxWidth: "60%" }}>{String(value)}</Text>
          </div>
        ))
      ) : (
        <Text type="secondary">Chưa có thông số kỹ thuật</Text>
      )}
    </div>
  );

  const renderDescription = () => (
    <div style={{ padding: "24px 0" }}>
      <Paragraph style={{ fontSize: "16px", color: "#495057", lineHeight: "1.8", whiteSpace: "pre-line" }}>
        {product.chitietsp || "Chưa có bài viết mô tả chi tiết cho sản phẩm này."}
      </Paragraph>
    </div>
  );

  // Form Đánh Giá tĩnh (Có thể nâng cấp kết nối bảng danhgiasp sau)
  const renderReviews = () => (
    <div style={{ padding: "24px 0", textAlign: "center" }}>
      <Title level={4} type="secondary">Tính năng đánh giá đang được cập nhật...</Title>
    </div>
  );

  return (
    <div style={{ padding: "24px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* NÚT BACK */}
        <div style={{ marginBottom: "24px" }}>
          <Link to="/products" style={{ color: "#212529", fontSize: "16px", fontWeight: 500 }}>
            &larr; Back to Products
          </Link>
        </div>

        <Row gutter={[3]}>
          {/* CỘT TRÁI: HÌNH ẢNH SẢN PHẨM */}
          <Col xs={24} md={12}>
            <div style={{ position: "relative", width: "100%", height: "500px", backgroundColor: "#f8f9fa", borderRadius: "16px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
              {hasDiscount && (
                <div style={{ position: "absolute", top: "24px", left: "24px", backgroundColor: "#ff4d4f", color: "white", padding: "4px 12px", borderRadius: "20px", fontWeight: "bold", zIndex: 10 }}>
                  -{discountPercentage}%
                </div>
              )}
              
              {/* Hiển thị Slide ảnh nếu là mảng, hoặc hiển thị 1 ảnh */}
              {product.hinhanh && product.hinhanh.length > 0 ? (
                <Carousel autoplay arrows>
                  {product.hinhanh.map((img: string, index: number) => (
                    <div key={index} style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img src={img} alt={product.tensp} style={{ width: "100%", height: "500px", objectFit: "contain", padding: "20px" }} />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "#999" }}>
                  Chưa có hình ảnh
                </div>
              )}
            </div>
          </Col>

          {/* CỘT PHẢI: THÔNG TIN VÀ ĐẶT HÀNG */}
          <Col xs={24} md={12}>
            <Tag style={{ borderRadius: "16px", padding: "4px 12px", backgroundColor: "#f1f3f5", border: "none", fontSize: "14px", marginBottom: "16px" }}>
              {product.loaisanpham?.namecate || "Khác"}
            </Tag>
            <Title level={2} style={{ marginTop: 0, fontWeight: 700 }}>{product.tensp}</Title>
            
            <Space align="center" style={{ marginBottom: "24px" }}>
               <Text type="secondary">Hãng sản xuất: <strong>{product.nhasanxuat?.tennsx || "Đang cập nhật"}</strong></Text>
            </Space>

            {/* GIÁ TIỀN */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px" }}>
              <Title level={1} style={{ margin: 0, color: "#ff4d4f" }}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentPrice)}
              </Title>
              {hasDiscount && (
                <Text delete type="secondary" style={{ fontSize: "18px" }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)}
                </Text>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "24px 0" }}>
              <div style={{ width: "10px", height: "10px", backgroundColor: inStock ? "#52c41a" : "#ff4d4f", borderRadius: "50%" }}></div>
              <Text style={{ color: inStock ? "#52c41a" : "#ff4d4f", fontWeight: 500, fontSize: "16px" }}>
                {inStock ? `Còn hàng (${product.soluong} sản phẩm)` : "Hết hàng"}
              </Text>
            </div>

            {/* CHỌN SỐ LƯỢNG */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
              <Text style={{ fontSize: "16px", fontWeight: 500 }}>Số lượng:</Text>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: "6px" }}>
                <Button type="text" icon={<MinusOutlined />} onClick={() => handleQuantityChange(-1)} disabled={!inStock} />
                <div style={{ width: "50px", textAlign: "center", fontWeight: 500 }}>{orderQuantity}</div>
                <Button type="text" icon={<PlusOutlined />} onClick={() => handleQuantityChange(1)} disabled={!inStock} />
              </div>
            </div>

            {/* NÚT MUA HÀNG */}
            <Button 
              type="primary" 
              size="large" 
              icon={<ShoppingCartOutlined />} 
              disabled={!inStock} 
              block 
              style={{ height: "56px", fontSize: "18px", fontWeight: 600, backgroundColor: inStock ? "#ff4d4f" : "#d9d9d9", marginBottom: "32px" }}
              onClick={() => {
                // Tích hợp Context Giỏ hàng vào đây
                message.success(`Đã thêm ${orderQuantity} sản phẩm vào giỏ!`);
              }}
            >
              Thêm Vào Giỏ Hàng
            </Button>

            {/* CHÍNH SÁCH BẢO HÀNH */}
            <Row justify="space-between" style={{ textAlign: "center", padding: "24px 0", borderTop: "1px solid #f0f0f0" }}>
              <Col><SafetyCertificateOutlined style={{ fontSize: "24px", color: "#1890ff" }} /> <div>Bảo hành {product.baohanh || "12 tháng"}</div></Col>
              <Col><CarOutlined style={{ fontSize: "24px", color: "#52c41a" }} /> <div>Miễn phí giao hàng</div></Col>
              <Col><SyncOutlined style={{ fontSize: "24px", color: "#faad14" }} /> <div>Đổi trả 30 ngày</div></Col>
            </Row>
          </Col>
        </Row>

        {/* KHU VỰC TABS THÔNG TIN CHI TIẾT */}
        <div style={{ marginTop: "48px", border: "1px solid #f0f0f0", borderRadius: "16px", padding: "24px", backgroundColor: "#fafafa" }}>
          <div style={{ display: "flex", backgroundColor: "#f0f0f0", borderRadius: "24px", padding: "4px", marginBottom: "24px" }}>
            {["Specifications", "Description", "Reviews"].map((tab) => (
              <div 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                style={{ 
                  flex: 1, textAlign: "center", padding: "10px 0", borderRadius: "20px", cursor: "pointer", fontWeight: 500, transition: "all 0.3s", 
                  backgroundColor: activeTab === tab ? "#ffffff" : "transparent", 
                  boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.05)" : "none" 
                }}
              >
                {tab === "Specifications" ? "Thông Số Kỹ Thuật" : tab === "Description" ? "Mô Tả Sản Phẩm" : "Đánh Giá"}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px" }}>
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