import React, { useState, useEffect } from "react";
import { Drawer, Form, Input, Select, InputNumber, Switch, Radio, Upload, Button, Typography, Space, message } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;
interface Category {
  idcate: string;
  namecate: string;
}

interface Brand {
  idnsx: string;
  tennsx: string;
}
// interface AddProductDrawerProps {
//   open: boolean;
//   onClose: () => void;
// }

const EditProduct: React.FC<any> = ({ open, onClose ,initialData}) => {
  const [form] = Form.useForm();

  // State quản lý cách nhập ảnh: 'link' hoặc 'upload'
  const [imageOption, setImageOption] = useState<'link' | 'upload'>('link');

  // State lưu danh sách Category (loaisanpham) và Brand (nhasanxuat) từ Backend
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [imageLinks, setImageLinks] = useState<string[]>([]);

  
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Lấy token nếu API của bạn được bảo vệ bởi verifyToken
        const token = localStorage.getItem('access_token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Gọi đồng thời 2 API để lấy danh sách Loại SP và Nhà SX
        const [categoryRes, brandRes] = await Promise.all([
          axios.get('http://localhost:8080/api/products/categories', config),
          axios.get('http://localhost:8080/api/products/brands', config)
        ]);

        // Cập nhật vào State
        setCategories(categoryRes.data);
        setBrands(brandRes.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục và nhà sản xuất:", error);
      }
    };

    fetchDropdownData();
  }, []); // Mảng rỗng [] đảm bảo chỉ gọi API 1 lần khi mở trang
  // // Tự động set giá khuyến mãi (giakm) bằng giá niêm yết (gianiemyet) khi nhập
 useEffect(() => {
    if (initialData && open) {
      // Ép kiểu Thông số kỹ thuật từ JSON Object (Backend) thành Chuỗi (String) để hiện lên form
      const thongSoString = initialData.thongsokythuat 
        ? JSON.stringify(initialData.thongsokythuat, null, 2) 
        : "";

      // Đổ dữ liệu vào Form
      form.setFieldsValue({
        tensp: initialData.tensp,
        idcate: initialData.idcate,
        idnsx: initialData.idnsx,
        gianiemyet: initialData.gianiemyet,
        giakm: initialData.giakm,
        soluong: initialData.soluong,
        tinhtrang: initialData.tinhtrang,
        baohanh: initialData.baohanh,
        featured: initialData.featured,
        
        // BỔ SUNG 2 TRƯỜNG BỊ THIẾU
        thongsokythuat: thongSoString, 
        imageLink: initialData.hinhanh || [] 
      });

      // Cập nhật state quản lý ảnh
      setImageLinks(initialData.hinhanh || []);
    } else if (!open) {
      // Reset form khi đóng Modal
      form.resetFields();
      setImageLinks([]);
    }
  }, [initialData, open, form]);

  const gianiemyet = Form.useWatch("gianiemyet", form);
  useEffect(() => {
    if (gianiemyet !== undefined) {
      form.setFieldValue("giakm", gianiemyet);
    }
  }, [gianiemyet, form]);

  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem('access_token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const finalImageLinks = values.imageLink || imageLinks;
      const payload = { ...values, imageLinks:finalImageLinks };

      if (initialData) {
        // NẾU LÀ SỬA (Gọi API PUT)
        await axios.put(`http://localhost:8080/api/products/${initialData.idsp}`, payload, config);
        message.success("Cập nhật sản phẩm thành công!");
      } else {
        // NẾU LÀ THÊM MỚI (Gọi API POST)
        await axios.post('http://localhost:8080/api/products/add', payload, config);
        message.success("Thêm sản phẩm thành công!");
      }
      
      form.resetFields();
      setImageLinks([]);
      onClose();
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  return (
    <Drawer
      title={
        <Space size="large">
          <CloseOutlined onClick={onClose} style={{ cursor: "pointer", fontSize: "16px" }} />
          <span style={{ fontSize: "18px", fontWeight: 600 }}> {initialData ? "CHỈNH SỬA SẢN PHẨM" : "THÊM SẢN PHẨM MỚI"}`</span>
        </Space>
      }
      placement="bottom"
      closable={false}
      onClose={onClose}
      open={open}
      size="100%"
      styles={{
        header: { backgroundColor: "#f8f9fa", borderBottom: "1px solid #dee2e6", padding: "16px 24px" },
        body: { backgroundColor: "#f4f6f8", padding: "24px 48px" },
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Form.Item label="Tên Sản Phẩm (tensp)" name="tensp" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
          <Input size="large" placeholder="Nhập tên sản phẩm..." />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Danh Mục (idcate)" name="idcate" style={{ flex: 1 }} rules={[{ required: true, message: 'Chọn danh mục' }]}>
            <Select size="large"
              placeholder="Chọn danh mục"
              options={categories.map(cate => ({
                value: cate.idcate,
                label: cate.namecate
              }))}
            />
          </Form.Item>

          <Form.Item label="Nhà Sản Xuất (idnsx)" name="idnsx" style={{ flex: 1 }} rules={[{ required: true, message: 'Chọn NSX' }]}>
            <Select size="large"
              placeholder="Chọn danh mục"
              options={brands.map(brand => ({
                value: brand.idnsx,
                label: brand.tennsx
              }))}
            />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Giá Niêm Yết (gianiemyet)" name="gianiemyet" style={{ flex: 1 }} rules={[{ required: true, message: 'Nhập giá' }]}>
            <InputNumber size="large" style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
          </Form.Item>

          <Form.Item label="Giá Khuyến Mãi (giakm)" name="giakm" style={{ flex: 1 }}>
            <InputNumber size="large" style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Tình Trạng (tinhtrang)" name="tinhtrang" style={{ flex: 1 }} initialValue="mới">
            <Select size="large">
              <Select.Option value="mới">Mới</Select.Option>
              <Select.Option value="cũ">Cũ</Select.Option>
              <Select.Option value="ngừng bán">Ngừng bán</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Bảo Hành (baohanh)" name="baohanh" style={{ flex: 1 }}>
            <Input size="large" placeholder="VD: 12 tháng, 24 tháng..." />
          </Form.Item>
        </div>

        <Form.Item label="Số Lượng (Đẩy vào bảng tonkho)" name="soluong" rules={[{ required: true, message: 'Nhập số lượng' }]}>
          <InputNumber size="large" min={0} style={{ width: '100%' }} placeholder="Nhập số lượng tồn kho" />
        </Form.Item>

        <Form.Item label="Thông Số Kỹ Thuật (JSON format)" name="thongsokythuat">
          <TextArea rows={4} placeholder='VD: { "CPU": "Intel Core i7", "RAM": "16GB" }' />
        </Form.Item>

        <Form.Item label="Sản phẩm nổi bật (Featured)" name="featured" valuePropName="checked" initialValue={false}>
          <Switch />
        </Form.Item>

        <Title level={5} style={{ marginTop: "24px" }}>Hình Ảnh (hinhanh)</Title>
        <Form.Item>
          <Radio.Group value={imageOption} onChange={(e) => setImageOption(e.target.value)} style={{ marginBottom: "16px" }}>
            <Radio value="link">Nhập Link Ảnh</Radio>
            <Radio value="upload">Tải ảnh lên (Explorer)</Radio>
          </Radio.Group>

          {imageOption === 'link' ? (
            <Form.Item name="imageLink" noStyle>

              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Dán link ảnh vào đây và ấn Enter..."
                onChange={(values) => setImageLinks(values)}
                value={imageLinks}
                tokenSeparators={[',']} // Tự động tách link nếu copy 1 chuỗi có dấu phẩy
                size="large"
              />
            </Form.Item>
          ) : (
            <Form.Item name="imageFile" noStyle>
              <Upload maxCount={1} listType="picture">
                <Button size="large" icon={<UploadOutlined />}>Click để chọn ảnh máy tính</Button>
              </Upload>
            </Form.Item>
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" style={{ height: "50px", fontSize: "16px", fontWeight: 600, marginTop: "16px", backgroundColor: "#3b82f6" }}>
          {initialData ? "LƯU THAY ĐỔI" : "LƯU SẢN PHẨM MỚI"}
        </Button>
      </Form>
    </Drawer>
  );
};

export default EditProduct;