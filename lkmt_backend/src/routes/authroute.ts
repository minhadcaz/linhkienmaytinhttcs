import express from 'express';
// Import các hàm controller đăng ký và đăng nhập (sử dụng passport/bcrypt) mà ta đã viết hôm trước
import { getMe, loginUser,registerUser } from '../controllers/authcontroller'; 
import { verifyToken } from '../middlewares/jwtmiddleware';


const router = express.Router();

// Mở API Endpoint cho Frontend gọi
router.post('/register', registerUser); 
router.post('/login', loginUser); 
router.get('/me', verifyToken, getMe); 
export default router;
