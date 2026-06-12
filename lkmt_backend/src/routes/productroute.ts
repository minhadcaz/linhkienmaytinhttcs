import express from 'express';
import { getAllProducts } from '../controllers/productcontroller';

const router = express.Router();

// Sử dụng phương thức GET để lấy dữ liệu (READ)
router.get('/', getAllProducts); 

export default router;