import express from 'express';
import { getAllProductsadmin,getProductById, updateProduct } from '../controllers/admincontroller/getproductcontroller';
import { verifyToken } from '../middlewares/jwtmiddleware';
import { createProduct, getAllBrands, getAllCategories, } from '../controllers/admincontroller/addproductcontroller';
import { uploadMultipleImages } from '../middlewares/uploadmiddleware';
import {getAllProducts} from '../controllers/productcontroller';
const router = express.Router();

// Sử dụng phương thức GET để lấy dữ liệu (READ)
router.get('/all', getAllProducts); 
router.get('/', getAllProductsadmin); 
router.get('/:_id', getProductById);
router.put('/:id', verifyToken, updateProduct);
router.post('/add', verifyToken, uploadMultipleImages, createProduct);
router.get('/categories', getAllCategories);
router.get('/brands', getAllBrands);

export default router;