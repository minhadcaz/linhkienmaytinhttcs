import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Row, Col, Select, Input, Table, Space, Popconfirm, message } from "antd";
import { PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import AddProduct from "../components/adminaddproduct";
import EditProduct from "../components/admineditproduct";


const { Title, Text } = Typography;
interface Category {
    idcate: string;
    namecate: string;
}

interface Brand {
    idnsx: string;
    tennsx: string;
}
const AdminProductPage: React.FC = () => {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    
    const [productData, setProductData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    // 1. Gọi API lấy danh sách
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProductData(response.data);
        } catch (error) {
            message.error("Lỗi khi tải danh sách sản phẩm!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
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
                    axios.get('http://localhost:8080/api/data/categories', config),
                    axios.get('http://localhost:8080/api/data/brands', config)
                ]);

                // Cập nhật vào State
                setCategories(categoryRes.data);
                setBrands(brandRes.data);
            } catch (error) {
                console.error("Lỗi khi tải danh mục và nhà sản xuất:", error);
            }
        };

        fetchDropdownData();
    }, []);
    // 2. Các hàm Action
    const handleView = (idsp: string) => console.log("Xem chi tiết:", idsp);

    const handleDelete = async (idsp: string) => {
        try {
            message.success(`Đã xóa sản phẩm ${idsp} thành công!`);
            // Sau này bạn gọi axios.delete ở đây và gọi lại fetchProducts()
        } catch (error) {
            message.error("Lỗi khi xóa sản phẩm!");
        }
    };
    const handleEdit = async (idsp: string) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/products/${idsp}`);
            setSelectedProduct(res.data); // Truyền data này vào initialData
            setIsAddProductOpen(true);
        } catch (error) {
            message.error("Lỗi khi tải dữ liệu sửa!");
        }
    };
    const handleOpenAdd = () => {
        setSelectedProduct(null);
        setIsAddProductOpen(true);
    };
    // 3. Cấu hình Cột
    const columns = [
        { title: "TÊN SẢN PHẨM", dataIndex: "tensp", key: "tensp", render: (text: string) => <strong>{text}</strong> },
        { title: "DANH MỤC", dataIndex: "idcate", key: "idcate" },
        { title: "HÃNG SX", dataIndex: "idnsx", key: "idnsx" },
        { title: "GIÁ BÁN", dataIndex: "giakm", key: "giakm", render: (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0) },
        { title: "TỒN KHO", dataIndex: "soluong", key: "soluong" },
        {
            title: "HÀNH ĐỘNG", key: "action", align: 'center' as const,
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} onClick={() => handleView(record.idsp)} />
                    <Button type="text" icon={<EditOutlined />} style={{ color: '#52c41a' }} onClick={() => handleEdit(record.idsp)} />
                    <Popconfirm title="Xóa sản phẩm" onConfirm={() => handleDelete(record.idsp)} okText="Xóa" cancelText="Hủy">
                        <Button type="text" icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            {/* Modal Thêm sản phẩm */}
            <AddProduct open={isAddProductOpen} initialData={selectedProduct} onClose={() => {
                setIsAddProductOpen(false);
                fetchProducts(); // Tải lại bảng sau khi đóng modal thêm
            }} />

            <Card style={{ borderRadius: "12px", borderColor: "#e8e8e8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <Title level={4} style={{ margin: 0 }}>Quản lý Sản Phẩm</Title>
                    <Button type="primary" icon={<PlusOutlined />} style={{ borderRadius: "6px", backgroundColor: "#3b82f6" }} onClick={() => setIsAddProductOpen(true)}>
                        THÊM SẢN PHẨM MỚI
                    </Button>
                </div>

                {/* Bộ lọc */}
                <Row gutter={16} style={{ marginBottom: "24px" }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Text type="secondary" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Lọc theo Danh Mục</Text>
                        <Select style={{ width: "100%" }} placeholder="Chọn danh mục..." options={categories.map(category => ({
                            value: category.idcate,
                            label: category.namecate
                        }))} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Text type="secondary" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Lọc theo Hãng</Text>
                        <Select style={{ width: "100%" }} placeholder="Chọn hãng..." options={brands.map(brand => ({
                            value: brand.idnsx,
                            label: brand.tennsx
                        }))} />
                    </Col>

                    <Col xs={24} sm={12} lg={12} style={{ display: "flex", alignItems: "flex-end" }}>
                        <Input prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />} placeholder="Tìm kiếm sản phẩm..." style={{ width: "100%" }} />
                    </Col>
                </Row>

                {/* Bảng dữ liệu */}
                <Table rowSelection={{ type: "checkbox" }} columns={columns} dataSource={productData} rowKey="idsp" loading={loading} pagination={{ showSizeChanger: true, defaultPageSize: 10 }} size="middle" />
            </Card>
        </>
    );
};

export default AdminProductPage;