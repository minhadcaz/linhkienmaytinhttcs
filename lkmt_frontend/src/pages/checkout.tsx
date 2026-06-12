import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Steps,
  Form,
  Input,
  Checkbox,
  Radio,
  Divider,
} from "antd";
import {
  LockOutlined,
  TruckOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const CheckoutPage: React.FC = () => {
  // Quản lý trạng thái bước hiện tại: 0 (Shipping), 1 (Payment), 2 (Review)
  const [currentStep, setCurrentStep] = useState(0);

  // Hàm chuyển bước
  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  // Dữ liệu mẫu Order Summary
  const mockItem = { name: "AMD Ryzen 7 7800X3D", quantity: 1, price: 449.99 };
  const subtotal = 449.99;
  const tax = 36.0;
  const total = subtotal + tax;

  // Cấu hình thanh tiến trình (Steps)
  const stepsItems = [
    { title: "Shipping" },
    { title: "Payment" },
    { title: "Review" },
  ];

  // ==========================================
  // GIAO DIỆN BƯỚC 1: SHIPPING INFORMATION
  // ==========================================
  const renderShipping = () => (
    <Card
      style={{ borderRadius: "16px", borderColor: "#f0f0f0" }}
      bodyStyle={{ padding: "32px" }}
    >
      <Title
        level={5}
        style={{
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <TruckOutlined /> Shipping Information
      </Title>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item label={<Text strong>First Name</Text>}>
              <Input variant="filled" size="large" placeholder="John" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label={<Text strong>Last Name</Text>}>
              <Input variant="filled" size="large" placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={<Text strong>Email Address</Text>}>
          <Input variant="filled" size="large" placeholder="john@example.com" />
        </Form.Item>
        <Form.Item label={<Text strong>Phone Number</Text>}>
          <Input
            variant="filled"
            size="large"
            placeholder="+1 (555) 123-4567"
          />
        </Form.Item>
        <Form.Item label={<Text strong>Street Address</Text>}>
          <Input variant="filled" size="large" placeholder="123 Main Street" />
        </Form.Item>
        <Row gutter={24}>
          <Col xs={24} sm={10}>
            <Form.Item label={<Text strong>City</Text>}>
              <Input variant="filled" size="large" placeholder="New York" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label={<Text strong>State</Text>}>
              <Input variant="filled" size="large" placeholder="NY" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label={<Text strong>ZIP Code</Text>}>
              <Input variant="filled" size="large" placeholder="10001" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Checkbox>
            <Text strong>Save this address for future orders</Text>
          </Checkbox>
        </Form.Item>
        <Button
          type="primary"
          block
          size="large"
          style={{
            backgroundColor: "#0a0a0a",
            borderRadius: "8px",
            fontWeight: 600,
            marginTop: "8px",
          }}
          onClick={next}
        >
          Continue to Payment
        </Button>
      </Form>
    </Card>
  );

  // ==========================================
  // GIAO DIỆN BƯỚC 2: PAYMENT METHOD
  // ==========================================
  const renderPayment = () => (
    <Card
      style={{ borderRadius: "16px", borderColor: "#f0f0f0" }}
      bodyStyle={{ padding: "32px" }}
    >
      <Title
        level={5}
        style={{
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <CreditCardOutlined /> Payment Method
      </Title>
      <Form layout="vertical">
        <Form.Item>
          <Radio.Group
            defaultValue="credit"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Radio value="credit">
              <Text strong>Credit/Debit Card</Text>
            </Radio>
            <Radio value="paypal">
              <Text strong>PayPal</Text>
            </Radio>
            <Radio value="apple">
              <Text strong>Apple Pay</Text>
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={<Text strong>Card Number</Text>}>
          <Input
            variant="filled"
            size="large"
            placeholder="1234 5678 9012 3456"
          />
        </Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={<Text strong>Expiry Date</Text>}>
              <Input variant="filled" size="large" placeholder="MM/YY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<Text strong>CVV</Text>}>
              <Input variant="filled" size="large" placeholder="123" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={<Text strong>Cardholder Name</Text>}>
          <Input variant="filled" size="large" placeholder="John Doe" />
        </Form.Item>

        <Row gutter={24} style={{ marginTop: "24px" }}>
          <Col span={12}>
            <Button
              block
              size="large"
              style={{ borderRadius: "8px", fontWeight: 500 }}
              onClick={prev}
            >
              Back
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              block
              size="large"
              style={{
                backgroundColor: "#0a0a0a",
                borderRadius: "8px",
                fontWeight: 600,
              }}
              onClick={next}
            >
              Review Order
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  // ==========================================
  // GIAO DIỆN BƯỚC 3: REVIEW ORDER
  // ==========================================
  const renderReview = () => (
    <Card
      style={{ borderRadius: "16px", borderColor: "#f0f0f0" }}
      bodyStyle={{ padding: "32px" }}
    >
      <Title level={5} style={{ marginBottom: "24px" }}>
        Review Your Order
      </Title>

      {/* Xem lại địa chỉ */}
      <div style={{ marginBottom: "24px" }}>
        <Text
          strong
          style={{ display: "block", fontSize: "15px", marginBottom: "8px" }}
        >
          Shipping Address
        </Text>
        <div style={{ color: "#595959", lineHeight: "1.6" }}>
          John Doe
          <br />
          123 Main Street
          <br />
          New York, NY 10001
          <br />
          john@example.com
        </div>
      </div>

      {/* Xem lại thanh toán */}
      <div style={{ marginBottom: "32px" }}>
        <Text
          strong
          style={{ display: "block", fontSize: "15px", marginBottom: "8px" }}
        >
          Payment Method
        </Text>
        <Text style={{ color: "#595959" }}>Credit Card ending in 3456</Text>
      </div>

      {/* Xem lại giỏ hàng */}
      <div style={{ marginBottom: "32px" }}>
        <Text
          strong
          style={{ display: "block", fontSize: "15px", marginBottom: "16px" }}
        >
          Order Items
        </Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",
                fontSize: "10px",
                textAlign: "center",
                color: "#8c8c8c",
              }}
            >
              Error
              <br />
              loading
            </div>
            <div>
              <Text strong style={{ display: "block" }}>
                {mockItem.name}
              </Text>
              <Text type="secondary">Qty: {mockItem.quantity}</Text>
            </div>
          </div>
          <Text strong>${mockItem.price}</Text>
        </div>
      </div>

      <Form.Item style={{ marginBottom: "32px" }}>
        <Checkbox>
          <Text strong>I agree to the Terms of Service and Privacy Policy</Text>
        </Checkbox>
      </Form.Item>

      <Row gutter={24}>
        <Col span={8}>
          <Button
            block
            size="large"
            style={{ borderRadius: "8px", fontWeight: 500 }}
            onClick={prev}
          >
            Back
          </Button>
        </Col>
        <Col span={16}>
          {/* Nút Đặt hàng cuối cùng */}
          <Button
            type="primary"
            block
            size="large"
            style={{
              backgroundColor: "#0a0a0a",
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            Place Order - ${total}
          </Button>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div
      style={{
        padding: "40px 24px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* THANH TIẾN TRÌNH TRÊN CÙNG */}
        <div style={{ maxWidth: "600px", margin: "0 auto 40px auto" }}>
          <Steps
            current={currentStep}
            items={stepsItems}
            size="small"
            style={{ fontWeight: 500 }}
          />
        </div>

        <Row gutter={48}>
          {/* CỘT TRÁI: HIỂN THỊ ĐỘNG DỰA VÀO STEP HIỆN TẠI */}
          <Col xs={24} md={16}>
            {currentStep === 0 && renderShipping()}
            {currentStep === 1 && renderPayment()}
            {currentStep === 2 && renderReview()}
          </Col>

          {/* CỘT PHẢI: ORDER SUMMARY (CỐ ĐỊNH XUYÊN SUỐT CÁC BƯỚC) */}
          <Col xs={24} md={8}>
            <Card
              style={{ borderRadius: "16px", borderColor: "#f0f0f0" }}
              bodyStyle={{ padding: "24px" }}
            >
              <Title level={5} style={{ marginBottom: "24px" }}>
                Order Summary
              </Title>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <Text style={{ color: "#595959" }}>
                  {mockItem.name} x{mockItem.quantity}
                </Text>
                <Text>${mockItem.price}</Text>
              </div>

              <Divider style={{ margin: "16px 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <Text type="secondary">Subtotal</Text>
                <Text strong>${subtotal}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <Text type="secondary">Shipping</Text>
                <Text strong style={{ color: "#52c41a" }}>
                  Free
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <Text type="secondary">Tax</Text>
                <Text strong>${tax.toFixed(2)}</Text>
              </div>

              <Divider style={{ margin: "16px 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                  alignItems: "center",
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Total
                </Title>
                <Title level={3} style={{ margin: 0 }}>
                  ${total}
                </Title>
              </div>

              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  <LockOutlined
                    style={{ color: "#faad14", marginRight: "4px" }}
                  />
                  Your payment information is secure and encrypted
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CheckoutPage;
