import React from "react";
import { Typography, Button, Card, Divider, message } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCart } from "../context/cartcontext"; // Import Context

const { Title, Text } = Typography;

const CartPage: React.FC = () => {
  // 1. Lấy dữ liệu giỏ hàng thực tế từ Context thay vì state nội bộ
  const { cartItems, fetchCart } = useCart();

  // 2. Hàm xử lý XÓA sản phẩm gọi xuống Backend
  const handleRemoveItem = async (productId: string) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8080/api/cart/remove', 
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");
      fetchCart(); // Cập nhật lại giao diện
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm");
    }
  };

  // 3. Hàm xử lý TĂNG/GIẢM số lượng gọi xuống Backend
  const handleQuantityChange = async (productId: string, delta: number, currentQuantity: number) => {
    // Chặn giảm dưới 1
    if (currentQuantity + delta < 1) {
      message.warning("Số lượng tối thiểu là 1. Hãy nhấn nút Xóa nếu không muốn mua.");
      return;
    }
    
    try {
      const token = localStorage.getItem('access_token');
      // Gọi API cập nhật bằng Prisma Transaction mà ta đã nói ở tin nhắn trước
      await axios.post('http://localhost:8080/api/cart/update', 
        { productId, delta },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // Đồng bộ lại số lượng hiển thị
    } catch (error) {
      message.error("Lỗi khi cập nhật số lượng");
    }
  };

  // Tính toán Order Summary động dựa trên mảng cartItems từ Backend
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );
  const tax = subtotal * 0.08; // Giả sử thuế 8%
  const total = subtotal + tax;

  // GIAO DIỆN KHI GIỎ HÀNG TRỐNG
  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ padding: "60px 24px", backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", backgroundColor: "#ffffff", padding: "60px", borderRadius: "8px", width: "100%", maxWidth: "800px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <div style={{ backgroundColor: "#e2e6ea", padding: "24px", borderRadius: "16px" }}>
              <ShoppingOutlined style={{ fontSize: "64px", color: "#adb5bd" }} />
            </div>
          </div>
          <Title level={3} style={{ marginBottom: "8px" }}>Your cart is empty</Title>
          <Text type="secondary" style={{ fontSize: "16px", display: "block", marginBottom: "32px" }}>
            Looks like you haven't added any items to your cart yet.
          </Text>
          <Button type="primary" size="large" href="/products" style={{ backgroundColor: "#0a0a0a", borderColor: "#0a0a0a", borderRadius: "6px", padding: "0 32px" }}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // GIAO DIỆN KHI CÓ SẢN PHẨM
  return (
    <div style={{ padding: "24px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <Title level={2} style={{ margin: 0, fontWeight: 600 }}>Shopping Cart</Title>
          <Text>{cartItems.length} items in your cart</Text>
        </div>

        {cartItems.map((item) => (
          <Card key={item.id_detail} styles={{ body: { padding: "16px" } }} style={{ marginBottom: "16px", borderRadius: "8px", borderColor: "#e8e8e8" }}>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              
              <div style={{ width: "80px", height: "80px", backgroundColor: "#f0f0f0", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "4px" }}>
                <Text type="secondary" style={{ fontSize: "10px", textAlign: "center" }}>Image</Text>
              </div>

              <div style={{ flex: 1, minWidth: "200px" }}>
                {/* Lấy tên từ bảng sanpham nhờ quan hệ Prisma */}
                <Title level={5} style={{ margin: 0 }}>{item.sanpham?.tensp}</Title> 
                <Text type="secondary" style={{ display: "block", marginBottom: "4px" }}>
                  {item.sanpham?.idcate || 'Sản phẩm'}
                </Text>
                <Text strong style={{ fontSize: "16px", marginRight: "8px" }}>
                  ${Number(item.price).toLocaleString()}
                </Text>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: "4px" }}>
                  <Button type="text" icon={<MinusOutlined />} onClick={() => handleQuantityChange(item.product_id, -1, item.quantity)} />
                  <div style={{ width: "40px", textAlign: "center", fontWeight: 500 }}>{item.quantity}</div>
                  <Button type="text" icon={<PlusOutlined />} onClick={() => handleQuantityChange(item.product_id, 1, item.quantity)} />
                </div>
                
                <Text strong style={{ width: "70px", textAlign: "right", fontSize: "16px" }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </Text>
                
                <Button type="text" danger icon={<DeleteOutlined style={{ fontSize: "18px" }} />} onClick={() => handleRemoveItem(item.product_id)} />
              </div>
            </div>
          </Card>
        ))}

        <Card style={{ borderRadius: "8px", borderColor: "#e8e8e8", backgroundColor: "#ffffff" }}>
          <Title level={4} style={{ marginBottom: "24px" }}>Order Summary</Title>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <Text>Subtotal ({cartItems.length} items)</Text>
            <Text>${subtotal.toLocaleString()}</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <Text>Shipping</Text>
            <Text strong style={{ color: "#52c41a" }}>Free</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
            <Text>Tax</Text>
            <Text>${tax.toLocaleString()}</Text>
          </div>
          <Divider style={{ margin: "16px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", alignItems: "center" }}>
            <Title level={4} style={{ margin: 0 }}>Total</Title>
            <Title level={3} style={{ margin: 0 }}>${total.toLocaleString()}</Title>
          </div>
          <Button type="primary" block size="large" style={{ backgroundColor: "#212529", marginBottom: "12px", borderRadius: "4px", fontWeight: 600 }}>
            Proceed to Checkout
          </Button>
          <Button block size="large" href="/products" style={{ borderRadius: "4px", fontWeight: 500 }}>
            Continue Shopping
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;