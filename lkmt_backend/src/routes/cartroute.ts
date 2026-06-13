import express from 'express';
import { addToCart, getCart, removeCartItem, updateCartQuantity, } from '../controllers/cartcontroller';
import { verifyToken } from '../middlewares/jwtmiddleware';

const router = express.Router();

// Sử dụng middleware verifyToken để bảo vệ API [2]
// Bất kỳ ai gọi vào 2 API này đều phải đi qua "trạm gác" verifyToken trước
router.post('/add', verifyToken, addToCart); 
router.get('/', verifyToken, getCart);       
router.post('/update', verifyToken, updateCartQuantity);
router.post('/remove', verifyToken, removeCartItem);
export default router;