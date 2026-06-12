import express from 'express';
// Import các hàm controller đăng ký và đăng nhập (sử dụng passport/bcrypt) mà ta đã viết hôm trước
import { loginUser,registerUser } from '../controllers/authcontroller'; 


const router = express.Router();

// Mở API Endpoint cho Frontend gọi
router.post('/register', registerUser); 
router.post('/login', loginUser); 

export default router;
