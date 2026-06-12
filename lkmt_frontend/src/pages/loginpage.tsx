import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/authcontext";
import axios from "axios";
const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Hàm xử lý khi người dùng bấm Submit form
  const onFinish = async (values: any) => {
    try {
      // Gọi API đăng nhập tới Backend
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: values.username,
          password: values.password,
        },
      );

      // Backend sẽ trả về token và thông tin user (dựa theo chuẩn JWT của tài liệu)
      const { access_token, user } = response.data;

      // Lưu vào Context và LocalStorage
      login(access_token, user);

      message.success("Đăng nhập thành công!");
      navigate("/"); // Chuyển về trang chủ
    } catch (error) {
      console.error(error);
      message.error("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>
            TECH<span style={{ color: "#1677ff" }}>STORE</span>
          </Title>
          <Text type="secondary">Đăng nhập vào tài khoản của bạn</Text>
        </div>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập Tên đăng nhập!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <a style={{ float: "right" }} href="">
              Quên mật khẩu?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#212529" }}
            >
              Đăng Nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text>
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
