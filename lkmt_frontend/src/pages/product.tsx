import React from 'react';
import { Row, Col, Typography, Input, Checkbox, Select, Button, Card, Space, Divider } from 'antd';
import {
  FilterOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { products } from '../data/product';
import { Link } from 'react-router';
const { Title, Text } = Typography;

// --- DỮ LIỆU MẪU (Mock Data) ---
const brands = [
  { label: 'ASUS', count: 15, value: 'ASUS' },
  { label: 'MSI', count: 12, value: 'MSI' },
  { label: 'Gigabyte', count: 8, value: 'Gigabyte' },
  { label: 'Palit', count: 6, value: 'Palit' },
  { label: 'G.Skill', count: 10, value: 'G.Skill' },
  { label: 'Cooler Master', count: 9, value: 'Cooler_Master' },
];

const categories = ['Motherboards', 'Graphics Cards', 'Memory (RAM)', 'Processors', 'Cooling', 'Cases'];

const mockProducts = [
  { id: 1, name: 'AMD Ryzen 7 7800X3D', category: 'CPU', price: 449.99, rating: 4.8, reviews: 2234, isSale: false, isFeatured: false },
  { id: 2, name: 'Asus AMD Radeon RX 7600 XT', category: 'GPU', price: 329.99, rating: 4.4, reviews: 756, isSale: false, isFeatured: false },
  { id: 3, name: 'ASUS ROG Strix Z790-E Gaming', category: 'MOTHERBOARD', price: 449.99, originalPrice: 499.99, rating: 4.8, reviews: 1247, isSale: true, isFeatured: true },
  { id: 4, name: 'Corsair Vengeance RGB Pro 32GB', category: 'RAM', price: 139.99, originalPrice: 159.99, rating: 4.7, reviews: 3421, isSale: true, isFeatured: true },
  { id: 5, name: 'Fractal Design Define 7 XL', category: 'CASE', price: 199.99, originalPrice: 229.99, rating: 4.6, reviews: 1432, isSale: true, isFeatured: true },
  { id: 6, name: 'G.SKILL Trident Z5 Neo 32GB', category: 'RAM', price: 189.99, rating: 4.8, reviews: 1823, isSale: false, isFeatured: false },
];

const ProductsPage: React.FC = () => {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* KHU VỰC 1: TIÊU ĐỀ VÀ NÚT CHUYỂN VIEW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <Title level={2} style={{ margin: 0, fontWeight: 900 }}>All Products</Title>
            <Text type="secondary">12 products found</Text>
          </div>
          <Space>
            <Button
              type="primary"
              icon={<AppstoreOutlined />}
              style={{ backgroundColor: '#212529', borderColor: '#212529', borderRadius: '0px' }}
            />
            <Button
              icon={<UnorderedListOutlined />}
              style={{ borderRadius: '0px' }}
            />
          </Space>
        </div>

        <Row gutter={24}>
          {/* KHU VỰC 2: SIDEBAR BỘ LỌC (FILTERS) */}
          <Col xs={24} md={6}>
            <Card
              bordered={true}
              style={{ borderRadius: '0px', borderColor: '#ced4da' }}
              headStyle={{ borderBottom: '1px solid #ced4da', padding: '0 16px' }}
              bodyStyle={{ padding: '16px' }}
              title={
                <Space>
                  <FilterOutlined /> <Text strong>Filters</Text>
                </Space>
              }
            >
              {/* Tìm kiếm */}
              <div style={{ marginBottom: '24px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>Search</Text>
                <Input placeholder="Search products..." style={{ borderRadius: '0px' }} />
              </div>

              {/* Lọc theo Hãng */}
              <div style={{ marginBottom: '24px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>Brands</Text>
                <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {brands.map(brand => (
                    <div key={brand.value} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Checkbox value={brand.value}>{brand.label}</Checkbox>
                      <Text type="secondary">({brand.count})</Text>
                    </div>
                  ))}
                </Checkbox.Group>
              </div>

              {/* Lọc theo Danh mục */}
              <div style={{ marginBottom: '24px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>Categories</Text>
                <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {categories.map(cat => (
                    <Checkbox key={cat} value={cat}>{cat}</Checkbox>
                  ))}
                </Checkbox.Group>
              </div>

              {/* Lọc Khoảng giá */}
              <div style={{ marginBottom: '24px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>Price Range</Text>
                <Space style={{ width: '100%', marginBottom: '16px' }}>
                  <Input placeholder="Min" style={{ borderRadius: '0px' }} />
                  <Input placeholder="Max" style={{ borderRadius: '0px' }} />
                </Space>
                <Button block style={{ borderRadius: '0px', borderColor: '#ced4da' }}>
                  Clear All Filters
                </Button>
              </div>
            </Card>
          </Col>

          {/* KHU VỰC 3: DANH SÁCH SẢN PHẨM */}
          <Col xs={24} md={18}>
            {/* Thanh Sort */}
            <Card
              bodyStyle={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}
              style={{ borderRadius: '0px', borderColor: '#ced4da', marginBottom: '24px' }}
            >
              <Text style={{ marginRight: '12px' }}>Sort by:</Text>
              <Select
                defaultValue="name-asc"
                style={{ width: 150 }}
                options={[{ value: 'name-asc', label: 'Name A-Z' }, { value: 'name-desc', label: 'Name Z-A' }, { value: 'price-asc', label: 'Price Low to High' }, { value: 'price-desc', label: 'Price High to Low' }]}
              />
            </Card>

            {/* Lưới Sản phẩm */}
            <Row gutter={[16, 16]}> {/*fixed*/}
              {products.map((product) => {
                const isSale = product.originalPrice && product.originalPrice > product.price;
                return (
                  <Col xs={24} sm={12} lg={8} key={product.id}>
                    <Card
                      hoverable
                      styles={{ body: { padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' } }}
                      style={{ borderRadius: '0px', borderColor: '#ced4da', height: '100%' }}
                    >
                      <Link to={`/product/${product.id}`} style={{ display: 'block', color: 'inherit' }}>
                        {/* Hình ảnh và Nhãn */}
                        <div style={{ position: 'relative', height: '220px', border: '1px dashed #ced4da', backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain', // Quan trọng nhất: Giữ tỷ lệ, không cắt ảnh
                              padding: '8px' // (Tùy chọn) Thêm padding nhỏ để ảnh không đâm xuyên qua viền đứt nét
                            }}
                          />
                          {isSale && (
                            <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex' }}>
                              <span style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '4px 8px', fontSize: '12px', fontWeight: 'bold' }}>SALE</span>

                            </div>
                          )}
                          {product.featured && (
                            <span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#212529', color: 'white', padding: '4px 8px', fontSize: '12px', fontWeight: 'bold' }}>FEATURED</span>
                          )}
                          {/* <div style={{ width: '60px', height: '60px', backgroundColor: '#ced4da', marginBottom: '8px' }}></div> */}
                          {/* <Text type="secondarcdy" style={{ fontSize: '12px', letterSpacing: '1px' }}>{product.category}</Text> */}

                        </div>
                      </Link>
                      {/* Thông tin */}
                      {/* <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}> */}
                      <div style={{ flex: 1 }}>
                        <Title level={5} style={{ margin: '0 0 8px 0', fontSize: '14px', minHeight: '40px' }}>{product.name}</Title>

                        <Space size={4} align="center" style={{ marginBottom: '8px' }}>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[4 - 8].map((star) => (
                              <div key={star} style={{ width: '12px', height: '12px', backgroundColor: '#212529' }}></div>
                            ))}
                          </div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>{product.rating} ({product.reviewCount})</Text>
                        </Space>

                        <div style={{ marginBottom: '16px' }}>
                          <Text strong style={{ fontSize: '18px', marginRight: '8px' }}>${product.price}</Text>
                          {product.originalPrice && <Text delete type="secondary" style={{ fontSize: '14px' }}>${product.originalPrice}</Text>}
                        </div>
                      </div>
                      {/* </Link> */}
                      <Button type="primary" block icon={<ShoppingCartOutlined />} style={{ backgroundColor: '#212529', borderColor: '#212529', borderRadius: '0px', height: '40px', fontWeight: 500 }}>
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
    </div >
  );
};

export default ProductsPage;