import React from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Row,
  Col,
  Rate,
  Upload,
  Button,
  Switch,
  Typography,
  Space,
} from "antd";
import {
  CloseOutlined,
  CloudUploadOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

interface AddProductDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddProduct: React.FC<AddProductDrawerProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();

  return (
    <Drawer
      title={
        <Space size="large">
          <CloseOutlined
            onClick={onClose}
            style={{ cursor: "pointer", fontSize: "16px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: 600 }}>Add Product</span>
        </Space>
      }
      placement="bottom"
      closable={false} // Ẩn nút X mặc định của Antd để dùng nút X custom ở trên cho giống ảnh
      onClose={onClose}
      open={open}
      size="100%" // Chiếm 100% màn hình, tạo cảm giác chuyển trang
      styles={{
        header: {
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          padding: "16px 24px",
        },
        body: { backgroundColor: "#f4f6f8", padding: "24px 48px" },
      }}
    >
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* ROW 1 & 2: Name và Description */}
        <Form.Item label={<Text strong>Product Name</Text>} name="name">
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={<Text strong>Product Description</Text>}
          name="description"
        >
          <TextArea rows={5} size="large" />
        </Form.Item>

        {/* ROW 3: Category, Sub Category, 3rd Level, Price */}
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label={<Text strong>Product Category</Text>}
              name="category"
            >
              <Select size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={<Text strong>Product Sub Category</Text>}
              name="subCategory"
            >
              <Select size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={<Text strong>Product Third Level Category</Text>}
              name="thirdCategory"
            >
              <Select size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={<Text strong>Product Price</Text>} name="price">
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* ROW 4: Old Price, Is Featured, Stock, Brand */}
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label={<Text strong>Product Old Price</Text>}
              name="oldPrice"
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={<Text strong>Is Featured?</Text>}
              name="isFeatured"
            >
              <Select size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={<Text strong>Product Stock</Text>} name="stock">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={<Text strong>Product Brand</Text>} name="brand">
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* ROW 5: Discount, RAMS, Weight, Size */}
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label={<Text strong>Product Discount</Text>}
              name="discount"
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={<Text strong>Product RAMS</Text>} name="rams">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={<Text strong>Product Weight</Text>} name="weight">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={<Text strong>Product Size</Text>} name="size">
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* ROW 6: Rating */}
        <Form.Item label={<Text strong>Product Rating</Text>} name="rating">
          <Rate defaultValue={1} />
        </Form.Item>

        {/* MEDIA & IMAGES */}
        <Title level={5} style={{ marginTop: "24px" }}>
          Media & Images
        </Title>
        <Form.Item name="images">
          <Dragger
            style={{
              width: "200px",
              height: "150px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <p className="ant-upload-drag-icon">
              <PictureOutlined style={{ fontSize: "32px", color: "#adb5bd" }} />
            </p>
            <p className="ant-upload-text" style={{ color: "#adb5bd" }}>
              Image Upload
            </p>
          </Dragger>
        </Form.Item>

        {/* BANNER IMAGES */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            border: "1px solid #e8e8e8",
            marginTop: "32px",
          }}
        >
          <Space size="middle" style={{ marginBottom: "16px" }}>
            <Title level={5} style={{ margin: 0 }}>
              Banner Images
            </Title>
            <Switch defaultChecked />
          </Space>

          <Form.Item name="bannerImages">
            <Dragger
              style={{
                width: "200px",
                height: "150px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <p className="ant-upload-drag-icon">
                <PictureOutlined
                  style={{ fontSize: "32px", color: "#adb5bd" }}
                />
              </p>
              <p className="ant-upload-text" style={{ color: "#adb5bd" }}>
                Image Upload
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            label={<Text strong>Banner Title</Text>}
            name="bannerTitle"
            style={{ marginTop: "24px" }}
          >
            <Input size="large" />
          </Form.Item>
        </div>

        {/* NÚT SUBMIT */}
        <Button
          type="primary"
          block
          size="large"
          icon={<CloudUploadOutlined />}
          style={{
            height: "50px",
            fontSize: "16px",
            fontWeight: 600,
            marginTop: "32px",
            backgroundColor: "#3b82f6",
          }}
        >
          PUBLISH AND VIEW
        </Button>
      </Form>
    </Drawer>
  );
};

export default AddProduct;
