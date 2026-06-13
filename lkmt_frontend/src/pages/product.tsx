import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Checkbox,
  Select,
  Button,
  Card,
  Space,
  Spin,
  message,
} from "antd";
import {
  FilterOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import axios from "axios";
import { useCart } from "../context/cartcontext";

const { Title, Text } = Typography;

// --- DỮ LIỆU BỘ LỌC (Tạm thời giữ nguyên tĩnh, bạn có thể thay đổi sau) ---
const brands = [
  { label: "ASUS", count: 15, value: "ASUS" },
  { label: "MSI", count: 12, value: "MSI" },
  { label: "Gigabyte", count: 8, value: "Gigabyte" },
  { label: "G.Skill", count: 10, value: "G.Skill" },
];


// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU TỪ DATABASE (Dựa theo schema.txt) ---
interface SanPhamType {
  idsp: string;
  tensp: string;
  gianiemyet: string | number;
  giakm: string | number | null;
  tinhtrang: string;
  hinhanh: any; // Trong schema là kiểu Json
  featured: boolean;
}

const ProductsPage: React.FC = () => {
  // 1. KHAI BÁO STATE ĐỂ CHỨA DỮ LIỆU SẢN PHẨM TỪ API
  const [products, setProducts] = useState<SanPhamType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  // 2. GỌI API LẤY DỮ LIỆU NGAY KHI VÀO TRANG
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Thay url này bằng port backend của bạn (thường là 8080)
        const response = await axios.get("http://localhost:8080/api/products/all");
        setProducts(response.data.data||[]);
      } catch (error) {1
        message.error("Không thể lấy danh sách sản phẩm từ máy chủ!");
        console.error("Lỗi fetch API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Hàm chuyển đổi tiền tệ sang VNĐ
  const formatVND = (price: string | number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(price));
  };

  // Hiển thị hiệu ứng xoay (loading) trong lúc chờ API trả dữ liệu
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* KHU VỰC 1: TIÊU ĐỀ */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Title level={2} style={{ margin: 0, fontWeight: 900 }}>
            Tất cả sản phẩm{" "}
            <span style={{ fontSize: "16px", color: "gray", fontWeight: 500 }}>
              ({products.length} sản phẩm tìm thấy)
            </span>
          </Title>
          <Space>
            <Button
              type="primary"
              icon={<AppstoreOutlined />}
              style={{
                backgroundColor: "#212529",
                borderColor: "#212529",
                borderRadius: "0px",
              }}
            />
            <Button
              icon={<UnorderedListOutlined />}
              style={{ borderRadius: "0px" }}
            />
          </Space>
        </div>

        <Row gutter={24}>
          {/* KHU VỰC 2: SIDEBAR BỘ LỌC (FILTERS) */}
          <Col xs={24} md={6}>
            <Card
              bordered={true}
              style={{ borderRadius: "0px", borderColor: "#ced4da" }}
              headStyle={{
                borderBottom: "1px solid #ced4da",
                padding: "0 16px",
              }}
              bodyStyle={{ padding: "16px" }}
              title={
                <>
                  <FilterOutlined /> Filters
                </>
              }
            >
              {/* Tìm kiếm */}
              <div style={{ marginBottom: "24px" }}>
                <Text strong style={{ display: "block", marginBottom: "8px" }}>
                  Tìm kiếm
                </Text>
                <Input
                  placeholder="Tên sản phẩm..."
                  style={{ borderRadius: "0px" }}
                />
              </div>

              {/* Lọc theo Hãng */}
              <div style={{ marginBottom: "24px" }}>
                <Text strong style={{ display: "block", marginBottom: "8px" }}>
                  Thương hiệu
                </Text>
                <Checkbox.Group
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {brands.map((brand) => (
                    <div
                      key={brand.value}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Checkbox value={brand.value}>{brand.label}</Checkbox>
                      <Text type="secondary">({brand.count})</Text>
                    </div>
                  ))}
                </Checkbox.Group>
              </div>

              {/* Lọc Khoảng giá */}
              <div style={{ marginBottom: "24px" }}>
                <Text strong style={{ display: "block", marginBottom: "8px" }}>
                  Khoảng giá
                </Text>
                <Space style={{ width: "100%", marginBottom: "16px" }}>
                  <Input placeholder="Min" style={{ borderRadius: "0px" }} />
                  <Input placeholder="Max" style={{ borderRadius: "0px" }} />
                </Space>
                <Button
                  block
                  style={{ borderRadius: "0px", borderColor: "#ced4da" }}
                >
                  Áp dụng
                </Button>
              </div>
            </Card>
          </Col>

          {/* KHU VỰC 3: DANH SÁCH SẢN PHẨM TỪ DATABASE */}
          <Col xs={24} md={18}>
            {/* Thanh Sort */}
            <Card
              bodyStyle={{
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
              }}
              style={{
                borderRadius: "0px",
                borderColor: "#ced4da",
                marginBottom: "24px",
              }}
            >
              <Text style={{ marginRight: "12px" }}>Sắp xếp theo:</Text>
              <Select
                defaultValue="name-asc"
                style={{ width: 180 }}
                options={[
                  { value: "name-asc", label: "Tên A-Z" },
                  { value: "name-desc", label: "Tên Z-A" },
                  { value: "price-asc", label: "Giá Thấp đến Cao" },
                  { value: "price-desc", label: "Giá Cao đến Thấp" },
                ]}
              />
            </Card>

            {/* Lưới Sản phẩm */}
            <Row gutter={[16, 16]}>
              {/* DUYỆT QUA MẢNG DỮ LIỆU PRODUCTS TỪ API */}
              {products.map((product) => {
                // Xử lý giá: Nếu có giá khuyến mãi (giakm) thì xem như đang SALE
                const isSale =
                  product.giakm !== null && Number(product.giakm) > 0;
                const currentPrice = isSale
                  ? product.giakm
                  : product.gianiemyet;
                const originalPrice = isSale ? product.gianiemyet : null;

                // Xử lý hình ảnh JSON (vì trong Database lưu kiểu mảng đường dẫn)
                let imageUrl = "https://via.placeholder.com/200"; // Ảnh mặc định nếu lỗi
                if (product.hinhanh) {
                  if (
                    Array.isArray(product.hinhanh) &&
                    product.hinhanh.length > 0
                  ) {
                    imageUrl = product.hinhanh[0]; // Lấy ảnh đầu tiên trong mảng JSON
                  } else if (typeof product.hinhanh === "string") {
                    imageUrl = product.hinhanh; // Nếu lưu dạng string cứng
                  }
                }

                return (
                  // Bổ sung thẻ <Col> bọc thẻ <Card> để chia grid thành 3 cột đều nhau trên màn hình lớn
                  <Col xs={24} sm={12} lg={8} key={product.idsp}>
                    <Card
                      hoverable
                      styles={{
                        body: {
                          padding: "16px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          height: "100%",
                        },
                      }}
                      style={{
                        borderRadius: "0px",
                        borderColor: "#ced4da",
                        height: "100%",
                      }}
                    >
                      <Link
                        to={`/product/${product.idsp}`}
                        style={{
                          display: "block",
                          color: "inherit",
                          flexGrow: 1,
                        }}
                      >
                        {/* Hình ảnh và Nhãn */}
                        <div
                          style={{
                            position: "relative",
                            height: "220px",
                            border: "1px dashed #ced4da",
                            backgroundColor: "#ffffff",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px",
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={product.tensp}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                          {isSale && (
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
                            </div>
                          )}
                          {product.featured && (
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
                              HOT
                            </span>
                          )}
                        </div>

                        {/* Thông tin */}
                        <div style={{ marginTop: "16px" }}>
                          <Title
                            level={5}
                            style={{
                              margin: "0 0 8px 0",
                              fontSize: "14px",
                              minHeight: "44px",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.tensp}
                          </Title>

                          <div
                            style={{
                              marginBottom: "16px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Text
                              strong
                              style={{ fontSize: "18px", color: "#ff4d4f" }}
                            >
                              {formatVND(currentPrice!)}
                            </Text>
                            {/* Chữ gạch ngang nếu có giá khuyến mãi */}
                            <div style={{ minHeight: "22px" }}>
                              {originalPrice && (
                                <Text
                                  delete
                                  type="secondary"
                                  style={{ fontSize: "14px" }}
                                >
                                  {formatVND(originalPrice)}
                                </Text>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Nút Thêm vào giỏ hàng */}
                      <Button
                        type="primary"
                        block
                        icon={<ShoppingCartOutlined />}
                        style={{ backgroundColor: '#212529', borderColor: '#212529', borderRadius: '0px', height: '40px', fontWeight: 500 }}
                        onClick={(e) => {
                          e.preventDefault(); // Ngăn hành vi link (nếu nút nằm trong thẻ <Link>)
                          addToCart(String(product.idsp), 1); // product.id phải match với idsp trong database
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductsPage;
